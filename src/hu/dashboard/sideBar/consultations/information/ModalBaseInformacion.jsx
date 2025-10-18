
import React, { useRef } from "react";
import ModalBase from "../../../board/ModalBase";
import CloseButtonCampanas from "../../../components/CloseButtonReusable";

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

    // Header icon and title color según tipoInformacion
    const isPagos = tipoInformacion === "Pagos";
    const isPagosReportados = tipoInformacion === "Pagos reportados";
    const isListaNegra = tipoInformacion === "Lista Negra";
    const isWrong = tipoInformacion === "Datos Erroneos";
    const isArrepentimientos = tipoInformacion === "Arrepentimientos";
    const isDomicilios = tipoInformacion === "Domicilios";
    const isCorreos = tipoInformacion === "Correos";
    const isOfrecimientos = tipoInformacion === "Ofrecimientos";
    const isBusquedas = tipoInformacion === "Búsquedas";
    const isComentarios = tipoInformacion === "Comentarios";
    const headerTitleStyle = isPagos
        ? { color: 'var(--color-jerarquia3)' }
        : (isPagosReportados || isListaNegra || isWrong || isDomicilios || isCorreos || isBusquedas || isComentarios || isOfrecimientos || isArrepentimientos)
            ? { color: 'var(--color-jerarquia3)' }
            : { color: undefined };

    // Icono para comentarios (definido como los demás)
    const comentariosIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
    );

    // Icono para arrepentimientos (se usa en el header cuando aplica)
    const arrepentimientosIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
    );

    const headerIcon = isPagos ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    ) : isPagosReportados ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
        </svg>
    ) : isWrong ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
    ) : isDomicilios ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
    ) : isCorreos ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    ) : isOfrecimientos ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
    ) : isBusquedas ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    ) : isComentarios ? (
        comentariosIcon
    ) : isArrepentimientos ? (
        arrepentimientosIcon
    ) : isListaNegra ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-jerarquia3" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
    ) : (
        // default icon
        <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
    );

    // Backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
            onClose();
        }
    };

        return (
            <div className="modal-blur-bg">
                <div
                    className={`modal-overlay ${overlayClassName} ${backdropBlur ? 'backdrop-blur-sm' : ''}`}
                    onClick={handleBackdropClick}
                />
                <div
                    ref={modalRef}
                    className={`modal-content modal-xl-container bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col ${modalClassName} ${bounce && enableBounce ? "animate-bounce-modal" : ""}`}
                    style={mergedModalStyle}
                    onClick={e => e.stopPropagation()}
                    {...props}
                >
                    {/* Header reusabilidad máxima */}
                    {showHeader && (
                        CustomHeader ? (
                            <CustomHeader onClose={onClose} {...headerProps} />
                        ) : (
                            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    {headerIcon}
                                    <h2 className="text-lg font-semibold truncate" style={headerTitleStyle}>{titulo}</h2>
                                </div>
                                <CloseButtonCampanas onClose={onClose} />
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