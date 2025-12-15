import PageHeader from "@/components/backend/layout/PageHeader";
import { Building } from "lucide-react";
import AllProprietes from "@/features/backend/proprietes/AllProprietes";
import { getAllProperties } from "@/server/queries/properties";
import { PropertyWithOwner } from "@/types/properties";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import { checkIsAdmin } from "@/server/auth/checkIsAdmin";
import { PropertyStatus, PropertyType } from "@prisma/client";
import { getUsersForPropertyFilters } from "@/server/queries/users";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProprietesArea = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;
  const currentUser = await getCurrentUserFromSession();
  const isAdmin = await checkIsAdmin();

  // Layout handles redirects for null/inactive users, so currentUser is guaranteed here
  if (!currentUser) {
    return null;
  }

  // Admins can filter by any owner, agents don't need owners list
  const ownersList = isAdmin ? await getUsersForPropertyFilters() : [];

  // Backend needs all properties (any status) with owner and gallery relations
  const { properties, total, page, totalPages, filters } =
    await getAllProperties({
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 15,
      sort: (params.sort as string) || "status_desc",
      includeRelations: true, // Include owner and gallery for backend table display
      // status not provided = shows all properties (APPROVED, IN_REVIEW, REJECTED)
      ownerId: isAdmin ? undefined : currentUser.id,
      filters: {
        status: params.status as PropertyStatus | undefined,
        type: params.type as PropertyType | undefined,
        promoted:
          params.promoted === "true"
            ? true
            : params.promoted === "false"
              ? false
              : undefined,
        ownerId: params.ownerId as string | undefined,
      },
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
        filters={filters}
        ownersList={ownersList}
      />
    </div>
  );
};

export default ProprietesArea;
