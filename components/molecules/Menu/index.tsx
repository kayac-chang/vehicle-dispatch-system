import clsx from "clsx";
import { ReactNode } from "react";
import { Account } from "./Account";
import { Nav } from "./Nav";

const content = {
  titel: "導覽列",
};

export type Link = {
  label: string;
  icon?: ReactNode;
  items?: Link[];
  href?: string;
};

type Props = {
  items: Link[];
  className?: string;
};

function Mobile({ items, className }: Props) {
  return (
    <div
      className={clsx(
        "lg:hidden w-screen h-screen bg-green-dark text-xl",
        className
      )}
    >
      <Account />

      <Nav items={items} name={content.titel} />
    </div>
  );
}

function Desktop({ items }: Props) {
  return (
    <div className="hidden flex-1 lg:flex text-sm text-white">
      <Nav items={items} name={content.titel} />

      <Account />
    </div>
  );
}

export default {
  Mobile,
  Desktop,
};
