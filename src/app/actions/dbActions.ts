'use server';

import { readDb, writeDb, saveProfileImage, saveClassworkFile, saveSubmissionFile, saveChatFile } from '@/lib/db';
import { User, Subject, Enrollment, Attendance, Lab, Pc, LabRequest, AuditLog, Book, LibraryBorrowing, Room, Reservation, BorrowRequest, Schedule, Classwork, Submission, Term, TermEnrollment, GradingWeights, AcademicRecord, ExamScore, Conversation, ChatMessage } from '@/utils/storage';

/**
 * IRON WALL SECURITY PROTOCOL
 * Automated Banning & Input Sanitization
 */

const SECURITY_LIMITS = {
    MAX_TEXT_LENGTH: 15000,
    MAX_SIGNATURE_LENGTH: 300000, // 300KB limit for signatures
    SUSPICIOUS_PATTERNS: [
        /<script.*?>.*?<\/script>/gi,
        /javascript:/gi,
        /onload=/gi,
        /onerror=/gi,
        /eval\(/gi,
        /document\.cookie/gi,
        /localStorage/gi,
        /union select/gi,
        /drop table/gi,
        /truncate/gi
    ]
};

async function detectAndBan(userId: string, reason: string) {
    if (!userId || userId === 'admin') return;
    
    const users: User[] = await readDb('users');
    const idx = users.findIndex(u => u.id === userId);
    
    if (idx !== -1) {
        users[idx].isBanned = true;
        users[idx].banReason = reason;
        await writeDb('users', users);
        
        await addAuditLogAction({
            userId: 'SYSTEM_SECURITY',
            userName: 'IRON_WALL_CORE',
            action: 'AUTO_BAN_EXECUTED',
            details: `User ${userId} was automatically banned. Reason: ${reason}`
        });
    }
}

function sanitizeInput(input: any, userId?: string): any {
    if (typeof input === 'string') {
        let isViolation = false;
        let violationReason = "";

        // Check for suspicious patterns
        for (const pattern of SECURITY_LIMITS.SUSPICIOUS_PATTERNS) {
            if (pattern.test(input)) {
                isViolation = true;
                violationReason = `Malisyosong pattern detected: ${pattern.source}`;
                break;
            }
        }

        // Check for excessive length
        if (input.length > SECURITY_LIMITS.MAX_TEXT_LENGTH) {
            isViolation = true;
            violationReason = "Excessive payload length (DoS attempt)";
        }

        if (isViolation && userId) {
            // Trigger ban asynchronously
            detectAndBan(userId, violationReason);
            throw new Error(`SECURITY_BREACH: ${violationReason}`);
        }

        return input.replace(/<script.*?>.*?<\/script>/gi, '').trim();
    }
    
    if (Array.isArray(input)) return input.map(i => sanitizeInput(i, userId));
    
    if (typeof input === 'object' && input !== null) {
        const sanitized: any = {};
        for (const key in input) sanitized[key] = sanitizeInput(input[key], userId);
        return sanitized;
    }
    
    return input;
}

async function checkSecurity(userId?: string) {
    if (!userId || userId === 'admin') return;
    const users: User[] = await readDb('users');
    const user = users.find(u => u.id === userId);
    if (user?.isBanned) {
        throw new Error('SECURITY_BREACH: ACCOUNT_BANNED');
    }
}

export async function banUserAction(adminId: string, userId: string, reason: string) {
    if (adminId !== 'admin') throw new Error('UNAUTHORIZED');
    await detectAndBan(userId, reason);
}

// SYSTEM ACTIONS
export async function updateLastSeenAction(userId: string) {
    await checkSecurity(userId);
    const users = await getUsersAction();
    const index = users.findIndex((u: User) => u.id === userId);
    if (index !== -1) {
        users[index].lastSeen = new Date().toISOString();
        await writeDb('users', users);
    }
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
  const sanitized = sanitizeInput(user, user.id);
  if (users.some((u: User) => u.id === sanitized.id)) throw new Error('User already exists');
  users.push(sanitized);
  await writeDb('users', users);
  return sanitized;
}

export async function updateUserAction(id: string, updates: Partial<User>) {
  await checkSecurity(id);
  const users = await getUsersAction();
  const index = users.findIndex((u: User) => u.id === id);
  if (index !== -1) {
    const sanitized = sanitizeInput(updates, id);
    
    // Specific check for digital signature size
    if (sanitized.signature && sanitized.signature.length > SECURITY_LIMITS.MAX_SIGNATURE_LENGTH) {
        await detectAndBan(id, "Suspicious signature size (Payload over 300KB)");
        throw new Error('SECURITY_BREACH: PAYLOAD_TOO_LARGE');
    }

    if (typeof sanitized.profilePic === 'string' && sanitized.profilePic.startsWith('data:')) {
      const newPath = await saveProfileImage(id, sanitized.profilePic);
      if (newPath) sanitized.profilePic = newPath;
    }
    
    users[index] = { ...users[index], ...sanitized };
    await writeDb('users', users);
    return users[index];
  }
  return null;
}

export async function deleteUserAction(id: string) {
    let users = await getUsersAction();
    users = users.filter((u: User) => u.id !== id);
    await writeDb('users', users);
}

// SUBJECTS
export async function getSubjectsAction(): Promise<Subject[]> {
  return await readDb('subjects');
}

export async function addSubjectAction(subject: Subject) {
  const sanitized = sanitizeInput(subject, subject.teacherId);
  const subjects = await readDb('subjects');
  subjects.push(sanitized);
  await writeDb('subjects', subjects);
  return subject;
}

export async function updateSubjectAction(subject: Subject) {
    const sanitized = sanitizeInput(subject, subject.teacherId);
    const subjects = await getSubjectsAction();
    const index = subjects.findIndex((s: Subject) => s.id === subject.id);
    if (index !== -1) {
        subjects[index] = sanitized;
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
  const sanitized = sanitizeInput(enrollment, enrollment.studentId);
  const enrollments = await readDb('enrollments');
  enrollments.push(sanitized);
  await writeDb('enrollments', enrollments);
  return enrollment;
}

export async function updateEnrollmentAction(id: string, updates: Partial<Enrollment>) {
  const enrollments = await getEnrollmentsAction();
  const index = enrollments.findIndex((e: Enrollment) => e.id === id);
  if (index !== -1) {
    enrollments[index] = { ...enrollments[index], ...sanitizeInput(updates) };
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
    const sanitized = sanitizeInput(attendance, attendance.studentId);
    const allAttendances = await readDb('attendance');
    const newAttendance = { ...sanitized, id: `ATT-${Date.now()}` };
    allAttendances.push(newAttendance);
    await writeDb('attendance', allAttendances);
    if (newAttendance.pcId) {
        await updatePcAction(newAttendance.pcId, { status: 'occupied' });
    }
    return newAttendance;
}

export async function updateAttendanceAction(id: string, updates: Partial<Attendance>) {
  const sanitized = sanitizeInput(updates);
  const attendances = await getAttendancesAction();
  const index = attendances.findIndex((a: Attendance) => a.id === id);
  if (index !== -1) {
    const originalAttendance = { ...attendances[index] };
    attendances[index] = { ...originalAttendance, ...sanitized };
    await writeDb('attendance', attendances);
    if (updates.timeOut && originalAttendance.pcId) {
        await updatePcAction(originalAttendance.pcId, { status: 'available' });
    }
    return attendances[index];
  }
  return null;
}

// FACILITIES
export async function getLabsAction(): Promise<Lab[]> {
    return await readDb('labs');
}

export async function addLabAction(lab: Lab) {
    const labs = await getLabsAction();
    const pcs = await getPcsAction();
    labs.push(sanitizeInput(lab));
    for (let i = 1; i <= lab.capacity; i++) {
        pcs.push({ id: `PC-${lab.id}-${i}`, pcNumber: i.toString(), labId: lab.id, status: 'available' });
    }
    await writeDb('labs', labs);
    await writeDb('pcs', pcs);
    return lab;
}

export async function updateLabAction(id: string, updates: Partial<Lab>) {
    const labs = await getLabsAction();
    const index = labs.findIndex(l => l.id === id);
    if (index !== -1) {
        labs[index] = { ...labs[index], ...sanitizeInput(updates) };
        await writeDb('labs', labs);
        return labs[index];
    }
    return null;
}

export async function deleteLabAction(id: string) {
    let labs = await getLabsAction();
    labs = labs.filter(l => l.id !== id);
    await writeDb('labs', labs);
    let pcs = await getPcsAction();
    pcs = pcs.filter(p => p.labId !== id);
    await writeDb('pcs', pcs);
}

export async function getRoomsAction(): Promise<Room[]> {
    return await readDb('rooms');
}

export async function addRoomAction(room: Room) {
    const rooms = await getRoomsAction();
    rooms.push(sanitizeInput(room));
    await writeDb('rooms', rooms);
    return room;
}

export async function updateRoomAction(id: string, updates: Partial<Room>) {
    const rooms = await getRoomsAction();
    const index = rooms.findIndex(r => r.id === id);
    if (index !== -1) {
        rooms[index] = { ...rooms[index], ...sanitizeInput(updates) };
        await writeDb('rooms', rooms);
        return rooms[index];
    }
    return null;
}

export async function deleteRoomAction(id: string) {
    let rooms = await getRoomsAction();
    rooms = rooms.filter(r => r.id !== id);
    await writeDb('rooms', rooms);
}

export async function getPcsAction(): Promise<Pc[]> {
    return await readDb('pcs');
}

export async function updatePcAction(id: string, updates: Partial<Pc>) {
    const pcs = await getPcsAction();
    const index = pcs.findIndex(p => p.id === id);
    if (index !== -1) {
        pcs[index] = { ...pcs[index], ...sanitizeInput(updates) };
        await writeDb('pcs', pcs);
        return pcs[index];
    }
    return null;
}

export async function getReservationsAction(): Promise<Reservation[]> {
    return await readDb('reservations');
}

export async function addReservationAction(reservation: Omit<Reservation, 'id'>) {
    const res = await getReservationsAction();
    const newRes = { ...sanitizeInput(reservation, reservation.teacherId), id: `RES-${Date.now()}` };
    res.push(newRes);
    await writeDb('reservations', res);
    return newRes;
}

export async function deleteReservationAction(id: string) {
    let res = await getReservationsAction();
    res = res.filter(r => r.id !== id);
    await writeDb('reservations', res);
}

// LAB REQUESTS
export async function getLabRequestsAction(): Promise<LabRequest[]> {
    return await readDb('labrequests');
}

export async function addLabRequestAction(request: Omit<LabRequest, 'id'>) {
    const requests = await getLabRequestsAction();
    const newRequest = { ...sanitizeInput(request, request.studentId), id: `REQ-${Date.now()}` };
    requests.push(newRequest);
    await writeDb('labrequests', requests);
    return newRequest;
}

export async function updateLabRequestAction(id: string, updates: Partial<LabRequest>) {
  const requests = await getLabRequestsAction();
  const index = requests.findIndex((r: LabRequest) => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...sanitizeInput(updates) };
    await writeDb('labrequests', requests);
    return requests[index];
  }
  return null;
}

// LIBRARY
export async function getBooksAction(): Promise<Book[]> {
    return await readDb('books');
}

export async function addBookAction(book: Omit<Book, 'id'>) {
    const books = await getBooksAction();
    const newBook = { ...sanitizeInput(book), id: `BOOK-${Date.now()}` };
    books.push(newBook);
    await writeDb('books', books);
    return newBook;
}

export async function updateBookAction(id: string, updates: Partial<Book>) {
    const books = await getBooksAction();
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...sanitizeInput(updates) };
        await writeDb('books', books);
        return books[index];
    }
    return null;
}

