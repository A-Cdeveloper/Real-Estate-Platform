import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GridCardProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
};

const GridCard = ({ children, title, subtitle, className }: GridCardProps) => (
  <Card
    className={cn(
      "flex flex-col bg-card border border-border p-0 gap-0 h-fit max-h-[400px]",
      "shadow-sm hover:shadow-md transition-shadow",
      className
    )}
  >
    <CardHeader className="px-6 py-2 gap-0 bg-foreground/10">
      <CardTitle className="text-[17px] font-semibold text-foreground">
        {title}
      </CardTitle>
      {subtitle && (
        <p className="text-xs text-muted-foreground font-normal mt-0.5">
          {subtitle}
        </p>
      )}
    </CardHeader>
    <CardContent className="pt-2 flex-1 px-3 overflow-auto">
      {children}
    </CardContent>
  </Card>
);

export default GridCard;
