import { Property, User } from "@prisma/client";

// User types
export type LoginUser = Pick<User, "id" | "email" | "role">;

// profile  user type
export type CurrentUser = Omit<
  User,
  "password" | "passwordResetToken" | "passwordResetTokenExpiry"
>;

/* backend users list page user type */
export type UserWithProperties = CurrentUser & {
  properties: Property[];
  propertyCount: number;
};

export type AddUser = Pick<User, "email" | "name" | "role"> & {
  password: string;
};
export type UpdateUser = Pick<User, "id" | "email" | "name" | "role"> & {
  password?: string;
};
export type DeleteUser = Pick<User, "id">;
