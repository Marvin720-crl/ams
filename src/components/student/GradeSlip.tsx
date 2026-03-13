'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

import {
  getAcademicRecordsAction,
  getTermsAction
} from '@/app/actions/dbActions';

import { AcademicRecord, Term } from '@/utils/storage';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Loader2, Printer, Info, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Image from 'next/image';

export default function GradeSlip() {

  const { user } = useAuth();

  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<string>('');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------ */
  /* FETCH TERMS + HISTORY */
  /* ------------------------------------------------ */

  const fetchData = async () => {

    if (!user) return;

    setLoading(true);

    try {

      const [allTerms, allHistorical] = await Promise.all([
        getTermsAction(),
        getAcademicRecordsAction()
      ]);

      const sortedTerms = allTerms.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setTerms(sortedTerms);

      if (sortedTerms.length > 0) {

        const activeTerm = sortedTerms.find(
          (t) => t.status === 'active'
        );

        const defaultTermId =
          activeTerm?.id || sortedTerms[0].id;

        setSelectedTermId(defaultTermId);

        loadTermGrades(defaultTermId, sortedTerms, allHistorical);

      }

    } catch (e) {

      console.error(e);

    } finally {

      setLoading(false);

    }

  };

  /* ------------------------------------------------ */
  /* LOAD TERM GRADES (ONLY IF ENDED) */
  /* ------------------------------------------------ */

  const loadTermGrades = async (
    termId: string,
    currentTerms?: Term[],
    historical?: AcademicRecord[]
  ) => {

    if (!user) return;

    const termsList = currentTerms || terms;
    const term = termsList.find((t) => t.id === termId);

    if (term?.status === 'active') {
      setRecords([]);
      return;
    }

    const historyData =
      historical || (await getAcademicRecordsAction());

    const history = historyData.filter(
      (r) =>
        r.studentId === user.id &&
        r.termId === termId
    );

    if (history.length > 0) {

      setRecords(
        history.map((h) => ({
          code: h.subjectCode,
          description: h.subjectName,
          units: h.units,
          grade: h.grade.toFixed(2),
          letter: getLetter(h.grade)
        }))
      );

    } else {
      setRecords([]);
    }

  };

  const getLetter = (g: number) => {
    if (g <= 1.25) return 'A+';
    if (g <= 1.5) return 'A';
    if (g <= 1.75) return 'A-';
    if (g <= 2.0) return 'B+';
    if (g <= 2.25) return 'B';
    if (g <= 2.5) return 'B-';
    if (g <= 3.0) return 'C';
    return 'F';
  };

  useEffect(() => { fetchData(); }, [user]);

  const calculateGWA = () => {

    if (records.length === 0) return "0.00";

    let totalPoints = 0;
    let totalUnits = 0;

    records.forEach(r => {
      totalPoints += parseFloat(r.grade) * r.units;
      totalUnits += r.units;
    });

    return (totalPoints / totalUnits).toFixed(2);

  };

  const currentTerm = terms.find(t => t.id === selectedTermId);
  const isTermActive = currentTerm?.status === 'active';

  if (loading)
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (

    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-2 sm:px-0">

      {/* Controls */}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">

        <div className="w-full sm:w-72">

          <Select
            value={selectedTermId}
            onValueChange={(v) => {
              setSelectedTermId(v);
              loadTermGrades(v);
            }}
          >

            <SelectTrigger className="h-12 rounded-xl font-bold border-primary/10">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>

            <SelectContent>

              {terms.map(t => (

                <SelectItem key={t.id} value={t.id}>

                  {t.name} {t.status === 'ended' ? '(Finalized)' : '(Ongoing)'}

                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        </div>

        <Button 
          onClick={() => window.print()} 
          className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl h-12 shadow-lg"
          disabled={isTermActive || records.length === 0}
        >

          <Printer size={16} />
          Print Grade Slip

        </Button>

      </div>

      {/* Grade Slip Document Card */}

      <Card className="bg-white border p-10 sm:p-16 print:p-10 shadow-2xl rounded-sm">

        {/* Header Section */}

        <div className="flex flex-col items-center justify-center text-center relative pb-6 border-b">
          
          <div className="absolute left-0 top-0 hidden sm:block">
             <Image src="/logo.png" alt="AMA Logo" width={80} height={80} />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground">
              AMA EDUCATION SYSTEM
            </h1>
            <p className="text-base font-semibold">
              Official Academic Grade Report
            </p>
            <p className="text-sm text-muted-foreground">
              AMA Computer College – Lipa Campus
            </p>
          </div>

        </div>

        {/* Student Information Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-10 text-sm">

          <div className="space-y-2">
            <p><span className="font-bold">Student Name:</span> {user?.name}</p>
            <p><span className="font-bold">Student ID:</span> {user?.id}</p>
          </div>

          <div className="space-y-2 text-left sm:text-right">
            <p><span className="font-bold">Campus:</span> AMACC – Lipa</p>
            <p><span className="font-bold">Academic Term:</span> {currentTerm?.name}</p>
          </div>

        </div>

        {/* Grades Table */}

        <div className="mt-10 border rounded-none overflow-hidden bg-white">

          <table className="w-full text-sm border-collapse">

            <thead className="bg-gray-50 border-b">

              <tr>
                <th className="p-4 text-left font-bold border-r">Course Code</th>
                <th className="p-4 text-left font-bold border-r">Course Description</th>
                <th className="p-4 text-center font-bold border-r">Units</th>
                <th className="p-4 text-center font-bold border-r">Final Grade</th>
                <th className="p-4 text-center font-bold">Equivalent</th>
              </tr>

            </thead>

            <tbody>

              {isTermActive ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Lock size={32} className="text-amber-500" />
                      <p className="font-semibold text-muted-foreground">
                        Grades for this term are not yet finalized.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : records.length === 0 ? (

                <tr>
                  <td colSpan={5} className="text-center py-24 text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                      <Info size={40} className="opacity-20" />
                      <p>No academic records available.</p>
                    </div>
                  </td>
                </tr>

              ) : (

                records.map((record, i) => (

                  <tr key={i} className="border-b">
                    <td className="p-4 border-r">{record.code}</td>
                    <td className="p-4 border-r">{record.description}</td>
                    <td className="p-4 text-center border-r">{record.units}</td>
                    <td className="p-4 text-center border-r font-bold">{record.grade}</td>
                    <td className="p-4 text-center font-bold text-primary">{record.letter}</td>
                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Footer Section */}

        <div className="flex flex-col sm:flex-row justify-between items-end mt-16 border-t pt-10">

          <div className="space-y-1">
            <p className="font-bold text-sm">Registrar</p>
            <div className="border-b border-gray-300 w-64 pt-8" />
            <p className="text-[10px] text-muted-foreground">Authorized Signature</p>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              GENERAL WEIGHTED AVERAGE
            </p>
            <p className="text-6xl font-bold text-primary mt-1">
              {calculateGWA()}
            </p>
          </div>

        </div>

      </Card>

      <div className="text-center mt-4 print:hidden">
        <p className="text-[10px] font-medium text-muted-foreground">
          AMA Computer College Lipa Student Portal Document System v1.0
        </p>
      </div>

    </div>

  );

}
