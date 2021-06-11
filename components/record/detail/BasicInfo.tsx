import clsx from "clsx";
import { RecordDetail } from "types/record";
import { DecorationTag, InfoSet, Tag, CanShared } from "components/record";

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
  status: {
    newOrder: "新訂單",
    booked: "已排班",
    arrived: "已抵達",
    driving: "客上",
    done: "完成",
    canceled: "取消",
  },
};

function statusDecoder(status: number): string {
  switch (status) {
    case 1:
      return content.status.newOrder;
    case 2:
      return content.status.booked;
    case 3:
      return content.status.arrived;
    case 4:
      return content.status.driving;
    case 5:
      return content.status.done;
    case 9:
      return content.status.canceled;
    default:
      return "";
  }
}

type BasicTitleProps = {
  detail: RecordDetail | undefined;
  status: number | undefined;
};
export function BasicTitle({ detail, status }: BasicTitleProps) {
  if (!detail) return <></>;
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
            content={detail.orderNo}
            titleSize="sm"
            contentClass="text-sm text-blue-darker font-semibold"
          />

          <InfoSet
            title={content.order.reserveDate}
            content={detail.reserveDate}
            titleSize="sm"
            contentClass="text-sm text-blue-darker font-semibold"
          />
        </div>

        <div className="flex">
          {detail.canShared && (
            <CanShared
              className="space-x-1 mr-3 lg:mr-6"
              label={content.order.canShared}
            />
          )}

          {status && <Tag status={status} label={statusDecoder(status)} />}
        </div>
      </div>

      <div className="px-4 pt-3 flex-1 items-center space-x-4 flex lg:hidden">
        <InfoSet
          title={content.order.orderNo}
          content={detail.orderNo}
          titleSize="sm"
          contentClass="text-sm text-blue-darker font-semibold"
        />

        <InfoSet
          title={content.order.reserveDate}
          content={detail.reserveDate}
          titleSize="sm"
          contentClass="text-sm text-blue-darker font-semibold"
        />
      </div>
    </div>
  );
}

type BasicInfoProps = {
  detail: RecordDetail | undefined;
};
export function BasicInfo({ detail }: BasicInfoProps) {
  if (!detail) return <></>;
  const basicInfo = [
    { title: content.label.createdIdentity, content: detail.createdIdentity },
    {
      title: content.label.canShared,
      content: detail.canShared ? content.canShared.yes : content.canShared.no,
    },
    { title: content.label.familyWith, content: `${detail.familyWith}人` },
    { title: content.label.wealTypeName, content: detail.wealTypeName },
    { title: content.label.createDate, content: detail.createDate },
    { title: content.label.etTotalAmt, content: detail.etTotalAmt },
    { title: content.label.etDiscountAmt, content: detail.etDiscountAmt },
    { title: content.label.etSelfPay, content: detail.etSelfPay },
    { title: content.label.etWithAmt, content: detail.etWithAmt },
    { title: content.label.etSelfPay, content: `${detail.etSelfPay}?` },
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
          {detail.userName}
        </strong>

        <InfoSet
          title={content.order.case}
          content={"1081213001"}
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
          content={detail.noticePhone}
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
