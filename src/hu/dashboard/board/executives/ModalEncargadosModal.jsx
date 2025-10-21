import React, { useCallback } from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalEncargadosContent from "./ModalEncargadosContent";
import { IconEncargados } from "./IconesEjecutives";

const EncargadosModal = ({ 
    isOpen, 
    onClose,
    enableBounce = false,
    enableShakeOnBackdropClick = true,
    enableBounceOnBackdropOrEscape = true,
    closeOnBackdropClick = false,
    ...props 
}) => {
    // Función para manejar cambios en los datos del footer si necesario
    const handleFooterDataChange = useCallback((data) => {
        // Por ahora no necesitamos manejar cambios del footer
        console.log("Footer data changed:", data);
    }, []);


    // Footer personalizado con mensaje informativo
    const CustomFooter = () => (
        <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                       bg-gray-50 border-t border-gray-200 flex-shrink-0">
            <p className="text-sm text-justify m-0 italic"
               style={{ color: "var(--color-jerarquia3)" }}>
                Palomee los Ejecutivos que desee pasar a otro encargado y presione Cambiar.
            </p>
        </div>
    );

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="encargados"
            showHeader={true}
            title="Cambio Encargado - Coorin"
            icon={IconEncargados}
            iconClassName="text-jerarquia3"
            headerProps={{ titleClassName: "text-jerarquia3" }}
            footerComponent={CustomFooter}
            showFooter={true}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="flex flex-col gap-4 h-full !overflow-hidden"
            modalClassName="border-0 shadow-2xl h-[60vh] overflow-hidden"
            {...props}
        >
            {/* Contenido principal con filtros */}
            <div className="flex justify-center w-full flex-1 overflow-hidden">
                <ModalEncargadosContent 
                    onFooterDataChange={handleFooterDataChange}
                />
            </div>

                        {/* ...existing code... */}
        </ReusableModal>
    );
};

export default EncargadosModal;