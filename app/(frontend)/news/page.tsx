import NewsGridSkeleton from "@/components/frontend/skeletons/NewsGridSkeleton";
import PaginationControls from "@/components/shared/pagination/PaginationControls";
import { Typography } from "@/components/ui/typography";
import EmptyState from "@/features/frontend/EmptyState";
import NewsGridtem from "@/features/frontend/news/NewsGridtem";
import { NEWS_PER_PAGE, SITE_URL } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";
import { getAllNews } from "@/server/queries/news";
import { News } from "@prisma/client";
import type { Metadata } from "next";
import { Suspense } from "react";
import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata(
    "News",
    "Stay updated with the latest real estate industry news, B2B partnership insights, market trends, and property market updates for real estate agencies.",
    `${SITE_URL}/news`
  );
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllNewsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <Typography variant="h1" className="mb-8">
        News
      </Typography>

      <ErrorBoundary>
        <Suspense key={page} fallback={<NewsGridSkeleton />}>
          <NewsList page={page} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default AllNewsPage;

/**
 * NewsList component
 * @param page - current page number
 * @returns NewsList component
 */
const NewsList = async ({ page }: { page: number }) => {
  const { news, total, totalPages } = await getAllNews({
    page,
    limit: NEWS_PER_PAGE,
    sort: "createdAt_desc",
  });

  const start = (page - 1) * NEWS_PER_PAGE + 1;
  const end = Math.min(start + NEWS_PER_PAGE - 1, total);

  if (news.length === 0) {
    return <EmptyState title="There are no news available at this time." />;
  }

  return (
    <>
      <div className="mb-6">
        <Typography variant="p" className="text-muted-foreground">
          Showing {start}-{end} of {total} news
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {news.map((newsItem: News) => (
          <NewsGridtem key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        baseUrl="/news"
      />
    </>
  );
};
