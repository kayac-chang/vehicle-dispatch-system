import { Icon } from "components/atoms";
import { Location, IconButton } from "components/fastCall";
import { DefaultModal } from "components/molecules";
import { useState } from "react";
type CardProps = {
  pathNo: number;
  pathName: string;
  pickupLocation: string;
  dropLocation: string;
};

export function Card({
  pathNo,
  pathName,
  pickupLocation,
  dropLocation,
}: CardProps) {
  const [isOpen, setOpen] = useState(false);

  function deleteAction() {
    // TODO:刪除此筆路線
    console.log(`delete path: ${pathNo}`);
    setOpen(false);
  }
  return (
    <article className="font-normal text-sm leading-6 text-gray-dark">
      <div className="flex items-center px-4 py-2">
        <span className="text-xs text-gray-light mr-2">路線名稱</span>
        <h2 className="flex-1 truncate">{pathName}</h2>
      </div>
      <div className="w-full py-2 px-4 bg-gray-extralight">
        <Location location={pickupLocation}>
          <Icon.EllipseHole />
        </Location>

        <Location location={dropLocation}>
          <Icon.EllipseFill />
        </Location>
      </div>
      <div className="w-full py-2 flex justify-center items-center space-x-1">
        <IconButton className="text-orange-dark" title="預約訂車">
          <Icon.Car />
        </IconButton>

        <hr className="border-r border-gray h-3 transform rotate-0" />

        <IconButton className="text-blue-light" title="編輯">
          <Icon.Edit />
        </IconButton>

        <hr className="border-r border-gray h-3 transform rotate-0" />

        {/* TODO:要把按鈕事件改掉 */}
        <div onClick={() => setOpen(true)}>
          <IconButton className="text-red-light" title="刪除">
            <Icon.Delete />
          </IconButton>
        </div>
      </div>

      <DefaultModal
        isOpen={isOpen}
        setOpen={setOpen}
        action={() => deleteAction()}
        size="lg"
      >
        <p className="px-2 -mt-4 opacity-75 flex items-center">
          <span className="w-6 text-orange-dark mr-4">
            <Icon.Alert />
          </span>
          <span>確定刪除此路線？</span>
        </p>
      </DefaultModal>
    </article>
  );
}
