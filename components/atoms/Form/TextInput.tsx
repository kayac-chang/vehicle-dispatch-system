import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { CommonProps } from "./types";
import clsx from "clsx";

export type TextInputProps<T> = CommonProps<T> & {
  type: "text";
};
export function TextInput<T>({
  className,
  type,
  name,
  label,
  icon,
  control,
  required,
  disabled,
  ...props
}: TextInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, name, ref }, fieldState: { error } }) => (
        <TextField
          id={name}
          label={label}
          className={clsx("w-full", className)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: icon && <span className="w-4 mr-2">{icon}</span>,
            ...props,
          }}
          error={Boolean(error)}
          inputRef={ref}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      )}
    />
  );
}
