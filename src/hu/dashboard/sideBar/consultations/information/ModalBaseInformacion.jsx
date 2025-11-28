import React, { useRef, useEffect, useState } from "react";
import ModalBase from "../../../board/ModalBase";
import CloseButtonCampanas from "../../../components/CloseButtonReusable";
import ModalCicle, { tabsList, COMPONENT_ICONS } from "./ModalCicle";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";

// Tamaños tipo ReusableModal - Solo Visitas e Información (carrusel) - Con responsividad
const MODAL_SIZES = {
    informacion: { maxWidth: "min(648px, 95vw)", minWidth: "408px", width: "min(600px, 95vw)", height: "340px", maxHeight: "85vh" },
    "informacion-xl": { maxWidth: "min(1100px, 95vw)", minWidth: "320px", width: "min(1200px, 95vw)", height: "auto", minHeight: "300px", maxHeight: "90vh" },
    "pagos-xl": { maxWidth: "min(1800px, 95vw)", minWidth: "320px", width: "min(1700px, 95vw)", height: "85vh", maxHeight: "90vh" },
    pagos: { maxWidth: "min(420px, 95vw)", minWidth: "280px", width: "min(380px, 95vw)", height: "340px", maxHeight: "85vh" },
    consultaVisits: { maxWidth: "min(644px, 95vw)", minWidth: "320px", width: "min(483px, 95vw)", height: "506px", maxHeight: "90vh" },
    capturaVisit: { maxWidth: "min(805px, 95vw)", minWidth: "320px", width: "min(370px, 95vw)", height: "380px", maxHeight: "90vh" },
    cargaVisitas: { maxWidth: "min(1104px, 95vw)", minWidth: "320px", width: "min(900px, 95vw)", height: "220px", maxHeight: "85vh" },
    custom: {},
};

