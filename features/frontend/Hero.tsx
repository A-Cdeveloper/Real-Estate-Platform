import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import PropertyTypeFilter from "./proprietes/PropertyTypeFilter";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/intro.jpg"
          alt="Real Estate Hero"
          fill
          className="object-center object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content filter */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-2xl p-8 shadow-lg bg-background/85 backdrop-blur-xs">
            {/* Heading */}
            <Typography variant="h1" className="text-4xl md:text-5xl mb-0">
              Find your <span className="text-primary">perfect investment</span>{" "}
              properties
            </Typography>
            <p className="text-foreground/90 font-nunito-sans text-lg mb-6">
              Explore a selection of high-value real estate opportunities
              designed for financial growth and stability
            </p>

            <PropertyTypeFilter clearRoute="/" />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
