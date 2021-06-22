import { Button, RouteMap as Map } from "components/atoms";
import { UseFormWatch } from "react-hook-form";
import { Request } from ".";

const content = {
  add: "新增下個地點",
  submit: "立即預約",
};

type Props = {
  watch: UseFormWatch<Request>;
  onAdd: () => void;
  onSubmit: () => void;
};
export function RouteMap({ watch, onAdd, onSubmit }: Props) {
  return (
    <div className="-mx-4">
      <div className="bg-black bg-opacity-75 flex justify-end text-xs lg:text-sm py-3 space-x-4 px-4">
        <div className="w-1/3 lg:w-auto">
          {watch("is-round-trip") || (
            <Button.Outline
              type="submit"
              className="bg-white h-full p-2"
              onClick={onAdd}
            >
              {content.add}
            </Button.Outline>
          )}
        </div>

        <div className="w-1/3 lg:w-auto">
          <Button.Flat type="submit" className="h-full p-2" onClick={onSubmit}>
            {content.submit}
          </Button.Flat>
        </div>
      </div>

      <div className="h-48 w-full">
        <Map />
      </div>
    </div>
  );
}
