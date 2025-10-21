import React from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalMetasContent from "./ModalMetasContent";
import { IconMetas } from "./IconesEjecutives";

const MetasModal = ({
    isOpen,
    onClose,
    // Props opcionales para personalizar
    size = "metas", // 76% del viewport 
    enableShakeOnBackdropClick = true,
    closeOnBackdropClick = false,
    ...props
}) => {

    // Footer personalizado con estilos verdes usando DefaultModalFooter structure
    const CustomFooter = () => (
        <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                       flex flex-col sm:flex-row justify-between items-start sm:items-center 
                       border-t-2 gap-2 sm:gap-0 bg-gray-50"
             style={{ borderColor: "var(--color-jerarquia1)" }}>
            <div className="text-xs sm:text-sm md:text-sm font-medium leading-relaxed"
                 style={{ color: "var(--color-jerarquia3)" }}>
                Seleccione los ejecutivos para guardar sus Metas Diarias
            </div>
        </div>
    );

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
            footerComponent={CustomFooter}
            showFooter={true}
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