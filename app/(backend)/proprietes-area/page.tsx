import PageHeader from "@/components/backend/layout/PageHeader";
import { Building } from "lucide-react";
import AllProprietes from "@/features/backend/proprietes/AllProprietes";
import { getAllProperties } from "@/server/queries/properties";
import { PropertyWithOwner } from "@/types/properties";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/server/auth/checkIsAdmin";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProprietesArea = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;
  const currentUser = await getCurrentUserFromSession();
  if (!currentUser) {
    redirect("/login");
  }

  const isAdmin = await checkIsAdmin();

  // Backend needs all properties (any status) with owner and gallery relations
  const { properties, total, page, totalPages } = await getAllProperties({
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 15,
    sort: (params.sort as string) || "status_desc",
    includeRelations: true, // Include owner and gallery for backend table display
    // status not provided = shows all properties (APPROVED, IN_REVIEW, REJECTED)
    ownerId: isAdmin ? undefined : currentUser.id,
  });
  return (
    <div>
      <PageHeader title="Proprietes" icon={Building} />
      <AllProprietes
        properties={properties as PropertyWithOwner[]}
        total={total}
        page={page}
        totalPages={totalPages}
        sort={(params.sort as string) || "status_desc"}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default ProprietesArea;
