import { Card, CardContent } from "@/components/ui/card";

const RealyDescription = ({ description }: { description: string }) => {
  if (!description) return null;
  return (
    <Card>
      <CardContent>
        <p className="font-nunito-sans text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default RealyDescription;
