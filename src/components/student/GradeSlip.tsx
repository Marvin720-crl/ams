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

        // Default to active term if it exists, otherwise most recent
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

    // If term is still active, DO NOT show subjects/grades (as per user request)
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

            <SelectTrigger className="h-12 rounded-md font-bold">
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
          className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90"
          disabled={isTermActive || records.length === 0}
        >

          <Printer size={16} />
          Print Grade Slip

        </Button>

      </div>

      {/* Grade Slip */}

      <Card className="bg-white border p-6 sm:p-14 print:p-10 relative overflow-hidden shadow-2xl rounded-3xl">

        {/* Watermark */}

        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">

          <Image
            src="/logo.png"
            alt="watermark"
            width={400}
            height={400}
          />

        </div>

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 border-b pb-6 text-center sm:text-left">

          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="sm:w-20 sm:h-20"
          />

          <div>

            <h1 className="text-lg sm:text-xl font-black uppercase tracking-widest text-primary">
              AMA Education System
            </h1>

            <p className="text-xs sm:text-sm font-bold tracking-wide">
              Official Academic Grade Report
            </p>

            <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold">
              AMA Computer College – Lipa Campus
            </p>

          </div>

        </div>

        {/* Student Info */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-10 text-xs sm:text-sm">

          <div className="space-y-1 sm:space-y-2">

            <p><strong>Student Name:</strong> {user?.name}</p>

            <p><strong>Student ID:</strong> {user?.id}</p>

          </div>

          <div className="space-y-1 sm:space-y-2 text-left sm:text-right">

            <p><strong>Campus:</strong> AMACC – Lipa</p>

            <p><strong>Academic Term:</strong> {currentTerm?.name}</p>

          </div>

        </div>

        {/* Table / Status View */}

        <div className="mt-8 sm:mt-10 border rounded-xl overflow-x-auto">

          <table className="w-full text-[10px] sm:text-sm min-w-[600px] sm:min-w-0">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 sm:p-4 text-left font-black uppercase tracking-tighter">Course Code</th>
                <th className="p-3 sm:p-4 text-left font-black uppercase tracking-tighter">Course Description</th>
                <th className="p-3 sm:p-4 text-center font-black uppercase tracking-tighter">Units</th>
                <th className="p-3 sm:p-4 text-center font-black uppercase tracking-tighter">Final Grade</th>
                <th className="p-3 sm:p-4 text-center font-black uppercase tracking-tighter">Equivalent</th>

              </tr>

            </thead>

            <tbody>

              {isTermActive ? (
                <tr>
                  <td colSpan={5} className="p-10 sm:p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 border border-amber-100">
                        <Lock size={24} className="sm:w-8 sm:h-8" />
                      </div>
                      <div className="px-4">
                        <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-amber-900">Grades Not Yet Finalized</h3>
                        <p className="text-[10px] sm:text-sm text-amber-700/70 max-w-xs mx-auto mt-1 font-bold">
                          The current academic term is still active. 
                          Please wait for the administrator to finalize the term to view your grades.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : records.length === 0 ? (

                <tr>

                  <td colSpan={5} className="text-center py-16 sm:py-20 text-muted-foreground">

                    <Info className="mx-auto mb-3 opacity-20" size={40} />

                    <p className="font-bold">No academic records found for this term.</p>

                  </td>

                </tr>

              ) : (

                records.map((record, i) => (

                  <tr key={i} className="border-t hover:bg-muted/5 transition-colors">

                    <td className="p-3 sm:p-4 font-bold text-primary">{record.code}</td>
                    <td className="p-3 sm:p-4 font-medium">{record.description}</td>
                    <td className="p-3 sm:p-4 text-center font-bold">{record.units}</td>
                    <td className="p-3 sm:p-4 text-center font-black text-base sm:text-lg">{record.grade}</td>
                    <td className="p-3 sm:p-4 text-center font-black text-primary">{record.letter}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-10 sm:mt-12 border-t pt-8 gap-8 sm:gap-0">

          <div className="w-full sm:w-auto">

            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8 sm:mb-10">Registrar Office</p>

            <div className="border-b-2 border-black w-full sm:w-64" />

            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-2 text-center">
              Authorized Signature
            </p>

          </div>

          {!isTermActive && records.length > 0 && (
            <div className="text-left sm:text-right w-full sm:w-auto">

              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                General Weighted Average
              </p>

              <p className="text-4xl sm:text-5xl font-black text-primary tracking-tighter">
                {calculateGWA()}
              </p>

            </div>
          )}

        </div>

      </Card>

      <div className="text-center print:hidden px-4">
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-relaxed">
          This is an official digital copy of your grade report generated by AMS:AMACC
        </p>
      </div>

    </div>

  );

}
