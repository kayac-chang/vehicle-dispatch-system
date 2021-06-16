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
export function Card({ id, name, from, to, onDeleteClick }: Props) {
  return (
    <div className="font-normal text-sm leading-6 text-gray-dark">
      <div className="flex items-center px-4 py-2">
        <span className="text-xs text-gray-light mr-2">{content.title}</span>

        <span className="flex-1 truncate">{name}</span>
      </div>

      <div className="w-full py-2 px-4 bg-gray-extralight">
        <Location location={from} icon={<Icon.EllipseHole />} />

        <Location location={to} icon={<Icon.EllipseFill />} />
      </div>

      <div className="w-full py-2 flex justify-center items-center space-x-1">
        <Button.Icon
          type="anchor"
          className="text-orange-dark"
          icon={<Icon.Car />}
          href={`/client/dispatch?favorite=${id}`}
        >
          {content.order}
        </Button.Icon>

        <hr className="border-r border-gray h-3 transform rotate-0" />

        <Button.Icon
          type="anchor"
          className="text-blue-light"
          icon={<Icon.Edit />}
          href={`/client/fast-call/edit/${id}`}
        >
          {content.edit}
        </Button.Icon>

        <hr className="border-r border-gray h-3 transform rotate-0" />

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
