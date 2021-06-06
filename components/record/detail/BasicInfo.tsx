import clsx from "clsx";
import { RecordDetailTypes } from "types";
import { DecorationTag, InfoSet, Tag, Carpool } from "components/record";

type Props = {
  item: RecordDetailTypes;
};
export function BasicTitle({ item }: Props) {
  return (
    <div
      className={clsx(
        "w-full bg-gray-extralight py-3 rounded-none",
        "lg:rounded-lg lg:rounded-b-none"
      )}
    >
      <div className="flex items-center justify-between lg:space-x-4 pr-4 lg:pr-6">
        <DecorationTag className="relative" label="長照" />

        <div className="flex-1 items-center space-x-4 hidden lg:flex">
          <InfoSet
            title="訂單編號"
            content={item.orderNo}
            titleSize="sm"
            contentClass="text-sm text-blue-700 font-semibold"
          />

          <InfoSet
            title="預約搭乘時間"
            content={item.pickDate}
            titleSize="sm"
            contentClass="text-sm text-blue-700 font-semibold"
          />
        </div>
        <div className="flex">
          {item.isCarpool && (
            <Carpool className="space-x-1 mr-3 lg:mr-6" label="已共乘" />
          )}

          <Tag status={item.status} />
        </div>
      </div>
      <div className="px-4 pt-3 flex-1 items-center space-x-4 flex lg:hidden">
        <InfoSet
          title="訂單編號"
          content={item.orderNo}
          titleSize="sm"
          contentClass="text-sm text-blue-700 font-semibold"
        />

        <InfoSet
          title="預約搭乘時間"
          content={item.pickDate}
          titleSize="sm"
          contentClass="text-sm text-blue-700 font-semibold"
        />
      </div>
    </div>
  );
}

export function BasicInfo({ item }: Props) {
  return (
    <section className="p-6 pb-3 bg-white">
      <header
        className={clsx(
          "flex flex-col space-y-3 space-x-0",
          "lg:items-center lg:flex-row lg:space-y-0 lg:space-x-4"
        )}
      >
        <h2 className="text-2xl text-gray-900 font-semibold">
          {item.passenger}
        </h2>
        <InfoSet title="案號" content={"1081213001"} titleSize="sm" align="h" />
        <InfoSet
          title="聯絡電話"
          content={item.phone}
          titleSize="sm"
          align="h"
        />
        <InfoSet
          title="簡訊手機"
          content={item.phoneSms}
          titleSize="sm"
          align="h"
        />
      </header>

      <div
        className={clsx(
          "flex flex-col space-x-0 space-y-4  mt-4",
          "lg:w-5/6 lg:flex-row lg:flex-wrap lg:space-y-0"
        )}
      >
        {item.basicInfo.map((item, index) => (
          <InfoSet
            key={index}
            className="w-auto lg:w-40 mb-0 lg:mb-4"
            title={item.title}
            content={item.content}
            titleSize="sm"
            align="v"
          />
        ))}
      </div>
    </section>
  );
}
