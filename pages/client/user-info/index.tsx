import React, { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "functions/auth";
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
import { useQuery } from "react-query";
import { Token } from "apis/base";

const content = {
  title: "用戶資料",
};

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

function useUserInfo({ token }: Token) {
  const { data: user } = useQuery({
    queryKey: ["User", token],
    queryFn: () => getUserProfile({ token }),
    enabled: Boolean(token),
  });

  const { data: caseID } = useQuery({
    queryKey: ["CaseID", token, user?.id],
    queryFn: () => getCaseID({ token, ...user! }),
    enabled: Boolean(token && user),
  });

  const { data: caseUser } = useQuery({
    queryKey: ["User", token, caseID],
    queryFn: () => getCaseUser({ token, caseID: caseID! }),
    enabled: Boolean(token && caseID),
  });

  const { data: discount } = useQuery({
    queryKey: ["Discount", token, caseID],
    queryFn: () => getDiscount({ token, caseID: caseID! }),
    enabled: Boolean(token && caseID),
  });

  if (!user || !caseUser || !discount) return;

  return { userInfo: { ...user, ...caseUser }, discount };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function UserInfo({ token }: Props) {
  const [modal, setModal] = useState<
    "password" | "balance" | "phone" | undefined
  >();

  const close = () => setModal(undefined);

  const data = useUserInfo({ token: token! });
  if (!data) return <></>;

  const { userInfo, discount } = data;

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
        <PasswordModal onClose={close} username={userInfo.name} token={token} />
      )}

      {modal === "balance" && discount && (
        <Modal.Balance name="balance" data={discount} onClose={close} />
      )}

      {modal === "phone" && (
        <PhoneModal onClose={close} username={userInfo.name} token={token} />
      )}
    </Layout.Normal>
  );
}
