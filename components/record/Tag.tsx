import clsx from "clsx";
import { Icon } from "components/atoms";

type TagProps = {
  status: number;
  label: string;
};
export function Tag({ status, label }: TagProps) {
  return (
    <span
      className={clsx(
        "border rounded-sm px-2 text-xs leading-5 whitespace-no-wrap",
        status === 1 &&
          "border-orange-darker bg-orange-light text-orange-darker",
        status === 2 && " border-green-300 bg-green-100  text-green-500",
        status === 3 && " border-blue-bright bg-blue-100  text-blue-bright",
        status === 4 && " border-red-300 bg-red-100  text-red-500",
        status === 5 && " border-green-300 bg-green-100  text-green-500",
        // status === 6 &&
        //   "border-orange-darker bg-orange-light text-orange-darker",
        // status === 7 &&
        //   "border-orange-darker bg-orange-light text-orange-darker",
        // status === 8 &&
        //   "border-orange-darker bg-orange-light text-orange-darker",
        status === 9 &&
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
