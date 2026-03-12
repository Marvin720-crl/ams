'use server';

import { readDb, writeDb, saveProfileImage, saveClassworkFile, saveSubmissionFile } from '@/lib/db';
import { User, Subject, Enrollment, Attendance, Lab, Pc, LabRequest, AuditLog, Book, LibraryBorrowing, Room, Reservation, BorrowRequest, Schedule, Classwork, Submission, Term, TermEnrollment, GradingWeights, AcademicRecord, ExamScore, Conversation, ChatMessage, CallSession } from '@/utils/storage';

/**
 * UTILITY: Parse a time string (HH:MM) into a Date object relative to a specific date.
 */
function parseTime(timeString: string, date: Date): Date | null {
  if (!timeString) return null;
  try {
    const [hours, minutes] = timeString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  } catch {
    return null;
  }
}

// SYSTEM ACTIONS
export async function forceResetAllLabsAction() {
    const allAttendances: Attendance[] = await readDb('attendance');
    const nowStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    let closedCount = 0;
    const updatedAttendances = allAttendances.map((a: Attendance) => {
        if (!a.timeOut) {
            closedCount++;
            return { ...a, timeOut: nowStr };
        }
        return a;
    });
    
    await writeDb('attendance', updatedAttendances);

    const allPcs: Pc[] = await getPcsAction();
    const updatedPcs = allPcs.map((pc: Pc) => ({
        ...pc,
        status: pc.status === 'maintenance' ? 'maintenance' : 'available'
    }));
    
    await writeDb('pcs', updatedPcs);

    await addAuditLogAction({
        userId: 'admin',
        userName: 'System',
        action: 'Force Lab Reset',
        details: `All active sessions (${closedCount}) were auto-checked out.`
    });

    return { success: true, closedSessions: closedCount };
}

export async function cleanupExpiredSessionsAction() {
    const allPcs: Pc[] = await getPcsAction();
    const allAttendances: Attendance[] = await getAttendancesAction();
    const allRequests: LabRequest[] = await getLabRequestsAction();
    const allSubjects: Subject[] = await getSubjectsAction();

    const now = new Date();
    let updatedCount = 0;

    const updatedAttendances = [...allAttendances];
    
    for (let i = 0; i < updatedAttendances.length; i++) {
        const session = updatedAttendances[i];
        if (session.timeOut) continue;

        let shouldClose = false;
        let endTimeStr = now.toLocaleTimeString('en-US', { hour12: false });

        if (session.sessionId?.startsWith('SESS-REQ-')) {
            const requestId = session.sessionId.replace('SESS-REQ-', '');
            const request = allRequests.find((r: LabRequest) => r.id === requestId);
            if (!request || now > new Date(request.endTime)) {
                shouldClose = true;
            }
        } else {
            const subject = allSubjects.find((s: Subject) => s.id === session.subjectId);
            if (!subject) {
                shouldClose = true;
            } else {
                const sessionDate = new Date(session.date);
                if (now.toDateString() !== sessionDate.toDateString()) {
                    shouldClose = true;
                } else {
                    const sessionDay = sessionDate.toLocaleString('en-US', { weekday: 'long' });
                    const scheduleForDay = subject.schedules?.find((s: Schedule) => s.day === sessionDay);
                    if (scheduleForDay) {
                        const dismissal = parseTime(scheduleForDay.dismissalTime, sessionDate);
                        if (dismissal && now >= dismissal) {
                            shouldClose = true;
                            endTimeStr = scheduleForDay.dismissalTime;
                        }
                    } else {
                        shouldClose = true;
                    }
                }
            }
        }

        if (shouldClose) {
            updatedAttendances[i] = { ...session, timeOut: endTimeStr };
            updatedCount++;
        }
    }

    if (updatedCount > 0) await writeDb('attendance', updatedAttendances);

    const currentAttendances: Attendance[] = await readDb('attendance');
    const activePcIds = currentAttendances.filter(a => !a.timeOut && a.pcId).map(a => a.pcId);
    
    const latestPcs: Pc[] = await getPcsAction();
    let pcsChanged = false;

    for (let i = 0; i < latestPcs.length; i++) {
        const pc = latestPcs[i];
        const isActuallyOccupied = activePcIds.includes(pc.id);
        if (isActuallyOccupied && pc.status !== 'occupied') {
            latestPcs[i].status = 'occupied';
            pcsChanged = true;
        } else if (!isActuallyOccupied && pc.status === 'occupied') {
            latestPcs[i].status = 'available';
            pcsChanged = true;
        }
    }

    if (pcsChanged) await writeDb('pcs', latestPcs);
    return { updated: updatedCount };
}

