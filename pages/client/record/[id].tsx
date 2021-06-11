import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import Layout from "components/templates";
import {
  BasicTitle,
  BasicInfo,
  CaseInfo,
  PaymentInfo,
  HistoryList,
} from "components/record/detail";
// import { Despatch, OrderPayOfCaseUsers, RecordDetail } from "types/record";
import {
  getCaseDetail,
  getDespatchByOrderId,
  getOrderPayOfCaseUsers,
} from "api/record";

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

// const history = [
//   { status: "新訂單", editDate: "2021-05-17 10:06:21", editor: "林園元" },
//   { status: "已取消", editDate: "2021-05-17 10:06:21", editor: "林園元" },
// ];

const content = {
  title: "乘車明細",
};
// 測試單號:"CN6800049758945193984"
type Context = GetStaticPropsContext<{ id: string }>;
export async function getServerSideProps({ params }: Context) {
  if (!params) {
    return {
      redirect: {
        destination: "/client/record",
      },
      props: {
        detail: undefined,
        despatches: undefined,
        payment: undefined,
        history: undefined,
      },
    };
  }

  const detail = await getCaseDetail(params.id);
  const despatches = await getDespatchByOrderId(params.id);
  const payment = await getOrderPayOfCaseUsers(params.id);
  const history = undefined;

  return {
    notFound: true,
    props: {
      detail: detail,
      despatches: despatches,
      payment: payment,
      history: history,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function RecordDetailPage({
  detail,
  despatches,
  payment,
  history,
}: Props) {
  return (
    <Layout.Normal title={content.title} prev="/client/record">
      <div className="-mx-6 m-0 lg:m-10 shadow-none rounded-none lg:shadow-md lg:rounded-lg">
        <BasicTitle detail={detail} />

        <BasicInfo detail={detail} />

        <CaseInfo journey={detail} despatches={despatches} />

        <PaymentInfo payment={payment} />

        <HistoryList history={history} />
      </div>
    </Layout.Normal>
  );
}
