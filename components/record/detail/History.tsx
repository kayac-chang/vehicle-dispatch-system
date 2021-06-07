import clsx from "clsx";
import { RecordDetail } from "types";

const content = {
  title: "訂單歷程",
  table: {
    state: "狀態",
    time: "操作時間",
    person: "操作人員",
  },
};

type Props = {
  item: RecordDetail;
};
export function History({ item }: Props) {
  return (
    <div
      className={clsx(
        "p-0 pt-3 pb-0 bg-white flex flex-col space-y-3",
        "lg:px-6 lg:pb-12 lg:rounded-lg lg:rounded-t-none"
      )}
    >
      <div className="flex items-center border-b mb-0 mx-4 lg:mb-4 lg:mx-0">
        <strong className="text-lg font-bold border-b-4 border-gold-darker py-1">
          {content.title}
        </strong>
      </div>

      <table className="table-auto">
        <thead>
          <tr className="bg-gold-darker text-white text-left text-xs">
            <th className="py-4 pl-4">{content.table.state}</th>
            <th className="py-4 text-center lg:text-left">
              {content.table.time}
            </th>
            <th className="py-4 pr-4 lg:pr-0 text-left lg:text-center">
              {content.table.person}
            </th>
          </tr>
        </thead>

        <tbody className="text-sm text-left">
          {item.history.map((item, index) => (
            <tr key={index} className="border-b">
              <th className="py-4 pl-4 font-semibold">{item.status}</th>
              <th className="py-4 font-normal text-center lg:text-left">
                {item.editDate}
              </th>
              <th className="py-4 px-2 lg:px-0 font-normal text-left lg:text-center">
                {item.editor}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
