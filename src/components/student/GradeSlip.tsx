'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

import {
  getAcademicRecordsAction,
  getTermsAction,
  getTermEnrollmentsAction
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
  /* FETCH TERMS + HISTORY + ENROLLMENTS */
  /* ------------------------------------------------ */

  const fetchData = async () => {

    if (!user) return;

    setLoading(true);

    try {

      const [allTerms, allHistorical, allTermEnrollments] = await Promise.all([
        getTermsAction(),
        getAcademicRecordsAction(),
        getTermEnrollmentsAction()
      ]);

      // Filter terms: Only show terms where student is approved OR has history
      const myTermIds = new Set([
        ...allTermEnrollments
          .filter((te: any) => te.studentId === user.id && te.status === 'approved')
          .map((te: any) => te.termId),
        ...allHistorical
          .filter((ar: any) => ar.studentId === user.id)
          .map((ar: any) => ar.termId)
      ]);

      const filteredTerms = allTerms.filter((t: any) => myTermIds.has(t.id));

      const sortedTerms = filteredTerms.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setTerms(sortedTerms);

      if (sortedTerms.length > 0) {

        const activeTerm = sortedTerms.find(
          (t) => t.status === 'active'
        );

        // Default to active term if it exists in filtered list, otherwise most recent
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

    // If term is still active, DO NOT show subjects/grades (Privacy Protocol)
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

  useEffect(() => { fetchData(); }, [user?.id]);

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

    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-2 sm:px-0 animate-in fade-in duration-500">

      {/* Controls */}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">

        <div className="w-full sm:w-96">

          <Select
            value={selectedTermId}
            onValueChange={(v) => {
              setSelectedTermId(v);
              loadTermGrades(v);
            }}
          >

            <SelectTrigger className="h-14 rounded-full font-black uppercase text-[11px] tracking-widest px-8 border-primary/10 shadow-sm bg-white">
              <SelectValue placeholder="Select Enrolled Term" />
            </SelectTrigger>

            <SelectContent className="rounded-2xl">

              {terms.length === 0 ? (
                <div className="p-4 text-center text-[10px] font-bold text-muted-foreground uppercase">No Enrolled Terms Found</div>
              ) : (
                terms.map(t => (
                  <SelectItem key={t.id} value={t.id} className="font-bold">
                    {t.name} {t.status === 'ended' ? '(Finalized)' : '(Ongoing)'}
                  </SelectItem>
                ))
              )}

            </SelectContent>

          </Select>

        </div>

        <Button 
          onClick={() => window.print()} 
          className="w-full sm:w-auto h-14 px-10 rounded-full font-black uppercase text-[10px] tracking-widest gap-2 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20"
          disabled={isTermActive || records.length === 0}
        >

          <Printer size={18} />
          Print Grade Slip

        </Button>

      </div>

      {/* Grade Slip */}

      <Card className="bg-white border-none p-6 sm:p-14 print:p-10 relative overflow-hidden shadow-2xl rounded-[3rem]">

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

         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 border-b-2 border-primary/5 pb-10">

              <Image
                src="/logo.png"
                alt="logo"
                width={80}
                height={80}
                className="grayscale brightness-0 opacity-80"
              />
              <div className="text-center sm:text-left">

                <h1 className="text-2xl font-black uppercase tracking-widest text-primary leading-none">
                  AMA Education System
                </h1>
                  <p className="text-sm font-bold tracking-tight uppercase mt-1 text-muted-foreground">
                    Official Academic Grade Report
                </p>

                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2">
                  AMA Computer College – Lipa Campus
                </p>

              </div>

               </div>

        {/* Student Info */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-12 text-[11px] font-bold uppercase tracking-wider">

          <div className="space-y-3 bg-muted/20 p-6 rounded-2xl">

            <p><span className="text-muted-foreground opacity-60">Student Name:</span> <br/><span className="text-base font-black text-primary">{user?.name}</span></p>

            <p><span className="text-muted-foreground opacity-60">Student ID:</span> <br/><span className="text-foreground">{user?.id}</span></p>

          </div>

          <div className="space-y-3 bg-muted/20 p-6 rounded-2xl text-left sm:text-right">

            <p><span className="text-muted-foreground opacity-60">Campus Location:</span> <br/><span className="text-foreground">AMACC – Lipa</span></p>

            <p><span className="text-muted-foreground opacity-60">Academic Period:</span> <br/><span className="text-primary">{currentTerm?.name || 'N/A'}</span></p>

          </div>

        </div>

        {/* Table / Status View */}

        <div className="mt-12 border-2 border-primary/5 rounded-[2rem] overflow-hidden bg-white shadow-sm">

          <table className="w-full text-[10px] sm:text-sm min-w-[600px] sm:min-w-0">

            <thead className="bg-primary/5">

              <tr>

                <th className="p-5 text-left font-black uppercase tracking-widest text-[9px] text-muted-foreground">Course Code</th>
                <th className="p-5 text-left font-black uppercase tracking-widest text-[9px] text-muted-foreground">Course Description</th>
                <th className="p-5 text-center font-black uppercase tracking-widest text-[9px] text-muted-foreground">Units</th>
                <th className="p-5 text-center font-black uppercase tracking-widest text-[9px] text-muted-foreground">Final Grade</th>
                <th className="p-5 text-center font-black uppercase tracking-widest text-[9px] text-muted-foreground">Equivalent</th>

              </tr>

            </thead>

            <tbody>

              {isTermActive ? (
                <tr>
                  <td colSpan={5} className="p-10 sm:p-24 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="h-20 w-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 border-2 border-amber-100 shadow-xl shadow-amber-500/10 rotate-3">
                        <Lock size={32} />
                      </div>
                      <div className="px-4">
                        <h3 className="text-xl font-black uppercase tracking-tighter text-amber-900">Grades Not Yet Finalized</h3>
                        <p className="text-[10px] text-amber-700/70 max-w-xs mx-auto mt-2 font-black uppercase tracking-widest leading-relaxed">
                          The current academic term is still active. 
                          Final records will be available once the term is officially closed.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : records.length === 0 ? (

                <tr>

                  <td colSpan={5} className="text-center py-20 text-muted-foreground">

                    <Info className="mx-auto mb-4 opacity-20" size={48} />

                    <p className="font-black uppercase tracking-widest text-[10px]">No academic records found for this period.</p>

                  </td>

                </tr>

              ) : (

                records.map((record, i) => (

                  <tr key={i} className="border-t border-primary/5 hover:bg-primary/[0.02] transition-colors group">

                    <td className="p-5 font-black text-primary uppercase tracking-tighter">{record.code}</td>
                    <td className="p-5 font-bold text-foreground/80 uppercase text-[11px]">{record.description}</td>
                    <td className="p-5 text-center font-black">{record.units}</td>
                    <td className="p-5 text-center font-black text-lg text-primary">{record.grade}</td>
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-white font-black text-xs shadow-lg shadow-primary/20">{record.letter}</span>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-16 border-t-2 border-primary/5 pt-12 gap-10 sm:gap-0">

          <div className="w-full sm:w-auto">

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-12">Office of the Registrar</p>

            <div className="border-b-4 border-primary w-full sm:w-72 shadow-xl shadow-primary/10" />

            <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-center text-primary/60">
              Authorized Signature
            </p>

          </div>

          {!isTermActive && records.length > 0 && (
            <div className="text-left sm:text-right w-full sm:w-auto bg-primary text-white p-8 rounded-[2rem] shadow-2xl shadow-primary/30 rotate-1">

              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-2">
                Weighted Average
              </p>

              <p className="text-6xl font-black tracking-tighter leading-none">
                {calculateGWA()}
              </p>

            </div>
          )}

        </div>

      </Card>

      <div className="text-center print:hidden px-4 mt-8">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-relaxed max-w-lg mx-auto opacity-60">
          This digital grade report is a certified copy generated by the Academic Management System (AMS:AMACC). 
          Any unauthorized alteration renders this document invalid.
        </p>
      </div>

    </div>

  );

}
