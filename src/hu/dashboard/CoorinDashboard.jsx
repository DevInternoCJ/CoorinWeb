
import React, { useState, useRef, useEffect, Suspense, lazy} from "react";
import GridExecutives from "./board/executives/GridExecutives";
import { CoorinSidebar } from "./sideBar/CoorinSidebar";
import GridConsultations from "./board/consultations/GridConsultations";
import TablaSesiones from "../dashboard/board/sessions/TablaSesiones";
import RamificacionSesiones from "../dashboard/board/sessions/RamificacionSesiones";
import DarkListContent from "./sideBar/consultations/DarkList";
import RegrestContent from "./sideBar/consultations/Regrest";
import ModalBaseInformacion from "./sideBar/consultations/information/ModalBaseInformacion";
import PaymentsContent from "./sideBar/consultations/information/Payments";
import ReportingPaymentsContent from "./sideBar/consultations/information/ReportingPayments";
import WrongsContent from "./sideBar/consultations/information/Wrongs";
import AddressesContent from "./sideBar/consultations/information/Addresses";
import EmailsContent from "./sideBar/consultations/information/Emails";
import SearchesContent from "./sideBar/consultations/information/Searches";
import OffersContent from "./sideBar/consultations/information/Offers";
import CommentsContent from "./sideBar/consultations/information/Comments";
import EmailTemplates from "./sideBar/Administration/gespa/emailTemplates/EmailTemplates";
import ModalBaseCampanas from "./sideBar/Administration/Campanias/ModalBaseCampanas";
import Phrases from "./sideBar/Administration/gespa/phrases/Phrases";
import ConsultVisitContent from "./sideBar/processes/visits/ConsultaVisits";
import CaptureVisit from "./sideBar/processes/visits/Capture/CaptureVisit";
import LoadVisitsContent from "./sideBar/processes/visits/LoadVisits";
import ModalAccionamientos from "./sideBar/processes/accionamientos/ModalAccionamientos";
import ModalBaseAccionamientos from "./sideBar/processes/accionamientos/ModalBaseAccionamientos";
import ModalGestiones from "./sideBar/processes/managements/ModalGestiones";
import ModalSupervisor from "./sideBar/processes/supervisor/ModalSupervisor";
import IconCircular from "../../components/iconos/IconCircular";
import ConsorcioLogo from "../../../src/assets//CoorinBlack.svg";
import { useDashboardModalUrlSync } from "../../hooks/useDashboardModalUrlSync";

const Comments = lazy(() => import("./sideBar/processes/gespa/comments/Comments"));

