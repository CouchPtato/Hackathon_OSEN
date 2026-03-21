"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-input bg-background/90 backdrop-blur-sm",
        "px-3 py-2 text-sm md:text-sm",
        "placeholder:text-muted-foreground",

        // ✨ smooth transitions
        "transition-all duration-200",

        // 🧠 focus state (important)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/70 focus-visible:ring-offset-2",

        // 🌿 hover feel
        "hover:border-green-400/60",

        // ⚡ active feel
        "active:scale-[0.99]",

        // 📁 file input styling
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

        // 🚫 disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };