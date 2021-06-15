import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import Layout from "components/templates";
import {
  BasicTitle,
  BasicInfo,
  CaseInfo,
  HistoryList,
} from "components/record/detail";
import {
  getCaseDetail,
  getDespatchByOrderId,
  getOrder,
  getStatusLog,
} from "apis";

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

  if (!session || !params?.id) {
    return {
      redirect: {
        destination: "/client/record",
        permanent: true,
      },
      props: {},
    };
  }

  const id = params.id;
  const token = session.accessToken;

  return {
    props: {
      detail: await getCaseDetail({
        orderId: id,
        token,
      }),
      status: await getStatusLog({
        orderId: id,
        token,
      }),
      despatches: await getDespatchByOrderId({
        orderId: id,
        token,
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
  history,
}: Props) {
  return (
    <Layout.Normal title={content.title} prev="/client/record">
      <div className="-mx-6 m-0 lg:m-10 shadow-none rounded-none lg:shadow-md lg:rounded-lg">
        {/* TODO: status取回為array, 取得最新status的規則? */}
        <BasicTitle
          detail={detail}
          status={status ? status[0].status : undefined}
        />

        <BasicInfo detail={detail} />

        <CaseInfo journey={detail} despatches={despatches} />

        {/* <PaymentInfo payment={payment} /> */}

        <HistoryList history={history} />
      </div>
    </Layout.Normal>
  );
}