export default function CoorinDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState(null);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [modalSidebarOpen, setModalSidebarOpen] = useState(false);
  const [selectedSidebarOption, setSelectedSidebarOption] = useState("");
  // Estados para controlar modales de las cards
  const [executiveModalOpen, setExecutiveModalOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [accionamientosModalOpen, setAccionamientosModalOpen] = useState(false);
  // Estado para el path del sidebar modal (usado para la URL)
  const [sidebarModalPath, setSidebarModalPath] = useState("");
  // Función para cerrar el sidebar (será pasada al CoorinSidebar)
  const [closeSidebarFn, setCloseSidebarFn] = useState(null);

  // Sincronizar URL con el modal del sidebar abierto
  useDashboardModalUrlSync(
    "SideBar",
    modalSidebarOpen ? sidebarModalPath : ""
  );



    const [cuentaDataCapturaVisita, setCuentaDataCapturaVisita] = useState(null);

  // Mapeo directo para renderizar cada componente con su propio modal

  // Estado para controlar si la tabla de Pagos reportados está visible
  const [mostrarTablaPagosReportados, setMostrarTablaPagosReportados] = useState(false);
  // Estado para controlar si la tabla de Domicilios está visible
  const [mostrarTablaDomicilios, setMostrarTablaDomicilios] = useState(false);

    // Estado para controlar el tamaño del modal de arrepentimientos
  const [regrestModalSize, setRegrestModalSize] = useState('pagos');

        // Estado para controlar el tamaño del modal de Captura Visitas
      const [captureVisitModalSize, setCaptureVisitModalSize] = useState("capturaVisit");
      const handleGrowCaptureVisitModal = (grow) => {
        // Solo expandir, no volver atrás si ya está expandido
        if (grow && captureVisitModalSize !== "pagos-xl") {
          setCaptureVisitModalSize("pagos-xl");
        }
      };

      // Efecto para cerrar el sidebar cuando se abran modales de las cards
  useEffect(() => {
    if ((executiveModalOpen || consultationModalOpen) && closeSidebarFn) {
      closeSidebarFn();
    }
  }, [executiveModalOpen, consultationModalOpen, closeSidebarFn]);

  const renderSelectedComponent = () => {
    const closeModal = () => {
      setModalSidebarOpen(false);
      setSidebarModalPath(""); // Limpiar el path para actualizar la URL
      setMostrarTablaPagosReportados(false); // Reiniciar al cerrar
      setCaptureVisitModalSize("capturaVisit"); // Reiniciar tamaño al cerrar
      setCuentaDataCapturaVisita(null); // Limpiar datos de cuenta al cerrar
    };

    // Componentes de información que usan el ModalBaseInformacion
    const informationComponents = [
      "información", // Carrusel circular con todos los componentes
      "Lista Negra", "Arrepentimientos",
      "Pagos", "Pagos Reportados", "Datos Erroneos", "Domicilios", 
      "Correos", "Búsquedas", "Ofrecimientos", "Comentarios",
      "Consulta Visitas", "Captura Visitas", "Carga Visitas"
    ];

    if (informationComponents.includes(selectedSidebarOption)) {
      let ContentComponent;
      let contentProps = {};
      switch (selectedSidebarOption) {
        case "información":
          // No necesita ContentComponent - ModalBaseInformacion muestra ModalCicle directamente
          ContentComponent = null;
          break;
        case "Lista Negra":
          ContentComponent = DarkListContent;
          break;
        case "Arrepentimientos":
          ContentComponent = RegrestContent;
          contentProps = {
            growModal: () => setRegrestModalSize('pagos-xl'),
            isExpanded: regrestModalSize === 'pagos-xl'
          };
          break;
        case "Pagos":
          ContentComponent = PaymentsContent;
          break;
        case "Pagos Reportados":
          ContentComponent = ReportingPaymentsContent;
          contentProps = {
            mostrarTabla: mostrarTablaPagosReportados,
            setMostrarTabla: setMostrarTablaPagosReportados
          };
          break;
        case "Datos Erroneos":
          ContentComponent = WrongsContent;
          contentProps = {
            mostrarTabla: mostrarTablaPagosReportados,
            setMostrarTabla: setMostrarTablaPagosReportados
          };
          break;
        case "Domicilios":
          ContentComponent = AddressesContent;
          contentProps = {
            mostrarTabla: mostrarTablaDomicilios,
            setMostrarTabla: setMostrarTablaDomicilios
          };
          break;
        case "Correos":
          ContentComponent = EmailsContent;
          break;
        case "Búsquedas":
          ContentComponent = SearchesContent;
          break;
        case "Ofrecimientos":
          ContentComponent = OffersContent;
          break;
        case "Contultas Comentarios":
          ContentComponent = CommentsContent;
          break;
        case "Consulta Visitas":
          ContentComponent = ConsultVisitContent;
          break;
        case "Captura Visitas":
          ContentComponent = CaptureVisit;
          contentProps = {
            mostrarTabla: captureVisitModalSize === "pagos-xl",
            setMostrarTabla: grow => handleGrowCaptureVisitModal(grow),
            cuentaData: cuentaDataCapturaVisita,
            setCuentaData: setCuentaDataCapturaVisita
          };
          break;
        case "Carga Visitas":
          ContentComponent = LoadVisitsContent;
          contentProps = {
            mostrarTabla: false,
            setMostrarTabla: () => {},
            onClose: closeModal
          };
          break;
        default:
          ContentComponent = null;
      }

      // Usar size='pagos' por default y size='pagos-xl' cuando mostrarTablaPagosReportados o mostrarTablaDomicilios sea true
      let size = undefined;
      if (selectedSidebarOption === "información") {
        size = "pagos"; // Carrusel en tamaño normal, se expande con mostrarTabla
      } else if (selectedSidebarOption === "Pagos Reportados") {
        size = mostrarTablaPagosReportados ? "pagos-xl" : "pagos";
      } else if (selectedSidebarOption === "Domicilios") {
        size = mostrarTablaDomicilios ? "pagos-xl" : "pagos";
      } else if (selectedSidebarOption === "Datos Erroneos") {
        size = mostrarTablaPagosReportados ? "pagos-xl" : "pagos";
      } else if (selectedSidebarOption === "Captura Visitas") {
        size = captureVisitModalSize;
      } else if (selectedSidebarOption === "Arrepentimientos") {
        size = regrestModalSize;
      }

      return (
        <ModalBaseInformacion
          onClose={closeModal}
          tipoInformacion= {selectedSidebarOption}
          mostrarTabla={mostrarTablaPagosReportados}
          setMostrarTabla={setMostrarTablaPagosReportados}
          size={size}
          infoCuenta={selectedSidebarOption === "Captura Visitas" ? cuentaDataCapturaVisita : undefined}
        >
          {ContentComponent && <ContentComponent {...contentProps} />}
        </ModalBaseInformacion>
      );
    }
    
    // Otros componentes que mantienen su lógica original
    switch (selectedSidebarOption) {
      case "Campañas":
        return <ModalBaseCampanas open={modalSidebarOpen} onClose={closeModal} />;
      case "Plantillas Correo":
        return <EmailTemplates onClose={closeModal} />;
      case "Frases":
        return <Phrases onClose={closeModal} />;
      case "Accionamientos":
        return <ModalBaseInformacion tipoInformacion="Accionamientos" onClose={closeModal} />;
      case "Gestiones":
        return <ModalBaseInformacion tipoInformacion="Gestiones" onClose={closeModal} />;
      case "Supervisor":
        return <ModalSupervisor onClose={closeModal} />;
      case "Comentarios":
        return   <Suspense fallback={<div className="text-center p-10">Cargando comentarios...</div>}>
      <Comments onClose={closeModal} />
    </Suspense>;
      default:
        return null;
    }
  };


  // Efecto para detectar clics fuera del sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el sidebar está abierto y se hizo clic fuera del sidebar y del botón
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    // Agregar el event listener cuando el componente se monta
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Función para manejar clicks del sidebar
  const handleSidebarMenuClick = (menuId, menuTitle) => {
    console.log("=== DASHBOARD RECIBE ===");
    console.log("menuId recibido:", menuId);
    console.log("menuTitle recibido:", menuTitle);
    
    // Cerrar sidebar en móviles después del click
    setSidebarOpen(false);

    // Mapeo de IDs del sidebar a opciones del modal
    // IDs compuestos: parentId_childId para diferenciar elementos duplicados
    const sidebarOptionsMap = {
      // === Consulta (IDs únicos, sin padre) ===
      "1BB": "información", // Información - abre carrusel circular
      
      // === Administración ===
      "1AA": "Campañas",
      "2AA_2AAA": "Plantillas Correo",
      "2AA_3AAA": "Frases",
      
      // === Procesos > Gespa (padre: 1CC) ===
      "1CC_1CCC": "Comentarios",
      "1CC_2CCC": "Definición",
      "1CC_3CCC": "Arrepentimientos",
      "1CC_4CCC": "Bloqueo cuentas",
      "1CC_5CCC": "Sucursales",
      "1CC_6CCC": "Cargos en línea",
      "1CC_7CCC": "Estados de cuenta",
      
      // === Procesos > Visitas (padre: 2CC) ===
      "2CC_1CCC": "Consulta Visitas",
      "2CC_2CCC": "Captura Visitas",
      "2CC_3CCC": "Carga Visitas",
      "2CC_4CCC": "Corregir Visitas",
      "2CC_5CCC": "Eliminar Visitas",
      
      // === Procesos > Correos (padre: 3CC) ===
      "3CC_1CCC": "Configuración Correos",
      "3CC_2CCC": "Envios Ejecutivos",
      "3CC_3CCC": "Carga Conversación",
      
      // === Procesos > Accionamientos (padre: 4CC) ===
      "4CC_1CCC": "Informe",
      "4CC_2CCC": "Carga Accionamientos",
      "4CC_3CCC_1CCCC": "Captura Carteo",
      "4CC_3CCC_2CCCC": "Consulta Carteo",
      "4CC": "Accionamientos", // Agregar para abrir modal con tabs
      
      // === Procesos sin submenú (IDs únicos) ===
      "5CC": "Gestiones",
      "6CC": "Supervisor",
      "13CC": "Metas",
      
      // === Reportes ===
      "1DD": "Campañas",
      "2DD_1DDD": "Plantillas Correo",
      "2DD_2DDD": "Catalogos",
    };

    console.log("Buscando en mapa:", menuId);
    console.log("Encontrado:", sidebarOptionsMap[menuId]);

    // Lista de opciones que tienen componente implementado
    const implementedOptions = [
      "información", "Lista Negra", "Arrepentimientos",
      "Pagos", "Pagos Reportados", "Datos Erroneos", "Domicilios", 
      "Correos", "Búsquedas", "Ofrecimientos", "Comentarios",
      "Consulta Visitas", "Captura Visitas", "Carga Visitas",
      "Campañas", "Plantillas Correo", "Frases", "Accionamientos", "Gestiones", "Supervisor"
    ];

    // Si el menuId está en el mapeo, abrir el modal con la opción correspondiente
    if (sidebarOptionsMap[menuId]) {
      const option = sidebarOptionsMap[menuId];
      
      // Verificar si la opción tiene componente implementado
      if (!implementedOptions.includes(option)) {
        console.log("⚠️ Opción sin implementar:", option);
        // No abrir modal, solo mostrar mensaje en consola (o podrías mostrar un toast)
        return;
      }
      
      console.log("✅ Abriendo modal con opción:", option, "menuId:", menuId);
      setSidebarModalPath(option); // Usar el nombre del modal para la URL
      setSelectedSidebarOption(option);
      setModalSidebarOpen(true);
      // Reiniciar tamaño del modal de arrepentimientos al abrir
      if (option === "Arrepentimientos") setRegrestModalSize('pagos');
    } else {
      // Si no está en el mapeo, verificar si el título está implementado
      if (!implementedOptions.includes(menuTitle)) {
        console.log("⚠️ Opción sin implementar:", menuTitle);
        return;
      }
      
      console.log("❌ No encontrado en mapa, usando título:", menuTitle);
      setSidebarModalPath(menuTitle); // Usar el título para la URL
      setSelectedSidebarOption(menuTitle);
      setModalSidebarOpen(true);
    }
  };

  // Estado que refleja si la sidebar está en modo minificado (body tiene la clase hs-overlay-minified)
  const [sidebarMinified, setSidebarMinified] = useState(
    typeof document !== "undefined" &&
      document.body.classList.contains("hs-overlay-minified")
  );

  // Observador de cambios en el atributo 'class' del body para detectar cuando la sidebar entra/sale de modo minificado
  useEffect(() => {
    if (typeof document === "undefined") return;
    const update = () =>
      setSidebarMinified(
        document.body.classList.contains("hs-overlay-minified")
      );
    const mo = new MutationObserver(() => update());
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    // llamada inicial por si cambió antes del mount
    update();
    return () => mo.disconnect();
  }, []);

  return (
    <>
      <CoorinSidebar
        onMenuClick={handleSidebarMenuClick}
        // Consider any modal opened in the dashboard (cards or sidebar) as a modal open state
        isModalOpen={
          executiveModalOpen || consultationModalOpen || modalSidebarOpen
        }
        onRegisterCloseFunction={setCloseSidebarFn}
      />
      <main className="flex-1 h-screen flex flex-col overflow-hidden">
        <div
          className="transition-transform duration-200 flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            marginLeft: sidebarMinified ? "2.5rem" : "2.5rem", // 16rem = w-64
            marginBottom: "0",
            marginTop: "0",
            maxHeight: "100vh",
          }}
        >
          <div className=" py-5 sm:py-2">
            <div className="w-full px-0 lg:px-8 pt-0">
              <div className="flex justify-between items-center mb-0 mt-0 p-0">
                <span className="rounded-2xl backdrop-blur-sm flex items-center gap-2 title-dashboard text-3xl font-medium tracking-tight text-balance sm:text-3xl">
                  <IconCircular
                    size="size-10"
                    borderWidth="border-2"
                    bgColor="bg-jerarquia3/10"
                    textColor="text-jerarquia2"
                    borderColor="border-jerarquia3/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25em"
                      height="1em"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M31-33c-9.3 9.4-9.3 24.6 0 34l56 56c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65-33c-9.4-9.4-24.6-9.4-33.9 0zm578 0c-9.4-9.4-24.6-9.4-33.9 0L519 23c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L609 1c9.4-9.4 9.4-24.6 0-33.9zM65 545l56-56c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L31 511c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0zm544 0c9.4-9.4 9.4-24.6 0-33.9l-56-56c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l56 56c9.4 9.4 24.6 9.4 33.9 0M320 208a64 64 0 1 0 0-128a64 64 0 1 0 0 128m0 32c-61.9 0-112 50.1-112 112v8c0 13.3 10.7 24 24 24h176c13.3 0 24-10.7 24-24v-8c0-61.9-50.1-112-112-112m216-80a56 56 0 1 0-112 0a56 56 0 1 0 112 0m-84.8 100.4c18.2 25.9 28.8 57.5 28.8 91.6v8c0 8.4-1.4 16.5-4.1 24h78.8c11.8 0 21.3-9.6 21.3-21.3V352c0-53-43-96-96-96c-10 0-19.7 1.5-28.8 4.4m-262.4 0c-9.1-2.9-18.8-4.4-28.8-4.4c-53 0-96 43-96 96v10.7c0 11.8 9.6 21.3 21.3 21.3h78.8c-2.7-7.5-4.1-15.6-4.1-24v-8c0-34.1 10.6-65.7 28.8-91.6M216 160a56 56 0 1 0-112 0a56 56 0 1 0 112 0"
                      ></path>
                    </svg>
                  </IconCircular>
                  Ejecutivos
                </span>
                {/* Logo y texto con efecto de gota */}
                <div className="flex items-center relative">
                  <span 
                    className="text-4xl font-medium text-black tracking-[-0.02em] flex items-center gap-3 relative"
                    style={{
                      background: 'linear-gradient(90deg, rgba(249, 250, 251, 0) 0%, rgba(249, 250, 251, 0.4) 20%, rgba(249, 250, 251, 0.8) 40%, #f9fafb 60%, #ffffff 100%)',
                      padding: '6px 12px 6px 16px',
                      borderRadius: '24px',
                     
                      zIndex: 1
                    }}
                  >
                    Coorin
                    <img
                      src={ConsorcioLogo}
                      alt="Consorcio Jurídico"
                      style={{
                        height: "48px",
                        width: "48px",
                        objectFit: "contain"
                      }}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-6 gap-4 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0">
                <div className="col-span-6">
                  <GridExecutives
                    onModalOpen={() => setExecutiveModalOpen(true)}
                    onModalClose={() => setExecutiveModalOpen(false)}
                  />
                </div>
              </div>

              <div className="col-span-6 row-start-2 ">
                <div className="flex justify-between items-center mb-4 mt-4">
                  <span className="rounded-2xl flex items-center gap-2 title-dashboard text-3xl font-medium tracking-tight text-balance sm:text-3xl">
                    <IconCircular
                      size="size-10"
                      borderWidth="border-2"
                      bgColor="bg-jerarquia3/10"
                      textColor="text-jerarquia2"
                      borderColor="border-jerarquia3/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.25em"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208m-111 17c9.4-9.4 9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31H128c-13.3 0-24 10.7-24 24s10.7 24 24 24h102.1l-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72z"
                        ></path>
                      </svg>
                    </IconCircular>
                    Consultas
                  </span>
                </div>
                <div className="-mt-2">
                  <GridConsultations
                    onModalOpen={() => setConsultationModalOpen(true)}
                    onModalClose={() => setConsultationModalOpen(false)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 w-full mb-8">
                <div className=" w-full">
                  <RamificacionSesiones
                    onExecutiveSelect={setSelectedExecutiveId}
                  />
                </div>
                <div className=" w-full">
                  <TablaSesiones selectedExecutiveId={selectedExecutiveId} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalSidebarOpen && renderSelectedComponent()}
      </main>
    </>
  );
}