export async function deleteBookAction(id: string) {
    let books = await getBooksAction();
    books = books.filter(b => b.id !== id);
    await writeDb('books', books);
}

export async function getLibraryBorrowingsAction(): Promise<LibraryBorrowing[]> {
    return await readDb('libraryborrowings');
}

export async function addLibraryBorrowingAction(borrowing: Omit<LibraryBorrowing, 'id'>) {
    const borrowings = await getLibraryBorrowingsAction();
    const newBorrowing = { ...sanitizeInput(borrowing, borrowing.studentId), id: `BOR-${Date.now()}` };
    borrowings.push(newBorrowing);
    await writeDb('libraryborrowings', borrowings);
    return newBorrowing;
}

export async function updateLibraryBorrowingAction(id: string, updates: Partial<LibraryBorrowing>) {
    const borrowings = await getLibraryBorrowingsAction();
    const index = borrowings.findIndex(b => b.id === id);
    if (index !== -1) {
        borrowings[index] = { ...borrowings[index], ...sanitizeInput(updates) };
        await writeDb('libraryborrowings', borrowings);
        return borrowings[index];
    }
    return null;
}

export async function getBorrowRequestsAction(): Promise<BorrowRequest[]> {
    return await readDb('borrowrequests');
}

export async function addBorrowRequestAction(request: Omit<BorrowRequest, 'id'>) {
    const requests = await getBorrowRequestsAction();
    const newRequest = { ...sanitizeInput(request, request.studentId), id: `BREQ-${Date.now()}` };
    requests.push(newRequest);
    await writeDb('borrowrequests', requests);
    return newRequest;
}

