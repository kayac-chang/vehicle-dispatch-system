import _Link from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  href: string;
  title?: string;
  label?: string;
  role?: string;
  className?: string;
  accessKey?: string;
  children: ReactNode;
  onClick?: () => void;
};
export function Link({
  href,
  title,
  label,
  accessKey,
  className,
  children,
  onClick,
}: LinkProps) {
  return (
    <_Link href={href}>
      <a
        title={title}
        access-key={accessKey}
        className={className}
        aria-label={label}
        onClick={onClick}
      >
        {children}
      </a>
    </_Link>
  );
}
