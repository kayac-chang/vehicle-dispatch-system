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
export function Table({
  pathName,
  pickupLocation,
  dropLocation,
  onOrderClick,
  onEditClick,
  onDeleteClick,
}: Props) {
  return (
    <div className="font-normal text-gray-dark text-sm flex items-center">
      <strong className="w-4/12 px-4">{pathName}</strong>

      <div className="w-5/12 py-3 flex-col space-y-1">
        <Location location={pickupLocation} icon={<Icon.EllipseHole />} />

        <Location location={dropLocation} icon={<Icon.EllipseFill />} />
      </div>

      <div className="w-3/12 flex items-center space-x-1">
        <IconButton
          className="text-orange-dark"
          icon={<Icon.Car />}
          onClick={onOrderClick}
        >
          {content.order}
        </IconButton>

        <hr className="border-r h-3 transform rotate-0" />

        <IconButton
          className="text-blue-light"
          icon={<Icon.Edit />}
          onClick={onEditClick}
        >
          {content.edit}
        </IconButton>

        <hr className="border-r h-3 transform rotate-0" />

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
