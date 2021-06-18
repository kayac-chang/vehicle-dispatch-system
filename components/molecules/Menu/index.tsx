import { Transition } from "components/atoms";
import { Disclosure } from "@headlessui/react";
import { ReactNode } from "react";
import { Account } from "./Account";
import { Nav } from "./Nav";
import { Button } from "./Button";

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
    <Transition.Fade>
      <Disclosure.Panel className="lg:hidden fixed top-0 -z-10 w-full h-screen bg-green-dark pt-16 text-xl">
        <Account />

        <Nav items={items} name={content.titel} />
      </Disclosure.Panel>
    </Transition.Fade>
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
  Button,
};
