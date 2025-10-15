import React, { useState, useRef, useEffect } from "react";
import GridExecutives from "./board/executives/GridExecutives";
import { CoorinSidebar } from "./sideBar/CoorinSidebar";
import GridConsultations from "./board/consultations/GridConsultations";
import TablaSesiones from "../dashboard/board/sessions/TablaSesiones";
import RamificacionSesiones from "../dashboard/board/sessions/RamificacionSesiones";
import ModalBase from "./board/ModalBase";
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
import VGPContent from "./sideBar/consultations/information/VGP";
import EmailTemplates from "./sideBar/Administration/gespa/emailTemplates/EmailTemplates";
import ModalBaseCampanas from "./sideBar/Administration/ModalBaseCampanas";


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
  
  // Función para cerrar el sidebar (será pasada al CoorinSidebar)
  const [closeSidebarFn, setCloseSidebarFn] = useState(null);

  // Efecto para cerrar el sidebar cuando se abran modales de las cards
  useEffect(() => {
    if ((executiveModalOpen || consultationModalOpen) && closeSidebarFn) {
      closeSidebarFn();
    }
  }, [executiveModalOpen, consultationModalOpen, closeSidebarFn]);

  // Mapeo directo para renderizar cada componente con su propio modal
  // Estado para controlar si la tabla de Pagos reportados está visible
  const [mostrarTablaPagosReportados, setMostrarTablaPagosReportados] = useState(false);

  const renderSelectedComponent = () => {
    const closeModal = () => {
      setModalSidebarOpen(false);
      setMostrarTablaPagosReportados(false); // Reiniciar al cerrar
    };

    // Componentes de información que usan el ModalBaseInformacion
    const informationComponents = [
      "Lista Negra", "Arrepentimientos",
      "Pagos", "Pagos reportados", "Datos Erroneos", "Domicilios", 
      "Correos", "Búsquedas", "Ofrecimientos", "Comentarios", "VGP"
    ];

    if (informationComponents.includes(selectedSidebarOption)) {
      let ContentComponent;

      switch (selectedSidebarOption) {
        case "Lista Negra":
          ContentComponent = DarkListContent;
          break;
        case "Arrepentimientos":
          ContentComponent = RegrestContent;
          break;
        case "Pagos":
          ContentComponent = PaymentsContent;
          break;
        case "Pagos reportados":
          ContentComponent = (props) => (
            <ReportingPaymentsContent
              mostrarTabla={mostrarTablaPagosReportados}
              setMostrarTabla={setMostrarTablaPagosReportados}
              {...props}
            />
          );
          break;
        case "Datos Erroneos":
          ContentComponent = WrongsContent;
          break;
        case "Domicilios":
          ContentComponent = AddressesContent;
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
        case "Comentarios":
          ContentComponent = CommentsContent;
          break;
        case "VGP":
          ContentComponent = VGPContent;
          break;
        default:
          ContentComponent = null;
      }

      // Usar size='pagos' por default y size='pagos-xl' cuando mostrarTablaPagosReportados sea true
      let size = undefined;
      if (selectedSidebarOption === "Pagos reportados") {
        size = mostrarTablaPagosReportados ? "pagos-xl" : "pagos";
      }

      return (
        <ModalBaseInformacion onClose={closeModal} tipoInformacion={selectedSidebarOption} size={size}>
          {ContentComponent && <ContentComponent />}
        </ModalBaseInformacion>
      );
    }
    
    // Otros componentes que mantienen su lógica original
    switch (selectedSidebarOption) {
      case "Campañas":
        return <ModalBaseCampanas open={modalSidebarOpen} onClose={closeModal} />;
      case "Plantillas Correo":
        return <EmailTemplates onClose={closeModal} />;
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
    // Cerrar sidebar en móviles después del click
    setSidebarOpen(false);

    // Mapeo de IDs del sidebar a opciones del modal
    const sidebarOptionsMap = {
      "2BB": "Lista Negra", // Lista Negra
      "3BB": "Arrepentimientos", // Arrepentimientos
      "1BBB": "Pagos", // Pagos
      "2BBB": "Pagos reportados", // Pagos reportados
      "3BBB": "Datos Erroneos", // Datos Erróneos
      "4BBB": "Domicilios", // Domicilios
      "5BBB": "Correos", // Correos
      "6BBB": "Búsquedas", // Búsquedas
      "7BBB": "Ofrecimientos", // Ofrecimientos
      "8BBB": "Comentarios", // Comentarios
      "9BBB": "VGP", // VGP
      "2AAA": "Plantillas Correo", // Plantillas Correo
      "1AA": "Campañas",
      "1DD": "Campañas",
      "1EE": "Campañas",

    };

    // Si el menuId está en el mapeo, abrir el modal con la opción correspondiente
    if (sidebarOptionsMap[menuId]) {
      const option = sidebarOptionsMap[menuId];
      console.log(`Abriendo modal para: ${option} (ID: ${menuId})`);
      setSelectedSidebarOption(option);
      setModalSidebarOpen(true);
    } else {
      console.log(`Click en menú: ${menuTitle} (ID: ${menuId})`);
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
        isModalOpen={executiveModalOpen || consultationModalOpen}
        onRegisterCloseFunction={setCloseSidebarFn}
      />
      <main className="flex-1 bg-background-dashboard h-screen relative z-0 flex flex-col overflow-hidden">
        <div
          className="transition-transform duration-200 flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            marginLeft: sidebarMinified ? "2.5rem" : undefined,
            marginBottom: "0",
            marginTop: "0",
            maxHeight: "100vh"
          }}
        >
          <div className="relative z-0 py-14 sm:py-2">
            <div className="w-full px-4 lg:px-8 relative pt-8">
              <span className="text-3xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
                Ejecutivos
              </span>

              <div className="mt-2 grid grid-cols-6 gap-4 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0">
                <div className="col-span-6">
                  <GridExecutives 
                    onModalOpen={() => setExecutiveModalOpen(true)}
                    onModalClose={() => setExecutiveModalOpen(false)}
                  />
                </div>
              </div>

              <div className="col-span-6 row-start-2 relative">
                <div className="flex justify-between items-start mb-4 mt-4">
                  <span className="text-3xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
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
                <div className="relative w-full">
                  <RamificacionSesiones
                    onExecutiveSelect={setSelectedExecutiveId}
                  />
                </div>
                <div className="relative w-full">
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
