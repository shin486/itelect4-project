// ============================================
// PART 1: CORE INTERFACES
// ============================================

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

// ============================================
// TYPE ALIASES & UNIONS
// ============================================

export type ID = number | string;
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive";

export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};

// ============================================
// GENERIC INTERFACE
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

// ============================================
// GENERIC FUNCTIONS
// ============================================

export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: number | string }>(
  items: T[],
  id: number | string
): T | undefined {
  return items.find(item => item.id === id);
}

// ============================================
// UTILITY TYPES
// ============================================

export type UserUpdate = Partial<User>;
export type CoursePreview = Pick<Course, "code" | "title" | "units">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<"student" | "admin" | "instructor", number>;

// ============================================
// ENUMS
// ============================================

// Regular enum - exists at runtime, supports reverse mapping
export enum SubmissionStatus {
  Pending = "pending",
  Submitted = "submitted",
  Graded = "graded",
  Late = "late",
}

// Const enum - zero runtime overhead
export const enum UserRole {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}

// ============================================
// ADDITIONAL TYPES
// ============================================

export type CreateSubmission = Omit<Submission, "id" | "submittedAt">;
export type GradeSubmission = Pick<Submission, "id" | "score">;

// ============================================
// FUNCTION AND RETURN TYPE (for ReturnType demo)
// ============================================

export function createSubmission(data: CreateSubmission) {
  return {
    ...data,
    id: Date.now(),
    submittedAt: new Date(),
    status: SubmissionStatus.Submitted
  };
}

// ============================================
// API TYPES (SESSION 7)
// ============================================

// JSON has no Date, and json-server writes ids as strings. So what the
// API hands back is NOT the Submission shape declared in Session 1.
// Both types below are DERIVED from it, so Submission stays the single
// source of truth -- add a field there and these two inherit it.
export type ApiSubmission = Omit<Submission, "id" | "submittedAt"> & {
  id: string; // json-server ids look like "z4U3v8og06g"
  submittedAt: string; // an ISO string, never a Date object
};

// What we SEND when creating one. No id yet -- the server makes it.
export type NewSubmission = Omit<ApiSubmission, "id">;



export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: "ready" | "almost" | "not-yet";
}
