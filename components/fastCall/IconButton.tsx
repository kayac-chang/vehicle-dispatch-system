import { ReactNode } from "react";
import clsx from "clsx";
import { Button } from "components/atoms";

type IconButtonProps = {
  className: string;
  title: string;
  children: ReactNode;
};
export function IconButton({ className, title, children }: IconButtonProps) {
  return (
    <Button.Base
      type="button"
      className={clsx("flex items-center space-x-1 px-1", className)}
    >
      <span className="w-4 h-4">{children}</span>
      <span>{title}</span>
    </Button.Base>
  );
}
