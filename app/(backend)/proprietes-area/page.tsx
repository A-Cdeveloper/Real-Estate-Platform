import PageHeader from "@/components/backend/layout/PageHeader";
import { Building } from "lucide-react";
import AllProprietes from "@/features/backend/proprietes/AllProprietes";
import { getAllProperties } from "@/server/queries/properties";
import { PropertyWithOwner } from "@/types/properties";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProprietesArea = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;
  // Backend needs all properties (any status) with owner and gallery relations
  const { properties, total, page, totalPages } = await getAllProperties({
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 10,
    sort: (params.sort as string) || "createdAt_desc",
    includeRelations: true, // Include owner and gallery for backend table display
    // status not provided = shows all properties (APPROVED, IN_REVIEW, REJECTED)
  });
  return (
    <div>
      <PageHeader title="Proprietes" icon={Building} />
      <AllProprietes
        properties={properties as PropertyWithOwner[]}
        total={total}
        page={page}
        totalPages={totalPages}
        sort={(params.sort as string) || "createdAt_desc"}
      />
    </div>
  );
};

export default ProprietesArea;
