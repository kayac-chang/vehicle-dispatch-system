import _Link from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  href: string;
  title: string;
  role?: string;
  className?: string;
  accessKey?: string;
  children: ReactNode;
};
export function Link({
  href,
  title,
  accessKey,
  className,
  children,
}: LinkProps) {
  return (
    <_Link href={href}>
      <a title={title} access-key={accessKey} className={className}>
        {children}
      </a>
    </_Link>
  );
}
