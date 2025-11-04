import { Card, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NewsListItem = () => {
  return (
    <Card className="py-2 rounded-none border-0 border-b border-border pb-4 bg-transparent shadow-none">
      <div className="flex gap-4 px-2">
        <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-md bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop"
            alt="News"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-muted-foreground font-nunito-sans text-xs mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>2025-01-01</span>
            </span>
            <CardTitle className="font-nunito font-semibold text-base mb-1 line-clamp-1">
              Latest Real Estate Market Trends
            </CardTitle>
            <p className="text-muted-foreground font-nunito-sans text-sm line-clamp-2">
              Discover the latest trends shaping the real estate market...
              <Link
                href="/news/latest-real-estate-market-trends"
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

export default NewsListItem;
