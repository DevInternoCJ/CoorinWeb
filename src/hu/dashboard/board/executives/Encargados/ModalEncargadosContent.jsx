import React, { useState, useEffect, useCallback, useMemo } from "react";
import { obetenerJerarquiaEncargados, obetenerDropdownsEncargados, getCarteras, getCarterasProductos, AsignaEncargados } from "../../../../../services/mark/albaz/LokiServices";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";
import { toast } from "sonner";
import JerarquiaConR from '../../branchs/JerarquiaConR';
// Flecha tipo chevron moderna
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
    const [error] = React.useState(null);
    const [isChangingAssignment, setIsChangingAssignment] = React.useState(false);

    // Estados para la jerarquía de encargados (igual que en ModalValidadoresContent)
    const [executiveTree, setExecutiveTree] = useState([]);
    const [usuariosEncargados, setUsuariosEncargados] = useState([]);

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

    // Cargar ejecutivos jerarquía (igual que en ModalValidadoresContent)
    useEffect(() => {
        const fetchExecutives = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id;
                if (!idEjecutivo) return;
                const data = await obetenerJerarquiaEncargados(idEjecutivo);
                // El nodo raíz será el ejecutivo de la sesión, y todos los demás serán sus subordinados directos
                const rootNode = {
                    usuario: userData.usuario || '',
                    nombreEjecutivo: userData.nombre || userData.nombreEjecutivo || userData.ejecutivo || '',
                    subordinados: Array.isArray(data) ? data : [],
                    idEjecutivo: idEjecutivo,
                    idEncargado: null,
                    seleccionado: false
                };
                setExecutiveTree([rootNode]);
            } catch (error) {
                toast.error('Error al cargar ejecutivos para encargados:', error);
                setExecutiveTree([]);
            }
        };
        fetchExecutives();
    }, []);

    // Filtrar ejecutivos: Mostrar toda la jerarquía para encargados
    // Recursivo: agrega todos los nodos del árbol a usuariosEncargados
    const usuariosFiltrados = useMemo(() => {
        if (!executiveTree.length) return [];
        const usuariosEncargados = [];
        const recorrer = (nodo, nivel = 1, padre = null) => {
            usuariosEncargados.push({
                ...nodo,
                usuario: nodo.usuario || nodo.Usuario || '',
                nombreEjecutivo: nodo.nombreEjecutivo || '',
                displayName: `${nodo.usuario || nodo.Usuario || ''} - ${nodo.nombreEjecutivo || ''}`,
                idEjecutivo: nodo.idEjecutivo || nodo.idejecutivo || nodo.id || '',
                idEncargado: nodo.idEncargado || (padre && padre.idEjecutivo),
                nivelJerarquia: nivel,
                esSubordinado: nivel > 1,
                encargadoPadre: padre ? (padre.usuario || padre.Usuario || '') : null,
                seleccionado: false
            });
            if (Array.isArray(nodo.subordinados) && nodo.subordinados.length > 0) {
                nodo.subordinados.forEach(sub => recorrer(sub, nivel + 1, nodo));
            }
        };
        executiveTree.forEach(root => recorrer(root, 1, null));
        return usuariosEncargados;
    }, [executiveTree]);

    // Actualizar usuariosEncargados cuando cambie usuariosFiltrados
    useEffect(() => {
        setUsuariosEncargados(usuariosFiltrados);
    }, [usuariosFiltrados]);

    // Función para recargar todos los datos después de una asignación exitosa
    const recargarDatos = useCallback(async () => {
        setLoading(true);
        try {
            // Cargar carteras, productos y encargados en paralelo
            const [carterasData, carterasProductosData, encargadosData] = await Promise.all([
                getCarteras(),
                getCarterasProductos(),
                obetenerDropdownsEncargados()
            ]);

            // Establecer encargados
            setEncargados(encargadosData);
            
            // Guardar datos completos de carteras-productos para filtrado posterior
            setCarterasProductosData(carterasProductosData);
            
            // Usar las carteras del endpoint específico (solo el valor "cartera") y ordenar alfabéticamente
            const carterasFromEndpoint = carterasData
                .map(item => item.cartera)
                .sort((a, b) => a.localeCompare(b));
            setCarteras(carterasFromEndpoint);
            
            // Mantener la cartera actual si existe, sino seleccionar la primera
            const carteraActual = cartera || carterasFromEndpoint[0] || "";
            if (!cartera) setCartera(carteraActual);
            
            // Usar los productos del endpoint carteras-productos filtrados por la cartera actual
            const productosDelEndpoint = carterasProductosData
                .filter(item => item.cartera === carteraActual)
                .map(item => item.producto);
            
            // Agregar "-Sin Producto-" como primera opción por defecto
            const productosConDefault = ["-Sin Producto-", ...productosDelEndpoint];
            setProductos(productosConDefault);
            
            // Mantener el producto actual si existe
            if (!producto || !productosConDefault.includes(producto)) {
                setProducto("-Sin Producto-");
            }
            
            // Recargar la jerarquía de ejecutivos
            const userData = JSON.parse(localStorage.getItem('userData'));
            const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id;
            if (idEjecutivo) {
                const jerarquiaData = await obetenerJerarquiaEncargados(idEjecutivo);
                // El nodo raíz será el ejecutivo de la sesión, y todos los demás serán sus subordinados directos
                const rootNode = {
                    usuario: userData.usuario || '',
                    nombreEjecutivo: userData.nombre || userData.nombreEjecutivo || userData.ejecutivo || '',
                    subordinados: Array.isArray(jerarquiaData) ? jerarquiaData : [],
                    idEjecutivo: idEjecutivo,
                    idEncargado: null,
                    seleccionado: false
                };
                setExecutiveTree([rootNode]);
            }
            
        } catch (err) {
            console.error("Error al recargar datos:", err);
            toast.error("Error al recargar los datos después de la asignación.");
        } finally {
            setLoading(false);
        }
    }, [cartera, producto]);

    // Calcular contador de encargados asignados vs total
    const contadorEncargados = useMemo(() => {
        const totalEncargados = usuariosEncargados.length;
        const encargadosAsignados = usuariosEncargados.filter(u => u.seleccionado).length;
        return { asignados: encargadosAsignados, total: totalEncargados };
    }, [usuariosEncargados]);

    // Handler para seleccionar/deseleccionar usuarios
    const handleSeleccionarUsuario = (usuario, index) => {
        const usuarioActual = usuariosEncargados[index];
        const nuevoEstado = !usuarioActual.seleccionado;
        
        // Actualizar el estado local inmediatamente para mejor UX
        setUsuariosEncargados(prev => {
            const updated = prev.map((u, i) => 
                i === index ? { ...u, seleccionado: nuevoEstado } : u
            );
            
            // Log para debug
            const selectedUsers = updated.filter(u => u.seleccionado).map(u => u.displayName);
            console.log('Usuarios seleccionados para encargados:', selectedUsers);
            
            return updated;
        });
    };

    // Handler para manejar el cambio de asignación
    const handleCambiarAsignacion = async () => {
        try {
            // Validar que hay usuarios seleccionados
            const usuariosSeleccionados = usuariosEncargados.filter(u => u.seleccionado);
            if (usuariosSeleccionados.length === 0) {
                toast.warning("Selecciona al menos un ejecutivo para asignar.");
                return;
            }

            // Si no hay encargado seleccionado, se enviará 0 como idEncargado
            // (El servidor manejará este caso según la lógica de negocio)

            // Obtener IDs de cartera y producto
            const idCartera = carterasProductosData.find(item => item.cartera === cartera)?.idCartera;
            const idProducto = producto === "-Sin Producto-" ? 
                0 : // Cuando se selecciona "--Sin Producto--", el valor enviado es 0 para idProducto
                carterasProductosData.find(item => item.producto === producto)?.idProducto;

            if (!idCartera) {
                toast.error("No se pudo obtener el ID de la cartera seleccionada.");
                return;
            }

            setIsChangingAssignment(true);

            // Crear el cuerpo de la petición - array de objetos CambiaEncargadoDto
            const requestBody = usuariosSeleccionados.map(usuario => ({
                idEncargado: (!selectedEncargado || selectedEncargado === "VACIO" || selectedEncargado === "Null" || selectedEncargado === "" || selectedEncargado === " ") ? 0 : parseInt(selectedEncargado),
                idEjecutivo: parseInt(usuario.idEjecutivo),
                idCartera: parseInt(idCartera),
                idProducto: idProducto !== null && idProducto !== undefined ? parseInt(idProducto) : 0
            }));

            console.log('Enviando asignación de encargados:', requestBody);
            console.log('👥 Usuarios seleccionados:', usuariosSeleccionados.map(u => u.displayName));
            console.log('Array de asignaciones:', `${requestBody.length} asignación(es) a procesar`);
            
            try {
                await AsignaEncargados(requestBody);
                
                // Si llegamos aquí, la asignación fue exitosa
                const encargadoSeleccionadoNombre = (!selectedEncargado || selectedEncargado === "VACIO" || selectedEncargado === "Null" || selectedEncargado === "" || selectedEncargado === " ") ? 
                    "Sin Encargado" : 
                    encargadosFiltrados.find(e => e.idEjecutivo.toString() === selectedEncargado.toString())?.nombreEjecutivo || "Encargado";
                
                // Formato ordenado del mensaje del toast
                let mensaje = `${usuariosSeleccionados.length} asignado(s) exitosamente`;
                mensaje += `\nNueva Cartera: ${cartera}`;
                
                if (producto && producto !== "-Sin Producto-") {
                    mensaje += `\nNuevo Producto: ${producto}`;
                } else {
                    mensaje += `\nNuevo Producto: Sin Producto`;
                }
                
                mensaje += `\nNuevo Encargado: ${encargadoSeleccionadoNombre}`;

                if (usuariosSeleccionados.length <= 3) {
                    mensaje += `\n\nEjecutivo(s): ${usuariosSeleccionados.map(u => u.displayName).join(", ")}`;
                }

                toast.success(mensaje, { duration: 6000 });

                // Recargar datos después de la asignación exitosa
                await recargarDatos();

                // Limpiar selecciones
                setUsuariosEncargados(prev => prev.map(u => ({ ...u, seleccionado: false })));

            } catch (error) {
                console.error('Error al asignar ejecutivos:', error);
                
                // Mensaje de error más descriptivo
                let errorMessage = "Error al procesar las asignaciones.";
                if (error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    if (errors.listaEjecutivo) {
                        errorMessage += ` Problema con la lista de ejecutivos: ${errors.listaEjecutivo.join(', ')}`;
                    }
                    if (errors.idEjecutivo) {
                        errorMessage += ` Problema con los ejecutivos: ${errors.idEjecutivo.join(', ')}`;
                    }
                    if (errors.idEncargado) {
                        errorMessage += ` Problema con el encargado: ${errors.idEncargado.join(', ')}`;
                    }
                    if (errors.idCartera) {
                        errorMessage += ` Problema con la cartera: ${errors.idCartera.join(', ')}`;
                    }
                    if (errors.idProducto) {
                        errorMessage += ` Problema con el producto: ${errors.idProducto.join(', ')}`;
                    }
                    if (errors.$) {
                        errorMessage += ` Error de formato JSON: ${errors.$.join(', ')}`;
                    }
                }
                
                console.log('📋 Detalles completos del error:', error.response?.data);
                
                toast.error(errorMessage);
            }



        } catch (error) {
            console.error('Error general al cambiar asignación:', error);
            toast.error("Error inesperado al procesar las asignaciones.");
        } finally {
            setIsChangingAssignment(false);
        }
    };

    return (
    <div className="flex flex-col md:flex-row w-full h-full gap-4 overflow-y-auto max-h-screen">
            {/* Bloque de controles: logo, dropdowns, botón */}
            <div className="flex flex-col w-full md:w-[300px] md:order-2 gap-2">
                <div className="flex justify-center items-center mb-4">
                    <img src={ConsorcioLogo} alt="Consorcio Jurídico" className="h-16 object-contain" />
                </div>
                {/* Cartera */}
                <div className="relative w-full mb-2">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cartera}
                        onChange={e => {
                            setCartera(e.target.value);
                            const productosFiltrados = carterasProductosData
                                .filter(item => item.cartera === e.target.value)
                                .map(item => item.producto);
                            const productosConDefault = ["-Sin Producto-", ...productosFiltrados];
                            setProductos(productosConDefault);
                            setProducto("-Sin Producto-");
                        }}
                        id="cartera-select"
                    >
                        {carteras.length === 0 && <option value="" disabled hidden></option>}
                        {carteras.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                {/* Producto */}
                <div className="relative w-full mb-2">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={producto}
                        onChange={e => {
                            setProducto(e.target.value);
                        }}
                        id="producto-select"
                    >
                        {productos.length === 0 && <option value="" disabled hidden></option>}
                        {productos.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    <label
                        htmlFor="producto-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Producto
                    </label>
                </div>
                {/* Encargado */}
                <div className="relative w-full mb-2">
                    {loading ? (
                        <div className="p-4 text-gray-500">Cargando encargados...</div>
                    ) : error ? (
                        <div className="p-4 text-red-500">{error}</div>
                    ) : (
                        <>
                            <select
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={selectedEncargado || (encargadosFiltrados && encargadosFiltrados.length > 0 ? "" : "VACIO")}
                                onChange={e => setSelectedEncargado(e.target.value)}
                                id="encargado-select"
                            >
                                {encargadosFiltrados && encargadosFiltrados.length > 0 ? (
                                    <>
                                        {selectedEncargado ? null : <option value="">Seleccionar...</option>}
                                        {encargadosFiltrados
                                            .slice()
                                            .sort((a, b) => (a.nombreEjecutivo || '').localeCompare(b.nombreEjecutivo || ''))
                                            .map(item => (
                                                <option key={item.idEjecutivo} value={item.idEjecutivo}>
                                                    {item.nombreEjecutivo}
                                                </option>
                                            ))}
                                    </>
                                ) : (
                                    <option value="Null"></option>
                                )}
                            </select>
                            <label
                                htmlFor="encargado-select"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Encargado
                            </label>
                        </>
                    )}
                </div>
                {/* Botón Cambiar */}
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        className={`btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center${isChangingAssignment || loading ? ' opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleCambiarAsignacion}
                        disabled={isChangingAssignment || loading}
                    >
                        {isChangingAssignment ? "Procesando..." : "Cambiar"}
                    </button>
                </div>
            </div>
            {/* Bloque árbol y contador */}
            <div className="flex flex-col w-full md:w-[300px] md:order-1 max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-visible">
                <label className="modal-span-1" style={{ color: "var(--color-jerarquia3)", marginBottom: 8 }}>
                    Encargados ({contadorEncargados.asignados} / {contadorEncargados.total})
                </label>
                <JerarquiaConR
                    executiveTree={executiveTree}
                    loadingJerarquia={loading}
                    errorJerarquia={error}
                    selectedExecutiveNode={null}
                    setSelectedExecutives={() => {}}
                    setSelectedRows={() => {}}
                    setSelectedExecutiveNode={() => {}}
                    useCheckbox={true}
                    usuariosValidadores={usuariosEncargados}
                    handleSeleccionarUsuario={handleSeleccionarUsuario}
                    producto={producto}
                />
            </div>
        </div>
    );
};

export default ModalEncargadosContent;