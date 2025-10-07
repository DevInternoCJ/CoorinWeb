import React, { useState, useRef, useEffect } from "react";
import GridExecutives from "./board/executives/GridExecutives";
import { CoorinSidebar } from "./sideBar/CoorinSidebar";
import GridConsultations from "./board/consultations/GridConsultations";
import TablaSesiones from "../dashboard/board/sessions/TablaSesiones";
import RamificacionSesiones from "../dashboard/board/sessions/RamificacionSesiones";
import ModalBase from "./board/ModalBase";
import DarkList from "./sideBar/consultations/DarkList";
import Regrest from "./sideBar/consultations/Regrest";
import Payments from "./sideBar/consultations/information/Payments";
import ReportingPayments from "./sideBar/consultations/information/ReportingPayments";
import Wrongs from "./sideBar/consultations/information/Wrongs";
import Addresses from "./sideBar/consultations/information/Addresses";
import Emails from "./sideBar/consultations/information/Emails";
import Searches from "./sideBar/consultations/information/Searches";
import Offers from "./sideBar/consultations/information/Offers";
import Comments from "./sideBar/consultations/information/Comments";
import VGP from "./sideBar/consultations/information/VGP";
import EmailTemplates from "./sideBar/Administration/gespa/emailTemplates/EmailTemplates";
import ModalBaseCampanas from "./sideBar/Administration/ModalBaseCampanas";

export default function CoorinDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState(null);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [modalSidebarOpen, setModalSidebarOpen] = useState(false);
  const [selectedSidebarOption, setSelectedSidebarOption] = useState("");
  
  // Mapeo directo para renderizar cada componente con su propio modal
  const renderSelectedComponent = () => {
    const closeModal = () => setModalSidebarOpen(false);
    
    switch (selectedSidebarOption) {
      case "Campañas":
        return <ModalBaseCampanas open={modalSidebarOpen} onClose={closeModal} />;
      case "Lista Negra":
        return <DarkList onClose={closeModal} />;
      case "Arrepentimientos":
        return <Regrest onClose={closeModal} />;
      case "Pagos":
        return <Payments onClose={closeModal} />;
      case "Pagos reportados":
        return <ReportingPayments onClose={closeModal} />;
      case "Datos Erroneos":
        return <Wrongs onClose={closeModal} />;
      case "Domicilios":
        return <Addresses onClose={closeModal} />;
      case "Correos":
        return <Emails onClose={closeModal} />;
      case "Búsquedas":
        return <Searches onClose={closeModal} />;
      case "Ofrecimientos":
        return <Offers onClose={closeModal} />;
      case "Comentarios":
        return <Comments onClose={closeModal} />;
      case "VGP":
        return <VGP onClose={closeModal} />;
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

  // Función específica para manejar Plantillas Correo (mantener eventos separados)
  const handlePlantillasCorreoClick = () => {
    handleSidebarMenuClick("2AAA", "Plantillas Correo");
    };

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
      console.log(`✅ Abriendo modal para: ${option} (ID: ${menuId})`);
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
        onPlantillasCorreoClick={handlePlantillasCorreoClick}
      />

      {/* Contenedor principal que ocupa todo el alto sin generar scroll global */}
      <main className="flex-1 bg-background-dashboard min-h-0 relative z-0 flex flex-col">
        {/* Contenedor interno con overflow-auto para permitir scroll solo cuando el contenido excede el área disponible */}
        <div
          className="transition-transform duration-200 flex-1 min-h-0 overflow-auto"
          style={{
            marginLeft: sidebarMinified ? "2.5rem" : undefined,
            marginBottom: "0",
            marginTop: "0",
          }}
        >
          <div className="relative z-0 py-14 sm:py-2">
            <div className="w-full px-4 lg:px-8 relative pt-8">
              <span className="text-3xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
                Ejecutivos
              </span>

              <div className="mt-2 grid grid-cols-6 gap-4 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0">
                <div className="col-span-6">
                  <GridExecutives />
                </div>
              </div>

              <div className="col-span-6 row-start-2 relative">
                <div className="flex justify-between items-start mb-4 mt-4">
                  <span className="text-3xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
                    Consultas
                  </span>
                </div>
                <div className="-mt-2">
                  <GridConsultations />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 w-full">
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

        {/* Renderizar componente seleccionado */}
        {modalSidebarOpen && renderSelectedComponent()}
      </main>
    </>
  );
}
