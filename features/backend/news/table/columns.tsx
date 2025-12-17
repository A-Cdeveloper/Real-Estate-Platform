import CustumImage from "@/components/shared/ui/CustumImage";
import { Column } from "@/components/shared/ui/GenericTable";
import { formatLongDate } from "@/lib/utils/date";
import { News } from "@prisma/client";
import ActionsCell from "../table/ActionsCell";
import { DEFAULT_NEWS_IMAGE } from "@/lib/constants";

/**
 * Columns for the news table
 * @returns {Column<News>[]} Columns for the news table
 */
export const getColumns = (): Column<News>[] => [
  {
    key: "image",
    label: "",
    render: (news) => (
      <CustumImage
        src={news.image || DEFAULT_NEWS_IMAGE}
        alt={news.title}
        className="w-20 h-20 rounded-none"
      />
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (news) => (
      <div className="flex items-center gap-2">
        <h2 className="text-foreground max-w-[150px] line-clamp-2">
          {news.title || "N/A"}
        </h2>
      </div>
    ),
  },
  {
    key: "description",
    label: "Description",
    render: (news) => (
      <div className="line-clamp-2 max-w-xs">{news.description}</div>
    ),
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
  {
    key: "edit/delete",
    label: "",
    render: (news) => <ActionsCell news={news} />,
  },
];
