import React, { useState, useEffect } from "react";
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";
import JerarquiaConR from "./JerarquiaConR/JerarquiaConR";
import { obetenerJerarquiaEncargados } from '../../../../services/LokiServices';

// Flecha tipo chevron moderna
const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#2b463c",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);


const ModalValidadoresContent = () => {
    // Estados para la jerarquía de ejecutivos (como en ModalMetasContent)
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    const [selectedExecutives, setSelectedExecutives] = useState([]); // array de idEjecutivo
    const [selectedRows, setSelectedRows] = useState([]);
    const [editValues, setEditValues] = useState({});
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]);
    // Otros estados propios del modal
    const [cartera, setCartera] = useState("American Express");
    const [producto, setProducto] = useState("Amex");
    const [arrepentimientos, setArrepentimientos] = useState(false);

    // Obtener la jerarquía de ejecutivos (idéntico a ModalMetasContent)
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
                        // Si no está el propio ejecutivo, lo agregamos como raíz
                        tree = [{
                            idEjecutivo: idEjecutivo,
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

    // Renderizado recursivo de la jerarquía (como prop para JerarquiaConR)
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
                        onClick={() => {
                            setSelectedExecutiveNode(node.idEjecutivo);
                            if (Array.isArray(node.subordinados) && node.subordinados.length > 0) {
                                const idsSub = node.subordinados.map(sub => sub.idEjecutivo).filter(Boolean);
                                setSelectedExecutives(idsSub);
                            } else {
                                setSelectedExecutives([]);
                            }
                        }}
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
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: "1rem"
        }}>
            {/* Columna izquierda - Jerarquía de ejecutivos */}
            <div style={{
                width: "300px",
                display: "flex",
                flexDirection: "column"
            }}>
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

            {/* Campos del lado derecho */}
            <div style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                {/* Logo del Consorcio Jurídico movido aquí arriba */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "1rem",
                }}>
                    <img 
                        src={ConsorcioLogo} 
                        alt="Consorcio Jurídico" 
                        style={{ 
                            height: "70px", 
                            width: "auto",
                            objectFit: "contain"
                        }}
                    />
                </div>

                {/* Cartera */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                        color: "var(--color-jerarquia3)"
                    }}>
                        Cartera
                    </label>
                    <input
                        type="text"
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1"
                        style={{ fontSize: "14px", width: "100%" }}
                    />
                </div>

                {/* Producto */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                        color: "var(--color-jerarquia3)"
                    }}>
                        Producto
                    </label>
                    <div style={{ position: "relative" }}>
                        <select
                            value={producto}
                            onChange={(e) => setProducto(e.target.value)}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            <option value="Amex">American Express</option>
                        </select>
                        <DropdownArrow />
                    </div>
                </div>

                {/* Checkbox Arrepentimientos */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    justifyContent: "center"
                }}>
                    <input
                        type="checkbox"
                        id="arrepentimientos"
                        checked={arrepentimientos}
                        onChange={(e) => setArrepentimientos(e.target.checked)}
                        style={{
                            width: "1rem",
                            height: "1rem",
                            accentColor: "var(--color-jerarquia1)"
                        }}
                    />
                    <label 
                        htmlFor="arrepentimientos" 
                        style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            color: "var(--color-jerarquia3)"
                        }}
                    >
                        Arrepentimientos
                    </label>
                </div>
            </div>

            <style>{`
                .hover-bg-gray-100:hover {
                    background-color: rgb(243 244 246) !important;
                }
                .hover-text-jerarquia4:hover {
                    color: var(--color-jerarquia4) !important;
                }
                /* Estilos para el scrollbar del panel de ramificación */
                div[style*="overflowY: auto"]::-webkit-scrollbar {
                    width: 8px;
                }
                div[style*="overflowY: auto"]::-webkit-scrollbar-track {
                    background: #f5f5f5;
                    border-radius: 4px;
                }
                div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </div>
    );
};

export default ModalValidadoresContent;