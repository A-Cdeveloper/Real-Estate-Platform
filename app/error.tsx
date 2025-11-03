"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <h2 className="font-nunito font-bold text-2xl mb-2 text-foreground">
          Došlo je do greške.
        </h2>

        {error.message && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-4">
            <p className="font-nunito-sans text-sm text-foreground break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="font-nunito-sans">
            Pokušaj ponovo
          </Button>
          <Button variant="outline" asChild className="font-nunito-sans">
            <Link href="/">Nazad na početnu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
