import { Pagination } from "components/molecules";
import { NoData } from "components/atoms";
import { Tag } from "./Tag";
import { Post } from "types";

type CardViewProps = {
  items: Post[];
};
export function CardView({ items }: CardViewProps) {
  return (
    <div className="lg:hidden">
      {items.length ? (
        <div className="bg-white">
          <div className="divide-y">
            {items.map(({ category, title, date }, index) => (
              <article className="px-6 py-2 space-y-2" key={index}>
                <div className="flex justify-between items-center">
                  <Tag>{category}</Tag>

                  <span className="text-xs">{date}</span>
                </div>

                <h3 className="text-sm">{title}</h3>
              </article>
            ))}
          </div>

          <div className="flex justify-center shadow-inner pt-2 pb-6">
            <Pagination current={6} total={10} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
