import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card, Modal } from "components/molecules";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import { CarSelection, RouteMap, Journey, Request } from "components/dispatch";
import { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import { getCarType, getCaseID, getUserProfile } from "apis";
import {
  addDays,
  addMinutes,
  endOfDay,
  isSameDay,
  parse,
  roundToNearestMinutes,
} from "date-fns";
import { getAllOrganizations } from "apis/organization";
import { getCaseUser, getDiscount } from "apis/caseuser";

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

  const token = session.accessToken;
  const [user, organizations, cartype] = await Promise.all([
    getUserProfile({ token }),
    getAllOrganizations({ token }),
    getCarType(),
  ]);

  const caseID = await getCaseID({ ...user, token });
  const [caseUser, discount] = await Promise.all([
    getCaseUser({ token, caseID }),
    getDiscount({ token, caseID }),
  ]);

  return {
    props: {
      username: user.name,
      token,
      organizations: organizations.filter(({ id }) =>
        caseUser.organizationIDs.includes(id)
      ),
      address: caseUser.address,
      discount,
      cartype,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function News({
  username,
  organizations = [],
  address,
  discount,
  cartype = [],
}: Props) {
  const { control, watch, setValue } = useForm<Request>({
    defaultValues: {
      organizations: [],
      from: address && `${address.county}${address.district}${address.street}`,
    },
  });

  const [expanded, setExpanded] = useState("car-selection");
  const [modal, setModal] = useState<"balance" | undefined>(undefined);

  const minDay = addDays(new Date(), 5);
  const isMinDay = isSameDay(
    parse(watch("date"), "yyyy-MM-dd", new Date()),
    minDay
  );

  return (
    <>
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
                    onClick={() => setModal("balance")}
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
                  required
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
                  required
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

              <CarSelection
                control={control}
                watch={watch}
                setValue={setValue}
                organizations={organizations}
              />

              <Journey control={control} watch={watch} cartype={cartype} />

              <RouteMap watch={watch} />
            </form>
          </Card.Panel>
        </div>
      </Layout.Normal>

      {modal === "balance" && discount && (
        <Modal.Balance
          name="balance"
          data={discount}
          onClose={() => setModal(undefined)}
        />
      )}
    </>
  );
}
