"use client";

import Button from "../Button";
import { IoMdClose } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";

interface ModalsProps {
  title?: string;
  isOpen?: boolean;
  disabled?: boolean;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  secondaryActionLabel?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  secondaryAction?: () => void;
}

const Modals: React.FC<ModalsProps> = ({
  body,
  title,
  isOpen,
  footer,
  onClose,
  disabled,
  onSubmit,
  actionLabel,
  secondaryActionLabel,
  secondaryAction,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] outline-none focus:outline-none bg-alphaColor backdrop-blur-sm">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* content  */}

          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-textLight outline-none focus:outline-none">
              {/* header  */}
              <div className="flex p-6 items-center rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute right-9"
                >
                  <IoMdClose size={18} />
                </button>

                <div className="text-lg font-semibold font-secondaryFont capitalize">
                  {title}
                </div>
              </div>

              {/* body  */}
              <div className="relative p-6 flex-auto">{body}</div>

              {/* footer  */}
              <div className="flex flex-col p-6 gap-2">
                <div className="flex flex-row items-center w-full gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modals;
