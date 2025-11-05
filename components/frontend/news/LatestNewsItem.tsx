import { Card, CardTitle } from "@/components/ui/card";
import { News } from "@prisma/client";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LatestNewsItem = ({ newsItem }: { newsItem: News }) => {
  return (
    <Card className="py-2 rounded-none border-0 border-b border-border pb-4 bg-transparent shadow-none">
      <div className="flex gap-4 px-2">
        <Link
          href={`/news/${newsItem.id}`}
          className="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-md bg-muted"
        >
          {newsItem.image && (
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              className="object-cover"
              unoptimized
            />
          )}
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-muted-foreground font-nunito-sans text-xs mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{newsItem.createdAt.toLocaleDateString()}</span>
            </span>
            <CardTitle>
              <Link href={`/news/${newsItem.id}`}>{newsItem.title}</Link>
            </CardTitle>
            <p className="text-muted-foreground font-nunito-sans text-sm line-clamp-2">
              {newsItem.description}
              <Link
                href={`/news/${newsItem.id}`}
                className="text-primary/70 font-nunito-sans text-sm px-2"
              >
                read more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LatestNewsItem;
