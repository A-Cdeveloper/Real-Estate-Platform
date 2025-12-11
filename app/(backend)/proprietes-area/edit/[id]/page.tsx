import PageHeader from "@/components/backend/layout/PageHeader";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import BackButton from "@/components/shared/ui/BackButton";
import PropertyForm from "@/features/backend/proprietes/add-edit/PropertyForm";
import { PropertyStatusBadge } from "@/features/backend/proprietes/ui/PropertyStatusBadge";
import { getPropertyByIdAdmin } from "@/server/queries/properties";
import { checkIsAdmin } from "@/server/auth/checkIsAdmin";
import { Building } from "lucide-react";

type Params = Promise<{ id: string }>;

const EditPropertyPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const property = await getPropertyByIdAdmin(id);
  const isAdmin = await checkIsAdmin();

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
      <PropertyForm mode="edit" property={property} isAdmin={isAdmin} />
    </>
  );
};

export default EditPropertyPage;
