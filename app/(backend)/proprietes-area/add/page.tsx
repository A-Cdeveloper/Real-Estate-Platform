import PageHeader from "@/components/backend/layout/PageHeader";
import BackButton from "@/components/shared/ui/BackButton";
import PropertyForm from "@/features/backend/proprietes/add-edit/PropertyForm";
import { Building } from "lucide-react";

const AddPropertyPage = () => {
  return (
    <>
      <PageHeader title="Add Property" icon={Building} />
      <BackButton
        href="/proprietes-area?sort=status_desc"
        label="Back"
        className="!bg-transparent !text-muted-foreground mb-3"
      />
      <PropertyForm mode="add" />
    </>
  );
};

export default AddPropertyPage;
