import { Pagination } from "components/molecules";
import { Icon, NoData } from "components/atoms";
import { Tag } from "./Tag";
import clsx from "clsx";
import { News } from "types";
import Link from "next/link";

const LIMIT = 9;

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
};
export function TableView({ items, total }: TableViewProps) {
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
          {items.map(({ id, category, title, date }, index) => (
            <tr key={index}>
              <td className="w-1/12 py-2 pl-4">
                <Tag>{category}</Tag>
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

      {items.length > 0 && (
        <div className="flex justify-end pt-2">
          <Pagination total={Math.ceil(total / LIMIT)} />
        </div>
      )}

      {items.length <= 0 && <NoData />}
    </div>
  );
}
