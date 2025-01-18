import * as React from "react";
import { cn } from "@/lib/utils";

export interface MagnetizeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const MagnetizeButton = React.forwardRef<
  HTMLButtonElement,
  MagnetizeButtonProps
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!buttonRef.current) return;

    const bounds = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;
    setPosition({ x, y });
  };

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `translate(${position.x * 0.1}px, ${position.y * 0.1}px)`,
        transition: "transform 0.2s ease-out",
      }}
      className={cn(
        "relative inline-flex items-center justify-center transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

MagnetizeButton.displayName = "MagnetizeButton";