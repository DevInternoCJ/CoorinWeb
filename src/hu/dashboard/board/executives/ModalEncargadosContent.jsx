import React, { useState, useEffect, useCallback } from "react";
import JerarquiaConR from "./JerarquiaConR/JerarquiaConR";
import { obetenerJerarquiaEncargados, obetenerDropdownsEncargados, getCarteras, getCarterasProductos } from '../../../../services/LokiServices';
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";
import { toast } from "sonner";
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

const ModalEncargadosContent = () => {
    // Estados para dropdowns y logo
    const [cartera, setCartera] = React.useState("");
    const [producto, setProducto] = React.useState("");
    const [carteras, setCarteras] = React.useState([]);
    const [productos, setProductos] = React.useState([]);
    const [carterasProductosData, setCarterasProductosData] = React.useState([]); // Estado para guardar datos completos
    const [encargados, setEncargados] = React.useState([]);
    const [encargadosFiltrados, setEncargadosFiltrados] = React.useState([]); // Encargados filtrados por cartera/producto
    const [selectedEncargado, setSelectedEncargado] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Estados mínimos para la jerarquía
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    const [selectedExecutives, setSelectedExecutives] = useState([]);
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editValues, setEditValues] = useState({});

    // Fetch carteras, productos y encargados desde endpoints específicos
    useEffect(() => {
        setLoading(true);
        
        // Cargar carteras, productos y encargados en paralelo
        Promise.all([
            getCarteras(),
            getCarterasProductos(),
            obetenerDropdownsEncargados()
        ])
        .then(([carterasData, carterasProductosData, encargadosData]) => {
            // Establecer encargados
            setEncargados(encargadosData);
            
            // Guardar datos completos de carteras-productos para filtrado posterior
            setCarterasProductosData(carterasProductosData);
            
            // Usar las carteras del endpoint específico (solo el valor "cartera") y ordenar alfabéticamente
            const carterasFromEndpoint = carterasData
                .map(item => item.cartera)
                .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
            setCarteras(carterasFromEndpoint);
            setCartera(carterasFromEndpoint[0] || "");
            
            // Usar los productos del endpoint carteras-productos filtrados por la primera cartera
            const productosDelEndpoint = carterasProductosData
                .filter(item => item.cartera === (carterasFromEndpoint[0] || ""))
                .map(item => item.producto);
            
            // Agregar "-Sin Producto-" como primera opción por defecto
            const productosConDefault = ["-Sin Producto-", ...productosDelEndpoint];
            setProductos(productosConDefault);
            setProducto("-Sin Producto-"); // Seleccionar por defecto "-Sin Producto-"
            
            // Inicializar encargados filtrados con todos los encargados disponibles
            setEncargadosFiltrados(encargadosData);
            // Establecer el primer encargado disponible o VACIO si no hay ninguno
            if (encargadosData && encargadosData.length > 0) {
                setSelectedEncargado(encargadosData[0].idEjecutivo);
            } else {
                setSelectedEncargado("VACIO");
            }
        })
        .catch(err => {
            console.error("Error al cargar datos:", err);
            toast.error("Error al cargar los datos. Inténtalo de nuevo.");
        })
        .finally(() => setLoading(false));
    }, []);

    // Función para filtrar encargados según cartera y producto (basada en el código C# original)
    const filtrarEncargados = useCallback((carteraSeleccionada, productoSeleccionado) => {
        
        if (!encargados.length) return;
        
        let encargadosFiltrados = [];
        
        if (carteraSeleccionada && productoSeleccionado === "-Sin Producto-") {
            // Si hay cartera y producto es "-Sin Producto-": filtrar por cartera
            
            // Obtener todos los IDs de cartera que corresponden a la cartera seleccionada
            const idsCarteraRelacionados = carterasProductosData
                .filter(item => item.cartera === carteraSeleccionada)
                .map(item => item.idCartera)
                .filter((id, index, self) => self.indexOf(id) === index); // únicos
            
            encargadosFiltrados = encargados.filter(item => {
                const matchCartera = idsCarteraRelacionados.includes(item.idCartera);
                const sinProducto = item.idProducto === null || item.idProducto === 0;
                return matchCartera && sinProducto;
            });
            
        } else if (productoSeleccionado && productoSeleccionado !== "-Sin Producto-") {
            // Si hay producto seleccionado: filtrar por producto
            
            // Obtener todos los IDs de producto que corresponden al producto seleccionado
            const idsProductoRelacionados = carterasProductosData
                .filter(item => item.producto === productoSeleccionado)
                .map(item => item.idProducto)
                .filter((id, index, self) => self.indexOf(id) === index); // únicos
            
            encargadosFiltrados = encargados.filter(item => {
                const matchProducto = idsProductoRelacionados.includes(item.idProducto);
                return matchProducto;
            });
            
        } else {
            // Si no hay filtros específicos: mostrar todos los encargados
            encargadosFiltrados = encargados;
        }
        
        
        setEncargadosFiltrados(encargadosFiltrados);
        
        // Auto-seleccionar el primer encargado si hay encargados disponibles
        if (encargadosFiltrados.length > 0) {
            const primerEncargado = encargadosFiltrados[0];
            setSelectedEncargado(primerEncargado.idEjecutivo);
        } else {
            // Si no hay encargados disponibles, establecer como VACIO
            setSelectedEncargado("VACIO");
            console.log('No hay encargados disponibles para los filtros actuales - establecido como VACIO');
        }
    }, [encargados, carterasProductosData]);

    // Efectuar el filtrado cuando cambien cartera o producto
    useEffect(() => {
        filtrarEncargados(cartera, producto);
    }, [cartera, producto, encargados, filtrarEncargados]);

    // Obtener la jerarquía de encargados (idéntico a ModalMetasContent)
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
                toast.error('Error al obtener la jerarquía de ejecutivos. Inténtalo de nuevo.', e);
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
        <div className="flex gap-4 h-full">
            {/* Columna izquierda: Solo Jerarquía */}
            <div style={{ width: "18rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
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
            {/* Columna derecha - Logo y Campos */}
            <div style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem 0 0.5rem 0" }}>
                    <img 
                        src={ConsorcioLogo} 
                        alt="Logo Consorcio" 
                        style={{ width: "70px", height: "auto" }} 
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
                    <div style={{ position: "relative" }}>
                        <select
                            value={cartera}
                            onChange={e => {
                                setCartera(e.target.value);
                                // Al cambiar cartera, filtrar productos desde carterasProductosData
                                const productosFiltrados = carterasProductosData
                                    .filter(item => item.cartera === e.target.value)
                                    .map(item => item.producto);
                                
                                // Agregar "-Sin Producto-" como primera opción por defecto
                                const productosConDefault = ["-Sin Producto-", ...productosFiltrados];
                                setProductos(productosConDefault);
                                setProducto("-Sin Producto-"); // Seleccionar por defecto "-Sin Producto-"
                                
                                // Reset encargado seleccionado (sin filtrar por producto ya que está en "-Sin Producto-")
                                setSelectedEncargado(null);
                            }}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            {carteras.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <DropdownArrow />
                    </div>
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
                            onChange={e => {
                                setProducto(e.target.value);
                                // El filtrado y selección de encargado se maneja automáticamente por useEffect
                                setSelectedEncargado(null);
                            }}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            {productos.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        <DropdownArrow />
                    </div>
                </div>
                {/* Encargado */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                        color: "var(--color-jerarquia3)"
                    }}>
                        Encargado
                    </label>
                    <div style={{ position: "relative" }}>
                        {loading ? (
                            <div>Cargando encargados...</div>
                        ) : error ? (
                            <div style={{color:'red'}}>{error}</div>
                        ) : (
                            <select
                                value={selectedEncargado || (encargadosFiltrados && encargadosFiltrados.length > 0 ? "" : "VACIO")}
                                onChange={e => setSelectedEncargado(e.target.value)}
                                className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                            >
                                {encargadosFiltrados && encargadosFiltrados.length > 0 ? (
                                    <>
                                        <option value="">Seleccionar...</option>
                                        {encargadosFiltrados.map(item => (
                                            <option key={item.idEjecutivo} value={item.idEjecutivo}>
                                                {item.nombreEjecutivo}
                                            </option>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <option value="null" disabled></option>
                                        <option disabled>No hay encargados disponibles</option>
                                    </>
                                )}
                            </select>
                        )}
                        <DropdownArrow />
                    </div>
                </div>
                {/* Botón Cambiar */}
                <div style={{
                    marginTop: "1rem"
                }}>
                    <button
                        style={{
                            backgroundColor: "var(--color-jerarquia2)",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            width: "100%",
                            transition: "background-color 0.2s"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "var(--color-jerarquia3)"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "var(--color-jerarquia2)"}
                    >
                        Cambiar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEncargadosContent;