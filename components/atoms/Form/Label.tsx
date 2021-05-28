import clsx from "clsx";
import { ReactNode } from "react";

type LabelProps = {
  label?: string;
  name: string;
  active?: boolean;
  icon?: ReactNode;
  required?: string | boolean;
};

export function Label({ label, name, active, icon, required }: LabelProps) {
  if (icon && label) {
    return (
      <>
        <label
          htmlFor={name}
          className={clsx(
            "absolute pointer-events-none ml-8",
            "transition-transform transform origin-top-left",
            active && "scale-75 -translate-y-1/2"
          )}
        >
          {label}
        </label>

        <span className="absolute w-4 ml-3 pointer-events-none" aria-hidden>
          {icon}
        </span>
      </>
    );
  }

  if (icon) {
    return (
      <span
        className={clsx("absolute w-4 ml-3 pointer-events-none")}
        aria-hidden
      >
        {icon}
      </span>
    );
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>

      {required && (
        <span className="text-red-light" aria-label="必填欄位">
          *
        </span>
      )}
    </div>
  );
}
