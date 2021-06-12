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
} from "api/record";
// import { Despatch, OrderPayOfCaseUsers, RecordDetail } from "types/record";

// 註解掉的部分是swagger打回來的資料
// const detail: RecordDetail = {
//   id: "6800049758915829760",
//   caseUserId: "6789568027834228736",
//   orgName: "",
//   createdIdentity: "高雄縣政府衛生局",
//   createDate: "",
//   userName: "王小明明",
//   userUID: "G122112739",
//   userPhone: "0987654321",
//   orderNo: "CN6800049758840336384",
//   caseUserNo: "2",
//   reserveDate: "2020-11-29 21:30",
//   status: 1,
//   fromAddr: "高雄市苓雅區三多四路3巷12號",
//   fromAddrRemark: "住家",
//   toAddr: "807高雄市三民區明吉路13號",
//   toAddrRemark: "復健中心",
//   fromLat: 22.620308,
//   fromLon: 120.331955,
//   toLat: 22.620308,
//   toLon: 120.331955,
//   carCategoryName: "一般車",
//   wheelchairType: "",
//   familyWith: 2,
//   maidWith: 0,
//   noticePhone: "0987654123",
//   canShared: true,
//   etTotalAmt: 384,
//   etDiscountAmt: 0,
//   etSelfPay: 280,
//   etWithAmt: 0,
//   cancelRemark: "",
//   wealTypeId: "1",
//   wealTypeName: "中低收入戶",
//   expectedMinute: 108,
//   totalMileage: 64,
//   isBack: false,
// };

// const despatches: Despatch = {
//   driverName: "尤大富",
//   carNo: "TAK-1005",
//   orderNos: ["CN6799057965822816256", "CN6799064577723641856"],
// };

// const payment: OrderPayOfCaseUsers = {
//   id: "6800049758915829760",
//   realFamilyWith: 2,
//   realMaidWith: 0,
//   realWithAmt: 200,
//   realDiscountAmt: 0,
//   realSelfPay: 280,
//   receivePay: 480,
//   signPic: "https://i.imgur.com/8S73Y.png",
//   remark: "月結",
//   useDiscount: 20,
// };

const history = [
  { status: "新訂單", editDate: "2021-05-17 10:06:21", editor: "林園元" },
  { status: "已取消", editDate: "2021-05-17 10:06:21", editor: "林園元" },
];

// 測試單號:"CN6800049758945193984"

const content = {
  title: "乘車明細",
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ params, req }: Context) {
  // const session = await getSession({ req });
  const session = { accessToken: "a87ff9ef" };
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
        orderNo: params.id,
        token: session.accessToken,
      }),
      status: await getStatusLog({
        orderNo: params.id,
        token: session.accessToken,
      }),
      despatches: await getDespatchByOrderId({
        orderNo: params.id,
        token: session.accessToken,
      }),
      payment: await getOrderPayOfCaseUsers({
        orderNo: params.id,
        token: session.accessToken,
      }),
      // history: undefined,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function RecordDetailPage({
  detail,
  status,
  despatches,
  payment,
}: // history,
Props) {
  return (
    <Layout.Normal title={content.title} prev="/client/record">
      <div className="-mx-6 m-0 lg:m-10 shadow-none rounded-none lg:shadow-md lg:rounded-lg">
        {/* TODO: status取回為array, 取得最新status的規則? */}
        <BasicTitle
          detail={detail}
          status={status[0].status || detail?.status}
        />

        <BasicInfo detail={detail} />

        <CaseInfo journey={detail} despatches={despatches} />

        <PaymentInfo payment={payment} />

        <HistoryList history={history} />
      </div>
    </Layout.Normal>
  );
}
