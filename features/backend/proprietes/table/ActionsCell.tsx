"use client";
import TableActionButton from "@/components/shared/table/TableActionButton";
import { Button } from "@/components/ui/button";
import { PropertyWithOwner } from "@/types/properties";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useCallback } from "react";
import DeleteConfirm from "../delete/DeleteConfirm";
import { useRouter } from "next/navigation";
import { PropertyStatus } from "@prisma/client";

/**
 * Actions cell for the properties table
 * Displays edit and delete action buttons for a property
 * @param property - The property to display the actions for
 * @returns {JSX.Element} The actions cell component
 */

type ActionsCellProps = {
  property: PropertyWithOwner;
};

const ActionsCell = ({ property }: ActionsCellProps) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/proprietes-area/edit/${property.id}`);
  }, [property.id, router]);

  const handlePreview = useCallback(() => {
    window.open(`/proprietes/${property.id}`, "_blank", "noopener,noreferrer");
  }, [property.id]);

  return (
    <div className="flex justify-center gap-0">
      {/* Edit Action Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className="h-7 w-7"
        aria-label={`Edit property ${property.name || property.description}`}
      >
        <Pencil className="size-4" aria-hidden="true" />
      </Button>

      {/* Preview Action Button */}
      {property.status === PropertyStatus.APPROVED && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreview}
          className="h-7 w-7"
          aria-label={`Preview property ${property.name || property.description}`}
        >
          <Eye className="size-4" aria-hidden="true" />
        </Button>
      )}

      {/* Delete Action Button */}
      <TableActionButton
        icon={Trash2}
        ariaLabel={`Delete property ${property.name || property.description}`}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        {(onClose) => (
          <DeleteConfirm
            onConfirm={() => onClose()}
            propertyId={property.id}
            onClose={onClose}
          />
        )}
      </TableActionButton>
    </div>
  );
};

export default ActionsCell;
