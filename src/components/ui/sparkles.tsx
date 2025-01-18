"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useEffect, useState } from "react";

export const Sparkles = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; color: string; size: number; style: { top: string; left: string; } }>>([]);
  const colors = ["#FFB6C1", "#D6BCFA", "#9b87f5"];

  const createSparkle = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 3;
    const style = {
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
    };
    return {
      id: Date.now(),
      color,
      size,
      style,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        const newSparkle = createSparkle();
        const updatedSparkles = [...currentSparkles, newSparkle];
        if (updatedSparkles.length > 5) {
          updatedSparkles.shift();
        }
        return updatedSparkles;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn("relative inline-block", className)} {...props}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute inline-block animate-ping"
          style={{
            ...sparkle.style,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: sparkle.color,
            borderRadius: "50%",
          }}
        />
      ))}
      <span className="relative inline-block">{children}</span>
    </span>
  );
};