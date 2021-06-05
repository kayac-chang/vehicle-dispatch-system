import clsx from "clsx";
import { ReactNode } from "react";

type TagProps = {
  children?: ReactNode;
};
export function Tag({ children }: TagProps) {
  return (
    <span
      className={clsx(
        "border border-black px-2 py-0.5 text-xs",
        "border-orange-dark bg-orange-light text-orange-dark"
      )}
    >
      {children}
    </span>
  );
}
