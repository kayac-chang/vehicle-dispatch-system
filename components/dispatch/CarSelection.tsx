import clsx from "clsx";
import { Button, Form } from "components/atoms";

type CarItemProps = {
  label: string;
  order?: number;
};
function CarItem({ label, order }: CarItemProps) {
  return (
    <Button.Base
      type="button"
      className={clsx(
        order ? "bg-black bg-opacity-75 text-white" : "border border-black",
        "text-sm text-left",
        "py-2 px-8 w-full",
        "rounded relative",
        "flex"
      )}
    >
      <span>{label}</span>

      {order && (
        <span
          className={clsx(
            "absolute left-0 top-1/2",
            "transform -translate-y-1/2 -translate-x-1",
            "w-6 h-6",
            "flex justify-center items-center",
            "bg-yellow-dark text-black text-sm"
          )}
        >
          {order}
        </span>
      )}
    </Button.Base>
  );
}

const content = {
  title: "車行選擇",
  describe: {
    main: "優先搭乘車行排序",
    sub: "(請依序點擊完成排序)",
  },
  reorder: "重新排序",
};

export function CarSelection() {
  return (
    <Form.FieldSet
      label={content.title}
      labelClass="w-full border-b-2 border-black border-opacity-50"
    >
      <div className="flex justify-between items-center lg:justify-start space-x-4 py-2">
        <p className="text-sm space-x-1">
          <span>{content.describe.main}</span>
          <span className="text-red-light">{content.describe.sub}</span>
        </p>

        <Button.Base
          type="button"
          className="bg-gold-darker text-white text-sm px-2 py-1 rounded"
        >
          {content.reorder}
        </Button.Base>
      </div>

      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
        <CarItem
          label="新北市私立匯安老人長期照顧中心(養護型)照顧中心(養護型)"
          order={2}
        />

        <CarItem label="交通單位" />

        <CarItem
          label="新北市私立匯安老人長期照顧中心(養護型)照顧中心(養護型)"
          order={1}
        />
      </div>
    </Form.FieldSet>
  );
}
