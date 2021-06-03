import { SetStateAction, useState } from "react";
import { Button } from "components/atoms";

type ModalProps = { setModal: React.Dispatch<SetStateAction<boolean>> };
export function BalanceModal({ setModal }: ModalProps) {
  // TODO: Call api 取得額度資料
  const [balance, setBalance] = useState({
    totalBalance: 1840,
    usedBalance: 0,
    availableBalance: 1840,
  });

  return (
    <section>
      <div className="flex mb-6 pt-2">
        <div className="w-full">
          <p className="text-sm font-normal text-black mb-2">總額度</p>
          <p className="text-orange-dark text-lg font-semibold">{`\$${balance.totalBalance}`}</p>
        </div>
        <div className="w-full">
          <p className="text-sm font-normal text-black mb-2">使用額度</p>
          <p className="text-orange-dark text-lg font-semibold">{`\$${balance.usedBalance}`}</p>
        </div>
        <div className="w-full">
          <p className="text-sm font-normal text-black mb-2">剩餘額度</p>
          <p className="text-orange-dark text-lg font-semibold">{`\$${balance.availableBalance}`}</p>
        </div>
      </div>

      <div className="-mx-6 px-4 flex justify-end border-t pt-4">
        <div className="w-20">
          <Button.Flat className="px-4 py-2" type="button">
            {/* TODO:要把按鈕事件改掉 */}
            <span onClick={() => setModal(false)}>確定</span>
          </Button.Flat>
        </div>
      </div>
    </section>
  );
}
