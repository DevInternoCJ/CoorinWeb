import React, { useCallback } from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalEncargadosContent from "./ModalEncargadosContent";
import { IconEncargados } from "./IconesEjecutives";

const EncargadosModal = ({ 
    isOpen, 
    onClose,
    enableBounce = true,
    enableShakeOnBackdropClick = true,
    closeOnBackdropClick = false,
    ...props 
}) => {
    // Función para manejar cambios en los datos del footer si necesario
    const handleFooterDataChange = useCallback((data) => {
        // Por ahora no necesitamos manejar cambios del footer
        console.log("Footer data changed:", data);
    }, []);

    // Header personalizado con estilos verdes usando DefaultModalHeader structure
    const CustomHeader = ({ onClose }) => (
        <div className="px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                       bg-white border-b-2 flex items-center justify-between gap-3"
             style={{ borderColor: "var(--color-jerarquia1)" }}>
            {/* Sección izquierda: Ícono y título */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <IconEncargados 
                    className="size-5 sm:size-6 flex-shrink-0"
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <div className="min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold truncate sm:whitespace-normal leading-tight"
                        style={{ color: "var(--color-jerarquia3)" }}>
                        Cambio Encargado - Coorin
                    </h2>
                </div>
            </div>
            
            {/* Botón de cerrar */}
            <div className="flex-shrink-0">
                <button
                    onClick={onClose}
                    className="text-2xl sm:text-3xl font-bold leading-none hover:text-red-600 
                             transition-colors duration-200 rounded-full w-6 h-6 sm:w-8 sm:h-8 
                             flex items-center justify-center hover:bg-gray-100"
                    style={{ color: "var(--color-jerarquia3)" }}
                    aria-label="Cerrar modal"
                >
                    ×
                </button>
            </div>
        </div>
    );

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
            size="encargados" // Tamaño específico para EncargadosModal
            headerComponent={CustomHeader}
            footerComponent={CustomFooter}
            showHeader={true}
            showFooter={true}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
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

            {/* Agregar estilos específicos del modal de encargados */}
            <style jsx global>{`
                /* Forzar scroll solo en el contenedor de la jerarquía */
                .scrollbar-gray {
                  overflow-y: auto !important;
                  overflow-x: hidden !important;
                  max-height: 50vh !important;
                  height: 50vh !important;
                }
                
                .scrollbar-gray::-webkit-scrollbar {
                  height: 8px;
                  width: 8px;
                  background: #f5f5f5;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb {
                  background: #b0b0b0;
                  border-radius: 4px;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                  background: #888;
                }
            `}</style>
        </ReusableModal>
    );
};

export default EncargadosModal;