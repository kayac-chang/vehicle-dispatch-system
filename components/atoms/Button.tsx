import clsx from "clsx";
import { ReactNode } from "react";
import Link from "next/link";

type CommonProps = {
  children?: ReactNode;
  className?: string;
  color?: string;
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

  const { type, className = "", children } = props;

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}

function Flat({
  className,
  color = "bg-gold-darker border-gold-darker",
  ...props
}: ButtonProps | AnchorProps) {
  return (
    <Base
      className={clsx("text-white w-full rounded-sm border", color, className)}
      {...props}
    />
  );
}

function Outline({
  className,
  color = "border-gold-darker text-gold-darker",
  ...props
}: ButtonProps | AnchorProps) {
  return (
    <Base
      className={clsx("border w-full rounded-sm", color, className)}
      {...props}
    />
  );
}

const Button = {
  Flat,
  Outline,
  Base,
};

export default Button;
