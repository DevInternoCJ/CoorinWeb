import React from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalCatalogosContent from "./ModalCatalogosContent";
import { IconCatalogos } from "./IconesEjecutives";

const CatalogosModal = ({ isOpen, onClose }) => {

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="catalogos"
            showHeader={true}
            title="Catálogos - Coorin"
            icon={IconCatalogos}
            iconClassName="text-jerarquia3"
            headerProps={{ titleClassName: "text-jerarquia3" }}
            showFooter={true}
            enableBounce={false}
            enableBounceOnBackdropOrEscape={true}
            contentClassName="flex flex-col gap-4 h-full overflow-hidden"
            modalClassName="max-h-[90vh]"
            footerProps={{
                children: (
                    <p className="text-sm text-[var(--color-jerarquia3)] text-justify m-0 italic">
                        Consulte los catálogos disponibles y sus valores correspondientes.
                    </p>
                )
            }}
        >
            {/* Contenido principal con las tablas */}
            <div className="flex justify-center w-full flex-1 overflow-hidden">
                <ModalCatalogosContent />
            </div>

                        {/* ...existing code... */}
        </ReusableModal>
    );
};

export default CatalogosModal;