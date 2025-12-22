"use client";
import TableActionButton from "@/components/shared/table/TableActionButton";
import { News } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import NewsForm from "../add-edit/NewsForm";
import DeleteConfirm from "../delete/DeleteConfirm";

/**
 * Actions cell for the news table
 * Displays edit and delete action buttons for a news item
 * @param news - The news item to display the actions for
 * @returns {JSX.Element} The actions cell component
 */

type ActionsCellProps = {
  news: News;
};

const ActionsCell = ({ news }: ActionsCellProps) => {
  return (
    <div className="flex justify-end flex-1 md:justify-center gap-0">
      {/* Edit Action Button */}
      <TableActionButton
        icon={Pencil}
        ariaLabel={`Edit news ${news.title || news.description}`}
      >
        {(onClose) => (
          <NewsForm onClose={onClose} mode="edit" initialData={news} />
        )}
      </TableActionButton>
      {/* Delete Action Button */}
      <TableActionButton
        icon={Trash2}
        ariaLabel={`Delete news ${news.title || news.description}`}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        {(onClose) => (
          <DeleteConfirm
            onConfirm={() => onClose()}
            newsId={news.id}
            onClose={onClose}
          />
        )}
      </TableActionButton>
    </div>
  );
};

export default ActionsCell;