export async function updateBorrowRequestAction(id: string, updates: Partial<BorrowRequest>) {
    const requests = await getBorrowRequestsAction();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
        requests[index] = { ...requests[index], ...sanitizeInput(updates) };
        await writeDb('borrowrequests', requests);
        return requests[index];
    }
    return null;
}

// CLASSWORK & SUBMISSIONS
export async function getClassworksAction(): Promise<Classwork[]> {
    return await readDb('classworks');
}

export async function addClassworkAction(classwork: Omit<Classwork, 'id' | 'createdAt'> & { attachmentFiles?: {name: string, data: string}[] }) {
    const classworks = await getClassworksAction();
    const id = `CW-${Date.now()}`;
    const attachments = [];
    if (classwork.attachmentFiles) {
        for (const file of classwork.attachmentFiles) {
            const url = await saveClassworkFile(id, file.data, file.name);
            if (url) attachments.push({ name: file.name, url });
        }
    }
    const newClasswork = {
        ...sanitizeInput(classwork, classwork.teacherId),
        id,
        createdAt: new Date().toISOString(),
        attachments
    };
    delete (newClasswork as any).attachmentFiles;
    classworks.push(newClasswork);
    await writeDb('classworks', classworks);
    return newClasswork;
}

export async function updateClassworkAction(id: string, updates: Partial<Classwork>) {
    const classworks = await getClassworksAction();
    const index = classworks.findIndex(cw => cw.id === id);
    if (index !== -1) {
        classworks[index] = { ...classworks[index], ...sanitizeInput(updates) };
        await writeDb('classworks', classworks);
        return classworks[index];
    }
    return null;
}

