
// Storage utilities for managing user data, subjects, and enrollments
export type UserRole = 'admin' | 'teacher' | 'student' | 'library_admin';
export type Department = 'college' | 'shs';

export interface ThemeConfig {
  primary: string; // Hex
  secondary: string;
  accent: string;
  background: string;
  radius: number; // in rem or px
  glassIntensity: number;
  fontFamily: string;
  layoutDensity: 'compact' | 'standard' | 'spacious';
  campusLabel?: string;
  logoScale?: number;
  componentStyles?: {
    [key: string]: {
      bg?: string;
      text?: string;
      radius?: number;
      shadow?: string;
    }
  }
}

export interface User {
  id: string; // USN or EMP number
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: Department;
  program?: string;
  year?: number;
  position?: string; // New: For staff/faculty roles
  profilePic?: string;
  emergencyContactName?: string;
  emergencyContactAddress?: string;
  emergencyContactPhone?: string;
  signature?: string; // New: For digital signatures
  lastSeen?: string;
  isBanned?: boolean; // Security: Ban flag
  isApproved?: boolean; // Security: Admin approval flag
  deviceFingerprint?: string; // Security: Track device
  banReason?: string;
}

export interface Schedule {
  day: string;
  startTime: string;
  dismissalTime: string;
}

export interface Term {
  id: string;
  name: string;
  status: 'active' | 'ended';
  createdAt: string;
  endedAt?: string;
}

export interface TermEnrollment {
  id: string;
  studentId: string;
  termId: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolledAt: string;
}

export interface Subject {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
  termId: string;
  department?: Department;
  schedules: Schedule[];
  description?: string;
  units?: number;
  code?: string;
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
  sessionId?: string;
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
  date: string;
  startTime: string;
  endTime: string;
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
}

export interface Classwork {
  id: string;
  subjectId: string;
  teacherId: string;
  title: string;
  description: string;
  type: 'quiz' | 'activity' | 'performance' | 'final_output';
  attachments?: { name: string; url: string }[];
  createdAt: string;
  dueDate: string;
  status: 'published' | 'draft';
  totalPoints: number;
}

export interface Submission {
  id: string;
  classworkId: string;
  studentId: string;
  submittedAt: string;
  files?: { name: string; url: string }[];
  textAnswer?: string;
  status: 'submitted' | 'late' | 'graded';
  grade?: number;
  feedback?: string;
}

export interface GradingWeights {
  subjectId: string;
  attendance: number;
  late: number;
  activities: number;
  quizzes: number;
  performance: number;
  finalOutput: number;
}

export interface ExamScore {
    studentId: string;
    subjectId: string;
    score: number;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  termId: string;
  termName: string;
  grade: number;
  score: number;
  units: number;
  recordedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  type: 'subject' | 'private' | 'general';
  memberIds: string[];
  teacherId?: string;
  subjectId?: string;
  lastMessage?: string;
  lastTimestamp?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  type: 'text' | 'call_log';
  fileUrl?: string | null;
  fileName?: string;
  fileType?: string;
}
