import Layout from "components/templates";
import {
  BasicTitle,
  BasicInfo,
  CaseInfo,
  PaymentInfo,
  History,
} from "components/record/detail";
import { RecordDetail as IRecordDetail } from "types";
import { useState } from "react";

const detail: IRecordDetail = {
  orderNo: "TS16063797554258",
  pickDate: "2020-11-29 21:30",
  status: 1,
  isCarpool: true,
  passenger: "王小明明",
  caseNo: "1081213001",
  phone: "0987654321",
  phoneSms: "0987654321",
  caseDistance: 100,
  caseCostTime: 18,
  basicInfo: [
    { title: "訂車人身份", content: "高雄縣政府衛生局" },
    { title: "可否共乘", content: "不願共乘" },
    { title: "陪同人數", content: "0人" },
    { title: "福利身份別", content: "中低收入戶" },
    { title: "建單時間", content: "2021-05-17 10:06:21" },
    { title: "預估車資總額", content: "384" },
    { title: "預估政府補助", content: "0" },
    { title: "預估自付額", content: "280" },
    { title: "預估陪同金額", content: "0" },
    { title: "應收金額", content: "280" },
  ],
  caseInfo: [
    { title: "司機姓名", content: "未排班" },
    { title: "車牌號碼", content: "未排班" },
    { title: "車輛類型", content: "一般車" },
    { title: "輪椅類型", content: "無" },
  ],
  carpoolNo: "",
  pickupInfo: {
    lat: 22.611729,
    lon: 120.30026,
    description: "住家",
    address: "新北市板橋區中山路一段161號",
    note: "在立德路和延和路交叉口,靠近延和路這邊。",
  },
  dropInfo: {
    lat: 22.611729,
    lon: 120.30026,
    description: "復健中心",
    address: "新北市板橋區中山路一段161號",
    note: "在立德路和延和路交叉口,靠近延和路這邊。",
  },
  mapInfo: {},
  paymentInfo: [
    { title: "營收金額", content: "無" },
    { title: "實際政府補助", content: "無" },
    { title: "實際自付額", content: "無" },
    { title: "實際陪同金額", content: "無" },
    { title: "實際陪同人數", content: "無" },
    { title: "使用額度", content: "無" },
    { title: "實收金額", content: "無" },
  ],
  paymentNote: "月結",
  signature: "",
  history: [
    { status: "新訂單", editDate: "2021-05-17 10:06:21", editor: "林園元" },
    { status: "已取消", editDate: "2021-05-17 10:06:21", editor: "林園元" },
  ],
};

const content = {
  title: "乘車明細",
};

export default function RecordDetail() {
  return (
    <Layout.Normal title={content.title} prev="/client/record">
      <div className="-mx-6 mb-4 sm:m-0 shadow-none rounded-none lg:shadow-md lg:rounded-lg">
        <BasicTitle item={detail} />

        <BasicInfo item={detail} />

        <CaseInfo item={detail} />

        <PaymentInfo item={detail} />

        <History item={detail} />
      </div>
    </Layout.Normal>
  );
}
