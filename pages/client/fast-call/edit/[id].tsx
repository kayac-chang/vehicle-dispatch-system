import Layout from "components/templates";
import { Card } from "components/molecules";
import { Button, Form } from "components/atoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getFavorite, getUserProfile, updateFavorite } from "apis";
import { getSession } from "functions/auth";

const content = {
  title: "編輯常用路線",
  form: {
    name: "路線名稱",

    journey: {
      title: "行程",

      from: {
        title: "起點",
        label: "地址",
      },

      to: {
        title: "迄點",
        label: "地址",
      },
    },

    submit: "儲存",
    cancel: "取消",
  },
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({
  params,
  req,
  resolvedUrl,
}: Context) {
  const session = await getSession({ req });

  if (!session || !params) {
    return {
      redirect: {
        destination: `/client/login?from=${resolvedUrl}`,
        permanent: true,
      },
      props: {},
    };
  }

  const [user, favorite] = await Promise.all([
    getUserProfile({ token: session.accessToken }),
    getFavorite({
      token: session.accessToken,
      id: params.id,
    }),
  ]);

  return {
    props: {
      username: user.name,
      token: session.accessToken,
      favorite,
    },
  };
}

interface Request {
  name: string;
  from: string;
  to: string;
}
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function FastCallEdit({ username, token, favorite }: Props) {
  const router = useRouter();
  const { control, handleSubmit } = useForm<Request>({
    defaultValues: {
      name: favorite?.name,
      from: favorite?.from,
      to: favorite?.to,
    },
  });

  function onSubmit(data: Request) {
    if (!token || !favorite) return;

    const { name, from, to } = data;

    return updateFavorite({ token, id: favorite.id, name, from, to }).then(() =>
      router.push("/client/fast-call")
    );
  }

  return (
    <Layout.Normal title={content.title} prev="/client/fast-call">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="-mx-6 sm:m-0 pb-8">
          <Card.Panel
            title={
              <h2 className="flex-1 text-white  text-2xl font-semibold">
                {username}
              </h2>
            }
          >
            <div className="flex flex-col space-y-4 py-4">
              <Form.Input
                type="text"
                label={content.form.name}
                name="name"
                control={control}
                required
              />

              <Form.FieldSet
                label={content.form.journey.title}
                labelClass="w-full border-b-2 border-black border-opacity-50"
              >
                <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-6 py-4">
                  <Card.Paper
                    title={content.form.journey.from.title}
                    icon="hole"
                    className="flex-1"
                  >
                    <Form.Input
                      type="text"
                      label={content.form.journey.from.label}
                      name="from"
                      control={control}
                      required
                    />
                  </Card.Paper>

                  <Card.Paper
                    title={content.form.journey.to.title}
                    icon="fill"
                    className="flex-1"
                  >
                    <Form.Input
                      type="text"
                      label={content.form.journey.to.label}
                      name="to"
                      control={control}
                      required
                    />
                  </Card.Paper>
                </div>
              </Form.FieldSet>
            </div>
          </Card.Panel>

          <div className="bg-black bg-opacity-75 flex justify-to text-sm py-3 space-x-4 px-4">
            <div>
              <Button.Outline
                type="anchor"
                className="bg-white h-full py-2 px-4"
                href="/client/fast-call"
              >
                {content.form.cancel}
              </Button.Outline>
            </div>

            <div>
              <Button.Flat type="submit" className="h-full py-2 px-4">
                {content.form.submit}
              </Button.Flat>
            </div>
          </div>
        </div>
      </form>
    </Layout.Normal>
  );
}
