import type { Metadata } from "next";
import { News } from "@prisma/client";
import { SITE_URL, NEWS_PER_PAGE } from "@/lib/constants";
import EmptyState from "@/features/frontend/EmptyState";
import NewsGridtem from "@/features/frontend/news/NewsGridtem";
import { Typography } from "@/components/ui/typography";
import { getAllNews } from "@/server/queries/news";
import PaginationControls from "@/components/shared/PaginationControls";
import { calculateSkip, getPaginationData } from "@/lib/utils/pagination";
import { Suspense } from "react";
import NewsGridSkeleton from "@/components/frontend/skeletons/NewsGridSkeleton";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata(
    "News",
    "Stay updated with the latest real estate news, market trends, and property insights.",
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

      <Suspense key={page} fallback={<NewsGridSkeleton />}>
        <NewsList page={page} />
      </Suspense>
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
  const skip = calculateSkip(page, NEWS_PER_PAGE);
  const { news, total } = await getAllNews(NEWS_PER_PAGE, skip);

  const { start, end, currentPage, totalPages } = getPaginationData(
    page,
    NEWS_PER_PAGE,
    total
  );

  if (news.length === 0) {
    return (
      <EmptyState
        title="No news found"
        message="There are no news available at this time."
      />
    );
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
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/news"
      />
    </>
  );
};
