import clsx from "clsx";
import { Button, Form } from "components/atoms";
import { Organization } from "types";
import { Checkbox } from "@material-ui/core";
import {
  Control,
  UseFormWatch,
  Controller,
  UseFormSetValue,
} from "react-hook-form";
import { Request } from ".";

type CarItemProps = {
  label: string;
  value: string;
  control: Control<Request>;
  seleted: string[];
};
function CarItem({ label, value, control, seleted }: CarItemProps) {
  const order = seleted.indexOf(value);

  const content = (
    <span
      className={clsx(
        "text-sm text-left py-2 px-8 w-full",
        order !== -1 ? "text-white" : "text-black"
      )}
    >
      {label}
    </span>
  );

  return (
    <Controller
      name="organizations"
      control={control}
      render={({ field: { onChange, name, ref } }) => (
        <div
          className={clsx(
            "rounded-sm border",
            order !== -1 ? "bg-gray-darker relative" : "border-black-light"
          )}
        >
          <Checkbox
            disableRipple
            icon={content}
            checkedIcon={content}
            inputProps={{ "aria-label": label }}
            name={name}
            onChange={(e) =>
              onChange(
                e.target.checked
                  ? [...seleted, e.target.value]
                  : seleted.filter((org) => org !== e.target.value)
              )
            }
            inputRef={ref}
            value={value}
            className="w-full"
          />

          {order !== -1 && (
            <span
              className={clsx(
                "absolute left-0 top-1/2",
                "transform -translate-y-1/2 -translate-x-1",
                "w-6 h-6",
                "flex justify-center items-center",
                "bg-yellow-dark text-gray-dark text-sm"
              )}
            >
              {order + 1}
            </span>
          )}
        </div>
      )}
    />
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

type Props = {
  organizations: Organization[];
  control: Control<Request>;
  watch: UseFormWatch<Request>;
  setValue: UseFormSetValue<Request>;
};
export function CarSelection({
  organizations,
  control,
  watch,
  setValue,
}: Props) {
  const selected = watch("organizations");

  return (
    <Form.FieldSet
      label={content.title}
      labelClass="w-full border-b-2 border-black border-opacity-50"
    >
      <div className="flex justify-between items-center lg:justify-start space-x-4 py-2">
        <p className="text-sm space-x-1">
          <span>{content.describe.main}</span>
          <span className="text-red-dark">{content.describe.sub}</span>
        </p>

        {organizations.length > 1 && (
          <Button.Base
            type="button"
            className="bg-gold-darker text-white text-sm px-2 py-1 rounded"
            onClick={() => setValue("organizations", [])}
          >
            {content.reorder}
          </Button.Base>
        )}
      </div>

      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
        {organizations.map(({ id, name }) => (
          <CarItem
            key={id}
            value={id}
            label={name}
            control={control}
            seleted={selected}
          />
        ))}
      </div>
    </Form.FieldSet>
  );
}
