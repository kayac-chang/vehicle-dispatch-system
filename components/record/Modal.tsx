import { Modal as _Modal } from "components/molecules";
import { Icon, Button } from "components/atoms";

const content = {
  absence: {
    title: "司機未到",
    content: "確定司機未到?",
  },

  cancel: {
    title: "取消訂單",
    content: "確定取消訂單?",
  },

  button: {
    submit: "確定",
    cancel: "取消",
  },
};

type Props = {
  onClose: () => void;
  onSubmit: () => void;
};
function Absence({ onClose, onSubmit }: Props) {
  return (
    <_Modal.Dialog
      name="absence"
      title={content.absence.title}
      onClose={onClose}
      actions={
        <div className="text-sm flex space-x-2 px-4">
          <Button.Outline className="px-4 py-2" type="button" onClick={onClose}>
            {content.button.cancel}
          </Button.Outline>

          <Button.Flat className="px-4 py-2" type="button" onClick={onSubmit}>
            {content.button.submit}
          </Button.Flat>
        </div>
      }
    >
      <div className="flex p-6 w-64">
        <span className="w-6 text-orange-dark mr-4">
          <Icon.Alert />
        </span>

        <p>{content.absence.content}</p>
      </div>
    </_Modal.Dialog>
  );
}

function Cancel({ onClose, onSubmit }: Props) {
  return (
    <_Modal.Dialog
      name="cancel"
      title={content.cancel.title}
      onClose={onClose}
      actions={
        <div className="text-sm flex space-x-2 px-4">
          <Button.Outline className="px-4 py-2" type="button" onClick={onClose}>
            {content.button.cancel}
          </Button.Outline>

          <Button.Flat className="px-4 py-2" type="button" onClick={onSubmit}>
            {content.button.submit}
          </Button.Flat>
        </div>
      }
    >
      <div className="flex p-6 w-64">
        <span className="w-6 text-orange-dark mr-4">
          <Icon.Alert />
        </span>

        <p>{content.cancel.content}</p>
      </div>
    </_Modal.Dialog>
  );
}

const Modal = { Absence, Cancel };
export default Modal;
