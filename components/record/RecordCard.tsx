import { Tag, CanShared, InfoSet, DecorationTag } from "components/record";
import { Button, Icon } from "components/atoms";
import clsx from "clsx";
import { ReactNode } from "react";
import { OrderStatus, Record, statusDecoder } from "types";
import { format, isAfter, isBefore, subHours } from "date-fns";

const content = {
  title: "長照",

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
  type?: "button" | "anchor";
  className: string;
  onClick?: () => void;
  children: ReactNode;
  href?: string;
};
function RecordButton({
  type = "button",
  className,
  onClick,
  href,
  children,
}: RecordButtonProps) {
  return (
    <Button.Base
      type={type}
      className={clsx(
        "py-px px-3 lg:px-4 rounded-sm text-white whitespace-no-wrap",
        className
      )}
      onClick={onClick}
      href={href || ""}
    >
      {children}
    </Button.Base>
  );
}

type RecordCardProps = {
  item: Record;

  onAbsenceClick: () => void;
  onCancelClick: () => void;
};
export function RecordCard({
  item,
  onAbsenceClick,
  onCancelClick,
}: RecordCardProps) {
  const status = statusDecoder(item.status);

  const cancelable =
    (item.status === OrderStatus.NewOrder ||
      item.status === OrderStatus.Booked) &&
    isBefore(new Date(), subHours(item.date, 48));

  const isAbsence =
    item.status === OrderStatus.Booked && isAfter(new Date(), item.date);

  const isDone = item.status === OrderStatus.Done;

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
              <Tag status={item.status} label={status} />

              {item.share && (
                <CanShared className="mt-1" label={content.canShared} />
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-3 text-sm mr-4 lg:mx:0 pt-12 lg:pt-0 pb-4">
            <InfoSet title={content.order.no} content={item.order} />

            <InfoSet
              title={content.order.reserveDate}
              content={format(item.date, "yyyy-MM-dd")}
            />

            <div className="flex space-x-4">
              <InfoSet
                title={content.order.canShared.label}
                content={
                  item.share
                    ? content.order.canShared.yes
                    : content.order.canShared.no
                }
              />

              <InfoSet
                title={content.order.familyWith.label}
                content={`${item.accompanying}${content.order.familyWith.unit}`}
              />
            </div>

            <InfoSet
              title={content.order.carCategoryName}
              content={item.carCategory.name}
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

              <p className="text-black font-semibold flex-1">{item.from}</p>
            </div>

            <div className="flex flex-col lg:flex-row">
              <span>
                <ToTitle />
              </span>

              <p className="text-black font-semibold flex-1">{item.to}</p>
            </div>
          </div>

          <div
            className={clsx(
              "lg:flex-col lg:justify-start lg:space-x-0 lg:space-y-2 lg:mt-0",
              "flex flex-row justify-center space-x-1 text-sm mt-6"
            )}
          >
            <RecordButton
              type="anchor"
              href={`/client/record/${item.id}`}
              className="bg-blue-light"
            >
              {content.button.detail}
            </RecordButton>

            <RecordButton
              type="anchor"
              href={`/client/dispatch/${item.id}`}
              className="bg-green-bright"
            >
              {content.button.order}
            </RecordButton>

            {cancelable && (
              <RecordButton className="bg-red-bright" onClick={onCancelClick}>
                {content.button.cancel}
              </RecordButton>
            )}

            {isAbsence && (
              <RecordButton className="bg-red-bright" onClick={onAbsenceClick}>
                {content.button.absence}
              </RecordButton>
            )}

            {isDone && (
              <RecordButton className="bg-blue-light">
                {content.button.question}
              </RecordButton>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
