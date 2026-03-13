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

            <SelectTrigger className="h-12 rounded-xl font-black uppercase text-[10px] tracking-widest border-primary/10">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>

            <SelectContent className="rounded-2xl">

              {terms.map(t => (

                <SelectItem key={t.id} value={t.id} className="text-[10px] font-black uppercase">

                  {t.name} {t.status === 'ended' ? '(Finalized)' : '(Ongoing)'}

                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        </div>

        <Button 
          onClick={() => window.print()} 
          className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest rounded-xl h-12 shadow-lg shadow-primary/20"
          disabled={isTermActive || records.length === 0}
        >

          <Printer size={16} />
          Print Grade Slip

        </Button>

      </div>

      {/* Grade Slip */}

      <Card className="bg-white border p-6 sm:p-14 print:p-10 relative overflow-hidden shadow-2xl rounded-[2.5rem]">

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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 border-b pb-8 relative z-10">

          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="sm:w-20 sm:h-20"
          />

          <div className="text-center sm:text-left">

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-10 text-xs sm:text-sm relative z-10">

          <div className="space-y-2 text-center sm:text-left">

            <p><span className="text-muted-foreground uppercase font-black text-[9px] block">Student Name</span> <strong>{user?.name}</strong></p>

            <p><span className="text-muted-foreground uppercase font-black text-[9px] block">Student ID</span> <strong>{user?.id}</strong></p>

          </div>

          <div className="space-y-2 text-center sm:text-right">

            <p><span className="text-muted-foreground uppercase font-black text-[9px] block">Campus</span> <strong>AMACC – Lipa</strong></p>

            <p><span className="text-muted-foreground uppercase font-black text-[9px] block">Academic Term</span> <strong>{currentTerm?.name}</strong></p>

          </div>

        </div>

        {/* Table / Status View */}

        <div className="mt-10 border rounded-2xl overflow-hidden relative z-10 bg-white/50 backdrop-blur-sm">

          <div className="overflow-x-auto">
            <table className="w-full text-[10px] sm:text-sm">

              <thead className="bg-muted/30">

                <tr>

                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-tighter">Code</th>
                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-tighter">Description</th>
                  <th className="p-3 sm:p-4 text-center font-black uppercase tracking-tighter">Units</th>
                  <th className="p-3 sm:p-4 text-center font-black uppercase tracking-tighter">Grade</th>
                  <th className="p-3 sm:p-4 text-center font-black uppercase tracking-tighter">Eq.</th>

                </tr>

              </thead>

              <tbody>

                {isTermActive ? (
                  <tr>
                    <td colSpan={5} className="p-12 sm:p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-16 w-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 border border-amber-100 animate-pulse">
                          <Lock size={32} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black uppercase tracking-tight text-amber-900">Grades Not Yet Finalized</h3>
                          <p className="text-xs sm:text-sm text-amber-700/70 max-w-xs mx-auto mt-1 font-bold">
                            The current academic term is still active. 
                            Please wait for the administrator to finalize the term.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : records.length === 0 ? (

                  <tr>

                    <td colSpan={5} className="text-center py-20 text-muted-foreground">

                      <Info className="mx-auto mb-3 opacity-20" size={48} />

                      <p className="font-bold">No academic records found for this term.</p>

                    </td>

                  </tr>

                ) : (

                  records.map((record, i) => (

                    <tr key={i} className="border-t hover:bg-muted/5 transition-colors">

                      <td className="p-3 sm:p-4 font-bold text-primary">{record.code}</td>
                      <td className="p-3 sm:p-4 font-medium max-w-[120px] sm:max-w-none truncate">{record.description}</td>
                      <td className="p-3 sm:p-4 text-center font-bold">{record.units}</td>
                      <td className="p-3 sm:p-4 text-center font-black text-base sm:text-lg">{record.grade}</td>
                      <td className="p-3 sm:p-4 text-center font-black text-primary">{record.letter}</td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>
          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-12 border-t pt-10 gap-8 relative z-10">

          <div className="text-center sm:text-left">

            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-10">Registrar Office</p>

            <div className="border-b-2 border-black w-48 sm:w-64" />

            <p className="text-[9px] font-black uppercase tracking-widest mt-2">
              Authorized Signature
            </p>

          </div>

          {!isTermActive && records.length > 0 && (
            <div className="text-center sm:text-right">

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                General Weighted Average
              </p>

              <p className="text-4xl sm:text-6xl font-black text-primary tracking-tighter">
                {calculateGWA()}
              </p>

            </div>
          )}

        </div>

      </Card>

      <div className="text-center print:hidden px-4">
        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-relaxed">
          This is an official digital copy of your grade report generated by AMS:AMACC v1.0
        </p>
      </div>

    </div>

  );

}