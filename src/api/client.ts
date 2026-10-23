import type { Course, ApiSubmission, NewSubmission, AiReview } from "../types/index";
import { authHeaders } from "../lib/auth";

export const API_URL = "http://localhost:3001";

// GET /courses -> the whole list
export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch(`${API_URL}/courses`);
  if (!res.ok) {
    throw new Error("Could not load courses");
  }
  return res.json();
}

// GET /courses?code=ITELECT4 -> an ARRAY of matches, not one course
export async function fetchCourseByCode(code: string): Promise<Course> {
  const res = await fetch(`${API_URL}/courses?code=${code}`);
  if (!res.ok) {
    throw new Error("Could not load that course");
  }
  const matches: Course[] = await res.json();
  if (matches.length === 0) {
    throw new Error(`No course found with code "${code}".`);
  }
  return matches[0];
}

// GET /submissions
export async function fetchSubmissions(): Promise<ApiSubmission[]> {
  const res = await fetch(`${API_URL}/submissions`);
  if (!res.ok) {
    throw new Error("Could not load submissions");
  }
  return res.json();
}

// POST /submissions -> the row the server saved, with the id it made
export async function createSubmission(
  newSubmission: NewSubmission
): Promise<ApiSubmission> {
  const res = await fetch(`${API_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSubmission),
  });
  if (!res.ok) {
    throw new Error("Could not save the submission");
  }
  return res.json();
}


// POST /api/ai/review -> asks Gemini (via the backend) to review a submission
// prompt and returns the structured AiReview.
export async function askAi(prompt: string): Promise<AiReview> {
  const res = await fetch(`${API_URL}/api/ai/review`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    let message = "Could not get AI review.";
    try {
      const err = await res.json();
      message = err.message || message;
    } catch {
      // ignore malformed error bodies
    }
    throw new Error(message);
  }
  const json = await res.json();
  return json.data;
}
