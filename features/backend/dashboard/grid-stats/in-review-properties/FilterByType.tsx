import CustomSelect from "@/components/shared/form/CustomSelect";
import { PROPERTY_TYPE_OPTIONS } from "@/lib/constants";
import { PropertyType } from "@prisma/client";

/**
 * Client component that displays a select input for filtering properties by type
 * Receives the current type filter and onChange callback as props
 * Updates the parent component state when the user selects a new type
 */
const FilterByType = ({
  typeFilter,
  onChangeFilter,
}: {
  typeFilter: PropertyType | "all";
  onChangeFilter: (value: PropertyType | "all") => void;
}) => {
  return (
    <CustomSelect
      id="type-filter"
      value={typeFilter || "all"}
      onValueChange={(value) => {
        onChangeFilter(value as PropertyType | "all");
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
