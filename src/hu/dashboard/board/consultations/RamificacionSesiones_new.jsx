import React, { useState, useEffect } from "react";
import JerarquiaConR from "../executives/JerarquiaConR/JerarquiaConR";

const RamificacionSesiones = () => {
    // Estados para JerarquiaConR
    const [executiveTree, setExecutiveTree] = useState(null);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]);
    const [selectedExecutives, setSelectedExecutives] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editValues, setEditValues] = useState({});

    // Función para renderizar el árbol de ejecutivos (puedes personalizarla según tus necesidades)
    const renderExecutiveTree = (tree) => {
        if (!tree) return null;
        
        return (
            <div className="executive-tree">
                {/* Aquí puedes implementar la lógica para renderizar el árbol */}
                <div className="text-sm text-gray-600">
                    Jerarquía de ejecutivos cargada
                </div>
            </div>
        );
    };

    return (
        <div className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-2xl flex flex-col p-6 w-full h-82">
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
                            d="M7 7a3 3 0 11-6 0 3 3 0 616 0zm0 0v10a3 3 0 006 0V7m0 10a3 3 0 006 0V7a3 3 0 10-6 0"
                        />
                    </svg>
                </span>
                Ramificación
            </h3>
            <div className="flex-1 min-h-[120px]">
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
