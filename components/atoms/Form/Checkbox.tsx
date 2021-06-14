import * as React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { CommonProps } from "./types";
import { Controller } from "react-hook-form";

export type CheckProps<T> = CommonProps<T> & {
  type: "check";
  checked?: boolean;
};
export function Check<T>({
  name,
  label,
  checked,
  disabled,
  control,
  required,
}: CheckProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, name, ref }, fieldState: { error } }) => (
        <FormControlLabel
          control={<Checkbox checked={checked} />}
          label={label}
          name={name}
          onChange={onChange}
          inputRef={ref}
          disabled={disabled}
        />
      )}
    />
  );
}