// TERMS
export async function getTermsAction(): Promise<Term[]> {
    const terms = await readDb('terms');
    if (terms.length === 0) {
        const defaultTerm: Term = {
            id: 'TERM-2563',
            name: 'SY 2025-2026 (2563) (1st Trimester)',
            status: 'active',
            createdAt: new Date().toISOString()
        };
        await writeDb('terms', [defaultTerm]);
        return [defaultTerm];
    }
    return terms;
}

export async function addTermAction(name: string) {
    const terms = await getTermsAction();
    const newTerm: Term = {
        id: `TERM-${Date.now()}`,
        name,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    terms.push(newTerm);
    await writeDb('terms', terms);
    return newTerm;
}

export async function endTermAction(termId: string) {
    const terms: Term[] = await getTermsAction();
    const termIdx = terms.findIndex((t: Term) => t.id === termId);
    if (termIdx === -1) return;

    const term = terms[termIdx];

    // 1. Calculate and archive grades
    const [allEnrollments, allSubjects, allAttendances, allClassworks, allSubmissions, allWeights] = await Promise.all([
        getEnrollmentsAction(),
        getSubjectsAction(),
        getAttendancesAction(),
        getClassworksAction(),
        getSubmissionsAction(),
        getGradingWeightsAction()
    ]);

    const termSubjects = allSubjects.filter((s: Subject) => s.termId === termId);
    const academicRecords: AcademicRecord[] = await getAcademicRecordsAction();

    for (const subject of termSubjects) {
        const weights = allWeights.find((w: GradingWeights) => w.subjectId === subject.id) || {
            subjectId: subject.id, attendance: 10, late: 5, activities: 20, quizzes: 20, performance: 25, finalOutput: 20
        };

        const subjectEnrollments = allEnrollments.filter((e: Enrollment) => e.subjectId === subject.id && e.status === 'approved');

        for (const en of subjectEnrollments) {
            const studentId = en.studentId;
            const studentAttendances = allAttendances.filter((a: Attendance) => a.studentId === studentId && a.subjectId === subject.id);
            const studentSubmissions = allSubmissions.filter((s: Submission) => s.studentId === studentId);
            
            // Refined Attendance Logic
            const totalSessions = studentAttendances.length || 1;
            const presentPoints = (studentAttendances.filter((a: Attendance) => a.status === 'present').length / totalSessions) * 100;
            const latePoints = (studentAttendances.filter((a: Attendance) => a.status === 'late').length / totalSessions) * 100;

            const subjectClassworks = allClassworks.filter((cw: Classwork) => cw.subjectId === subject.id);
            const getAverage = (type: string) => {
                const group = subjectClassworks.filter((cw: Classwork) => cw.type === type);
                if (group.length === 0) return 100;
                let percentageTotal = 0;
                let count = 0;

                group.forEach((g: Classwork) => {
                    const sub = studentSubmissions.find((s: Submission) => s.classworkId === g.id);
                    if (sub && sub.status === 'graded') {
                        const earned = sub.grade || 0;
                        const total = g.totalPoints || 100;
                        percentageTotal += (earned / total) * 100;
                        count++;
                    }
                });
                return count > 0 ? (percentageTotal / count) : 0;
            };

            const activityScore = getAverage('activity');
            const quizScore = getAverage('quiz');
            const performanceScore = getAverage('performance');
            const finalOutputScore = getAverage('final_output');

            const finalScore = (
                (presentPoints * (weights.attendance / 100)) +
                (latePoints * (weights.late / 100)) +
                (activityScore * (weights.activities / 100)) +
                (quizScore * (weights.quizzes / 100)) +
                (performanceScore * (weights.performance / 100)) +
                (finalOutputScore * (weights.finalOutput / 100))
            );

            let grade = 5.00;
            if (finalScore >= 97) grade = 1.00;
            else if (finalScore >= 94) grade = 1.25;
            else if (finalScore >= 91) grade = 1.50;
            else if (finalScore >= 88) grade = 1.75;
            else if (finalScore >= 85) grade = 2.00;
            else if (finalScore >= 82) grade = 2.25;
            else if (finalScore >= 79) grade = 2.50;
            else if (finalScore >= 76) grade = 2.75;
            else if (finalScore >= 75) grade = 3.00;

            academicRecords.push({
                id: `AR-${Date.now()}-${studentId}-${subject.id}`,
                studentId,
                subjectId: subject.id,
                subjectName: subject.name,
                subjectCode: subject.code || 'SUBJ',
                termId,
                termName: term.name,
                grade,
                score: finalScore,
                units: subject.units || 3,
                recordedAt: new Date().toISOString()
            });
        }
    }

    await writeDb('academicrecords', academicRecords);

    // 2. Mark term as ended
    terms[termIdx].status = 'ended';
    terms[termIdx].endedAt = new Date().toISOString();
    await writeDb('terms', terms);

    // 3. Clear active data for this term
    let subjects = await getSubjectsAction();
    subjects = subjects.filter((s: Subject) => s.termId !== termId);
    await writeDb('subjects', subjects);

    let enrollments = await getEnrollmentsAction();
    enrollments = enrollments.filter((e: Enrollment) => !termSubjects.some((s: Subject) => s.id === e.subjectId));
    await writeDb('enrollments', enrollments);

    await forceResetAllLabsAction();
}

// TERM ENROLLMENTS
export async function getTermEnrollmentsAction(): Promise<TermEnrollment[]> {
    const data = await readDb('termenrollments');
    // MIGRATION: Ensure all existing students are in Term 2563
    const users: User[] = await getUsersAction();
    const students = users.filter((u: User) => u.role === 'student');
    let changed = false;
    for (const s of students) {
        if (!data.some((e: TermEnrollment) => e.studentId === s.id && e.termId === 'TERM-2563')) {
            data.push({
                id: `TENR-MIG-${s.id}`,
                studentId: s.id,
                termId: 'TERM-2563',
                status: 'approved',
                enrolledAt: new Date().toISOString()
            });
            changed = true;
        }
    }
    if (changed) await writeDb('termenrollments', data);
    return data;
}

export async function requestTermEnrollmentAction(studentId: string, termId: string) {
    const data = await getTermEnrollmentsAction();
    if (data.some((e: TermEnrollment) => e.studentId === studentId && e.termId === termId)) return;
    const newReq: TermEnrollment = {
        id: `TENR-${Date.now()}`,
        studentId,
        termId,
        status: 'pending',
        enrolledAt: new Date().toISOString()
    };
    data.push(newReq);
    await writeDb('termenrollments', data);
}

export async function updateTermEnrollmentAction(id: string, status: 'approved' | 'rejected') {
    const data = await getTermEnrollmentsAction();
    const idx = data.findIndex((e: TermEnrollment) => e.id === id);
    if (idx !== -1) {
        data[idx].status = status;
        await writeDb('termenrollments', data);
    }
}

// GRADING WEIGHTS
export async function getGradingWeightsAction(): Promise<GradingWeights[]> {
    return await readDb('gradingweights');
}

export async function updateGradingWeightsAction(weights: GradingWeights) {
    const data: GradingWeights[] = await getGradingWeightsAction();
    const idx = data.findIndex((w: GradingWeights) => w.subjectId === weights.subjectId);
    if (idx !== -1) {
        data[idx] = weights;
    } else {
        data.push(weights);
    }
    await writeDb('gradingweights', data);
}

// EXAM SCORES
export async function getExamScoresAction(): Promise<ExamScore[]> {
    return await readDb('examscores');
}

export async function addExamScoreAction(score: ExamScore) {
    const data: ExamScore[] = await getExamScoresAction();
    const idx = data.findIndex((s: ExamScore) => s.studentId === score.studentId && s.subjectId === score.subjectId);
    if (idx !== -1) {
        data[idx] = score;
    } else {
        data.push(score);
    }
    await writeDb('examscores', data);
}

// ACADEMIC RECORDS
export async function getAcademicRecordsAction(): Promise<AcademicRecord[]> {
    return await readDb('academicrecords');
}

// USERS
export async function getUsersAction(): Promise<User[]> {
  return await readDb('users');
}

export async function getUserByIdAction(id: string): Promise<User | null> {
  const users = await getUsersAction();
  return users.find((u: User) => u.id === id) || null;
}

export async function addUserAction(user: User) {
  const users = await readDb('users');
  users.push(user);
  await writeDb('users', users);
  await addAuditLogAction({
    userId: 'admin',
    userName: 'System',
    action: 'User Created',
    details: `User ${user.name} (${user.id}) was created.`
  });
  return user;
}

export async function updateUserAction(id: string, updates: Partial<User>) {
  const users = await getUsersAction();
  const index = users.findIndex((u: User) => u.id === id);
  if (index !== -1) {
    if (typeof updates.profilePic === 'string' && updates.profilePic.startsWith('data:')) {
      const newPath = await saveProfileImage(id, updates.profilePic);
      if (newPath) updates.profilePic = newPath;
    }
    users[index] = { ...users[index], ...updates };
    await writeDb('users', users);
    return users[index];
  }
  return null;
}

export async function deleteUserAction(id: string) {
    let users = await getUsersAction();
    const userToDelete = users.find((u: User) => u.id === id);
    if(userToDelete) {
        users = users.filter((u: User) => u.id !== id);
        await writeDb('users', users);
        await addAuditLogAction({
            userId: 'admin',
            userName: 'System',
            action: 'User Deleted',
            details: `User ${userToDelete.name} (${id}) was deleted.`
          });
    }
}

// SUBJECTS
export async function getSubjectsAction(): Promise<Subject[]> {
  return await readDb('subjects');
}

export async function addSubjectAction(subject: Subject) {
  const subjects = await readDb('subjects');
  subjects.push(subject);
  await writeDb('subjects', subjects);
  return subject;
}

export async function updateSubjectAction(subject: Subject) {
    const subjects = await getSubjectsAction();
    const index = subjects.findIndex((s: Subject) => s.id === subject.id);
    if (index !== -1) {
        subjects[index] = subject;
        await writeDb('subjects', subjects);
        return subjects[index];
    }
    return null;
}

export async function deleteSubjectAction(subjectId: string) {
    let subjects = await getSubjectsAction();
    subjects = subjects.filter((s: Subject) => s.id !== subjectId);
    await writeDb('subjects', subjects);
}

// ENROLLMENTS
export async function getEnrollmentsAction(): Promise<Enrollment[]> {
  return await readDb('enrollments');
}

export async function addEnrollmentAction(enrollment: Enrollment) {
  const enrollments = await readDb('enrollments');
  enrollments.push(enrollment);
  await writeDb('enrollments', enrollments);
  return enrollment;
}

export async function updateEnrollmentAction(id: string, updates: Partial<Enrollment>) {
  const enrollments = await getEnrollmentsAction();
  const index = enrollments.findIndex((e: Enrollment) => e.id === id);
  if (index !== -1) {
    enrollments[index] = { ...enrollments[index], ...updates };
    await writeDb('enrollments', enrollments);
    return enrollments[index];
  }
  return null;
}

// ATTENDANCE
export async function getAttendancesAction(): Promise<Attendance[]> {
  return await readDb('attendance');
}

export async function addAttendanceAction(attendance: Omit<Attendance, 'id'>) {
    const allAttendances = await readDb('attendance');
    const newAttendance = { ...attendance, id: `ATT-${Date.now()}` };
    allAttendances.push(newAttendance);
    await writeDb('attendance', allAttendances);
    if (newAttendance.pcId) {
        await updatePcAction(newAttendance.pcId, { status: 'occupied' });
    }
    return newAttendance;
}

export async function updateAttendanceAction(id: string, updates: Partial<Attendance>) {
  const attendances = await getAttendancesAction();
  const index = attendances.findIndex((a: Attendance) => a.id === id);
  if (index !== -1) {
    const originalAttendance = { ...attendances[index] };
    attendances[index] = { ...originalAttendance, ...updates };
    await writeDb('attendance', attendances);
    if (updates.timeOut && originalAttendance.pcId) {
        await updatePcAction(originalAttendance.pcId, { status: 'available' });
    }
    return attendances[index];
  }
  return null;
}

// ROOMS
export async function getRoomsAction(): Promise<Room[]> {
    return await readDb('rooms');
}

export async function addRoomAction(room: Room) {
    const rooms = await getRoomsAction();
    rooms.push(room);
    await writeDb('rooms', rooms);
    return room;
}

export async function updateRoomAction(id: string, updates: Partial<Room>) {
    const rooms = await getRoomsAction();
    const index = rooms.findIndex((r: Room) => r.id === id);
    if (index !== -1) {
        rooms[index] = { ...rooms[index], ...updates };
        await writeDb('rooms', rooms);
        return rooms[index];
    }
    return null;
}

export async function deleteRoomAction(id: string) {
    let rooms = await getRoomsAction();
    rooms = rooms.filter((r: Room) => r.id !== id);
    await writeDb('rooms', rooms);
}

// LABS
export async function getLabsAction(): Promise<Lab[]> {
    return await readDb('labs');
}

export async function addLabAction(lab: Lab) {
    const labs = await getLabsAction();
    labs.push(lab);
    await writeDb('labs', labs);
    const pcs = await getPcsAction();
    for (let i = 1; i <= lab.capacity; i++) {
        pcs.push({
            id: `PC-${lab.id}-${i}`,
            pcNumber: i.toString(),
            labId: lab.id,
            status: 'available',
        });
    }
    await writeDb('pcs', pcs);
    return lab;
}

export async function updateLabAction(id: string, updates: Partial<Lab>) {
    const labs = await getLabsAction();
    const index = labs.findIndex((l: Lab) => l.id === id);
    if (index !== -1) {
        const oldLab = { ...labs[index] };
        const newLabData = { ...labs[index], ...updates };
        if (updates.capacity !== undefined && updates.capacity !== oldLab.capacity) {
            const newCapacity = updates.capacity;
            const oldCapacity = oldLab.capacity;
            let allPcs = await getPcsAction();
            if (newCapacity > oldCapacity) {
                for (let i = oldCapacity + 1; i <= newCapacity; i++) {
                    allPcs.push({ id: `PC-${id}-${i}`, pcNumber: i.toString(), labId: id, status: 'available' });
                }
            } else { 
                const pcsForThisLab = allPcs.filter((pc: Pc) => pc.labId === id);
                const pcNumbersToRemove = pcsForThisLab.map(pc => parseInt(pc.pcNumber)).sort((a, b) => b-a).slice(0, oldCapacity - newCapacity);
                const pcIdsToRemove = pcsForThisLab.filter(pc => pcNumbersToRemove.includes(parseInt(pc.pcNumber))).map(pc => pc.id);
                allPcs = allPcs.filter(pc => !pcIdsToRemove.includes(pc.id));
            }
            await writeDb('pcs', allPcs);
        }
        labs[index] = newLabData;
        await writeDb('labs', labs);
        return newLabData;
    }
    return null;
}

export async function deleteLabAction(id: string) {
    let labs = await getLabsAction();
    labs = labs.filter((l: Lab) => l.id !== id);
    await writeDb('labs', labs);
    let pcs = await getPcsAction();
    pcs = pcs.filter((pc: Pc) => pc.labId !== id);
    await writeDb('pcs', pcs);
}

// PCs
export async function getPcsAction(): Promise<Pc[]> {
    return await readDb('pcs');
}

export async function addPcAction(pc: Pc) {
    const pcs = await getPcsAction();
    pcs.push(pc);
    await writeDb('pcs', pcs);
    return pc;
}

export async function updatePcAction(id: string, updates: Partial<Pc>) {
    const pcs = await getPcsAction();
    const index = pcs.findIndex((pc: Pc) => pc.id === id);
    if (index !== -1) {
        pcs[index] = { ...pcs[index], ...updates };
        await writeDb('pcs', pcs);
        return pcs[index];
    }
    return null;
}

// LAB REQUESTS
export async function getLabRequestsAction(): Promise<LabRequest[]> {
    return await readDb('labrequests');
}

export async function addLabRequestAction(request: Omit<LabRequest, 'id'>) {
    const requests = await getLabRequestsAction();
    const newRequest = { ...request, id: `REQ-${Date.now()}` };
    requests.push(newRequest);
    await writeDb('labrequests', requests);
    return newRequest;
}

export async function updateLabRequestAction(id: string, updates: Partial<LabRequest>) {
  const requests = await getLabRequestsAction();
  const index = requests.findIndex((r: LabRequest) => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    await writeDb('labrequests', requests);
    return requests[index];
  }
  return null;
}

// AUDIT LOG
export async function getAuditLogsAction(): Promise<AuditLog[]> {
    return await readDb('auditlog');
}

export async function addAuditLogAction(log: Omit<AuditLog, 'id' | 'timestamp'>) {
    const logs = await getAuditLogsAction();
    const newLog = { ...log, id: `LOG-${Date.now()}`, timestamp: new Date().toISOString() };
    logs.unshift(newLog); 
    await writeDb('auditlog', logs);
    return newLog;
}

// SETTINGS
export async function getSettingsAction(): Promise<any> {
    try {
        return await readDb('settings');
    } catch (e) {
        const defaultSettings = { teacherSecret: "changeme" };
        await writeDb('settings', defaultSettings);
        return defaultSettings;
    }
}

export async function updateSettingsAction(updates: any) {
    const settings = await getSettingsAction();
    const updatedSettings = { ...settings, ...updates };
    await writeDb('settings', updatedSettings);
    return updatedSettings;
}

// BOOKS
export async function getBooksAction(): Promise<Book[]> {
    return await readDb('books');
}

export async function addBookAction(book: Omit<Book, 'id'>) {
    const books = await getBooksAction();
    const newBook = { ...book, id: `BOOK-${Date.now()}`};
    books.push(newBook);
    await writeDb('books', books);
    return newBook;
}

export async function updateBookAction(id: string, updates: Partial<Book>) {
    const books = await getBooksAction();
    const index = books.findIndex((b: Book) => b.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...updates };
        await writeDb('books', books);
        return books[index];
    }
    return null;
}

