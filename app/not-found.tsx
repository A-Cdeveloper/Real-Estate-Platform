import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${APP_NAME}`,
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Typography variant="h1" className="text-6xl mb-4">
          404
        </Typography>
        <Typography variant="h2" className="mb-4">
          Page Not Found
        </Typography>
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
