import { News } from "@prisma/client";
import { ActionState } from "./action-state";

export type AddNews = Pick<News, "title" | "description" | "image">;
export type UpdateNews = Pick<News, "id" | "title" | "description" | "image">;
export type DeleteNews = Pick<News, "id">;

export type NewsActionState<TData = unknown> = ActionState<
  TData,
  { news?: News }
>;
