import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card, Modal } from "components/molecules";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import { CarSelection, RouteMap, Journey, Request } from "components/dispatch";
import { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "functions/auth";
import {
  getCarType,
  getCaseID,
  getOrderAmount,
  getUserProfile,
  addOrder,
  getCaseUser,
  getDiscount,
  getGeocode,
  getOrder,
  getFavorite,
} from "apis";
import {
  addDays,
  eachMinuteOfInterval,
  format,
  getMinutes,
  isSameDay,
  parse,
  roundToNearestMinutes,
  set,
} from "date-fns";
import { getAllOrganizations } from "apis/organization";
import { useQuery } from "react-query";
import { useDebounce } from "@react-hook/debounce";
import { useEffect } from "react";
import { Geocode, OrderAmount } from "types";
import { useRouter } from "next/dist/client/router";

const content = {
  title: "預約訂車",
  search: "可用補助餘額查詢",

  form: {
    date: "乘車日期",
    time: "乘車時間",
    case: {
      label: "訂車人身份",
      options: [
        { id: "self", label: "本人", value: "本人" },
        { id: "relative", label: "家屬", value: "家屬" },
      ],
    },
  },
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({
  params,
  req,
  query,
  resolvedUrl,
}: Context) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/client/login?from=${resolvedUrl}`,
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

  if (params?.id) {
    const data = await getOrder({ token, id: params.id });

    const order = {
      date: format(data.date, "yyyy-MM-dd"),
      time: format(data.date, "HH:mm"),
      case: data.identity,
      from: data.from.address,
      "from-note-type": data.from.note || "",
      to: data.to.address,
      "to-note-type": data.to.note || "",
      share: data.share,
      "is-round-trip": data.isRoundTrip,
      "car-type": data.carCategory.id,
      "wheelchair-type": data.wheelchair,
      "accompanying-number": String(data.accompanying),
      "sms-code": data.phone,
    };

    return {
      props: {
        order,
        caseID,
        user: user,
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

  if (query.favorite && typeof query.favorite === "string") {
    const { from, to } = await getFavorite({ token, id: query.favorite });

    return {
      props: {
        order: { from, to },
        caseID,
        user: user,
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

  return {
    props: {
      caseID,
      user: user,
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

function useGeocode(): [Geocode | undefined, (address: string) => void] {
  const [address, setAddress] = useDebounce("", 1000);

  const { data } = useQuery({
    queryKey: ["Geocode", address],
    queryFn: () => getGeocode(address),
    enabled: Boolean(address),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return [data, setAddress];
}

type DispatchGeocode = (location?: Geocode) => void;
function useOrderAmount(
  token?: string,
  caseID?: string
): [OrderAmount, DispatchGeocode, DispatchGeocode] {
  const [from, setFrom] = useState<Geocode | undefined>(undefined);
  const [to, setTo] = useState<Geocode | undefined>(undefined);
  const [amount, setAmount] = useState<OrderAmount>({
    accompany: 0,
    subsidy: 0,
    self: 0,
    total: 0,
  });

  useEffect(() => {
    if (!token || !caseID || !from || !to) {
      setAmount({
        accompany: 0,
        subsidy: 0,
        self: 0,
        total: 0,
      });

      return;
    }

    getOrderAmount({
      token,
      caseID,
      from,
      to,
      accompanying: 0,
      date: new Date(),
    }).then(setAmount);
  }, [token, caseID, from, to, setAmount]);

  return [amount, setFrom, setTo];
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function News({
  order,
  caseID,
  token,
  user,
  organizations = [],
  address,
  discount,
  cartype = [],
}: Props) {
  const router = useRouter();
  const { control, watch, setValue, handleSubmit } = useForm<Request>({
    defaultValues: {
      organizations: [],
      from: address && `${address.county}${address.district}${address.street}`,
      ...(order || {}),
    },
  });

  const [modal, setModal] = useState<"balance" | undefined>(undefined);

  const [fromGeo, setFromAddress] = useGeocode();
  const from = watch("from");
  useEffect(() => setFromAddress(from), [from]);

  const [toGeo, setToAddress] = useGeocode();
  const to = watch("to");
  useEffect(() => setToAddress(to), [to]);

  const [amount, setFrom, setTo] = useOrderAmount(token, caseID);
  useEffect(() => setFrom(fromGeo), [fromGeo]);
  useEffect(() => setTo(toGeo), [toGeo]);

  function onSubmit(data: Request) {
    if (!token || !caseID || !user) return;

    const car = cartype.find(({ value }) => data["car-type"] === value);
    if (!car) return;

    if (!fromGeo || !toGeo) return;

    // TODO form submit check...

    addOrder({
      token,
      caseID,
      userID: user.id,
      identity: data.case,
      organizations: data.organizations,
      from: {
        id: data["from-note-type"],
        address: data.from,
        note: data["from-note"],
        lat: fromGeo.lat,
        lon: fromGeo.lon,
      },
      to: {
        id: data["to-note-type"],
        address: data.to,
        note: data["to-note"],
        lat: toGeo.lat,
        lon: toGeo.lon,
      },
      note: "",
      isRoundTrip: Boolean(data["is-round-trip"]),
      share: Boolean(data.share),
      carCategory: {
        id: car.value,
        name: car.label,
      },
      wheelchair: data["wheelchair-type"],
      accompanying: Number(data["accompanying-number"]),
      phone: data["sms-code"],
      date: parse(`${data.date} ${data.time}`, "yyyy-MM-dd HH:mm", new Date()),
    }).then(() => router.push("/client/record"));
  }

  const minDay = addDays(new Date(), 5);

  const selectDate = parse(watch("date"), "yyyy-MM-dd", new Date());
  const isMinDaySelected = isSameDay(selectDate, minDay);

  return (
    <>
      <Layout.Normal title={content.title}>
        <div className="-mx-6 sm:m-0">
          <Card.Panel
            title={
              <>
                <h2 className="flex-1 text-white  text-2xl font-semibold">
                  {user?.name}
                </h2>

                <div className="flex-1 sm:flex-none text-black">
                  <Button.Icon
                    type="button"
                    icon={<Icon.Search />}
                    className="bg-white w-full py-1 px-2 rounded-sm shadow border-black flex items-center justify-center truncate"
                    onClick={() => setModal("balance")}
                  >
                    {content.search}
                  </Button.Icon>
                </div>
              </>
            }
          >
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
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

                {watch("date") && (
                  <Form.Input
                    type="select"
                    name="time"
                    control={control}
                    label={content.form.time}
                    className="flex-1"
                    required
                    options={eachMinuteOfInterval(
                      {
                        start: isMinDaySelected
                          ? roundToNearestMinutes(
                              set(new Date(), {
                                minutes: getMinutes(new Date()) + 5,
                              }),
                              { nearestTo: 15 }
                            )
                          : set(new Date(), { hours: 6, minutes: 0 }),
                        end: set(new Date(), { hours: 23, minutes: 0 }),
                      },
                      {
                        step: 15,
                      }
                    )
                      .map((date) => format(date, "HH:mm"))
                      .map((time) => ({
                        id: time,
                        value: time,
                        label: time,
                      }))}
                  />
                )}

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

              <Journey
                control={control}
                setValue={setValue}
                watch={watch}
                cartype={cartype}
                amount={amount}
              />

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
