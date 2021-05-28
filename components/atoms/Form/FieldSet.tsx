import { ReactNode } from "react";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";
import clsx from "clsx";

type FieldSetProps = {
  children: ReactNode;
  label: string;
  required?: boolean;
  className?: string;
};
export function FieldSet({
  children,
  label,
  required,
  className,
}: FieldSetProps) {
  return (
    <FormControl component="fieldset" className={clsx("space-y-4", className)}>
      <FormLabel component="legend" required={required}>
        {label}
      </FormLabel>

      <FormGroup className="space-y-4">{children}</FormGroup>
    </FormControl>
  );
}
