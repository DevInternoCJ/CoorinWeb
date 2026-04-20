import React, { useState, useEffect, useRef } from "react";
import { obetenerJerarquiaEncargados } from "../../../../services/mark/Orochi/LokiServices";
import { useUserStore } from "../../../../contextGlobal/userStore";

const RamificacionSesiones = ({ onExecutiveSelect }) => {
  // Estados para la jerarquía
  const [executiveTree, setExecutiveTree] = useState([]);
  const [loadingJerarquia, setLoadingJerarquia] = useState(false);
  const [errorJerarquia, setErrorJerarquia] = useState(null);
  const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  const [collapsedNodes, setCollapsedNodes] = useState({});

  // Ref para el contenedor de scroll
  const ramificacionRef = useRef(null);

  // Lógica para obtener la jerarquía de ejecutivos
  const storeUser = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchExecutiveTree = async () => {
      setLoadingJerarquia(true);
      setErrorJerarquia(null);
      try {
        // Preferir user desde el store (sessionStorage). Fallback a sessionStorage/localStorage.
        const persisted =
          storeUser ||
          JSON.parse(sessionStorage.getItem("userData") || "null") ||
          JSON.parse(localStorage.getItem("userData") || "null");

        const idEjecutivo = persisted?.idEjecutivo || persisted?.id || null;
        const usuario = persisted?.usuario || persisted?.Usuario || "";
        const nombreEjecutivo =
          persisted?.NombreEjecutivo ||
          persisted?.nombreEjecutivo ||
          persisted?.nombre ||
          "";

        if (!idEjecutivo)
          throw new Error("No se encontró el idEjecutivo del usuario logueado");

        const data = await obetenerJerarquiaEncargados(idEjecutivo);
        console.log("Respuesta jerarquía ejecutivos:", data);

        // Si la respuesta NO incluye el nodo raíz, lo agregamos manualmente
        let tree = [];
        if (Array.isArray(data)) {
          // Buscamos si el propio ejecutivo está en la raíz
          const found = data.find((n) => n.idEjecutivo === idEjecutivo);
          if (found) {
            tree = data;
          } else {
            // Lo agregamos como nodo raíz
            tree = [
              {
                idEjecutivo,
                usuario,
                NombreEjecutivo: nombreEjecutivo,
                subordinados: data,
              },
            ];
          }
        }
        setExecutiveTree(tree);

        // Seleccionar el nodo raíz por defecto
        setSelectedExecutiveNode(idEjecutivo);
      } catch (e) {
        console.error("Error al obtener la jerarquía:", e);
        setErrorJerarquia(
          e.message || "Error al obtener la jerarquía de ejecutivos",
        );
        setExecutiveTree([]);
      } finally {
        setLoadingJerarquia(false);
      }
    };
    fetchExecutiveTree();
  }, [storeUser, retryCount]);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    if (ramificacionRef.current) {
      ramificacionRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Función para expandir/colapsar un nodo
  const toggleCollapse = (id) => {
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Renderizar la jerarquía usando el Tree View de Preline
  const renderExecutiveTree = (tree, level = 0, parentKey = "") => {
    if (!Array.isArray(tree)) return null;
    return tree.map((node, idx) => {
      const isSelected = node.idEjecutivo === selectedExecutiveNode;
      const isCollapsed = collapsedNodes[node.idEjecutivo];
      const hasSub =
        Array.isArray(node.subordinados) && node.subordinados.length > 0;
      const nodeKey = `${parentKey}${node.idEjecutivo || node.usuario || idx}`;
      const headingId = `hs-checkbox-tree-heading-${nodeKey}`;
      const collapseId = `hs-checkbox-tree-collapse-${nodeKey}`;
      return (
        <div
          key={nodeKey}
          className={`hs-accordion ${!isCollapsed ? "active" : ""}`}
          role="treeitem"
          aria-expanded={hasSub ? !isCollapsed : undefined}
          id={headingId}
        >
          {/* Heading container */}
          <div
            className={`hs-accordion-heading py-0 flex items-center gap-x-0.5 w-full rounded-md transition-colors duration-150 ${
              isSelected ? "bg-[var(--color-jerarquia1)] shadow-sm" : ""
            }`}
          >
            {/* Toggle Arrow (if has sub) or spacing placeholder */}
            {hasSub ? (
              <button
                className="hs-accordion-toggle size-5 flex justify-center items-center rounded-md shrink-0 focus:outline-none transition-colors duration-200 bg-[var(--color-jerarquia1)]/40 hover:bg-[var(--color-jerarquia2)] focus:bg-[var(--color-jerarquia2)]"
                aria-expanded={!isCollapsed}
                aria-controls={collapseId}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse(node.idEjecutivo);
                }}
              >
                <svg
                  className={`size-4 transition-transform duration-200 text-[var(--color-jerarquia3)] ${!isCollapsed ? "rotate-90" : ""}`}
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
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            ) : (
              <div className="size-5 shrink-0" />
            )}

            {/* Clickable Area for Selection */}
            <div
              className={`grow rounded-md cursor-pointer flex items-center px-1 py-0.5 transition-colors ${
                !isSelected ? "hover:bg-[var(--color-surface-secondary)]" : ""
              }`}
              onClick={() => {
                setSelectedExecutiveNode(node.idEjecutivo);
                if (onExecutiveSelect) {
                  onExecutiveSelect(node.idEjecutivo);
                }
              }}
              onDoubleClick={() => {
                if (hasSub) toggleCollapse(node.idEjecutivo);
              }}
              title={
                node.usuario +
                " - " +
                (node.NombreEjecutivo ||
                  node.nombreEjecutivo ||
                  node.ejecutivo ||
                  node.nombre ||
                  "SIN NOMBRE")
              }
            >
              <span
                className={`text-xs font-semibold w-full truncate tracking-tight ${
                  isSelected
                    ? "text-[var(--color-jerarquia4)]"
                    : "text-[var(--color-jerarquia3)]"
                }`}
              >
                {node.usuario} -{" "}
                {node.NombreEjecutivo ||
                  node.nombreEjecutivo ||
                  node.ejecutivo ||
                  node.nombre ||
                  "SIN NOMBRE"}
              </span>
            </div>
          </div>

          {/* Children items */}
          {hasSub && !isCollapsed && (
            <div
              id={collapseId}
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 relative"
              role="group"
              aria-labelledby={headingId}
            >
              {/* Connector line for nested items */}
              <div className="absolute top-0 bottom-0 left-[9px] w-[1px] bg-[var(--color-jerarquia1)]/50 pointer-events-none"></div>

              <div className="ps-4 ms-1 pt-0.5 space-y-0.5">
                {renderExecutiveTree(node.subordinados, level + 1, nodeKey)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  // Obtener datos de la sesión preferentemente desde el store
  const persistedSession =
    storeUser ||
    JSON.parse(sessionStorage.getItem("userData") || "null") ||
    JSON.parse(localStorage.getItem("userData") || "null");

  const idEjecutivoSesion =
    persistedSession?.idEjecutivo ||
    persistedSession?.idejecutivo ||
    persistedSession?.id ||
    null;
  const nombreSesion =
    persistedSession?.NombreEjecutivo ||
    persistedSession?.nombreEjecutivo ||
    persistedSession?.nombre ||
    "";
  const usuarioSesion =
    persistedSession?.usuario || persistedSession?.Usuario || "";

  return (
    <div className="bg-[var(--color-surface)]  rounded-2xl flex flex-col px-4 lg:px-6 w-full h-auto lg:h-82 min-h-64 transition-colors duration-300">
      {/* Header unificado y responsive */}
      <div className="flex flex-col h-full py-4">
        <div
          className="flex items-center justify-between z-10
                        bg-[var(--color-surface)]/90 backdrop-blur-sm
                        border-b border-[var(--color-border)]
                        px-3 mb-4 pb-3 sm:px-4 md:px-6 transition-colors duration-300"
        >
          {/* Título a la izquierda */}
          <div className="flex items-center text-[var(--color-text-secondary)]">
            <span className="mr-2">
              {/* Icono de ramificación */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-5 h-5 lg:w-6 lg:h-6 text-[var(--color-text-muted)]"
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
            <h3 className="text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">
              Ramificación
            </h3>
          </div>

          {/* Ejecutivo de la sesión a la derecha */}
          {idEjecutivoSesion && (
            <div
              className={`session-executive${
                selectedExecutiveNode === Number(idEjecutivoSesion)
                  ? " selected"
                  : ""
              } text-xs md:text-sm lg:text-base px-2 py-2
                bg-[var(--color-surface-secondary)]
                text-center max-w-full truncate
                font-semibold text-[var(--color-text-primary)]
                transition-all duration-200 cursor-pointer rounded-md
                hover:bg-[var(--color-jerarquia1)] hover:text-[var(--color-jerarquia4)]`}
              title={`Ejecutivo de la sesión actual: ${usuarioSesion} - ${nombreSesion}`}
              onClick={() => {
                setSelectedExecutiveNode(Number(idEjecutivoSesion));
                if (onExecutiveSelect) {
                  onExecutiveSelect(Number(idEjecutivoSesion));
                }
                // Hacer autoscroll hacia arriba
                setTimeout(() => {
                  scrollToTop();
                }, 100);
              }}
            >
              <span className="font-bold md:font-semibold lg:font-bold">
                {usuarioSesion}
              </span>
              <span className="mx-1">-</span>
              <span className="font-bold md:font-semibold lg:font-bold">
                {nombreSesion}
              </span>
            </div>
          )}
        </div>

        {/* Contenedor de la ramificación con clases de Tailwind (scroll individual) */}
        <div className="relative w-full flex-auto min-h-0 flex flex-col">
          <div
            ref={ramificacionRef}
            onScroll={(e) => {
              if (e.target.scrollTop > 100) {
                if (!showScrollTopBtn) setShowScrollTopBtn(true);
              } else {
                if (showScrollTopBtn) setShowScrollTopBtn(false);
              }
            }}
            className="w-full flex-auto min-h-[16vh] overflow-y-auto scrollbar-gray rounded-lg border border-[var(--color-border)] p-3 lg:p-4 bg-[var(--color-surface)] transition-all duration-300"
          >
            {/* Contenido de la jerarquía con Preline Tree View */}
            {loadingJerarquia ? (
              <div
                style={{
                  color: "var(--color-jerarquia3)",
                  fontWeight: 500,
                  fontSize: 15,
                  textAlign: "center",
                  marginTop: 30,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div className="spinner-sonner" style={{ marginBottom: 8 }}>
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="var(--color-jerarquia3)"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)" strokeWidth="3">
                        <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>Cargando jerarquía...</span>
              </div>
            ) : errorJerarquia ? (
              <div className="flex flex-col items-center justify-center gap-4 mt-8 px-4 text-center">
                <div className="text-[var(--color-error,#b71c1c)] font-medium text-sm">
                  {errorJerarquia}
                </div>
                <button
                  onClick={() => setRetryCount((c) => c + 1)}
                  className="px-4 py-2 bg-[var(--color-jerarquia2)] text-white font-medium text-xs rounded-md shadow-sm hover:bg-[var(--color-jerarquia3)] transition-colors duration-200 flex items-center gap-2"
                  title="Recargar árbol de ejecutivos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Intentar nuevamente
                </button>
              </div>
            ) : (
              <div
                id="hs-tree-view-checkbox"
                role="tree"
                aria-orientation="vertical"
                data-hs-tree-view='{"controlBy": "checkbox", "autoSelectChildren": true}'
              >
                <div data-hs-nested-draggable="">
                  {renderExecutiveTree(executiveTree)}
                </div>
              </div>
            )}
          </div>

          {/* Botón flotante para subir (Scroll to top) local */}
          {showScrollTopBtn && (
            <button
              onClick={scrollToTop}
              title="Volver arriba"
              className="absolute bottom-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-jerarquia2)] text-[var(--color-surface,white)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[var(--color-jerarquia3)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RamificacionSesiones;
