import clsx from "clsx";
import { Link } from ".";
import { Item } from "./Item";

// TODO. support  https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
type NavProps = {
  items: Link[];
  name?: string;
};
export function Nav({ items, name = "Navigation Dropdown" }: NavProps) {
  return (
    <nav
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
