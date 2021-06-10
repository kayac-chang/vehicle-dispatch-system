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
import { UnPermissionUserType, User } from "types/user";
import { CaseUserInfo, DiscountData } from "types/user-info";

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
  useDiscount: 0,
  lastDiscount: 2000,
  totalDiscount: 2000,
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
  data: User & CaseUserInfo;
  onPasswordClick: () => void;
  onChangePhoneClick: () => void;
};
function PersonalInformation({
  data,
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
        <InfoField title={content.personal.name} content={data.name} />

        <InfoField title={content.personal.birthday} content={data.birthday} />

        <InfoField
          title={content.personal.gender.title}
          content={
            {
              0: content.personal.gender.private,
              1: content.personal.gender.man,
              2: content.personal.gender.woman,
            }[data.sex] || content.personal.gender.none
          }
        />

        <InfoField title={content.personal.identity} content={data.uid} />

        <InfoField title={content.personal.phone} content={data.phone} />
      </div>
    </article>
  );
}

type LongTermCareProps = {
  data: User & CaseUserInfo;
  onBalanceClick: () => void;
};
function LongTermCare({ data, onBalanceClick }: LongTermCareProps) {
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
          content={data.caseUserNo}
          section="case"
        />

        <InfoField
          className="w-full lg:w-1/2"
          title={content.ltc.address}
          content={`${data.county}${data.district}${data.addr}`}
          section="case"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-end space-y-10 lg:space-x-10 pt-3 mt-6 pb-12">
        <InfoField
          title={content.ltc.urgent.name}
          content={data.urgentName || content.ltc.urgent.none}
          section="case"
        />
        <InfoField
          title={content.ltc.urgent.relationship}
          content={data.urgentRelationship || content.ltc.urgent.none}
          section="case"
        />
        <InfoField
          title={content.ltc.urgent.phone}
          content={data.urgentPhone || content.ltc.urgent.none}
          section="case"
        />
        <InfoField
          title={content.ltc.urgent.tel}
          content={data.urgentTel || content.ltc.urgent.none}
          section="case"
        />
      </div>
    </article>
  );
}

export default function UserInfo() {
  const [modal, setModal] =
    useState<"password" | "balance" | "phone" | undefined>();

  const close = () => setModal(undefined);

  const userInfo: User & CaseUserInfo = { ...user, ...caseUserInfo };

  return (
    <Layout.Normal title={content.title}>
      <div className="-mx-6 sm:mx-auto">
        <PersonalInformation
          data={userInfo}
          onPasswordClick={() => setModal("password")}
          onChangePhoneClick={() => setModal("phone")}
        />

        <LongTermCare
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
