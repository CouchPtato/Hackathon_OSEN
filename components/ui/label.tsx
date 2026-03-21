"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 🌿 VARIANTS (small but powerful upgrade)
const labelVariants = cva(
  "text-sm font-medium leading-none transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-green-600 dark:text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants({ variant }),

      // 🌱 better interaction with input
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      "peer-focus:text-green-600 dark:peer-focus:text-green-400",

      className
    )}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };