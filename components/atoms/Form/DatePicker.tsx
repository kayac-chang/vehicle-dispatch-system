import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { CommonProps } from "./types";

export type DateRangeProps<T> = {
  type: "date-range";
  from: CommonProps<T>;
  to: CommonProps<T>;
};
export function DateRange<T>({ from, to }: DateRangeProps<T>) {
  return <></>;
}

export type DatePickerProps<T> = CommonProps<T> & {
  type: "date";
};
export function DatePicker<T>({
  name,
  label,
  required,
  control,
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
        />
      )}
    />
  );
}

export type TimeProps<T> = CommonProps<T> & {
  type: "time";
};
export function Time<T>({ name, label }: TimeProps<T>) {
  return (
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
    />
  );
}
