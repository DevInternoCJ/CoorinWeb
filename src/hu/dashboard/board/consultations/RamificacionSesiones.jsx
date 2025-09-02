import React, { useState, useEffect } from "react";
import JerarquiaConR from "../executives/JerarquiaConR/JerarquiaConR";
import { obetenerJerarquiaEncargados } from '../../../../services/LokiServices';

const RamificacionSesiones = ({ onExecutiveSelect }) => {
    // Estados para JerarquiaConR
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]);
    const [_selectedExecutives, setSelectedExecutives] = useState([]);
    const [_selectedRows, setSelectedRows] = useState([]);
    const [_editValues, setEditValues] = useState({});

    // Lógica para obtener la jerarquía de ejecutivos
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
                console.log('🟢 Respuesta jerarquía ejecutivos:', data);
                
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

    // Calcular todos los IDs de la jerarquía cuando cambia el árbol
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
        if (!idEjecutivo || !executiveTree.length) return;
        
        const rootNode = executiveTree.find(n => n.idEjecutivo === idEjecutivo);
        
        // Función recursiva para obtener todos los ids de la jerarquía, incluyendo el propio
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
            // ids de toda la jerarquía (incluyendo el propio)
            const allIds = getAllHierarchyIds(rootNode)
                .map(id => Number(id))
                .filter(id => Number.isInteger(id) && id > 0);
            setAllHierarchyIds(allIds);
            setSelectedExecutiveNode(idEjecutivo); // Iluminar el nodo raíz al inicio
        } else {
            setAllHierarchyIds([]);
        }
    }, [executiveTree]);

    // Función para renderizar el árbol de ejecutivos
    const renderExecutiveTree = (tree, level = 0) => {
        if (!Array.isArray(tree)) return null;
        return tree.map((node, idx) => {
            // Solo iluminar el nodo seleccionado en la jerarquía
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
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setSelectedExecutiveNode(node.idEjecutivo);
                            if (onExecutiveSelect) {
                                onExecutiveSelect(node.idEjecutivo);
                            }
                        }}
                        title="Seleccionar ejecutivo"
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
        <div className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-2xl flex flex-col p-6 w-full h-82 ramificacion-sesiones">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
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
                Ramificación
            </h3>
            <div className="flex-1 min-h-[120px] scrollbar-gray">
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
            </div>
        </div>
    );
};

export default RamificacionSesiones;