export async function deleteBookAction(id: string) {
    let books = await getBooksAction();
    books = books.filter((b: Book) => b.id !== id);
    await writeDb('books', books);
}

// LIBRARY BORROWINGS
export async function getLibraryBorrowingsAction(): Promise<LibraryBorrowing[]> {
    return await readDb('libraryborrowings');
}

export async function addLibraryBorrowingAction(borrowing: Omit<LibraryBorrowing, 'id'>) {
    const borrowings = await getLibraryBorrowingsAction();
    const newBorrowing = { ...borrowing, id: `LB-${Date.now()}`};
    borrowings.push(newBorrowing);
    await writeDb('libraryborrowings', borrowings);
    return newBorrowing;
}

export async function updateLibraryBorrowingAction(id: string, updates: Partial<LibraryBorrowing>) {
    const borrowings = await getLibraryBorrowingsAction();
    const index = borrowings.findIndex((b: LibraryBorrowing) => b.id === id);
    if (index !== -1) {
        borrowings[index] = { ...borrowings[index], ...updates };
        await writeDb('libraryborrowings', borrowings);
        return borrowings[index];
    }
    return null;
}

// BORROW REQUESTS
export async function getBorrowRequestsAction(): Promise<BorrowRequest[]> {
    return await readDb('borrowrequests');
}

