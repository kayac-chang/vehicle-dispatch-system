import clsx from "clsx";
import { Icon } from "components/atoms";
import Layout from "components/templates";
import { ReactNode, useState } from "react";

type InputProps = {
  type: "text" | "password";
  icon?: ReactNode;
  label: string;
  name: string;
};
function Input({ type, icon, label, name }: InputProps) {
  const [isFocus, setFocus] = useState(false);

  return (
    <div className="flex items-center relative group">
      {icon && (
        <span className="absolute w-4 mx-2 pointer-events-none" aria-hidden>
          {icon}
        </span>
      )}

      <label
        htmlFor={name}
        className={clsx(
          "text-gray-lighter absolute ml-7 pointer-events-none",
          isFocus && "opacity-0"
        )}
      >
        {label}
      </label>

      <input
        className="w-full py-2 pl-7 pr-2 border"
        type={type}
        name={name}
        id={name}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}

export default function Login() {
  return (
    <Layout.Form title="登入">
      <form className="text-sm space-y-4">
        <div className="text-gold-darker space-y-2">
          <h2 className="text-2xl">登入</h2>

          <p>為了保障您的帳號安全，建議您最少於三個月變更一次密碼。</p>
        </div>

        <div className="space-y-4">
          <p className="text-red-light">帳號或密碼錯誤</p>

          <Input
            type="text"
            icon={<Icon.User />}
            label="請輸入您的帳號"
            name="username"
          />

          <Input
            type="password"
            icon={<Icon.Lock />}
            label="請輸入您的密碼"
            name="password"
          />

          <button className="bg-gold-darker text-white w-full py-2 rounded-sm">
            登入
          </button>

          <div className="flex text-gold-darker justify-end space-x-4">
            <a href="">註冊</a>
            <a href="">忘記密碼？</a>
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
