import React, { useState, useEffect } from "react";
import JerarquiaConR from "../../executives/JerarquiaConR/JerarquiaConR";
import { obetenerJerarquiaEncargados } from '../../../../../services/LokiServices';
import { IconProductividad } from "../IconesConsultations";

const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#222",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);


const ModalProductividadContent = () => {
    // Estados mínimos para la jerarquía
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    const [selectedExecutives, setSelectedExecutives] = useState([]);
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editValues, setEditValues] = useState({});

    // Obtener la jerarquía de ejecutivos (idéntico a otros modales)
    useEffect(() => {
        const fetchExecutiveTree = async () => {
            setLoadingJerarquia(true);
            setErrorJerarquia(null);
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                const usuario = userData?.usuario || '';
                const nombreEjecutivo = userData?.nombre || userData?.nombreEjecutivo || userData?.ejecutivo || '';
                if (!idEjecutivo) throw new Error('No se encontró el idEjecutivo del usuario logueado');
                const data = await obetenerJerarquiaEncargados(idEjecutivo);
                let tree = [];
                if (Array.isArray(data)) {
                    const found = data.find(n => n.idEjecutivo === idEjecutivo);
                    if (found) {
                        tree = data;
                    } else {
                        tree = [{
                            idEjecutivo,
                            usuario,
                            nombreEjecutivo,
                            subordinados: data
                        }];
                    }
                }
                setExecutiveTree(tree);
            } catch (e) {
                setErrorJerarquia('Error al obtener la jerarquía de ejecutivos');
                setExecutiveTree([]);
            } finally {
                setLoadingJerarquia(false);
            }
        };
        fetchExecutiveTree();
    }, []);

    // Calcular todos los ids de la jerarquía al cargar
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
        if (!idEjecutivo || !executiveTree.length) return;
        const rootNode = executiveTree.find(n => n.idEjecutivo === idEjecutivo);
        const getAllHierarchyIds = (node) => {
            let ids = [];
            if (!node) return ids;
            if (node.idEjecutivo) ids.push(node.idEjecutivo);
            if (Array.isArray(node.subordinados) && node.subordinados.length > 0) {
                for (const sub of node.subordinados) {
                    ids = ids.concat(getAllHierarchyIds(sub));
                }
            }
            return ids;
        };
        if (rootNode) {
            const allIds = getAllHierarchyIds(rootNode)
                .map(id => Number(id))
                .filter(id => Number.isInteger(id) && id > 0);
            setAllHierarchyIds(allIds);
        } else {
            setAllHierarchyIds([]);
        }
    }, [executiveTree]);

    // Renderizado recursivo para la jerarquía
    const renderExecutiveTree = (tree, level = 0) => {
        if (!Array.isArray(tree)) return null;
        return tree.map((node, idx) => {
            const isSelected = node.idEjecutivo === selectedExecutiveNode;
            return (
                <React.Fragment key={node.usuario || node.id || idx}>
                    <div
                        className={`executive-hierarchy-item${isSelected ? ' selected' : ''}`}
                        style={{
                            paddingLeft: level * 18,
                            marginBottom: 2,
                            fontWeight: 500,
                            fontSize: 13,
                            color: isSelected ? '#2b463c' : undefined,
                            userSelect: 'none',
                        }}
                        onClick={() => setSelectedExecutiveNode(node.idEjecutivo)}
                        title={Array.isArray(node.subordinados) && node.subordinados.length > 0 ? "Mostrar solo subordinados" : "Mostrar solo este ejecutivo"}
                    >
                        {node.usuario || ''} - {node.nombreEjecutivo || ''}
                    </div>
                    {Array.isArray(node.subordinados) && node.subordinados.length > 0 && (
                        renderExecutiveTree(node.subordinados, level + 1)
                    )}
                </React.Fragment>
            );
        });
    };


    return (
        <>
            <div className="flex gap-4 h-full">
                {/* Columna izquierda - Jerarquía de Ejecutivos */}
                <JerarquiaConR
                    executiveTree={executiveTree}
                    loadingJerarquia={loadingJerarquia}
                    errorJerarquia={errorJerarquia}
                    selectedExecutiveNode={selectedExecutiveNode}
                    allHierarchyIds={allHierarchyIds}
                    setSelectedExecutives={setSelectedExecutives}
                    setSelectedRows={setSelectedRows}
                    setEditValues={setEditValues}
                    setSelectedExecutiveNode={setSelectedExecutiveNode}
                    renderExecutiveTree={renderExecutiveTree}
                />

                {/* Columna derecha - Tabla de datos */}
                <div className="flex-1 bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex flex-col" style={{ minWidth: 0 }}>
                    {/* Fila de filtros con label a la izquierda, selects centrados */}
                    <div className="flex items-center mb-2 w-full">
                        <span className="modal-span-1 pl-1 mr-4">Ejecutivos - 1</span>
                    </div>

                    {/* Tabla con scroll */}
                    <div
                        style={{
                            overflowX: "auto",
                            overflowY: "auto",
                            maxHeight: "31vh",
                            height: "100%",
                            flex: 1
                        }}
                        className="scrollbar-gray"
                    >
                        <table className="modal-table mb-2">
                            <thead>
                                <tr>
                                    <th>Extensión</th>
                                    <th>Ingreso</th>
                                    <th>PrimerGestión</th>
                                    <th>Modo</th>
                                    <th>TiempoEnModo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">0</td>
                                    <td>09:14 a. m.</td>
                                    <td>01:29 p. m.</td>
                                    <td>Consulta</td>
                                    <td>3:59:52</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <style>{`
                .scrollbar-gray::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                    background: #f5f5f5;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </>
    );
}

export default ModalProductividadContent;