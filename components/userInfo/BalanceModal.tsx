import { Modal } from "components/molecules";
import { Button } from "components/atoms";
import { DiscountData } from "types";

type CurrencyFieldProps = {
  title: string;
  value: number | undefined;
};
function CurrencyField({ title, value }: CurrencyFieldProps) {
  return (
    <div className="w-full">
      <strong className="text-sm font-normal text-black mb-2">{title}</strong>

      <p className="text-orange-dark text-lg font-semibold">${value}</p>
    </div>
  );
}

const content = {
  title: "額度狀況",
  total: "總額度",
  used: "使用額度",
  available: "剩餘額度",
  submit: "確定",
};

type Props = { data: DiscountData | undefined; onClose: () => void };
export function BalanceModal({ data, onClose }: Props) {
  if (!data) return <></>;
  return (
    <Modal.Dialog
      name="password"
      title={content.title}
      actions={
        <div className="text-sm flex space-x-2 px-4">
          <Button.Flat className="px-4 py-2" type="button" onClick={onClose}>
            {content.submit}
          </Button.Flat>
        </div>
      }
      onClose={onClose}
      className="py-2 space-y-4 w-64"
    >
      <CurrencyField title={content.total} value={data?.totalDiscount} />
      <CurrencyField title={content.used} value={data?.useDiscount} />
      <CurrencyField title={content.available} value={data?.lastDiscount} />
    </Modal.Dialog>
  );
}
