import PropertiesGridSkeleton from "@/components/frontend/skeletons/PropertiesGridSkeleton";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

import ProprietesWrapper from "@/features/frontend/proprietes/ProprietesWrapper";
import ProprietesList from "@/features/frontend/proprietes/ProprietesList";
import { Typography } from "@/components/ui/typography";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata(
    "Properties",
    "Browse our extensive collection of properties for sale and rent. Find your perfect home, apartment, or investment property.",
    `${SITE_URL}/proprietes`
  );
}

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const ProprietesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <Typography variant="h1" className="mb-2">
        All Proprietes
      </Typography>

      {/* Filters */}

      <ProprietesWrapper initialParams={params} />

      <Suspense key={params.page} fallback={<PropertiesGridSkeleton />}>
        <ProprietesList params={params} />
      </Suspense>
    </section>
  );
};

export default ProprietesPage;
