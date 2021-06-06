import { Button, Form, Icon } from "components/atoms";
import { Modal } from "components/molecules";
import { useEffect, useReducer } from "react";
import { Control, useForm } from "react-hook-form";
import { wait } from "functions/async";

const content = {
  title: "修改手機",

  init: {
    phone: "請輸入手機號碼",
    submit: "發送驗證碼",
  },

  send: {
    note: "已發送簡訊驗證碼到您的手機",
    phone: "請輸入手機號碼",
    captcha: "請輸入驗證碼",
    sending: "重送驗證碼(300秒)",
    resend: "重送驗證碼",
    submit: "提交驗證碼",
  },

  success: {
    note: "手機驗證成功",
    submit: "確認",
  },

  cancel: "取消",
};

type Action =
  | { type: "send" }
  | { type: "stop" }
  | { type: "resend" }
  | { type: "submit" };
type State = {
  type: "init" | "sending" | "stop-send" | "success";
};
function reducer(state: State, action: Action): State {
  if (action.type === "send") {
    return { ...state, type: "sending" };
  }

  if (action.type === "stop") {
    return { ...state, type: "stop-send" };
  }

  if (action.type === "resend") {
    return { ...state, type: "sending" };
  }

  if (action.type === "submit") {
    return { ...state, type: "success" };
  }

  return state;
}

interface Response {
  phone: string;
  captcha: string;
}

type InitProps = {
  control: Control<Response>;
};
function Init({ control }: InitProps) {
  return (
    <Form.Input
      type="text"
      name="phone"
      control={control}
      label={content.init.phone}
    />
  );
}

type SendingProps = {
  control: Control<Response>;
};
function Sending({ control }: SendingProps) {
  return (
    <>
      <p className="text-gold-darker font-semibold">{content.send.note}</p>

      <Form.Input
        type="text"
        name="phone"
        control={control}
        label={content.send.phone}
      />

      <Form.Input
        type="text"
        name="captcha"
        control={control}
        label={content.send.captcha}
      />

      <Button.Outline
        type="button"
        className="px-4 py-1 bg-gray-extralight pointer-events-none"
      >
        {content.send.sending}
      </Button.Outline>
    </>
  );
}

type StopSendProps = {
  control: Control<Response>;
  onClick: () => void;
};
function StopSend({ control, onClick }: StopSendProps) {
  return (
    <>
      <p className="text-gold-darker font-semibold">{content.send.note}</p>

      <Form.Input
        type="text"
        name="phone"
        control={control}
        label={content.send.phone}
      />

      <Form.Input
        type="text"
        name="captcha"
        control={control}
        label={content.send.captcha}
      />

      <Button.Flat type="button" className="px-4 py-1" onClick={onClick}>
        {content.send.resend}
      </Button.Flat>
    </>
  );
}

function Success() {
  return (
    <p className="flex items-center space-x-2">
      <span className="w-5 text-green-bright" aria-hidden>
        <Icon.CheckOK />
      </span>

      <span>{content.success.note}</span>
    </p>
  );
}

type Props = { onClose: () => void };
export function PhoneModal({ onClose }: Props) {
  const { control, handleSubmit } = useForm<Response>();

  const [state, dispatch] = useReducer(reducer, { type: "init" });

  function onSubmit(data: Response) {
    if (state.type === "init") {
      return dispatch({ type: "send" });
    }

    if (state.type === "success") {
      return onClose();
    }

    return dispatch({ type: "submit" });
  }

  useEffect(() => {
    if (state.type !== "sending") {
      return;
    }

    const time = 30 * 1000;

    const { cancel, finish } = wait(time);

    finish.then(() => dispatch({ type: "stop" }));

    return () => cancel();
  }, [state]);

  return (
    <Modal.Dialog
      name="phone"
      title={content.title}
      actions={
        <div className="text-sm flex space-x-2 px-4">
          <div>
            <Button.Outline
              className="px-4 py-2"
              type="button"
              onClick={onClose}
            >
              {content.cancel}
            </Button.Outline>
          </div>

          <div>
            <Button.Flat
              className="px-4 py-2"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {state.type === "init" && content.init.submit}
              {(state.type === "sending" || state.type === "stop-send") &&
                content.send.submit}
              {state.type === "success" && content.success.submit}
            </Button.Flat>
          </div>
        </div>
      }
      onClose={onClose}
      className="space-y-8 py-2 w-64"
    >
      <form className="space-y-4 pb-4 text-sm">
        {state.type === "init" && <Init control={control} />}
        {state.type === "sending" && <Sending control={control} />}
        {state.type === "stop-send" && (
          <StopSend
            control={control}
            onClick={() => dispatch({ type: "resend" })}
          />
        )}
        {state.type === "success" && <Success />}
      </form>
    </Modal.Dialog>
  );
}
