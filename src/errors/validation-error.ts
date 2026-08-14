import { ZodError } from "zod";

export function mapZodErrors( error: ZodError ) {
  const errors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".");

    if (!errors[field]) {
      errors[field] = [];
    }

    errors[field].push(issue.message);
  }

  return errors;
}