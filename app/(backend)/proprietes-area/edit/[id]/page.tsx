import PageHeader from "@/components/backend/layout/PageHeader";
import BackButton from "@/components/shared/ui/BackButton";
import EditPropertyForm from "@/features/backend/proprietes/edit/EditPropertyForm";
import { PropertyStatusBadge } from "@/features/backend/proprietes/ui/PropertyStatusBadge";
import { getPropertyByIdAdmin } from "@/server/queries/properties";
import { Building } from "lucide-react";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";

type Params = Promise<{ id: string }>;

const EditPropertyPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const property = await getPropertyByIdAdmin(id);

  return (
    <>
      <ScrollToTopOnMount />
      <div className="flex items-center gap-4">
        <PageHeader title="Edit Property" icon={Building} />
        <PropertyStatusBadge status={property.status} className="block -mt-4" />
      </div>
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
