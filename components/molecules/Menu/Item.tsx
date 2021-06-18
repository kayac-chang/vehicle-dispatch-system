import clsx from "clsx";
import { Link as ILink } from ".";
import { Expanded } from "./Expanded";
import Link from "next/link";

type ItemProps = {
  className?: string;
} & ILink;
export function Item(props: ItemProps) {
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
        <a className={clsx(defaultClass, className || "pl-12 lg:pl-0")}>
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
