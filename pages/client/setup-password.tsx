import { Icon, Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import Rule from "functions/regexp";
import { changePassword, getUsername, logout } from "api";
import { getSession } from "next-auth/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/dist/client/router";

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

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ req }: Context) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/client/login",
        permanent: true,
      },
      props: {},
    };
  }

  return {
    props: {
      username: await getUsername({ token: session.accessToken }),
      token: session.accessToken,
    },
  };
}

interface Request {
  password: string;
  repeat: string;
}
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function SetupPassword({ username, token }: Props) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Request>();

  const router = useRouter();

  function onSubmit({ password, repeat }: Request) {
    if (!username || !token) return;

    if (password !== repeat) {
      setError("repeat", { type: "validate" });
      return;
    }

    return changePassword({
      username,
      password,
      token,
    })
      .then(() => logout({ token }))
      .then(() => router.push("/client/login"))
      .catch((error) => {
        console.error(error);

        return setError("repeat", { type: "validate" });
      });
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
