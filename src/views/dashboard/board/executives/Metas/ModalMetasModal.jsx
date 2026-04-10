import React from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import ModalMetasContent from "./ModalMetasContent";
import { IconMetas } from "../IconesEjecutives";

const MetasModal = ({
    isOpen,
    onClose,
    // Props opcionales para personalizar
    size = "metas", // 76% del viewport 
    enableShakeOnBackdropClick = true,
    closeOnBackdropClick = false,
    ...props
}) => {

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            showHeader={true}
            title={<><span className="hidden sm:inline">Metas diarias ejecutivos - Coorin</span><span className="sm:hidden">Metas Ejecutivos</span></>}
            icon={IconMetas}
            iconClassName="text-jerarquia3"
            headerProps={{ titleClassName: "text-jerarquia3" }}
            showFooter={false}
            enableBounce={false}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            closeOnBackdropClick={closeOnBackdropClick}
            enableBounceOnBackdropOrEscape={true}
            contentClassName="modal-scroll-gray"
            modalClassName="border-0 shadow-2xl"
            {...props}
        >
            <ModalMetasContent />

            {/* ...existing code... */}
        </ReusableModal>
    );
};

export default MetasModal;