import clsx from "clsx";
import { OrderAmount } from "types";
import numeral from "numeral";

const heads = [
  {
    label: "行程",
    key: "type",
    className: "text-blue-light",
  },
  {
    label: "總額",
    key: "total",
  },
  {
    label: "補助",
    key: "subsidy",
  },
  {
    label: "自負",
    key: "self",
  },
  {
    label: "陪同",
    key: "accompany",
  },
  {
    label: "個案負擔",
    key: "speical",
    className: "text-red-light",
  },
];

const content = {
  from: "去程",
  to: "回程",
};

function currency(value: number) {
  return numeral(value).format("$0,0");
}

type Props = {
  from: OrderAmount;
  to?: OrderAmount;
};
export function JourneyTable({ from, to }: Props) {
  const rows: (Record<string, string> | undefined)[] = [
    {
      type: content.from,
      total: currency(from.total),
      subsidy: currency(from.subsidy),
      self: currency(from.self),
      accompany: currency(from.accompany),
      speical: currency(from.self + from.accompany),
    },
    to && {
      type: content.to,
      total: currency(to.total),
      subsidy: currency(to.subsidy),
      self: currency(to.self),
      accompany: currency(to.accompany),
      speical: currency(to.self + to.accompany),
    },
  ];

  return (
    <div className="-mx-4 lg:mx-0">
      <table
        className="w-full bg-white table-fixed text-center text-sm shadow-lg"
        aria-live="polite"
      >
        <thead>
          <tr className="bg-gold-darker text-white">
            {heads.map((head) => (
              <th key={head.key} className="py-2">
                {head.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {rows.map(
            (row, index) =>
              row && (
                <tr key={index}>
                  {heads.map(({ key, className }) => (
                    <td
                      key={`${index}, ${key}`}
                      className={clsx("py-2", className)}
                    >
                      {row[key] || ""}
                    </td>
                  ))}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
