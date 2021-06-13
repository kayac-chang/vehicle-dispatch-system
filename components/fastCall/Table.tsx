import { Icon, Button } from "components/atoms";
import { Location } from "components/fastCall";
import { Path } from "types";

const content = {
  title: "路線名稱",
  order: "預約訂車",
  edit: "編輯",
  delete: "刪除",
};

type Props = Path & {
  onDeleteClick?: () => void;
};
export function Table({ id, name, from, to, onDeleteClick }: Props) {
  return (
    <div className="font-normal text-gray-dark text-sm flex items-center">
      <strong className="w-4/12 px-4">{name}</strong>

      <div className="w-5/12 py-3 flex-col space-y-1">
        <Location location={from} icon={<Icon.EllipseHole />} />

        <Location location={to} icon={<Icon.EllipseFill />} />
      </div>

      <div className="w-3/12 flex items-center space-x-1">
        <Button.Icon
          type="anchor"
          className="text-orange-dark"
          icon={<Icon.Car />}
          href="/client/call-car"
        >
          {content.order}
        </Button.Icon>

        <hr className="border-r h-3 transform rotate-0" />

        <Button.Icon
          type="anchor"
          className="text-blue-light"
          icon={<Icon.Edit />}
          href={`/client/fast-call/edit/${id}`}
        >
          {content.edit}
        </Button.Icon>

        <hr className="border-r h-3 transform rotate-0" />

        <Button.Icon
          type="button"
          className="text-red-light"
          icon={<Icon.Delete />}
          onClick={onDeleteClick}
        >
          {content.delete}
        </Button.Icon>
      </div>
    </div>
  );
}
