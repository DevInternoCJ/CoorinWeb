import React, { useState, useEffect, useCallback, useMemo } from "react";
import { obetenerJerarquiaEncargados, obetenerDropdownsEncargados, getCarteras, getCarterasProductos, AsignaEncargados } from '../../../../services/LokiServices';
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
                // Mapeo: estructura completa según el endpoint
                const mapped = Array.isArray(data) ? data.map(e => ({
                    usuario: e.usuario || e.Usuario || '',
                    nombreEjecutivo: e.nombreEjecutivo || '',
                    subordinados: Array.isArray(e.subordinados) ? e.subordinados : [],
                    idEjecutivo: e.idEjecutivo || e.idejecutivo || e.id || '',
                    idEncargado: e.idEncargado || null,
                    seleccionado: false // Añadimos campo para manejar selección
                })) : [];
                
                setExecutiveTree(mapped);
            } catch (error) {
                toast.error('Error al cargar ejecutivos para encargados:', error);
                setExecutiveTree([]);
            }
        };
        fetchExecutives();
    }, []);

    // Filtrar ejecutivos: Mostrar toda la jerarquía para encargados
    const usuariosFiltrados = useMemo(() => {
        if (!executiveTree.length) return [];
        
        const usuariosEncargados = [];
        
        // Tomar TODOS los ejecutivos principales (sin límite)
        const ejecutivosPrincipales = executiveTree;
        
        ejecutivosPrincipales.forEach(ejecutivo => {
            // Agregar el ejecutivo principal
            usuariosEncargados.push({
                ...ejecutivo,
                usuario: ejecutivo.usuario || ejecutivo.Usuario || '',
                nombreEjecutivo: ejecutivo.nombreEjecutivo || '',
                displayName: `${ejecutivo.usuario || ejecutivo.Usuario || ''} - ${ejecutivo.nombreEjecutivo || ''}`,
                nivelJerarquia: 1,
                esSubordinado: false,
                seleccionado: false
            });
            
            // Agregar sus subordinados si los tiene
            if (Array.isArray(ejecutivo.subordinados) && ejecutivo.subordinados.length > 0) {
                ejecutivo.subordinados.forEach(subordinado => {
                    usuariosEncargados.push({
                        usuario: subordinado.usuario || subordinado.Usuario || '',
                        nombreEjecutivo: subordinado.nombreEjecutivo || '',
                        displayName: `${subordinado.usuario || subordinado.Usuario || ''} - ${subordinado.nombreEjecutivo || ''}`,
                        idEjecutivo: subordinado.idEjecutivo || subordinado.idejecutivo || subordinado.id || '',
                        idEncargado: subordinado.idEncargado || ejecutivo.idEjecutivo,
                        nivelJerarquia: 2,
                        esSubordinado: true,
                        encargadoPadre: ejecutivo.usuario,
                        seleccionado: false
                    });
                });
            }
        });
        
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
                const mapped = Array.isArray(jerarquiaData) ? jerarquiaData.map(e => ({
                    usuario: e.usuario || e.Usuario || '',
                    nombreEjecutivo: e.nombreEjecutivo || '',
                    subordinados: Array.isArray(e.subordinados) ? e.subordinados : [],
                    idEjecutivo: e.idEjecutivo || e.idejecutivo || e.id || '',
                    idEncargado: e.idEncargado || null,
                    seleccionado: false
                })) : [];
                setExecutiveTree(mapped);
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

            // Validar que hay un encargado seleccionado
            if (!selectedEncargado || selectedEncargado === "VACIO" || selectedEncargado === "Null") {
                toast.warning("Selecciona un encargado válido.");
                return;
            }

            // Obtener IDs de cartera y producto
            const idCartera = carterasProductosData.find(item => item.cartera === cartera)?.idCartera;
            const idProducto = producto === "-Sin Producto-" ? 
                null : 
                carterasProductosData.find(item => item.producto === producto)?.idProducto;

            if (!idCartera) {
                toast.error("No se pudo obtener el ID de la cartera seleccionada.");
                return;
            }

            setIsChangingAssignment(true);

            // Crear el cuerpo de la petición - array de objetos CambiaEncargadoDto
            const requestBody = usuariosSeleccionados.map(usuario => ({
                idEncargado: parseInt(selectedEncargado),
                idEjecutivo: parseInt(usuario.idEjecutivo),
                idCartera: parseInt(idCartera),
                idProducto: idProducto ? parseInt(idProducto) : null
            }));

            console.log('📤 Enviando asignación de encargados:', requestBody);
            console.log('👥 Usuarios seleccionados:', usuariosSeleccionados.map(u => u.displayName));
            console.log('📊 Array de asignaciones:', `${requestBody.length} asignación(es) a procesar`);
            
            try {
                await AsignaEncargados(requestBody);
                
                // Si llegamos aquí, la asignación fue exitosa
                const encargadoSeleccionadoNombre = encargadosFiltrados.find(e => e.idEjecutivo.toString() === selectedEncargado.toString())?.nombreEjecutivo || "Encargado";
                
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
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: "1rem"
        }}>
            {/* Columna izquierda - Tabla de usuarios encargados (estilo de ModalValidadoresContent) */}
            <div style={{
                width: "300px",
                display: "flex",
                flexDirection: "column"
            }}>
                <div style={{ 
                    display: "flex", 
                    flexDirection: "column",
                    backgroundColor: "white",
                    border: "1px solid var(--color-jerarquia1)",
                    borderRadius: "8px",
                    padding: "1rem",
                    height: "100%"
                }}>
                    <label className="modal-span-1" style={{ color: "var(--color-jerarquia3)" }}>
                        Encargados ({contadorEncargados.asignados} / {contadorEncargados.total})
                    </label>
                    <div style={{
                        border: "1px solid var(--color-jerarquia1)",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        flex: 1,
                        overflow: "hidden"
                    }}>
                        <div
                            style={{
                                overflowY: "auto",
                                height: "100%",
                                width: "100%",
                                padding: "0.5rem"
                            }}
                            className="scrollbar-gray"
                        >
                            {usuariosEncargados.length === 0 ? (
                                <div style={{ 
                                    textAlign: 'center', 
                                    padding: '1rem',
                                    color: '#666',
                                    fontStyle: 'italic'
                                }}>
                                    Cargando jerarquía de encargados...
                                </div>
                            ) : (
                                usuariosEncargados.map((row, i) => (
                                    <div 
                                        key={i}
                                        className="executive-hierarchy-item"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            paddingLeft: '2px',
                                            marginBottom: '0.25rem',
                                            width: 'fit-content',
                                            minWidth: '100%'
                                        }}
                                        onClick={() => handleSeleccionarUsuario(row.usuario, i)}
                                    >
                                        {row.esSubordinado && (
                                            <span style={{ 
                                                color: '#666',
                                                fontSize: '0.8rem',
                                                marginRight: '0.25rem'
                                            }}>
                                                └─
                                            </span>
                                        )}
                                        <input
                                            type="checkbox"
                                            checked={row.seleccionado || false}
                                            className="modal-checkbox-small"
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleSeleccionarUsuario(row.usuario, i);
                                            }}
                                        />
                                        <span style={{ 
                                            color: '#000',
                                            fontSize: row.esSubordinado ? '0.8rem' : '0.85rem',
                                            fontWeight: row.esSubordinado ? 'normal' : '500',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {row.displayName}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
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
                                        {selectedEncargado ? null : <option value="">Seleccionar...</option>}
                                        {encargadosFiltrados.map(item => (
                                            <option key={item.idEjecutivo} value={item.idEjecutivo}>
                                                {item.nombreEjecutivo}
                                            </option>
                                        ))}
                                    </>
                                ) : (
                                    <option value="Null"></option>
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
                        onClick={handleCambiarAsignacion}
                        disabled={isChangingAssignment || loading}
                        style={{
                            backgroundColor: isChangingAssignment || loading ? "#ccc" : "var(--color-jerarquia2)",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            cursor: isChangingAssignment || loading ? "not-allowed" : "pointer",
                            width: "100%",
                            transition: "background-color 0.2s",
                            opacity: isChangingAssignment || loading ? 0.7 : 1
                        }}
                        onMouseOver={(e) => {
                            if (!isChangingAssignment && !loading) {
                                e.target.style.backgroundColor = "var(--color-jerarquia3)";
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isChangingAssignment && !loading) {
                                e.target.style.backgroundColor = "var(--color-jerarquia2)";
                            }
                        }}
                    >
                        {isChangingAssignment ? "Procesando..." : "Cambiar"}
                    </button>
                </div>
            </div>

            <style>{`
                /* Estilos para el scrollbar del panel de jerarquía */
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
                /* Estilos para la tabla de usuarios encargados */
                .modal-checkbox-small {
                    cursor: pointer;
                }
                .scrollbar-gray::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .scrollbar-gray::-webkit-scrollbar-track {
                    background: #f5f5f5;
                    border-radius: 4px;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </div>
    );
};

export default ModalEncargadosContent;