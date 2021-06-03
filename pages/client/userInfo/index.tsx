import { useState } from "react";
import clsx from "clsx";
import Layout from "components/templates";
import { Button } from "components/atoms";
import { DefaultModal } from "components/molecules";
import {
  PasswordModal,
  BalanceModal,
  ChangePhoneModal,
} from "components/userInfo";

// /api/Users/Get
const mockUser = {
  name: "吳幼緞",
  sex: 2,
  phone: "0987654321",
  birthday: "1993-03-12T08:52:45.780Z",
  uid: "A201186566",
};

// /api/CaseUsers/Get
const mockCaseUsers = {
  caseUserNo: "AAAAA",
  county: "台北市",
  district: "大安區",
  addr: "信義路三段143號",
  urgentName: "王小明",
  urgentRelationship: "",
  urgentPhone: "09123456789",
  urgentTel: "0423456789",
};
function sexConverter(sex: number): string {
  switch (sex) {
    case 0:
      return "不提供";
    case 1:
      return "男";
    case 2:
      return "女";
    default:
      return "無資料";
  }
}

function birthdayConverter(date: string): string {
  const tempDate = new Date(date);
  let month = "" + (tempDate.getMonth() + 1),
    day = "" + tempDate.getDate(),
    year = tempDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

type InfoFieldProps = {
  className?: string;
  title: string;
  content: string;
  section?: "basic" | "case";
};
function InfoField({
  className = "w-full",
  title,
  content,
  section = "basic",
}: InfoFieldProps) {
  return (
    <div className={clsx("text-sm font-normal", className)}>
      <h3 className="text-black">{title}</h3>
      <p
        className={clsx(
          "w-full pt-3 pb-2 text-gray-dark border-b border-dashed",
          section === "basic" && "border-gold-darker",
          section === "case" && "border-orange-dark"
        )}
      >
        {content}
      </p>
    </div>
  );
}

function TitleConverter(type: "password" | "balance" | "changePhone"): string {
  switch (type) {
    case "password":
      return "修改密碼";
    case "balance":
      return "額度狀況";
    case "changePhone":
      return "";
    //客制Modal，title回空字串
  }
}

export default function UserInfo() {
  const [isOpen, setOpen] = useState(false);

  const [modalType, setModalType] =
    useState<"password" | "balance" | "changePhone">("changePhone");

  const [user, setUser] = useState({
    user: mockUser,
    caseUser: mockCaseUsers,
  });

  function CallModal(type: "password" | "balance" | "changePhone") {
    setModalType(type);
    setOpen(true);
  }
  return (
    <Layout.Normal title="用戶資料">
      <div className="-mx-6 lg:auto">
        <article className="p-6 bg-white rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-gold-darker text-xl font-semibold leading-7">
              基本資料
            </h2>
            <div className="flex space-x-2">
              <Button.Outline
                className="px-4 py-1 font-semibold text-sm bg-white"
                type="button"
              >
                {/* TODO:要把按鈕事件改掉 */}
                <span onClick={() => CallModal("password")}>修改密碼</span>
              </Button.Outline>

              <Button.Outline
                className="px-4 py-1 font-semibold text-sm bg-white"
                type="button"
              >
                {/* TODO:要把按鈕事件改掉 */}
                <span onClick={() => CallModal("changePhone")}>修改手機</span>
              </Button.Outline>
            </div>
          </div>
          <hr className="my-3 border-gold-darker" />

          <section
            className="flex flex-col lg:flex-row space-y-4
         lg:space-x-4 items-end pt-3 pb-2 lg:pb-0"
          >
            <InfoField title="姓名" content={user.user.name} />
            <InfoField
              title="生日"
              content={birthdayConverter(user.user.birthday)}
            />
            <InfoField title="性別" content={sexConverter(user.user.sex)} />
            <InfoField title="身分證字號" content={user.user.uid} />
            <InfoField title="手機" content={user.user.phone} />
          </section>
        </article>

        <article className="p-6 bg-white rounded-lg shadow-lg mb-20">
          <div className="flex justify-between items-center">
            <h2 className="text-orange-dark text-xl font-semibold leading-7">
              長照
            </h2>
            <div className="flex space-x-2">
              <Button.Outline
                className="px-4 py-1 font-semibold text-sm bg-white"
                color="border-orange-dark text-orange-dark"
                type="button"
              >
                {/* TODO:要把按鈕事件改掉 */}
                <span onClick={() => CallModal("balance")}>額度狀況</span>
              </Button.Outline>
            </div>
          </div>
          <hr className="my-3 border-orange-dark" />

          <section className="flex flex-col lg:flex-row items-end space-y-10 lg:space-x-10 pt-3">
            <InfoField
              className="w-full lg:w-1/5"
              title="案號"
              content={user.caseUser.caseUserNo}
              section="case"
            />
            <InfoField
              className="w-full lg:w-1/2"
              title="居住地址"
              content={`${user.caseUser.county}${user.caseUser.district}${user.caseUser.addr}`}
              section="case"
            />
          </section>

          <section className="flex flex-col lg:flex-row items-end space-y-10 lg:space-x-10 pt-3 mt-6 pb-12">
            <InfoField
              title="緊急聯絡人姓名"
              content={user.caseUser.urgentName}
              section="case"
            />
            <InfoField
              title="緊急聯絡人關係"
              content={
                user.caseUser.urgentRelationship === ""
                  ? "未填寫"
                  : user.caseUser.urgentRelationship
              }
              section="case"
            />
            <InfoField
              title="緊急聯絡人手機"
              content={user.caseUser.urgentPhone}
              section="case"
            />
            <InfoField
              title="緊急聯絡人市話"
              content={user.caseUser.urgentTel}
              section="case"
            />
          </section>
        </article>
      </div>
      <DefaultModal
        isOpen={isOpen}
        setOpen={setOpen}
        title={TitleConverter(modalType)}
        size="sm"
        closeButton={modalType !== "changePhone"}
        lockedScreen
      >
        {modalType === "password" && <PasswordModal setModal={setOpen} />}

        {modalType === "balance" && <BalanceModal setModal={setOpen} />}

        {modalType === "changePhone" && <ChangePhoneModal setModal={setOpen} />}
      </DefaultModal>
    </Layout.Normal>
  );
}
