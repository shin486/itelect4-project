import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import type { User, Course, Submission } from "./types/index";

// Mock data from GT1
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

const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4 - TypeScript Advanced Types",
  units: 3,
  semester: "1st Semester 2026-2027",
};

const submission: Submission = {
  id: 1,
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/shin486/itelect4-project",
  submittedAt: new Date(),
  score: 95,
};

function App() {
  const handleUserSelect = (user: User): void => {
    console.log("User selected:", user.name);
    alert(`Selected: ${user.name}`);
  };

  const handleCourseEnroll = (course: Course): void => {
    console.log("Enrolled in:", course.code);
    alert(`Enrolled in ${course.code}: ${course.title}`);
  };

  const handleSubmissionGrade = (submission: Submission): void => {
    console.log("Grading submission:", submission.id);
    alert(`Grading submission from student ${submission.studentId}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>📚 GT2 Part 1 - React + TypeScript Components</h1>
      <p style={{ color: '#666' }}>Using GT1 interfaces as component props</p>

      <h2>👤 User Card</h2>
      <UserCard user={student} onSelect={handleUserSelect} />

      <h2>📖 Course Card</h2>
      <CourseCard course={course} onEnroll={handleCourseEnroll} />

      <h2>📝 Submission Badge</h2>
      <SubmissionBadge submission={submission} onGrade={handleSubmissionGrade}>
        <p style={{ color: 'green', fontWeight: 'bold' }}>✅ Submitted on time!</p>
      </SubmissionBadge>

      <h2>👤 Another User (with optional callback)</h2>
      <UserCard user={admin} />
    </div>
  );
}

export default App;