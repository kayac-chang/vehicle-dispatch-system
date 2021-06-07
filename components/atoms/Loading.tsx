import clsx from "clsx";
import Icon from "./Icon";

const content = {
  label: "加載中",
};

export function Loading() {
  return (
    <div
      role="alert"
      aria-busy="true"
      className={clsx(
        "w-32 h-32",
        "fixed top-1/2 left-1/2",
        "transform -translate-x-1/2 -translate-y-1/2",
        "bg-black bg-opacity-75 text-white rounded-xl",
        "flex flex-col justify-center items-center space-y-2",
        "text-xl"
      )}
    >
      <span className="w-1/3" aria-hidden>
        <Icon.Loader />
      </span>

      <span>{content.label}</span>
    </div>
  );
}
