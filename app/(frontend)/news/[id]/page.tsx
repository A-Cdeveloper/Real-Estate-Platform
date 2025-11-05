import { getNewsById } from "@/lib/queries/news";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import BackButton from "@/components/frontend/BackButton";

type Params = Promise<{ id: string }>;

const NewsDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  let newsItem;
  try {
    newsItem = await getNewsById(id);
  } catch {
    notFound();
  }

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <div className="mb-6">
        <BackButton href="/news" label="Back to News" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <Typography variant="h1" className="mb-4">
              {newsItem.title}
            </Typography>
            <div className="flex items-center gap-2 text-muted-foreground font-nunito-sans text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                {newsItem.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Image */}
          {newsItem.image && (
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg bg-muted">
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <Typography
                variant="p"
                className="text-muted-foreground leading-relaxed whitespace-pre-line"
              >
                {newsItem.description}
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardContent className="px-6 space-y-4">
              <Typography variant="h3" className="mb-4">
                Article Info
              </Typography>
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-nunito-sans text-sm text-muted-foreground">
                      Published
                    </p>
                    <p className="font-nunito font-semibold">
                      {newsItem.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-3 border-b">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-nunito-sans text-sm text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="font-nunito font-semibold">
                      {newsItem.updatedAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;
