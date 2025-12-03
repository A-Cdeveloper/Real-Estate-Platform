import { Card, CardTitle } from "@/components/ui/card";
import { News } from "@prisma/client";
import Link from "next/link";
import NewsDate from "./detail/NewsDate";
import CustumImage from "@/components/shared/CustumImage";
import { DEFAULT_NEWS_IMAGE } from "@/lib/constants";

const NewsGridtem = ({ newsItem }: { newsItem: News }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-md transition-shadow p-0 hover:bg-muted">
      <Link href={`/news/${newsItem.id}`}>
        <CustumImage
          src={newsItem.image || DEFAULT_NEWS_IMAGE}
          alt={newsItem.title}
          className="h-56 w-full rounded-none"
        />

        <div className="p-6">
          <NewsDate date={newsItem.createdAt} className="mb-3" />
          <CardTitle className="font-nunito font-semibold text-lg mb-3 line-clamp-2">
            {newsItem.title}
          </CardTitle>
          <p className="text-muted-foreground font-nunito-sans text-sm line-clamp-3 mb-4">
            {newsItem.description}
          </p>
          <span className="text-primary font-nunito-sans text-sm font-medium">
            Read more →
          </span>
        </div>
      </Link>
    </Card>
  );
};

export default NewsGridtem;
