import { Button, Form } from "components/atoms";
import { Modal } from "components/molecules";
import { useForm } from "react-hook-form";

const content = {
  title: "修改密碼",
  description: "8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。",

  form: {
    old: "舊密碼",
    new: "新密碼",
    reply: "確認新密碼",
    cancel: "取消",
    submit: "確定",
  },
};

interface Request {
  old: string;
  new: string;
  reply: string;
}

type Props = { onClose: () => void };
export function PasswordModal({ onClose }: Props) {
  const { control, handleSubmit } = useForm<Request>();

  function onSubmit(data: Request) {
    console.log(data);
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
        />

        <Form.Input
          type="password"
          label={content.form.new}
          name="new"
          control={control}
        />

        <Form.Input
          type="password"
          label={content.form.reply}
          name="reply"
          control={control}
        />
      </form>
    </Modal.Dialog>
  );
}
