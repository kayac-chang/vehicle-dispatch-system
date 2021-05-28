import React from "react";
import { DatePicker, DatePickerProps } from "./DatePicker";
import { Password, PasswordProps } from "./Password";
import { TextInput, TextInputProps } from "./TextInput";
import { Alert } from "./Alert";

function Input<T>(
  props: DatePickerProps<T> | PasswordProps<T> | TextInputProps<T>
) {
  if (props.type === "date") return <DatePicker {...props} />;
  // if (props.type === "time") return <Time {...props} />;
  // if (props.type === "date-range") return <DateRange {...props} />;

  // if (props.type === "select") return <Select {...props} />;

  // if (props.type === "radio") return <Radio {...props} />;

  if (props.type === "password") return <Password {...props} />;

  return <TextInput {...props} />;
}

const Form = {
  Input,
  Alert,
};

export default Form;
