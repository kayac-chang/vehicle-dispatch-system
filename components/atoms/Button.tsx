import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  className?: string;
};

function Base({ type = "button", children, className }: ButtonProps) {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}

function Flat({ className, ...props }: ButtonProps) {
  return (
    <Base
      className={clsx(
        "bg-gold-darker text-white w-full py-2 rounded-sm",
        className
      )}
      {...props}
    />
  );
}

function Outline({ className, ...props }: ButtonProps) {
  return (
    <Base
      className={clsx(
        "border-2 border-gold-darker w-full py-2 rounded-sm",
        className
      )}
      {...props}
    />
  );
}

const Button = {
  Flat,
  Outline,
};

export default Button;
