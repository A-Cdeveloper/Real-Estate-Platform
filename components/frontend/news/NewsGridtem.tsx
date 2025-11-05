import { Card, CardTitle } from "@/components/ui/card";
import { News } from "@prisma/client";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NewsGridtem = ({ newsItem }: { newsItem: News }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow p-0">
      <Link href={`/news/${newsItem.id}`}>
        {newsItem.image && (
          <div className="relative h-56 w-full overflow-hidden bg-muted">
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 text-muted-foreground font-nunito-sans text-xs mb-3">
            <Calendar className="w-4 h-4" />
            <span>{newsItem.createdAt.toLocaleDateString()}</span>
          </div>
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
