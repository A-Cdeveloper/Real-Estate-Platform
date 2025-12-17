import { Column } from "@/components/shared/ui/GenericTable";
import { formatLongDate } from "@/lib/utils/date";

import { News } from "@prisma/client";

/**
 * Columns for the latest news table
 * @returns {Column<News>[]} Columns for the latest news table
 */
export const getColumns = (): Column<News>[] => [
  {
    key: "title",
    label: "Title",
    render: (news) => {
      return (
        <>
          <h2 className="text-foreground max-w-[190px] line-clamp-2">
            {news.title || "N/A"}
          </h2>
        </>
      );
    },
  },
  {
    key: "description",
    label: "Description",
    render: (news) => {
      return <div className="line-clamp-2 max-w-xs">{news.description}</div>;
    },
  },

  {
    key: "createdAt",
    label: "Created",
    render: (news) => formatLongDate(news.createdAt),
  },

  {
    key: "updatedAt",
    label: "Updated",
    render: (news) => formatLongDate(news.updatedAt),
  },
];
