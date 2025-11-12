import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselCustum = <T,>({
  items,
  render,
  itemClassName = "pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3",
}: {
  items: (T & { id: string })[];
  render: (item: T) => React.ReactNode;
  itemClassName?: string;
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {items.map((item) => (
          <CarouselItem key={item.id} className={itemClassName}>
            {render(item)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};

export default CarouselCustum;
