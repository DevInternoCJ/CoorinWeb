import React, { useState, useCallback } from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalValidadoresContent from "./ModalValidadoresContent";
import { IconValidadores } from "./IconesEjecutives";

const ValidadoresModal = ({ 
    isOpen, 
    onClose,
    enableBounce = true,
    enableShakeOnBackdropClick = true,
    closeOnBackdropClick = false,
    ...props 
}) => {
    // Estados para el footer dinámico
    const [footerData, setFooterData] = useState({
        lastAction: null,
        lastUser: null,
        producto: "",
        arrepentimientos: false,
        isProcessingChange: false
    });

    // Función para manejar cambios en los datos del footer
    const handleFooterDataChange = useCallback((data) => {
        setFooterData(data);
    }, []);

    // Header personalizado con estilos verdes usando DefaultModalHeader structure
    const CustomHeader = ({ onClose }) => (
        <div className="px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                       bg-white border-b-2 flex items-center justify-between gap-3"
             style={{ borderColor: "var(--color-jerarquia1)" }}>
            {/* Sección izquierda: Ícono y título */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <IconValidadores 
                    className="size-5 sm:size-6 flex-shrink-0"
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <div className="min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold truncate sm:whitespace-normal leading-tight"
                        style={{ color: "var(--color-jerarquia3)" }}>
                        Validadores - Coorin
                    </h2>
                </div>
            </div>
            
            {/* Botón de cerrar */}
            <div className="flex-shrink-0">
                <button
                    onClick={onClose}
                    className="transition-colors duration-200 rounded-full p-1 sm:p-1.5 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                    style={{ color: "var(--color-jerarquia3)", fontSize: "1.5rem", lineHeight: 1 }}
                    onMouseEnter={(e) => e.target.style.color = "#dc2626"}
                    onMouseLeave={(e) => e.target.style.color = "var(--color-jerarquia3)"}
                    aria-label="Cerrar"
                >
                    &times;
                </button>
            </div>
        </div>
    );

    // Footer personalizado con mensaje dinámico
    const CustomFooter = () => {
        // Función para determinar el mensaje a mostrar
        const getMessage = () => {
            // Si no hay producto seleccionado
            if (!footerData.producto) {
                return "Selecciona un producto primero para gestionar validadores.";
            }
            
            // Si se está procesando un cambio
            if (footerData.isProcessingChange) {
                return "Procesando cambio de validador...";
            }
            
            // Determinar el tipo de validador
            const tipoValidador = footerData.arrepentimientos ? "validador de arrepentimientos" : "validador";
            
            // Si hay una acción reciente
            if (footerData.lastAction && footerData.lastUser) {
                if (footerData.lastAction === 'added') {
                    return `Se dio de alta al ${tipoValidador}: ${footerData.lastUser}`;
                } else if (footerData.lastAction === 'removed') {
                    return `Se dio de baja al ${tipoValidador}: ${footerData.lastUser}`;
                }
            }
            
            // Mensaje por defecto según el tipo de validador
            const tipoActual = footerData.arrepentimientos ? "Validadores de Arrepentimientos" : "Validadores";
            return `${tipoActual}. Selecciona usuarios para asignar o quitar como validadores.`;
        };

        return (
            <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                           bg-gray-50 border-t border-gray-200 flex-shrink-0">
                <p className="text-sm text-justify m-0 italic"
                   style={{ color: "var(--color-jerarquia3)" }}>
                    {getMessage()}
                </p>
            </div>
        );
    };

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="validadores"
            headerComponent={CustomHeader}
            footerComponent={CustomFooter}
            showHeader={true}
            showFooter={true}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="flex flex-col gap-4 h-full !overflow-hidden"
            modalClassName="border-0 shadow-2xl h-[60vh] overflow-hidden"
            overlayClassName="modal-blur-bg"
            {...props}
        >
            {/* Contenido principal con filtros */}
            <div className="flex justify-center w-full flex-1 overflow-hidden">
                <ModalValidadoresContent 
                    onFooterDataChange={handleFooterDataChange}
                />
            </div>

            {/* Agregar estilos específicos del modal de validadores */}
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

export default ValidadoresModal;