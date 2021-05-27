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
  const base = "border flex rounded-sm shadow font-sans";

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
      className="p-2"
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

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

type LogicProps = {
  current: number;
  total: number;
  boundary: number;
  sibling: number;
};
function logic({ current, total, boundary, sibling }: LogicProps) {
  const startPages = range(1, Math.min(boundary, total));
  const endPages = range(Math.max(total - boundary + 1, boundary + 1), total);

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      current - sibling,
      // Lower boundary when page is high
      total - boundary - sibling * 2 - 1
    ),
    // Greater than startPages
    boundary + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      current + sibling,
      // Upper boundary when page is low
      boundary + sibling * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : total - 1
  );

  return [
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundary + 2
      ? ["start-ellipsis"]
      : boundary + 1 < total - boundary
      ? [boundary + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < total - boundary - 1
      ? ["end-ellipsis"]
      : total - boundary > boundary
      ? [total - boundary]
      : []),

    ...endPages,
  ];
}

type PaginationProps = {
  current: number;
  total: number;
  boundary?: number;
  sibling?: number;
};
export function Pagination({
  current,
  total,
  boundary = 1,
  sibling = 1,
}: PaginationProps) {
  const list = logic({ current, total, boundary, sibling });

  return (
    <nav role="navigation" aria-label="Pagination Navigation" className="py-2">
      <ul className="flex gap-2">
        <li>
          <PageButton type="prev" />
        </li>

        {list.map((item) => (
          <li key={item}>
            {item === "end-ellipsis" && "..."}
            {item === "start-ellipsis" && "..."}
            {Number.isInteger(item) && (
              <Button
                aria-label={`Goto Page ${item}`}
                className="px-3 py-1"
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
