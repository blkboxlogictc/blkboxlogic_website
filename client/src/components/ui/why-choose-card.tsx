import { ReactNode } from "react";

interface WhyChooseCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export default function WhyChooseCard({ 
  icon, 
  title, 
  description, 
  children 
}: WhyChooseCardProps) {
  return (
    <div className="relative bg-muted rounded-lg p-8 pt-16 card-hover">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent rounded-full w-20 h-20 flex items-center justify-center">
        <div className="text-black">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      <p className="text-muted-foreground mb-4 text-center">
        {description}
      </p>
      {children}
    </div>
  );
}
