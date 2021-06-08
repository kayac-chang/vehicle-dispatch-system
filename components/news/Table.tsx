import { Pagination } from "components/molecules";
import { Icon, NoData, Tag } from "components/atoms";
import clsx from "clsx";
import { News } from "types";
import Link from "next/link";

const content = {
  table: {
    category: "類型",
    date: "日期",
    title: "公告",
  },
};

type TableViewProps = {
  total: number;
  items: News[];
  page: number;
  onChange: (page: number) => void;
};
export function TableView({ items, total, page, onChange }: TableViewProps) {
  return (
    <div className="hidden lg:block pb-8">
      <table
        className={clsx(
          "w-full bg-white overflow-hidden",
          items.length ? "shadow-xl rounded-lg" : "rounded-t-lg"
        )}
      >
        <thead>
          <tr className="bg-gold-darker text-white text-left">
            <th className="w-1/12 py-4 pl-4">{content.table.category}</th>
            <th className="w-1/12 py-4">{content.table.date}</th>
            <th className="w-10/12 py-4" colSpan={2}>
              {content.table.title}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items.map(({ id, category, title, date }) => (
            <tr key={id}>
              <td className="w-1/12 py-2 pl-4">
                <Tag
                  className={clsx(
                    category === "長照" &&
                      "border-orange-dark bg-orange-light text-orange-dark"
                  )}
                >
                  {category}
                </Tag>
              </td>
              <td className="w-1/12 py-2">{date}</td>
              <td className="w-9/12 py-2">{title}</td>
              <td className="w-1/12 py-2">
                <div className="w-full h-full flex justify-center">
                  <Link href={`/client/news/${id}`}>
                    <a className="w-10 p-2">
                      <Icon.ArrowRight />
                    </a>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length ? (
        <div className="flex justify-end pt-2">
          <Pagination total={total} page={page} onChange={onChange} />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
