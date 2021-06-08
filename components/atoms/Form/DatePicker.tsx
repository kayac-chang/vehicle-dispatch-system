import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { CommonProps } from "./types";
import { DatePicker as _DatePicker } from "@material-ui/lab";
import clsx from "clsx";

type DateType = "year" | "month" | "date";
type Props<T> = CommonProps<T> & { type: DateType };
function Base<T>({
  type,
  name,
  label,
  required,
  control,
  className,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({
        field: { value, onChange, name, ref },
        fieldState: { error },
      }) => (
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

export type DatePickerProps<T> = CommonProps<T> & {
  type: "date";
};
export function DatePicker<T>({
  name,
  label,
  required,
  control,
  className,
}: DatePickerProps<T>) {
  return (
    <Base
      type="date"
      name={name}
      label={label}
      required={required}
      control={control}
      className={className}
    />
  );
}

export type MonthPickerProps<T> = CommonProps<T> & {
  type: "month";
};
export function MonthPicker<T>({
  name,
  label,
  required,
  control,
  className,
}: MonthPickerProps<T>) {
  return (
    <Base
      type="month"
      name={name}
      label={label}
      required={required}
      control={control}
      className={className}
    />
  );
}

export type TimeProps<T> = CommonProps<T> & {
  type: "time";
};
export function Time<T>({ name, label, className }: TimeProps<T>) {
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
          step: 300,
        }}
        className="w-full"
      />
    </div>
  );
}
