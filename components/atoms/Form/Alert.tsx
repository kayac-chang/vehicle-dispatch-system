import clsx from "clsx";
import React, { ReactNode } from "react";

export type AlertProps = {
  id: string;
  show?: boolean;
  children?: ReactNode;
};
export function Alert({ id, show, children }: AlertProps) {
  return (
    <p
      role="alert"
      aria-atomic
      id={id}
      className={clsx("text-red-light", show ? "block" : "hidden")}
    >
      {children}
    </p>
  );
}
