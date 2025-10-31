import React, { useState, useEffect, useRef } from "react";
import { obetenerJerarquiaEncargados } from "../../../../services/mark/albaz/LokiServices";

const RamificacionSesiones = ({ onExecutiveSelect }) => {
    // Estados para la jerarquía
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    
    // Estados para el comportamiento sticky
    const [stickyDirection, setStickyDirection] = useState('none'); // 'none', 'top', 'bottom'
    const [lastScrollTop, setLastScrollTop] = useState(0);

    // Estado para expandir/colapsar nodos
    const [collapsedNodes, setCollapsedNodes] = useState({});
    
    // Ref para el contenedor de scroll
    const ramificacionRef = useRef(null);

    // Lógica para obtener la jerarquía de ejecutivos
    useEffect(() => {
        const fetchExecutiveTree = async () => {
            setLoadingJerarquia(true);
            setErrorJerarquia(null);
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo;
                const usuario = userData?.usuario || '';
                const nombreEjecutivo = userData?.nombreEjecutivo;
                if (!idEjecutivo) throw new Error('No se encontró el idEjecutivo del usuario logueado');
                
                const data = await obetenerJerarquiaEncargados(idEjecutivo);
                console.log('Respuesta jerarquía ejecutivos:', data);
                
                // Si la respuesta NO incluye el nodo raíz, lo agregamos manualmente
                let tree = [];
                if (Array.isArray(data)) {
                    // Buscamos si el propio ejecutivo está en la raíz
                    const found = data.find(n => n.idEjecutivo === idEjecutivo);
                    if (found) {
                        tree = data;
                    } else {
                        // Lo agregamos como nodo raíz
                        tree = [{
                            idEjecutivo,
                            usuario,
                            nombreEjecutivo,
                            subordinados: data
                        }];
                    }
                }
                setExecutiveTree(tree);
                
                // Seleccionar el nodo raíz por defecto
                setSelectedExecutiveNode(idEjecutivo);
            } catch (e) {
                console.error('Error al obtener la jerarquía:', e);
                setErrorJerarquia('Error al obtener la jerarquía de ejecutivos');
                setExecutiveTree([]);
            } finally {
                setLoadingJerarquia(false);
            }
        };
        fetchExecutiveTree();
    }, []);

    // Manejar la dirección del scroll para sticky
    useEffect(() => {
        const container = ramificacionRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (!selectedExecutiveNode) {
                setStickyDirection('none');
                return;
            }

            const currentScrollTop = container.scrollTop;
            const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
            
            // Buscar el elemento seleccionado en el DOM
            const selectedElement = container.querySelector(`.executive-hierarchy-item.selected:not(.sticky-selected-top):not(.sticky-selected-bottom)`);
            
            if (!selectedElement) {
                setLastScrollTop(currentScrollTop);
                return;
            }

            const containerRect = container.getBoundingClientRect();
            const elementRect = selectedElement.getBoundingClientRect();
            
            // Calcular posiciones relativas al contenedor
            const elementTop = elementRect.top - containerRect.top;
            const elementBottom = elementRect.bottom - containerRect.top;
            const containerHeight = containerRect.height;
            
            // Verificar si el elemento está completamente visible en su posición original
            const isElementInOriginalViewport = elementTop >= 0 && elementBottom <= containerHeight;
            
            if (isElementInOriginalViewport) {
                // El elemento está visible en su posición original, quitar sticky
                setStickyDirection('none');
            } else {
                // El elemento no está visible, determinar el sticky según posición y dirección
                if (Math.abs(currentScrollTop - lastScrollTop) > 5) {
                    
                    // Caso 1: Scroll hacia abajo - el elemento se sale por arriba
                    if (scrollDirection === 'down' && elementTop < 0) {
                        setStickyDirection('top');
                    }
                    // Caso 2: Scroll hacia arriba - el elemento se sale por abajo
                    else if (scrollDirection === 'up' && elementBottom > containerHeight) {
                        setStickyDirection('bottom');
                    }
                    // Caso 3: Mantener sticky si ya estaba activo y el elemento sigue fuera de vista
                    else if (stickyDirection === 'top' && elementTop < 0) {
                        // Mantener sticky arriba hasta que el elemento sea visible desde arriba
                        setStickyDirection('top');
                    }
                    else if (stickyDirection === 'bottom' && elementBottom > containerHeight) {
                        // Mantener sticky abajo hasta que el elemento sea visible desde abajo
                        setStickyDirection('bottom');
                    }
                }
            }
            
            setLastScrollTop(currentScrollTop);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop, selectedExecutiveNode, stickyDirection]);

    // Función para hacer scroll hacia arriba
    const scrollToTop = () => {
        if (ramificacionRef.current) {
            ramificacionRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    // Función para expandir/colapsar un nodo
    const toggleCollapse = (id) => {
        setCollapsedNodes(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Renderizar la jerarquía usando el Tree View de Preline
    const renderExecutiveTree = (tree, level = 0, parentKey = '') => {
        if (!Array.isArray(tree)) return null;
        return tree.map((node, idx) => {
            const isSelected = node.idEjecutivo === selectedExecutiveNode;
            const isCollapsed = collapsedNodes[node.idEjecutivo];
            const hasSub = Array.isArray(node.subordinados) && node.subordinados.length > 0;
            const nodeKey = `${parentKey}${node.idEjecutivo || node.usuario || idx}`;
            const headingId = `hs-checkbox-tree-heading-${nodeKey}`;
            const collapseId = `hs-checkbox-tree-collapse-${nodeKey}`;
            return (
                <div
                    key={nodeKey}
                    className={`hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-2-${level + 1}${isSelected ? ' hs-tree-view-selected:bg-gray-100' : ''}`}
                    role="treeitem"
                    aria-expanded={hasSub ? !isCollapsed : undefined}
                    id={headingId}
                    data-hs-tree-view-item={JSON.stringify({
                        value: node.usuario || node.nombreEjecutivo || node.idEjecutivo,
                        isDir: hasSub
                    })}
                >
                    {/* Heading */}
                    <div
                        className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full"
                        style={isSelected ? { background: 'var(--color-jerarquia1)', color: '#2b463c' } : {}}
                    >
                        {hasSub && (
                            <button
                                className="hs-accordion-toggle size-6 flex justify-center items-center rounded-md focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
                                aria-expanded={!isCollapsed}
                                aria-controls={collapseId}
                                type="button"
                                style={{ background: 'var(--color-jerarquia1)' }}
                                onMouseOver={e => e.currentTarget.style.background = 'var(--color-jerarquia2)'}
                                onMouseOut={e => e.currentTarget.style.background = 'var(--color-jerarquia1)'}
                                onFocus={e => e.currentTarget.style.background = 'var(--color-jerarquia2)'}
                                onBlur={e => e.currentTarget.style.background = 'var(--color-jerarquia1)'}
                                onClick={e => { e.stopPropagation(); toggleCollapse(node.idEjecutivo); }}
                            >
                                <svg className="size-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path className={!isCollapsed ? 'hs-accordion-active:hidden block' : ''} d="M12 5v14"></path>
                                </svg>
                            </button>
                        )}
                        <div
                            className={`grow rounded-md cursor-pointer flex items-center`}
                            onClick={() => {
                                setSelectedExecutiveNode(node.idEjecutivo);
                                if (onExecutiveSelect) {
                                    onExecutiveSelect(node.idEjecutivo);
                                }
                            }}
                            onDoubleClick={() => {
                                if (hasSub) toggleCollapse(node.idEjecutivo);
                            }}
                            title={node.usuario + ' - ' + node.nombreEjecutivo}
                        >
                            <span className="text-sm font-medium w-full" style={{color: isSelected ? '#2b463c' : '#147f5e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block'}}>
                                {node.usuario} - {node.nombreEjecutivo}
                            </span>
                        </div>
                    </div>
                    {/* Collapse */}
                    {hasSub && !isCollapsed && (
                        <div
                            id={collapseId}
                            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                            role="group"
                            aria-labelledby={headingId}
                        >
                            <div className="ps-7 border-l border-gray-100 dark:border-neutral-700 pl-3">
                                {renderExecutiveTree(node.subordinados, level + 1, nodeKey)}
                            </div>
                        </div>
                    )}
                </div>
            );
        });
    };

    // Obtener datos de la sesión
    const userData = JSON.parse(localStorage.getItem('userData'));
    const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
    const nombreSesion = userData?.nombre || userData?.nombreEjecutivo || userData?.ejecutivo || '';
    const usuarioSesion = userData?.usuario || '';

    return (
        <div className=" bg-white shadow-lg ring-1 ring-black/5 rounded-2xl flex flex-col p-4 lg:p-6 w-full h-auto lg:h-82 min-h-64 ramificacion-sesiones">
            {/* Header responsive */}
            <div className="mb-1">
                {/* Layout para pantallas grandes (md y superiores) */}
                <div className="hidden lg:grid grid-cols-3 items-center">
                    {/* Columna izquierda - Título */}
                    <div className="flex items-center text-gray-800">
                        <span className="mr-2">
                            {/* Icono de ramificación */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block w-6 h-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7a3 3 0 11-6 0 3 3 0 016 0zm0 0v10a3 3 0 006 0V7m0 10a3 3 0 006 0V7a3 3 0 10-6 0"
                                />
                            </svg>
                        </span>
                        <h3 className="text-base lg:text-lg font-semibold">Ramificación</h3>
                    </div>
                    
                    {/* Columna centro - Ejecutivo de la sesión */}
                    <div className="flex justify-center">
                        {idEjecutivoSesion && (
                            <div
                                className={`sticky-session-executive${selectedExecutiveNode === Number(idEjecutivoSesion) ? ' selected' : ''} text-sm truncate max-w-full`}
                                title="Ejecutivo de la sesión actual"
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
                                style={{ position: 'static', margin: 0 }}
                            >
                                {usuarioSesion} - {nombreSesion}
                            </div>
                        )}
                    </div>
                    
                    {/* Columna derecha - Vacía por ahora */}
                    <div></div>
                </div>

                {/* Layout para pantallas pequeñas (móviles y tablets) */}
                <div className="xl:hidden">
                    {/* Fila 1 - Título */}
                    <div className="flex items-center text-gray-800 mb-2">
                        <span className="mr-2">
                            {/* Icono de ramificación */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block w-5 h-5 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7a3 3 0 11-6 0 3 3 0 016 0zm0 0v10a3 3 0 006 0V7m0 10a3 3 0 006 0V7a3 3 0 10-6 0"
                                />
                            </svg>
                        </span>
                        <h3 className="text-sm xl:text-base font-semibold">Ramificación</h3>
                    </div>
                    
                    {/* Fila 2 - Ejecutivo de la sesión */}
                    {idEjecutivoSesion && (
                        <div className="flex justify-center">
                            <div
                                className={`sticky-session-executive${selectedExecutiveNode === Number(idEjecutivoSesion) ? ' selected' : ''} text-xs px-2 py-1 rounded-md bg-gray-50 border text-center max-w-full truncate`}
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
                                style={{ position: 'static', margin: 0 }}
                            >
                                <div className="truncate">
                                    <span className="font-medium">{usuarioSesion}</span>
                                    <br className="sm:hidden" />
                                    <span className="sm:before:content-['-'] sm:before:mx-1">{nombreSesion}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Contenedor de la ramificación con estilos de JerarquiaConR */}
            <div
                ref={ramificacionRef}
                className="productividad-branch flex-1 h-[40vh] xl:h-[56vh]"
                style={{
                    overflowX: 'auto',
                    overflowY: 'auto',
                    width: '100%',
                    maxWidth: '100%',
                    background: '#ffffff',
                    borderRadius: 8,
                    border: '1px solid #e0e0e0',
                    padding: 6
                }}
            >
                {/* Contenido de la jerarquía con Preline Tree View */}
                {loadingJerarquia ? (
                    <div style={{
                        color: '#2b463c',
                        fontWeight: 500,
                        fontSize: 15,
                        textAlign: 'center',
                        marginTop: 30,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10
                    }}>
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
                    <div style={{
                        color: '#b71c1c',
                        fontWeight: 500,
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: 30
                    }}>
                        {errorJerarquia}
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
        </div>
    );
};

export default RamificacionSesiones;