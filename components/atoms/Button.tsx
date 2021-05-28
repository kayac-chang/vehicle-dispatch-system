import clsx from "clsx";
import { ReactNode } from "react";
import Link from "next/link";

type CommonProps = {
  children?: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps & {
  type: "anchor";
  href: string;
};

type ButtonProps = CommonProps & {
  type: "button" | "submit" | "reset";
};

function Base(props: ButtonProps | AnchorProps) {
  if (props.type === "anchor") {
    const { className, children, href } = props;

    return (
      <Link href={href}>
        <a className={clsx("block text-center", className)}>{children}</a>
      </Link>
    );
  }

  const { type, className, children } = props;

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}

function Flat({ className, ...props }: ButtonProps | AnchorProps) {
  return (
    <Base
      className={clsx(
        "bg-gold-darker text-white w-full py-2 rounded",
        className
      )}
      {...props}
    />
  );
}

function Outline({ className, ...props }: ButtonProps | AnchorProps) {
  return (
    <Base
      className={clsx(
        "border-2 border-gold-darker w-full py-2 rounded",
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
