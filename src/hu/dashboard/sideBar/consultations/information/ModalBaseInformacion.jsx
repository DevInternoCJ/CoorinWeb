
import React, { useRef } from "react";
import ModalBase from "../../../board/ModalBase";

// Tamaños tipo ReusableModal
const MODAL_SIZES = {
    xs: { maxWidth: "384px", minWidth: "320px", width: "100%" },
    sm: { maxWidth: "448px", minWidth: "340px", width: "100%" },
    md: { maxWidth: "512px", minWidth: "380px", width: "100%" },
    lg: { maxWidth: "76vw", minWidth: "40vw", width: "100%" },
    xl: { maxWidth: "80vw", minWidth: "50vw", width: "100%" },
    pagos: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    "pagos-xl": { maxWidth: "1104px", minWidth: "828px", height: "760px" },
    listaNegra: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    arrepentimientos: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    datosErroneos: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    domicilios: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    correos: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    busquedas: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    ofrecimientos: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    comentarios: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    vgp: { maxWidth: "644px", minWidth: "483px", width: "483px", height: "506px", maxHeight: "506px" },
    custom: {},
};

const ModalBaseInformacion = ({
    onClose,
    tipoInformacion,
    children,
    size = "lg", // Nuevo: tamaño tipo ReusableModal
    modalStyle = {}, // Permite override de estilos
    headerComponent: CustomHeader,
    headerProps = {},
    showHeader = true,
    footerComponent: CustomFooter,
    footerProps = {},
    showFooter = false,
    contentClassName = "",
    modalClassName = "",
    overlayClassName = "",
    enableBounce = true,
    closeOnBackdropClick = true,
    backdropBlur = true,
    ...props
}) => {
    const modalRef = useRef(null);
    const { bounce } = ModalBase.useModalLogic();

    // Títulos
    const titulos = {
        "Lista Negra": "Lista Negra",
        "Arrepentimientos": "Arrepentimientos",
        "Pagos": "Pagos",
        "Pagos reportados": "Pagos Reportados",
        "Datos Erroneos": "Datos Erróneos",
        "Domicilios": "Domicilios",
        "Correos": "Correos",
        "Búsquedas": "Búsquedas",
        "Ofrecimientos": "Ofrecimientos",
        "Comentarios": "Comentarios",
        "VGP": "VGP"
    };
    const titulo = titulos[tipoInformacion] || "Información";

    // Estilo responsive y override
    // Normaliza el nombre del tipo para buscar el tamaño correcto
    let normalizedSize = size;
    if (!size || size === 'lg') {
        // Si no se pasa size, usar el nombre del tipo
        switch (tipoInformacion) {
            case "Lista Negra": normalizedSize = "listaNegra"; break;
            case "Arrepentimientos": normalizedSize = "arrepentimientos"; break;
            case "Pagos": normalizedSize = "pagos"; break;
            case "Pagos reportados": normalizedSize = "pagos"; break;
            case "Datos Erroneos": normalizedSize = "datosErroneos"; break;
            case "Domicilios": normalizedSize = "domicilios"; break;
            case "Correos": normalizedSize = "correos"; break;
            case "Búsquedas": normalizedSize = "busquedas"; break;
            case "Ofrecimientos": normalizedSize = "ofrecimientos"; break;
            case "Comentarios": normalizedSize = "comentarios"; break;
            case "VGP": normalizedSize = "vgp"; break;
            default: normalizedSize = size;
        }
    }
    let defaultModalStyle = MODAL_SIZES[normalizedSize] || MODAL_SIZES.lg;
    const mergedModalStyle = { ...defaultModalStyle, ...modalStyle };

    // Backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
            onClose();
        }
    };

        return (
            <div className="modal-blur-bg">
                <div
                    className={`modal-overlay ${overlayClassName}`}
                    onClick={handleBackdropClick}
                />
                <div
                    ref={modalRef}
                    className={`modal-content modal-xl-container bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col ${modalClassName} ${bounce && enableBounce ? "animate-bounce-modal" : ""}`}
                    style={mergedModalStyle}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header reusabilidad máxima */}
                    {showHeader && (
                        CustomHeader ? (
                            <CustomHeader onClose={onClose} {...headerProps} />
                        ) : (
                            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">{titulo}</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 rounded-full p-1.5 ml-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    aria-label="Cerrar"
                                    type="button"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )
                    )}

                    {/* Contenido */}
                    <div className={`flex-1 w-full overflow-auto ${contentClassName}`}>{children}</div>

                    {/* Footer reusabilidad máxima */}
                    {showFooter && (
                        CustomFooter ? (
                            <CustomFooter {...footerProps} />
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                                <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">Cerrar</button>
                            </div>
                        )
                    )}

                    {/* Animación bounce */}
                    <style>{`
                        @keyframes bounce-modal {
                            0% { transform: scale(1); }
                            20% { transform: scale(1.05, 0.95); }
                            40% { transform: scale(0.95, 1.05); }
                            60% { transform: scale(1.03, 0.97); }
                            80% { transform: scale(0.97, 1.03); }
                            100% { transform: scale(1); }
                        }
                        .animate-bounce-modal {
                            animation: bounce-modal 0.5s;
                        }
                    `}</style>
                </div>
            </div>
        );
};

export default ModalBaseInformacion;