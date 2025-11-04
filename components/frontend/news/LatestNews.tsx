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
        <div className="space-y-1.5 h-[360px] overflow-y-auto pe-4 custom-scrollbar relative">
          <NewsListItem />
          <NewsListItem />
          <NewsListItem />
          <NewsListItem />
          <NewsListItem />
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
