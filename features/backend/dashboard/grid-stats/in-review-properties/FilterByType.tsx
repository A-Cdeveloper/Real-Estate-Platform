import CustomSelect from "@/components/shared/form/CustomSelect";
import { PROPERTY_TYPE_OPTIONS } from "@/lib/constants";
import { PropertyType } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

/**
 * Client component that displays a select input for filtering properties by type
 * Receives the current type filter as a prop
 * Updates the URL when the user selects a new type
 */
const FilterByType = ({ typeFilter }: { typeFilter: PropertyType | "all" }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <CustomSelect
      id="type-filter"
      value={typeFilter || "all"}
      onValueChange={(value) => {
        router.push(pathname + "?type=" + value);
      }}
      options={PROPERTY_TYPE_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      }))}
      className="w-[200px] p-0 bg-secondary"
      aria-label="Filter properties by type"
    />
  );
};

export default FilterByType;
