"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative h-5 w-5 shrink-0 rounded-md border-2 border-primary",
      "bg-background ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-all duration-200",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
      "hover:scale-105 active:scale-95",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator asChild>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex items-center justify-center text-primary-foreground"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </motion.div>
    </CheckboxPrimitive.Indicator>

    {/* 🌿 subtle glow when checked */}
    <span className="absolute inset-0 rounded-md pointer-events-none data-[state=checked]:shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };