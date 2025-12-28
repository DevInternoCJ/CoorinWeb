import React, { useState, useEffect, useCallback, useRef } from "react";
import { getAddressesCapture, guardarVisitaCapturada, obtenerLatitudLongitud } from "../../../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";
import ConsorcioLogo from "../../../../../../assets/logo_coorin_7.svg";
import CapturaVisitsF2 from "../Capture/CapturaVisitsF2";
import CapturaVisitsF3 from "../Capture/CapturaVisitsF3";
import CapturaVisitsF4 from "../Capture/CapturaVisitsF4";
import CapturaVisitsF5 from "../Capture/CapturaVisitsF5";
import CapturaVisitsF6 from "../Capture/CapturaVisitsF6";
import CapturaVisitsF7 from "../Capture/CapturaVisitsF7";

const CaptureVisit = ({ mostrarTabla, setMostrarTabla, tipoInformacion, cuentaData, setCuentaData }) => {
    // Obtener idCartera y jerarquía dinámicos desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idEjecutivo = userData?.idEjecutivo || 0;
    const idCartera = userData?.idCartera || "";
    const jerarquia = userData?.Jerarquía ?? 0;
    
    // Estado para controlar si tiene permiso de captura
    const [tienePermisoCaptura, setTienePermisoCaptura] = useState(true);
    
    const [cartera, setCartera] = useState(idCartera);
    const [carterasOptions, setCarterasOptions] = useState([
        { id: "1", nombre: "Cartera 1" },
        { id: "2", nombre: "Cartera 2" },
        { id: "3", nombre: "Cartera 3" },
        { id: "4", nombre: "Cartera 4" },
        { id: "22", nombre: "Cartera 22" },
    ]);
    const [porExpediente, setPorExpediente] = useState(false);
    const [idCuenta, setIdCuenta] = useState("");
    const [cuentaGuardada, setCuentaGuardada] = useState("");
    const [expedienteGuardado, setExpedienteGuardado] = useState("");


    const [showDropdown, setShowDropdown] = useState(false);
    const [footerMsg] = useState("Elija la consulta de las cuentas que desee las consultas y el periodo.");
    // Estado para datos de cuenta obtenidos
    // cuentaData y setCuentaData ahora vienen del padre (CoorinDashboard)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Estado para dirección seleccionada
    const [direccionSeleccionada, setDireccionSeleccionada] = useState("");
    
    // Estado para mapeo de vivienda (F2) - comunicación con F4
    const [mapeoVivienda, setMapeoVivienda] = useState("");
    const [mapeoViviendaId, setMapeoViviendaId] = useState("");
    
    // Estados para validaciones de domicilio
    const [mensajeDomicilio, setMensajeDomicilio] = useState("");
    const [mensajeColor, setMensajeColor] = useState("gray"); // "gray", "red", "green"
    const [mostrarBtnCaptura, setMostrarBtnCaptura] = useState(true);
    const [filtroHabitacion, setFiltroHabitacion] = useState(null); // ID a excluir (ej: 2805)
    const [fechaVisita, setFechaVisita] = useState(new Date().toISOString().split('T')[0]);
    const [fechaMinVisita, setFechaMinVisita] = useState("");
    
    // Estado para controlar visibilidad de F6 (Teléfonos) - oculto para carteras 4 y 47
    const [mostrarF6, setMostrarF6] = useState(true);
    
    // Estado para controlar visibilidad de F7 (Energía Eléctrica) - solo productos 52 o 22
    const [mostrarF7, setMostrarF7] = useState(false);
    
    // Estados para mostrar información de cuenta (similar al C# ObtieneCuenta)
    const [expedienteLabel, setExpedienteLabel] = useState("");
    const [nombreDeudor, setNombreDeudor] = useState("");
    
    // Estado para habilitar/deshabilitar todos los grupos F2-F7
    const [gruposHabilitados, setGruposHabilitados] = useState(false);
    
    // Reset key para forzar re-render de componentes hijos al limpiar campos
    const [resetKey, setResetKey] = useState(0);
    
    // Ref para enfocar campo cuenta después de limpiar
    const cuentaInputRef = useRef(null);
    
    // Refs para obtener datos de los componentes hijos (F2-F7)
    const f2Ref = useRef(null); // Vivienda
    const f3Ref = useRef(null); // Auto
    const f4Ref = useRef(null); // Visita
    const f5Ref = useRef(null); // Entre Calles
    const f6Ref = useRef(null); // Teléfonos
    const f7Ref = useRef(null); // Energía Eléctrica
    
    // Ref para controlar el toast de carga actual
    const currentToastId = useRef(null);
    
    // Estado para indicar que se está guardando la captura
    const [guardando, setGuardando] = useState(false);
    
    // Estados para modales de confirmación (ValidaCaptura del C#)
    const [modalCallesVacias, setModalCallesVacias] = useState(false);
    const [callesVaciasTexto, setCallesVaciasTexto] = useState("");
    const [modalConfirmacionFecha, setModalConfirmacionFecha] = useState(false);
    const [datosValidados, setDatosValidados] = useState(null); // Almacena los datos validados para confirmar
    
    // Handler para cuando cambia el mapeo en F2
    const handleMapeoChange = useCallback((mapeoTexto, mapeoId) => {
        setMapeoVivienda(mapeoTexto);
        setMapeoViviendaId(mapeoId);
    }, []);

    // Efecto para controlar visibilidad de F6 (Teléfonos) según cartera
    useEffect(() => {
        // Ocultar F6 para carteras 4 y 47
        if (cartera === "4" || cartera === "47" ) {
            setMostrarF6(false);
        } else {
            setMostrarF6(true);
        }
    }, [cartera]);

        // Toast informativo al cambiar checkbox - solo si el modal está expandido
        useEffect(() => {
            if (mostrarTabla) {
                toast.info(`Capture el ${porExpediente ? "expediente" : "número de cuenta"}.`);
            }
        }, [porExpediente, mostrarTabla]);

        // Efecto para actualizar _busquedaPorExpediente en cuentaData cuando cambia porExpediente
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => {
            if (cuentaData) {
                setCuentaData(prev => ({ ...prev, _busquedaPorExpediente: porExpediente }));
            }
        }, [porExpediente]);

    // Efecto para limpiar campos cuando cambia la cartera y volver a buscar
    useEffect(() => {
        // Solo actuar si hay datos previos cargados
        if (cuentaData) {
            // Guardar la cuenta actual antes de limpiar
            const cuentaActual = idCuenta;
            
            // Limpiar campos del header
            setIdCuenta("");
            setDireccionSeleccionada("");
            setCuentaData(null);
            localStorage.removeItem("cuentaDataCapturaVisita");
            
            // Limpiar estados de validación
            setMensajeDomicilio("");
            setMostrarBtnCaptura(true);
            setFiltroHabitacion(null);
            setMapeoVivienda("");
            setMapeoViviendaId("");
            
            // Limpiar información de cuenta
            setExpedienteLabel("");
            setNombreDeudor("");
            setGruposHabilitados(false);
            setMostrarF7(false);
            
            // Resetear fecha de visita
            const hoy = new Date();
            const hace30Dias = new Date();
            hace30Dias.setDate(hoy.getDate() - 30);
            setFechaVisita(hoy.toISOString().split('T')[0]);
            setFechaMinVisita(hace30Dias.toISOString().split('T')[0]);
            
            // Incrementar resetKey para forzar re-render de componentes hijos (F2-F7)
            setResetKey(prev => prev + 1);
            
            toast.info("Cartera cambiada. Campos limpiados.");
            
            // Enfocar campo cuenta después de limpiar
            setTimeout(() => {
                if (cuentaInputRef.current) {
                    cuentaInputRef.current.focus();
                }
            }, 100);
            
            // Si hay cuenta ingresada, volver a buscar con la nueva cartera
            if (cuentaActual && cuentaActual.trim() !== "") {
                setIdCuenta(cuentaActual);
                setTimeout(() => {
                    handleBuscarCuenta();
                }, 150);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartera]);

    // Efecto para validar domicilio seleccionado (lógica del C#)
    useEffect(() => {
        // Reset del filtro de habitación
        setFiltroHabitacion(null);
        
        // Validación inicial - salir si no hay datos
        if (!cuentaData || !cuentaData.domicilios || !direccionSeleccionada) {
            setMensajeDomicilio("");
            setMostrarBtnCaptura(true);
            return;
        }
        
        // TEMPORAL: Aplica para cartera 1 (originalmente solo cartera 7)
        // TODO: Cambiar a parseInt(cartera) !== 7 cuando se termine de probar
        if (parseInt(cartera) !== 1 && parseInt(cartera) !== 7) {
            setMensajeDomicilio("Capture la información de la visita.");
            setMensajeColor("gray");
            setMostrarBtnCaptura(true);
            return;
        }
        
        // Buscar el domicilio seleccionado
        const domicilioData = cuentaData.domicilios.find(
            dom => dom.domicilio === direccionSeleccionada
        );
        
        if (!domicilioData) {
            return;
        }
        
        // TEMPORAL: Aplica para producto 1 (originalmente solo productos 2 o 3)
        // TODO: Cambiar a idProducto !== 2 && idProducto !== 3 cuando se termine de probar
        const idProducto = domicilioData.idProducto;
        if (idProducto !== 1 && idProducto !== 2 && idProducto !== 3) {
            setMensajeDomicilio("Capture la información de la visita.");
            setMensajeColor("gray");
            setMostrarBtnCaptura(true);
            return;
        }
        
        // Validación de Ilocalizable
        const ilocalizable = domicilioData.ilocalizable || domicilioData.Ilocalizable;
        if (ilocalizable && ilocalizable !== "" && ilocalizable !== "0" && ilocalizable !== 0) {
            setMensajeDomicilio("El domicilio seleccionado cuenta con visita clasificada como 'Ilocalizable'.");
            setMensajeColor("red");
            setMostrarBtnCaptura(false);
            toast.error("El domicilio seleccionado cuenta con visita clasificada como 'Ilocalizable'.");
            return;
        }
        
        // Validación de Captura del mismo día
        const ultimaCaptura = domicilioData.ultimaCaptura || domicilioData.UltimaCaptura;
        if (ultimaCaptura && ultimaCaptura !== "") {
            const fechaUltimaCaptura = new Date(ultimaCaptura).toDateString();
            const hoy = new Date().toDateString();
            if (fechaUltimaCaptura === hoy) {
                setMensajeDomicilio("Ya se cuenta con visita capturada el día de hoy para ese domicilio.");
                setMensajeColor("red");
                setMostrarBtnCaptura(false);
                toast.error("Ya se cuenta con visita capturada el día de hoy para ese domicilio.");
                return;
            }
        }
        
        // Si pasa las validaciones, mostrar mensaje informativo
        setMensajeDomicilio("Capture la información de la visita.");
        setMensajeColor("gray");
        setMostrarBtnCaptura(true);
        
        // Filtro de Habitación si es Localizable (excluir idValor 2805 = "Ilocalizable")
        const localizable = domicilioData.localizable || domicilioData.Localizable;
        if (localizable && localizable !== "" && localizable !== "0" && localizable !== 0) {
            setFiltroHabitacion(2805); // ID a excluir del combo Habitación
        }
        
        // Configuración de Fecha Mínima
        const ultimaVisita = domicilioData.ultimaVisita || domicilioData.UltimaVisita;
        const hoy = new Date();
        const hace30Dias = new Date();
        hace30Dias.setDate(hoy.getDate() - 30);
        
        if (ultimaVisita && ultimaVisita !== "") {
            const fechaUltimaVisita = new Date(ultimaVisita);
            if (fechaUltimaVisita >= hace30Dias) {
                // Fecha mínima = día después de última visita
                const minDate = new Date(fechaUltimaVisita);
                minDate.setDate(minDate.getDate() + 1);
                setFechaMinVisita(minDate.toISOString().split('T')[0]);
            } else {
                setFechaMinVisita(hace30Dias.toISOString().split('T')[0]);
            }
        } else {
            setFechaMinVisita(hace30Dias.toISOString().split('T')[0]);
        }
        
        // Valor por defecto de fecha = hoy
        setFechaVisita(hoy.toISOString().split('T')[0]);
        
    }, [direccionSeleccionada, cuentaData, cartera]);

    // Efecto para controlar visibilidad de F7 (Energía Eléctrica) según producto del domicilio
    useEffect(() => {
        if (!cuentaData || !cuentaData.domicilios || !direccionSeleccionada) {
            setMostrarF7(false);
            return;
        }
        
        const domicilioData = cuentaData.domicilios.find(
            dom => dom.domicilio === direccionSeleccionada
        );
        
        if (!domicilioData) {
            setMostrarF7(false);
            return;
        }
        
        const idProducto = domicilioData.idProducto;
        // Mostrar F7 si idProducto es 1, 22 o 52 (agregamos 1 para pruebas)
        if (idProducto === 1 || idProducto === 22 || idProducto === 52) {
            setMostrarF7(true);
        } else {
            setMostrarF7(false);
        }
    }, [direccionSeleccionada, cuentaData]);

    // Validar permisos de captura al montar el componente
    useEffect(() => {
        if (jerarquia < 1) {
            setTienePermisoCaptura(false);
            toast.warning("Carece de permisos para capturar visitas.", {
                duration: 5000,
            });
        } else {
            setTienePermisoCaptura(true);
        }
    }, [jerarquia]);

    // Lógica para mostrar el modal expandido si la cuenta es válida
    useEffect(() => {
        // Ya no se requiere validación de 16 dígitos para expandir modal
        setShowDropdown(false);
    }, [idCuenta, porExpediente, setMostrarTabla]);

    // Atajos de teclado F1-F8 para navegación rápida entre campos
    const handleKeyboardShortcuts = useCallback((e) => {
        // Solo procesar si el modal está expandido
        if (!mostrarTabla) return;
        
        const focusElement = (id) => {
            const element = document.getElementById(id);
            if (element) {
                element.focus();
                e.preventDefault();
            }
        };
        
        switch (e.key) {
            case 'F1':
                focusElement('cartera-select-carga-visits'); // Dropdown Carteras
                break;
            case 'F2':
                focusElement('mapeo-select'); // Dropdown Habitación (Mapeo Vivienda) en F2
                break;
            case 'F3':
                focusElement('mapeo-auto-select'); // Dropdown Mapeo Auto en F3
                break;
            case 'F4':
                focusElement('contacto-select-f4'); // Dropdown Contacto en F4 (Atendió)
                break;
            case 'F5':
                focusElement('calle-norte-input-f5'); // Input Calle Horizontal Norte en F5
                break;
            case 'F6':
                focusElement('telefono-input-f6'); // Input Teléfono Visita en F6
                break;
            case 'F7':
                focusElement('energia-select-f7'); // Dropdown Energía en F7
                break;
            case 'F8':
                focusElement('btn-captura'); // Botón Capturar
                break;
            default:
                return; // No prevenir default para otras teclas
        }
    }, [mostrarTabla]);

    // Registrar/desregistrar listener de teclado
    useEffect(() => {
        document.addEventListener('keydown', handleKeyboardShortcuts);
        return () => {
            document.removeEventListener('keydown', handleKeyboardShortcuts);
        };
    }, [handleKeyboardShortcuts]);

    // Handler para cuando el usuario sale del campo cuenta (onBlur)
    const handleCuentaBlur = async () => {
        if (idCuenta.trim() !== "") {
            // Limpiar domicilios previos
            setDireccionSeleccionada("");
            // Copiar al portapapeles
            try {
                await navigator.clipboard.writeText(idCuenta.trim());
            } catch (err) {
                console.warn("No se pudo copiar al portapapeles:", err);
            }
            // Buscar cuenta
            handleBuscarCuenta();
        } else if (mostrarTabla) {
            // Campo vacío - mostrar toast de error solo si modal expandido
            toast.error(`Capture el ${porExpediente ? "expediente" : "número de cuenta"}.`);
        }
    };

    // Función para consultar el endpoint y guardar en localStorage
    // Controlar el estado de expansión solo desde aquí
    const handleBuscarCuenta = async () => {
        setLoading(true);
        setError(null);
        let expandir = false;
        if (currentToastId.current) {
            toast.dismiss(currentToastId.current);
        }
        currentToastId.current = toast.loading("Buscando cuenta...");
        try {
            const cuentaOrExpedienteStr = String(porExpediente ? idCuenta : parseInt(idCuenta, 10));
            let res;
            try {
                res = await getAddressesCapture(
                    cartera,
                    cuentaOrExpedienteStr,
                    porExpediente
                );
            } catch (err) {
                console.error("Error al llamar a getAddressesCapture:", err);
                setCuentaData(null);
                localStorage.removeItem("cuentaDataCapturaVisita");
                expandir = false;
                toast.error("La cuenta a la que desean acceder no existe, verifíquela por favor");
                // Deshabilitar grupos y limpiar información
                setGruposHabilitados(false);
                setExpedienteLabel("");
                setNombreDeudor("");
                setMostrarF7(false);
                setMostrarBtnCaptura(false);
                
                setLoading(false);
                toast.dismiss(currentToastId.current);
                currentToastId.current = null;
                if (typeof setMostrarTabla === "function") setMostrarTabla(false);
                return;
            }
            if (res && res.status === 200 && res.data && res.data.cuenta) {
                // Guardar el tipo de búsqueda exitosa
                const enrichedData = { ...res.data, _busquedaPorExpediente: porExpediente };
                setCuentaData(enrichedData);
                localStorage.setItem("cuentaDataCapturaVisita", JSON.stringify(enrichedData));
                expandir = true;
                
                // Actualizar información de cuenta (similar a ObtieneCuenta del C#)
                const cuentaInfo = res.data.cuenta;
                if (porExpediente) {
                    // Si buscó por expediente, mostrar el expediente en el label
                    setExpedienteLabel(idCuenta);
                } else {
                    // Si buscó por cuenta, obtener el expediente del response
                    setExpedienteLabel(cuentaInfo.expediente || cuentaInfo.Expediente || "");
                }
                setNombreDeudor(cuentaInfo.nombreDeudor || cuentaInfo.NombreDeudor || "");
                
                // Habilitar grupos de formularios
                setGruposHabilitados(true);
                
                // Verificar si mostrar F7 (Energía) - productos 52 o 22 (CFE)
                // TEMPORAL: También producto 1 para pruebas
                const domicilios = res.data.domicilios || [];
                if (domicilios.length > 0) {
                    const primerDomicilio = domicilios[0];
                    const idProducto = primerDomicilio.idProducto || primerDomicilio.IdProducto;
                    const mostrarEnergia = idProducto === 52 || idProducto === 22 || idProducto === 1;
                    setMostrarF7(mostrarEnergia);
                }
                
                toast.dismiss(currentToastId.current);
                currentToastId.current = null;
                 
            } else {
                setCuentaData(null);
                localStorage.removeItem("cuentaDataCapturaVisita");
                expandir = false;
                toast.error("La cuenta a la que desean acceder no existe, verifíquela por favor");
                
                // Deshabilitar grupos y limpiar información (similar a ObtieneCuenta del C#)
                setGruposHabilitados(false);
                setExpedienteLabel("");
                setNombreDeudor("");
                setMostrarF7(false);
                setMostrarBtnCaptura(false);
                
                toast.dismiss(currentToastId.current);
                currentToastId.current = null;
            }
        } finally {
            setLoading(false);
            // Solo aquí se controla el modo expansivo
            if (typeof setMostrarTabla === "function") setMostrarTabla(expandir);
        }
    };

    // Función para capturar la visita - recolecta datos de todos los componentes hijos
    // Función de validación completa (equivalente a ValidaCaptura del C#)
    const validarCaptura = () => {
        toast.info("Validando visita...");
        
        // Validaciones previas básicas
        if (!direccionSeleccionada) {
            toast.warning("Primero selecciona un domicilio antes de continuar");
            return false;
        }
        
        if (!mostrarBtnCaptura) {
            toast.error("No es posible capturar para este domicilio");
            return false;
        }
        
        // Obtener datos de los componentes hijos
        const dataF2 = f2Ref.current?.getData() || {};
        const dataF4 = f4Ref.current?.getData() || {};
        const dataF5 = f5Ref.current?.getData() || {};
        const dataF7 = f7Ref.current?.getData() || {};
        
        const carteraNumero = parseInt(cartera, 10);
        
        // 1. Validar Fecha Visita vacía
        if (!dataF4.fechaVisita) {
            toast.error("Debe indicar la fecha de visita.");
            return false;
        }
        
        // 2. Validar Fecha Visita > hoy
        const fechaVisitaDate = new Date(dataF4.fechaVisita + 'T00:00:00');
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (fechaVisitaDate > hoy) {
            toast.error("La fecha de la visita no debe ser mayor al día actual.");
            return false;
        }
        
        // 3. Validar Mapeo/Habitación (F2)
        if (!dataF2.idHabitacion) {
            toast.error("Seleccione el mapeo de la visita.");
            return false;
        }
        
        // 3. Validar Situación si Contacto = Titular
        // Buscar el valor del contacto para comparar
        const contactoEsTitular = dataF4.idContacto && dataF4.valorContacto === "Titular";
        const contactoEsLeConoce = dataF4.idContacto && dataF4.valorContacto === "Le conoce";
        
        if (contactoEsTitular && !dataF4.idSituacion) {
            toast.error("Seleccione la situación de la visita.");
            return false;
        }
        
        // 4. Validar Causa No Pago si Contacto = Titular y Situación seleccionada
        if (contactoEsTitular && dataF4.idSituacion && !dataF4.idCausaNoPago) {
            toast.error("Seleccione la causa de no pago de la visita.");
            return false;
        }
        
        // 5. Validar Parentesco si Contacto = Le conoce
        if (contactoEsLeConoce && !dataF4.idParentesco) {
            toast.error("Seleccione el parentesco.");
            return false;
        }
        
        // 6. Validar Contacto vacío
        if (!dataF4.idContacto) {
            toast.error("Seleccione el contacto de la visita.");
            return false;
        }
        
        // 7. Validar Sucursal
        if (!dataF4.idSucursal) {
            toast.error("Seleccione la sucursal.");
            return false;
        }
        
        // 8. Validar Hora de visita (7:00 - 22:00)
        if (dataF4.horaVisita) {
            const [hora] = dataF4.horaVisita.split(':').map(Number);
            if (hora < 7 || hora > 21) {
                toast.error("La hora de la visita debe de ser dentro del horario laboral (7hrs - 22hrs).");
                return false;
            }
        } else {
            toast.error("Debe indicar la hora de visita.");
            return false;
        }
        
        // 9. Validar Visitador (máximo 4 caracteres)
        const visitador = dataF4.usuarioVisitador || "";
        if (visitador.trim().length > 4) {
            toast.error("El visitador debe tener máximo 4 caracteres.");
            return false;
        }
        
        // 10. Validar Observación (mínimo 5 caracteres)
        const observacion = dataF4.comentario || "";
        if (observacion.trim().length < 5) {
            toast.error("Escriba una observación de la visita más extensa.");
            return false;
        }
        
        // 11-13. Validaciones solo para carteras CFE (14 y 24)
        if (carteraNumero === 14 || carteraNumero === 24) {
            // 11. Validar Energía Eléctrica
            if (dataF7.energiaElectrica == null || dataF7.energiaElectrica === "") {
                toast.error("Seleccione si el deudor cuenta con energía eléctrica.");
                return false;
            }
            
            // 12. Validar Acuse de requerimiento
            if (dataF7.acuseRequerimiento == null || dataF7.acuseRequerimiento === "") {
                toast.error("Seleccione si el deudor cuenta con acuse de requerimiento de cobro.");
                return false;
            }
            
            // 13. Validar Fotografía del predio
            if (dataF7.fotografiaPredio == null || dataF7.fotografiaPredio === "") {
                toast.error("Seleccione si cuenta con fotografía del predio.");
                return false;
            }
        }
        
        // 14. Verificar calles vacías (mostrar confirmación)
        let callesVacias = [];
        if (!dataF5.calleHorizontalNorte?.trim()) callesVacias.push("Horizontal norte");
        if (!dataF5.calleHorizontalSur?.trim()) callesVacias.push("Horizontal sur");
        if (!dataF5.calleVerticalEste?.trim()) callesVacias.push("Vertical este");
        if (!dataF5.calleVerticalOeste?.trim()) callesVacias.push("Vertical oeste");
        
        if (callesVacias.length > 0) {
            // Guardar datos para confirmación posterior
            setDatosValidados({ dataF2, dataF4, dataF5, dataF7 });
            setCallesVaciasTexto(callesVacias.join(", "));
            setModalCallesVacias(true);
            return false; // Detener aquí, se continuará desde el modal
        }
        
        // 15. Si pasa todas las validaciones, mostrar confirmación de fecha
        setDatosValidados({ dataF2, dataF4, dataF5, dataF7 });
        setModalConfirmacionFecha(true);
        return false; // Detener aquí, se continuará desde el modal
    };
    
    // Handler para confirmar captura desde modal de calles vacías
    const handleConfirmarCallesVacias = () => {
        setModalCallesVacias(false);
        setModalConfirmacionFecha(true); // Mostrar siguiente confirmación
    };
    
    // Handler para confirmar captura desde modal de fecha
    const handleConfirmarFecha = () => {
        setModalConfirmacionFecha(false);
        // Ejecutar la captura real
        ejecutarCaptura();
    };
    
    // Handler para cancelar modales
    const handleCancelarModal = () => {
        setModalCallesVacias(false);
        setModalConfirmacionFecha(false);
        setDatosValidados(null);
    };
    
    // Función que ejecuta la captura real (llamada después de validación)
    // Equivalente a InsertaGestiónDomiciliaria() del C#
    const ejecutarCaptura = async () => {
        // Obtener el domicilio seleccionado para obtener su idDomicilio
        const domicilioData = cuentaData?.domicilios?.find(
            dom => dom.domicilio === direccionSeleccionada
        );
        
        if (!domicilioData) {
            toast.error("No se encontró el domicilio seleccionado");
            return;
        }
        
        setGuardando(true);
        toast.info("Guardando datos de captura...");
        
        try {
            // Recolectar datos de todos los componentes hijos
            const dataF2 = f2Ref.current?.getData() || {};
            const dataF3 = f3Ref.current?.getData() || {};
            const dataF4 = f4Ref.current?.getData() || {};
            const dataF5 = f5Ref.current?.getData() || {};
            const dataF6 = f6Ref.current?.getData() || {};
            const dataF7 = f7Ref.current?.getData() || {};
            
            // Geocodificación para carteras CFE (14 y 24)
            let latitud = null;
            let longitud = null;
            let coordenadasNoEncontradas = false;
            
            const carteraNumero = parseInt(cartera, 10);
            if (carteraNumero === 14 || carteraNumero === 24 || carteraNumero === 1) {
                // Construir dirección completa para geocodificación
                const direccionCompleta = direccionSeleccionada;
                
                toast.info("Obteniendo coordenadas...");
                
                try {
                    const coordenadas = await obtenerLatitudLongitud(direccionCompleta);
                    if (coordenadas && coordenadas.latitud && coordenadas.longitud) {
                        latitud = coordenadas.latitud;
                        longitud = coordenadas.longitud;
                    } else {
                        coordenadasNoEncontradas = true;
                    }
                } catch (geoError) {
                    console.warn("Error en geocodificación:", geoError);
                    coordenadasNoEncontradas = true;
                }
            }
            
            // Construir payload según el esquema exacto del endpoint
            const payload = {
                idEjecutivo: idEjecutivo,
                idCartera: carteraNumero,
                idCuenta: (cuentaData?.cuenta?.idCuenta || idCuenta).trim(),
                idDomicilio: domicilioData.idDomicilio || 0,
                fechaVisita: dataF4.fechaVisita + 'T00:00:00',
                horaVisita: dataF4.horaVisita,
                usuarioVisitador: (dataF4.usuarioVisitador || "").toUpperCase().trim(),
                idHabitacion: dataF2.idHabitacion || null,
                idContacto: dataF4.idContacto,
                idParentesco: dataF4.idParentesco || null,
                idSituacion: dataF4.idSituacion || null,
                idCausaNoPago: dataF4.idCausaNoPago || null,
                idSucursal: dataF4.idSucursal || null,
                atendio: dataF4.atendio || null,
                comentario: dataF4.comentario || null,
                colorFachada: dataF2.colorFachada || null,
                colorPuerta: dataF2.colorPuerta || null,
                colorHerreria: dataF2.colorHerreria || null,
                pisos: dataF2.pisos ? parseInt(dataF2.pisos, 10) : null,
                idVivienda: dataF2.idVivienda || null,
                idEconomico: dataF2.idEconomico || null,
                nombrePropietario: dataF2.nombrePropietario || null,
                autoMapeo: dataF3.autoMapeo || null,
                autoMarca: dataF3.autoMarca || null,
                autoModelo: dataF3.autoModelo || null,
                autoAño: dataF3.autoAño ? parseInt(dataF3.autoAño, 10) : null,
                autoPlacas: dataF3.autoPlacas || null,
                paquete: dataF4.paquete ? parseInt(dataF4.paquete, 10) : null,
                calleHorizontalNorte: dataF5.calleHorizontalNorte || null,
                calleHorizontalSur: dataF5.calleHorizontalSur || null,
                calleVerticalEste: dataF5.calleVerticalEste || null,
                calleVerticalOeste: dataF5.calleVerticalOeste || null,
                montoNegociacion: dataF4.montoNegociacion || null,
                fechaPagoNegociacion: dataF4.montoNegociacion ? dataF4.fechaPagoNegociacion + 'T00:00:00' : null,
                telefonosCapturados: dataF6.telefonosCapturados || [],
                numeroMedidor: dataF7.numeroMedidor || null,
                energiaElectrica: dataF7.energiaElectrica != null ? (dataF7.energiaElectrica === "Si" || dataF7.energiaElectrica === true) : null,
                acuseRequerimiento: dataF7.acuseRequerimiento != null ? (dataF7.acuseRequerimiento === "Si" || dataF7.acuseRequerimiento === true) : null,
                fotografiaPredio: dataF7.fotografiaPredio != null ? (dataF7.fotografiaPredio === "Si" || dataF7.fotografiaPredio === true) : null,
                latitud: latitud ? latitud.toString() : null,
                longitud: longitud ? longitud.toString() : null
            };
            
            console.log("Payload enviado al endpoint:", payload);
            
            // Enviar al servidor
            const response = await guardarVisitaCapturada(payload);
            
            // Manejar respuesta según el C#
            if (response && response.status === 200) {
                const data = response.data;
                
                // Verificar si el SP devolvió un mensaje de error
                if (data && data.Mensaje) {
                    toast.error(data.Mensaje);
                    return;
                }
                
                // Verificar si se obtuvieron coordenadas para CFE
                if ((carteraNumero === 14 || carteraNumero === 24) && coordenadasNoEncontradas) {
                    toast.warning("Visita guardada exitosamente. No se encontraron datos (latitud y/o longitud) del domicilio seleccionado.", {
                        duration: 6000
                    });
                } else {
                    toast.success("Visita guardada exitosamente.");
                }
                
                // Limpiar formulario después de captura exitosa
                limpiarCampos();
            } else {
                const errorMsg = response?.data?.message || response?.data?.Mensaje || "Falló al guardar la visita.";
                toast.error(errorMsg);
            }
            
        } catch (error) {
            console.error("Error al capturar visita:", error);
            toast.error("Ocurrió un error al guardar la visita. Intente nuevamente.");
        } finally {
            setGuardando(false);
        }
    };
    
    // Función para limpiar todos los campos después de captura exitosa
    const limpiarCampos = () => {
        // Limpiar dirección seleccionada
        setDireccionSeleccionada("");
        
        // Limpiar estados de validación
        setMensajeDomicilio("");
        setMostrarBtnCaptura(true);
        setFiltroHabitacion(null);
        setMapeoVivienda("");
        setMapeoViviendaId("");
        
        // Resetear fecha de visita
        const hoy = new Date();
        const hace30Dias = new Date();
        hace30Dias.setDate(hoy.getDate() - 30);
        setFechaVisita(hoy.toISOString().split('T')[0]);
        setFechaMinVisita(hace30Dias.toISOString().split('T')[0]);
        
        // Incrementar resetKey para forzar re-render de componentes hijos (F2-F7)
        setResetKey(prev => prev + 1);
        
        // Enfocar campo cuenta para siguiente captura
        setTimeout(() => {
            if (cuentaInputRef.current) {
                cuentaInputRef.current.focus();
            }
        }, 100);
    };

    // Puedes usar modalSize para cambiar la clase/tamaño del modal si el componente padre lo permite

    return (
        <div
            className={mostrarTabla
                ? "w-[73.33vw] max-w-[1016px] flex flex-col items-center mx-auto"
                : "w-[366px] max-w-full flex flex-col items-center mx-auto"
            }
            style={{ minHeight: 0, height: 'auto' }}
        >
            {/* Layout dinámico según mostrarTabla (modal expandido) */}
            {mostrarTabla ? (
                <>
                    {/* Header con título arriba y logo alineado a la izquierda */}
                    <div className="w-full px-[1vw] pt-[0.5vw] pb-2 flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-jerarquia3 truncate">{tipoInformacion}</h2>
                    </div>
                    <div className="flex flex-col w-full sm:grid sm:grid-cols-12 sm:items-center sm:gap-0 px-[1vw]">
                        {/* Logo alineado a la izquierda */}
                        <div className="w-full flex justify-center mb-2 sm:col-span-1 sm:w-auto sm:mb-0 sm:block">
                            <img src={ConsorcioLogo} alt="Logo Coorin" className="h-[2.5rem] w-[2.5rem] object-contain" />
                        </div>
                        {/* Cartera: más pequeño, responsive */}
                        <div className="relative w-full min-w-0 flex flex-col items-center mb-2 sm:col-span-1 sm:w-[6.66vw] sm:mb-0">
                            <select
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={cartera}
                                onChange={e => setCartera(e.target.value)}
                                id="cartera-select-carga-visits"
                            >
                                <option value="" hidden></option>
                                {carterasOptions.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                            <label htmlFor="cartera-select-carga-visits" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">Cartera</label>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center mb-2 sm:col-span-1 sm:w-[6vw] sm:ml-[1vw] sm:mb-0">
                            <label htmlFor="porExpediente" className="text-sm font-medium mb-[0.25rem] text-center flex items-center justify-center h-full">Expte.</label>
                            <input
                                id="porExpediente"
                                type="checkbox"
                                checked={porExpediente}
                                onChange={e => {
                                    if (e.target.checked) {
                                        setCuentaGuardada(idCuenta);
                                        setIdCuenta(expedienteLabel);
                                    } else {
                                        setExpedienteGuardado(idCuenta);
                                        setIdCuenta(cuentaGuardada);
                                    }
                                    setPorExpediente(e.target.checked);
                                }}
                                className="accent-jerarquia2 mt-[0.25rem]"
                                title="cambia a Expediente"
                            />
                        </div>
                        <div className="relative w-full min-w-0 flex flex-col items-center justify-center mb-2 sm:col-span-3 sm:w-[8vw] sm:ml-[1vw] sm:mr-[-1vw] sm:mb-0">
                            <input
                                ref={cuentaInputRef}
                                id="cuentaInput"
                                type="text"
                                inputMode={porExpediente ? "text" : "numeric"}
                                pattern={porExpediente ? undefined : "[0-9]*"}
                                value={idCuenta}
                                maxLength={porExpediente ? 12 : 16}
                                onChange={e => {
                                    let valor = e.target.value.trim();
                                    if (porExpediente) {
                                        // Permitir solo hasta 12 caracteres alfanuméricos
                                        valor = valor.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
                                    } else {
                                        valor = valor.replace(/\D/g, "").slice(0, 16);
                                    }
                                    setIdCuenta(valor);
                                }}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleBuscarCuenta();
                                    }
                                }}
                                onBlur={handleCuentaBlur}
                                placeholder=" "
                                style={{ color: 'var(--color-jerarquia3)' }}
                                className="peer p-4 block min-w-[150px] w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia4 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                title="Enter"
                            />
                            <label htmlFor="cuentaInput" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
                                {porExpediente ? "Expediente:" : "Cuenta:"}
                            </label>
                        </div>
                        {/* Dirección - dropdown animado */}
                        <div className="relative w-full max-w-lg flex flex-col items-center justify-center mb-2 sm:col-span-6 sm:w-[28vw] sm:ml-[-1vw] sm:mb-0">
                            <select
                                title={!tienePermisoCaptura ? "Sin permisos para capturar visitas" : "Selecciona alguno"}
                                className={`peer p-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
                                    !tienePermisoCaptura ? "bg-gray-200 cursor-not-allowed opacity-60" : "bg-gray-50"
                                }`}
                                value={direccionSeleccionada}
                                onChange={e => setDireccionSeleccionada(e.target.value)}
                                disabled={!tienePermisoCaptura}
                            >
                                <option value="" hidden></option>
                                {cuentaData && Array.isArray(cuentaData.domicilios) && cuentaData.domicilios.length > 0 &&
                                    cuentaData.domicilios.map((dom, idx) => (
                                        <option key={idx} value={dom.domicilio}>{dom.domicilio}</option>
                                    ))
                                }
                            </select>
                            <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">Dirección</label>
                        </div>
                    </div>
                    {/* Campos y áreas debajo de los elementos principales reorganizados */}
                    <div
                        className="w-full flex flex-col gap-4 mb-6 mt-4"
                        style={direccionSeleccionada ? {} : { pointerEvents: 'none', opacity: 0.6 }}
                        onClick={e => {
                            if (!direccionSeleccionada) {
                                e.stopPropagation();
                                toast.warning("Primero selecciona un domicilio antes de continuar");
                            }
                        }}
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 mb-4 w-full">
                            <div className="w-full sm:flex-1 min-w-0"><CapturaVisitsF2 ref={f2Ref} key={`f2-${resetKey}`} onMapeoChange={handleMapeoChange} filtroExcluirId={filtroHabitacion} /></div>
                            <div className="w-full sm:flex-[2] min-w-0"><CapturaVisitsF4 ref={f4Ref} key={`f4-${resetKey}`} mapeoVivienda={mapeoVivienda} /></div>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 w-full">
                            <div className="w-full sm:flex-1 min-w-0"><CapturaVisitsF3 ref={f3Ref} key={`f3-${resetKey}`} /></div>
                            <div className="w-full sm:basis-1/4 min-w-0"><CapturaVisitsF5 ref={f5Ref} key={`f5-${resetKey}`} disabled={!direccionSeleccionada} /></div>
                            {mostrarF6 && (
                                <div className="w-full sm:basis-1/6 min-w-0"><CapturaVisitsF6 ref={f6Ref} key={`f6-${resetKey}`} /></div>
                            )}
                            {mostrarF7 && (
                                <div className="w-full sm:basis-1/4 min-w-0"><CapturaVisitsF7 ref={f7Ref} key={`f7-${resetKey}`} disabled={!gruposHabilitados} /></div>
                            )}
                        </div>
                    </div>
                    {/* Mensaje de estado del domicilio */}
                    {mensajeDomicilio && (
                        <div className={`w-full text-center py-2 text-sm font-medium ${
                            mensajeColor === 'red' ? 'text-red-600' : 
                            mensajeColor === 'green' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                            {mensajeDomicilio}
                        </div>
                    )}
                    <div className="w-full mt-4 flex justify-center">
                        <button
                            id="btn-captura"
                            type="button"
                            className={`btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center items-center gap-2 ${(!direccionSeleccionada || !mostrarBtnCaptura || guardando) ? 'opacity-60 cursor-not-allowed' : ''}`}
                            disabled={!direccionSeleccionada || !mostrarBtnCaptura || guardando}
                            style={{ display: mostrarBtnCaptura ? 'flex' : 'none' }}
                            onClick={validarCaptura}
                        >
                            {guardando ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Guardando...
                                </>
                            ) : (
                                'Capturar'
                            )}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Layout original (modal pequeño) */}
                    <div className="flex flex-row items-center gap-6 w-full px-6 py-4">
                        <div className="flex-shrink-0">
                            <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                        </div>
                        <div className="flex flex-col flex-1 justify-center">
                            <h2 className="text-lg font-semibold text-jerarquia3 truncate mb-2">{tipoInformacion}</h2>
                            <div className="flex flex-row w-full gap-4">
                                {/* Cartera - dropdown animado modal pequeño */}
                                <div className="relative flex-1 min-w-[120px] min-w-0">
                                    <select
                                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={cartera}
                                        onChange={e => setCartera(e.target.value)}
                                        id="cartera-select-carga-visits"
                                    >
                                        <option value="" hidden></option>
                                        {carterasOptions.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nombre}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="cartera-select-carga-visits" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">Cartera</label>
                                </div>
                                <div className="flex flex-col flex-1 items-center justify-start">
                                    <label htmlFor="porExpediente" className="text-sm font-medium mb-1 text-center flex items-center justify-center h-full">Expdte.</label>
                                    <input
                                        id="porExpediente"
                                        type="checkbox"
                                        checked={porExpediente}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setCuentaGuardada(idCuenta);
                                                setIdCuenta(expedienteLabel);
                                            } else {
                                                setExpedienteGuardado(idCuenta);
                                                setIdCuenta(cuentaGuardada);
                                            }
                                            setPorExpediente(e.target.checked);
                                        }}
                                        className="accent-jerarquia2 mt-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6 pb-4">
                        <div className="flex flex-row gap-4 w-full items-center">
                            {/* Cuenta/Expediente - input animado modal pequeño */}
                            <div className="relative flex-1 justify-center">
                                <input
                                    id="cuentaInput"
                                    type="text"
                                    inputMode={porExpediente ? "text" : "numeric"}
                                    pattern={porExpediente ? undefined : "[0-9]*"}
                                    value={idCuenta}
                                    maxLength={porExpediente ? 12 : 16}
                                    onChange={e => {
                                        let valor = e.target.value.trim();
                                        if (porExpediente) {
                                            // Permitir solo hasta 12 caracteres alfanuméricos
                                            valor = valor.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
                                        } else {
                                            valor = valor.replace(/\D/g, "").slice(0, 16);
                                        }
                                        setIdCuenta(valor);
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleBuscarCuenta();
                                        }
                                    }}
                                    onBlur={handleCuentaBlur}
                                    placeholder=" "
                                    style={{ color: 'var(--color-jerarquia3)' }}
                                    className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                />
                                <label htmlFor="cuentaInput" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
                                    {porExpediente ? "Expediente:" : "Cuenta:"}
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* Footer informativo */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 12 }}>
                <span className="text-gray-600 text-sm pl-2">
                    {footerMsg}
                </span>
            </div>
            
            {/* Modal de confirmación: Calles vacías */}
            {modalCallesVacias && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Calles sin capturar</h3>
                        </div>
                        <p className="text-gray-600 mb-2">Las siguientes calles están vacías:</p>
                        <p className="text-gray-800 font-medium mb-4 pl-4">{callesVaciasTexto}</p>
                        <p className="text-gray-600 mb-6">¿Desea continuar de todas formas?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={handleCancelarModal}
                            >
                                No, regresar
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-white bg-jerarquia1 rounded-lg hover:bg-jerarquia2 transition-colors"
                                onClick={handleConfirmarCallesVacias}
                            >
                                Sí, continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Modal de confirmación: Fecha de visita */}
            {modalConfirmacionFecha && datosValidados && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Confirmar captura</h3>
                        </div>
                        <p className="text-gray-600 mb-2">¿Desea capturar la visita con fecha:</p>
                        <p className="text-gray-800 font-bold text-lg mb-1 text-center">
                            {datosValidados.dataF4?.fechaVisita ? new Date(datosValidados.dataF4.fechaVisita + 'T00:00:00').toLocaleDateString('es-MX', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            }) : ''}
                        </p>
                        <p className="text-gray-500 text-sm mb-6 text-center">
                            {datosValidados.dataF4?.fechaVisita}
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={handleCancelarModal}
                            >
                                No, cancelar
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                onClick={handleConfirmarFecha}
                            >
                                Sí, capturar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaptureVisit;
