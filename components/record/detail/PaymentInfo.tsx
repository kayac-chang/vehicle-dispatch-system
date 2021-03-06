import clsx from "clsx";
import Image from "next/image";
import { InfoSet } from "components/record";
import { OrderDetailRecord } from "types";

const content = {
  title: "付款資訊",
  note: "司機備註",
  sign: "簽名",
};

type Props = {
  detail: OrderDetailRecord;
};
export function PaymentInfo({ detail }: Props) {
  const paymentInfoData = [
    { title: "營收金額", content: "??" },
    { title: "實際政府補助", content: detail.amount.subsidy },
    { title: "實際自付額", content: detail.amount.self },
    { title: "實際陪同金額", content: detail.amount.accompany },
    {
      title: "實際陪同人數",
      content: detail.accompanying,
    },
    { title: "使用額度", content: "" },
    { title: "實收金額", content: "" },
  ];
  return (
    <div className="p-6 py-3 bg-white flex flex-col space-y-3">
      <div className="flex items-center border-b">
        <strong className="text-lg font-bold border-b-4 border-gold-darker py-1">
          {content.title}
        </strong>
      </div>

      <div
        className={clsx(
          "flex flex-col space-x-0 space-y-4  mt-4",
          "lg:w-3/4 lg:flex-row lg:flex-wrap lg:space-y-0"
        )}
      >
        {paymentInfoData.map((item, index) => (
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
          title={content.note}
          content={""}
          titleSize="xs"
          align="v"
        />

        <div className="flex flex-col lg:flex-row">
          <span className="text-xs text-gray-lighter mr-6 mb-2">
            {content.sign}
          </span>

          {/* <div className="w-40 h-32 bg-gray-extralight">
            <Image
              className="w-6 h-6 overflow-hidden"
              src={}
              alt="client signature"
              width={160}
              height={128}
              unoptimized
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
