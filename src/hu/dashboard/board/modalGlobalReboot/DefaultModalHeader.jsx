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
    <div className={`px-3 pt-4 pb-1 sm:px-4 sm:pt-5 sm:pb-2 md:px-6 md:pt-6 md:pb-2 
             bg-white border-b border-gray-200 
             flex items-center justify-between 
             gap-3 ${className}`} {...props}>
            
            {/* Sección izquierda: Ícono y título */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {Icon && (
                    <Icon 
                        className={`size-5 sm:size-6 flex-shrink-0 ${iconClassName}`}
                        style={{ color: iconClassName?.includes('#147f5e') ? '#147f5e' : undefined }}
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
            {showCloseButton && (
                <div className="flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                        aria-label="Cerrar modal"
                        type="button"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default DefaultModalHeader;