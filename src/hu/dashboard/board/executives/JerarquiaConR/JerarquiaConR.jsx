import React, { useRef } from "react";

const JerarquiaConR = ({
    executiveTree,
    loadingJerarquia,
    errorJerarquia,
    selectedExecutiveNode,
    allHierarchyIds,
    setSelectedExecutives,
    setSelectedRows,
    setSelectedExecutiveNode,
    renderExecutiveTree
}) => {
    // Logo y datos de sesión
    const userData = JSON.parse(localStorage.getItem('userData'));
    const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
    const nombreSesion = userData?.nombre || userData?.nombreEjecutivo || userData?.ejecutivo || '';
    const usuarioSesion = userData?.usuario || '';
    
    // Ref para el contenedor de la ramificación
    const ramificacionRef = useRef(null);

    // Función para hacer scroll hacia arriba
    const scrollToTop = () => {
        if (ramificacionRef.current) {
            ramificacionRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            ref={ramificacionRef}
            className="productividad-branch" 
            style={{ overflowX: 'auto', overflowY: 'auto', height: '56vh', width: '18rem', background: '#ffffff', borderRadius: 8, border: '1px solid #e0e0e0', padding: 8 }}
        >
            {/* Usuario y Ejecutivo principal */}
            {idEjecutivoSesion && (
                <div
                    className={`sticky-session-executive${selectedExecutiveNode === Number(idEjecutivoSesion) ? ' selected' : ''}`}
                    title="Mostrar metas de TODOS los encargados de la jerarquía"
                    onClick={() => {
                        // Excluir el propio idEjecutivo de la sesión
                        const idsSinSesion = allHierarchyIds.filter(id => id !== Number(idEjecutivoSesion));
                        console.log('🟢 Enviando estos idEjecutivo al endpoint (sin sesión):', idsSinSesion);
                        setSelectedExecutives(idsSinSesion);
                        setSelectedRows([]); // Limpiar selección de filas
                        setSelectedExecutiveNode(Number(idEjecutivoSesion)); // Iluminar el nodo raíz
                        
                        // Hacer autoscroll hacia arriba
                        setTimeout(() => {
                            scrollToTop();
                        }, 100);
                    }}
                >
                    {usuarioSesion} - {nombreSesion}
                </div>
            )}
            {loadingJerarquia ? (
                <div style={{ color: '#2b463c', fontWeight: 500, fontSize: 15, textAlign: 'center', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
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
                renderExecutiveTree(executiveTree)
            )}
        </div>
    );
};

export default JerarquiaConR;