export async function getSubmissionsAction(): Promise<Submission[]> {
    return await readDb('submissions');
}

export async function addSubmissionAction(submission: Omit<Submission, 'id' | 'submittedAt'> & { submissionFiles?: {name: string, data: string}[] }) {
    const submissions = await getSubmissionsAction();
    const id = `SUB-${Date.now()}`;
    const files = [];
    if (submission.submissionFiles) {
        for (const file of submission.submissionFiles) {
            const url = await saveSubmissionFile(id, file.data, file.name);
            if (url) files.push({ name: file.name, url });
        }
    }
    const newSubmission = {
        ...sanitizeInput(submission, submission.studentId),
        id,
        submittedAt: new Date().toISOString(),
        files
    };
    delete (newSubmission as any).submissionFiles;
    submissions.push(newSubmission);
    await writeDb('submissions', submissions);
    return newSubmission;
}

export async function updateSubmissionAction(id: string, updates: Partial<Submission>) {
    const submissions = await getSubmissionsAction();
    const index = submissions.findIndex(s => s.id === id);
    if (index !== -1) {
        submissions[index] = { ...submissions[index], ...sanitizeInput(updates) };
        await writeDb('submissions', submissions);
        return submissions[index];
    }
    return null;
}

// GRADING & ACADEMIC
export async function getGradingWeightsAction(): Promise<GradingWeights[]> {
    return await readDb('gradingweights');
}

