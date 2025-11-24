import type { Settings } from "@prisma/client";
import { ActionState } from "./action-state";

/**
 * Settings types - for application-wide configuration
 */

// Full Settings type (all fields)
export type CurrentSettings = Settings;

// Update Settings type (exclude auto-managed fields)
export type UpdateSettings = Omit<Settings, "id" | "createdAt" | "updatedAt">;
export type PartialUpdateSettings = Partial<UpdateSettings>;

// Settings Action State for server actions
export type SettingsActionState<TData = unknown> = ActionState<
  TData,
  { settings?: CurrentSettings }
>;
