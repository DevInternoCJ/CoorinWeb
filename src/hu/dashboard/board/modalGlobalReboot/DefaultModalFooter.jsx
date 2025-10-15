import React from "react";

const DefaultModalFooter = ({
    onClose,
    onSave,
    saveText = "Guardar",
    cancelText = "Cancelar",
    showSave = true,
    showCancel = true,
    saveDisabled = false,
    saveLoading = false,
    children,
    className = "",
    ...props
}) => {
    // Si se pasan children, usar esos en lugar de los botones por defecto
    if (children) {
        return (
            <div className={`px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                            bg-gray-50 border-t border-gray-200 
                            ${className}`} {...props}>
                {children}
            </div>
        );
    }

    // Footer por defecto con botones responsive
    return (
        <div className={`px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                         bg-gray-50 border-t border-gray-200 
                         flex flex-col sm:flex-row 
                         justify-end items-stretch sm:items-center 
                         gap-2 sm:gap-3 ${className}`} {...props}>
            {showCancel && (
                <button
                    onClick={onClose}
                    className="px-3 py-2 sm:px-4 sm:py-2 
                             text-sm sm:text-base
                             text-gray-700 bg-white border border-gray-300 
                             rounded-md hover:bg-gray-50 transition-colors
                             w-full sm:w-auto min-w-[100px]"
                >
                    {cancelText}
                </button>
            )}
            {showSave && (
                <button
                    onClick={onSave}
                    disabled={saveDisabled || saveLoading}
                    className={`px-3 py-2 sm:px-4 sm:py-2 
                               text-sm sm:text-base
                               text-white rounded-md transition-colors
                               w-full sm:w-auto min-w-[100px]
                               ${saveDisabled || saveLoading
                                   ? 'bg-gray-400 cursor-not-allowed'
                                   : 'bg-blue-500 hover:bg-blue-600'
                               }`}
                >
                    {saveLoading ? (
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Guardando...</span>
                        </div>
                    ) : (
                        saveText
                    )}
                </button>
            )}
        </div>
    );
};

export default DefaultModalFooter;