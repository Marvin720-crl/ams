
'use server';

import { readDb, writeDb, saveProfileImage } from '@/lib/db';
import { User, Subject, Enrollment, Attendance, Lab, Pc, LabRequest, AuditLog, Book, LibraryBorrowing, Room, Reservation, BorrowRequest } from '@/utils/storage';

export async function cleanupExpiredSessionsAction() {
    const allPcs: Pc[] = await getPcsAction();
    const occupiedPcs = allPcs.filter((pc: Pc) => pc.status === 'occupied');
    if (occupiedPcs.length === 0) return { updated: 0 };

    const allAttendances: Attendance[] = await getAttendancesAction();
    const allRequests: LabRequest[] = await getLabRequestsAction();
    const now = new Date();
    let updatedCount = 0;

    for (const pc of occupiedPcs) {
        const activeSession = allAttendances.find((a: Attendance) => a.pcId === pc.id && !a.timeOut);
        
        // Check for sessions from Lab Requests that have expired
        if (activeSession && activeSession.sessionId?.startsWith('SESS-REQ-')) {
            const requestId = activeSession.sessionId.replace('SESS-REQ-', '');
            const request = allRequests.find((r: LabRequest) => r.id === requestId);
            
            if (request) {
                try {
                    const endTime = new Date(request.endTime);
                    if (now > endTime) {
                        await updatePcAction(pc.id, { status: 'available' });
                        // Also update the attendance record to mark it as timed-out
                        await updateAttendanceAction(activeSession.id, { timeOut: endTime.toLocaleTimeString('en-US', { hour12: false }) });
                        updatedCount++;
                    }
                } catch(e) {
                    console.error("Error processing expired session for request:", request.id, e);
                }
            }
        }
    }
    return { updated: updatedCount };
}


// USERS
export async function getUsersAction(): Promise<User[]> {
  return await readDb('users');
}

export async function getUserByIdAction(id: string): Promise<User | null> {
  const users = await getUsersAction();
  return users.find(u => u.id === id) || null;
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
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    if (updates.profilePic && updates.profilePic.startsWith('data:')) {
      const newPath = await saveProfileImage(id, updates.profilePic);
      if (newPath) updates.profilePic = newPath;
    }
    
    users[index] = { ...users[index], ...updates };
    await writeDb('users', users);
    await addAuditLogAction({
      userId: id,
      userName: users[index].name,
      action: 'Profile Updated',
      details: `User profile for ${users[index].name} was updated.`
    });
    return users[index];
  }
  return null;
}

