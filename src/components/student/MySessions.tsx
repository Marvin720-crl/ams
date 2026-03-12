'use client';

import React, { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';

import {
Calendar,
Monitor,
Clock,
Loader2
} from 'lucide-react';

import { Attendance, Subject } from '@/utils/storage';

import {
getAttendancesAction,
getSubjectsAction
} from '@/app/actions/dbActions';

type PopulatedSession = Attendance & {
  subjectName: string;
};

export default function MySessions() {

  const { user } = useAuth();

  const [sessions,setSessions] = useState<PopulatedSession[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    if(user){

      loadSessions();

    }

  },[user]);

  const loadSessions = async () => {

    if(!user) return;

    setLoading(true);

    const allAttendances =
      await getAttendancesAction();

    const allSubjects =
      await getSubjectsAction();

    const mySessions =
      allAttendances.filter(
        (s:any)=>s.studentId === user.id
      );

    const populatedSessions =
      mySessions.map(session=>{

        const subject =
          allSubjects.find(
            s=>s.id === session.subjectId
          );

        return {

          ...session,
          subjectName:
            subject?.name || 'Unknown Subject'

        };

      });

    const sorted =
      populatedSessions.sort(
        (a,b)=>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

    setSessions(sorted);

    setLoading(false);

  };

  if(loading){

    return(

      <div className="flex justify-center py-16">

        <Loader2
          className="animate-spin text-primary"
          size={36}
        />

      </div>

    );

  }

  return(

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h2 className="text-2xl sm:text-3xl font-bold">

          My Sessions

        </h2>

        <p className="text-gray-500">

          Your laboratory session history

        </p>

      </div>

      {/* Empty State */}

      {sessions.length === 0 ? (

        <div className="
        bg-white
        border
        rounded-xl
        p-12
        text-center
        ">

          <Calendar
            size={48}
            className="mx-auto mb-4 text-gray-300"
          />

          <p className="text-gray-500">

            No sessions recorded yet.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {sessions.map(session=>{

            const start =
              new Date(session.date);

            const end =
              session.timeOut
                ? new Date(session.timeOut)
                : null;

            return(

              <div
                key={session.id}
                className="
                bg-white
                border
                rounded-xl
                p-5
                hover:shadow-md
                transition
                "
              >

                <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                ">

                  {/* Session Info */}

                  <div>

                    <h3 className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-lg
                    ">

                      <Monitor
                        size={18}
                        className="text-primary"
                      />

                      {session.subjectName}

                    </h3>

                    <p className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    text-muted-foreground
                    mt-1
                    ">

                      <Clock size={14}/>

                      {start.toLocaleDateString([],{
                        dateStyle:'medium'
                      })}

                      •

                      {start.toLocaleTimeString([],{
                        hour:'2-digit',
                        minute:'2-digit'
                      })}

                      -

                      {end
                        ? end.toLocaleTimeString([],{
                            hour:'2-digit',
                            minute:'2-digit'
                          })
                        : 'Active'
                      }

                    </p>

                  </div>

                  {/* Status */}

                  <span
                    className={`
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    font-medium
                    ${
                      end
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-blue-100 text-blue-700'
                    }
                    `}
                  >

                    {end ? 'Ended' : 'Active'}

                  </span>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}