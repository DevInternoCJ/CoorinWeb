import React, { useRef, useState } from "react";

const JerarquiaConR = ({
    executiveTree,
    loadingJerarquia,
    errorJerarquia,
    selectedExecutiveNode,
    setSelectedExecutives,
    setSelectedRows,
    setSelectedExecutiveNode
}) => {
    // Logo y datos de sesión
    const userData = JSON.parse(localStorage.getItem('userData'));
    const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
    const nombreSesion = userData?.nombre || userData?.nombreEjecutivo || userData?.ejecutivo || '';
    const usuarioSesion = userData?.usuario || '';
    
    // Ref para el contenedor de la ramificación
    const ramificacionRef = useRef(null);
    // Estado local para colapsar/expandir nodos
    const [collapsedNodes, setCollapsedNodes] = useState({});

    const toggleCollapse = (id) => {
        setCollapsedNodes(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Función para hacer scroll hacia arriba
    const scrollToTop = () => {
        if (ramificacionRef.current) {
            ramificacionRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
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

    // Render recursivo de nodos (soporta N niveles)
    const renderNode = (node, level = 0, keyPath = '') => {
        if (!node) return null;
        const nodeKey = `${keyPath || 'node'}-${node.idEjecutivo || node.usuario || Math.random()}`;
        const hasSub = Array.isArray(node.subordinados) && node.subordinados.length > 0;
        const isCollapsed = !!collapsedNodes[node.idEjecutivo];

        return (
            <div
                key={nodeKey}
                className={`hs-accordion ${isCollapsed ? '' : 'active'}`}
                style={{ minWidth: 'max-content' }}
                role="treeitem"
                aria-expanded={!isCollapsed}
                id={`hs-cco-${nodeKey}-heading`}
                data-hs-tree-view-item={JSON.stringify({ value: node.usuario || node.nombreEjecutivo || node.idEjecutivo, isDir: hasSub })}
            >
                <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full">
                    {hasSub && (
                        <button
                            className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-hidden"
                            aria-expanded={!isCollapsed}
                            aria-controls={`hs-cco-${nodeKey}-collapse`}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); toggleCollapse(node.idEjecutivo); }}
                        >
                            <svg className="size-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path className={!isCollapsed ? 'hs-accordion-active:hidden block' : ''} d="M12 5v14"></path>
                            </svg>
                        </button>
                    )}

                    <div
                        className={`grow rounded-md cursor-pointer flex items-center`}
                        style={
                            selectedExecutiveNode === node.idEjecutivo
                                ? { whiteSpace: 'nowrap', minWidth: 'max-content', background: 'var(--color-jerarquia1)', color: '#fff' }
                                : { whiteSpace: 'nowrap', minWidth: 'max-content' }
                        }
                        onClick={() => {
                            setSelectedExecutiveNode(node.idEjecutivo);
                            setSelectedRows([]);
                            // Seleccionar todo el subárbol del nodo (excluyendo el id de sesión si aplica)
                            const allIds = collectAllIds(node).filter(id => id !== Number(idEjecutivoSesion));
                            if (allIds.length > 0) setSelectedExecutives(allIds);
                            else if (node.idEjecutivo) setSelectedExecutives([Number(node.idEjecutivo)]);
                            setTimeout(() => { if (ramificacionRef.current) ramificacionRef.current.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
                        }}
                        title={node.usuario + ' - ' + node.nombreEjecutivo}
                    >
                        <span className="text-sm font-medium w-full" style={{ color: selectedExecutiveNode === node.idEjecutivo ? '#2b463c' : '#147f5e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block' }}>
                            {node.usuario} - {node.nombreEjecutivo}
                        </span>
                    </div>
                </div>

                {hasSub && !isCollapsed && (
                    <div id={`hs-cco-${nodeKey}-collapse`} className="hs-accordion-content overflow-hidden transition-[height] duration-300" role="group" aria-labelledby={`hs-cco-${nodeKey}-heading`}>
                        <div className="ps-7 border-l border-gray-100 dark:border-neutral-700 pl-3" style={{ minWidth: 'max-content' }}>
                            {node.subordinados.map((child, cidx) => renderNode(child, level + 1, `${nodeKey}-${cidx}`))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div 
            ref={ramificacionRef}
            className="productividad-branch"
            style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: 'clamp(220px, 48vh, 520px)',
                maxHeight: 'min(56vh, 420px)',
                width: 'clamp(160px, 22vw, 320px)',
                background: '#ffffff',
                borderRadius: 8,
                border: '1px solid #e0e0e0',
                padding: '1.5vh 1vw'
            }}
        >
            {/* Usuario y Ejecutivo principal */}
            {idEjecutivoSesion && (
                <div
                    className={`sticky-session-executive${selectedExecutiveNode === Number(idEjecutivoSesion) ? ' selected' : ''}`}
                    title="Mostrar metas de los subordinados directos del ejecutivo de la sesión"
                    onClick={() => {
                        // Buscar el nodo raíz en executiveTree y seleccionar sus subordinados directos, igual que RamificacionSesiones
                        const rootNode = Array.isArray(executiveTree) ? executiveTree.find(n => Number(n.idEjecutivo) === Number(idEjecutivoSesion)) : null;
                        if (rootNode && Array.isArray(rootNode.subordinados) && rootNode.subordinados.length > 0) {
                            const idsSubordinados = rootNode.subordinados.map(sub => Number(sub.idEjecutivo)).filter(Boolean);
                            console.log('🟢 Subordinados directos del root enviados a obetenerTablaMetas:', idsSubordinados);
                            setSelectedExecutives(idsSubordinados);
                        } else {
                            // Si no tiene subordinados directos, seleccionar sólo el propio id
                            setSelectedExecutives([Number(idEjecutivoSesion)]);
                        }
                        setSelectedRows([]); // Limpiar selección de filas
                        setSelectedExecutiveNode(Number(idEjecutivoSesion)); // Iluminar el nodo raíz
                        // Hacer autoscroll hacia arriba
                        setTimeout(() => { scrollToTop(); }, 100);
                    }}
                >
                    {usuarioSesion} - {nombreSesion}
                </div>
            )}
            {loadingJerarquia ? (
                <div style={{ color: '#2b463c', fontWeight: 500, fontSize: 'clamp(12px,1.2vw,18px)', textAlign: 'center', marginTop: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh' }}>
                    <div className="spinner-sonner" style={{ marginBottom: 8 }}>
                        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#2b463c">
                            <g fill="none" fillRule="evenodd">
                                <g transform="translate(1 1)" strokeWidth="3">
                                    <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                                    <path d="M36 18c0-9.94-8.06-18-18-18">
                                        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <span>Cargando jerarquía...</span>
                </div>
            ) : errorJerarquia ? (
                <div style={{ color: '#b71c1c', fontWeight: 500, fontSize: 14, textAlign: 'center', marginTop: 30 }}>{errorJerarquia}</div>
            ) : (
                // Render Preline-like Tree View (recursivo)
                <div role="tree" aria-orientation="vertical" data-hs-tree-view>
                    {Array.isArray(executiveTree) && executiveTree.map((rootNode, i) => renderNode(rootNode, 0, `root-${i}`))}
                </div>
            )}
        </div>
    );
};

export default JerarquiaConR;
