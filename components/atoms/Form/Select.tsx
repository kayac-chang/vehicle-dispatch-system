import React from "react";
import { FormControl, InputLabel, Select as _Select } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { CommonProps } from "./types";
import clsx from "clsx";

export type SelectProps<T> = CommonProps<T> & {
  type: "select";
  options: { id: string; value: string; label: string }[];
};
export function Select<T>({
  name,
  control,
  required,
  label,
  options,
  className = "",
}: SelectProps<T>) {
  return (
    <div className={clsx("w-full", className)}>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        defaultValue={options[0].value}
        render={({ field, fieldState: { error } }) => (
          <FormControl variant="outlined" fullWidth required={required}>
            <InputLabel htmlFor={name} shrink>
              {label}
            </InputLabel>

            <_Select
              native
              label={label}
              required={required}
              inputProps={{
                name,
                id: name,
              }}
              {...field}
            >
              {options.map(({ id, value, label }) => (
                <option key={id} value={value}>
                  {label}
                </option>
              ))}
            </_Select>
          </FormControl>
        )}
      />
    </div>
  );
}
