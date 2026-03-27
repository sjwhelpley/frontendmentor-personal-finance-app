"use client";

import Button from "@/design-system/Button";
import IconCloseModal from "@/assets/images/icon-close-modal.svg";
import {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ModalBaseProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Extra class on the white panel (e.g. max width). */
  panelClassName?: string;
};

type ModalPrimaryFooter = {
  footer: "primary";
  primaryLabel: string;
  onPrimaryAction: () => void;
};

type ModalDestructiveFooter = {
  footer: "destructive";
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  cancelLabel?: string;
};

export type ModalProps = ModalBaseProps &
  (ModalPrimaryFooter | ModalDestructiveFooter);

export default function Modal(props: ModalProps) {
  const {
    open,
    onClose,
    title,
    description,
    children,
    panelClassName = "",
  } = props;

  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  if (!mounted || !open) return null;

  const panel = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-grey-900/50 cursor-default"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-[560px] bg-white rounded-[12px] p-[20px] md:p-6 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] ${panelClassName}`}
      >
        <div className="flex flex-row justify-between items-start gap-4">
          <h2
            id={titleId}
            className="text-preset-1 text-grey-900 pr-2 flex-1 min-w-0"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-0 border-none bg-transparent cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-grey-900 focus-visible:ring-offset-2"
            aria-label="Close dialog"
          >
            <IconCloseModal className="w-[26px] h-[26px] block" aria-hidden />
          </button>
        </div>

        {description ? (
          <p className="mt-4 text-preset-4 text-grey-500">{description}</p>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}

        <div className="mt-6 flex flex-col gap-3">
          {props.footer === "primary" ? (
            <Button
              label={props.primaryLabel}
              onClick={props.onPrimaryAction}
              variant="primary"
              className="w-full text-center"
            />
          ) : (
            <>
              <Button
                label={props.confirmLabel}
                onClick={props.onConfirm}
                variant="destroy"
                className="w-full text-center"
              />
              <button
                type="button"
                onClick={props.onCancel}
                className="w-full py-2 text-preset-4 text-grey-500 hover:text-grey-900 text-center cursor-pointer bg-transparent border-none"
              >
                {props.cancelLabel ?? "No, Go Back"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}
