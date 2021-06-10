import { Icon, Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import Rule from "functions/regexp";

const content = {
  title: "設定密碼",
  description: "8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。",

  form: {
    alert: "輸入格式錯誤",
    password: "請輸入新的密碼",
    repeat: "再一次輸入新密碼確認",
    submit: "完成",
  },
};

interface Request {
  password: string;
  repeat: string;
}

export default function SetupPassword() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Request>();

  function onSubmit({ password, repeat }: Request) {
    if (password !== repeat) {
      setError("repeat", { type: "validate" });
      return;
    }

    // @TODO submit logic
    console.log(password, repeat);
  }

  return (
    <Layout.Form
      title={content.title}
      description={content.description}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-6">
          <Form.Alert
            id="alert"
            show={Boolean(errors.password || errors.repeat)}
          >
            {content.form.alert}
          </Form.Alert>

          <Form.Input
            type="password"
            icon={<Icon.Lock />}
            label={content.form.password}
            name="password"
            control={control}
            aria-describedby="alert"
            required
            pattern={Rule.Password}
          />

          <Form.Input
            type="password"
            icon={<Icon.Lock />}
            label={content.form.repeat}
            name="repeat"
            control={control}
            aria-describedby="alert"
            required
            pattern={Rule.Password}
          />
        </div>

        <div>
          <Button.Flat type="submit" className="py-2">
            {content.form.submit}
          </Button.Flat>
        </div>
      </div>
    </Layout.Form>
  );
}