export async function addBorrowRequestAction(request: Omit<BorrowRequest, 'id'>) {
    const requests = await getBorrowRequestsAction();
    const newRequest = { ...request, id: `BR-${Date.now()}` };
    requests.push(newRequest);
    await writeDb('borrowrequests', requests);
    return newRequest;
}

export async function updateBorrowRequestAction(id: string, updates: Partial<BorrowRequest>) {
  const requests = await getBorrowRequestsAction();
  const index = requests.findIndex((r: BorrowRequest) => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    await writeDb('borrowrequests', requests);
    return requests[index];
  }
  return null;
}

// RESERVATIONS
export async function getReservationsAction(): Promise<Reservation[]> {
    return await readDb('reservations');
}

export async function addReservationAction(reservation: Omit<Reservation, 'id'>) {
    const reservations = await getReservationsAction();
    const newReservation = { ...reservation, id: `RES-${Date.now()}`};
    await writeDb('reservations', [...reservations, newReservation]);
    return newReservation;
}

export async function deleteReservationAction(id: string) {
    let reservations = await getReservationsAction();
    reservations = reservations.filter((r: Reservation) => r.id !== id);
    await writeDb('reservations', reservations);
}

// CLASSWORK
export async function getClassworksAction(): Promise<Classwork[]> {
    return await readDb('classworks');
}

