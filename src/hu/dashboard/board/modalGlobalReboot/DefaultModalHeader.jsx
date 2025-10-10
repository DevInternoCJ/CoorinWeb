import React from "react";

const DefaultModalHeader = ({
    title,
    icon: Icon,
    onClose,
    showCloseButton = true,
    children,
    className = "",
    titleClassName = "",
    iconClassName = "",
    closeButtonClassName = "",
    ...props
}) => {
    // Si se pasan children, usar esos en lugar del header por defecto
    if (children) {
        return (
            <div className={`px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                            bg-white border-b border-gray-200 
                            ${className}`} {...props}>
                {children}
            </div>
        );
    }

    // Header por defecto con título, ícono y botón de cerrar
    return (
        <div className={`px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                         bg-white border-b border-gray-200 
                         flex items-center justify-between 
                         gap-3 ${className}`} {...props}>
            
            {/* Sección izquierda: Ícono y título */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {Icon && (
                    <Icon 
                        className={`size-5 sm:size-6 flex-shrink-0 text-gray-600 ${iconClassName}`}
                    />
                )}
                {title && (
                    <div className="min-w-0">
                        <h2 className={`text-base sm:text-lg md:text-xl font-semibold 
                                       text-gray-900 
                                       truncate sm:whitespace-normal
                                       leading-tight ${titleClassName}`}>
                            {title}
                        </h2>
                    </div>
                )}
            </div>
            
            {/* Botón de cerrar */}
            {showCloseButton && onClose && (
                <div className="flex-shrink-0">
                    <button
                        onClick={onClose}
                        className={`text-gray-400 hover:text-gray-600 
                                   transition-colors duration-200 
                                   rounded-full p-1 sm:p-1.5
                                   hover:bg-gray-100 focus:bg-gray-100
                                   focus:outline-none focus:ring-2 focus:ring-blue-300
                                   ${closeButtonClassName}`}
                        style={{ fontSize: "1.25rem", lineHeight: 1 }}
                        aria-label="Cerrar modal"
                    >
                        <svg 
                            className="w-5 h-5 sm:w-6 sm:h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DefaultModalHeader;