import React, { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import Layout from "components/templates";
import {
  PasswordModal,
  PhoneModal,
  CaseSection,
  PersonalInfo,
} from "components/userInfo";
import { Modal } from "components/molecules";
import { getCaseID, getUserProfile } from "apis";
import { getCaseUser, getDiscount } from "apis";

const content = {
  title: "用戶資料",
};

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ req }: Context) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/client/login",
        permanent: true,
      },

      props: {},
    };
  }

  const token = session.accessToken;
  const user = await getUserProfile({ token });
  const caseID = await getCaseID({ ...user, token });

  const [caseUser, discount] = await Promise.all([
    getCaseUser({ caseID, token }),
    getDiscount({ caseID, token }),
  ]);

  return {
    props: {
      username: user.name,
      token,
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

  const [modal, setModal] = useState<
    "password" | "balance" | "phone" | undefined
  >();

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
        <PasswordModal
          onClose={close}
          username={username}
          token={token as string}
        />
      )}

      {modal === "balance" && discount && (
        <Modal.Balance name="balance" data={discount} onClose={close} />
      )}

      {modal === "phone" && (
        <PhoneModal
          onClose={close}
          username={username}
          token={token as string}
        />
      )}
    </Layout.Normal>
  );
}
