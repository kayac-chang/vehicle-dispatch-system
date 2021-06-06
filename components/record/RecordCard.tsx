import { Tag, Carpool, InfoSet, DecorationTag } from "components/record";
import { Record } from "types";
import { Button, Icon } from "components/atoms";
import clsx from "clsx";
import { ReactNode } from "react";

const content = {
  title: "長照",

  carpool: "已共乘",

  order: {
    no: "訂單編號",
    pickUpDate: "預約搭乘時間",
    isCarpool: {
      label: "可否共乘",
      yes: "可共乘",
      no: "不願共乘",
    },
    ridership: {
      label: "陪同人數",
      unit: "人",
    },
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

export function PickupTitle() {
  return (
    <div className="flex items-center text-orange-dark mr-2 space-x-1">
      <span className="w-5" aria-hidden>
        <Icon.Ring />
      </span>

      <span className="font-bold">{content.address.pickup}</span>
    </div>
  );
}

export function DropTitle() {
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
      className={clsx("py-px px-4 rounded-sm text-white", className)}
      onClick={onClick}
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
  return (
    <article className="w-full bg-white rounded-lg shadow-md py-4 lg:p-8 relative">
      <DecorationTag label={content.title} className="absolute left-0" />

      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-between flex-1">
          <div className="flex-1 px-4 lg:px-0 pt-12">
            <h2 className="font-semibold text-2xl leading-6 mb-5">
              {item.passenger}
            </h2>

            <Tag status={item.status} />

            {item.isCarpool && (
              <Carpool className="mt-1" label={content.carpool} />
            )}
          </div>

          <div className="flex-1 flex flex-col space-y-3 text-sm pt-12 lg:pt-0 pb-4">
            <InfoSet title={content.order.no} content={item.orderNo} />

            <InfoSet
              title={content.order.pickUpDate}
              content={item.pickUpDate}
            />

            <InfoSet
              title={content.order.isCarpool.label}
              content={
                item.isCarpool
                  ? content.order.isCarpool.yes
                  : content.order.isCarpool.no
              }
            />

            <InfoSet
              title={content.order.ridership.label}
              content={`${item.ridership}${content.order.ridership.unit}`}
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
                <PickupTitle />
              </span>

              <p className="text-black font-semibold flex-1">
                {item.pickupLocation}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row">
              <span>
                <DropTitle />
              </span>

              <p className="text-black font-semibold flex-1">
                {item.dropLocation}
              </p>
            </div>
          </div>

          <div
            className={clsx(
              "lg:flex-col lg:justify-start lg:space-x-0 lg:space-y-2 lg:mt-0",
              "flex flex-row justify-center space-x-2 text-sm mt-6"
            )}
          >
            <RecordButton className="bg-blue-bright">
              {content.button.detail}
            </RecordButton>

            <RecordButton className="bg-green-bright">
              {content.button.order}
            </RecordButton>

            <RecordButton className="bg-red-bright" onClick={onCancelClick}>
              {content.button.cancel}
            </RecordButton>

            <RecordButton className="bg-red-bright" onClick={onAbsenceClick}>
              {content.button.absence}
            </RecordButton>

            <RecordButton className="bg-blue-bright">
              {content.button.question}
            </RecordButton>
          </div>
        </div>
      </div>
    </article>
  );
}
