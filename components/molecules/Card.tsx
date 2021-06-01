import clsx from "clsx";
import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};
function Header({ children }: HeaderProps) {
  return (
    <header
      className={clsx("py-4 px-6", "bg-gold-darker", "flex items-center")}
    >
      {children}
    </header>
  );
}

type BodyProps = {
  children: ReactNode;
};
function Body({ children }: BodyProps) {
  return <div className="p-4 bg-white">{children}</div>;
}

type CardProps = {
  children?: ReactNode;
  className?: string;
};
export default function Card({ children, className }: CardProps) {
  return (
    <section className={clsx("overflow-hidden shadow-xl", className)}>
      {children}
    </section>
  );
}

Card.Header = Header;
Card.Body = Body;
