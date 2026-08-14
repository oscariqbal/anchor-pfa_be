export type ApiError = {
  field?: Record<string, string[]>;
};

export type ApiResponse<T> = {
  message: string;
  data: T | null;
  errors: ApiError | null;
};