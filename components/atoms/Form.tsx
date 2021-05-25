import clsx from "clsx";
import { Icon } from "components/atoms";
import {
  ReactNode,
  useCallback,
  useState,
  FocusEvent,
  ChangeEvent,
} from "react";
import { Path, UseFormRegister, FieldError } from "react-hook-form";

type InputProps<T> = {
  type: "text" | "password";
  icon?: ReactNode;
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  value?: string;
  error?: FieldError;
  required?: string | boolean;
  describedby?: string;
};
function Input<T>({
  type,
  icon,
  label,
  name,
  register,
  error,
  required,
  describedby,
}: InputProps<T>) {
  const [isFocus, setFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { onBlur, onChange, ...props } = register(name, { required });

  const change = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setHasValue(Boolean(event.target.value)),
    [onChange]
  );

  const focus = useCallback(() => setFocus(true), [setFocus]);

  const blur = useCallback(
    (event: FocusEvent) => {
      onBlur(event);
      setFocus(false);
    },
    [onBlur, setFocus]
  );

  return (
    <div className="flex items-center relative group">
      {icon && (
        <span className="absolute w-4 ml-3 pointer-events-none" aria-hidden>
          {icon}
        </span>
      )}

      <label
        htmlFor={name}
        className={clsx(
          "text-gray-lighter absolute ml-8 pointer-events-none",
          "transition-transform transform origin-top-left",
          (hasValue || isFocus) && "scale-75 -translate-y-1/2"
        )}
      >
        {label}
      </label>

      <input
        className={clsx(
          "w-full h-12 pt-2 pl-8 pr-2 border rounded-sm",
          error &&
            "ring ring-offset-2 ring-offset-red-light ring-red-light ring-opacity-10"
        )}
        type={type === "password" && showPassword ? "text" : type}
        onChange={change}
        onFocus={focus}
        onBlur={blur}
        aria-required={required ? "true" : "false"}
        aria-invalid={Boolean(error)}
        aria-describedby={describedby}
        {...props}
      />

      {type === "password" && (
        <button
          type="button"
          className="absolute right-0 mr-2 w-8 p-2"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
          aria-live="assertive"
          aria-atomic
        >
          <Icon.Eye />
        </button>
      )}
    </div>
  );
}

const Form = {
  Input,
};

export default Form;
