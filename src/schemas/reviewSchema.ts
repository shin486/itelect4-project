import { z } from "zod";

export const reviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Prompt must be at least 20 characters.")
    .max(2000, "Prompt must be at most 2000 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