export async function addClassworkAction(classwork: Omit<Classwork, 'id' | 'createdAt' | 'attachments'> & { attachmentFiles?: { name: string, data: string }[] }) {
    const classworks = await getClassworksAction();
    const newClasswork: Partial<Classwork> = { ...classwork, id: `CW-${Date.now()}`, createdAt: new Date().toISOString(), attachments: [] };
    if (classwork.attachmentFiles && classwork.attachmentFiles.length > 0) {
        for (const file of classwork.attachmentFiles) {
            const fileUrl = await saveClassworkFile(newClasswork.id!, file.data, file.name);
            if (fileUrl) newClasswork.attachments?.push({ name: file.name, url: fileUrl });
        }
    }
    delete (newClasswork as any).attachmentFiles;
    classworks.push(newClasswork as Classwork);
    await writeDb('classworks', classworks);
    return newClasswork;
}

export async function updateClassworkAction(id: string, updates: Partial<Classwork>) {
  const classworks = await getClassworksAction();
  const index = classworks.findIndex((c: Classwork) => c.id === id);
  if (index !== -1) {
    classworks[index] = { ...classworks[index], ...updates };
    await writeDb('classworks', classworks);
    return classworks[index];
  }
  return null;
}

// SUBMISSIONS
export async function getSubmissionsAction(): Promise<Submission[]> {
    return await readDb('submissions');
}

