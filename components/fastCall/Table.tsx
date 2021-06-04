import { Icon } from "components/atoms";
import { Location, IconButton } from "components/fastCall";
import { DefaultModal } from "components/molecules";
import { useState } from "react";
type TableProps = {
  pathNo: number;
  pathName: string;
  pickupLocation: string;
  dropLocation: string;
};

export function Table({
  pathNo,
  pathName,
  pickupLocation,
  dropLocation,
}: TableProps) {
  const [isOpen, setOpen] = useState(false);

  function deleteAction() {
    // TODO:刪除此筆路線
    console.log(`delete path: ${pathNo}`);
    setOpen(false);
  }
  return (
    <article className="font-normal text-gray-dark text-sm flex items-center">
      <h2 className="w-4/12 px-4">{pathName}</h2>
      <section className="w-5/12 py-3 flex-col space-y-1">
        <Location location={pickupLocation}>
          <Icon.EllipseHole />
        </Location>

        <Location location={dropLocation}>
          <Icon.EllipseFill />
        </Location>
      </section>
      <section className="w-3/12 flex items-center space-x-1">
        <IconButton className="text-orange-dark" title="預約訂車">
          <Icon.Car />
        </IconButton>

        <hr className="border-r h-3 transform rotate-0" />

        <IconButton className="text-blue-light" title="編輯">
          <Icon.Edit />
        </IconButton>

        <hr className="border-r h-3 transform rotate-0" />

        {/* TODO:要把按鈕事件改掉 */}
        <div onClick={() => setOpen(true)}>
          <IconButton className="text-red-light" title="刪除">
            <Icon.Delete />
          </IconButton>
        </div>
      </section>
      <DefaultModal
        isOpen={isOpen}
        setOpen={setOpen}
        action={deleteAction}
        size="sm"
      >
        <p className="px-4 -mt-4 opacity-75 flex items-center">
          <span className="w-6 text-orange-dark mr-4">
            <Icon.Alert />
          </span>
          <span>確定刪除此路線？</span>
        </p>
      </DefaultModal>
    </article>
  );
}
