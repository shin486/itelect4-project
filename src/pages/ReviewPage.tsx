import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";

import { reviewFormSchema } from "../schemas/reviewSchema";
import type { ReviewFormValues } from "../schemas/reviewSchema";
import type { AiReview } from "../types/index";
import { askAi } from "../api/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const READINESS_STYLE: Record<
  AiReview["readiness"],
  { label: string; color: "green" | "yellow" | "red"; bg: string }
> = {
  ready: {
    label: "Ready",
    color: "green",
    bg: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
  },
  almost: {
    label: "Almost Ready",
    color: "yellow",
    bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  },
  "not-yet": {
    label: "Not Yet",
    color: "red",
    bg: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
  },
};

function ReviewPage() {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    mode: "onBlur",
    defaultValues: {
      prompt: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: askAi,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = async (values: ReviewFormValues): Promise<void> => {
    setError("");
    try {
      await reviewMutation.mutateAsync(values.prompt);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "AI review failed. Try again.",
      );
    }
  };

  const review: AiReview | undefined = reviewMutation.data;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        AI Project Review
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Paste your project description below and get a structured review from
        Gemini (summary, strengths, improvements, and readiness).
      </p>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 flex flex-col gap-4 max-w-2xl"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="prompt">Project description</Label>
          <textarea
            id="prompt"
            {...register("prompt")}
            rows={5}
            aria-invalid={errors.prompt ? true : undefined}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            placeholder="Describe what you built, the stack you used, and what still needs work..."
          />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={reviewMutation.isPending}
          className="self-start"
        >
          {reviewMutation.isPending ? "Reviewing..." : "Get AI Review"}
        </Button>

        {reviewMutation.isError && (
          <p className="mb-4 text-sm text-red-700">
            {reviewMutation.error.message}
          </p>
        )}
      </form>

      {review && (
        <div className="max-w-2xl space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Summary
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{review.summary}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Strengths
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {review.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Improvements
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {review.improvements.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
              Readiness
            </h4>
            <span className={`inline-block rounded px-3 py-1 text-xs font-semibold uppercase tracking-wider ${READINESS_STYLE[review.readiness].bg}`}>
              {READINESS_STYLE[review.readiness].label}
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Want to try again? Edit your description above and submit once more.
          </p>
          <Link to="/" className="text-sm text-blue-600 underline hover:text-blue-700 dark:text-blue-400">
            ? Back to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
