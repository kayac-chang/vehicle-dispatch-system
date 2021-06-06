import { Modal } from "components/molecules";
import { Button } from "components/atoms";

type CurrencyFieldProps = {
  title: string;
  value: number;
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
};

type Props = { onClose: () => void };
export function BalanceModal({ onClose }: Props) {
  return (
    <Modal.Dialog
      name="password"
      title={content.title}
      actions={
        <div className="text-sm flex space-x-2 px-4">
          <Button.Flat className="px-4 py-2" type="button" onClick={onClose}>
            確定
          </Button.Flat>
        </div>
      }
      onClose={onClose}
      className="py-2 space-y-4 w-64"
    >
      <CurrencyField title={content.total} value={1840} />
      <CurrencyField title={content.used} value={0} />
      <CurrencyField title={content.available} value={1840} />
    </Modal.Dialog>
  );
}
