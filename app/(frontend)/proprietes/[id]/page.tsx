import { getPropertyById } from "@/lib/queries/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Square, Calendar, User, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

const RealtyDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  let property;
  try {
    property = await getPropertyById(id);
  } catch {
    notFound();
  }

  return (
    <>
      {/* Hero Image Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="h-full bg-muted" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/proprietes" className="font-nunito-sans">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>

        {/* Property Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl md:text-5xl font-nunito font-bold text-white">
                {property.name}
              </h1>
              {property.promoted && (
                <Badge className="bg-primary text-primary-foreground font-nunito-sans">
                  Promoted
                </Badge>
              )}
            </div>
            {property.address && (
              <div className="flex items-center gap-2 text-white/90 font-nunito-sans">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{property.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price & Key Features */}
            <Card>
              <CardHeader>
                <CardTitle className="font-nunito text-2xl">
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="text-muted-foreground font-nunito-sans text-sm mb-1">
                      Price
                    </p>
                    <p className="text-4xl font-nunito font-bold text-primary">
                      €{property.price.toLocaleString()}
                    </p>
                  </div>
                  {property.area && (
                    <div className="text-right">
                      <p className="text-muted-foreground font-nunito-sans text-sm mb-1">
                        Area
                      </p>
                      <div className="flex items-center gap-2 text-2xl font-nunito font-bold text-foreground">
                        <Square className="w-6 h-6" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.area && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Square className="w-5 h-5 text-primary" />
                        <span className="font-nunito-sans font-semibold">
                          Area
                        </span>
                      </div>
                      <p className="font-nunito text-lg">{property.area} m²</p>
                    </div>
                  )}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-nunito-sans font-semibold">
                        Listed
                      </span>
                    </div>
                    <p className="font-nunito text-lg">
                      {new Date(property.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  {property.address && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-nunito-sans font-semibold">
                          Location
                        </span>
                      </div>
                      <p className="font-nunito text-sm line-clamp-2">
                        {property.address}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="font-nunito text-2xl">
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-nunito-sans text-muted-foreground leading-relaxed">
                  This exceptional property offers a unique opportunity for
                  investment. Located in a prime area with excellent
                  connectivity and modern amenities, this property represents an
                  outstanding value proposition. Perfect for those seeking
                  quality, location, and long-term investment potential.
                </p>
              </CardContent>
            </Card>

            {/* Location */}
            {property.address && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-nunito text-2xl">
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-nunito font-semibold text-lg mb-1">
                        Address
                      </p>
                      <p className="font-nunito-sans text-muted-foreground">
                        {property.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Contact & Owner Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="font-nunito text-xl">
                  Contact Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.owner && (
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-nunito font-semibold">
                        {property.owner.name || "Property Owner"}
                      </p>
                      <p className="font-nunito-sans text-sm text-muted-foreground">
                        Real Estate Agent
                      </p>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <Button className="w-full font-nunito-sans" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full font-nunito-sans"
                    size="lg"
                  >
                    Request Information
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-nunito text-xl">
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-nunito-sans text-muted-foreground">
                    Property ID
                  </span>
                  <span className="font-nunito font-semibold">
                    {property.id.slice(0, 8)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-nunito-sans text-muted-foreground">
                    Status
                  </span>
                  <Badge variant="outline" className="font-nunito-sans">
                    {property.promoted ? "Promoted" : "Available"}
                  </Badge>
                </div>
                {property.area && (
                  <div className="flex justify-between items-center py-2">
                    <span className="font-nunito-sans text-muted-foreground">
                      Price per m²
                    </span>
                    <span className="font-nunito font-semibold">
                      €
                      {Math.round(
                        property.price / property.area
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default RealtyDetailPage;
