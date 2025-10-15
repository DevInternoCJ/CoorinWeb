import React from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalCatalogosContent from "./ModalCatalogosContent";
import { IconCatalogos } from "./IconesEjecutives";

const CatalogosModal = ({ isOpen, onClose }) => {
    // Header personalizado con estilos verdes
    const CustomHeader = ({ onClose }) => (
        <div className="px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                       bg-white border-b-2 flex items-center justify-between gap-3"
             style={{ borderColor: "var(--color-jerarquia1)" }}>
            {/* Sección izquierda: Ícono y título */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <IconCatalogos 
                    className="size-5 sm:size-6 flex-shrink-0"
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <div className="min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold truncate sm:whitespace-normal leading-tight"
                        style={{ color: "var(--color-jerarquia3)" }}>
                        Catálogos - Coorin
                    </h2>
                </div>
            </div>
            
            {/* Botón de cerrar */}
            <div className="flex-shrink-0">
                <button
                    onClick={onClose}
                    className="transition-colors duration-200 rounded-full p-1 sm:p-1.5 hover:bg-red-50 focus:bg-red-50 text-2xl leading-none"
                    style={{ color: "var(--color-jerarquia3)" }}
                    onMouseEnter={(e) => e.target.style.color = "#dc2626"}
                    onMouseLeave={(e) => e.target.style.color = "var(--color-jerarquia3)"}
                    aria-label="Cerrar"
                >
                    ×
                </button>
            </div>
        </div>
    );

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="catalogos"
            headerComponent={CustomHeader}
            showHeader={true}
            showFooter={true}
            contentClassName="flex flex-col gap-4 h-full overflow-hidden"
            modalClassName="max-h-[90vh]"
            // Footer con mensaje informativo usando children
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

            {/* Agregar estilos específicos del modal de catálogos */}
            <style jsx global>{`
                /* Estilo personalizado para el backdrop del modal - transparente con blur suave */
                .modal-blur-bg {
                  background: rgba(255, 255, 255, 0.15) !important;
                  backdrop-filter: blur(6px) saturate(180%) !important;
                  -webkit-backdrop-filter: blur(6px) saturate(180%) !important;
                  animation: fadeInBackdrop 0.3s ease-out;
                }
                
                /* Animación suave para la aparición del backdrop */
                @keyframes fadeInBackdrop {
                  from {
                    background: rgba(255, 255, 255, 0);
                    backdrop-filter: blur(0px);
                    -webkit-backdrop-filter: blur(0px);
                  }
                  to {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(6px) saturate(180%);
                    -webkit-backdrop-filter: blur(6px) saturate(180%);
                  }
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

export default CatalogosModal;