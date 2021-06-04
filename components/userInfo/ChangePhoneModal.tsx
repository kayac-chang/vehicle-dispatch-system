import { SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import { Button, Icon } from "components/atoms";

const countTime = 300;
type ModalProps = { setModal: React.Dispatch<SetStateAction<boolean>> };
export function ChangePhoneModal({ setModal }: ModalProps) {
  const [status, setStatus] =
    useState<"canSend" | "counting" | "reSend" | "done">("canSend");

  const [countdown, setCountdown] = useState(countTime);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [verifyCode, setVerifyCode] = useState("");

  useEffect(() => {
    if (countdown === 0) {
      setStatus("reSend");
      setCountdown(countTime);
    }
    if (countdown !== 0 && countdown !== countTime)
      setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown]);

  function submit() {
    if (status === "canSend") {
      sendMag();
      return;
    }

    //TODO:檢查驗證碼是否正確
    // if(驗證過了)
    console.log(`verifyCode: ${verifyCode}`);
    setStatus("done");
  }

  function sendMag() {
    if (countdown !== countTime) return;
    // TODO:call msg api
    console.log(`send verifyCode to ${phoneNumber}`);
    setCountdown(countdown - 1);
    setStatus("counting");
  }

  return (
    <section>
      <div className="flex flex-col mb-6 pt-2">
        {status !== "canSend" && status !== "done" && (
          <p className="text-sm text-gold-darker font-semibold mb-4">
            已發送簡訊驗證碼到您的手機
          </p>
        )}

        {status !== "done" && (
          <div className="w-full">
            <p className="text-sm font-normal text-gray-dark">手機號碼</p>
            <input
              className={clsx(
                "w-full p-2  text-sm mt-2 mb-1",
                "border border-gray-dark rounded-sm",
                "placeholder-gray-dark focus:outline-none"
              )}
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="請輸入手機號碼"
            />
          </div>
        )}

        {status !== "canSend" && status !== "done" && (
          <div className="w-full mt-6 mb-1">
            <p className="text-sm font-normal text-gray-dark">驗證碼</p>
            <div
              className={clsx(
                "flex flex-col items-end space-y-4 space-x-0 mt-2",
                "lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4"
              )}
            >
              <input
                className={clsx(
                  "w-full lg:flex-1 p-2 text-sm",
                  "border border-gray-dark rounded-sm",
                  "placeholder-gray-dark focus:outline-none"
                )}
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="請輸入驗證碼"
              />

              <button
                className={clsx(
                  "py-2 border rounded-sm text-sm",
                  status === "counting" && "w-40 border-black bg-gray-100",
                  status === "reSend" && "w-32 bg-gold-darker text-white"
                )}
                disabled={status === "counting"}
                onClick={() => sendMag()}
              >
                重送驗證碼{status === "counting" && `(${countdown}秒)`}
              </button>
            </div>
          </div>
        )}

        {status === "done" && (
          <div className="flex space-x-4 pt-2 items-center">
            <p className="w-6 h-6 text-green-bright">
              <Icon.CheckOK />
            </p>
            <p className="font-normal text-gray-dark">手機驗證成功</p>
          </div>
        )}
      </div>

      <div
        className={clsx(
          "-mx-6 px-4 pt-4 flex justify-end space-x-2",
          "text-sm font-normal",
          status !== "done" && "border-t"
        )}
      >
        {/* TODO: 要把Button onClick補上 */}

        {status !== "done" && (
          <div className="w-20">
            <Button.Outline className="py-2" type="button">
              <span onClick={() => setModal(false)}>取消</span>
            </Button.Outline>
          </div>
        )}

        {status !== "done" && (
          <div className="w-32">
            <Button.Flat className="py-2" type="button">
              <span onClick={() => submit()}>
                {status === "canSend" ? `發送驗證碼` : `提交驗證碼`}
              </span>
            </Button.Flat>
          </div>
        )}

        {status === "done" && (
          <div className="w-20">
            <Button.Flat className="py-2" type="button">
              <span onClick={() => setModal(false)}>確定</span>
            </Button.Flat>
          </div>
        )}
      </div>
    </section>
  );
}
