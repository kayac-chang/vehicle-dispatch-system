import { SetStateAction, useState } from "react";
import { Button, Icon } from "components/atoms";

type PasswordInputProps = {
  value: string;
  setValue: any;
  placeholder: string;
};
function PasswordInput({ value, setValue, placeholder }: PasswordInputProps) {
  const [isHidden, setHidden] = useState(true);
  return (
    <div className="flex items-center px-2 py-1 border border-gray-dark rounded-sm mt-2 mb-6">
      <div className="w-4 h-4 mx-1 text-gray-dark">
        <Icon.Lock />
      </div>
      <input
        className="flex-1 placeholder-gray-dark focus:outline-none text-sm"
        type={isHidden ? "password" : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <button
        className="w-8 p-2 text-gray-dark"
        onClick={() => setHidden(!isHidden)}
      >
        {isHidden ? <Icon.Visible /> : <Icon.Invisible />}
      </button>
    </div>
  );
}

type ModalProps = { setModal: React.Dispatch<SetStateAction<boolean>> };
export function PasswordModal({ setModal }: ModalProps) {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function setValue(e: string, section: string) {
    setPasswords({ ...passwords, [section]: e });
  }

  function resetPassword() {
    //  TODO: call /api/Users/ChangePassword
    setModal(false);
  }

  return (
    <section className="text-sm font-normal text-gray-dark">
      <p className=" mb-6">
        8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
      </p>

      <p>舊密碼</p>
      <PasswordInput
        value={passwords.oldPassword}
        setValue={(e: string) => setValue(e, "oldPsw")}
        placeholder="請輸入舊密碼"
      />
      <p>新密碼</p>
      <PasswordInput
        value={passwords.newPassword}
        setValue={(e: string) => setValue(e, "newPsw")}
        placeholder="請輸入新密碼"
      />
      <p>確認新密碼</p>
      <PasswordInput
        value={passwords.confirmPassword}
        setValue={(e: string) => setValue(e, "confirmPsw")}
        placeholder="請輸入新密碼"
      />

      <div className="-mx-6 px-4 flex justify-end border-t pt-4">
        <div className="w-40 flex space-x-2">
          {/* TODO: 要把Button onClick補上 */}
          <Button.Outline className="px-4 py-2" type="button">
            <span onClick={() => setModal(false)}>取消</span>
          </Button.Outline>

          <Button.Flat className="px-4 py-2" type="button">
            <span onClick={() => resetPassword()}>確定</span>
          </Button.Flat>
        </div>
      </div>
    </section>
  );
}
