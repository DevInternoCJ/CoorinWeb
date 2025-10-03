import React, { useState, useRef, useEffect } from "react";
import GridExecutives from "./board/executives/GridExecutives";
import { CoorinSidebar } from "./sideBar/CoorinSidebar";
import GridConsultations from "./board/consultations/GridConsultations";
import TablaSesiones from "../dashboard/board/sessions/TablaSesiones";
import PlantillasCorreoModal from "../administration/gespa/emailTemplates/EmailTemplates";
import RamificacionSesiones from "../dashboard/board/sessions/RamificacionSesiones";
import ModalBase from "./sideBar/consultations/ModalBase";
export default function CoorinDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState(null);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [modalSidebarOpen, setModalSidebarOpen] = useState(false);
  const [selectedSidebarOption, setSelectedSidebarOption] = useState("");
  
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);
const handlePlantillasCorreoClick = () => {
    setModalOpen(true);
    setSidebarOpen(false); // Opcional: cerrar sidebar al abrir modal
  };
  const handleCloseModal = () => setModalOpen(false);
  // Efecto para detectar clics fuera del sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el sidebar está abierto y se hizo clic fuera del sidebar y del botón
      if (sidebarOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)) {
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
    
    // Mapeo de IDs del sidebar a opciones del modal - SOLO CONSULTAS
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
    // Para otros elementos del menú (NO hacer nada más)
    else {
      console.log(`Click en menú: ${menuTitle} (ID: ${menuId})`);
    }
  };

  return (
    <>
      <div ref={sidebarRef}>
        <CoorinSidebar open={sidebarOpen} onMenuClick={handleSidebarMenuClick} 
        onPlantillasCorreoClick={handlePlantillasCorreoClick} />
         <PlantillasCorreoModal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
      />
      </div>
      <div className="relative bg-background-dashboard py-14 sm:py-2 overflow-hidden h-screen">
        {/* Botón de menú con z-index alto para que siempre esté visible */}
        <div className="fixed top-4 left-8 z-20">
          <button
            ref={buttonRef}
            className=" p-1 border-1 border-jerarquia2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-jerarquia3 focus:ring-opacity-50 bg-background-dashboard shadow-md"
            aria-expanded={sidebarOpen}
            aria-controls="overlay-body-scrolling-with-backdrop"
            data-overlay="#overlay-body-scrolling-with-backdrop"
            onClick={handleSidebarToggle}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={`size-8 text-jerarquia3 transition-transform duration-300 ${sidebarOpen ? 'transform rotate-90' : ''}`}
            >
              {/* Líneas del menú hamburguesa - se ocultan cuando está abierto */}
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                className={`transition-all duration-300 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              
              {/* Líneas para formar la X cuando está abierto */}
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12"
                className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
              />
            </svg>
          </button>
        </div>
        
        <div className="mx-auto max-w-2xl px-2 lg:max-w-screen lg:px-8 relative pt-16">
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