export async function updateGradingWeightsAction(weights: GradingWeights) {
    const allWeights = await getGradingWeightsAction();
    const index = allWeights.findIndex(w => w.subjectId === weights.subjectId);
    if (index !== -1) {
        allWeights[index] = sanitizeInput(weights);
    } else {
        allWeights.push(sanitizeInput(weights));
    }
    await writeDb('gradingweights', allWeights);
}

export async function getAcademicRecordsAction(): Promise<AcademicRecord[]> {
    return await readDb('academicrecords');
}

// TERMS
export async function getTermsAction(): Promise<Term[]> {
    return await readDb('terms');
}

export async function addTermAction(name: string) {
    const terms = await getTermsAction();
    const newTerm: Term = {
        id: `TERM-${Date.now()}`,
        name: sanitizeInput(name),
        status: 'active',
        createdAt: new Date().toISOString()
    };
    terms.push(newTerm);
    await writeDb('terms', terms);
    return newTerm;
}

export async function endTermAction(termId: string) {
    const terms = await getTermsAction();
    const termIndex = terms.findIndex(t => t.id === termId);
    if (termIndex === -1) return;

    // 1. Mark term as ended
    terms[termIndex].status = 'ended';
    terms[termIndex].endedAt = new Date().toISOString();
    await writeDb('terms', terms);

    // 2. Finalize Academic Records
    const [enrollments, users, subjects, weights, classworks, submissions, attendances, records] = await Promise.all([
        getEnrollmentsAction(),
        getUsersAction(),
        getSubjectsAction(),
        getGradingWeightsAction(),
        getClassworksAction(),
        getSubmissionsAction(),
        getAttendancesAction(),
        getAcademicRecordsAction()
    ]);

    const termSubjects = subjects.filter(s => s.termId === termId);
    
    for (const subject of termSubjects) {
        const subjectEnrollments = enrollments.filter(e => e.subjectId === subject.id && e.status === 'approved');
        const subjectWeights = weights.find(w => w.subjectId === subject.id) || {
            attendance: 10, activities: 20, quizzes: 20, performance: 30, finalOutput: 20
        };
        const subjectClassworks = classworks.filter(cw => cw.subjectId === subject.id);

        for (const enrollment of subjectEnrollments) {
            const studentSubmissions = submissions.filter(s => s.studentId === enrollment.studentId);
            const studentAttendances = attendances.filter(a => a.studentId === enrollment.studentId && a.subjectId === subject.id);
            
            // Calculate components
            const getCompScore = (type: string) => {
                const tasks = subjectClassworks.filter(cw => cw.type === type);
                if (tasks.length === 0) return 100;
                let earned = 0, total = 0;
                tasks.forEach(t => {
                    const sub = studentSubmissions.find(s => s.classworkId === t.id);
                    earned += sub?.grade || 0;
                    total += t.totalPoints;
                });
                return total > 0 ? (earned / total) * 100 : 100;
            };

            const attendanceScore = studentAttendances.length > 0 ? (studentAttendances.filter(a => a.status === 'present').length / studentAttendances.length) * 100 : 100;
            
            const finalScore = (
                (attendanceScore * (subjectWeights.attendance / 100)) +
                (getCompScore('activity') * (subjectWeights.activities / 100)) +
                (getCompScore('quiz') * (subjectWeights.quizzes / 100)) +
                (getCompScore('performance') * (subjectWeights.performance / 100)) +
                (getCompScore('final_output') * (subjectWeights.finalOutput / 100))
            );

            // Grade Scale mapping
            const getGrade = (s: number) => {
                if(s >= 97) return 1.0; if(s >= 94) return 1.25; if(s >= 91) return 1.5;
                if(s >= 88) return 1.75; if(s >= 85) return 2.0; if(s >= 82) return 2.25;
                if(s >= 79) return 2.5; if(s >= 76) return 2.75; if(s >= 75) return 3.0;
                return 5.0;
            };

            records.push({
                id: `REC-${Date.now()}-${enrollment.studentId}-${subject.id}`,
                studentId: enrollment.studentId,
                subjectId: subject.id,
                subjectName: subject.name,
                subjectCode: subject.code || 'SUBJ',
                termId: termId,
                termName: terms[termIndex].name,
                grade: getGrade(finalScore),
                score: finalScore,
                units: subject.units || 3,
                recordedAt: new Date().toISOString()
            });
        }
    }
    await writeDb('academicrecords', records);
}

