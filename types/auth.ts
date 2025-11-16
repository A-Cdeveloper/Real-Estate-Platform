import { Role } from "@prisma/client";

// Base response types
export type SuccessResponse<T> = {
  success: true;
} & T;

export type ErrorResponse<TData = never> = {
  success: false;
  errors?: Record<string, string[]>;
  data?: TData;
};

export type ActionResponse<TSuccess, TErrorData = never> =
  | SuccessResponse<TSuccess>
  | ErrorResponse<TErrorData>;

// User types
export type LoginUser = {
  id: string;
  email: string;
  role: Role;
};

// Login response types
export type LoginSuccessResponse = SuccessResponse<{ user: LoginUser }>;
export type LoginErrorResponse = ErrorResponse<{
  email: string;
  password: string;
}>;
export type LoginResponse = ActionResponse<
  { user: LoginUser },
  { email: string; password: string }
>;

// Forgot password response types
export type ForgotPasswordSuccessResponse = SuccessResponse<{
  message: string;
}>;
export type ForgotPasswordErrorResponse = ErrorResponse<{ email: string }>;
export type ForgotPasswordResponse = ActionResponse<
  { message: string },
  { email: string }
>;
