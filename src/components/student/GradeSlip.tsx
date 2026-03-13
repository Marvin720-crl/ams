'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

import {
  getAcademicRecordsAction,
  getTermsAction,
  getSubjectsAction,
  getAttendancesAction,
  getClassworksAction,
  getSubmissionsAction,
  getGradingWeightsAction
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

import { Loader2, Printer, Info } from 'lucide-react';
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
  /* LOAD TERM GRADES (LOGIC UNCHANGED) */
  /* ------------------------------------------------ */

  const loadTermGrades = async (
    termId: string,
    currentTerms?: Term[],
    historical?: AcademicRecord[]
  ) => {

    if (!user) return;

    const termsList = currentTerms || terms;
    const term = termsList.find((t) => t.id === termId);

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

      return;

    }

    if (term?.status === 'active') {

      const [
        allSubjects,
        allAttendances,
        allClassworks,
        allSubmissions,
        allWeights
      ] = await Promise.all([
        getSubjectsAction(),
        getAttendancesAction(),
        getClassworksAction(),
        getSubmissionsAction(),
        getGradingWeightsAction()
      ]);

      const termSubjects = allSubjects.filter(
        (s) => s.termId === termId
      );

      const liveGrades: any[] = [];

      for (const subject of termSubjects) {

        const weights =
          allWeights.find((w) => w.subjectId === subject.id) || {
            attendance: 10,
            late: 5,
            activities: 20,
            quizzes: 20,
            performance: 25,
            finalOutput: 20
          };

        const studentAttendances = allAttendances.filter(
          (a) =>
            a.studentId === user.id &&
            a.subjectId === subject.id
        );

        const studentSubmissions = allSubmissions.filter(
          (s) => s.studentId === user.id
        );

        const totalSessions = studentAttendances.length || 1;

        const presentPoints =
          (studentAttendances.filter((a) => a.status === 'present').length / totalSessions) * 100;

        const latePoints =
          (studentAttendances.filter((a) => a.status === 'late').length / totalSessions) * 100;

        const subjectClassworks = allClassworks.filter(
          (cw) => cw.subjectId === subject.id
        );

        const getAverage = (type: string) => {

          const group = subjectClassworks.filter(
            (cw) => cw.type === type
          );

          if (group.length === 0) return 100;

          let percentageTotal = 0;
          let count = 0;

          group.forEach((task) => {

            const sub = studentSubmissions.find(
              (s) => s.classworkId === task.id
            );

            if (sub && sub.status === 'graded') {

              const earned = sub.grade || 0;
              const total = task.totalPoints || 100;

              percentageTotal += (earned / total) * 100;
              count++;

            }

          });

          return count > 0 ? percentageTotal / count : 0;

        };

        const activityScore = getAverage('activity');
        const quizScore = getAverage('quiz');
        const performanceScore = getAverage('performance');
        const finalOutputScore = getAverage('final_output');

        const finalScore =
          presentPoints * (weights.attendance / 100) +
          latePoints * (weights.late / 100) +
          activityScore * (weights.activities / 100) +
          quizScore * (weights.quizzes / 100) +
          performanceScore * (weights.performance / 100) +
          finalOutputScore * (weights.finalOutput / 100);

        let grade = 5.0;

        if (finalScore >= 97) grade = 1.0;
        else if (finalScore >= 94) grade = 1.25;
        else if (finalScore >= 91) grade = 1.5;
        else if (finalScore >= 88) grade = 1.75;
        else if (finalScore >= 85) grade = 2.0;
        else if (finalScore >= 82) grade = 2.25;
        else if (finalScore >= 79) grade = 2.5;
        else if (finalScore >= 76) grade = 2.75;
        else if (finalScore >= 75) grade = 3.0;

        liveGrades.push({
          code: subject.code || 'SUBJ',
          description: subject.name,
          units: subject.units || 3,
          grade: grade.toFixed(2),
          letter: getLetter(grade)
        });

      }

      setRecords(liveGrades);

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

  if (loading)
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (

    <div className="max-w-5xl mx-auto space-y-8 pb-20">

      {/* Controls */}

      <div className="flex justify-between items-center print:hidden">

        <div className="w-72">

          <Select
            value={selectedTermId}
            onValueChange={(v) => {
              setSelectedTermId(v);
              loadTermGrades(v);
            }}
          >

            <SelectTrigger className="h-12 rounded-md">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>

            <SelectContent>

              {terms.map(t => (

                <SelectItem key={t.id} value={t.id}>

                  {t.name} {t.status === 'ended' ? '(Finalized)' : ''}

                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        </div>

        <Button onClick={() => window.print()} className="gap-2">

          <Printer size={16} />
          Print Grade Slip

        </Button>

      </div>

      {/* Grade Slip */}

      <Card className="bg-white border p-14 print:p-10 relative overflow-hidden">

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

        <div className="flex items-center justify-center gap-6 border-b pb-6">

          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
          />

          <div className="text-center">

            <h1 className="text-xl font-bold uppercase tracking-widest">
              AMA Education System
            </h1>

            <p className="text-sm font-semibold tracking-wide">
              Official Academic Grade Report
            </p>

            <p className="text-xs text-muted-foreground">
              AMA Computer College – Lipa Campus
            </p>

          </div>

        </div>

        {/* Student Info */}

        <div className="grid grid-cols-2 gap-8 mt-10 text-sm">

          <div className="space-y-2">

            <p><strong>Student Name:</strong> {user?.name}</p>

            <p><strong>Student ID:</strong> {user?.id}</p>

          </div>

          <div className="space-y-2 text-right">

            <p><strong>Campus:</strong> AMACC – Lipa</p>

            <p><strong>Academic Term:</strong> {terms.find(t => t.id === selectedTermId)?.name}</p>

          </div>

        </div>

        {/* Table */}

        <div className="mt-10 border">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Course Code</th>
                <th className="p-3 text-left">Course Description</th>
                <th className="p-3 text-center">Units</th>
                <th className="p-3 text-center">Final Grade</th>
                <th className="p-3 text-center">Equivalent</th>

              </tr>

            </thead>

            <tbody>

              {records.length === 0 ? (

                <tr>

                  <td colSpan={5} className="text-center py-12 text-muted-foreground">

                    <Info className="mx-auto mb-3" size={28} />

                    No academic records available.

                  </td>

                </tr>

              ) : (

                records.map((record, i) => (

                  <tr key={i} className="border-t">

                    <td className="p-3 font-semibold">{record.code}</td>
                    <td className="p-3">{record.description}</td>
                    <td className="p-3 text-center">{record.units}</td>
                    <td className="p-3 text-center font-semibold">{record.grade}</td>
                    <td className="p-3 text-center">{record.letter}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex justify-between items-end mt-12 border-t pt-6">

          <div>

            <p className="text-xs font-semibold">Registrar</p>

            <div className="border-b w-48 mt-6" />

            <p className="text-xs text-muted-foreground">
              Authorized Signature
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs font-semibold uppercase">
              General Weighted Average
            </p>

            <p className="text-4xl font-bold text-primary">
              {calculateGWA()}
            </p>

          </div>

        </div>

      </Card>

    </div>

  );

}