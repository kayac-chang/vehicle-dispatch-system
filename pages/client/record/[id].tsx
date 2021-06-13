import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import Layout from "components/templates";
import {
  BasicTitle,
  BasicInfo,
  CaseInfo,
  PaymentInfo,
  HistoryList,
} from "components/record/detail";
import {
  getCaseDetail,
  getDespatchByOrderId,
  getOrderPayOfCaseUsers,
  getStatusLog,
} from "api";

const mockHistory = [
  { status: "新訂單", editDate: "2021-05-17 10:06:21", editor: "林園元" },
  { status: "已取消", editDate: "2021-05-17 10:06:21", editor: "林園元" },
];

const content = {
  title: "乘車明細",
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ params, req }: Context) {
  const session = await getSession({ req });

  if (!session || !params) {
    return {
      redirect: {
        destination: "/client/record",
        permanent: true,
      },
      props: {},
    };
  }

  return {
    props: {
      detail: await getCaseDetail({
        orderId: params.id,
        token: session.accessToken,
      }),
      status: await getStatusLog({
        orderId: params.id,
        token: session.accessToken,
      }),
      despatches: await getDespatchByOrderId({
        orderId: params.id,
        token: session.accessToken,
      }),
      payment: await getOrderPayOfCaseUsers({
        orderId: params.id,
        token: session.accessToken,
      }),
      // TODO: History尚未接
      history: mockHistory,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function RecordDetailPage({
  detail,
  status,
  despatches,
  payment,
  history,
}: Props) {
  return (
    <Layout.Normal title={content.title} prev="/client/record">
      <div className="-mx-6 m-0 lg:m-10 shadow-none rounded-none lg:shadow-md lg:rounded-lg">
        {/* TODO: status取回為array, 取得最新status的規則? */}
        <BasicTitle detail={detail} status={status[0].status} />

        <BasicInfo detail={detail} />

        <CaseInfo journey={detail} despatches={despatches} />

        <PaymentInfo payment={payment} />

        <HistoryList history={history} />
      </div>
    </Layout.Normal>
  );
}
