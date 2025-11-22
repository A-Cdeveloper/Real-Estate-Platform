import { User } from "@prisma/client";
import { UpdateUser } from "./user";

/**
 * Profile types - for user self-service (no role changes)
 */
export type UpdateProfile = Omit<UpdateUser, "role">;

export type ProfileActionState<TData = unknown> =
  | {
      success: true;
      user?: Omit<
        User,
        "password" | "passwordResetToken" | "passwordResetTokenExpiry"
      >;
    }
  | {
      success: false;
      errors?: Record<string, string[]>;
      error?: string;
      data?: TData;
    };
