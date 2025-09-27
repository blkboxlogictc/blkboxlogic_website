import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  className?: string;
}

export default function ServiceCard({ 
  icon, 
  title, 
  description, 
  features,
  className
}: ServiceCardProps) {
  return (
    <div className={cn("bg-muted rounded-lg overflow-hidden card-hover", className)}>
      <div className="h-2 bg-accent"></div>
      <div className="p-6">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-5">
          <div className="text-accent">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-5">
          {description}
        </p>
        <ul className="text-sm text-muted-foreground space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent mr-2">→</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
