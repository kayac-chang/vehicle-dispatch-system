import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { CommonProps } from "./types";
import { DatePicker as _DatePicker } from "@material-ui/lab";
import clsx from "clsx";
import { format } from "date-fns";

type DateType = "year" | "month" | "date";
type Props<T> = CommonProps<T> & {
  type: DateType;
  min?: Date;
};
function Base<T>({
  type,
  name,
  label,
  required,
  control,
  className,
  min,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, name, ref }, fieldState: { error } }) => (
        <TextField
          type={type}
          id={name}
          name={name}
          variant="outlined"
          label={label}
          InputLabelProps={{
            shrink: true,
          }}
          error={Boolean(error)}
          inputRef={ref}
          onChange={onChange}
          required={required}
          className={clsx("w-full", className)}
          inputProps={{ min: min && format(min, "yyyy-MM-dd") }}
        />
      )}
    />
  );
}

export type DateRangeProps<T> = {
  type: "date-range";
  from: DatePickerProps<T>;
  end: DatePickerProps<T>;
};
export function DateRangePicker<T>({ from, end }: DateRangeProps<T>) {
  return (
    <div className="flex space-x-2">
      <DatePicker {...from} />
      <DatePicker {...end} />
    </div>
  );
}

export type DatePickerProps<T> = Props<T> & {
  type: "date";
};
export function DatePicker<T>({ type, ...props }: DatePickerProps<T>) {
  return <Base type="date" {...props} />;
}

export type MonthPickerProps<T> = Props<T> & {
  type: "month";
};
export function MonthPicker<T>({ type, ...props }: MonthPickerProps<T>) {
  return <Base type="month" {...props} />;
}

export type TimeProps<T> = CommonProps<T> & {
  type: "time";
  min?: Date;
  max?: Date;
};
export function Time<T>({ name, label, className, min, max }: TimeProps<T>) {
  return (
    <div className={className}>
      <TextField
        type="time"
        id={name}
        name={name}
        label={label}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 15 * 60,
          min: min && format(min, "HH:mm"),
          max: max && format(max, "HH:mm"),
        }}
        className="w-full"
      />
    </div>
  );
}
