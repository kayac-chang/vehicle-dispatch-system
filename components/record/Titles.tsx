import { Icon } from "components/atoms";

export function PickupTitle() {
  return (
    <div className="flex items-center text-orange-dark mr-2 space-x-1">
      <span className="w-4" style={{ margin: "0 0.125rem" }}>
        <Icon.Ring />
      </span>
      <h3 className="font-bold">起點</h3>
    </div>
  );
}

export function DropTitle() {
  return (
    <div className="flex items-center text-orange-dark mr-2 space-x-1">
      <span className="w-5">
        <Icon.Map />
      </span>
      <h3 className="font-bold">迄點</h3>
    </div>
  );
}
