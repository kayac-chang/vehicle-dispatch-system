import { ReactNode } from "react";

type LocationProps = {
  location: string;
  children: ReactNode;
};
export function Location({ location, children }: LocationProps) {
  return (
    <p className="flex items-center space-x-1">
      <span className="w-2 lg:w-3 text-orange-dark">{children}</span>
      <span>{location}</span>
    </p>
  );
}
