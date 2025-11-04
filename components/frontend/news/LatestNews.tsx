import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewsListItem from "./NewsListItem";

const LatestNews = () => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <h2 className="text-3xl font-nunito font-bold text-foreground mb-6">
          Latest News
        </h2>
        <div className="space-y-1.5 h-[400px] overflow-y-auto pe-4 custom-scrollbar">
          <NewsListItem />
          <NewsListItem />
          <NewsListItem />
          <NewsListItem />
          <NewsListItem />

          {/* See All News */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full font-nunito-sans"
              asChild
            >
              <Link href="/news">See all news</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
