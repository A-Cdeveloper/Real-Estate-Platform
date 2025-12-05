import CustumImage from "@/components/shared/CustumImage";
import { Column } from "@/components/shared/GenericTable";
import { formatLongDate } from "@/lib/utils/date";

import { DEFAULT_NEWS_IMAGE } from "@/lib/constants";
import { PropertyWithOwner } from "@/types/properties";

/**
 * Columns for the news table
 * @returns {Column<News>[]} Columns for the news table
 */
export const getColumns = (): Column<PropertyWithOwner>[] => [
  {
    key: "image",
    label: "",
    render: (property) => {
      return (
        <CustumImage
          src={property.image || DEFAULT_NEWS_IMAGE}
          alt={property.name}
          className="w-20 h-20 rounded-none"
        />
      );
    },
  },
  {
    key: "name",
    label: "Name",
    render: (property) => {
      return (
        <div className="flex items-center gap-2">
          <h2 className="text-white max-w-[150px] line-clamp-2">
            {property.name || "N/A"}
          </h2>
        </div>
      );
    },
  },
  {
    key: "description",
    label: "Description",
    render: (property) => {
      return (
        <div className="line-clamp-2 max-w-xs">{property.description}</div>
      );
    },
  },

  {
    key: "createdAt",
    label: "Created",
    render: (property) => formatLongDate(property.createdAt),
  },
  {
    key: "updatedAt",
    label: "Updated",
    render: (property) => formatLongDate(property.createdAt),
  },

  {
    key: "edit/delete",
    label: "",
    render: (property) => <span>Edit/Delete</span>,
  },
];
