import clsx from "clsx";
import { RecordDetailTypes } from "types";

type Props = {
  item: RecordDetailTypes;
};
export function History({ item }: Props) {
  return (
    <section
      className={clsx(
        "p-0 pt-3 pb-0 bg-white flex flex-col space-y-3",
        "lg:px-6 lg:pb-12 lg:rounded-lg lg:rounded-t-none"
      )}
    >
      <header className="flex items-center border-b mb-0 mx-4 lg:mb-4 lg:mx-0">
        <h3 className="text-lg font-bold border-b-4 border-gold-darker py-1">
          訂單歷程
        </h3>
      </header>
      <table className="p-0 lg:mx-2">
        <thead>
          <tr className="bg-gold-darker text-white text-left text-xs">
            <th className="w-2/12 py-4 pl-4">狀態</th>
            <th className="w-7/12 lg:w-4/12 py-4 text-center lg:text-left">
              操作時間
            </th>
            <th className="w-3/12 lg:w-6/12 py-4 pr-4 lg:pr-0 text-left lg:text-center">
              操作人員
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-left">
          {item.history.map((item, index) => (
            <tr key={index} className="border-b">
              <th className="w-2/12 py-4 pl-4 font-semibold">{item.status}</th>
              <th className="w-7/12 lg:w-4/12 py-4 font-normal text-center lg:text-left">
                {item.editDate}
              </th>
              <th className="w-3/12 lg:w-6/12 py-4 px-2 lg:px-0 font-normal text-left lg:text-center">
                {item.editor}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
