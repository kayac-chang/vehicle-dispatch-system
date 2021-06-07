import { ReactNode } from "react";

type LocationProps = {
  location: string;
  icon: ReactNode;
};
export function Location({ location, icon }: LocationProps) {
  return (
    <div className="flex items-center space-x-1">
      <span className="w-3 text-orange-dark" aria-hidden>
        {icon}
      </span>

      <span>{location}</span>
    </div>
  );
}
