import * as React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { CommonProps } from "./types";

export type CheckProps<T> = CommonProps<T> & {
  type: "check";
  checked?: boolean;
};
export function Check<T>({ name, label, checked }: CheckProps<T>) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} />}
      label={label}
      name={name}
    />
  );
}
