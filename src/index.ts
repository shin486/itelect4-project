import {
  User,
  Course,
  Submission,
  ApiResponse,
  UserUpdate,
  CoursePreview,
  PublicUser,
  RoleCount,
  NewSubmission,
  SubmissionStatus,
  UserRole,
  getFirst,
  getById,
  createSubmission,
} from "../types/index";

// ===== SAMPLE DATA =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const admin: User = {
  id: 2,
  name: "Maria Santos",
  email: "maria@example.com",
  role: "admin",
  isActive: true,
};

const instructor: User = {
  id: 3,
  name: "Jose Rizal",
  email: "jose@example.com",
  role: "instructor",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "TypeScript Advanced Types",
  units: 3,
  semester: "1st Semester 2026-2027",
};

console.log("=== GENERICS ===");

// Generic functions
const firstUser = getFirst<User>([student, admin, instructor]);
console.log("First user:", firstUser?.name);

const foundUser = getById<User>([student, admin, instructor], 1);
console.log("Found user:", foundUser?.email);

// Generic API Response
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
  message: "User retrieved successfully",
  timestamp: new Date()
};
console.log("API Response data:", userResponse.data.name);

console.log("\n=== UTILITY TYPES ===");

// Partial - all fields optional
const userUpdate: UserUpdate = { 
  name: "Juan D. Cruz",
  isActive: false 
};
console.log("Partial update:", userUpdate);

// Pick - only selected fields
const coursePreview: CoursePreview = {
  code: course.code,
  title: course.title,
  units: course.units
};
console.log("Course preview:", coursePreview);

// Omit - exclude sensitive fields
const publicUser: PublicUser = {
  id: student.id,
  name: student.name,
  role: student.role,
};
console.log("Public user (no email):", publicUser);

// Record - key-value mapping
const roleCounts: RoleCount = {
  student: 45,
  admin: 2,
  instructor: 3
};
console.log("Role counts:", roleCounts);

console.log("\n=== ENUMS ===");

// Regular enum
let status: SubmissionStatus = SubmissionStatus.Pending;
console.log("Status value:", status);

status = SubmissionStatus.Graded;
console.log("Updated status:", status);
console.log("Is graded?", status === SubmissionStatus.Graded);

// Const enum - inlined at compile time
const role: UserRole = UserRole.Student;
console.log("Const enum role:", role);

console.log("\n=== RETURN TYPE ===");

// Using ReturnType utility
const newSub: NewSubmission = createSubmission({
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/shin486/gt1-submission"
});
console.log("New submission:", newSub);

console.log("\n✅ All features demonstrated successfully!");