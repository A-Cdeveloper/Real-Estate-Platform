import { Button } from "@/components/ui/button";
import Link from "next/link";
import LatestNewsItem from "./LatestNewsItem";
import { Typography } from "@/components/ui/typography";
import { getLatestNews } from "@/server/queries/news";
import { LATEST_NEWS_COUNT } from "@/lib/constants";
import EmptyState from "../EmptyState";
import { cn } from "@/lib/utils";
import { News } from "@prisma/client";

const LatestNews = async ({
  count = LATEST_NEWS_COUNT,
  className,
  showButton = true,
}: {
  count?: number;
  className?: string;
  showButton?: boolean;
}) => {
  const latestNews = await getLatestNews(count);

  if (latestNews.length === 0) {
    return (
      <EmptyState title="There are no latest news available at this time." />
    );
  }

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <Typography variant="h2" className="mb-6">
          Latest News
        </Typography>
        <div
          className={cn(
            "space-y-0 h-[330px] overflow-y-auto pe-4 custom-scrollbar relative",
            className
          )}
        >
          {latestNews.map((newsItem: News) => (
            <LatestNewsItem key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>
        {showButton && (
          <div className="mt-3 flex justify-end">
            <Button variant="custum" className="w-fit" asChild>
              <Link href="/news">See all news</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
