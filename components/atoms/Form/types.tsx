import { ReactNode } from "react";
import { Path, Control } from "react-hook-form";

export type CommonProps<T> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  icon?: ReactNode;
  required?: boolean;
  "aria-describedby"?: string;
};
