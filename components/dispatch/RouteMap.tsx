import { Button, RouteMap as Map } from "components/atoms";

export function RouteMap() {
  return (
    <div className="-mx-4">
      <div className="bg-black bg-opacity-75 flex justify-end text-xs lg:text-sm py-3 space-x-4 px-4">
        <div className="w-1/3 lg:w-auto">
          <Button.Outline type="button" className="bg-white h-full p-2">
            新增下個地點
          </Button.Outline>
        </div>
        <div className="w-1/3 lg:w-auto">
          <Button.Flat type="button" className="h-full p-2">
            立即預約
          </Button.Flat>
        </div>
      </div>

      <div className="h-48 w-full">
        <Map />
      </div>
    </div>
  );
}
