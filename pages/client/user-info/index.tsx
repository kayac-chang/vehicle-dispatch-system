import React, { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import Layout from "components/templates";
import {
  PasswordModal,
  BalanceModal,
  PhoneModal,
  CaseSection,
  PersonalInfo,
} from "components/userInfo";
import { UnPermissionUserType, User } from "types/user";
import { CaseUserInfo, DiscountData } from "types/user-info";
import { getUsername } from "api";
import { getUnPermissionUserType, getUser } from "api/user";
import { getCaseUsers } from "api/user-info";

// /api/Users/Get
const user: User = {
  id: "6789314826878885888",
  account: "G122112739",
  name: "阿華",
  uid: "G122112739",
  sex: 1,
  phone: "0987837233",
};

// /api/CaseUsers/Get
const caseUsers: UnPermissionUserType[] = [
  {
    caseId: "6789315035470012416",
    userId: "6789314826878885888",
    caseUserNo: "1",
    userType: "caseuser",
    isEnable: false,
  },
  {
    caseId: "6789568027834228736",
    userId: "6789314826878885888",
    caseUserNo: "2",
    userType: "caseuser",
    isEnable: true,
  },
  {
    caseId: "6789611603716775936",
    userId: "6789314826878885888",
    caseUserNo: "3",
    userType: "caseuser",
    isEnable: false,
  },
  {
    caseId: "",
    userId: "6789314826878885888",
    caseUserNo: "",
    userType: "user",
    isEnable: true,
  },
];

const caseUserInfo: CaseUserInfo = {
  id: "6789568027834228736",
  userId: "6789314826878885888",
  caseUserId: "6789568027834228736",
  caseUserNo: "2",
  orgAId: "6742474724290895872",
  orgBId1: "6789315307839725568",
  orgBId2: "6792100599483113474",
  orgBId3: "6791937415971381248",
  uid: "G122112739",
  otherPhone: "",
  birthday: "1994-09-12",
  disabilityLevel: 2,
  county: "高雄市",
  district: "苓雅區",
  addr: "武慶三路86號",
  lat: 22.620308,
  lon: 120.331955,
  urgentName: "",
  urgentRelationship: "",
  urgentPhone: "",
  urgentTel: "",
  startDate: "2021-06-05",
  expiredDate: "2099-12-31",
  remark: "",
  caseUserStatus: 1,
  statusReason: null,
  reviewDate: "2021-05-01",
  wealTypeId: "1",
  wealTypeName: "中低收入戶",
  isEffectNow: false,
};

const discount: DiscountData = {
  caseUserId: "6789568027834228736",
  useDiscount: 0,
  lastDiscount: 2000,
  totalDiscount: 2000,
};

const content = {
  title: "用戶資料",
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ req }: Context) {
  const session = await getSession({ req });

  const username = await getUsername({ token: session.accessToken });

  const caseId = await getUnPermissionUserType({
    userId: username,
    UID: username,
    token: session.accessToken,
  }).then((res) => {
    return res?.find((item) => item.caseId !== "" && item.isEnable)?.userId;
  });

  const user = await getUser({
    caseId: caseId,
    token: session.accessToken,
  });

  const caseUser = await getCaseUsers({
    caseId: caseId,
    token: session.accessToken,
  });

  if (!session || !caseId || !user || !caseUser) {
    return {
      redirect: {
        destination: "/client/login",
        permanent: true,
      },

      props: {},
    };
  }

  return {
    props: {
      username: username,
      userInfo: { ...user, ...caseUser },
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function UserInfo({ username, userInfo }: Props) {
  if (!userInfo) return <></>;

  const [modal, setModal] =
    useState<"password" | "balance" | "phone" | undefined>();

  const close = () => setModal(undefined);

  return (
    <Layout.Normal title={content.title}>
      <div className="-mx-6 sm:mx-auto">
        <PersonalInfo
          data={userInfo}
          onPasswordClick={() => setModal("password")}
          onChangePhoneClick={() => setModal("phone")}
        />

        <CaseSection
          data={userInfo}
          onBalanceClick={() => setModal("balance")}
        />
      </div>

      {modal === "password" && <PasswordModal onClose={close} />}
      {modal === "balance" && <BalanceModal data={discount} onClose={close} />}
      {modal === "phone" && <PhoneModal onClose={close} />}
    </Layout.Normal>
  );
}
