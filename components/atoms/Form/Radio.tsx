import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio as _Radio,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { CommonProps } from "./types";

export type RadioProps<T> = CommonProps<T> & {
  type: "radio";
  options: { id: string; label: string; value: string }[];
};
export function Radio<T>({
  name,
  label,
  options,
  control,
  required,
}: RadioProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend" required={required}>
            {label}
          </FormLabel>

          <RadioGroup aria-label={label} row {...field}>
            {options.map(({ id, label, value }) => (
              <FormControlLabel
                key={id}
                value={value}
                control={<_Radio color="primary" />}
                label={label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
