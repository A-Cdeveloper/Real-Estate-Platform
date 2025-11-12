import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyWithOwner } from "@/types/properties";
import { Mail, User } from "lucide-react";
import Link from "next/link";

const RealtyAgent = ({ property }: { property: PropertyWithOwner }) => {
  return (
    <>
      {/* Contact Card */}
      <Card className="sticky top-6">
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
            <Button className="w-full font-nunito-sans" size="lg" asChild>
              <Link href="mailto:contact@realestate.com">
                <Mail className="w-4 h-4 mr-2" />
                Contact Now
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RealtyAgent;