export async function deleteUserAction(id: string) {
    let users = await getUsersAction();
    const userToDelete = users.find(u => u.id === id);
    if(userToDelete) {
        users = users.filter(u => u.id !== id);
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
  await addAuditLogAction({
    userId: subject.teacherId,
    userName: subject.teacherName,
    action: 'Subject Added',
    details: `Subject "${subject.name}" was added.`
  });
  return subject;
}

export async function updateSubjectAction(subject: Subject) {
    const subjects = await getSubjectsAction();
    const index = subjects.findIndex(s => s.id === subject.id);
    if (index !== -1) {
        subjects[index] = subject;
        await writeDb('subjects', subjects);
        await addAuditLogAction({
            userId: subject.teacherId,
            userName: subject.teacherName,
            action: 'Subject Updated',
            details: `Subject "${subject.name}" was updated.`
          });
        return subjects[index];
    }
    return null;
}

export async function deleteSubjectAction(subjectId: string) {
    let subjects = await getSubjectsAction();
    const subjectToDelete = subjects.find(s => s.id === subjectId);
    if (subjectToDelete) {
        subjects = subjects.filter(s => s.id !== subjectId);
        await writeDb('subjects', subjects);
        await addAuditLogAction({
            userId: subjectToDelete.teacherId,
            userName: subjectToDelete.teacherName,
            action: 'Subject Deleted',
            details: `Subject "${subjectToDelete.name}" was deleted.`
          });
    }
}


// ENROLLMENTS
export async function getEnrollmentsAction(): Promise<Enrollment[]> {
  return await readDb('enrollments');
}

export async function addEnrollmentAction(enrollment: Enrollment) {
  const enrollments = await readDb('enrollments');
  enrollments.push(enrollment);
  await writeDb('enrollments', enrollments);
  await addAuditLogAction({
    userId: enrollment.studentId,
    userName: 'Student', // Name not available here
    action: 'Enrollment Request',
    details: `Student ${enrollment.studentId} requested to enroll in subject ${enrollment.subjectId}.`
  });
  return enrollment;
}

export async function updateEnrollmentAction(id: string, updates: Partial<Enrollment>) {
  const enrollments = await getEnrollmentsAction();
  const index = enrollments.findIndex(e => e.id === id);
  if (index !== -1) {
    enrollments[index] = { ...enrollments[index], ...updates };
    await writeDb('enrollments', enrollments);
    await addAuditLogAction({
        userId: 'teacher', // Assume a teacher is doing this
        userName: 'Teacher',
        action: `Enrollment ${updates.status}`,
        details: `Enrollment ${id} status changed to ${updates.status}.`
      });
    return enrollments[index];
  }
  return null;
}

// ATTENDANCE
export async function getAttendancesAction(): Promise<Attendance[]> {
  return await readDb('attendance');
}

export async function addAttendanceAction(attendance: Omit<Attendance, 'id'>) {
    const attendances = await readDb('attendance');
    const newAttendance = { ...attendance, id: `ATT-${Date.now()}` };
    attendances.push(newAttendance);
    await writeDb('attendance', attendances);

    // If a PC was assigned, update its status
    if (newAttendance.pcId) {
        await updatePcAction(newAttendance.pcId, { status: 'occupied' });
    }
    
    // Create a more detailed audit log
    const users = await readDb('users');
    const student = users.find(u => u.id === newAttendance.studentId);
    const subjects = await readDb('subjects');
    const subject = subjects.find(s => s.id === newAttendance.subjectId);

    let locationDetails = '';
    if (newAttendance.locationId && newAttendance.locationType) {
        if (newAttendance.locationType === 'lab') {
            const labs = await readDb('labs');
            const lab = labs.find(l => l.id === newAttendance.locationId);
            locationDetails = ` in ${lab?.name || 'lab'}`;
            if (newAttendance.pcId) {
                const pcNumber = newAttendance.pcId.split('-').pop();
                locationDetails += ` (PC: ${pcNumber})`;
            }
        } else { // room
            const rooms = await readDb('rooms');
            const room = rooms.find(r => r.id === newAttendance.locationId);
            locationDetails = ` in ${room?.name || 'room'}`;
        }
    }

    await addAuditLogAction({
        userId: newAttendance.studentId,
        userName: student?.name || 'Student',
        action: 'Attendance Marked',
        details: `Marked ${newAttendance.status} for subject ${subject?.name || newAttendance.subjectId}${locationDetails}.`
    });
    
    return newAttendance;
}


export async function updateAttendanceAction(id: string, updates: Partial<Attendance>) {
  const attendances = await getAttendancesAction();
  const index = attendances.findIndex(a => a.id === id);
  if (index !== -1) {
    const originalAttendance = { ...attendances[index] };
    attendances[index] = { ...originalAttendance, ...updates };
    await writeDb('attendance', attendances);

    // If timing out and there was a pcId, free up the PC
    if (updates.timeOut && originalAttendance.pcId) {
        await updatePcAction(originalAttendance.pcId, { status: 'available' });
    }

    await addAuditLogAction({
        userId: attendances[index].studentId,
        userName: 'Student', // Name not available here
        action: 'Attendance Updated',
        details: `Attendance ${id} updated. Timeout: ${updates.timeOut}`
      });
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
    const index = rooms.findIndex(r => r.id === id);
    if (index !== -1) {
        rooms[index] = { ...rooms[index], ...updates };
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

// LABS
export async function getLabsAction(): Promise<Lab[]> {
    return await readDb('labs');
}

export async function addLabAction(lab: Lab) {
    const labs = await getLabsAction();
    labs.push(lab);
    await writeDb('labs', labs);
    
    // Automatically add PCs based on capacity
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
    const index = labs.findIndex(l => l.id === id);
    if (index !== -1) {
        const oldLab = { ...labs[index] };
        const newLabData = { ...labs[index], ...updates };

        // If capacity has changed, update PCs
        if (updates.capacity !== undefined && updates.capacity !== oldLab.capacity) {
            const newCapacity = updates.capacity;
            const oldCapacity = oldLab.capacity;
            let allPcs = await getPcsAction();

            if (newCapacity > oldCapacity) {
                // Add new PCs
                for (let i = oldCapacity + 1; i <= newCapacity; i++) {
                    allPcs.push({
                        id: `PC-${id}-${i}`,
                        pcNumber: i.toString(),
                        labId: id,
                        status: 'available',
                    });
                }
            } else { // newCapacity < oldCapacity
                const pcsForThisLab = allPcs.filter(pc => pc.labId === id);
                const pcNumbersToRemove = pcsForThisLab
                    .map(pc => parseInt(pc.pcNumber))
                    .sort((a,b) => b-a) // sort descending
                    .slice(0, oldCapacity - newCapacity);
                
                const pcIdsToRemove = pcsForThisLab
                    .filter(pc => pcNumbersToRemove.includes(parseInt(pc.pcNumber)))
                    .map(pc => pc.id);

                // Filter out the PCs to remove
                allPcs = allPcs.filter(pc => !pcIdsToRemove.includes(pc.id));

                // Also remove any pending/approved requests for these PCs
                let allRequests = await getLabRequestsAction();
                allRequests = allRequests.filter(req => !pcIdsToRemove.includes(req.pcId!));
                await writeDb('labrequests', allRequests);
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
    labs = labs.filter(l => l.id !== id);
    await writeDb('labs', labs);

    let pcs = await getPcsAction();
    pcs = pcs.filter(pc => pc.labId !== id);
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
    const index = pcs.findIndex(pc => pc.id === id);
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
    await addAuditLogAction({
        userId: newRequest.studentId,
        userName: 'Student',
        action: 'Lab Request Created',
        details: `Request for Lab ${newRequest.labId} for subject ${newRequest.subjectId}.`
      });
    return newRequest;
}

export async function updateLabRequestAction(id: string, updates: Partial<LabRequest>) {
  const requests = await getLabRequestsAction();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    await writeDb('labrequests', requests);
    await addAuditLogAction({
        userId: requests[index].teacherId,
        userName: 'Teacher',
        action: `Lab Request ${updates.status}`,
        details: `Request ${id} status changed to ${updates.status}.`
      });
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
    const newLog = { 
        ...log, 
        id: `LOG-${Date.now()}`, 
        timestamp: new Date().toISOString() 
    };
    logs.unshift(newLog); // Add to the beginning
    await writeDb('auditlog', logs);
    return newLog;
}

// SETTINGS
export async function getSettingsAction(): Promise<any> {
    try {
        return await readDb('settings');
    } catch (e) {
        // if settings do not exist, create it
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
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...updates };
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
    const index = borrowings.findIndex(b => b.id === id);
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
  const index = requests.findIndex(r => r.id === id);
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
    reservations.push(newReservation);
    await writeDb('reservations', reservations);
    await addAuditLogAction({
        userId: newReservation.teacherId,
        userName: 'Teacher',
        action: 'Reservation Created',
        details: `Reserved ${newReservation.locationType} ${newReservation.locationId} for subject ${newReservation.subjectId} on ${newReservation.date}.`
      });
    return newReservation;
}

export async function deleteReservationAction(id: string) {
    let reservations = await getReservationsAction();
    const resToDelete = reservations.find(r => r.id === id);
    if(resToDelete) {
        reservations = reservations.filter(r => r.id !== id);
        await writeDb('reservations', reservations);
        await addAuditLogAction({
            userId: resToDelete.teacherId,
            userName: 'Teacher',
            action: 'Reservation Deleted',
            details: `Deleted reservation ${id}.`
          });
    }
}
