import PageHeader from "@/components/backend/layout/PageHeader";
import BackButton from "@/components/shared/BackButton";
import AddPropertyForm from "@/features/backend/proprietes/add/AddPropertyForm";
import { Building } from "lucide-react";

const AddPropertyPage = () => {
  return (
    <>
      <PageHeader title="Add Property" icon={Building} />
      <BackButton
        href="/proprietes-area?sort=status_desc"
        label="Back"
        className="!bg-transparent !text-muted-foreground"
      />
      <AddPropertyForm />
    </>
  );
};

export default AddPropertyPage;
