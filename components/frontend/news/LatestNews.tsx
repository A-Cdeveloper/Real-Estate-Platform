import { Button } from "@/components/ui/button";
import Link from "next/link";
import LatestNewsItem from "./LatestNewsItem";
import { Typography } from "@/components/ui/typography";
import { getLatestNews } from "@/lib/queries/news";
import { LATEST_NEWS_COUNT } from "@/lib/constants";
import EmptyState from "../EmptyState";

const LatestNews = async () => {
  const latestNews = await getLatestNews(LATEST_NEWS_COUNT);

  if (latestNews.length === 0) {
    return (
      <EmptyState
        title="No latest news found"
        message="There are no latest news available at this time."
      />
    );
  }

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <Typography variant="h2" className="mb-6">
          Latest News
        </Typography>
        <div className="space-y-1.5 h-[360px] overflow-y-auto pe-4 custom-scrollbar relative">
          {latestNews.map((newsItem) => (
            <LatestNewsItem key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>
        <div className="mt-2 flex justify-end">
          <Button variant="custum" className="w-fit" asChild>
            <Link href="/news">See all news</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
