import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { CommonProps } from "./types";
import {
  LocalizationProvider,
  DateRangePicker as _DateRangePicker,
  DateRange,
} from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { useState } from "react";
import Icon from "../Icon";

export type DateRangeProps<T> = {
  type: "date-range";
};
export function DateRangePicker<T>(_: DateRangeProps<T>) {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <_DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <TextField {...endProps} />
          </>
        )}
      /> */}
      <_DateRangePicker
        startText="開始日期"
        endText="結束日期"
        inputFormat="yyyy/MM/dd"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <div className="relative w-full lg:w-auto flex justify-between items-center border border-gray-900 rounded-sm bg-white">
            <span className="w-3 h-3 absolute right-0 mr-3">
              <Icon.Calendar />
            </span>
            <input
              className="w-32 p-2 pl-4 bg-transparent"
              placeholder="開始日期"
              ref={startProps.inputRef as React.Ref<HTMLInputElement>}
              {...startProps.inputProps}
            />
            <span className="w-6 mr-4">
              <Icon.SwapRight />
            </span>
            <input
              className="w-32 p-2 bg-transparent"
              ref={endProps.inputRef as React.Ref<HTMLInputElement>}
              {...endProps.inputProps}
            />
          </div>
        )}
      />
    </LocalizationProvider>
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
  className = "",
}: DatePickerProps<T>) {
  return (
    <div className={className}>
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
            className="w-full"
          />
        )}
      />
    </div>
  );
}

export type TimeProps<T> = CommonProps<T> & {
  type: "time";
};
export function Time<T>({ name, label, className = "" }: TimeProps<T>) {
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
