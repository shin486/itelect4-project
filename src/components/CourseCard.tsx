import type { Course } from "../types/index";

interface CourseCardProps {
  course: Course;
  onEnroll?: (course: Course) => void;
}

function CourseCard({ course, onEnroll }: CourseCardProps) {
  const handleEnroll = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onEnroll) {
      onEnroll(course);
    }
    console.log("Enrolled in:", course.code);
  };

  return (
    <div className="course-card" style={{ border: '1px solid #007bff', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
      <h3>{course.code}</h3>
      <p><strong>Title:</strong> {course.title}</p>
      <p><strong>Units:</strong> {course.units}</p>
      <p><strong>Semester:</strong> {course.semester}</p>
      <button onClick={handleEnroll} style={{ padding: '0.3rem 1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Enroll
      </button>
    </div>
  );
}

export default CourseCard;