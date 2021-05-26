import { Icon, Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import clsx from "clsx";

interface Request {
  identity: string;
  captcha: string;
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>();

  function onSubmit(data: Request) {
    // @TODO submit logic
    console.log(data);
  }

  return (
    <Layout.Form title="忘記密碼" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-gold-darker space-y-2 md:space-y-4">
        <h2 className="text-2xl md:text-4xl md:font-semibold">忘記密碼</h2>

        <p>請準備好您的手機</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-4">
          <p
            role="alert"
            aria-atomic
            id="alert"
            className={clsx(
              "text-red-light",
              errors.identity || errors.captcha ? "block" : "hidden"
            )}
          >
            身分證格式錯誤
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Form.Input
                type="text"
                icon={<Icon.Identification />}
                label="請輸入您的身分證字號"
                name="identity"
                register={register}
                error={errors.identity}
                describedby="alert"
                required
              />
            </div>

            <div className="md:w-2/12 flex">
              <Button.Flat>傳送驗證碼</Button.Flat>
            </div>
          </div>

          <Form.Input
            type="text"
            icon={<Icon.Message />}
            label="請輸入簡訊內的驗證碼"
            name="captcha"
            register={register}
            error={errors.captcha}
            describedby="alert"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex space-x-4">
            <Button.Outline>取消</Button.Outline>

            <Button.Flat type="submit">下一步</Button.Flat>
          </div>

          <p>點選下一步，請依照步驟完成驗證。</p>
        </div>
      </div>
    </Layout.Form>
  );
}
