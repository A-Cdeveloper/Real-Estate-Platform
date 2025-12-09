import PageHeader from "@/components/backend/layout/PageHeader";
import BackButton from "@/components/shared/ui/BackButton";
import { getPropertyByIdAdmin } from "@/server/queries/properties";
import { Building } from "lucide-react";
import EditPropertyForm from "@/features/backend/proprietes/edit/EditPropertyForm";

type Params = Promise<{ id: string }>;

const EditPropertyPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const property = await getPropertyByIdAdmin(id);

  return (
    <>
      <PageHeader title="Edit Property" icon={Building} />
      <BackButton
        href="/proprietes-area?sort=status_desc"
        label="Back"
        className="!bg-transparent !text-muted-foreground mb-3"
      />
      <EditPropertyForm property={property} />
    </>
  );
};

export default EditPropertyPage;
