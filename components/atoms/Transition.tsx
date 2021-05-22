import { ReactNode } from "react";
import { Transition as Trans } from "@headlessui/react";

type Props = {
  children: ReactNode;
};
function Fade({ children }: Props) {
  return (
    <Trans
      enter="transition-opacity duration-300 ease-out-expo"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-out-expo"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Trans>
  );
}

const Transition = {
  Fade,
};

export default Transition;