export async function getTermEnrollmentsAction(): Promise<TermEnrollment[]> {
    return await readDb('termenrollments');
}

export async function requestTermEnrollmentAction(studentId: string, termId: string) {
    const enrollments = await getTermEnrollmentsAction();
    const newEnrollment: TermEnrollment = {
        id: `TENR-${Date.now()}`,
        studentId,
        termId,
        status: 'pending',
        enrolledAt: new Date().toISOString()
    };
    enrollments.push(newEnrollment);
    await writeDb('termenrollments', enrollments);
    return newEnrollment;
}

export async function updateTermEnrollmentAction(id: string, status: 'approved' | 'rejected') {
    const enrollments = await getTermEnrollmentsAction();
    const index = enrollments.findIndex(e => e.id === id);
    if (index !== -1) {
        enrollments[index].status = status;
        await writeDb('termenrollments', enrollments);
    }
}

// CHAT ACTIONS
export async function ensureSubjectChatsAction() {
    const [subjects, conversations] = await Promise.all([
        getSubjectsAction(),
        readDb('conversations')
    ]);

    let changed = false;
    for (const subject of subjects) {
        const existing = conversations.find((c: Conversation) => c.subjectId === subject.id);
        if (!existing) {
            conversations.push({
                id: `CONV-SUB-${subject.id}`,
                name: subject.name,
                type: 'subject',
                memberIds: [subject.teacherId],
                teacherId: subject.teacherId,
                subjectId: subject.id
            });
            changed = true;
        }
    }
    if (changed) await writeDb('conversations', conversations);
}

export async function getConversationsAction(userId: string): Promise<Conversation[]> {
    const convs: Conversation[] = await readDb('conversations');
    const enrollments: Enrollment[] = await getEnrollmentsAction();
    
    // Auto-join students to subject conversations
    const userEnrollments = enrollments.filter(e => e.studentId === userId && e.status === 'approved');
    const updatedConvs = convs.map(c => {
        if (c.type === 'subject') {
            const isEnrolled = userEnrollments.some(e => e.subjectId === c.subjectId);
            if (isEnrolled && !c.memberIds.includes(userId)) {
                return { ...c, memberIds: [...c.memberIds, userId] };
            }
        }
        return c;
    });

    return updatedConvs.filter(c => c.memberIds.includes(userId));
}

