import { Column } from "@/components/shared/ui/GenericTable";
import { formatLongDate } from "@/lib/utils/date";

import { InReviewProperty } from "@/types/properties";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Columns for the in review properties table
 * @returns {Column<InReviewProperty>[]} Columns for the in review properties table
 */
export const getColumns = (): Column<InReviewProperty>[] => [
  {
    key: "name",
    label: "Name",
    render: (property) => {
      return (
        <>
          <h2 className="text-white max-w-[190px] line-clamp-2">
            {property.name || "N/A"}
          </h2>
          <span>{property.address || "N/A"}</span>
        </>
      );
    },
  },

  {
    key: "type",
    label: "Type",
    render: (property) => <span>{property.type || "N/A"}</span>,
  },

  {
    key: "owner",
    label: "Owner",
    render: (property: InReviewProperty) => (
      <span>{property.owner.name || "N/A"}</span>
    ),
  },

  {
    key: "createdAt",
    label: "Created",
    render: (property) => formatLongDate(property.createdAt),
  },
  {
    key: "link",
    label: "",
    render: (property) => (
      <Link
        href={`/proprietes-area/edit/${property.id}`}
        className="text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowRight
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
      </Link>
    ),
  },
];
