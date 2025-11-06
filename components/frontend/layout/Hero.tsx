import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Typography } from "../../ui/typography";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
          alt="Real Estate Hero"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-2xl p-8 shadow-lg bg-card/90 backdrop-blur-md">
            {/* Heading */}
            <Typography variant="h1" className="text-4xl md:text-5xl mb-4">
              Find your <span className="text-primary">perfect investment</span>{" "}
              properties
            </Typography>
            <p className="text-foreground/90 font-nunito-sans text-lg mb-4">
              Explore a selection of high-value real estate opportunities
              designed for financial growth and stability
            </p>

            {/* Search Bar */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <label htmlFor="address-input" className="sr-only">
                    Enter address
                  </label>
                  <input
                    id="address-input"
                    type="text"
                    placeholder="Enter address"
                    aria-label="Enter address"
                    className="w-full px-4 py-3 border border-input rounded-md bg-background font-nunito-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="location-input" className="sr-only">
                    Location
                  </label>
                  <input
                    id="location-input"
                    type="text"
                    placeholder="Location"
                    aria-label="Location"
                    className="w-full px-4 py-3 border border-input rounded-md bg-background font-nunito-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="property-type-select" className="sr-only">
                    Property type
                  </label>
                  <select
                    id="property-type-select"
                    aria-label="Property type"
                    className="w-full px-4 py-3 border border-input rounded-md bg-background font-nunito-sans text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                  >
                    <option>Property type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Commercial</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
                </div>
              </div>

              {/* Search Buttons */}
              <div className="flex gap-4">
                <Button size="lg" className="font-nunito-sans font-semibold">
                  <Search className="w-5 h-5" />
                  Search Property
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
