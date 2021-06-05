import clsx from "clsx";
import { statusDecoder } from "functions/recordFunctions";
import { Icon } from "components/atoms";

type TagProps = {
  status: number;
};
export function Tag({ status }: TagProps) {
  return (
    <span
      className={clsx(
        "border rounded-sm px-2 text-xs leading-5 whitespace-no-wrap",
        status === 1 && "border-orange-dark bg-orange-light text-orange-dark",
        status === 2 && " border-green-300 bg-green-100  text-green-500",
        status === 3 && " border-blue-300 bg-blue-100  text-blue-500",
        status === 4 && " border-red-300 bg-red-100  text-red-500",
        status === 5 && " border-green-300 bg-green-100  text-green-500",
        status === 6 && "border-orange-dark bg-orange-light text-orange-dark",
        status === 7 && "border-orange-dark bg-orange-light text-orange-dark",
        status === 8 && "border-orange-dark bg-orange-light text-orange-dark",
        status === 9 && "border-orange-dark bg-orange-light text-orange-dark"
      )}
    >
      {statusDecoder(status)}
    </span>
  );
}

type CarpoolProps = {
  className?: string;
};
export function Carpool({ className }: CarpoolProps) {
  return (
    <p
      className={clsx(
        "flex items-center text-orange-dark font-semibold text-sm whitespace-no-wrap",
        className
      )}
    >
      <span className="w-4 mt-px">
        <Icon.Carpool />
      </span>
      <span>已共乘</span>
    </p>
  );
}
