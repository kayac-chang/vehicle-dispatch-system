import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { changePassword, logout } from "api";
import { Button, Form } from "components/atoms";
import { Modal } from "components/molecules";
import Rule from "functions/regexp";

const content = {
  title: "修改密碼",
  description: "8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。",

  form: {
    old: "舊密碼",
    new: "新密碼",
    repeat: "確認新密碼",
    cancel: "取消",
    submit: "確定",
  },

  alert: {
    notMatch: "兩次輸入的密碼不相同",
    failed:
      "請再次檢查您輸入的密碼。提醒您，新的密碼不可與近3次修改的密碼相同。",
  },
};

interface Request {
  old: string;
  new: string;
  repeat: string;
}

type Props = {
  onClose: () => void;
  username: string | undefined;
  token: string | undefined;
};
export function PasswordModal({ onClose, username, token }: Props) {
  const { control, handleSubmit, setError } = useForm<Request>();

  const [alert, setAlert] = useState<string>("");

  const router = useRouter();

  function onSubmit(data: Request) {
    setAlert("");

    if (data.old === "") setError("old", { type: "validate" });

    if (data.new === "") setError("new", { type: "validate" });

    if (data.repeat === "") setError("repeat", { type: "validate" });

    if (!username || !token || !data.old || !data.new || !data.repeat) return;

    if (data.new !== data.repeat) {
      setAlert(content.alert.notMatch);
      setError("repeat", { type: "validate" });
      return;
    }

    changePassword({
      username,
      password: data.new,
      token,
    })
      .then(() => logout({ token }))
      .then(() => router.push("/client/login"))
      .catch(() => setAlert(content.alert.failed));
  }

  return (
    <Modal.Dialog
      name="password"
      title={content.title}
      actions={
        <div className="text-sm flex space-x-2 px-4">
          <Button.Outline className="px-4 py-2" type="button" onClick={onClose}>
            {content.form.cancel}
          </Button.Outline>

          <Button.Flat
            className="px-4 py-2"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {content.form.submit}
          </Button.Flat>
        </div>
      }
      onClose={onClose}
      className="py-2"
    >
      <form className="space-y-4 pb-4">
        <p className="text-sm">{content.description}</p>

        <Form.Input
          type="password"
          label={content.form.old}
          name="old"
          control={control}
          pattern={Rule.Password}
        />

        <Form.Input
          type="password"
          label={content.form.new}
          name="new"
          control={control}
          pattern={Rule.Password}
        />

        <Form.Input
          type="password"
          label={content.form.repeat}
          name="repeat"
          control={control}
          pattern={Rule.Password}
        />
        <p className="text-xs text-red-bright px-2">{alert}</p>
      </form>
    </Modal.Dialog>
  );
}
