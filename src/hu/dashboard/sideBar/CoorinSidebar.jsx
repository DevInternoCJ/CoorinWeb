import React, { useEffect } from "react";
import dataSidebar from "./DataSidebar";
import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UserGroupIcon,
  EnvelopeIcon,
  BookOpenIcon,
  Bars3Icon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  LightBulbIcon,
  DocumentArrowDownIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

// Mapeo de nombres a componentes de Heroicons
const iconMap = {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UserGroupIcon,
  EnvelopeIcon,
  BookOpenIcon,
  Bars3Icon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  LightBulbIcon,
  DocumentArrowDownIcon,
  ShieldCheckIcon,
  // ...otros iconos si los necesitas
};
import LogoCoorin7 from "../../../assets/CoorinGreen.svg";
import { initSidebarCollapse } from "./sidebarCollapse";

// Renderiza submenús anidados recursivamente (soporta subMenus2, subMenus3, etc.)
const RenderSubMenus = ({ subMenus, parentId, onMenuClick, onPlantillasCorreoClick }) => (
  <ul
    id={parentId}
    className="collapse hidden w-auto space-y-0.5 overflow-hidden transition-[height] duration-300"
    aria-labelledby={parentId?.replace("-collapse", "")}>
    {subMenus.map((item) => {
      // Encuentra la clave del siguiente nivel de submenú (subMenus2, subMenus3, etc.)
      const nextSubMenuKey = Object.keys(item).find(
        (key) => key.startsWith("subMenus") && Array.isArray(item[key])
      );
        // Verificar si es el elemento "Plantillas Correo"
      const isPlantillasCorreo = item.title === "Plantillas Correo";
      return (
        <li
          key={item.id}
          className={nextSubMenuKey ? "space-y-0.5" : undefined}>
          {nextSubMenuKey ? (
            <>
              <a
                className="menu-item collapse-toggle collapse-open:bg-jerarquia4 text-bgcolor1"
                id={`submenu-${item.id}`}
                data-collapse={`#submenu-${item.id}-collapse`}>
                {item.icon && iconMap[item.icon] && (
                  <span className="inline-flex mr-2">
                    {React.createElement(iconMap[item.icon], {
                      className: "w-5 h-5",
                    })}
                  </span>
                )}
                {item.title}
                <span className="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4"></span>
              </a>
              <RenderSubMenus
                subMenus={item[nextSubMenuKey]}
                parentId={`submenu-${item.id}-collapse`}
                onPlantillasCorreoClick={onPlantillasCorreoClick}
                onMenuClick={onMenuClick}
              />
            </>
          ) : (
            <a 
              href="#" 
              className="menu-item"
              onClick={(e) => {
                e.preventDefault();
                if (isPlantillasCorreo) {
                  // Solo llamar onPlantillasCorreoClick si es "Plantillas Correo"
                  if (onPlantillasCorreoClick) {
                    onPlantillasCorreoClick();
                  }
                } else {
                  // Para otros elementos, usar onMenuClick
                  if (onMenuClick) {
                    onMenuClick(item.id, item.title);
                  }
                }
              }}
            >
              {item.icon && iconMap[item.icon] && (
                <span className="inline-flex mr-2 text-jerarquia3">
                  {React.createElement(iconMap[item.icon], {
                    className: "w-5 h-5",
                  })}
                </span>
              )}
              {item.title}
            </a>
          )}
        </li>
      );
    })}
  </ul>
);

export const CoorinSidebar = ({ open, onMenuClick, onPlantillasCorreoClick }) => {
  // Clases para animar el sidebar (Tailwind)
  const sidebarClasses = `sidebar-coorin drawer drawer-start overlay max-w-64 z-20 fixed top-0 left-0 h-full transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`;  

  useEffect(() => {
  if (open) {
    setTimeout(() => {
      initSidebarCollapse();
    }, 0);
  }
}, [open]);

  return (
    <sidebarClasses
      id="overlay-body-scrolling-with-backdrop"
      className={sidebarClasses}
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      data-overlay-backdrop="true"
      data-overlay-scroll="body">
      <div className="gap-3 align-items-center flex justify-center p-4">
        <img
          src={LogoCoorin7}
          alt="logo-coorin"
          className="w-25 h-auto mx-auto my-auto "
        />
      </div>

      <div className="drawer-body px-2 pt-4">
        <ul className="menu space-y-0.5 p-0 bg-transparent">
          {Object.values(dataSidebar).map((indiceArr, indiceIdx) =>
            indiceArr.map((section, sectionIdx) => (
              <React.Fragment key={`indice-${indiceIdx}-section-${sectionIdx}`}>
                {/* Divider dinámico con icono */}
                {section.divider && (
                  <div className="divider flex items-center gap-2 ">
                    {section.dividerIcon && iconMap[section.dividerIcon] && (
                      <span className="inline-flex">
                        {React.createElement(iconMap[section.dividerIcon], {
                          className: "w-5 h-5",
                        })}
                      </span>
                    )}
                    {section.divider}
                  </div>
                )}
                {/* Menús dinámicos */}
                {section.Menu &&
                  section.Menu.map((menu, menuIdx) => (
                    <li className="space-y-0.5" key={`menu-${menuIdx}`}>
                      <a
                        className="menu-item collapse-toggle text-sm"
                        id={`menu-app-${indiceIdx}-${sectionIdx}-${menuIdx}`}
                        data-collapse={`#menu-app-collapse-${indiceIdx}-${sectionIdx}-${menuIdx}`}>
                        {/* Icono dinámico para el menú principal */}
                        {section.collapsetoggle &&
                          iconMap[section.collapsetoggle] && (
                            <span className="inline-flex mr-2">
                              {React.createElement(
                                iconMap[section.collapsetoggle],
                                {
                                  className: "w-5 h-5",
                                }
                              )}
                            </span>
                          )}
                        Abrir
                        <span className="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4 transition-all duration-300"></span>
                      </a>
                      <RenderSubMenus
                        subMenus={menu.subMenus}
                        parentId={`menu-app-collapse-${indiceIdx}-${sectionIdx}-${menuIdx}`}
                        onMenuClick={onMenuClick}
                        onPlantillasCorreoClick={onPlantillasCorreoClick}
                      />
                    </li>
                  ))}
              </React.Fragment>
            ))
          )}
        </ul>
      </div>
    </sidebarClasses>
  );
}