export async function createConversationAction(data: Omit<Conversation, 'id'>) {
    const convs = await readDb('conversations');
    const newConv = { ...sanitizeInput(data), id: `CONV-${Date.now()}` };
    convs.push(newConv);
    await writeDb('conversations', convs);
    return newConv;
}

export async function getMessagesAction(convId: string): Promise<ChatMessage[]> {
    const msgs: ChatMessage[] = await readDb('chatmessages');
    return msgs.filter(m => m.conversationId === convId);
}

export async function sendMessageAction(message: Omit<ChatMessage, 'id' | 'timestamp'> & { fileData?: string }) {
    await checkSecurity(message.senderId);
    const messages = await readDb('chatmessages');
    let fileUrl = undefined;
    if (message.fileData && message.fileName) {
        fileUrl = await saveChatFile(message.fileName, message.fileData);
    }
    const newMessage = { 
        ...sanitizeInput(message, message.senderId), 
        id: `MSG-${Date.now()}`, 
        timestamp: new Date().toISOString(),
        fileUrl 
    };
    delete (newMessage as any).fileData;
    messages.push(newMessage);
    await writeDb('chatmessages', messages);
    
    // Update last message in conversation
    const convs = await readDb('conversations');
    const cIndex = convs.findIndex((c: any) => c.id === message.conversationId);
    if (cIndex !== -1) {
        convs[cIndex].lastMessage = message.text || (message.fileName ? 'Shared a file' : '');
        convs[cIndex].lastTimestamp = newMessage.timestamp;
        await writeDb('conversations', convs);
    }
    
    return newMessage;
}

// AUDIT LOG
export async function getAuditLogsAction(): Promise<AuditLog[]> {
    return await readDb('auditlog');
}

export async function addAuditLogAction(log: Omit<AuditLog, 'id' | 'timestamp'>) {
    const logs = await getAuditLogsAction();
    const newLog = { ...sanitizeInput(log), id: `LOG-${Date.now()}`, timestamp: new Date().toISOString() };
    logs.unshift(newLog); 
    await writeDb('auditlog', logs);
    return newLog;
}

// SETTINGS
export async function getSettingsAction() {
    return await readDb('settings');
}

export async function updateSettingsAction(updates: any) {
    const settings = await getSettingsAction();
    const newSettings = { ...settings, ...sanitizeInput(updates) };
    await writeDb('settings', newSettings);
    return newSettings;
}

export async function cleanupExpiredSessionsAction() {
    const allAttendances: Attendance[] = await getAttendancesAction();
    const allRequests: LabRequest[] = await getLabRequestsAction();
    const allSubjects: Subject[] = await getSubjectsAction();

    const now = new Date();
    let updatedCount = 0;

    const updatedAttendances = allAttendances.map((session: Attendance) => {
        if (session.timeOut) return session;

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
                        const [hours, mins] = scheduleForDay.dismissalTime.split(':').map(Number);
                        const dismissal = new Date(sessionDate);
                        dismissal.setHours(hours, mins, 0, 0);
                        if (now >= dismissal) {
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
            updatedCount++;
            return { ...session, timeOut: endTimeStr };
        }
        return session;
    });

    if (updatedCount > 0) {
        await writeDb('attendance', updatedAttendances);
        // Free up PCs
        const activePcIds = updatedAttendances.filter(a => !a.timeOut && a.pcId).map(a => a.pcId);
        const latestPcs: Pc[] = await getPcsAction();
        const updatedPcs = latestPcs.map(pc => ({
            ...pc,
            status: activePcIds.includes(pc.id) ? 'occupied' : (pc.status === 'maintenance' ? 'maintenance' : 'available')
        }));
        await writeDb('pcs', updatedPcs);
    }
    return { updated: updatedCount };
}

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