const ModalBaseInformacion = ({
    onClose,
    tipoInformacion,
    infoCuenta, // { cuenta, expediente, nombreDeudor, _busquedaPorExpediente }
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
    backdropBlur = true,
    ...props
}) => {
    const modalRef = useRef(null);
    const { bounce } = ModalBase.useModalLogic?.() || { bounce: false };
    const [localBounce, setLocalBounce] = useState(false);
    
    // Estado para la navegación del carrusel (cuando es información)
    const [carouselNav, setCarouselNav] = useState(null);
    
    // Estado para el tamaño dinámico del modal (carrusel información)
    const [dynamicSize, setDynamicSize] = useState("informacion");

    // Helper para activar animación bounce
    const triggerBounce = () => {
        if (!enableBounce) return;
        setLocalBounce(true);
        setTimeout(() => setLocalBounce(false), 500);
    };

    // Títulos según tipo
    const titulos = {
        "información": "Información",
        "Consulta Visitas": "Consulta Visitas - Coorin",
        "Captura Visitas": "Captura Visitas - Coorin",
        "Carga Visitas": "Carga de Visitas - Coorin"
    };
    const titulo = titulos[tipoInformacion] || "Información";

    // Determinar si es un modal de Visitas
    const isConsultaVisitas = tipoInformacion === "Consulta Visitas";
    const isCapturaVisitas = tipoInformacion === "Captura Visitas";
    const isCargaVisitas = tipoInformacion === "Carga Visitas";
    const isVisitas = isConsultaVisitas || isCapturaVisitas || isCargaVisitas;

    // Determinar si es el carrusel de información
    const isInformacion = tipoInformacion === "información";

    // Determinar tamaño del modal
    let normalizedSize = size;
    if (isConsultaVisitas) normalizedSize = "consultaVisits";
    else if (isCapturaVisitas) normalizedSize = size === "pagos-xl" ? "informacion-xl" : "capturaVisit";
    else if (isCargaVisitas) normalizedSize = "cargaVisitas";
    else if (isInformacion) normalizedSize = dynamicSize; // Usar tamaño dinámico para información

    const defaultModalStyle = MODAL_SIZES[normalizedSize] || MODAL_SIZES.informacion;
    const mergedModalStyle = { ...defaultModalStyle, ...modalStyle };

    // Icono del header según tipo
    const headerIcon = isVisitas ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
    );

    // Backdrop click: activar bounce en lugar de cerrar
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            triggerBounce();
        }
    };

    // Interceptar Escape para prevenir cierre y activar bounce
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                triggerBounce();
            }
        };
        window.addEventListener("keydown", handleKey, true);
        return () => window.removeEventListener("keydown", handleKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Notificar al sidebar que el modal está abierto
    useEffect(() => {
        try {
            window.dispatchEvent(new CustomEvent('coorin-modal-open', { detail: { open: true } }));
        } catch (err) { console.warn('dispatch open failed', err); }
        return () => {
            try {
                window.dispatchEvent(new CustomEvent('coorin-modal-open', { detail: { open: false, byClose: false } }));
            } catch (err) { console.warn('dispatch close failed', err); }
        };
    }, []);

    return (
        <div className="modal-blur-bg">
            <div
                className={`modal-overlay ${overlayClassName} ${backdropBlur ? 'backdrop-blur-sm' : ''}`}
                onClick={handleBackdropClick}
            />
            <div
                ref={modalRef}
                className={`modal-content modal-xl-container bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col ${modalClassName} ${((bounce || localBounce) && enableBounce) ? "animate-bounce-modal" : ""}`}
                style={mergedModalStyle}
                onClick={e => e.stopPropagation()}
                {...props}
            >
                {/* Header */}
                {showHeader && (
                    CustomHeader ? (
                        <CustomHeader onClose={onClose} {...headerProps} />
                    ) : isInformacion ? (
                        /* Header con tabs: Logo | Tabs centrados | Botón cerrar */
                        <div className="flex items-center justify-between border-b border-gray-200">
                            {/* Logo izquierda */}
                            <div className="flex items-center shrink-0">
                                <img src={ConsorcioLogo} alt="Coorin" className="h-6 w-auto" />
                            </div>
                            
                            {/* Tabs centrados con tamaño definido y responsive */}
                            <nav 
                                className="flex border border-gray-200 rounded-lg overflow-hidden" 
                                aria-label="Tabs" 
                                role="tablist"
                            >
                                {tabsList.map((tab, index) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        className={`
                                            relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 
                                            first:border-s-0 border-s border-b-2 
                                            text-xs text-center overflow-hidden 
                                            focus:z-10 focus:outline-hidden 
                                            disabled:opacity-50 disabled:pointer-events-none
                                            transition-colors duration-200
                                            flex items-center justify-center shrink-0
                                            cursor-pointer hover:bg-jerarquia1
                                            ${carouselNav?.currentIndex === index 
                                                ? 'border-b-jerarquia2 bg-jerarquia2 font-bold' 
                                                : 'bg-white border-b-gray-200 text-gray-500 font-medium'
                                            }
                                        `}
                                        aria-selected={carouselNav?.currentIndex === index}
                                        aria-label={tab.key}
                                        title={tab.key}
                                        role="tab"
                                        onClick={() => carouselNav?.onTabChange?.(index)}
                                    >
                                        <span className={carouselNav?.currentIndex === index ? 'text-white' : 'text-black'}>
                                            {COMPONENT_ICONS[tab.key]}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                            
                            {/* Botón cerrar derecha */}
                            <div className="shrink-0">
                                <CloseButtonCampanas onClose={() => {
                                    try { window.dispatchEvent(new CustomEvent('coorin-modal-open', { detail: { open: false, byClose: true } })); } catch (err) { console.warn('dispatch close by button failed', err); }
                                    if (typeof onClose === 'function') onClose();
                                }} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                            <div className="flex items-center gap-3">
                                {headerIcon}
                                <h2 className="text-lg font-semibold truncate" style={{ color: 'var(--color-jerarquia3)' }}>{titulo}</h2>
                                {infoCuenta && infoCuenta.cuenta && (
                                    <div className="flex flex-row ml-4" style={{ gap: '8.25rem' }}>
                                        {infoCuenta._busquedaPorExpediente ? (
                                            <>
                                                <span className="font-semibold text-base text-jerarquia3" style={{ marginRight: '3.125rem' }}>{infoCuenta.cuenta.idCuenta}</span>
                                                <span className="font-semibold text-base text-jerarquia3">{infoCuenta.cuenta.nombreDeudor}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-semibold text-base text-jerarquia3" style={{ marginRight: '3.125rem' }}>{infoCuenta.cuenta.expediente}</span>
                                                <span className="font-semibold text-base text-jerarquia3">{infoCuenta.cuenta.nombreDeudor}</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <CloseButtonCampanas onClose={() => {
                                try { window.dispatchEvent(new CustomEvent('coorin-modal-open', { detail: { open: false, byClose: true } })); } catch (err) { console.warn('dispatch close by button failed', err); }
                                if (typeof onClose === 'function') onClose();
                            }} />
                        </div>
                    )
                )}

                {/* Contenido: Carrusel para información, children para Visitas */}
                <div className={`flex-1 w-full overflow-auto mt-4 ${contentClassName}`}>
                    {isInformacion ? (
                        <ModalCicle 
                            renderNavInHeader={true} 
                            onNavigationReady={setCarouselNav}
                            onSizeChange={setDynamicSize}
                        />
                    ) : children}
                </div>

                {/* Footer */}
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