import clsx from "clsx";
import { RecordDetailTypes } from "types";
import { DecorationTag, InfoSet, Tag, Carpool } from "components/record";

type Props = {
  item: RecordDetailTypes;
};

export function PaymentInfo({ item }: Props) {
  return (
    <section className="p-6 py-3 bg-white flex flex-col space-y-3">
      <header className="flex items-center border-b">
        <h3 className="text-lg font-bold border-b-4 border-gold-darker py-1">
          付款資訊
        </h3>
      </header>
      <div
        className={clsx(
          "flex flex-col space-x-0 space-y-4  mt-4",
          "lg:w-3/4 lg:flex-row lg:flex-wrap lg:space-y-0"
        )}
      >
        {item.paymentInfo.map((item, index) => (
          <InfoSet
            key={index}
            className="w-auto lg:w-40 mb-0 lg:mb-4"
            title={item.title}
            content={item.content}
            titleSize="xs"
            align="v"
          />
        ))}
      </div>
      <div
        className={clsx(
          "w-full flex justify-start flex-col space-y-4",
          "lg:justify-between lg:flex-row lg:space-y-0"
        )}
      >
        <InfoSet
          className="w-auto lg:w-40 mb-0 lg:mb-4"
          title="司機備註"
          content={item.paymentNote}
          titleSize="xs"
          align="v"
        />
        <div className="flex flex-col lg:flex-row">
          <p className="text-xs text-gray-lighter mr-6 mb-2">簽名</p>
          <div className="w-40 h-32 bg-gray-extralight">{item.signature}</div>
        </div>
      </div>
    </section>
  );
}
