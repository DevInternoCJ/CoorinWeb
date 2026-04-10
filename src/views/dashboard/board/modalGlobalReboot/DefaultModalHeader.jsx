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
    validadoresCounter,
    arrepentimientosCheckbox,
    nodoEjecutivoHeader,
    ...props
}) => {
    // Si se pasan children, usar esos en lugar del header por defecto
    if (children) {
        return (
            <div className={`px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4
                            bg-[var(--color-surface-modal)] border-b border-[var(--color-border)]
                            transition-colors duration-300
                            ${className}`} {...props}>
                {title && (
                    <div className="flex items-center gap-2 mb-2">
                        {Icon && (
                            <Icon className={`size-5 sm:size-6 flex-shrink-0 text-jerarquia3 ${iconClassName}`} />
                        )}
                        <h2 className={`text-base sm:text-lg md:text-xl font-semibold text-[var(--color-text-primary)] truncate sm:whitespace-normal leading-tight ${titleClassName}`}>{title}</h2>
                    </div>
                )}
                {children}
            </div>
        );
    }

    return (
        <>
            <div className={`px-3 pt-4 pb-1 sm:px-4 sm:pt-5 sm:pb-2 md:px-6 md:pt-6 md:pb-2
                            bg-[var(--color-surface-modal)] border-b border-[var(--color-border)]
                            transition-colors duration-300
                            w-full ${className}`}
                 {...Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'carteraSelector'))}>
                {/* Fila principal: título/ícono a la izquierda, dropdowns a la derecha, botón cerrar extremo derecho */}
                <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between relative gap-2">
                    {/* Título, ícono y dropdowns en la misma fila */}
                    <div className="flex flex-col w-full lg:flex-row lg:items-center lg:gap-4">
                        <div className="flex items-center gap-2 min-w-0 lg:flex-shrink-0">
                            {Icon && (
                                <Icon className={`size-5 sm:size-6 flex-shrink-0 text-jerarquia3 ${iconClassName}`} />
                            )}
                            {title && (
                                <div className="min-w-0">
                                    <h2 className={`text-base sm:text-lg md:text-xl font-semibold text-[var(--color-text-primary)] truncate sm:whitespace-normal leading-tight ${titleClassName}`}>{title}</h2>
                                </div>
                            )}
                        </div>
                        {/* Dropdowns alineados a la derecha del título */}
                        <div className={`w-full mt-2 lg:mt-0 ${props.radioButtons ? 'grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-1 lg:flex lg:flex-row lg:gap-4 lg:w-auto lg:items-center' : 'flex flex-col gap-2 lg:flex-row lg:gap-4 lg:w-auto lg:items-center'}`}>
                            {props.carteraSelector && (
                                <div className="w-full">{props.carteraSelector}</div>
                            )}
                            {props.productoSelector && (
                                <div className="w-full">{props.productoSelector}</div>
                            )}
                            {props.radioButtons && (
                                <div className="w-full">{props.radioButtons}</div>
                            )}
                            {props.encargadoSelector && (
                                <div className="w-full">{props.encargadoSelector}</div>
                            )}
                            {/* Checkbox solo en mobile debajo de producto */}
                            {arrepentimientosCheckbox && (
                                <div className="w-full flex justify-center lg:hidden">{arrepentimientosCheckbox}</div>
                            )}
                        </div>
                    </div>
                    {/* Botón cerrar */}
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="absolute right-0 top-0 text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors lg:static lg:ml-4"
                            aria-label="Cerrar modal"
                            type="button"
                        >
                            &times;
                        </button>
                    )}
                </div>
                {/* Fila secundaria: solo en desktop, contador, nodo ejecutivo, checkbox */}
                <div className="grid grid-cols-1 gap-2 w-full mt-2 lg:grid-cols-3 lg:gap-4 lg:items-center">
                    {/* Contador de encargados para modales de encargados */}
                    {props.contadorEncargados && (
                        <div className="w-full flex justify-center lg:justify-start lg:flex">
                            {React.isValidElement(props.contadorEncargados)
                                ? props.contadorEncargados
                                : (typeof props.contadorEncargados === 'object' && props.contadorEncargados !== null
                                    ? (
                                        <span className="font-semibold text-jerarquia3 text-base">
                                            Encargados ({props.contadorEncargados.asignados ?? 0} / {props.contadorEncargados.total ?? 0})
                                        </span>
                                    )
                                    : props.contadorEncargados)
                            }
                        </div>
                    )}
                    {/* Contador de validadores para modales de validadores */}
                    {validadoresCounter && (
                        <div className="w-full flex justify-center lg:justify-start lg:flex">{validadoresCounter}</div>
                    )}
                    {props.cambiarButton && (
                        <div className="w-full flex justify-center">{props.cambiarButton}</div>
                    )}
                    {nodoEjecutivoHeader && (
                        <div className="w-full flex justify-center">{nodoEjecutivoHeader}</div>
                    )}
                    {/* Checkbox solo en desktop */}
                    {arrepentimientosCheckbox && (
                        <div className="w-full hidden lg:flex justify-end">{arrepentimientosCheckbox}</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DefaultModalHeader;