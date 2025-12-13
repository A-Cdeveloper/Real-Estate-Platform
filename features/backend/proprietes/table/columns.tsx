import CustumImage from "@/components/shared/ui/CustumImage";
import { Column } from "@/components/shared/ui/GenericTable";
import { formatLongDate } from "@/lib/utils/date";

import { DEFAULT_NEWS_IMAGE } from "@/lib/constants";
import { PropertyWithOwner } from "@/types/properties";
import ActionsCell from "./ActionsCell";

import { promoteProperty } from "@/server/actions/properties";
import { PropertyStatus } from "@prisma/client";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { PropertyStatusBadge } from "../ui/PropertyStatusBadge";
import { Button } from "@/components/ui/button";

/**
 * Columns for the news table
 * @returns {Column<News>[]} Columns for the news table
 */
export const getColumns = (isAdmin: boolean): Column<PropertyWithOwner>[] => [
  {
    key: "image",
    label: "",
    render: (property) => {
      return (
        <CustumImage
          src={property.image || DEFAULT_NEWS_IMAGE}
          alt={property.name}
          className="w-17 h-17 rounded-none"
        />
      );
    },
  },
  {
    key: "name",
    label: "Name",
    render: (property) => {
      return (
        <h2 className="text-white max-w-[120px] line-clamp-2">
          {property.name || "N/A"}
        </h2>
      );
    },
  },

  {
    key: "type",
    label: "Type",
    render: (property) => <span>{property.type || "N/A"}</span>,
  },

  {
    key: "price",
    label: "Price",
    render: (property) => (
      <span>€ {property.price.toLocaleString() || "N/A"}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (property) => {
      return <PropertyStatusBadge status={property.status} />;
    },
  },
  ...(isAdmin
    ? [
        {
          key: "owner",
          label: "Owner",
          render: (property: PropertyWithOwner) => (
            <span>{property.owner.name || "N/A"}</span>
          ),
        },
      ]
    : []),
  {
    key: "createdAt",
    label: "Created",
    render: (property) => formatLongDate(property.createdAt),
  },
  ...(isAdmin
    ? [
        {
          key: "promoted",
          label: "Promoted",
          render: (property: PropertyWithOwner) => {
            if (property.status !== PropertyStatus.APPROVED) {
              return null;
            }
            return (
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  const result = await promoteProperty(property.id);
                  if (result.success) {
                    toast.success(
                      `Property ${result.promoted ? "promoted" : "unpromoted"} successfully`
                    );
                  } else {
                    toast.error(result.error);
                  }
                }}
                className="cursor-pointer outline-none border-none block mx-auto"
                aria-label={
                  property.promoted
                    ? "Unpromote property"
                    : "Promote property to featured"
                }
              >
                <Star
                  className={`size-4 ${property.promoted ? "fill-yellow-500" : "fill-gray-500"} mx-auto`}
                  aria-hidden="true"
                />
              </Button>
            );
          },
        },
      ]
    : []),

  {
    key: "edit/delete",
    label: "",
    render: (property) => <ActionsCell property={property} />,
  },
];
