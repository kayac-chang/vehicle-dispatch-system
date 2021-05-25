import { Icon, Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface LoginRequest {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  function onSubmit(data: LoginRequest) {
    // @TODO submit logic
    console.log(data);
  }

  return (
    <Layout.Form title="登入" onSubmit={handleSubmit(onSubmit)}>
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

          <Form.Input
            type="text"
            icon={<Icon.User />}
            label="請輸入您的帳號"
            name="username"
            register={register}
            error={errors.username}
            describedby="login-alert"
            required
          />

          <Form.Input
            type="password"
            icon={<Icon.Lock />}
            label="請輸入您的密碼"
            name="password"
            register={register}
            error={errors.password}
            describedby="login-alert"
            required
          />
        </div>

        <div className="space-y-2">
          <Button.Flat type="submit">登入</Button.Flat>

          <div className="flex text-gold-darker justify-end space-x-4">
            <Link href="/client/registration">
              <a title="前往註冊" access-key="r">
                註冊
              </a>
            </Link>

            <Link href="/client/forgot-password">
              <a title="前往忘記密碼" access-key="f">
                忘記密碼？
              </a>
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
    </Layout.Form>
  );
}
