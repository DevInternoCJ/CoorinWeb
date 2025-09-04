import React, { useState } from "react";
import GridExecutives from "./board/executives/GridExecutives";
import { CoorinSidebar } from "./sideBar/CoorinSidebar";
import GridConsultations from "./board/consultations/GridConsultations";
import Menu from "../../assets/menu.svg";
import TablaSesiones from "../dashboard/board/sessions/TablaSesiones";
import RamificacionSesiones from "../dashboard/board/sessions/RamificacionSesiones";
import ModalBase from "./sideBar/consultations/ModalBase";

export default function CoorinDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState(null);
  const [modalSidebarOpen, setModalSidebarOpen] = useState(false);
  const [selectedSidebarOption, setSelectedSidebarOption] = useState("");
  
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  // Función para manejar clicks del sidebar
  const handleSidebarMenuClick = (menuId, menuTitle) => {
    // Cerrar sidebar en móviles después del click
    setSidebarOpen(false);
    
    // Mapeo de IDs del sidebar a opciones del modal
    const sidebarOptionsMap = {
      "2BB": "Lista Negra",        // Lista Negra
      "3BB": "Arrepentimientos",   // Arrepentimientos
      "1BBB": "Pagos",             // Pagos
      "2BBB": "Pagos reportados",  // Pagos reportados
      "3BBB": "Datos Erroneos",    // Datos Erróneos
      "4BBB": "Domicilios",        // Domicilios
      "5BBB": "Correos",           // Correos
      "6BBB": "Búsquedas",         // Búsquedas
      "7BBB": "Ofrecimientos",     // Ofrecimientos
      "8BBB": "Comentarios",       // Comentarios
      "9BBB": "VGP"                // VGP
    };

    // Si el menuId está en el mapeo, abrir el modal con la opción correspondiente
    if (sidebarOptionsMap[menuId]) {
      setSelectedSidebarOption(sidebarOptionsMap[menuId]);
      setModalSidebarOpen(true);
    }
    // Para otros elementos del menú
    else {
      console.log(`Click en menú: ${menuTitle} (ID: ${menuId})`);
    }
  };

  return (
    <>
      <CoorinSidebar open={sidebarOpen} onMenuClick={handleSidebarMenuClick} />
      <div className="relative bg-background-dashboard py-14 sm:py-2 overflow-hidden h-screen">
        <div className="mx-auto max-w-2xl px-2 lg:max-w-screen lg:px-8 relative">
          <a
            className=" flex gap-1 items-center my-2"
            aria-expanded={sidebarOpen}
            aria-controls="overlay-body-scrolling-with-backdrop"
            data-overlay="#overlay-body-scrolling-with-backdrop"
            onClick={handleSidebarToggle}
          >
            <img
              src={Menu}
              alt="menu-principal"
              className=" rounded-md cursor-pointer hover:shadow-lg hover:shadow-jerarquia2"
            />
          </a>
          {/* Resto de tu código */}
          <span className="mx-auto mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
            Ejecutivos
          </span>
          <div className="mt-2 grid grid-cols-6 gap-4 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0">
            <div className="col-span-6">
              <GridExecutives />
            </div>
          </div>
          <div className="col-span-6 row-start-2 relative">
            <div className="flex justify-between items-start mb-4 mt-4">
              <span className="text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
                Consultas
              </span>
            </div>
            <div className="-mt-2">
              <GridConsultations />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 w-full">
            <div className="relative w-full">
              <RamificacionSesiones onExecutiveSelect={setSelectedExecutiveId} />
            </div>
             <div className="relative w-full">
              <TablaSesiones selectedExecutiveId={selectedExecutiveId} />
            </div>
        </div>
      </div>
    </div>
    
    {/* Modal Base para Sidebar */}
    {modalSidebarOpen && (
      <ModalBase 
        onClose={() => setModalSidebarOpen(false)} 
        selectedOption={selectedSidebarOption}
      />
    )}
    </>
  );
}
