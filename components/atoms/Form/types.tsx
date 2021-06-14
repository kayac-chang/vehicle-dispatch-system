import { ReactNode } from "react";
import { Path, Control } from "react-hook-form";

export type CommonProps<T> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  icon?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  "aria-describedby"?: string;
  className?: string;
  minLength?: number;
  pattern?: RegExp;
};
