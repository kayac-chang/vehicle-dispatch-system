import { Icon, Form, Button, Link } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import { List } from "components/molecules";
import { useCallback } from "react";

const content = {
  title: "登入",
  description: "為了保障您的帳號安全，建議您最少於三個月變更一次密碼。",

  form: {
    alert: "帳號或密碼錯誤",
    username: "請輸入您的帳號",
    password: "請輸入您的密碼",
    submit: "登入",
  },

  links: [
    {
      href: "/client/registration",
      title: "前往註冊",
      label: "註冊",
      accessKey: "r",
    },
    {
      href: "/client/forgot-password",
      title: "前往忘記密碼",
      label: "忘記密碼？",
      accessKey: "f",
    },
  ],

  list: [
    `此註冊頁僅提供預約共享車隊叫車服務，如需預約長照相關業務，請撥打 1966 服務專線，將會有專員提供服務。`,
    `若已有長照資格，需預約共享車隊服務，請在登入後選擇用戶專區進行服務開通。`,
  ],
};

interface Request {
  username: string;
  password: string;
}

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Request>();

  const onSubmit = useCallback((data: Request) => {
    // @TODO submit logic
    console.log(data);
  }, []);

  return (
    <Layout.Form
      title={content.title}
      description={content.description}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-4">
          <Form.Alert
            id="alert"
            show={Boolean(errors.password || errors.username)}
          >
            {content.form.alert}
          </Form.Alert>

          <Form.Input
            className="bg-white"
            type="text"
            icon={<Icon.User />}
            label={content.form.username}
            name="username"
            control={control}
            aria-describedby="alert"
            required
          />

          <Form.Input
            className="bg-white"
            type="password"
            icon={<Icon.Lock />}
            label={content.form.password}
            name="password"
            control={control}
            aria-describedby="alert"
            required
          />
        </div>

        <div className="space-y-2">
          <Button.Flat type="submit" className="py-2">
            {content.form.submit}
          </Button.Flat>

          <div className="flex text-gold-darker justify-end space-x-4">
            {content.links.map(({ href, title, accessKey, label }) => (
              <Link key={href} href={href} title={title} accessKey={accessKey}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <List.Square items={content.list} />
      </div>
    </Layout.Form>
  );
}
