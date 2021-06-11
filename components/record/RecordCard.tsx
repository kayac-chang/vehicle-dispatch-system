import Link from "next/link";
import { Tag, CanShared, InfoSet, DecorationTag } from "components/record";
import { Button, Icon } from "components/atoms";
import clsx from "clsx";
import { ReactNode } from "react";
import { ClientRecord } from "types/record";

const content = {
  title: "長照",

  status: {
    newOrder: "新訂單",
    booked: "已排班",
    arrived: "已抵達",
    driving: "客上",
    done: "完成",
    canceled: "取消",
  },

  canShared: "已共乘",

  order: {
    no: "訂單編號",
    reserveDate: "預約搭乘時間",
    canShared: {
      label: "可否共乘",
      yes: "可共乘",
      no: "不願共乘",
    },
    familyWith: {
      label: "陪同人數",
      unit: "人",
    },
    carCategoryName: "車輛類型",
  },

  address: {
    pickup: "起點",
    drop: "迄點",
  },

  button: {
    detail: "乘車明細",
    order: "再次預約",
    cancel: "取消訂單",
    absence: "司機未到",
    question: "填寫問卷",
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

export function FromTitle() {
  return (
    <div className="flex items-center text-orange-dark mr-2 space-x-1">
      <span className="w-5" aria-hidden>
        <Icon.Ring />
      </span>

      <span className="font-bold">{content.address.pickup}</span>
    </div>
  );
}

export function ToTitle() {
  return (
    <div className="flex items-center text-orange-dark mr-2 space-x-1">
      <span className="w-5" aria-hidden>
        <Icon.Map />
      </span>

      <span className="font-bold">{content.address.drop}</span>
    </div>
  );
}

type RecordButtonProps = {
  className: string;
  onClick?: () => void;
  children: ReactNode;
};
function RecordButton({ className, onClick, children }: RecordButtonProps) {
  return (
    <Button.Base
      type="button"
      className={clsx(
        "py-px px-3 lg:px-4 rounded-sm text-white whitespace-no-wrap",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button.Base>
  );
}

type RecordCardProps = {
  item: ClientRecord;

  onAbsenceClick: () => void;
  onCancelClick: () => void;
};
export function RecordCard({
  item,
  onAbsenceClick,
  onCancelClick,
}: RecordCardProps) {
  return (
    <article className="w-full bg-white rounded-lg shadow-md py-4 lg:p-8 relative">
      <DecorationTag label={content.title} className="absolute left-0" />

      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-between flex-1">
          <div className="flex-1 px-4 lg:px-0 pt-12">
            <h2 className="font-semibold text-2xl leading-6 mb-5">
              {item.name}
            </h2>

            <div className="block lg:flex lg:ㄒspace-x-2">
              <Tag status={item.status} label={statusDecoder(item.status)} />

              {item.canShared && (
                <CanShared className="mt-1" label={content.canShared} />
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-3 text-sm mr-4 lg:mx:0 pt-12 lg:pt-0 pb-4">
            <InfoSet title={content.order.no} content={item.orderNo} />

            <InfoSet
              title={content.order.reserveDate}
              content={item.reserveDate}
            />

            <div className="flex space-x-4">
              <InfoSet
                title={content.order.canShared.label}
                content={
                  item.canShared
                    ? content.order.canShared.yes
                    : content.order.canShared.no
                }
              />

              <InfoSet
                title={content.order.familyWith.label}
                content={`${item.familyWith}${content.order.familyWith.unit}`}
              />
            </div>

            <InfoSet
              title={content.order.carCategoryName}
              content={item.carCategoryName}
            />
          </div>
        </div>

        <div className="flex-1 lg:flex">
          <hr className="block lg:hidden border border-t-0 ml-4 mr-0" />

          <div
            className={clsx(
              "flex-1",
              "flex flex-col space-y-2 text-sm px-4 mt-6",
              "lg:mt-0"
            )}
          >
            <div className="flex flex-col lg:flex-row">
              <span>
                <FromTitle />
              </span>

              <p className="text-black font-semibold flex-1">{item.fromAddr}</p>
            </div>

            <div className="flex flex-col lg:flex-row">
              <span>
                <ToTitle />
              </span>

              <p className="text-black font-semibold flex-1">{item.toAddr}</p>
            </div>
          </div>

          <div
            className={clsx(
              "lg:flex-col lg:justify-start lg:space-x-0 lg:space-y-2 lg:mt-0",
              "flex flex-row justify-center space-x-1 text-sm mt-6"
            )}
          >
            <Link href={`/client/record/${item.orderNo}`}>
              <a>
                <RecordButton className="bg-blue-bright">
                  {content.button.detail}
                </RecordButton>
              </a>
            </Link>

            <RecordButton className="bg-green-bright">
              {content.button.order}
            </RecordButton>

            {(statusDecoder(item.status) === content.status.newOrder ||
              statusDecoder(item.status) === content.status.booked) && (
              <RecordButton className="bg-red-bright" onClick={onCancelClick}>
                {content.button.cancel}
              </RecordButton>
            )}

            {statusDecoder(item.status) === content.status.booked && (
              <RecordButton className="bg-red-bright" onClick={onAbsenceClick}>
                {content.button.absence}
              </RecordButton>
            )}

            {statusDecoder(item.status) === content.status.done && (
              <RecordButton className="bg-blue-bright">
                {content.button.question}
              </RecordButton>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
