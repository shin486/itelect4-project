import { useState, useEffect, useRef } from "react";
import type { User, Course, Submission } from "./types/index";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// Mock data
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    setTimeout(() => {
      setCourses([course]);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isLoading && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isLoading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    console.log("User selected:", user.name);
  };

  const handleCourseEnroll = (course: Course): void => {
    console.log("Enrolled in:", course.code);
  };

  const handleSubmissionGrade = (submission: Submission): void => {
    console.log("Grading submission:", submission.id);
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-center">
          <div className="text-2xl text-gray-500 dark:text-gray-400">
            Loading courses...
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="rounded-lg bg-red-50 p-8 text-center dark:bg-red-900/20">
          <div className="text-2xl text-red-600 dark:text-red-400">⚠️</div>
          <h2 className="mt-2 text-xl font-semibold text-red-700 dark:text-red-300">
            Could not load courses
          </h2>
          <button
            onClick={() => setIsError(false)}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              📚 GT2 Part 3 - Tailwind + UI Polish
            </h1>
            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white transition hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
              >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
              <button
                onClick={() => setIsError(true)}
                className="rounded bg-red-100 px-3 py-1.5 text-sm text-red-700 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
              >
                Simulate Error
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {previousSearch !== undefined && previousSearch !== searchTerm && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Previous search: "{previousSearch}"
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={toggleDetails}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {showDetails ? "Hide" : "Show"} Details
            </button>
            {selectedUser && (
              <span className="text-sm text-green-600 dark:text-green-400">
                ✅ Selected: {selectedUser.name}
              </span>
            )}
          </div>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <UserCard user={student} onSelect={handleUserSelect} />
            
            {filteredCourses.map((c) => (
              <CourseCard
                key={c.code}
                course={c}
                variant="default"
                onEnroll={handleCourseEnroll}
              />
            ))}
            
            <SubmissionBadge
              submission={submission}
              onGrade={handleSubmissionGrade}
            >
              {showDetails && (
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                  🔍 Submitted by Student #{submission.studentId}
                </p>
              )}
            </SubmissionBadge>
          </div>

          {filteredCourses.length === 0 && (
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
              No courses found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;