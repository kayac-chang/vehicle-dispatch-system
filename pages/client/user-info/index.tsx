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
import { getUsername } from "api";
import { getUnPermissionUserType, getUser } from "api/user";
import { getCaseUsers, getDiscountData } from "api/user-info";

const content = {
  title: "用戶資料",
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ req }: Context) {
  const session = await getSession({ req });

  const username = await getUsername({ token: session.accessToken });

  if (!session || !username) {
    return {
      redirect: {
        destination: "/client/login",
        permanent: true,
      },

      props: {},
    };
  }

  const caseUserData = await getUnPermissionUserType({
    userId: username,
    UID: username,
    token: session.accessToken,
  }).then((res) => res?.find((item) => item.caseId !== "" && item.isEnable));

  const user = await getUser({
    id: caseUserData?.userId,
    token: session.accessToken,
  });

  const caseUser = await getCaseUsers({
    id: caseUserData?.caseId,
    token: session.accessToken,
  });

  const discount = await getDiscountData({
    caseuserId: caseUser.caseUserId,
    token: session.accessToken,
  });

  return {
    props: {
      username: username,
      token: session.accessToken,
      userInfo: { ...user, ...caseUser },
      discount: discount,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function UserInfo({
  username,
  token,
  userInfo,
  discount,
}: Props) {
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

      {modal === "password" && (
        <PasswordModal onClose={close} username={username} token={token} />
      )}
      {modal === "balance" && <BalanceModal data={discount} onClose={close} />}
      {modal === "phone" && (
        <PhoneModal onClose={close} username={username} token={token} />
      )}
    </Layout.Normal>
  );
}
