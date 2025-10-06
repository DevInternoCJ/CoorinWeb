import React, { useState, useEffect } from "react";
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
import LogoCoorin7 from "../../../assets/logo_coorin_7.svg";

// Renderiza submenús anidados usando la estructura de acordeón de Preline
const RenderSubMenus = ({
  subMenus,
  parentId,
  level = 0,
  onItemClick,
  onMenuClick,
  onPlantillasCorreoClick,
}) => {
  // level controla el padding/indent para grupos anidados
  const groupClass =
    level === 0
      ? "hs-accordion-group pt-1 ps-7 space-y-1"
      : "hs-accordion-group pt-1 ps-2 space-y-1";

  return (
    <ul id={parentId} className={groupClass} data-hs-accordion-always-open>
      {subMenus.map((item, idx) => {
        const id = `${parentId || "accordion"}-${item.id || idx}`;
        const hasChildren = Object.keys(item).some(
          (k) => k.startsWith("subMenus") && Array.isArray(item[k])
        );
        // Verificar si es el elemento "Plantillas Correo"
        const isPlantillasCorreo = item.title === "Plantillas Correo";
        // Si el item tiene hijos, lo renderizamos como acordeón. Si no tiene hijos,
        // renderizamos un <li> simple con <a> para evitar mostrar un toggle vacío.
        if (!hasChildren) {
          return (
            <li key={id} id={id}>
              <a
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                href={item.href || "#"}
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
                }}>
                {item.icon && iconMap[item.icon] && (
                  <span className="flex-shrink-0">
                    {React.createElement(iconMap[item.icon], {
                      className: "w-4 h-4",
                    })}
                  </span>
                )}

                <span className="hs-overlay-minified:opacity-0 hs-overlay-minified:max-w-0 transition-all duration-300 overflow-hidden whitespace-nowrap">
                  {item.title}
                </span>
              </a>
            </li>
          );
        }

        return (
          <li className="hs-accordion" id={id} key={id}>
            <button
              type="button"
              className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
              aria-expanded="false"
              aria-controls={`${id}-collapse`}>
              {item.icon && iconMap[item.icon] && (
                <span className="inline-flex mr-2">
                  {React.createElement(iconMap[item.icon], {
                    className: "w-5 h-5",
                  })}
                </span>
              )}

              <span className="inline-block transition-all duration-150 overflow-hidden whitespace-nowrap max-w-[160px] hs-overlay-minified:max-w-0 hs-overlay-minified:opacity-0">
                {item.title}
              </span>

              {/* Toggle icons */}
              <svg
                className="hs-accordion-active:block ml-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m18 15-6-6-6 6" />
              </svg>
              <svg
                className="hs-accordion-active:hidden ml-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              id={`${id}-collapse`}
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
              role="region"
              aria-labelledby={id}>
              {/* Buscar la primera clave que contiene submenus (subMenus, subMenus2...) */}
              {(() => {
                const nextKey = Object.keys(item).find(
                  (k) => k.startsWith("subMenus") && Array.isArray(item[k])
                );
                return (
                  <RenderSubMenus
                    subMenus={item[nextKey]}
                    parentId={`${id}-group`}
                    level={level + 1}
                    onItemClick={onItemClick}
                    onMenuClick={onMenuClick}
                  />
                );
              })()}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const CoorinSidebar = ({
  open,
  onMenuClick,
  onPlantillasCorreoClick,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinified, setIsMinified] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleOpen = () => setIsOpen((v) => !v);
  // Toggle minified and update body class immediately — avoid a resize-driven
  // effect that can conflict with Preline's own overlay handling.
  const toggleMinify = () => {
    setIsMinified((prev) => {
      const next = !prev;
      try {
        if (typeof window !== "undefined") {
          document.body.classList.toggle("hs-overlay-minified", next);
          if (next) document.body.classList.remove("hs-overlay-open");
        }
      } catch {
        // ignore
      }
      return next;
    });
  };

  const closeMobile = () => isMobile && setIsOpen(false);

  // Preline: ensure accordion/overlay/collapse are initialized when this component mounts.
  // In SPA the library may have registered auto-init on window.load which already fired,
  // so call the components' autoInit() here to initialize elements rendered by React.
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // small defer to ensure DOM is present
        setTimeout(() => {
          if (
            window.HSAccordion &&
            typeof window.HSAccordion.autoInit === "function"
          ) {
            window.HSAccordion.autoInit();
          }
          if (
            window.HSOverlay &&
            typeof window.HSOverlay.autoInit === "function"
          ) {
            window.HSOverlay.autoInit();
          }
          if (
            window.HSCollapse &&
            typeof window.HSCollapse.autoInit === "function"
          ) {
            window.HSCollapse.autoInit();
          }
        }, 50);
      }
    } catch {
      // non-fatal: log so we can debug if needed
      console.warn("Preline re-init failed");
    }
  }, []);

  const asideClass = `${
    isMinified ? "hs-overlay-minified " : ""
  }hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 transition-transform duration-150 transform fixed top-0 start-0 bottom-0 z-50 bg-white border-e border-gray-200 ${
    isMinified ? "w-[3.25rem]" : "w-64"
  } min-h-screen overflow-y-auto overflow-x-hidden ${
    isOpen ? "translate-x-0" : "-translate-x-full hidden"
  }`;
  // Función para expandir la sidebar si está en modo minificado
  const expandSidebar = () => {
    if (isMinified) {
      setIsMinified(false);
      try {
        if (typeof window !== "undefined") {
          document.body.classList.remove("hs-overlay-minified");
          // opcional: asegurar estado abierto en desktop
          setIsOpen(true);
          // re-inicializar Preline si es necesario
          setTimeout(() => {
            window.HSOverlay?.autoInit?.();
            window.HSAccordion?.autoInit?.();
          }, 50);
        }
      } catch {
        // ignore
      }
    }
  };
  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border-none text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-950 focus:outline-hidden focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-sidebar-content-push-to-mini-sidebar"
        aria-label="Toggle navigation"
        data-hs-overlay="#hs-sidebar-content-push-to-mini-sidebar"
        onClick={toggleOpen}>
        <svg
          className="hidden hs-overlay-minified:block shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M15 3v18" />
          <path d="m8 9 3 3-3 3" />
        </svg>
        <svg
          className="hs-overlay-minified:hidden shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M15 3v18" />
          <path d="m10 15-3-3 3-3" />
        </svg>
      </button>

      {isOpen && isMobile && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={closeMobile} />
      )}

      <nav
        id="hs-coorin-sidebar"
        className={asideClass}
        role="navigation"
        aria-label="Coorin sidebar">
        <header className="py-4 px-2 flex justify-between items-center gap-x-2">
          <a
            className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 hs-overlay-minified:hidden"
            href="#"
            aria-label="Brand">
            <span className="inline-block transition-all duration-150 overflow-hidden whitespace-nowrap">
              Coorin
            </span>
          </a>

          {/* Mobile close button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="flex justify-center items-center w-8 h-8 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
              onClick={closeMobile}>
              <svg
                className="shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop minify toggle */}
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => toggleMinify()}
              aria-pressed={isMinified}
              className="flex justify-center items-center w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-hidden focus:bg-gray-100">
              <svg
                className="hidden hs-overlay-minified:block shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
              <svg
                className="hs-overlay-minified:hidden shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m10 15-3-3 3-3" />
              </svg>
            </button>
          </div>
        </header>

        <div className="px-2 pt-2">
          <ul className="space-y-0.5 p-0 bg-white">
            {Object.values(dataSidebar).map((indiceArr, indiceIdx) =>
              indiceArr.map((section, sectionIdx) => (
                <React.Fragment
                  key={`indice-${indiceIdx}-section-${sectionIdx}`}>
                  {section.Menu &&
                    section.Menu.map((menu, menuIdx) => {
                      const menuId = `menu-app-${indiceIdx}-${sectionIdx}-${menuIdx}`;
                      return (
                        <li className="hs-accordion" id={menuId} key={menuId}>
                          <button
                            type="button"
                            className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                            aria-expanded="false"
                            aria-controls={`${menuId}-collapse`}
                            onClick={expandSidebar}>
                            {section.collapsetoggle &&
                              iconMap[section.collapsetoggle] && (
                                <span className="inline-flex w-6 flex-shrink-0 text-jerarquia3">
                                  {React.createElement(
                                    iconMap[section.collapsetoggle],
                                    { className: "w-5 h-5" }
                                  )}
                                </span>
                              )}

                            {/* Usar el divider del índice (section.divider) como encabezado de los submenús */}
                            <span className="inline-block font-semibold text-sm text-gray-700">
                              {section.divider || menu.title || "Abrir"}
                            </span>

                            <svg
                              className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <path d="m18 15-6-6-6 6" />
                            </svg>
                            <svg
                              className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>

                          <div
                            id={`${menuId}-collapse`}
                            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                            role="region"
                            aria-labelledby={menuId}>
                            {/* Renderizamos los subMenus del menu usando la estructura anidada */}
                            {menu.subMenus && (
                              <RenderSubMenus
                                subMenus={menu.subMenus}
                                parentId={`${menuId}-group`}
                                onMenuClick={onMenuClick}
                                level={0}
                                onItemClick={expandSidebar}
                              />
                            )}
                          </div>
                        </li>
                      );
                    })}
                </React.Fragment>
              ))
            )}
          </ul>
        </div>

        <footer className="mt-auto p-2 border-t border-gray-200">
          <div className="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
            <button
              id="hs-sidebar-footer-example-with-dropdown"
              type="button"
              className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
              onClick={expandSidebar}>
              <img
                className="shrink-0 size-5 rounded-full"
                src="https://images.unsplash.com/photo-1734122415415-88cb1d7d5dc0?q=80&w=320&h=320&auto=format&fit=facearea&facepad=3&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Avatar"
              />
              Chicharron
              <svg
                className="shrink-0 size-3.5 ms-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
              </svg>
            </button>

            <div
              className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white border border-gray-200 rounded-lg shadow-lg"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-sidebar-footer-example-with-dropdown">
              <div className="p-1">
                <a
                  className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                  href="#">
                  Coordinador
                </a>

                <a
                  className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                  href="#">
                  Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </footer>
      </nav>
    </>
  );
};