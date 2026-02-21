
// Storage utilities for managing user data, subjects, and enrollments
export type UserRole = 'admin' | 'teacher' | 'student' | 'library_admin';

export interface User {
  id: string; // USN or EMP number
  name: string;
  email: string;
  password: string;
  role: UserRole;
  program?: string; // For students
  year?: number; // For students
  profilePic?: string;
}

export interface Subject {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
  day: string;
  startTime: string;
  dismissalTime: string;
  description?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  subjectId: string;
  enrolledAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  timeIn?: string;
  timeOut?: string;
  sessionId?: string; // To group IN/OUT for same session
  locationId?: string;
  locationType?: 'room' | 'lab';
  pcId?: string;
}

export interface Lab {
  id: string;
  name: string;
  capacity: number;
}

export interface Pc {
  id: string;
  pcNumber: string;
  labId: string;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface LabRequest {
  id: string;
  studentId: string;
  teacherId: string;
  subjectId: string;
  labId: string;
  pcId?: string;
  startTime: string;
  endTime: string;
  reason?: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
}

export interface Reservation {
  id: string;
  teacherId: string;
  subjectId: string;
  locationId: string;
  locationType: 'room' | 'lab';
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface Book {
    id: string;
    barcode: string;
    title: string;
    author: string;
    status: 'available' | 'borrowed';
    borrowerId?: string;
    borrowedAt?: string;
    dueDate?: string;
}

export interface LibraryBorrowing {
    id: string;
    bookId: string;
    studentId: string;
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    status: 'borrowed' | 'returned';
}

export interface BorrowRequest {
  id: string;
  bookId: string;
  bookBarcode: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'declined';
  dueDate?: string;
  approvedAt?: string;
  adminFeedback?: string;
}
