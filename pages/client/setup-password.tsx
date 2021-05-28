import { Icon, Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";

interface Request {
  password: string;
  repeat: string;
}

export default function SetupPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>();

  function onSubmit(data: Request) {
    // @TODO submit logic
    console.log(data);
  }

  return (
    <Layout.Form title="設定密碼" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-gold-darker space-y-2 md:space-y-4">
        <h2 className="text-2xl md:text-4xl md:font-semibold">設定密碼</h2>

        <p>8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-4">
          <Form.Alert
            id="alert"
            show={Boolean(errors.password || errors.repeat)}
          >
            輸入格式錯誤
          </Form.Alert>

          <Form.Input
            type="password"
            icon={<Icon.Lock />}
            label="請輸入新的密碼"
            name="password"
            control={control}
            aria-describedby="alert"
            required
          />

          <Form.Input
            type="password"
            icon={<Icon.Lock />}
            label="再一次輸入新密碼確認"
            name="repeat"
            control={control}
            aria-describedby="alert"
            required
          />
        </div>

        <div className="space-y-2">
          <Button.Flat type="submit">登入</Button.Flat>
        </div>
      </div>
    </Layout.Form>
  );
}
