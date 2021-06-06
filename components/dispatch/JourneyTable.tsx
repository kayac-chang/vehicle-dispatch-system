import clsx from "clsx";

export function JourneyTable() {
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

  const rows: Record<string, string>[] = [
    {
      type: "去程",
      total: "$1000",
      subsidy: "$1000",
      self: "$1000",
      accompany: "$1000",
      speical: "$1000",
    },
    {
      type: "回程",
      total: "$1000",
      subsidy: "$1000",
      self: "$1000",
      accompany: "$1000",
      speical: "$1000",
    },
  ];

  return (
    <div className="-mx-4 lg:mx-0">
      <table className="w-full bg-white table-fixed text-center text-sm shadow-lg">
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
          {rows.map((row, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
