import React, { ReactNode } from "react";
import Modal from "@material-ui/core/Modal";
import clsx from "clsx";
import { Button, Icon } from "components/atoms";

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
        size === "sm" && "w-11/12 lg:w-1/3",
        size === "md" && "w-11/12 lg:w-1/2",
        size === "lg" && "w-11/12 lg:w-2/3"
      )}
    >
      {title !== "" && (
        <div
          className={clsx(
            "w-full flex flex-row justify-between items-center py-4 px-6",
            closeButton && "border-b"
          )}
        >
          <h1>{title}</h1>
          {closeButton && (
            <button
              className="w-3 h-3 text-gray-dark"
              onClick={() => setOpen(false)}
            >
              <Icon.Clear />
            </button>
          )}
        </div>
      )}
      <div className="py-4 px-6">{children}</div>
      {action && (
        <div
          className={clsx(
            "py-4 px-6 flex justify-end",
            closeButton && "border-t"
          )}
        >
          {/* TODO:要把按鈕事件改掉 */}
          <div className="w-40 flex space-x-2 text-sm">
            <Button.Outline className="px-4 py-2" type="button">
              <span onClick={() => setOpen(false)}>{cancelWording}</span>
            </Button.Outline>

            <Button.Flat className="px-4 py-2" type="button">
              <span onClick={(e) => handleAction(e)}>{confirmWording}</span>
            </Button.Flat>
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
