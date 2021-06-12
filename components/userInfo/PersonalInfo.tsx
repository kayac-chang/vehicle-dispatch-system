import clsx from "clsx";
import { User } from "types/user";
import { CaseUserInfo } from "types/user-info";
import { Button } from "components/atoms";
import { InfoField } from "components/userInfo";

const content = {
  edit: {
    password: "修改密碼",
    phone: "修改手機",
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
};

type PersonalInfoProps = {
  data: User & CaseUserInfo;
  onPasswordClick: () => void;
  onChangePhoneClick: () => void;
};
export function PersonalInfo({
  data,
  onPasswordClick,
  onChangePhoneClick,
}: PersonalInfoProps) {
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
