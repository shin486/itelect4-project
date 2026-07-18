import type { Submission } from "../types/index";
import { SubmissionStatus } from "../types/index";

interface SubmissionBadgeProps {
  submission: Submission;
  children?: React.ReactNode;
  onGrade?: (submission: Submission) => void;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({
  submission,
  children,
  onGrade,
}) => {
  const handleGrade = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onGrade) {
      onGrade(submission);
    }
    console.log("Grading submission:", submission.id);
  };

  const getStatus = (score?: number): SubmissionStatus => {
    if (score === undefined) return SubmissionStatus.Pending;
    if (score >= 90) return SubmissionStatus.Graded;
    return SubmissionStatus.Submitted;
  };

  const status = getStatus(submission.score);

  return (
    <div className="submission-badge" style={{ border: '1px solid #28a745', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
      <p><strong>Repository:</strong> {submission.repoUrl}</p>
      <p><strong>Score:</strong> {submission.score ?? "Not graded yet"}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
      {children}
      <button onClick={handleGrade} style={{ padding: '0.3rem 1rem', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
        Grade Submission
      </button>
    </div>
  );
};

export default SubmissionBadge;