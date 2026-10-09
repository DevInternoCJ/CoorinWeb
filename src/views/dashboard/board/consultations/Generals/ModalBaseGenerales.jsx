import React from "react";
import GlobalModal from "../../../../../components/Modal/GlobalModal";

const ModalBaseGenerales = ({ open, onClose, children }) => (
  <GlobalModal
    isOpen={open}
    onClose={onClose}
    title="Consulta generales"
    showHeader={false}
    showCloseButton={false}
    mode="content"
    size="custom"
    modalClassName="!w-auto !max-w-[calc(100vw-1rem)] !min-h-0 !h-auto !max-h-none !border-0 !bg-transparent !shadow-none !overflow-visible"
    contentClassName="!p-0 !overflow-visible !flex-none"
  >
    {children}
  </GlobalModal>
);

export default ModalBaseGenerales;
