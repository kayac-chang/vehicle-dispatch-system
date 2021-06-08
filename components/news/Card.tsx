import { Pagination } from "components/molecules";
import { NoData, Tag } from "components/atoms";
import { News } from "types";
import Link from "next/link";
import clsx from "clsx";

type CardViewProps = {
  loading: boolean;
  total: number;
  items: News[];
  page: number;
  onChange: (page: number) => void;
};
export function CardView({
  loading,
  items,
  total,
  page,
  onChange,
}: CardViewProps) {
  return (
    <div className="lg:hidden">
      {items.length && (
        <div className="bg-white">
          <ul
            className="divide-y"
            aria-live="polite"
            aria-busy={loading ? "true" : "false"}
          >
            {items.map(({ id, category, title, date }, index) => (
              <li key={index}>
                <Link href={`/client/news/${id}`}>
                  <a>
                    <article className="px-6 py-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <Tag
                          className={clsx(
                            category === "長照"
                              ? "border-orange-dark bg-orange-light text-orange-dark"
                              : "bg-gray-extralight"
                          )}
                        >
                          {category}
                        </Tag>

                        <span className="text-xs">{date}</span>
                      </div>

                      <h3 className="text-sm">{title}</h3>
                    </article>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center shadow-inner pt-2 pb-6">
            <Pagination total={total} page={page} onChange={onChange} />
          </div>
        </div>
      )}

      {!items.length && <NoData />}
    </div>
  );
}
