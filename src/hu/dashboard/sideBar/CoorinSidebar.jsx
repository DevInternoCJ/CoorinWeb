import React, { useState, useEffect, useRef } from "react";
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
import Logout from "../../logout/Logout"

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

// Renderiza submenús anidados usando la estructura de acordeón de Preline
const RenderSubMenus = ({
  subMenus,
  parentId,
  level = 0,
  onItemClick,
  onMenuClick,
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
                  // Usar onMenuClick para todos los elementos
                  if (onMenuClick) {
                    onMenuClick(item.id, item.title);
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
  onMenuClick,
  isModalOpen = false, // Nuevo prop para controlar si hay un modal abierto
  onRegisterCloseFunction, // Función para registrar la función de cierre del sidebar
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  // Guarda los IDs (aria-controls) de los grupos de acordeón que estaban abiertos
  const savedAccordionsRef = useRef(new Set());

  const saveAndCollapseAccordions = () => {
    try {
      if (!sidebarRef.current) return;
      const toggles = Array.from(
        sidebarRef.current.querySelectorAll('.hs-accordion-toggle[aria-expanded="true"]')
      );
      toggles.forEach((t) => {
        const aria = t.getAttribute('aria-controls');
        if (aria) savedAccordionsRef.current.add(aria);
      });
      // Colapsar cada toggle que esté abierto
      toggles.forEach((t) => {
        try { t.click(); } catch { /* ignore */ }
      });
    } catch (e) {
      // no crítico
      console.warn('saveAndCollapseAccordions failed', e);
    }
  };

  const restoreAccordions = () => {
    try {
      if (!sidebarRef.current) return;
      const toRestore = Array.from(savedAccordionsRef.current);
      toRestore.forEach((ariaControls) => {
        const toggle = sidebarRef.current.querySelector(`.hs-accordion-toggle[aria-controls="${ariaControls}"]`);
        if (toggle && toggle.getAttribute('aria-expanded') !== 'true') {
          try { toggle.click(); } catch { /* ignore */ }
        }
      });
      // Leave saved set as-is so open/close cycles preserve the same saved groups
    } catch (e) {
      console.warn('restoreAccordions failed', e);
    }
  };

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleOpen = () => {
    setIsOpen((v) => {
      const next = !v;
      if (!next) {
        // we're closing -> save and collapse
        saveAndCollapseAccordions();
      } else {
        // opening -> restore after a small delay to let DOM settle
        setTimeout(restoreAccordions, 60);
      }
      return next;
    });
  };
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
      // si se minifica, colapsar; si se expande, restaurar
      if (next) {
        saveAndCollapseAccordions();
      } else {
        setTimeout(restoreAccordions, 60);
      }
      return next;
    });
  };

  const closeMobile = () => {
    if (isMobile) {
      saveAndCollapseAccordions();
      setIsOpen(false);
    }
  };

  // Ref para el contenedor del sidebar
  const sidebarRef = useRef(null);

  // Prev state and lock
  const prevStateRef = useRef({ isOpen: null, isMinified: null });
  const [isLockedByModal, setIsLockedByModal] = useState(false);
  const isLockedRef = useRef(isLockedByModal);
  useEffect(() => { isLockedRef.current = isLockedByModal; }, [isLockedByModal]);

  // blocked flag
  const blocked = isModalOpen || isLockedByModal;

  // Ensure prop-driven modals (opened via dashboard state) also force the same
  // minify/lock behavior as the event-driven flow. This covers cases like
  // "Campañas" which rely on the parent prop instead of dispatching events.
  useEffect(() => {
    if (isModalOpen) {
      // only act if we didn't already lock because of another modal
      if (!isLockedRef.current) {
        prevStateRef.current = { isOpen, isMinified };
        if (isMobile) setIsOpen(false);
        if (!isMinified) setIsMinified(true);
        setIsLockedByModal(true);
      }
    } else {
      // modal prop closed -> restore previous state if we had locked it
      if (isLockedRef.current) {
        const prev = prevStateRef.current || {};
        if (prev.isOpen !== null && prev.isOpen !== undefined) setIsOpen(prev.isOpen);
        if (prev.isMinified !== null && prev.isMinified !== undefined) setIsMinified(prev.isMinified);
        setIsLockedByModal(false);
      }
    }
    // We intentionally include isOpen/isMinified so the saved prevStateRef is
    // the latest when we run this effect (small cost, keeps behaviour robust).
  }, [isModalOpen, isMobile, isMinified, isOpen]);

  // Listen global modal events
  useEffect(() => {
    const handle = (ev) => {
      const detail = ev?.detail || {};
      const open = !!detail.open;
      const byClose = !!detail.byClose;
      if (open) {
        // first modal -> save
        try { window.__coorin_modal_open_count = (window.__coorin_modal_open_count || 0) + 1; } catch (err) { console.warn(err); }
        if (!isLockedRef.current) {
          prevStateRef.current = { isOpen, isMinified };
          // minimize and lock
          if (isMobile) setIsOpen(false);
          if (!isMinified) setIsMinified(true);
          setIsLockedByModal(true);
        }
      } else {
        try { window.__coorin_modal_open_count = Math.max((window.__coorin_modal_open_count || 1) - 1, 0); } catch (err) { console.warn(err); }
        const remaining = window.__coorin_modal_open_count || 0;
        if (remaining === 0) {
          // restore only if closed via close button
          if (byClose) {
            const prev = prevStateRef.current || {};
            if (prev.isOpen !== null) setIsOpen(prev.isOpen);
            if (prev.isMinified !== null) setIsMinified(prev.isMinified);
            setIsLockedByModal(false);
          } else {
            // closed by backdrop/Escape -> keep locked/minified
            // do nothing (remain blocked)
          }
        }
      }
    };
    window.addEventListener('coorin-modal-open', handle);
    return () => window.removeEventListener('coorin-modal-open', handle);
  }, [isMobile, isMinified, isOpen]);

  // Efecto para detectar clics fuera del sidebar
  useEffect(() => {
  const handleClickOutside = (event) => {
      // Solo cerrar en móviles o cuando el sidebar esté abierto y no minificado en desktop
      const shouldClose = (isMobile && isOpen) || (!isMobile && isOpen && !isMinified);
      
      if (shouldClose && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target)) {
        
        // Verificar que el clic no sea en el botón hamburger
        const hamburgerButton = document.querySelector('[data-hs-overlay="#hs-coorin-sidebar"], [aria-controls="hs-sidebar-content-push-to-mini-sidebar"]');
        if (hamburgerButton && hamburgerButton.contains(event.target)) {
          return; // No cerrar si se hizo clic en el botón hamburger
        }
        
        if (isMobile) {
          saveAndCollapseAccordions();
          setIsOpen(false);
        } else if (!isMinified) {
          // En desktop, minificar el sidebar
          saveAndCollapseAccordions();
          setIsMinified(true);
          try {
            if (typeof window !== "undefined") {
              document.body.classList.add("hs-overlay-minified");
              document.body.classList.remove("hs-overlay-open");
            }
          } catch {
            // ignore
          }
        }
      }
    };

    // Agregar el event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Limpiar el event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen, isMinified]);

  // Registrar la función de cierre en el componente padre
  useEffect(() => {
    // Función para cerrar el sidebar (usado por el dashboard cuando se abren modales de cards)
    const closeSidebar = () => {
      if (isMobile) {
        setIsOpen(false);
      }
      // En desktop, solo aplicamos el minificado si no está ya minificado
      if (!isMobile && !isMinified) {
        // guardar y colapsar primero
        saveAndCollapseAccordions();
        setIsMinified(true);
        try {
          if (typeof window !== "undefined") {
            document.body.classList.add("hs-overlay-minified");
            document.body.classList.remove("hs-overlay-open");
          }
        } catch {
          // ignore
        }
      }
    };

    if (onRegisterCloseFunction) {
      onRegisterCloseFunction(() => closeSidebar);
    }
  }, [onRegisterCloseFunction, isMobile, isMinified, setIsOpen, setIsMinified]);

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
          // Inicializa el dropdown del footer
          if (
            window.HSDropdown &&
            typeof window.HSDropdown.autoInit === "function"
          ) {
            window.HSDropdown.autoInit();
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
  }hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 transition-transform duration-150 transform fixed top-0 start-0 bottom-0 ${
    blocked ? "z-0" : "z-1"
  } bg-white border-e border-gray-200 ${
    isMinified ? "w-[3.25rem]" : "w-64"
  } min-h-screen flex flex-col overflow-x-hidden ${
    isOpen ? "translate-x-0" : "-translate-x-full hidden"
  } ${blocked ? "pointer-events-none sidebar-blocked" : ""}`.trim();
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
          // Restaurar acordeones después de re-init
          setTimeout(restoreAccordions, 120);
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
        className={`py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border-none text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-950 focus:outline-hidden focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200 ${
          (blocked && isMinified) ? 'cursor-default' : ''
        }`}
        style={ (blocked && isMinified) ? { cursor: 'default' } : undefined }
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-sidebar-content-push-to-mini-sidebar"
        aria-label="Toggle navigation"
        data-hs-overlay="#hs-sidebar-content-push-to-mini-sidebar"
  disabled={blocked}
  onClick={blocked ? undefined : toggleOpen}>
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
        ref={sidebarRef}
        id="hs-coorin-sidebar"
        className={asideClass}
        role="navigation"
        aria-label="Coorin sidebar"
        style={{ overflowY: isMinified ? 'hidden' : undefined, pointerEvents: blocked ? 'none' : undefined, cursor: blocked ? 'default' : undefined }}>
        <div className=" flex flex-col h-full max-h-full">
          {/* Header */}
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
                className="flex justify-center items-center w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-hidden focus:bg-gray-100"
                style={ (blocked && isMinified) ? { cursor: 'default' } : undefined }
                >
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
          {/* End Header */}

          {/* Body: make this area scrollable so footer stays visible */}
          <div
            className={`flex-1 flex flex-col px-2 pt-2 min-h-0 overflow-x-hidden coorin-scroll-area ${isMinified ? 'overflow-y-hidden' : (isOpen ? 'overflow-y-auto' : 'overflow-y-hidden')}`}
            style={{ overflowY: isMinified ? 'hidden' : (isOpen ? 'auto' : 'hidden') }}
          >
            <ul className="space-y-0.5 p-0 bg-white pb-4 overflow-x-hidden" style={{ overflowY: isMinified ? 'hidden' : undefined }}>
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
          {/* End Body */}

          {/* Footer */}
          <footer className="mt-auto p-2 border-t border-gray-200">
            <Logout/>
          </footer>
          {/* End Footer */}
        </div>
      </nav>
    </>
  );
};