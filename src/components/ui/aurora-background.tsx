import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0 bg-primary" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-30"
        style={{
          mixBlendMode: "overlay",
          filter: "blur(100px)",
          transform: "translate3d(0, 0, 0)",
          animation: "aurora 15s ease infinite",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80"
        style={{
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}