import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-nunito text-3xl md:text-4xl font-bold tracking-tight",
      h2: "font-nunito text-2xl md:text-3xl font-bold tracking-tight",
      h3: "font-nunito text-xl md:text-2xl font-semibold tracking-tight",
      h4: "font-nunito text-lg md:text-xl font-semibold tracking-tight",
      h5: "font-nunito text-lg md:text-xl font-semibold",
      h6: "font-nunito text-base md:text-lg font-semibold",
      p: "font-nunito-sans text-base leading-7",
      lead: "font-nunito-sans text-lg md:text-xl text-muted-foreground",
      small: "font-nunito-sans text-sm text-muted-foreground",
      muted: "font-nunito-sans text-sm text-muted-foreground",
      blockquote: "font-nunito-sans border-l-4 border-primary pl-4 italic",
      code: "font-mono text-sm bg-muted px-1.5 py-0.5 rounded",
      large: "font-nunito text-lg font-semibold",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

// Map variant to HTML element
const variantElementMap: Record<string, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  lead: "p",
  small: "small",
  muted: "p",
  blockquote: "blockquote",
  code: "code",
  large: "p",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

function Typography({
  className,
  variant = "p",
  as,
  ...props
}: TypographyProps) {
  const Comp = as || (variant ? variantElementMap[variant] : "p") || "p";

  return (
    <Comp
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
