import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

const GridCard = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <Card className="h-full p-2 rounded-none">
    <CardHeader className="border-b-0">
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border border-dashed border-border/60 p-2 text-xs text-muted-foreground">
        {children}
      </div>
    </CardContent>
  </Card>
);

export default GridCard;

