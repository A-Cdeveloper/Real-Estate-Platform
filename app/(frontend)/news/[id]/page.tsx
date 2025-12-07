import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import BackButton from "@/components/shared/ui/BackButton";
import NewsDate from "@/features/frontend/news/detail/NewsDate";
import CustumImage from "@/components/shared/ui/CustumImage";
import LatestNews from "@/features/frontend/news/LatestNews";
import LatestNewsSkeleton from "@/components/frontend/skeletons/LatestNewsSkeleton";
import { Typography } from "@/components/ui/typography";
import { getNewsById, getRecentNewsIds } from "@/server/queries/news";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSettings } from "@/server/queries/settings";

type Params = Promise<{ id: string }>;

// ISG: Regenerate pages every hour (3600 seconds)
export const revalidate = 3600;

// Generate static params only for recent news items (last 100)
// Older news will be generated on-demand when first accessed
export async function generateStaticParams() {
  try {
    // Only pre-generate the most recent 30 news items
    // Rest will be generated on-demand (ISG)
    const ids = await getRecentNewsIds();
    return ids.map((id: string) => ({ id }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const [newsItem, settings] = await Promise.all([
      getNewsById(id),
      getSettings(),
    ]);

    const appName = settings?.appName || "Real Estate";
    const title = `${newsItem.title} | ${appName}`;
    const description =
      newsItem.description.length > 160
        ? `${newsItem.description.substring(0, 157)}...`
        : newsItem.description;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/news/${id}`,
        type: "article",
      },
    };
  } catch {
    const settings = await getSettings();
    const appName = settings?.appName || "Real Estate";
    return {
      title: `News | ${appName}`,
      description: `Read news article on ${appName}`,
    };
  }
}

const NewsDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  let newsItem;
  try {
    newsItem = await getNewsById(id);
  } catch {
    notFound();
  }

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <BackButton href="/news" label="Back to News" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <Typography variant="h1" className="mb-4">
              {newsItem.title}
            </Typography>
            <NewsDate date={newsItem.createdAt} className="mb-4" />
          </div>
          <CustumImage
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-[400px] md:h-[500px]"
            priority
          />
          <Typography
            variant="p"
            className="text-muted-foreground leading-relaxed whitespace-pre-line"
          >
            {newsItem.description}
          </Typography>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Suspense
            fallback={
              <LatestNewsSkeleton
                showTitle={true}
                showButton={false}
                itemsCount={7}
                className="h-auto overflow-visible"
              />
            }
          >
            <LatestNews
              count={7}
              className="h-auto overflow-visible"
              showButton={false}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;
