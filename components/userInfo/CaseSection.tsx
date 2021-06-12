import { User } from "types/user";
import { CaseUserInfo } from "types/user-info";
import { Button } from "components/atoms";
import { InfoField } from "components/userInfo";

const content = {
  edit: { balance: "額度狀況" },
  case: {
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

type CaseSectionProps = {
  data: User & CaseUserInfo;
  onBalanceClick: () => void;
};
export function CaseSection({ data, onBalanceClick }: CaseSectionProps) {
  return (
    <article className="p-6 bg-white rounded-lg shadow-lg mb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-gold-darker text-xl font-semibold leading-7">
          {content.case.title}
        </h2>

        <div className="flex space-x-2">
          <Button.Outline
            className="px-4 py-1 font-semibold text-sm bg-white"
            color="border-gold-darker text-gold-darker"
            type="button"
            onClick={onBalanceClick}
          >
            {content.edit.balance}
          </Button.Outline>
        </div>
      </div>

      <hr className="my-3 border-gold-darker" />

      <div className="flex flex-col lg:flex-row items-end space-y-10 lg:space-x-10 pt-3">
        <InfoField
          className="w-full lg:w-1/5"
          title={content.case.caseNo}
          content={data.caseUserNo}
        />

        <InfoField
          className="w-full lg:w-1/2"
          title={content.case.address}
          content={`${data.county}${data.district}${data.addr}`}
        />
      </div>

      <div className="flex flex-col lg:flex-row items-end space-y-10 lg:space-x-10 pt-3 mt-6 pb-12">
        <InfoField
          title={content.case.urgent.name}
          content={data.urgentName || content.case.urgent.none}
        />
        <InfoField
          title={content.case.urgent.relationship}
          content={data.urgentRelationship || content.case.urgent.none}
        />
        <InfoField
          title={content.case.urgent.phone}
          content={data.urgentPhone || content.case.urgent.none}
        />
        <InfoField
          title={content.case.urgent.tel}
          content={data.urgentTel || content.case.urgent.none}
        />
      </div>
    </article>
  );
}
