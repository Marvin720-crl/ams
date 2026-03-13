
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

import { Loader2, Printer, Info, Lock, ShieldAlert } from 'lucide-react';
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
  /* LOAD TERM GRADES */
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

      <Card className="bg-white border p-8 sm:p-12 md:p-16 print:p-10 shadow-2xl rounded-sm">

        {/* Header Section based on image */}

        <div className="flex items-center justify-center text-center relative pb-10 border-b border-gray-100">
          
          <div className="absolute left-0 top-0">
             <Image src="/logo.png" alt="AMA Logo" width={60} height={60} className="opacity-20" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#E30613]">
              AMA EDUCATION SYSTEM
            </h1>
            <p className="text-sm sm:text-base font-bold text-gray-800">
              Official Academic Grade Report
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
              AMA Computer College – Lipa Campus
            </p>
          </div>

        </div>

        {/* Student Information Grid - Precise Alignment */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mt-12 text-[13px]">

          <div className="space-y-2">
            <p className="flex gap-2"><span className="font-bold">Student Name:</span> <span className="text-gray-600 font-medium">{user?.name}</span></p>
            <p className="flex gap-2"><span className="font-bold">Student ID:</span> <span className="text-gray-600 font-medium">{user?.id}</span></p>
          </div>

          <div className="space-y-2 text-left sm:text-right">
            <p className="flex sm:justify-end gap-2"><span className="font-bold">Campus:</span> <span className="text-gray-600 font-medium">AMACC – Lipa</span></p>
            <p className="flex sm:justify-end gap-2"><span className="font-bold">Academic Term:</span> <span className="text-gray-600 font-medium">{currentTerm?.name}</span></p>
          </div>

        </div>

        {/* Grades Box */}

        <div className="mt-12 border rounded-xl overflow-hidden bg-white shadow-sm">

          <table className="w-full text-[11px] border-collapse">

            <thead className="bg-[#f8f9fa] border-b">

              <tr>
                <th className="p-4 text-left font-black text-gray-700 tracking-wider">COURSE CODE</th>
                <th className="p-4 text-left font-black text-gray-700 tracking-wider">COURSE DESCRIPTION</th>
                <th className="p-4 text-center font-black text-gray-700 tracking-wider">UNITS</th>
                <th className="p-4 text-center font-black text-gray-700 tracking-wider">FINAL GRADE</th>
                <th className="p-4 text-center font-black text-gray-700 tracking-wider">EQUIVALENT</th>
              </tr>

            </thead>

            <tbody>

              {isTermActive ? (
                <tr>
                  <td colSpan={5} className="p-0">
                    <div className="flex flex-col items-center justify-center py-32 px-10 text-center space-y-6 relative overflow-hidden">
                      {/* Watermark AMA logo bg */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                         <Image src="/logo.png" alt="AMA" width={400} height={400} />
                      </div>

                      <div className="w-20 h-20 rounded-full bg-[#FFF9F0] border-2 border-[#FFECCF] flex items-center justify-center text-[#B45309] shadow-lg">
                        <Lock size={36} />
                      </div>
                      
                      <div className="space-y-2">
                        <h2 className="text-xl font-black text-[#92400E] uppercase tracking-tight">
                          GRADES NOT YET FINALIZED
                        </h2>
                        <p className="text-sm text-[#B45309]/70 font-bold max-w-sm mx-auto leading-relaxed">
                          The current academic term is still active. Please wait for the administrator to finalize the term to view your grades.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : records.length === 0 ? (

                <tr>
                  <td colSpan={5} className="text-center py-24 text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                      <Info size={40} className="opacity-20" />
                      <p className="font-bold uppercase tracking-widest text-[10px]">No academic records available for this term.</p>
                    </div>
                  </td>
                </tr>

              ) : (

                records.map((record, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/5 transition-colors">
                    <td className="p-4 font-bold text-gray-800">{record.code}</td>
                    <td className="p-4 text-gray-600 font-medium">{record.description}</td>
                    <td className="p-4 text-center font-bold text-gray-800">{record.units}</td>
                    <td className="p-4 text-center font-black text-[#E30613]">{record.grade}</td>
                    <td className="p-4 text-center font-black text-primary">{record.letter}</td>
                  </tr>
                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Footer Section - Precise Matching */}

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-end gap-10">

          <div className="space-y-1 w-full md:w-auto">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">REGISTRAR OFFICE</p>
            <div className="border-b-2 border-gray-900 w-full sm:w-72 pt-10" />
            <p className="text-[9px] font-black text-gray-900 uppercase tracking-tighter mt-2">AUTHORIZED SIGNATURE</p>
          </div>

          {!isTermActive && records.length > 0 && (
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                GENERAL WEIGHTED AVERAGE
              </p>
              <p className="text-6xl font-black text-[#E30613] tracking-tighter mt-1">
                {calculateGWA()}
              </p>
            </div>
          )}

        </div>

      </Card>

      <div className="text-center mt-6 print:hidden">
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
          AMA Computer College Lipa • Student Portal Document System v1.0
        </p>
      </div>

    </div>

  );

}
