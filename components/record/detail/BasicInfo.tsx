import clsx from "clsx";
import { DecorationTag, InfoSet, Tag, CanShared } from "components/record";
import { OrderDetailRecord, statusDecoder } from "types";
import { format } from "date-fns";

const content = {
  title: "長照",
  label: {
    createdIdentity: "訂車人身份",
    canShared: "可否共乘",
    familyWith: "陪同人數",
    wealTypeName: "福利身份別",
    createDate: "建單時間",
    etTotalAmt: "預估車資總額",
    etDiscountAmt: "預估政府補助",
    etSelfPay: "預估自付額",
    etWithAmt: "預估陪同金額",
    receivableAmt: "應收金額",
  },
  order: {
    orderNo: "訂單編號",
    reserveDate: "預約搭乘時間",
    canShared: "已共乘",

    case: "案號",
    phone: "聯絡電話",
    sms: "簡訊手機",
  },
  canShared: {
    yes: "可共乘",
    no: "不願共乘",
  },
};

type Props = {
  detail: OrderDetailRecord;
};
export function BasicTitle({ detail }: Props) {
  return (
    <div
      className={clsx(
        "w-full bg-gray-extralight py-3 rounded-none",
        "lg:rounded-lg lg:rounded-b-none"
      )}
    >
      <div className="flex items-center justify-between lg:space-x-4 pr-4 lg:pr-6">
        <DecorationTag className="relative" label={content.title} />

        <div className="flex-1 items-center space-x-4 hidden lg:flex">
          <InfoSet
            title={content.order.orderNo}
            content={detail.order}
            titleSize="sm"
            contentClass="text-sm text-blue-darker font-semibold"
          />

          <InfoSet
            title={content.order.reserveDate}
            content={format(detail.date, "yyyy-MM-dd")}
            titleSize="sm"
            contentClass="text-sm text-blue-darker font-semibold"
          />
        </div>

        <div className="flex">
          {detail.share && (
            <CanShared
              className="space-x-1 mr-3 lg:mr-6"
              label={content.order.canShared}
            />
          )}

          {detail.status && (
            <Tag status={detail.status} label={statusDecoder(detail.status)} />
          )}
        </div>
      </div>

      <div className="px-4 pt-3 flex-1 items-center space-x-4 flex lg:hidden">
        <InfoSet
          title={content.order.orderNo}
          content={detail.order}
          titleSize="sm"
          contentClass="text-sm text-blue-darker font-semibold"
        />

        <InfoSet
          title={content.order.reserveDate}
          content={format(detail.date, "yyyy-MM-dd")}
          titleSize="sm"
          contentClass="text-sm text-blue-darker font-semibold"
        />
      </div>
    </div>
  );
}

export function BasicInfo({ detail }: Props) {
  const basicInfo = [
    { title: content.label.createdIdentity, content: detail.identity },
    {
      title: content.label.canShared,
      content: detail.share ? content.canShared.yes : content.canShared.no,
    },
    { title: content.label.familyWith, content: `${detail.accompanying}人` },
    { title: content.label.wealTypeName, content: detail.wheelchair },
    {
      title: content.label.createDate,
      content: format(detail.createdAt, "yyyy-MM-dd"),
    },
    { title: content.label.etTotalAmt, content: detail.amount.total },
    { title: content.label.etDiscountAmt, content: detail.amount.subsidy },
    { title: content.label.etSelfPay, content: detail.amount.self },
    { title: content.label.etWithAmt, content: detail.amount.accompany },
  ];

  return (
    <div className="p-6 pb-3 bg-white">
      <div
        className={clsx(
          "flex flex-col space-y-3 space-x-0",
          "lg:items-center lg:flex-row lg:space-y-0 lg:space-x-4"
        )}
      >
        <strong className="text-2xl text-gray-900 font-semibold">
          {detail.name}
        </strong>

        <InfoSet
          title={content.order.case}
          content={detail.caseNo}
          titleSize="sm"
          align="h"
        />

        <InfoSet
          title={content.order.phone}
          content={detail.userPhone}
          titleSize="sm"
          align="h"
        />

        <InfoSet
          title={content.order.sms}
          content={detail.phone}
          titleSize="sm"
          align="h"
        />
      </div>

      <div
        className={clsx(
          "flex flex-col space-x-0 space-y-4  mt-4",
          "lg:w-5/6 lg:flex-row lg:flex-wrap lg:space-y-0"
        )}
      >
        {basicInfo.map((item, index) => (
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
    </div>
  );
}
