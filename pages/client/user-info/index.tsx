import { useState } from "react";
import clsx from "clsx";
import Layout from "components/templates";
import { Button } from "components/atoms";
import {
  PasswordModal,
  BalanceModal,
  PhoneModal,
  InfoField,
} from "components/userInfo";
import { format } from "date-fns";

// /api/Users/Get
const user = {
  name: "吳幼緞",
  sex: 2,
  phone: "0987654321",
  birthday: "1993-03-12T08:52:45.780Z",
  uid: "A201186566",
};

// /api/CaseUsers/Get
const caseUsers = {
  caseUserNo: "AAAAA",
  county: "台北市",
  district: "大安區",
  addr: "信義路三段143號",
  urgentName: "王小明",
  urgentRelationship: "",
  urgentPhone: "09123456789",
  urgentTel: "0423456789",
};

const content = {
  title: "用戶資料",

  edit: {
    password: "修改密碼",
    phone: "修改手機",
    balance: "額度狀況",
  },

  personal: {
    title: "基本資料",

    name: "姓名",
    birthday: "生日",
    gender: {
      title: "性別",
      private: "不提供",
      man: "男",
      woman: "女",
      none: "無資料",
    },
    identity: "身分證字號",
    phone: "手機",
  },

  ltc: {
    title: "長照",
    caseNo: "案號",
    address: "居住地址",
    urgent: {
      name: "緊急聯絡人姓名",
      relationship: "緊急聯絡人關係",
      phone: "緊急聯絡人手機",
      tel: "緊急聯絡人市話",
      none: "未填寫",
    },
  },
};

type PersonalInformationProps = {
  onPasswordClick: () => void;
  onChangePhoneClick: () => void;
};
function PersonalInformation({
  onPasswordClick,
  onChangePhoneClick,
}: PersonalInformationProps) {
  return (
    <article className="p-6 bg-white rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-gold-darker text-xl font-semibold leading-7">
          {content.personal.title}
        </h2>

        <div className="flex space-x-2">
          <Button.Outline
            className="px-4 py-1 font-semibold text-sm bg-white"
            type="button"
            onClick={onPasswordClick}
          >
            {content.edit.password}
          </Button.Outline>

          <Button.Outline
            className="px-4 py-1 font-semibold text-sm bg-white"
            type="button"
            onClick={onChangePhoneClick}
          >
            {content.edit.phone}
          </Button.Outline>
        </div>
      </div>
      <hr className="my-3 border-gold-darker" />

      <div
        className={clsx(
          "flex flex-col lg:flex-row space-y-4",
          "lg:space-x-4 items-end pt-3 pb-2 lg:pb-0"
        )}
      >
        <InfoField title={content.personal.name} content={user.name} />

        <InfoField
          title={content.personal.birthday}
          content={format(new Date(user.birthday), "yyyy-MM-dd")}
        />

        <InfoField
          title={content.personal.gender.title}
          content={
            {
              0: content.personal.gender.private,
              1: content.personal.gender.man,
              2: content.personal.gender.woman,
            }[user.sex] || content.personal.gender.none
          }
        />

        <InfoField title={content.personal.identity} content={user.uid} />

        <InfoField title={content.personal.phone} content={user.phone} />
      </div>
    </article>
  );
}

type LongTermCareProps = {
  onBalanceClick: () => void;
};
function LongTermCare({ onBalanceClick }: LongTermCareProps) {
  return (
    <article className="p-6 bg-white rounded-lg shadow-lg mb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-orange-dark text-xl font-semibold leading-7">
          {content.ltc.title}
        </h2>

        <div className="flex space-x-2">
          <Button.Outline
            className="px-4 py-1 font-semibold text-sm bg-white"
            color="border-orange-dark text-orange-dark"
            type="button"
            onClick={onBalanceClick}
          >
            {content.edit.balance}
          </Button.Outline>
        </div>
      </div>

      <hr className="my-3 border-orange-dark" />

      <div className="flex flex-col lg:flex-row items-end space-y-10 lg:space-x-10 pt-3">
        <InfoField
          className="w-full lg:w-1/5"
          title={content.ltc.caseNo}
          content={caseUsers.caseUserNo}
          section="case"
        />

        <InfoField
          className="w-full lg:w-1/2"
          title={content.ltc.address}
          content={`${caseUsers.county}${caseUsers.district}${caseUsers.addr}`}
          section="case"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-end space-y-10 lg:space-x-10 pt-3 mt-6 pb-12">
        <InfoField
          title={content.ltc.urgent.name}
          content={caseUsers.urgentName}
          section="case"
        />
        <InfoField
          title={content.ltc.urgent.relationship}
          content={caseUsers.urgentRelationship || content.ltc.urgent.none}
          section="case"
        />
        <InfoField
          title={content.ltc.urgent.phone}
          content={caseUsers.urgentPhone}
          section="case"
        />
        <InfoField
          title={content.ltc.urgent.tel}
          content={caseUsers.urgentTel}
          section="case"
        />
      </div>
    </article>
  );
}

export default function UserInfo() {
  const [modal, setModal] = useState<
    "password" | "balance" | "phone" | undefined
  >();

  const close = () => setModal(undefined);

  return (
    <Layout.Normal title={content.title}>
      <div className="-mx-6 sm:mx-auto">
        <PersonalInformation
          onPasswordClick={() => setModal("password")}
          onChangePhoneClick={() => setModal("phone")}
        />

        <LongTermCare onBalanceClick={() => setModal("balance")} />
      </div>

      {modal === "password" && <PasswordModal onClose={close} />}
      {modal === "balance" && <BalanceModal onClose={close} />}
      {modal === "phone" && <PhoneModal onClose={close} />}
    </Layout.Normal>
  );
}
