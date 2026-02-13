import React, { useRef, useState } from "react";

const JerarquiaConR = ({
  executiveTree,
  loadingJerarquia,
  errorJerarquia,
  selectedExecutiveNode,
  setSelectedExecutives,
  setSelectedRows,
  setSelectedExecutiveNode,
  useCheckbox = false,
  usuariosValidadores = [],
  handleSeleccionarUsuario = () => {},
  producto = null,
  omitSessionExecutive = false,
  onNodeSelect = null, // Callback para notificar cuando se selecciona un nodo
}) => {
  // Logo y datos de sesión
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const idEjecutivoSesion =
    userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
  const nombreSesion =
    userData?.nombre || userData?.nombreEjecutivo || userData?.ejecutivo || "";
  const usuarioSesion = userData?.usuario || "";

  // Ref para el contenedor de la ramificación
  const ramificacionRef = useRef(null);
  // Estado local para colapsar/expandir nodos
  const [collapsedNodes, setCollapsedNodes] = useState({});

  const toggleCollapse = (id) => {
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    if (ramificacionRef.current) {
      ramificacionRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Recolectar todos los ids de un nodo (incluye el propio nodo y todos sus subordinados recursivamente)
  const collectAllIds = (node) => {
    const ids = [];
    if (!node) return ids;
    if (node.idEjecutivo) ids.push(Number(node.idEjecutivo));
    if (Array.isArray(node.subordinados)) {
      for (const s of node.subordinados) {
        ids.push(...collectAllIds(s));
      }
    }
    return ids;
  };

  // Render normal (sin checkbox)
  const renderNode = (node, level = 0, keyPath = "") => {
    if (!node) return null;
    const nodeKey = `${keyPath || "node"}-${node.idEjecutivo || node.usuario || Math.random()}`;
    const hasSub =
      Array.isArray(node.subordinados) && node.subordinados.length > 0;
    const isCollapsed = !!collapsedNodes[node.idEjecutivo];
    const isSelected = selectedExecutiveNode === node.idEjecutivo;
    return (
      <div
        key={nodeKey}
        className={`hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-2-${level + 1}${isSelected ? " hs-tree-view-selected:bg-gray-100" : ""}`}
        role="treeitem"
        aria-expanded={hasSub ? !isCollapsed : undefined}
        id={`hs-cco-${nodeKey}-heading`}
        data-hs-tree-view-item={JSON.stringify({
          value: node.usuario || node.nombreEjecutivo || node.idEjecutivo,
          isDir: hasSub,
        })}
        style={{ minWidth: "max-content" }}
      >
        {/* Heading */}
        <div
          className="hs-accordion-heading py-px rounded-md flex items-center gap-x-0.5 w-full"
          style={
            isSelected
              ? { background: "var(--color-jerarquia1)", color: "#2b463c" }
              : {}
          }
        >
          {hasSub && (
            <button
              className="hs-accordion-toggle size-5 flex justify-center items-center rounded-md focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
              aria-expanded={!isCollapsed}
              aria-controls={`hs-cco-${nodeKey}-collapse`}
              type="button"
              style={{ background: "var(--color-jerarquia1)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia2)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia1)")
              }
              onFocus={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia2)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia1)")
              }
              onClick={(e) => {
                e.stopPropagation();
                toggleCollapse(node.idEjecutivo);
              }}
            >
              <svg
                className="size-4 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path
                  className={
                    !isCollapsed ? "hs-accordion-active:hidden block" : ""
                  }
                  d="M12 5v14"
                ></path>
              </svg>
            </button>
          )}
          <div
            className={`grow rounded-md cursor-pointer flex items-center`}
            onClick={() => {
              setSelectedExecutiveNode(node.idEjecutivo);
              setSelectedRows([]);
              // Seleccionar todo el subárbol del nodo (excluyendo el id de sesión si aplica)
              const allIds = collectAllIds(node).filter(
                (id) => id !== Number(idEjecutivoSesion),
              );
              if (allIds.length > 0) setSelectedExecutives(allIds);
              else if (node.idEjecutivo)
                setSelectedExecutives([Number(node.idEjecutivo)]);
              // Notificar al componente padre sobre la selección del nodo
              if (onNodeSelect) onNodeSelect(node);
              setTimeout(() => {
                if (ramificacionRef.current)
                  ramificacionRef.current.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
              }, 100);
            }}
            onDoubleClick={() => {
              if (hasSub) toggleCollapse(node.idEjecutivo);
            }}
            title={node.usuario + " - " + node.nombreEjecutivo}
          >
            <span
              className="text-xs font-medium w-full"
              style={{
                color: isSelected ? "#2b463c" : "#147f5e",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
              }}
            >
              {node.usuario} - {node.nombreEjecutivo}
            </span>
          </div>
        </div>
        {/* Collapse */}
        {hasSub && !isCollapsed && (
          <div
            id={`hs-cco-${nodeKey}-collapse`}
            className="hs-accordion-content overflow-hidden transition-[height] duration-300"
            role="group"
            aria-labelledby={`hs-cco-${nodeKey}-heading`}
          >
            <div
              className="ps-5 border-l border-gray-100 dark:border-neutral-700 pl-2"
              style={{ minWidth: "max-content" }}
            >
              {node.subordinados.map((child, cidx) =>
                renderNode(child, level + 1, `${nodeKey}-${cidx}`),
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render versión 2 con checkbox
  const renderNodeCheckbox = (node, level = 0, keyPath = "") => {
    if (!node) return null;
    const nodeKey = `${keyPath || "node"}-${node.idEjecutivo || node.usuario || Math.random()}`;
    const hasSub =
      Array.isArray(node.subordinados) && node.subordinados.length > 0;
    const isCollapsed = !!collapsedNodes[node.idEjecutivo];
    const indexUV = usuariosValidadores.findIndex(
      (u) => u.idEjecutivo === node.idEjecutivo,
    );
    const isChecked =
      indexUV !== -1 ? usuariosValidadores[indexUV].seleccionado : false;
    const isDisabled = !producto;
    return (
      <div
        key={nodeKey}
        className={`hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-2-${level + 1}${isChecked ? " hs-tree-view-selected:bg-gray-100" : ""}`}
        role="treeitem"
        aria-expanded={hasSub ? !isCollapsed : undefined}
        id={`hs-cco-${nodeKey}-heading`}
        data-hs-tree-view-item={JSON.stringify({
          value: node.usuario || node.nombreEjecutivo || node.idEjecutivo,
          isDir: hasSub,
        })}
        style={{
          minWidth: "max-content",
          opacity: isDisabled ? 0.5 : 1,
          pointerEvents: isDisabled ? "none" : "auto",
        }}
      >
        {/* Heading */}
        <div
          className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full"
          style={
            isChecked
              ? { background: "var(--color-jerarquia1)", color: "#2b463c" }
              : {}
          }
        >
          {hasSub && (
            <button
              className="hs-accordion-toggle size-6 flex justify-center items-center rounded-md focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
              aria-expanded={!isCollapsed}
              aria-controls={`hs-cco-${nodeKey}-collapse`}
              type="button"
              style={{ background: "var(--color-jerarquia1)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia2)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia1)")
              }
              onFocus={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia2)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.background = "var(--color-jerarquia1)")
              }
              onClick={(e) => {
                e.stopPropagation();
                if (!isDisabled) toggleCollapse(node.idEjecutivo);
              }}
              disabled={isDisabled}
            >
              <svg
                className="size-4 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path
                  className={
                    !isCollapsed ? "hs-accordion-active:hidden block" : ""
                  }
                  d="M12 5v14"
                ></path>
              </svg>
            </button>
          )}
          <input
            type="checkbox"
            checked={isChecked}
            disabled={isDisabled}
            className="modal-checkbox-small mr-2"
            style={{
              accentColor: isChecked ? "#2563eb" : "var(--color-jerarquia1)",
            }}
            onChange={(e) => {
              e.stopPropagation();
              if (!isDisabled && indexUV !== -1)
                handleSeleccionarUsuario(node.usuario, indexUV);
            }}
          />
          <span
            style={{
              cursor: isDisabled ? "not-allowed" : "pointer",
              userSelect: "none",
            }}
            onClick={() => {
              if (!isDisabled && indexUV !== -1)
                handleSeleccionarUsuario(node.usuario, indexUV);
            }}
          >
            {node.usuario} - {node.nombreEjecutivo}
          </span>
        </div>
        {/* Collapse */}
        {hasSub && !isCollapsed && (
          <div
            id={`hs-cco-${nodeKey}-collapse`}
            className="hs-accordion-content overflow-hidden transition-[height] duration-300"
            role="group"
            aria-labelledby={`hs-cco-${nodeKey}-heading`}
          >
            <div
              className="ps-7 border-l border-gray-100 dark:border-neutral-700 pl-3"
              style={{ minWidth: "max-content" }}
            >
              {node.subordinados.map((child, cidx) =>
                renderNodeCheckbox(child, level + 1, `${nodeKey}-${cidx}`),
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={ramificacionRef}
      className="productividad-branch scrollbar-gray"
      style={{
        height: "100%",
        maxHeight: "55vh",
        overflowY: "auto",
        width: "auto",
        background: "#ffffff",
        borderRadius: 8,
        border: "1px solid #e0e0e0",
        padding: "1vh 0.8vw",
      }}
    >
      {/* Usuario y Ejecutivo principal (solo si no se omite) */}
      {!omitSessionExecutive && idEjecutivoSesion && (
        <div
          className={`sticky-session-executive${
            useCheckbox
              ? ""
              : selectedExecutiveNode === Number(idEjecutivoSesion)
                ? " selected"
                : ""
          }`}
          title={
            useCheckbox
              ? "Ejecutivo de la sesión actual"
              : "Mostrar metas de todos los subordinados del ejecutivo de la sesión"
          }
          onClick={() => {
            // ✅ Solo ejecutar la lógica de selección si NO está en modo checkbox
            if (!useCheckbox) {
              const rootNode = Array.isArray(executiveTree)
                ? executiveTree.find(
                    (n) => Number(n.idEjecutivo) === Number(idEjecutivoSesion),
                  )
                : null;

              if (rootNode) {
                const allIds = collectAllIds(rootNode).filter(
                  (id) => id !== Number(idEjecutivoSesion),
                );
                if (allIds.length > 0) setSelectedExecutives?.(allIds);
                else setSelectedExecutives?.([Number(idEjecutivoSesion)]);
                if (onNodeSelect) onNodeSelect(rootNode);
              } else {
                setSelectedExecutives?.([Number(idEjecutivoSesion)]);
                if (onNodeSelect)
                  onNodeSelect({
                    idEjecutivo: idEjecutivoSesion,
                    usuario: usuarioSesion,
                    nombreEjecutivo: nombreSesion,
                  });
              }
              setSelectedRows?.([]);
              setSelectedExecutiveNode?.(Number(idEjecutivoSesion));
              setTimeout(() => {
                scrollToTop();
              }, 100);
            }
            // En modo checkbox, el sticky executive es solo informativo
          }}
          style={{
            cursor: useCheckbox ? "default" : "pointer",
            opacity: useCheckbox ? 0.8 : 1,
          }}
        >
          {usuarioSesion} - {nombreSesion}
        </div>
      )}
      {loadingJerarquia ? (
        <div
          style={{
            color: "#2b463c",
            fontWeight: 500,
            fontSize: "clamp(12px,1.2vw,18px)",
            textAlign: "center",
            marginTop: "2vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1vh",
          }}
        >
          <div className="spinner-sonner" style={{ marginBottom: 8 }}>
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#2b463c"
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
        <div
          style={{
            color: "#b71c1c",
            fontWeight: 500,
            fontSize: 14,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          {errorJerarquia}
        </div>
      ) : (
        <div role="tree" aria-orientation="vertical" data-hs-tree-view>
          {Array.isArray(executiveTree) &&
            executiveTree.map((rootNode, i) =>
              useCheckbox
                ? renderNodeCheckbox(rootNode, 0, `root-${i}`)
                : renderNode(rootNode, 0, `root-${i}`),
            )}
        </div>
      )}
    </div>
  );
};

export default JerarquiaConR;
// Inyectar estilos responsivos para el contenedor de la ramificación
if (
  typeof document !== "undefined" &&
  !document.head.querySelector("style[data-ramificacion-responsive]")
) {
  const style = document.createElement("style");
  style.setAttribute("data-ramificacion-responsive", "true");
  style.textContent = `
        .productividad-branch {
            width: 100%;
            min-width: 160px;
            height: auto;
            transition: width 0.2s;
            box-sizing: border-box;
        }
        @media (min-width: 1201px) {
            .productividad-branch {
                max-width: 100%;
                height: auto;
            }
        }
        @media (max-width: 1200px) {
            .productividad-branch {
                max-width: 100%;
                height: auto;
            }
        }
        @media (max-width: 900px) {
            .productividad-branch {
                width: 100vw !important;
                max-width: 100vw !important;
                min-width: 0 !important;
                border-radius: 0 !important;
                padding-left: 0.5vw !important;
                padding-right: 0.5vw !important;
                height: auto !important;
            }
        }
    `;
  document.head.appendChild(style);
}
