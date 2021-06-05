import { Pagination } from "components/molecules";
import { NoData } from "components/atoms";
import { Tag } from "./Tag";
import { News } from "types";
import Link from "next/link";

type CardViewProps = {
  items: News[];
};
export function CardView({ items }: CardViewProps) {
  return (
    <div className="lg:hidden">
      {items.length ? (
        <div className="bg-white">
          <div className="divide-y">
            {items.map(({ id, category, title, date }, index) => (
              <Link key={index} href={`/client/news/${id}`}>
                <a>
                  <article className="px-6 py-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <Tag>{category}</Tag>

                      <span className="text-xs">{date}</span>
                    </div>

                    <h3 className="text-sm">{title}</h3>
                  </article>
                </a>
              </Link>
            ))}
          </div>

          <div className="flex justify-center shadow-inner pt-2 pb-6">
            <Pagination total={items.length} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
