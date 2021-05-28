import { Icon, Transition } from "components/atoms";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Link = {
  label: string;
  icon?: ReactNode;
  items?: Link[];
  href?: string;
};

type ButtonProps = {
  open: boolean;
};
function Button({ open }: ButtonProps) {
  return (
    <Disclosure.Button
      className="lg:hidden bg-green-dark text-white px-5 rounded-bl-2xl"
      aria-label={open ? "Close Menu" : "Open Menu"}
    >
      <span className="block w-5">
        <Icon.Menu />
      </span>
    </Disclosure.Button>
  );
}

function Account() {
  return (
    <>
      <div className="hidden lg:flex flex-col justify-center items-center px-8 ml-auto">
        <span>HI! 訪客</span>

        <span className="text-xxs">|</span>

        <span className="flex items-center space-x-1">
          <span className="w-4">
            <Icon.Login />
          </span>

          <span>登入</span>
        </span>
      </div>

      <div className="lg:hidden bg-white rounded-b-3xl py-10 px-12 shadow">
        <p className="text-green-dark text-2xl font-bold">HI!訪客</p>
      </div>
    </>
  );
}

function useCurrentFocus<T extends HTMLElement>(initialValue: T | null) {
  const [isFocus, setFocus] = useState(false);
  const ref = useRef<T>(initialValue);

  useEffect(() => {
    function whenTabClick(event: KeyboardEvent) {
      if (event.key === "Tab") {
        requestAnimationFrame(() => {
          const include = ref.current?.contains(document.activeElement);

          setFocus(Boolean(include));
        });
      }
    }

    window.addEventListener("keydown", whenTabClick);

    return () => window.removeEventListener("keydown", whenTabClick);
  }, [setFocus]);

  return { ref, isFocus };
}

type ExpandedProps = {
  label: string;
  icon: ReactNode;
  items: Link[];
  className: string;
};
function Expanded({ label, icon, items, className }: ExpandedProps) {
  const [isExpanded, setExpand] = useState(false);
  const { ref, isFocus } = useCurrentFocus<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;

    setExpand(isFocus);
  }, [isFocus, isExpanded, setExpand]);

  return (
    <div className="relative" ref={ref}>
      <button
        className={clsx(
          className,
          "lg:border-b-4",
          isExpanded ? "lg:border-gold-light" : "lg:border-transparent",
          isExpanded && "lg:bg-green-darkest lg:text-gold-light"
        )}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={isExpanded ? "true" : "false"}
        onClick={() => setExpand(!isExpanded)}
      >
        <span className="w-8">{icon}</span>
        <span>{label}</span>
      </button>

      <Transition.Fade show={isExpanded}>
        <ul
          role="menu"
          aria-label={label}
          className={clsx(
            "lg:absolute lg:bg-white lg:right-0 lg:top-full lg:shadow-md lg:divide-y lg:rounded-b-lg overflow-hidden lg:w-full"
          )}
        >
          {items.map((item) => (
            <li key={item.label}>
              <Item
                className="pl-24 lg:pl-0 lg:text-black lg:hover:bg-white mx-auto"
                {...item}
              />
            </li>
          ))}
        </ul>
      </Transition.Fade>
    </div>
  );
}

type ItemProps = {
  className?: string;
} & Link;
function Item(props: ItemProps) {
  const defaultClass = clsx(
    "flex items-center space-x-4 text-white w-full py-4",
    "lg:flex-col lg:space-x-0 xl:w-32",
    "lg:border-b-4 lg:border-transparent",
    "hover:bg-green-darkest hover:text-gold-light"
  );

  if (props.items) {
    return (
      <Expanded
        className={clsx(defaultClass, "pl-12 lg:pl-0")}
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
        <a
          role="menuitem"
          className={clsx(defaultClass, className || "pl-12 lg:pl-0")}
        >
          {icon ? (
            <span className="w-8">{icon}</span>
          ) : (
            <span
              className="bg-gold-light w-3 h-3 rounded-full lg:hidden"
              aria-hidden
            />
          )}

          <span>{label}</span>
        </a>
      </Link>
    );
  }

  return <></>;
}

// TODO. support  https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
type NavProps = {
  items: Link[];
  name?: string;
};
function Nav({ items, name = "Navigation Dropdown" }: NavProps) {
  return (
    <nav
      role="navigation"
      aria-label={name}
      className={clsx(
        "flex flex-col py-8",
        "lg:flex-1 lg:max-w-screen-xl lg:ml-auto lg:p-0"
      )}
    >
      <ul role="menubar" aria-label={name} className="lg:flex h-full">
        {items.map((item) => (
          <li
            role="none"
            key={item.label}
            className="lg:flex-1 lg:flex justify-center items-center relative"
          >
            <Item {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Mobile({ items }: { items: Link[] }) {
  return (
    <Transition.Fade>
      <Disclosure.Panel className="lg:hidden fixed top-0 -z-10 w-full h-screen bg-green-dark pt-16 text-xl">
        <Account />

        <Nav items={items} />
      </Disclosure.Panel>
    </Transition.Fade>
  );
}

function Desktop({ items }: { items: Link[] }) {
  return (
    <div className="hidden flex-1 lg:flex text-sm text-white">
      <Nav items={items} />

      <Account />
    </div>
  );
}

export default {
  Button,
  Mobile,
  Item,
  Desktop,
};
