import React, { useState, useEffect, useRef } from "react";
import DefaultModalHeader from "./DefaultModalHeader";
import DefaultModalFooter from "./DefaultModalFooter";

// Definir los tamaños disponibles con responsive breakpoints
const MODAL_SIZES = {
    xs: "w-full max-w-sm sm:max-w-md",     // 384px -> responsive
    sm: "w-full max-w-md sm:max-w-lg",     // 448px -> responsive  
    md: "w-full max-w-lg sm:max-w-xl",     // 512px -> responsive
    lg: "w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[76vw]", // 76% viewport -> responsive
    xl: "w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[80vw]", // 80% viewport -> responsive
    "2xl": "w-full max-w-4xl sm:max-w-5xl", // 896px -> responsive
    "3xl": "w-full max-w-5xl sm:max-w-6xl", // 1152px -> responsive
    "4xl": "w-full max-w-6xl sm:max-w-7xl", // 1280px -> responsive
    full: "w-full max-w-full",  // 100% -> responsive
    // Tamaños especiales para casos específicos con responsive
    metas: "w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[76vw]", // 76% viewport -> responsive
    "metas-md": "w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw]", // Modal metas mediano responsive
    "metas-sm": "w-full max-w-[85vw] sm:max-w-[70vw] md:max-w-[60vw]", // Modal metas pequeño responsive
    productivity: "w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[76vw]", // Modal productividad 76% -> responsive
    catalogos: "w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[76vw]", // Modal catálogos 76% -> responsive
    validadores: "w-full max-w-[95vw] sm:max-w-[75vw] md:max-w-[35vw]", // Modal validadores 60% viewport -> responsive
    custom: ""  // Permite pasar tamaño personalizado en modalClassName
};

const ReusableModal = ({
    isOpen,
    onClose,
    title,
    icon,
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
        if (enableBounce) {
            setBounce(true);
            const timer = setTimeout(() => setBounce(false), 200);
            return () => clearTimeout(timer);
        }
    }, [enableBounce]);

    // Si no está abierto, no renderizar nada
    if (!isOpen) return null;

    // Obtener la clase de tamaño correspondiente
    const sizeClass = MODAL_SIZES[size] || MODAL_SIZES.lg;

    // Handler para click en el backdrop
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            if (enableShakeOnBackdropClick) {
                // Activar animación de shake en lugar de cerrar
                setShakeAnimation(true);
                setTimeout(() => setShakeAnimation(false), 500);
            } else if (closeOnBackdropClick) {
                onClose();
            }
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[1000] 
                       p-2 sm:p-4 md:p-6 lg:p-8 ${overlayClassName || ''}`}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
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
                           transform transition-all duration-300 ease-out
                           grid grid-rows-[auto_1fr_auto]
                           modal-container
                           ${modalClassName}`}
                style={{
                    transform: bounce ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.2s ease-out",
                }}
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
                                {...headerProps}
                            />
                        )}
                    </div>
                )}

                {/* Contenido del modal - Responsive con scroll mejorado y grid */}
                <div
                    className={`p-3 sm:p-4 md:p-6 
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

                {/* Estilos CSS para animaciones y scroll personalizado */}
                <style jsx>{`
                    @keyframes shake-modal {
                        0% { transform: scale(1); }
                        20% { transform: scale(1.05, 0.95); }
                        40% { transform: scale(0.95, 1.05); }
                        60% { transform: scale(1.03, 0.97); }
                        80% { transform: scale(0.97, 1.03); }
                        100% { transform: scale(1); }
                    }
                    
                    .animate-shake-modal {
                        animation: shake-modal 0.5s;
                    }

                    /* Scroll personalizado para el modal */
                    .scrollbar-thin::-webkit-scrollbar {
                        width: 6px;
                    }
                    
                    .scrollbar-thin::-webkit-scrollbar-track {
                        background: #f1f5f9;
                        border-radius: 10px;
                    }
                    
                    .scrollbar-thin::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 10px;
                        transition: background-color 0.2s ease;
                    }
                    
                    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }

                    /* Responsive grid adaptations */
                    .modal-content-grid {
                        display: grid;
                        gap: 0.75rem;
                        grid-template-columns: 1fr;
                    }
                    
                    @media (min-width: 641px) {
                        .modal-content-grid {
                            gap: 1rem;
                            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        }
                    }
                    
                    @media (min-width: 1025px) {
                        .modal-content-grid {
                            gap: 1.5rem;
                            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        }
                    }

                    /* Smooth animations for responsive changes */
                    .modal-container {
                        transition: width 0.3s ease, height 0.3s ease, padding 0.3s ease;
                    }

                    /* Focus management for accessibility */
                    .modal-container:focus-within {
                        outline: 2px solid #3b82f6;
                        outline-offset: 2px;
                    }

                    /* Responsive padding adjustments */
                    @media (max-width: 640px) {
                        .modal-container {
                            margin: 0.5rem;
                        }
                    }
                    
                    @media (min-width: 641px) and (max-width: 1024px) {
                        .modal-container {
                            margin: 1rem;
                        }
                    }
                    
                    @media (min-width: 1025px) {
                        .modal-container {
                            margin: 2rem;
                        }
                    }
                `}</style>
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