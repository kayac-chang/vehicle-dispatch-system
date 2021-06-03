import {
  Tag,
  Carpool,
  PickupTitle,
  DropTitle,
  InfoSet,
} from "components/record";
import { useState } from "react";
import { RecordListTypes } from "types";
import { DefaultModal } from "components/molecules";
import { Icon } from "components/atoms";

function DecorationTag() {
  return (
    <div
      className="absolute w-48 lg:w-64 h-8 flex justify-center items-center bg-orange-dark"
      style={{ top: "2rem" }}
    >
      <div
        className="absolute right-0 w-5 h-8"
        style={{ background: "#FF9800" }}
      />

      <div
        className="absolute w-2 h-12 bg-white transform rotate-12"
        style={{ right: "1rem" }}
      />

      <div
        className="absolute w-2 h-10 bg-white transform rotate-12"
        style={{ right: "-0.2rem" }}
      />
      <hr className="w-full border border-white border-t-0 opacity-50" />
      <div className="absolute w-12 h-6 bg-orange-dark -ml-5"></div>
      <span className="absolute text-white -ml-5">。長照。</span>
    </div>
  );
}

type RecordCardProps = {
  item: RecordListTypes;
};
export function RecordCardLg({ item }: RecordCardProps) {
  const [isOpen, setOpen] = useState(false);

  const [deleteType, setDeleteType] = useState<"cancel" | "noShow">("cancel");

  function deleteModel(type: "cancel" | "noShow") {
    setDeleteType(type);
    setOpen(true);
  }

  function deleteOrder() {
    // TODO:刪除該張訂單
    console.log(`delete order: ${item.orderNo}`);
    setOpen(false);
  }

  return (
    <article
      className="w-full relative bg-white rounded-lg shadow-md mb-8"
      style={{ height: "206px" }}
    >
      <DecorationTag />
      <div className="w-full p-8 flex justify-between">
        <article className="w-48 h-20 mt-12 flex flex-col place-content-between">
          <h2 className="font-semibold text-2xl leading-6">{item.passenger}</h2>
          <div className="flex">
            <Tag status={item.status} />
            {item.isCarpool && <Carpool className="space-x-1" />}
          </div>
        </article>

        <div className="flex flex-col space-y-3 text-sm">
          <InfoSet title="訂單編號" content={item.orderNo} />
          <InfoSet title="預約搭乘時間" content={item.pickUpDate} />
          <div className="flex space-x-2">
            <InfoSet
              title="可否共乘"
              content={item.isCarpool ? "可共乘" : "不願共乘"}
            />
            <InfoSet title="陪同人數" content={`${item.ridership}人`} />
          </div>
          <InfoSet
            title="車輛類型"
            content={item.carType === 1 ? "一般車" : "無障礙車"}
          />
        </div>

        <div className="flex flex-col space-y-2 text-sm">
          <article className="flex items-start">
            <PickupTitle />
            <p className="text-black font-semibold w-64">
              {item.pickupLocation}
            </p>
          </article>

          <article className="flex items-start">
            <DropTitle />
            <p className="text-black font-semibold w-64">{item.dropLocation}</p>
          </article>
        </div>

        <div className="flex flex-col space-y-2 text-sm">
          <button className="py-px px-4 rounded-sm bg-blue-bright text-white">
            乘車明細
          </button>
          <button className="py-px px-4  rounded-sm bg-green-bright text-white">
            再次預約
          </button>
          {item.status === 2 && (
            <button
              className="py-px px-4  rounded-sm bg-red-bright text-white"
              onClick={() => deleteModel("cancel")}
            >
              取消訂單
            </button>
          )}
          {item.status === 5 && (
            <button className="py-px px-4  rounded-sm bg-blue-bright text-white">
              填寫問卷
            </button>
          )}
        </div>
      </div>

      <DefaultModal
        isOpen={isOpen}
        setOpen={setOpen}
        action={deleteOrder}
        size="sm"
      >
        <p className="px-4 -mt-4 opacity-75 flex items-center">
          <span className="w-6 text-orange-dark mr-4">
            <Icon.Alert />
          </span>
          {deleteType === "cancel" && <span>確定取消訂單?</span>}
          {deleteType === "noShow" && <span>確定司機未到?</span>}
        </p>
      </DefaultModal>
    </article>
  );
}

export function RecordCardSm({ item }: RecordCardProps) {
  const [isOpen, setOpen] = useState(false);

  const [deleteType, setDeleteType] = useState<"cancel" | "noShow">("cancel");

  function deleteModel(type: "cancel" | "noShow") {
    setDeleteType(type);
    setOpen(true);
  }

  function deleteOrder() {
    // TODO:刪除該張訂單
    console.log(`delete order: ${item.orderNo}`);
    setOpen(false);
  }

  return (
    <article className="relative bg-white rounded-lg shadow-md mx-2 mb-8 box-border">
      <DecorationTag />
      <div className="w-full pt-8 pb-3">
        <div className="w-full flex mt-12 mb-6 px-4">
          <article className="w-1/2">
            <h2 className="font-semibold text-2xl leading-6 mb-5">
              {item.passenger}
            </h2>

            <Tag status={item.status} />

            {item.isCarpool && <Carpool className="mt-1" />}
          </article>

          <div className="w-1/2 flex flex-col space-y-3 text-sm">
            <InfoSet title="訂單編號" content={item.orderNo} />
            <InfoSet title="預約搭乘時間" content={item.pickUpDate} />
            <InfoSet
              title="可否共乘"
              content={item.isCarpool ? "可共乘" : "不願共乘"}
            />
            <InfoSet title="陪同人數" content={`${item.ridership}人`} />
            {/* <InfoSet
              title="車輛類型"
              content={item.carType === 1 ? "一般車" : "無障礙車"}
            /> */}
          </div>
        </div>

        <hr className="border border-t-0 ml-4 mr-0" />

        <div className="flex flex-col space-y-2 text-sm px-4 mt-6">
          <article className="flex flex-col items-start">
            <PickupTitle />
            <p className="text-black font-semibold w-64">
              {item.pickupLocation}
            </p>
          </article>

          <article className="flex flex-col items-start">
            <DropTitle />
            <p className="text-black font-semibold w-64">{item.dropLocation}</p>
          </article>
        </div>

        <div className="flex flex-row justify-center space-x-2 text-sm mt-6">
          <button className="py-px px-4 rounded-sm bg-blue-bright text-white">
            乘車明細
          </button>
          <button className="py-px px-4  rounded-sm bg-green-bright text-white">
            再次預約
          </button>
          {item.status === 2 && (
            <button
              className="py-px px-4  rounded-sm bg-red-bright text-white"
              onClick={() => deleteModel("cancel")}
            >
              取消訂單
            </button>
          )}
          {item.status === 5 && (
            <button className="py-px px-4  rounded-sm bg-blue-bright text-white">
              填寫問卷
            </button>
          )}
        </div>
      </div>
      <DefaultModal
        isOpen={isOpen}
        setOpen={setOpen}
        action={deleteOrder}
        size="lg"
      >
        <p className="px-4 -mt-4 opacity-75 flex items-center">
          <span className="w-6 text-orange-dark mr-4">
            <Icon.Alert />
          </span>
          {deleteType === "cancel" && <span>確定取消訂單?</span>}
          {deleteType === "noShow" && <span>確定司機未到?</span>}
        </p>
      </DefaultModal>
    </article>
  );
}
