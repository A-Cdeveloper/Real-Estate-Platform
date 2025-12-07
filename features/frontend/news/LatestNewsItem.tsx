import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { News } from "@prisma/client";
import Link from "next/link";
import NewsDate from "./detail/NewsDate";
import CustumImage from "@/components/shared/ui/CustumImage";
import { DEFAULT_NEWS_IMAGE } from "@/lib/constants";

const LatestNewsItem = ({ newsItem }: { newsItem: News }) => {
  return (
    <Card className="py-4 rounded-none border-0 border-b border-border bg-transparent shadow-none hover:bg-muted transition-colors">
      <Link href={`/news/${newsItem.id}`} className="flex gap-4 px-2">
        <CustumImage
          src={newsItem.image || DEFAULT_NEWS_IMAGE}
          alt={newsItem.title}
          className="w-25 h-25 flex-shrink-0 border border-border"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <NewsDate date={newsItem.createdAt} className="mb-1" />
            <CardTitle className="font-nunito font-semibold text-base mb-2 line-clamp-2">
              {newsItem.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground font-nunito-sans text-sm line-clamp-2 mb-0">
              {newsItem.description}
            </CardDescription>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default LatestNewsItem;
