import PageHeader from "@/components/backend/layout/PageHeader";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import PropertyForm from "@/features/backend/proprietes/add-edit/PropertyForm";
import { PropertyStatusBadge } from "@/features/backend/proprietes/ui/PropertyStatusBadge";
import { checkIsAdmin } from "@/server/auth/checkIsAdmin";
import { getPropertyByIdAdmin } from "@/server/queries/properties";
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

      <PropertyForm mode="edit" property={property} isAdmin={isAdmin} />
    </>
  );
};

export default EditPropertyPage;
