import { Pagination } from "components/molecules";
import { NoData } from "components/atoms";
import { Tag } from "./Tag";
import { News } from "types";
import Link from "next/link";

const LIMIT = 9;

type CardViewProps = {
  total: number;
  items: News[];
};
export function CardView({ items, total }: CardViewProps) {
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
            <Pagination total={Math.ceil(total / LIMIT)} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
