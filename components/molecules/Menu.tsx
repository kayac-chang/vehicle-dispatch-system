import { Icon, Transition } from "components/atoms";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import clsx from "clsx";

type ButtonProps = {
  open: boolean;
};
function Button({ open }: ButtonProps) {
  return (
    <Disclosure.Button
      className="bg-green-dark text-white p-5 rounded-bl-3xl"
      aria-label={open ? "Close Menu" : "Open Menu"}
    >
      <span className="block w-6">
        <Icon.Menu />
      </span>
    </Disclosure.Button>
  );
}

function Account() {
  return (
    <div className="bg-white rounded-b-3xl py-10 px-12 shadow">
      <p className="text-green-dark text-2xl font-bold">HI!訪客</p>
    </div>
  );
}

type ExpandedProps = {
  label: string;
  icon: ReactNode;
  items: Link[];
  className: string;
};
function Expanded({ label, icon, items, className }: ExpandedProps) {
  const [isExpanded, setExpand] = useState(false);

  return (
    <>
      <button
        className={className}
        role="button"
        aria-haspopup="true"
        aria-expanded={isExpanded ? "true" : "false"}
        onClick={() => setExpand(!isExpanded)}
      >
        <span className="w-8">{icon}</span>
        <span className="text-xl font-extralight">{label}</span>
      </button>

      <ul className={clsx(isExpanded || "hidden")}>
        {items.map((item) => (
          <li key={item.label}>
            <Item className="pl-24" {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}

type ItemProps = {
  className?: string;
} & Link;
function Item(props: ItemProps) {
  const defaultClass =
    "flex items-center space-x-4 text-white py-4 w-full hover:bg-green-darkest hover:text-gold-light";

  if (props.items) {
    return (
      <Expanded
        className={clsx(defaultClass, "pl-12")}
        icon={props.icon}
        label={props.label}
        items={props.items}
      />
    );
  }

  if (props.href) {
    const { label, icon, href, className } = props;

    return (
      <Link href={href}>
        <a className={clsx(defaultClass, className || "pl-12")}>
          {icon ? (
            <span className="w-8">{icon}</span>
          ) : (
            <span className="bg-gold-light w-3 h-3 rounded-full" aria-hidden />
          )}

          <span className="text-xl font-extralight">{label}</span>
        </a>
      </Link>
    );
  }

  return <></>;
}

type Link = {
  label: string;
  icon?: ReactNode;
  items?: Link[];
  href?: string;
};

type PanelProps = {
  items: Link[];
};
function Panel({ items }: PanelProps) {
  return (
    <Transition.Fade>
      <Disclosure.Panel className="fixed top-0 -z-10 w-full h-screen bg-green-dark pt-14">
        <Account />

        <nav
          className="flex flex-col py-8"
          aria-label="Navigation Dropdown"
          role="navigation"
        >
          <ul>
            {items.map((item) => (
              <li key={item.label}>
                <Item {...item} />
              </li>
            ))}
          </ul>
        </nav>
      </Disclosure.Panel>
    </Transition.Fade>
  );
}

export default {
  Button,
  Panel,
};
