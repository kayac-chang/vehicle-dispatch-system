import { Icon } from "components/atoms";
import { Disclosure } from "@headlessui/react";

type ButtonProps = {
  open: boolean;
};
export function Button({ open }: ButtonProps) {
  return (
    <Disclosure.Button
      className="lg:hidden bg-green-dark text-white px-5 rounded-bl-3xl"
      aria-label={open ? "Close Menu" : "Open Menu"}
    >
      <span className="block w-6" aria-hidden>
        <Icon.Menu />
      </span>
    </Disclosure.Button>
  );
}
