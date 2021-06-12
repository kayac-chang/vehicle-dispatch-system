import clsx from "clsx";
import { ReactNode, MouseEvent } from "react";
import Link from "next/link";

type CommonProps = {
  children?: ReactNode;
  className?: string;
  color?: string;
  disabled?: boolean;
};

type AnchorProps = CommonProps & {
  type: "anchor";
  href: string;
};

type ButtonProps = CommonProps & {
  type: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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

  const { type, className = "", children, onClick, disabled = false } = props;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
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

function Disabled({
  className,
  color = "bg-gray-extralight border-black-dark text-black-light ",
  ...props
}: ButtonProps | AnchorProps) {
  return (
    <Base
      className={clsx("border w-full rounded-sm", color, className)}
      disabled
      {...props}
    />
  );
}

const Button = {
  Flat,
  Outline,
  Disabled,
  Base,
};

export default Button;
