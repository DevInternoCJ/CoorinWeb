import React, { useState, useCallback } from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalValidadoresContent from "./ModalValidadoresContent";
import { IconValidadores } from "./IconesEjecutives";

const ValidadoresModal = ({ 
    isOpen, 
    onClose,
    enableBounce = false,
    enableShakeOnBackdropClick = true,
    enableBounceOnBackdropOrEscape = true,
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
            showHeader={true}
            title="Validadores - Coorin"
            icon={IconValidadores}
            iconClassName="text-jerarquia3"
            headerProps={{ titleClassName: "text-jerarquia3" }}
            footerComponent={CustomFooter}
            showFooter={true}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="flex flex-col gap-4 h-full"
            modalClassName="border-0 shadow-2xl h-[60vh] overflow-hidden"
            {...props}
        >
            {/* Contenido principal con filtros */}
            <div className="flex justify-center w-full flex-1 overflow-hidden">
                <ModalValidadoresContent 
                    onFooterDataChange={handleFooterDataChange}
                />
            </div>

                        {/* ...existing code... */}
        </ReusableModal>
    );
};

export default ValidadoresModal;