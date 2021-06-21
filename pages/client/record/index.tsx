import Layout from "components/templates";
import { Pagination, Modal } from "components/molecules";
import { Button, Form, NoData } from "components/atoms";
import { useForm } from "react-hook-form";
import { RecordCard } from "components/record";
import { useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import { useQuery } from "react-query";
import { deleteOrder, getRecord } from "apis";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "functions/auth";
import { OrderStatus, Record as IRecord } from "types";

const content = {
  title: "訂單檢視",

  form: {
    topic: {
      label: "請選擇類別",
      options: [
        { id: "future", label: "未來訂單", value: "future" },
        { id: "past", label: "過去訂單", value: "past" },
      ],
    },

    range: {
      from: "開始時間",
      end: "結束時間",
    },

    submit: "查詢",
  },

  cancel: {
    title: "取消訂單",
    content: "確定取消訂單?",
  },

  absence: {
    title: "司機未到",
    content: "確定司機未到?",
  },

  button: {
    submit: "確定",
    cancel: "取消",
  },
};

const INIT_PAGE = 1;
const LIMIT = 10;

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ req, resolvedUrl }: Context) {
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

  return {
    props: {
      token: session.accessToken,
    },
  };
}

interface Request {
  topic: string;
  from: Date;
  end: Date;
}
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function Record({ token }: Props) {
  const [modal, setModal] = useState<
    { type: "cancel" | "absence"; item: IRecord } | undefined
  >();

  const [page, setPage] = useState(() => INIT_PAGE);

  const { control, handleSubmit, watch } = useForm<Request>({
    defaultValues: {
      topic: content.form.topic.options[0].value,
    },
  });

  function onSubmit(data: Request) {
    console.log(data);
  }

  const filter =
    watch("topic") !== "future"
      ? { from: subMonths(new Date(), 1), end: new Date() }
      : { from: new Date(), end: addMonths(new Date(), 1) };

  const filterByStatus =
    watch("topic") === "future"
      ? (item: IRecord) =>
          [
            OrderStatus.NewOrder,
            OrderStatus.Booked,
            OrderStatus.Arrived,
            OrderStatus.Driving,
          ].includes(item.status)
      : () => true;

  const { data, refetch } = useQuery({
    queryKey: [
      "Record",
      format(filter.from, "yyyy-MM-dd"),
      format(filter.end, "yyyy-MM-dd"),
      page,
    ],
    queryFn: () =>
      getRecord({
        token: token!,
        limit: LIMIT,
        page,
        from: filter.from,
        end: filter.end,
      }),
    enabled: Boolean(token),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { total, records } = data || { total: 0, records: [] };

  return (
    <Layout.Normal title={content.title}>
      <div className="space-y-6">
        <form
          className="lg:flex lg:justify-end"
          onChange={handleSubmit(onSubmit)}
        >
          <div className="xl:w-1/2 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="lg:w-1/3">
              <Form.Input
                type="select"
                name="topic"
                control={control}
                label={content.form.topic.label}
                options={content.form.topic.options}
                className="bg-white"
              />
            </div>

            <div className="flex-1">
              <Form.Input
                type="date-range"
                from={{
                  type: "date",
                  name: "from",
                  control,
                  label: content.form.range.from,
                  className: "bg-white",
                  value: filter.from,
                  min: filter.from,
                }}
                end={{
                  type: "date",
                  name: "end",
                  control,
                  label: content.form.range.end,
                  className: "bg-white",
                  value: filter.end,
                  max: filter.end,
                }}
              />
            </div>

            <div className="lg:w-20">
              <Button.Flat type="submit" className="py-2 lg:py-0 h-full">
                {content.form.submit}
              </Button.Flat>
            </div>
          </div>
        </form>

        <div className="pb-8">
          {records.length ? (
            <ul aria-live="polite" className="space-y-4">
              {records
                .sort((a, b) => Number(a.date) - Number(b.date))
                .filter(filterByStatus)
                .map((item) => (
                  <li key={item.order}>
                    <RecordCard
                      item={item}
                      onAbsenceClick={() => setModal({ type: "absence", item })}
                      onCancelClick={() => setModal({ type: "cancel", item })}
                    />
                  </li>
                ))}
            </ul>
          ) : (
            <NoData />
          )}

          {records.length > 0 && (
            <div className="flex justify-end pt-2">
              <Pagination total={total} page={page} onChange={setPage} />
            </div>
          )}
        </div>

        {modal?.type === "cancel" && (
          <Modal.Alert
            name="cancel"
            title={content.cancel.title}
            label={{
              cancel: content.button.cancel,
              submit: content.button.submit,
            }}
            onClose={() => setModal(undefined)}
            onSubmit={() => {
              if (!token) return;

              deleteOrder({ token, ...modal.item })
                .then(() => refetch())
                .then(() => setModal(undefined));
            }}
          >
            <p>{content.cancel.content}</p>
          </Modal.Alert>
        )}

        {modal?.type === "absence" && (
          <Modal.Alert
            name="absence"
            title={content.absence.title}
            label={{
              cancel: content.button.cancel,
              submit: content.button.submit,
            }}
            onClose={() => setModal(undefined)}
            onSubmit={() => {
              if (!token) return;

              deleteOrder({ token, ...modal.item })
                .then(() => refetch())
                .then(() => setModal(undefined));
            }}
          >
            <p>{content.absence.content}</p>
          </Modal.Alert>
        )}
      </div>
    </Layout.Normal>
  );
}
