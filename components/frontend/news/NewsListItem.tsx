import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { CardTitle } from "@/components/ui/card";

const NewsListItem = () => {
  return (
    <Card className="overflow-hidden py-4">
      <div className="flex gap-4 px-4">
        <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-md bg-muted">
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
            <CardTitle className="font-nunito font-semibold text-base mb-2 line-clamp-2">
              Latest Real Estate Market Trends
            </CardTitle>
            <p className="text-muted-foreground font-nunito-sans text-sm line-clamp-2 mb-3">
              Discover the latest trends shaping the real estate market...
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-fit font-nunito-sans"
          >
            Read more
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewsListItem;
