import { ReactNode } from "react";
import clsx from "clsx";
import { Button } from "components/atoms";

type IconButtonProps = {
  className: string;
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
};
export function IconButton({
  className,
  icon,
  children,
  onClick,
}: IconButtonProps) {
  return (
    <Button.Base
      type="button"
      className={clsx("flex items-center space-x-1 px-1", className)}
      onClick={onClick}
    >
      <span className="w-4" aria-hidden>
        {icon}
      </span>

      <span>{children}</span>
    </Button.Base>
  );
}
