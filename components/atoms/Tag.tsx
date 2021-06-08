import clsx from "clsx";
import { ReactNode } from "react";

type TagProps = {
  className?: string;
  children?: ReactNode;
};
export function Tag({ className, children }: TagProps) {
  return (
    <span className={clsx("border px-2 py-0.5 text-xs", className)}>
      {children}
    </span>
  );
}
