import React from "react";
import {
  DatePicker,
  DatePickerProps,
  DateRangePicker,
  DateRangeProps,
} from "./DatePicker";
import { Password, PasswordProps } from "./Password";
import { TextInput, TextInputProps } from "./TextInput";
import { Radio, RadioProps } from "./Radio";
import { Select, SelectProps } from "./Select";
import { Alert } from "./Alert";
import { FieldSet } from "./FieldSet";

function Input<T>(
  props:
    | DatePickerProps<T>
    | DateRangeProps<T>
    | RadioProps<T>
    | SelectProps<T>
    | PasswordProps<T>
    | TextInputProps<T>
) {
  if (props.type === "date") return <DatePicker {...props} />;
  // if (props.type === "time") return <Time {...props} />;
  if (props.type === "date-range") return <DateRangePicker {...props} />;

  if (props.type === "select") return <Select {...props} />;

  if (props.type === "radio") return <Radio {...props} />;

  if (props.type === "password") return <Password {...props} />;

  return <TextInput {...props} />;
}

const Form = {
  Input,
  Alert,
  FieldSet,
};

export default Form;
