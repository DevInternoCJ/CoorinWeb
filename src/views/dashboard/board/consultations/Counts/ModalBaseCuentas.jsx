import React from "react";
import GlobalModal from "../../../../../components/Modal/GlobalModal";

const ModalBaseCuentas = ({ open, onClose, children }) => (
  <GlobalModal
    isOpen={open}
    onClose={onClose}
    title="Consulta de cuentas"
    showHeader={false}
    showCloseButton={false}
    mode="content"
    size="custom"
    modalClassName="!w-auto !max-w-[calc(100vw-1rem)] !min-h-0 !h-auto !max-h-[calc(100dvh-1rem)] !border !border-[var(--color-border)] !bg-[var(--color-surface-modal)] !text-[var(--color-text-primary)] !rounded-xl !shadow-2xl !overflow-hidden"
    contentClassName="!p-0 !overflow-visible !flex-none"
  >
    {children}
  </GlobalModal>
);

export default ModalBaseCuentas;
