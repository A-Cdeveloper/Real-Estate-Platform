import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const RealyDescription = ({ description }: { description: string }) => {
  if (!description) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-nunito-sans text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default RealyDescription;
