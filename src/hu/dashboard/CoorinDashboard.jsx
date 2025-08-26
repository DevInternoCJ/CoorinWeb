import React, { useState, useEffect, useRef } from "react";
import GridExecutives from "./board/executives/GridExecutives";
import { CoorinSidebar } from "./sideBar/CoorinSidebar";
import GridConsultations from "./board/consultations/GridConsultations";
import CoordinDashboard from "./board/consultations/CoordinDashboard";
import Menu from "../../assets/menu.svg";

export default function CoorinDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el sidebar está abierto y el clic fue fuera del sidebar y fuera del botón del menú
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    // Agregar event listener cuando el componente se monta
    document.addEventListener("mousedown", handleClickOutside);
    
    // Limpiar event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]); // Solo se ejecuta cuando sidebarOpen cambia

  return (
    <>
      <CoorinSidebar open={sidebarOpen} ref={sidebarRef} />
      <div className="relative bg-background-dashboard py-14 sm:py-2 overflow-hidden h-screen">
        <div className="mx-auto max-w-2xl px-2 lg:max-w-screen lg:px-8 relative"> 
            <a
            className=" flex gap-1 items-center"
              ref={menuButtonRef}
              aria-expanded={sidebarOpen}
              aria-controls="overlay-body-scrolling-with-backdrop"
              data-overlay="#overlay-body-scrolling-with-backdrop"
              onClick={handleSidebarToggle}
            >
              <img src={Menu} alt="menu-principal" className=" cursor-pointer" /> <h2 className="font-semibold text-jerarquia3 cursor-pointer text-2xl">Menu Principal</h2>
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
              <CoordinDashboard />
            </div>
            <div className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-2xl flex flex-col p-6 w-full h-82">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7a3 3 0 11-6 0 3 3 0 016 0zm0 0v10a3 3 0 006 0V7m0 10a3 3 0 006 0V7a3 3 0 10-6 0"
                    />
                  </svg>
                </span>
                Ramificación
              </h3>
              <div className="bg-[#e5ebf2] rounded-lg flex-1 min-h-[120px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}