import clsx from "clsx";
import _Link from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  href: string;
  title: string;
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
      <a
        title={title}
        access-key={accessKey}
        className={clsx("text-gold-darker", className)}
      >
        {children}
      </a>
    </_Link>
  );
}
