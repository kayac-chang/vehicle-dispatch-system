import clsx from "clsx";
import { Icon } from "components/atoms";
import Layout from "components/templates";
import {
  ReactNode,
  useCallback,
  useState,
  FocusEvent,
  ChangeEvent,
} from "react";
import { Path, useForm, UseFormRegister, FieldError } from "react-hook-form";
import Link from "next/link";

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
    (event: ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(event.target.value));
    },
    [onChange]
  );

  const focus = useCallback(() => {
    setFocus(true);
  }, [setFocus]);

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

interface LoginRequest {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginRequest>();

  function onSubmit(data: LoginRequest) {
    // @TODO submit logic
    console.log(data);
  }

  return (
    <Layout.Form title="登入">
      <form
        className="text-sm md:text-base space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-gold-darker space-y-2 md:space-y-4">
          <h2 className="text-2xl md:text-4xl md:font-semibold">登入</h2>

          <p>為了保障您的帳號安全，建議您最少於三個月變更一次密碼。</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            {(errors.password || errors.username) && (
              <p
                role="alert"
                aria-atomic
                id="login-alert"
                className="text-red-light"
              >
                帳號或密碼錯誤
              </p>
            )}

            <Input
              type="text"
              icon={<Icon.User />}
              label="請輸入您的帳號"
              name="username"
              register={register}
              value={getValues("username")}
              error={errors.username}
              describedby="login-alert"
              required
            />

            <Input
              type="password"
              icon={<Icon.Lock />}
              label="請輸入您的密碼"
              name="password"
              register={register}
              value={getValues("password")}
              error={errors.password}
              describedby="login-alert"
              required
            />
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              className="bg-gold-darker text-white w-full py-2 rounded-sm"
            >
              登入
            </button>

            <div className="flex text-gold-darker justify-end space-x-4">
              <Link href="/client/registration">
                <a title="前往註冊">註冊</a>
              </Link>

              <Link href="/client/forgot-password">
                <a title="前往忘記密碼">忘記密碼？</a>
              </Link>
            </div>
          </div>
        </div>

        <ul className="space-y-2">
          <li className="flex">
            <span className="bg-green-dark w-2 h-2 inline-block m-2" />
            <span className="flex-1">
              此註冊頁僅提供預約共享車隊叫車服務，如需預約長照相關業務，請撥打
              1966 服務專線，將會有專員提供服務。
            </span>
          </li>

          <li className="flex">
            <span className="bg-green-dark w-2 h-2 inline-block m-2" />
            <span className="flex-1">
              若已有長照資格，需預約共享車隊服務，請在登入後選擇用戶專區進行服務開通。
            </span>
          </li>
        </ul>
      </form>
    </Layout.Form>
  );
}
