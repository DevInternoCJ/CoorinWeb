import React, { useRef, useEffect, useState } from "react";
import ModalBase from "../../../board/ModalBase";
import CloseButtonCampanas from "../../../components/CloseButtonReusable";
import ModalCicle, { tabsList, COMPONENT_ICONS } from "./ModalCicle";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import { infoEjecutivo, getOffersInformation } from "../../../../../services/mark/albaz/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";
import { toast } from "sonner";

// Tamaños tipo ReusableModal - Solo Visitas e Información (carrusel) - Con responsividad
const MODAL_SIZES = {
    informacion: { maxWidth: "min(1400px, 98vw)", minWidth: "320px", width: "min(1300px, 98vw)", height: "210px", maxHeight: "85vh" },
    "informacion-xl": { maxWidth: "min(1400px, 98vw)", minWidth: "320px", width: "min(1300px, 98vw)", height: "auto", minHeight: "300px", maxHeight: "90vh" },
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

    // Determinar tipos de modal primero
    const isConsultaVisitas = tipoInformacion === "Consulta Visitas";
    const isCapturaVisitas = tipoInformacion === "Captura Visitas";
    const isCargaVisitas = tipoInformacion === "Carga Visitas";
    const isVisitas = isConsultaVisitas || isCapturaVisitas || isCargaVisitas;
    const isInformacion = tipoInformacion === "información";

    // Estados para controles de Ofrecimientos en el header
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 0;
    const idProducto = userData?.idProducto ?? 0;
    const jerarquia = userData?.Jerarquía ?? 0;
    const idEjecutivo = userData?.idEjecutivo ?? null;
    
    const [cartera, setCartera] = useState(idCartera);
    const [carterasOptions, setCarterasOptions] = useState([]);
    const [consulta, setConsulta] = useState("");
    const [consultasOptions, setConsultasOptions] = useState([]);
    const minDate = "2016-01-01";
    const maxDate = new Date().toISOString().slice(0, 10);
    const [desde, setDesde] = useState(maxDate);
    const [hasta, setHasta] = useState(maxDate);
    const [loadingConsultas, setLoadingConsultas] = useState(false);
    const [errorConsultas, setErrorConsultas] = useState(null);
    const [loadingExcel, setLoadingExcel] = useState(false);
    // Estado para mostrar el modal de confirmación de cierre
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);
    const [mostrarTabla, setMostrarTabla] = useState(false);

    // Handler para cierre seguro del modal
    const handleSafeClose = () => {
        if (loadingExcel) {
            setShowCloseConfirm(true);
        } else {
            if (typeof onClose === 'function') onClose();
        }
    };

    // useEffect para cargar datos del ejecutivo (solo para Ofrecimientos)
    useEffect(() => {
        if (!idEjecutivo || !isInformacion) return;
        setLoadingConsultas(true);
        setErrorConsultas(null);
        infoEjecutivo(idEjecutivo)
            .then((data) => {
                // Extraer carteras únicas
                const carterasUnicas = Array.isArray(data)
                    ? Array.from(
                        new Map(
                            data.map(item => [item.idCartera, { id: item.idCartera, nombre: item.NombreCartera || `Cartera ${item.idCartera}` }])
                        ).values()
                    )
                    : [];
                setCarterasOptions(carterasUnicas);
                // Filtrar consultas por cartera e idProducto
                const filtered = Array.isArray(data.consultas)
                    ? data.consultas.filter(
                        (item) => String(item.idCartera) === String(cartera) && String(item.idProducto) === String(idProducto)
                    )
                    : [];
                setConsultasOptions(filtered);
            })
            .catch(() => {
                setErrorConsultas("Error al cargar las consultas");
                setConsultasOptions([]);
                setCarterasOptions([]);
            })
            .finally(() => setLoadingConsultas(false));
    }, [idEjecutivo, cartera, idProducto, isInformacion]);

    // Handler para exportar ofrecimientos a Excel
    const handleDownloadExcel = async () => {
        setLoadingExcel(true);
        const loadingToast = toast.loading("Exportando datos...", {
            duration: Infinity
        });
        try {
            const idConsulta = consulta === "" ? 0 : parseInt(consulta, 10);
            const params = {
                idCartera: cartera,
                idConsulta,
                idProducto,
                desde,
                hasta,
                jerarquia
            };
            const response = await getOffersInformation(params);
            
            // Obtener nombre de la consulta para mensajes
            let nombreConsulta = "Ofrecimientos";
            if (consulta !== "" && consulta !== 0) {
                const consultaObj = consultasOptions.find(opt => String(opt.idConsulta) === String(consulta));
                if (consultaObj?.nombreConsulta) nombreConsulta = consultaObj.nombreConsulta;
            }

            const result = await exportFromAPIResponse(
                response,
                `ofrecimiento_${desde}_a_${hasta}`,
                {
                    consultaName: nombreConsulta,
                    accountFields: ['cuenta'],
                    showToast: true,
                    successMessage: "Libro de Excel Guardado."
                }
            );

            if (result) {
                toast.dismiss(loadingToast);
                toast.success("Libro de Excel guardado exitosamente.");
            } else {
                toast.dismiss(loadingToast);
                toast.warning("Consulta terminada sin registros.");
            }
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Error al exportar los datos, verifique la conexcion a internet.");
            console.error('Error al exportar ofrecimientos:', err);
        } finally {
            setLoadingExcel(false);
        }
    };

    // Títulos según tipo
    const titulos = {
        "información": "Información",
        "Consulta Visitas": "Consulta Visitas - Coorin",
        "Captura Visitas": "Captura Visitas - Coorin",
        "Carga Visitas": "Carga de Visitas - Coorin"
    };
    const titulo = titulos[tipoInformacion] || "Información";
    
    // Verificar si la pestaña actual es Ofrecimientos
    const isOffersTab = isInformacion && carouselNav && tabsList[carouselNav.currentIndex]?.key === "Ofrecimientos";

    // Determinar tamaño del modal
    let normalizedSize = size;
    if (isConsultaVisitas) normalizedSize = "consultaVisits";
    else if (isCapturaVisitas) normalizedSize = size === "pagos-xl" ? "informacion-xl" : "capturaVisit";
    else if (isCargaVisitas) normalizedSize = "cargaVisitas";
    else if (isInformacion) {
        // Si el tab activo es Pagos Reportados y mostrarTabla=true, expandir modal
        const isPagosReportadosTab = carouselNav && tabsList[carouselNav.currentIndex]?.key === "Pagos Reportados";
        if (isPagosReportadosTab && mostrarTabla) {
            normalizedSize = "informacion-xl";
        } else {
            normalizedSize = dynamicSize;
        }
    }

    // Log para verificar el tab activo y el tamaño del modal
    if (carouselNav) {
        console.log('[ModalBaseInformacion] Tab activo:', tabsList[carouselNav.currentIndex]?.key);
        console.log('[ModalBaseInformacion] mostrarTabla:', mostrarTabla);
    }

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
                className={`modal-content bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col w-full mx-auto my-8 max-h-[90vh] h-auto ${modalClassName} ${((bounce || localBounce) && enableBounce) ? "animate-bounce-modal" : ""}`}
                style={mergedModalStyle}
                onClick={e => e.stopPropagation()}
                {...props}
            >
                {/* Header */}
                {showHeader && (
                    CustomHeader ? (
                        <CustomHeader onClose={handleSafeClose} {...headerProps} />
                    ) : isInformacion ? (
                        /* Header con logo, tabs y botón cerrar */
                        <>
                        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-gray-50">
                            {/* Logo izquierda */}
                            <div className="flex items-center shrink-0 mr-4">
                                <img src={ConsorcioLogo} alt="Coorin" className="h-6 w-auto" />
                            </div>
                            {/* Tabs en el header */}
                            <div className="flex-1 min-w-0">
                                <nav
                                    className="grid grid-cols-3 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-5 xl:grid-cols-10 2xl:grid-cols-10 gap-x-0.5 gap-y-0.5 justify-center"
                                    aria-label="Tabs"
                                    role="tablist"
                                    aria-orientation="horizontal"
                                >
                                    {tabsList.map((tab, index) => {
                                        const shortText = {
                                            "Ofrecimientos": "Ofrecimientos",
                                            "Pagos": "Pagos", 
                                            "Pagos Reportados": "P. Rep.",
                                            "Búsquedas": "Búsq.",
                                            "Datos Erróneos": "Errores",
                                            "Lista Negra": "L. Negra",
                                            "Arrepentimientos": "Arrep.",
                                            "Domicilios": "Domic.",
                                            "Correos": "Emails",
                                            "Comentarios": "Coment."
                                        }[tab.key] || tab.key;
                                        return (
                                            <button
                                                key={tab.key}
                                                type="button"
                                                className={`
                                                    py-2 px-2 lg:px-3 xl:px-4 inline-flex items-center gap-x-1 text-xs font-medium text-center 
                                                    border border-gray-200 rounded-t-lg transition-colors duration-200
                                                    hover:bg-jerarquia1 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none
                                                    ${carouselNav?.currentIndex === index 
                                                        ? 'bg-white border-b-transparent text-jerarquia3 border-jerarquia2' 
                                                        : 'bg-gray-50 text-gray-500 hover:text-jerarquia3'
                                                    }
                                                `}
                                                id={`tab-info-item-${index}`}
                                                aria-selected={carouselNav?.currentIndex === index}
                                                data-hs-tab={`#tab-info-content-${index}`}
                                                aria-controls={`tab-info-content-${index}`}
                                                role="tab"
                                                title={tab.key}
                                                onClick={() => carouselNav?.onTabChange?.(index)}
                                            >
                                                <span className={carouselNav?.currentIndex === index ? 'text-jerarquia3' : 'text-gray-500'}>
                                                    {COMPONENT_ICONS[tab.key]}
                                                </span>
                                                {/*
                                                    - 2xl y xl: icono + texto (normal, una fila)
                                                    - lg: solo icono
                                                    - md: icono + texto (2 filas)
                                                    - sm y menos: solo icono (3 filas)
                                                */}
                                                {/*
                                                    - sm y menores: solo icono, una fila, muy juntos
                                                    - md y mayores: icono + texto
                                                */}
                                                {/*
                                                    - md: solo icono, una fila
                                                    - lg, xl, 2xl: icono + texto
                                                */}
                                                {/*
                                                    - md: solo icono, 2 filas de 5
                                                    - lg, xl, 2xl: icono + texto
                                                */}
                                                {/*
                                                    - md: solo icono, una fila
                                                    - sm: solo icono, 2 filas de 5
                                                    - lg, xl, 2xl: icono + texto
                                                */}
                                                <span
                                                    className="hidden md:hidden lg:inline xl:inline 2xl:inline"
                                                >{shortText}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                            {/* Botón cerrar derecha */}
                            <div className="shrink-0 ml-4">
                                <CloseButtonCampanas onClose={handleSafeClose} />
                            </div>
                        </div>
                        </>
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
                            <CloseButtonCampanas onClose={handleSafeClose} />
                        </div>
                    )
                )}

                {/* Contenido: Carrusel para información, children para Visitas */}
                <div className={`flex-1 w-full overflow-auto ${contentClassName}`}>
                    {isInformacion ? (
                        <>
                            {/* Controles funcionales para Ofrecimeintos (solo si es la pestaña activa) */}
                            {isOffersTab && (
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-3 px-4 pt-4 pb-2 w-full"
                                >
                                    {/* Cartera */}
                                    <div className="relative flex-1 min-w-0 max-w-xs">
                                        <select
                                            className="peer p-2 pe-8 block w-full bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-4 focus:pb-0 not-placeholder-shown:pt-4 not-placeholder-shown:pb-0"
                                            id="body-cartera-select"
                                            value={cartera}
                                            onChange={e => setCartera(e.target.value)}
                                        >
                                            {carterasOptions.length === 0
                                                ? <option value={cartera}>{`Cartera ${cartera}`}</option>
                                                : carterasOptions.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                                ))
                                            }
                                        </select>
                                        <label
                                            htmlFor="body-cartera-select"
                                            className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-[10px] peer-focus:-translate-y-1 peer-focus:text-gray-500 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:-translate-y-1 peer-not-placeholder-shown:text-gray-500"
                                        >
                                            Cartera
                                        </label>
                                    </div>
                                    {/* Consulta */}
                                    <div className="relative flex-1 min-w-0 max-w-xs">
                                        <select
                                            className="peer p-2 pe-8 block w-full bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-4 focus:pb-0 not-placeholder-shown:pt-4 not-placeholder-shown:pb-0"
                                            id="body-consulta-select"
                                            value={consulta}
                                            onChange={e => setConsulta(e.target.value)}
                                            disabled={loadingConsultas || errorConsultas}
                                        >
                                            <option value="">- Todas -</option>
                                            {consultasOptions.map((item) => (
                                                <option key={item.idConsulta || item.nombreConsulta} value={item.idConsulta}>
                                                    {item.nombreConsulta}
                                                </option>
                                            ))}
                                        </select>
                                        <label
                                            htmlFor="body-consulta-select"
                                            className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-[10px] peer-focus:-translate-y-1 peer-focus:text-gray-500 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:-translate-y-1 peer-not-placeholder-shown:text-gray-500"
                                        >
                                            Consulta
                                        </label>
                                        {loadingConsultas && (
                                            <span className="text-[8px] text-gray-500 absolute right-8 top-1">Cargando...</span>
                                        )}
                                        {errorConsultas && (
                                            <span className="text-[8px] text-red-500 absolute right-8 top-1">{errorConsultas}</span>
                                        )}
                                    </div>
                                    {/* Desde */}
                                    <div className="relative flex-1 min-w-0 max-w-xs">
                                        <input
                                            type="date"
                                            id="body-fecha-desde"
                                            className="peer p-2 block w-full bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-4 focus:pb-0 not-placeholder-shown:pt-4 not-placeholder-shown:pb-0"
                                            value={desde}
                                            min={minDate}
                                            max={maxDate}
                                            onChange={e => setDesde(e.target.value)}
                                            placeholder=" "
                                        />
                                        <label
                                            htmlFor="body-fecha-desde"
                                            className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-[10px] peer-focus:-translate-y-1 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-1 peer-[:not(:placeholder-shown)]:text-gray-500"
                                        >
                                            Desde
                                        </label>
                                    </div>
                                    {/* Hasta */}
                                    <div className="relative flex-1 min-w-0 max-w-xs">
                                        <input
                                            type="date"
                                            id="body-fecha-hasta"
                                            className="peer p-2 block w-full bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-4 focus:pb-0 not-placeholder-shown:pt-4 not-placeholder-shown:pb-0"
                                            value={hasta}
                                            min={minDate}
                                            max={maxDate}
                                            onChange={e => setHasta(e.target.value)}
                                            placeholder=" "
                                        />
                                        <label
                                            htmlFor="body-fecha-hasta"
                                            className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-[10px] peer-focus:-translate-y-1 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-1 peer-[:not(:placeholder-shown)]:text-gray-500"
                                        >
                                            Hasta
                                        </label>
                                    </div>
                                    {/* Botón Excel */}
                                    <div className="shrink-0 flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="btn-success min-w-[100px] px-4 py-2 text-xs font-medium rounded-lg shadow-sm flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={handleDownloadExcel}
                                            disabled={loadingExcel}
                                        >
                                            {loadingExcel ? "Exportando..." : "Guardar Excel"}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Contenido de los tabs */}
                            <div className="mt-3 px-4 flex-1 overflow-auto">
                                <ModalCicle 
                                    renderNavInHeader={false} 
                                    onNavigationReady={setCarouselNav}
                                    onSizeChange={setDynamicSize}
                                    headerControlsActive={isOffersTab}
                                    mostrarTabla={mostrarTabla}
                                    setMostrarTabla={setMostrarTabla}
                                    headerStates={{
                                        cartera,
                                        consulta,
                                        desde,
                                        hasta,
                                        carterasOptions,
                                        consultasOptions,
                                        loadingConsultas,
                                        errorConsultas
                                    }}
                                />
                            </div>
                        </>
                    ) : children}
                </div>

                {/* Footer */}
                {showFooter && (
                    CustomFooter ? (
                        <CustomFooter {...footerProps} />
                    ) : (
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                            <button onClick={handleSafeClose} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">Cerrar</button>
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