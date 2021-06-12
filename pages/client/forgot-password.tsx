import { Icon, Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import { getVerification, checkVerification } from "api";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const content = {
  title: "忘記密碼",
  description: "請準備好您的手機",

  form: {
    identityAlert: "帳號錯誤",
    captchaAlert: "驗證碼錯誤",
    identity: "請輸入您的身分證字號",
    sendSMS: "傳送驗證碼",
    captcha: "請輸入簡訊內的驗證碼",
    cancel: "取消",
    submit: "下一步",
  },

  note: "點選下一步，請依照步驟完成驗證。",
};

const countdownTime = 300;

interface Request {
  identity: string;
  captcha: string;
}

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Request>();

  const router = useRouter();

  const [waitResentVerification, setWaitResentVerification] =
    useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(countdownTime);
  const [userPhone, setUserPhone] = useState("");

  function onSubmit(data: Request) {
    if (!data.captcha) return;

    return checkVerification({
      username: data.identity,
      verificationCode: data.captcha,
    })
      .then(() => {
        console.log("跳轉至設定密碼");
        // router.push("/client/setup-password")
      })
      .catch((error) => {
        return setError("captcha", {
          type: "validate",
          message: error.message,
        });
      });
  }

  useEffect(() => {
    if (countdown > 0) return;
    clearInterval(waitResentVerification as NodeJS.Timeout);
    setWaitResentVerification(null);
    setCountdown(countdownTime);
  }, [countdown]);

  const handleGetVerification = async () => {
    const verified = await trigger("identity");
    if (!verified) return;

    try {
      const result = await getVerification({ username: getValues("identity") });
      const userPhone = result.replace(
        /(\d\d\d\d)(\d\d\d)(\d\d\d)/,
        "$1-XXX-$3"
      );
      setUserPhone(userPhone);
      setWaitResentVerification(
        setInterval(() => {
          if (countdown > 0) return setCountdown((prev) => prev - 1);
        }, 1000)
      );
    } catch (error) {
      return setError("identity", {
        type: "validate",
        message: error.message,
      });
    }
  };

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
            {errors.identity
              ? errors.identity.message
              : errors.captcha
              ? errors.captcha.message
              : ""}
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

            <div className="flex">
              {waitResentVerification ? (
                <Button.Disabled type="button" className="py-2 px-4">
                  {`重送驗證碼(${countdown}秒)`}
                </Button.Disabled>
              ) : (
                <Button.Flat
                  type="button"
                  className="py-2 px-4"
                  onClick={handleGetVerification}
                >
                  {content.form.sendSMS}
                </Button.Flat>
              )}
            </div>
          </div>
          {userPhone && (
            <div className="flex">
              已發送驗證碼至{userPhone}，請於五分鐘內輸入驗證碼
            </div>
          )}
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
