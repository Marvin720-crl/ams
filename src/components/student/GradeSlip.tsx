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

    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-2 sm:px-0 animate-in fade-in duration-500">

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

      {/* Official Grade Slip Container */}

      <Card className="bg-white border-none p-6 sm:p-14 print:p-10 relative overflow-hidden shadow-2xl rounded-[2.5rem]">

        {/* Header */}

        <div className="flex flex-col items-center text-center space-y-1 mb-8">

          <div className="flex items-center gap-6">
            <div className="w-16 h-16 flex items-center justify-center opacity-80">
              <Image
                src="/logocard.png"
                alt="logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground leading-none">
                AMA EDUCATION SYSTEM
              </h1>
              <p className="text-sm font-bold text-foreground mt-1">
                Official Academic Grade Report
              </p>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                AMA Computer College – Lipa Campus
              </p>
            </div>
          </div>

          <div className="w-full border-b-2 border-primary/5 pt-6" />

        </div>

        {/* Student Info Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 mb-10 text-sm">

          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap text-foreground">Student Name:</span>
            <span className="text-foreground uppercase">{user?.name}</span>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <span className="font-bold whitespace-nowrap text-foreground">Campus:</span>
            <span className="text-foreground uppercase">AMACC – Lipa</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap text-foreground">Student ID:</span>
            <span className="text-foreground">{user?.id}</span>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <span className="font-bold whitespace-nowrap text-foreground">Academic Term:</span>
            <span className="text-foreground uppercase">{currentTerm?.name || 'N/A'}</span>
          </div>

        </div>

        {/* Grade Table */}

        <div className="border-2 border-primary/5 rounded-2xl overflow-hidden bg-white shadow-sm min-h-[450px] flex flex-col">

          <table className="w-full">

            <thead className="bg-muted/50 border-b-2 border-primary/5">

              <tr>

                <th className="p-5 text-left font-black uppercase tracking-tight text-[11px] text-foreground border-r border-primary/5">COURSE CODE</th>
                <th className="p-5 text-left font-black uppercase tracking-tight text-[11px] text-foreground border-r border-primary/5">COURSE DESCRIPTION</th>
                <th className="p-5 text-center font-black uppercase tracking-tight text-[11px] text-foreground border-r border-primary/5">UNITS</th>
                <th className="p-5 text-center font-black uppercase tracking-tight text-[11px] text-foreground border-r border-primary/5">FINAL GRADE</th>
                <th className="p-5 text-center font-black uppercase tracking-tight text-[11px] text-foreground">EQUIVALENT</th>

              </tr>

            </thead>

            <tbody className="flex-1">

              {isTermActive ? (
                <tr>
                  <td colSpan={5} className="p-10 sm:p-24 text-center">
                    <div className="flex flex-col items-center gap-6 py-10">
                      <div className="h-24 w-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary border-4 border-primary/10 shadow-2xl shadow-primary/10 rotate-3">
                        <Lock size={40} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-primary">GRADES NOT YET FINALIZED</h3>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
                          The current academic term is still active. <br/>
                          Final records will be available once the term <br/>
                          is officially closed.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : records.length === 0 ? (

                <tr>

                  <td colSpan={5} className="text-center py-24 text-muted-foreground">

                    <Info className="mx-auto mb-4 opacity-20" size={48} />

                    <p className="font-black uppercase tracking-widest text-[10px]">No academic records found for this period.</p>

                  </td>

                </tr>

              ) : (

                records.map((record, i) => (

                  <tr key={i} className="border-t border-primary/5 hover:bg-primary/[0.01] transition-colors group h-16">

                    <td className="p-5 font-bold text-primary uppercase tracking-tight border-r border-primary/5">{record.code}</td>
                    <td className="p-5 font-medium text-foreground uppercase text-[11px] border-r border-primary/5">{record.description}</td>
                    <td className="p-5 text-center font-bold border-r border-primary/5">{record.units}</td>
                    <td className="p-5 text-center font-black text-lg text-primary border-r border-primary/5">{record.grade}</td>
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-primary/10 text-primary font-black text-xs">{record.letter}</span>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Footer Area - Registrar Section */}

        <div className="mt-16 pt-10 flex justify-between items-end">

          <div className="space-y-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-16">
                Office of the Registrar
              </p>

              <div className="max-w-xs">
                {/* Horizontal line changed to black (text-foreground) */}
                <div className="border-b-2 border-foreground" />
                <p className="text-[11px] font-black uppercase tracking-[0.1em] mt-3 text-foreground">
                  AUTHORIZED ACADEMIC SIGNATURE
                </p>
              </div>
            </div>
          </div>

          {!isTermActive && records.length > 0 && (
            <div className="bg-primary text-white p-8 px-12 rounded-[2.5rem] shadow-2xl shadow-primary/30 rotate-1">
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
