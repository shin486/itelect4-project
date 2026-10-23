import type { Course, ApiSubmission, NewSubmission, AiReview } from "../types/index";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Reusable request helper that automatically attaches auth headers and handles errors
export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Request failed";
    try {
      const err = await res.json();
      message = err.message || message;
    } catch {
      // ignore non-json error
    }
    throw new Error(message);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

// GET /api/courses -> the whole list
export async function fetchCourses(): Promise<Course[]> {
  try {
    return await request<Course[]>("/api/courses");
  } catch {
    return await request<Course[]>("/courses");
  }
}

// GET /api/courses?code=ITELECT4
export async function fetchCourseByCode(code: string): Promise<Course> {
  let matches: Course[];
  try {
    matches = await request<Course[]>(`/api/courses?code=${code}`);
  } catch {
    matches = await request<Course[]>(`/courses?code=${code}`);
  }
  if (!matches || matches.length === 0) {
    throw new Error(`No course found with code "${code}".`);
  }
  return matches[0];
}

// GET /api/submissions
export async function fetchSubmissions(): Promise<ApiSubmission[]> {
  try {
    const res = await request<{ data: ApiSubmission[] } | ApiSubmission[]>("/api/submissions");
    return Array.isArray(res) ? res : res.data;
  } catch {
    return await request<ApiSubmission[]>("/submissions");
  }
}

// POST /api/submissions
export async function createSubmission(
  newSubmission: NewSubmission
): Promise<ApiSubmission> {
  try {
    const res = await request<{ data: ApiSubmission } | ApiSubmission>("/api/submissions", {
      method: "POST",
      body: JSON.stringify(newSubmission),
    });
    return (res as { data: ApiSubmission }).data || (res as ApiSubmission);
  } catch {
    return await request<ApiSubmission>("/submissions", {
      method: "POST",
      body: JSON.stringify(newSubmission),
    });
  }
}

// ===== SESSION 11: POST /api/ai ========================================
// Private, like submissions. The token goes on automatically via request(),
// which matters more here than anywhere: without it, anyone could
// spend your Gemini quota.
export function askAi(prompt: string): Promise<AiReview> {
  return request<AiReview>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}
