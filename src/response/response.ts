import { ApiError, ApiResponse } from "./response.type";

export function successResponse<T>( message: string, data: T | null = null ) : ApiResponse<T> {
  return {
    message,
    data,
    errors: null,
  }
};

export function errorResponse( message: string, errors: ApiError | null = null ) : ApiResponse<null> {
  return {
    message,
    data: null,
    errors,
  };
}