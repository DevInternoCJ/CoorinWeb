import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../contextGlobal/userStore";
import { putLogout } from "../../services/mark/Orochi/LokiServices";
import CoorinGrenn from "../../assets/CoorinGreen.svg";

const Logout = ({ onLogout, expandSidebar }) => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const nombreEjecutivo = user?.nombre;
  const idEjecutivo = user?.idEjecutivo;
  const idLogIngreso = user?.idLogIngreso;
  const handleLogout = async () => {
    try {
      const logoutData = {
        idEjecutivo: idEjecutivo,
        idLogIngreso: idLogIngreso,
      };
      console.log(" Iniciando proceso de logout...", logoutData);
      const response = await putLogout(logoutData);
      console.log("Logout exitoso:", response);
    } catch (error) {
      console.error(" Error durante el logout:", error);
    } finally {
      logout();
      if (onLogout && typeof onLogout === "function") {
        onLogout();
      }
      navigate("/");
      console.log(" Sesión cerrada y redirigiendo al login");
    }
  };

  return (
    <div className="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
      <button
        id="hs-sidebar-footer-example-with-dropdown"
        type="button"
        className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
        onClick={expandSidebar}
      >
        <img
          className="shrink-0 size-5 rounded-full object-cover"
          alt={`${nombreEjecutivo} Avatar`}
          src={CoorinGrenn}
        />
        <span className="hs-overlay-minified:opacity-0 hs-overlay-minified:max-w-0 transition-all duration-300 overflow-hidden whitespace-nowrap">
          {nombreEjecutivo}
        </span>
        <svg
          className="shrink-0 size-3.5 ms-auto hs-overlay-minified:opacity-0 hs-overlay-minified:max-w-0 transition-all duration-300 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </button>
      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white border border-gray-200 rounded-lg shadow-lg hs-overlay-minified:hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="hs-sidebar-footer-example-with-dropdown"
      >
        <div className="p-1">
          <div className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100">
            ID: {idEjecutivo}
          </div>
          <a
            className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-hidden focus:bg-red-50"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Logout;
