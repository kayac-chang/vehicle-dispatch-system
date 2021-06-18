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

function Mobile({ items }: { items: Link[] }) {
  return (
    <div className="lg:hidden w-screen h-screen bg-green-dark text-xl">
      <Account />

      <Nav items={items} name={content.titel} />
    </div>
  );
}

function Desktop({ items }: { items: Link[] }) {
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
