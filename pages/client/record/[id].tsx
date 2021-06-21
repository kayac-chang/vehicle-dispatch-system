import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "functions/auth";
import Layout from "components/templates";
import {
  BasicTitle,
  BasicInfo,
  CaseInfo,
  PaymentInfo,
  HistoryList,
} from "components/record/detail";
import { getDispatch, getOrder, getOrderHistory } from "apis";
import { useQueriesTyped } from "functions/async";
import { OrderStatus } from "types";

const content = {
  title: "乘車明細",
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({
  params,
  req,
  resolvedUrl,
}: Context) {
  const session = await getSession({ req });

  if (!session || !params?.id) {
    return {
      redirect: {
        destination: `/client/login?from=${resolvedUrl}`,
        permanent: true,
      },
      props: {},
    };
  }

  const id = params.id;
  const token = session.accessToken;

  return {
    props: {
      id,
      token,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function RecordDetailPage({ id, token }: Props) {
  const [
    { data: order },
    { data: dispatch },
    { data: history },
  ] = useQueriesTyped([
    {
      queryKey: ["Order", id],
      queryFn: () => getOrder({ token: token!, id: id! }),
      enabled: Boolean(token && id),
    },
    {
      queryKey: ["Dispatch", id],
      queryFn: () => getDispatch({ token: token!, id: id! }),
      enabled: Boolean(token && id),
    },
    {
      queryKey: ["History", id],
      queryFn: () => getOrderHistory({ token: token!, id: id! }),
      enabled: Boolean(token && id),
    },
  ]);

  if (!order || !dispatch || !history) return <></>;

  return (
    <Layout.Normal title={content.title} prev="/client/record">
      <div className="-mx-6 sm:mx-0 sm:mb-8 shadow-none rounded-none lg:shadow-md lg:rounded-lg">
        <BasicTitle detail={order} />

        <BasicInfo detail={order} />

        <CaseInfo detail={{ ...order, ...dispatch }} />

        {order.status === OrderStatus.Done && <PaymentInfo detail={order} />}

        <HistoryList detail={history} />
      </div>
    </Layout.Normal>
  );
}
