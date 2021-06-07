import { ReactNode } from "react";
import _Modal from "@material-ui/core/Modal";
import {
  Dialog as _Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Button, Icon } from "components/atoms";

type DialogProps = {
  name: string;
  open?: boolean;
  onClose: () => void;
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
};
function Dialog({
  name,
  title,
  open = true,
  onClose,
  actions,
  children,
  size = "sm",
  className,
}: DialogProps) {
  return (
    <_Dialog
      maxWidth={size}
      open={open}
      onClose={onClose}
      aria-labelledby={`${name}-dialog`}
    >
      <DialogTitle
        disableTypography
        id={`${name}-dialog`}
        className="w-full flex justify-between border-b"
      >
        <strong>{title}</strong>

        <button
          className="w-4 text-gray-dark"
          onClick={onClose}
          aria-label="close"
        >
          <Icon.Clear />
        </button>
      </DialogTitle>

      <DialogContent>
        <div className={className}>{children}</div>
      </DialogContent>

      {actions && <DialogActions className="border-t">{actions}</DialogActions>}
    </_Dialog>
  );
}

type AlertProps = DialogProps & {
  onSubmit?: () => void;

  label?: {
    cancel?: string;
    submit?: string;
  };
  children?: ReactNode;
};
function Alert({
  name,
  title,
  onClose,
  onSubmit,
  label,
  children,
}: AlertProps) {
  return (
    <Dialog
      name={name}
      title={title}
      onClose={onClose}
      actions={
        <div className="text-sm flex space-x-2 px-4">
          <Button.Outline className="px-4 py-2" type="button" onClick={onClose}>
            {label?.cancel}
          </Button.Outline>

          <Button.Flat className="px-4 py-2" type="button" onClick={onSubmit}>
            {label?.submit}
          </Button.Flat>
        </div>
      }
    >
      <div className="flex p-6 w-64">
        <span className="w-6 text-orange-dark mr-4">
          <Icon.Alert />
        </span>

        {children}
      </div>
    </Dialog>
  );
}

const Modal = { Dialog, Alert };
export default Modal;
