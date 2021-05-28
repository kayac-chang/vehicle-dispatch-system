import clsx from "clsx";
import { Icon } from "components/atoms";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  role?: string;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
  current?: boolean;
};
function Button({
  href,
  role,
  className,
  children,
  current = false,
}: ButtonProps) {
  const base = "border flex rounded shadow font-sans bg-white";

  if (current) {
    return (
      <em
        className={clsx(
          base,
          "not-italic border-gold-darker text-gold-darker",
          className
        )}
        aria-current="page"
      >
        {children}
      </em>
    );
  }

  return (
    <a role={role} href={href} className={clsx(base, className)}>
      {children}
    </a>
  );
}

type PageButtonProps = ButtonProps & {
  type: "prev" | "next";
};
function PageButton({ type }: PageButtonProps) {
  return (
    <Button
      className="w-8 h-8 flex justify-center items-center"
      role={type}
      aria-label={type === "next" ? "Next Page" : "Prev Page"}
    >
      <span className="w-4">
        {type === "next" && <Icon.ChevronRight />}
        {type === "prev" && <Icon.ChevronLeft />}
      </span>
    </Button>
  );
}

function range(min: number, max: number) {
  return Array.from({ length: max }, (_, i) => i + min);
}

type LogicProps = {
  current: number;
  total: number;
  delta: number;
};
function logic({ current, total, delta }: LogicProps) {
  const pages = range(1, total);
  const min = Math.min(...pages);
  const max = Math.max(...pages);

  if (current - delta <= min) {
    return [min, ...range(min + 1, delta), "...", max];
  }

  if (current + delta >= max) {
    return [min, "...", ...range(max - delta, delta), max];
  }

  return [min, "...", ...range(current - 1, delta), "...", max];
}

type PaginationProps = {
  current: number;
  total: number;
};
export function Pagination({ current, total }: PaginationProps) {
  const list = logic({ current, total, delta: 3 });

  return (
    <nav role="navigation" aria-label="Pagination Navigation" className="py-2">
      <ul className="flex gap-2">
        <li>
          <PageButton type="prev" />
        </li>

        {list.map((item) => (
          <li key={item}>
            {item === "..." && "..."}

            {Number.isInteger(item) && (
              <Button
                aria-label={`Goto Page ${item}`}
                className="w-8 h-8 flex justify-center items-center"
                current={current + 1 === item}
              >
                {item}
              </Button>
            )}
          </li>
        ))}

        <li>
          <PageButton type="next" />
        </li>
      </ul>
    </nav>
  );
}
