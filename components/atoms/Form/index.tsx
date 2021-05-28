import React from "react";
import { DatePicker, DatePickerProps } from "./DatePicker";
import { Password, PasswordProps } from "./Password";
import { TextInput, TextInputProps } from "./TextInput";
import { Alert } from "./Alert";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio as _Radio,
} from "@material-ui/core";
import { CommonProps } from "./types";

type RadioProps<T> = CommonProps<T> & {
  type: "radio";
  options: { id: string; label: string; value: string }[];
};
function Radio<T>({ name, label, options }: RadioProps<T>) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>

      <RadioGroup aria-label={label} name={name} row>
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
  );
}

function Input<T>(
  props:
    | DatePickerProps<T>
    | RadioProps<T>
    | PasswordProps<T>
    | TextInputProps<T>
) {
  if (props.type === "date") return <DatePicker {...props} />;
  // if (props.type === "time") return <Time {...props} />;
  // if (props.type === "date-range") return <DateRange {...props} />;

  // if (props.type === "select") return <Select {...props} />;

  if (props.type === "radio") return <Radio {...props} />;

  if (props.type === "password") return <Password {...props} />;

  return <TextInput {...props} />;
}

const Form = {
  Input,
  Alert,
};

export default Form;
