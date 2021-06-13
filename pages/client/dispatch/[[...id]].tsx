import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card } from "components/molecules";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import { CarSelection, RouteMap, Journey } from "components/dispatch";
import { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import { getUserProfile } from "apis";
import {
  addDays,
  addMinutes,
  endOfDay,
  format,
  isSameDay,
  parse,
  roundToNearestMinutes,
} from "date-fns";

const content = {
  title: "預約訂車",
  search: "可用補助餘額查詢",

  form: {
    date: "乘車日期",
    time: "乘車時間",
    case: {
      label: "訂車人身份",
      options: [
        { id: "default", label: "本人", value: "default" },
        { id: "options", label: "本人,家屬", value: "options" },
      ],
    },
  },
};

interface Request {
  date: string;
  time: string;
  case: "options" | "default";
  origin: string;
  "origin-note-type": string;
  "origin-note": string;
  destination: string;
  "destination-note-type": string;
  "destination-note": string;
  share: boolean;
  "is-round-trip": boolean;
  "round-trip-time": string;
  "car-type": string;
  "wheelchair-type": string;
  "accompanying-number": string;
  "sms-code": string;
}

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

  const user = await getUserProfile({ token: session.accessToken });

  return {
    props: {
      username: user.name,
      token: session.accessToken,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function News({ username }: Props) {
  const { control, watch } = useForm<Request>();

  const [expanded, setExpanded] = useState("car-selection");

  const minDay = addDays(new Date(), 5);
  const isMinDay = isSameDay(
    parse(watch("date"), "yyyy-MM-dd", new Date()),
    minDay
  );

  return (
    <Layout.Normal title={content.title}>
      <div className="-mx-6 sm:m-0">
        <Card.Panel
          title={
            <>
              <h2 className="flex-1 text-white  text-2xl font-semibold">
                {username}
              </h2>

              <div className="flex-1 sm:flex-none text-black">
                <Button.Icon
                  type="button"
                  icon={<Icon.Search />}
                  className="bg-white w-full py-1 px-2 rounded-sm shadow border-black flex items-center justify-center"
                >
                  {content.search}
                </Button.Icon>
              </div>
            </>
          }
        >
          <form className="flex flex-col space-y-4">
            <div
              className={clsx(
                "flex flex-col space-y-6",
                "lg:flex-row lg:space-y-0 lg:space-x-4 lg:w-1/2"
              )}
            >
              <Form.Input
                type="date"
                name="date"
                control={control}
                label={content.form.date}
                className="flex-1"
                min={minDay}
              />

              <Form.Input
                type="time"
                name="time"
                control={control}
                label={content.form.time}
                className="flex-1"
                min={
                  isMinDay
                    ? roundToNearestMinutes(addMinutes(new Date(), 15), {
                        nearestTo: 15,
                      })
                    : undefined
                }
                max={isMinDay ? endOfDay(new Date()) : undefined}
              />

              <Form.Input
                type="select"
                name="case"
                control={control}
                label={content.form.case.label}
                options={content.form.case.options}
                className="flex-1"
              />
            </div>

            <CarSelection />

            <Journey control={control} />

            <RouteMap />
          </form>
        </Card.Panel>
      </div>
    </Layout.Normal>
  );
}
