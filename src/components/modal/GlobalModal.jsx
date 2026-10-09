import React, { useState, useEffect, useRef, useCallback } from "react";
import DefaultModalHeader from "./DefaultModalHeader";
import DefaultModalFooter from "./DefaultModalFooter";

const openModalStack = [];
let bodyLockCount = 0;
let previousBodyOverflow = "";

// Definir los tamaños disponibles con responsive breakpoints
const MODAL_SIZES = {
    lg: "w-full max-w-5xl",
    metas: "w-full max-w-[clamp(320px,92vw,1400px)] min-w-[clamp(220px,60vw,900px)]",
    ejecutivos: "w-full max-w-[clamp(320px,92vw,1400px)] min-w-[clamp(220px,60vw,900px)]",
    "metas-md": "w-full max-w-[clamp(280px,88vw,1100px)] min-w-[clamp(180px,50vw,700px)]",
    "metas-sm": "w-full max-w-[clamp(220px,80vw,700px)] min-w-[clamp(120px,40vw,400px)]",
    productivity: "w-full max-w-[clamp(320px,92vw,1400px)] min-w-[clamp(220px,60vw,900px)]",
    "day-executive": "w-full max-w-[clamp(760px,90vw,1180px)]",
    catalogos: "w-full max-w-[clamp(280px,88vw,1100px)] min-w-[clamp(180px,50vw,700px)]",
    validadores: "w-full max-w-[clamp(270px,84vw,900px)] min-w-[clamp(180px,45vw,500px)]",
    encargados: "w-full max-w-[clamp(260px,70vw,1000px)] min-w-[clamp(160px,30vw,350px)]",
    historicos: "w-full max-w-5xl",
    "historicos-inicial": "w-full max-w-5xl",
    custom: ""
};

const ReusableModal = ({
    isOpen,
    onClose,
    title,
    icon,
    iconClassName = "",
    size = "lg",
    mode = "standard",
    children,
    // Header personalizado
    showHeader = true,
    showCloseButton = true,
    headerComponent: CustomHeader,
    headerProps = {},
    customHeaderHasCloseButton = false,
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
    closeOnEscape = true,
    onBackdropClick,
    backdropBlur = false,
    // Props adicionales
    ...props
}) => {
    // Estados para animaciones
    const [bounce, setBounce] = useState(false);
    const [shakeAnimation, setShakeAnimation] = useState(false);
    const modalRef = useRef(null);
    const motionTimerRef = useRef({});

    const triggerMotion = useCallback((key, setMotion) => {
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
        clearTimeout(motionTimerRef.current[key]);
        setMotion(true);
        motionTimerRef.current[key] = setTimeout(() => setMotion(false), 300);
    }, []);

    useEffect(() => () => Object.values(motionTimerRef.current).forEach(clearTimeout), []);

    // Effect para animación de bounce al abrir
    useEffect(() => {
        if (enableBounce && isOpen) {
            triggerMotion("bounce", setBounce);
        }
    }, [enableBounce, isOpen, triggerMotion]);

    // Cerrar con Escape por defecto; las animaciones antiguas siguen siendo opcionales.
    useEffect(() => {
        if (!isOpen) return;
        const modalInstance = Symbol("modal");
        openModalStack.push(modalInstance);
        const handler = (e) => {
            if (e.key === "Escape" && openModalStack.at(-1) === modalInstance) {
                if (enableBounceOnBackdropOrEscape) {
                    triggerMotion("bounce", setBounce);
                }
                if (closeOnEscape) onClose?.();
            }
        };
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
            const index = openModalStack.indexOf(modalInstance);
            if (index !== -1) openModalStack.splice(index, 1);
        };
    }, [isOpen, enableBounceOnBackdropOrEscape, closeOnEscape, onClose, triggerMotion]);

    useEffect(() => {
        if (!isOpen) return undefined;
        if (bodyLockCount === 0) previousBodyOverflow = document.body.style.overflow;
        bodyLockCount += 1;
        document.body.style.overflow = "hidden";
        return () => {
            bodyLockCount = Math.max(0, bodyLockCount - 1);
            if (bodyLockCount === 0) document.body.style.overflow = previousBodyOverflow;
        };
    }, [isOpen]);

    // Si no está abierto, no renderizar nada
    if (!isOpen) return null;

    // Obtener la clase de tamaño correspondiente
    const sizeClass = MODAL_SIZES[size] || MODAL_SIZES.lg;
    const needsFloatingCloseButton = !showHeader || Boolean(CustomHeader && !customHeaderHasCloseButton && CustomHeader !== DefaultModalHeader);

    // Handler para click en el backdrop
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onBackdropClick?.(e);
            if (enableShakeOnBackdropClick) {
                triggerMotion("shake", setShakeAnimation);
            }
            if (enableBounceOnBackdropOrEscape) {
                triggerMotion("bounce", setBounce);
            }
            if (closeOnBackdropClick && !enableShakeOnBackdropClick && !enableBounceOnBackdropOrEscape) {
                onClose?.();
            }
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[1000] 
                       coorin-modal-backdrop-enter p-2 sm:p-4 md:p-6 lg:p-8 ${overlayClassName || ''}`}
            role="presentation"
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
                role="dialog"
                aria-modal="true"
                aria-label={title || "Ventana de diálogo"}
                className={mode === "content" ? `coorin-modal-enter relative inline-flex max-h-[calc(100dvh-1rem)] max-w-[calc(100vw-1rem)] items-center justify-center ${bounce ? 'animate-bounce-modal' : ''} ${shakeAnimation ? 'animate-shake-modal' : ''} ${modalClassName}` : `coorin-modal-enter
                           bg-[var(--color-surface-modal)]
                           text-[var(--color-text-primary)] border border-[var(--color-border)]
                           rounded-lg sm:rounded-xl shadow-2xl
                           ${sizeClass}
                           ${size === 'historicos' ? 'grid grid-rows-[auto_1fr_auto]' : ''}
                           ${size === 'historicos-inicial' ? 'grid grid-cols-1 sm:grid-cols-1' : ''}
                           ${size === 'historicos' || size === 'historicos-inicial' ? '' : 'max-h-[clamp(320px,80vh,700px)] min-h-[clamp(220px,40vh,400px)]'}
                           overflow-hidden
                           transition-colors duration-200 ease-out
                           modal-container
                           ${bounce ? 'animate-bounce-modal' : ''}
                           ${shakeAnimation ? 'animate-shake-modal' : ''}
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
                                showCloseButton={showCloseButton}
                                iconClassName={iconClassName}
                                {...headerProps}
                            />
                        )}
                    </div>
                )}

                {showCloseButton && needsFloatingCloseButton && (
                    <button
                        type="button"
                        onClick={() => onClose?.()}
                        aria-label="Cerrar modal"
                        className="absolute right-2 top-2 z-10 inline-flex size-9 items-center justify-center rounded-lg text-2xl text-muted-foreground transition-colors hover:bg-surface-secondary hover:text-destructive focus:outline-none focus:ring-2 focus:ring-jerarquia2"
                    >
                        ×
                    </button>
                )}

                {/* Contenido del modal - Responsive con scroll mejorado y grid */}
                {mode === "content" ? children : (
                    <div
                        className={`pt-1 pb-3 px-3 sm:pt-2 sm:pb-4 sm:px-4 md:pt-2 md:pb-6 md:px-6
                                   modal-scroll-body overflow-y-auto overflow-x-auto
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
                {mode !== "content" && showFooter && (
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

        </div>
    );
};

export default ReusableModal;
