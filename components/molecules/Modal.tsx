import React, { ReactNode } from "react";
import Modal from "@material-ui/core/Modal";
import clsx from "clsx";
import { Button } from "components/atoms";

type Props = {
  title?: string;
  confirmWording?: string;
  cancelWording?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  action?: () => void;
  children: ReactNode;
  closeButton?: boolean;
  lockedScreen?: boolean;
  size?: "sm" | "md" | "lg";
};
export function DefaultModal({
  title,
  confirmWording = "確定",
  cancelWording = "取消",
  setOpen,
  isOpen,
  action,
  children,
  closeButton = false,
  lockedScreen = false,
  size = "md",
}: Props): JSX.Element {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (lockedScreen) return;
    setOpen(false);
  };

  const handleAction = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (action === undefined) return;
    action();
  };

  const body = (
    <div
      className={clsx(
        "modal absolute bg-white rounded",
        size === "sm" && "w-1/3",
        size === "md" && "w-1/2",
        size === "lg" && "w-2/3"
      )}
    >
      <div
        className={clsx(
          "w-full flex flex-row justify-between p-4 ",
          closeButton && "border border-t-0 border-r-0 border-l-0"
        )}
      >
        <h1>{title}</h1>
        {closeButton && <button onClick={() => setOpen(false)}>X</button>}
      </div>
      <div>{children}</div>
      {action !== undefined && (
        <div
          className={clsx(
            "p-4 flex justify-end",
            closeButton && "border border-b-0 border-r-0 border-l-0"
          )}
        >
          <div className="w-1/2 flex space-x-4">
            <Button.Outline type="button">{cancelWording}</Button.Outline>

            <Button.Flat type="button">{confirmWording}</Button.Flat>
          </div>
        </div>
      )}
      <style>
        {`
          .modal {
            top: 49%;
            left: 49%;
            transform: translate(-49%, -49%);
          }
          `}
      </style>
    </div>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-describedby="default modal"
      >
        {body}
      </Modal>
    </div>
  );
}
