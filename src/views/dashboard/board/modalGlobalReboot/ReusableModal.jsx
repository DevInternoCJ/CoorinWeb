import React, { useState, useEffect, useRef } from "react";
import DefaultModalHeader from "./DefaultModalHeader";
import DefaultModalFooter from "./DefaultModalFooter";

// Definir los tamaños disponibles con responsive breakpoints
const MODAL_SIZES = {
    metas: "w-full max-w-[clamp(320px,92vw,1400px)] min-w-[clamp(220px,60vw,900px)]",
    ejecutivos: "w-full max-w-[clamp(320px,92vw,1400px)] min-w-[clamp(220px,60vw,900px)]",
    "metas-md": "w-full max-w-[clamp(280px,88vw,1100px)] min-w-[clamp(180px,50vw,700px)]",
    "metas-sm": "w-full max-w-[clamp(220px,80vw,700px)] min-w-[clamp(120px,40vw,400px)]",
    productivity: "w-full max-w-[clamp(320px,92vw,1400px)] min-w-[clamp(220px,60vw,900px)]",
    catalogos: "w-full max-w-[clamp(280px,88vw,1100px)] min-w-[clamp(180px,50vw,700px)]",
    validadores: "w-full max-w-[clamp(270px,84vw,900px)] min-w-[clamp(180px,45vw,500px)]",
    encargados: "w-full max-w-[clamp(260px,70vw,1000px)] min-w-[clamp(160px,30vw,350px)]",
    historicos: "w-5xl h-[35vh] max-h-[80vh]",
    "historicos-inicial": " w-5xl h-[50vh] max-h-[80vh] pb-3",
    custom: ""
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
                className={`
                           bg-[var(--color-surface-modal)]
                           dark:border dark:border-[var(--color-border)]
                           rounded-lg sm:rounded-xl shadow-2xl
                           ${sizeClass}
                           ${size === 'historicos' ? 'grid grid-rows-[auto_1fr_auto]' : ''}
                           ${size === 'historicos-inicial' ? 'grid grid-cols-1 sm:grid-cols-1' : ''}
                           ${size === 'historicos' || size === 'historicos-inicial' ? '' : 'max-h-[clamp(320px,80vh,700px)] min-h-[clamp(220px,40vh,400px)]'}
                           overflow-hidden
                           transition-all duration-300 ease-out
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
                {size === 'historicos-inicial' ? (
                    <div className={contentClassName}>
                        {children}
                    </div>
                ) : (
                    <div
                        className={`pt-1 pb-3 px-3 sm:pt-2 sm:pb-4 sm:px-4 md:pt-2 md:pb-6 md:px-6
                                   overflow-y-auto overflow-x-hidden max-h-[70vh]
                                   scrollbar-thin
                                   scrollbar-thumb-[var(--color-scrollbar-thumb)]
                                   scrollbar-track-[var(--color-scrollbar-track)]
                                   hover:scrollbar-thumb-[var(--color-jerarquia2)]
                                   transition-colors
                                   flex-1 min-h-0
                                   ${contentClassName}`}
                    >
                        <div className="modal-content-grid">
                            {children}
                        </div>
                    </div>
                )}

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