"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>
        <Typography variant="h2" className="mb-2">
          Something went wrong.
        </Typography>

        {error.message && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-4">
            <p className="font-nunito-sans text-sm text-foreground break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="font-nunito-sans">
            Try again
          </Button>
          <Button variant="outline" asChild className="font-nunito-sans">
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
