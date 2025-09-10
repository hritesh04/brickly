"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export default function SpinnerLoading({
  className,
  size = "md",
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-[92.25vh] w-full",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <motion.div
            className={cn(
              "rounded-full border-2 border-primary/20",
              sizeClasses[size]
            )}
          />
          <motion.div
            className={cn(
              "absolute top-0 left-0 rounded-full border-2 border-transparent border-t-primary",
              sizeClasses[size]
            )}
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        <motion.p
          className="text-muted-foreground text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading editor...
        </motion.p>
      </div>
    </div>
  );
}