export async function addSubmissionAction(submission: Omit<Submission, 'id' | 'submittedAt' | 'files'> & { submissionFiles?: { name: string, data: string }[] }) {
    const submissions = await getSubmissionsAction();
    const newSubmission: Partial<Submission> = { ...submission, id: `SUBM-${Date.now()}`, submittedAt: new Date().toISOString(), files: [] };
    if (submission.submissionFiles && submission.submissionFiles.length > 0) {
        for (const file of submission.submissionFiles) {
            const fileUrl = await saveSubmissionFile(newSubmission.id!, file.data, file.name);
            if (fileUrl) newSubmission.files?.push({ name: file.name, url: fileUrl });
        }
    }
    delete (newSubmission as any).submissionFiles;
    submissions.push(newSubmission as Submission);
    await writeDb('submissions', submissions);
    return newSubmission;
}

export async function updateSubmissionAction(id: string, updates: Partial<Submission>) {
    const submissions = await getSubmissionsAction();
    const index = submissions.findIndex((s: Submission) => s.id === id);
    if (index !== -1) {
        submissions[index] = { ...submissions[index], ...updates };
        await writeDb('submissions', submissions);
        return submissions[index];
    }
    return null;
}

// CHAT ACTIONS
export async function getConversationsAction(userId: string): Promise<Conversation[]> {
    const conversations: Conversation[] = await readDb('conversations');
    return conversations.filter(c => c.memberIds.includes(userId));
}

