import React, { useState, useEffect, useRef } from "react";
import DefaultModalHeader from "./DefaultModalHeader";
import DefaultModalFooter from "./DefaultModalFooter";

// Definir los tamaños disponibles con responsive breakpoints
const MODAL_SIZES = {

    // Tamaños especiales para casos específicos con responsive
    metas: "w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[76vw]", // 76% viewport -> responsive
    ejecutivos: "w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[76vw]", // Modal ejecutivos igual a metas (personalizable)
    "metas-md": "w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw]", // Modal metas mediano responsive
    "metas-sm": "w-full max-w-[85vw] sm:max-w-[70vw] md:max-w-[60vw]", // Modal metas pequeño responsive
    productivity: "w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[76vw]", // Modal productividad 76% -> responsive
    catalogos: "w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[76vw]", // Modal catálogos 76% -> responsive
    validadores: "w-full max-w-[95vw] sm:max-w-[75vw] md:max-w-[35vw]", // Modal validadores 60% viewport -> responsive
    encargados: "w-full max-w-[95vw] sm:max-w-[75vw] md:max-w-[35vw]", // Modal encargados idéntico a validadores -> responsive
    historicos: "w-full max-w-[95vw] sm:max-w-[80vw] md:max-w-[45vw]", // Modal históricos 60% viewport -> responsive
    custom: ""  // Permite pasar tamaño personalizado en modalClassName
};

const ReusableModal = ({
    isOpen,
    onClose,
    title,
    icon,
    iconClassName = "",
    size = "lg",
    children,
    // Header personalizado
    showHeader = true,
    headerComponent: CustomHeader,
    headerProps = {},
    // Footer personalizado o por defecto
    showFooter = false,
    footerComponent: CustomFooter,
    footerProps = {},
    // Props específicas del footer por defecto
    onSave,
    saveText = "Guardar",
    cancelText = "Cancelar", 
    showSave = true,
    showCancel = true,
    saveDisabled = false,
    saveLoading = false,
    // Estilos y clases
    contentClassName = "",
    modalClassName = "",
    overlayClassName = "",
    // Animaciones y efectos
    enableBounce = false,
    enableShakeOnBackdropClick = false,
    enableBounceOnBackdropOrEscape = false,
    // Configuración del backdrop
    closeOnBackdropClick = true,
    backdropBlur = true,
    // Props adicionales
    ...props
}) => {
    // Estados para animaciones
    const [bounce, setBounce] = useState(false);
    const [shakeAnimation, setShakeAnimation] = useState(false);
    const modalRef = useRef(null);

    // Effect para animación de bounce al abrir
    useEffect(() => {
        if (enableBounce && isOpen) {
            setBounce(true);
            const timer = setTimeout(() => setBounce(false), 200);
            return () => clearTimeout(timer);
        }
    }, [enableBounce, isOpen]);

    // Handler para Escape (rebote si la prop está activa)
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (e.key === "Escape" && enableBounceOnBackdropOrEscape) {
                setBounce(true);
                setTimeout(() => setBounce(false), 200);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, enableBounceOnBackdropOrEscape]);

    // Si no está abierto, no renderizar nada
    if (!isOpen) return null;

    // Obtener la clase de tamaño correspondiente
    const sizeClass = MODAL_SIZES[size] || MODAL_SIZES.lg;

    // Handler para click en el backdrop
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            if (enableShakeOnBackdropClick) {
                setShakeAnimation(true);
                setTimeout(() => setShakeAnimation(false), 500);
            }
            if (enableBounceOnBackdropOrEscape) {
                setBounce(true);
                setTimeout(() => setBounce(false), 200);
            }
            if (closeOnBackdropClick && !enableShakeOnBackdropClick && !enableBounceOnBackdropOrEscape) {
                onClose();
            }
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[1000] 
                       p-2 sm:p-4 md:p-6 lg:p-8 ${overlayClassName || ''}`}
            style={{
                backgroundColor: "var(--color-modal-backdrop)",
                backdropFilter: backdropBlur ? "blur(5px)" : "none"
            }}
            onClick={handleBackdropClick}
            {...props}
        >
            {/* Modal Container con Grid Layout */}
            <div
                ref={modalRef}
                className={`bg-white rounded-lg sm:rounded-xl shadow-2xl 
                           ${sizeClass} 
                           max-h-[85vh] sm:max-h-[88vh] md:max-h-[90vh]
                           overflow-hidden 
                           transition-all duration-300 ease-out
                           grid grid-rows-[auto_1fr_auto]
                           modal-container
                           ${bounce ? 'animate-bounce-modal' : ''}
                           ${modalClassName}`}
            >
                {/* Header - Responsive con flex y grid */}
                {showHeader && (
                    <div className="flex-shrink-0">
                        {CustomHeader ? (
                            <CustomHeader onClose={onClose} {...headerProps} />
                        ) : (
                            <DefaultModalHeader
                                icon={icon}
                                title={title}
                                onClose={onClose}
                                iconClassName={iconClassName}
                                {...headerProps}
                            />
                        )}
                    </div>
                )}

                {/* Contenido del modal - Responsive con scroll mejorado y grid */}
                <div
                    className={`pt-1 pb-3 px-3 sm:pt-2 sm:pb-4 sm:px-4 md:pt-2 md:pb-6 md:px-6
                               overflow-y-auto overflow-x-hidden 
                               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                               hover:scrollbar-thumb-gray-400 transition-colors
                               flex-1 min-h-0
                               ${contentClassName}`}
                >
                    <div className="modal-content-grid">
                        {children}
                    </div>
                </div>

                {/* Footer opcional - Responsive y flexible */}
                {showFooter && (
                    <div className="flex-shrink-0">
                        {CustomFooter ? (
                            <CustomFooter {...footerProps} />
                        ) : (
                            <DefaultModalFooter 
                                onClose={onClose}
                                onSave={onSave}
                                saveText={saveText}
                                cancelText={cancelText}
                                showSave={showSave}
                                showCancel={showCancel}
                                saveDisabled={saveDisabled}
                                saveLoading={saveLoading}
                                {...footerProps} 
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Shake animation overlay */}
            <div 
                className={`${shakeAnimation ? 'animate-shake-modal' : ''}`}
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            />
        </div>
    );
};

export default ReusableModal;