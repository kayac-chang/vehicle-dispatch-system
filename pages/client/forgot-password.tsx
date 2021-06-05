import { Icon, Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";

const content = {
  title: "忘記密碼",
  description: "請準備好您的手機",

  form: {
    alert: "身分證格式錯誤",
    identity: "請輸入您的身分證字號",
    sendSMS: "傳送驗證碼",
    captcha: "請輸入簡訊內的驗證碼",
    cancel: "取消",
    submit: "下一步",
  },

  note: "點選下一步，請依照步驟完成驗證。",
};

interface Request {
  identity: string;
  captcha: string;
}

export default function ForgotPassword() {
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
    <Layout.Form
      title={content.title}
      description={content.description}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-6">
          <Form.Alert
            id="alert"
            show={Boolean(errors.identity || errors.captcha)}
          >
            {content.form.alert}
          </Form.Alert>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Form.Input
                type="text"
                icon={<Icon.Identification />}
                label={content.form.identity}
                name="identity"
                control={control}
                aria-describedby="alert"
                required
              />
            </div>

            <div className="md:w-2/12 flex">
              <Button.Flat type="button" className="py-2">
                {content.form.sendSMS}
              </Button.Flat>
            </div>
          </div>

          <Form.Input
            type="text"
            icon={<Icon.Message />}
            label={content.form.captcha}
            name="captcha"
            control={control}
            aria-describedby="alert"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex space-x-4">
            <Button.Outline type="button" className="py-2">
              {content.form.cancel}
            </Button.Outline>

            <Button.Flat type="submit" className="py-2">
              {content.form.submit}
            </Button.Flat>
          </div>

          <p>{content.note}</p>
        </div>
      </div>
    </Layout.Form>
  );
}
