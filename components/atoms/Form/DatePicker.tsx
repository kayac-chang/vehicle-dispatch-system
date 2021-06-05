import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { CommonProps } from "./types";
import { DateRangePicker as _DateRangePicker } from "@material-ui/lab";
import clsx from "clsx";

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
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, name, ref }, fieldState: { error } }) => (
        <TextField
          type="date"
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

export type TimeProps<T> = CommonProps<T> & {
  type: "time";
};
export function Time<T>({ name, label, className }: TimeProps<T>) {
  return (
    <div className={className}>
      <TextField
        type="time"
        name={name}
        label={<span className="text-base">{label}</span>}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: "text-black",
          },
        }}
        inputProps={{
          step: 300,
        }}
        className="w-full"
      />
    </div>
  );
}
