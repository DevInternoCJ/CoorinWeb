import React, { useState } from "react";
import GridExecutives from "./board/executives/GridExecutives";
import { CoorinSidebar } from "./sideBar/CoorinSidebar";
import GridConsultations from "./board/consultations/GridConsultations";
import TablaSesiones from "./board/consultations/TablaSesiones";
import RamificacionSesiones from "./board/consultations/RamificacionSesiones";

export default function CoorinDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState(null);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <CoorinSidebar open={sidebarOpen} />
      <div className="relative bg-background-dashboard py-14 sm:py-2 overflow-hidden">
        <div className="mx-auto max-w-2xl px-2 lg:max-w-screen lg:px-8 relative">
          <h2
            className="text-base/7 font-semibold text-jerarquia3 cursor-pointer"
            aria-expanded={sidebarOpen}
            aria-controls="overlay-body-scrolling-with-backdrop"
            data-overlay="#overlay-body-scrolling-with-backdrop"
            onClick={handleSidebarToggle}>
            Menu Principal
          </h2>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 w-full">
            {/* Ramificación */}
            <div className="relative w-full">
              <RamificacionSesiones onExecutiveSelect={setSelectedExecutiveId} />
            </div>
            {/* Tabla de Sesiones */}
            <div className="relative w-full">
              <TablaSesiones selectedExecutiveId={selectedExecutiveId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
