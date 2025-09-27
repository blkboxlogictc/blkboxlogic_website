import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer square with 45 degree rotation */}
      <div className="absolute w-full h-full bg-black border-2 border-accent transform rotate-45 rounded-sm"></div>
      
      {/* Middle square with opacity effect */}
      <div className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border border-accent bg-opacity-75 rounded-sm"></div>
      
      {/* Inner square with glow effect */}
      <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent rounded-sm shadow-glow"></div>
    </div>
  );
}
