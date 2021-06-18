import clsx from "clsx";
import { Icon } from "components/atoms";
import { OrderStatus } from "types";

type TagProps = {
  status: number;
  label: string;
};
export function Tag({ status, label }: TagProps) {
  return (
    <span
      className={clsx(
        "border rounded-sm px-2 text-xs leading-5 whitespace-no-wrap",
        status === OrderStatus.NewOrder &&
          "border-orange-darker bg-orange-light text-orange-darker",
        status === OrderStatus.Booked &&
          "border-green-darker bg-green-100 text-green-darker",
        status === OrderStatus.Arrived &&
          "border-blue-light bg-blue-100  text-blue-light",
        status === OrderStatus.Driving &&
          "border-red-dark bg-red-100  text-red-dark",
        status === OrderStatus.Done &&
          " border-green-darker bg-green-100  text-green-darker",
        status === OrderStatus.Canceled &&
          "border-orange-darker bg-orange-light text-orange-darker"
      )}
    >
      {label}
    </span>
  );
}

type CanSharedProps = {
  className?: string;
  label: string;
};
export function CanShared({ className, label }: CanSharedProps) {
  return (
    <div
      className={clsx(
        "flex items-center text-orange-darker font-semibold text-sm whitespace-no-wrap",
        className
      )}
    >
      <span className="w-4 mt-px" aria-hidden>
        <Icon.CanShared />
      </span>

      <span>{label}</span>
    </div>
  );
}
