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

type TextInputProps<T> = {
  type: "text" | "password";
  name: Path<T>;
  register: UseFormRegister<T>;
  icon?: ReactNode;
  label?: string;
  error?: FieldError;
  required?: string | boolean;
  describedby?: string;
  children?: ReactNode;
};
function TextInput<T>({
  type,
  name,
  register,
  icon,
  label,
  error,
  required,
  describedby,
  children,
}: TextInputProps<T>) {
  const [isFocus, setFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);
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
    <div className="flex flex-col justify-center relative">
      <Label
        active={hasValue || isFocus}
        name={name}
        icon={icon}
        label={label}
        required={required}
      />

      <input
        id={name}
        className={clsx(
          "w-full border rounded-sm",
          icon ? "h-12 pt-2 pl-8 pr-4" : "py-2 px-4",
          error &&
            "ring ring-offset-2 ring-offset-red-light ring-red-light ring-opacity-10"
        )}
        type={type}
        onChange={change}
        onFocus={focus}
        onBlur={blur}
        aria-required={required ? "true" : "false"}
        aria-invalid={Boolean(error)}
        aria-describedby={describedby}
        {...props}
      />

      {children}
    </div>
  );
}

type LabelProps = {
  label?: string;
  name: string;
  active: boolean;
  icon?: ReactNode;
  required?: string | boolean;
};

function Label({ label, name, active, icon, required }: LabelProps) {
  if (icon) {
    return (
      <>
        <label
          htmlFor={name}
          className={clsx(
            "text-gray-lighter absolute pointer-events-none ml-8",
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

  return (
    <div className="mb-2">
      <label htmlFor={name}>{label}</label>

      {required && (
        <span className="text-red-light" aria-label="必填欄位">
          *
        </span>
      )}
    </div>
  );
}

function Password<T>({ type, ...props }: TextInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput type={showPassword ? "text" : "password"} {...props}>
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
    </TextInput>
  );
}

type RadioProps<T> = {
  type: "radio";
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  required?: string | boolean;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
};
function Radio<T>({ register, name, required, label, options }: RadioProps<T>) {
  return (
    <fieldset>
      <div className="flex mb-2">
        <legend>{label}</legend>

        {required && (
          <span className="text-red-light" aria-label="必填欄位">
            *
          </span>
        )}
      </div>

      <div className="flex space-x-4">
        {options.map(({ id, value, label }) => (
          <div key={id} className="space-x-2">
            <input
              type="radio"
              id={id}
              value={value}
              {...register(name)}
              checked
            />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function Input<T>(props: TextInputProps<T> | RadioProps<T>) {
  if (props.type === "radio") return <Radio {...props} />;

  if (props.type === "password" && props.icon) return <Password {...props} />;

  return <TextInput {...props} />;
}

const Form = {
  Input,
};

export default Form;
