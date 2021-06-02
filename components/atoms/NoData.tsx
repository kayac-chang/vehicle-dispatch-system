import { Icon } from "components/atoms";
export function NoData() {
  return (
    <div className="flex justify-center items-center min-h-screen-1/4">
      <div className="w-1/3 relative flex justify-center">
        <span className="w-40" aria-hidden>
          <Icon.NoData />
        </span>
        <span className="absolute bottom-0 mb-2 text-xs">暫無數據</span>
      </div>
    </div>
  );
}
