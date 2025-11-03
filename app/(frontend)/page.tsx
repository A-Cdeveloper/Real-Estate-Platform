import LatestNews from "@/components/frontend/news/LatestNews";
import RealtyListItem from "@/components/frontend/proprietes/RealtyListItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  getLatestProperties,
  getPromotedProperties,
} from "@/lib/queries/properties";

export default async function HomePage() {
  const latestProperties = await getLatestProperties(9);
  const promotedProperties = await getPromotedProperties(9);

  return (
    <>
      {/* <Hero /> */}

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - 2/3 */}
          <div className="lg:col-span-2 space-y-12">
            {/* Promoted Properties */}
            <div>
              <h2 className="text-3xl font-nunito font-bold text-foreground mb-6">
                Promoted Properties
              </h2>
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {promotedProperties.map((property) => (
                    <CarouselItem
                      key={property.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <RealtyListItem property={property} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>

            {/* Latest Properties */}
            <div>
              <h2 className="text-3xl font-nunito font-bold text-foreground mb-6">
                Latest Properties
              </h2>
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {latestProperties.map((property) => (
                    <CarouselItem
                      key={property.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <RealtyListItem property={property} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          </div>

          {/* Right Side - 1/3 */}
          <LatestNews />
        </div>
      </section>
    </>
  );
}
