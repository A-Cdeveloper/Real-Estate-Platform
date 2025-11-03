import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="font-nunito font-bold text-6xl mb-4 text-foreground">
          404
        </h1>
        <h2 className="font-nunito font-semibold text-2xl mb-4 text-foreground">
          Page Not Found
        </h2>
        <p className="font-nunito-sans text-muted-foreground mb-8">
          The page you are looking for does not exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/proprietes">View Properties</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
