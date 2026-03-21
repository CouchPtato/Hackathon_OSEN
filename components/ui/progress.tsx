"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
  }
>(({ className, value = 0, ...props }, ref) => {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-secondary/80",
        "backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* 🌿 animated progress fill */}
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* ✨ subtle shine */}
      <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none" />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };