import PageHeader from "@/components/backend/layout/PageHeader";
import PropertyForm from "@/features/backend/proprietes/add-edit/PropertyForm";
import { Building } from "lucide-react";

const AddPropertyPage = () => {
  return (
    <>
      <PageHeader title="Add Property" icon={Building} />
      <PropertyForm mode="add" />
    </>
  );
};

export default AddPropertyPage;
