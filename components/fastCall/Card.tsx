import { Icon } from "components/atoms";
import { Location, IconButton } from "components/fastCall";

const content = {
  title: "路線名稱",
  order: "預約訂車",
  edit: "編輯",
  delete: "刪除",
};

type Props = {
  pathNo: number;
  pathName: string;
  pickupLocation: string;
  dropLocation: string;
  onOrderClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};
export function Card({
  pathName,
  pickupLocation,
  dropLocation,
  onOrderClick,
  onEditClick,
  onDeleteClick,
}: Props) {
  return (
    <div className="font-normal text-sm leading-6 text-gray-dark">
      <div className="flex items-center px-4 py-2">
        <span className="text-xs text-gray-light mr-2">{content.title}</span>

        <span className="flex-1 truncate">{pathName}</span>
      </div>

      <div className="w-full py-2 px-4 bg-gray-extralight">
        <Location location={pickupLocation} icon={<Icon.EllipseHole />} />

        <Location location={dropLocation} icon={<Icon.EllipseFill />} />
      </div>

      <div className="w-full py-2 flex justify-center items-center space-x-1">
        <IconButton
          className="text-orange-dark"
          icon={<Icon.Car />}
          onClick={onOrderClick}
        >
          {content.order}
        </IconButton>

        <hr className="border-r border-gray h-3 transform rotate-0" />

        <IconButton
          className="text-blue-light"
          icon={<Icon.Edit />}
          onClick={onEditClick}
        >
          {content.edit}
        </IconButton>

        <hr className="border-r border-gray h-3 transform rotate-0" />

        <IconButton
          className="text-red-light"
          icon={<Icon.Delete />}
          onClick={onDeleteClick}
        >
          {content.delete}
        </IconButton>
      </div>
    </div>
  );
}
