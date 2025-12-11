import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import LogosUploader from "../logo/LogosUploader";

type LogoCardProps = {
  logo_light: string | null;
  logo_dark: string | null;
};

const LogoCard = ({ logo_light, logo_dark }: LogoCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-purple-500/10">
          <ImageIcon
            className="size-4 text-purple-600 dark:text-purple-400"
            aria-hidden="true"
          />
        </div>
        App Logo
      </CardTitle>
    </CardHeader>
    <CardContent>
      <LogosUploader logo_dark={logo_dark} logo_light={logo_light} />
    </CardContent>
  </Card>
);

export default LogoCard;