export async function createConversationAction(conversation: Omit<Conversation, 'id'>) {
    const conversations = await readDb('conversations');
    const newConversation = { ...conversation, id: `CONV-${Date.now()}` };
    conversations.push(newConversation);
    await writeDb('conversations', conversations);
    return newConversation;
}

export async function getMessagesAction(conversationId: string): Promise<ChatMessage[]> {
    const messages: ChatMessage[] = await readDb('chatmessages');
    return messages.filter(m => m.conversationId === conversationId);
}

export async function sendMessageAction(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    const messages = await readDb('chatmessages');
    const newMessage = { ...message, id: `MSG-${Date.now()}`, timestamp: new Date().toISOString() };
    messages.push(newMessage);
    await writeDb('chatmessages', messages);
    
    // Update conversation last message info
    const conversations = await readDb('conversations');
    const idx = conversations.findIndex((c: Conversation) => c.id === message.conversationId);
    if (idx !== -1) {
        conversations[idx].lastMessage = message.text;
        conversations[idx].lastTimestamp = newMessage.timestamp;
        await writeDb('conversations', conversations);
    }
    
    return newMessage;
}

export async function ensureSubjectChatsAction() {
    const subjects = await getSubjectsAction();
    const enrollments = await getEnrollmentsAction();
    const conversations: Conversation[] = await readDb('conversations');
    
    let changed = false;
    for (const subject of subjects) {
        // Check if a conversation for this subject already exists
        let conv = conversations.find(c => c.subjectId === subject.id);
        
        // Members = teacher + approved students
        const approvedStudentIds = enrollments
            .filter(e => e.subjectId === subject.id && e.status === 'approved')
            .map(e => e.studentId);
        const memberIds = [subject.teacherId, ...approvedStudentIds];
        
        if (!conv) {
            conversations.push({
                id: `CONV-SUB-${subject.id}`,
                name: subject.name,
                type: 'subject',
                memberIds: memberIds,
                teacherId: subject.teacherId,
                subjectId: subject.id
            });
            changed = true;
        } else {
            // Update members list if it changed
            if (JSON.stringify(conv.memberIds.sort()) !== JSON.stringify(memberIds.sort())) {
                const idx = conversations.findIndex(c => c.id === conv?.id);
                conversations[idx].memberIds = memberIds;
                changed = true;
            }
        }
        
        // Also ensure a "#general" chat exists for each teacher's subjects
        let generalConv = conversations.find(c => c.teacherId === subject.teacherId && c.type === 'general');
        if (!generalConv) {
            conversations.push({
                id: `CONV-GEN-${subject.teacherId}`,
                name: "Teacher General",
                type: 'general',
                memberIds: memberIds,
                teacherId: subject.teacherId
            });
            changed = true;
        } else {
            // Update general members list (all students of this teacher)
            const allTeacherStudents = enrollments
                .filter(e => {
                    const sub = subjects.find(s => s.id === e.subjectId);
                    return sub?.teacherId === subject.teacherId && e.status === 'approved';
                })
                .map(e => e.studentId);
            const updatedGeneralMembers = Array.from(new Set([subject.teacherId, ...allTeacherStudents]));
            
            if (JSON.stringify(generalConv.memberIds.sort()) !== JSON.stringify(updatedGeneralMembers.sort())) {
                const idx = conversations.findIndex(c => c.id === generalConv?.id);
                conversations[idx].memberIds = updatedGeneralMembers;
                changed = true;
            }
        }
    }
    
    if (changed) {
        await writeDb('conversations', conversations);
    }
}

// CALLING ACTIONS
export async function getActiveCallsAction(userId: string): Promise<CallSession[]> {
    const calls: CallSession[] = await readDb('calls');
    const conversations: Conversation[] = await getConversationsAction(userId);
    const myConvIds = conversations.map(c => c.id);
    return calls.filter(c => c.status === 'pending' && myConvIds.includes(c.conversationId) && c.callerId !== userId);
}

export async function initiateCallAction(call: Omit<CallSession, 'id' | 'startedAt' | 'status'>) {
    const calls: CallSession[] = await readDb('calls');
    const newCall: CallSession = {
        ...call,
        id: `CALL-${Date.now()}`,
        status: 'pending',
        startedAt: new Date().toISOString()
    };
    calls.push(newCall);
    await writeDb('calls', calls);
    return newCall;
}

export async function updateCallStatusAction(id: string, status: 'active' | 'ended') {
    const calls: CallSession[] = await readDb('calls');
    const idx = calls.findIndex(c => c.id === id);
    if (idx !== -1) {
        calls[idx].status = status;
        await writeDb('calls', calls);
    }
}
