import React, { useState, useEffect, useMemo } from "react";
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";
import { obetenerJerarquiaEncargados, ValidatorsNormal } from '../../../../services/LokiServices';

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
    // Estados principales (idéntico a ModalCampanasEjecutivos)
    const [executiveTree, setExecutiveTree] = useState([]);
    const [usuariosValidadores, setUsuariosValidadores] = useState([]);
    // Otros estados propios del modal
    const [producto, setProducto] = useState(""); // Iniciamos vacío para obligar selección
    const [arrepentimientos, setArrepentimientos] = useState(false);
    const [validadoresFromAPI, setValidadoresFromAPI] = useState([]);
    const [isLoadingValidadores, setIsLoadingValidadores] = useState(false);

    // Función para obtener idCartera desde localStorage
    const getIdCartera = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData?.idCartera || userData?.idcartera || userData?.cartera || 1; // fallback a 1 si no existe
    };

    // Función para obtener validadores del API
    const fetchValidadores = async (idProducto) => {
        if (!idProducto) return;
        
        setIsLoadingValidadores(true);
        try {
            console.log(`🔍 Obteniendo validadores para producto: ${idProducto}`);
            
            const response = await ValidatorsNormal(idProducto);
            
            const validadores = response?.data || [];
            console.log('📋 Validadores obtenidos del API:', validadores);
            setValidadoresFromAPI(validadores);
            
            return validadores;
        } catch (error) {
            console.error('❌ Error al obtener validadores:', error);
            setValidadoresFromAPI([]);
            return [];
        } finally {
            setIsLoadingValidadores(false);
        }
    };

    // Cargar ejecutivos (idéntico a ModalCampanasEjecutivos)
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
                
                console.log('📊 Ejecutivos cargados para validadores:', mapped.length);
                console.log('🔍 Estructura de datos:', mapped.slice(0, 2)); // Mostrar primeros 2 para debug
                setExecutiveTree(mapped);
            } catch (error) {
                console.error('Error al cargar ejecutivos para validadores:', error);
                setExecutiveTree([]);
            }
        };
        fetchExecutives();
    }, []);

    // Filtrar ejecutivos: Replicar comportamiento exacto de ModalCampanasEjecutivos
    const usuariosFiltrados = useMemo(() => {
        if (!executiveTree.length) return [];
        
        console.log('🔍 Aplicando filtro para validadores - Solo primeros 13 ejecutivos + subordinados...');
        console.log('📊 Total ejecutivos del endpoint:', executiveTree.length);
        
        const usuariosValidadores = [];
        
        // Tomar solo los primeros 13 ejecutivos principales
        const ejecutivosPrincipales = executiveTree.slice(0, 13);
        
        ejecutivosPrincipales.forEach(ejecutivo => {
            // Agregar el ejecutivo principal
            usuariosValidadores.push({
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
                    usuariosValidadores.push({
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
        
        console.log('✅ Usuarios filtrados para validadores:', usuariosValidadores.length);
        return usuariosValidadores;
    }, [executiveTree]);

    // Actualizar usuariosValidadores cuando cambie usuariosFiltrados
    useEffect(() => {
        setUsuariosValidadores(usuariosFiltrados);
    }, [usuariosFiltrados]);

    // Efecto para obtener validadores cuando cambie el producto o arrepentimientos
    useEffect(() => {
        const getIdProducto = () => {
            switch(producto) {
                case "Amex":
                    return 1;
                default:
                    return null;
            }
        };

        const idProducto = getIdProducto();
        if (idProducto && producto) {
            fetchValidadores(idProducto);
        } else {
            // Si no hay producto seleccionado, limpiar validadores
            setValidadoresFromAPI([]);
        }
    }, [producto, arrepentimientos]);

    // Efecto para actualizar checkboxes cuando cambien los validadores del API o la jerarquía
    useEffect(() => {
        if (validadoresFromAPI.length > 0 && usuariosValidadores.length > 0) {
            console.log('🔄 Actualizando checkboxes basados en validadores del API...');
            
            // Crear un Set con los idEjecutivo de los validadores para búsqueda rápida
            const validadoresIds = new Set(validadoresFromAPI.map(v => v.idEjecutivo));
            
            setUsuariosValidadores(prev => {
                const updated = prev.map(usuario => ({
                    ...usuario,
                    seleccionado: validadoresIds.has(usuario.idEjecutivo)
                }));
                
                const selectedCount = updated.filter(u => u.seleccionado).length;
                console.log(`✅ ${selectedCount} ejecutivos marcados automáticamente`);
                
                return updated;
            });
        }
    }, [validadoresFromAPI, usuariosValidadores.length]);

    // Handler para seleccionar/deseleccionar usuarios
    const handleSeleccionarUsuario = (usuario, index) => {
        setUsuariosValidadores(prev => {
            const updated = prev.map((u, i) => 
                i === index ? { ...u, seleccionado: !u.seleccionado } : u
            );
            
            // Log para debug
            const selectedUsers = updated.filter(u => u.seleccionado).map(u => u.displayName);
            console.log('🔘 Usuarios seleccionados para validadores:', selectedUsers);
            
            return updated;
        });
    };

    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: "1rem"
        }}>
            {/* Columna izquierda - Tabla de usuarios validadores (estilo original) */}
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
                        Validadores - {usuariosValidadores.length}
                        {isLoadingValidadores && (
                            <span style={{ marginLeft: "0.5rem", color: "var(--color-jerarquia2)", fontSize: "0.8rem" }}>
                                (Cargando...)
                            </span>
                        )}
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
                            {usuariosValidadores.length === 0 ? (
                                <div style={{ 
                                    textAlign: 'center', 
                                    padding: '1rem',
                                    color: '#666',
                                    fontStyle: 'italic'
                                }}>
                                    {!producto ? 'Selecciona un producto para ver los validadores' : 'No hay usuarios disponibles'}
                                </div>
                            ) : (
                                usuariosValidadores.map((row, i) => (
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
                                            minWidth: '100%',
                                            opacity: !producto ? 0.5 : 1,
                                            pointerEvents: !producto ? 'none' : 'auto'
                                        }}
                                        onClick={() => producto && handleSeleccionarUsuario(row.usuario, i)}
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
                                            disabled={!producto}
                                            className="modal-checkbox-small"
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                if (producto) {
                                                    handleSeleccionarUsuario(row.usuario, i);
                                                }
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
                    <div
                        className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1"
                        style={{ 
                            fontSize: "14px", 
                            width: "100%",
                            cursor: "default",
                            userSelect: "none",
                            pointerEvents: "none"
                        }}
                    >
                        {getIdCartera()}     American Express
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
                            onChange={(e) => setProducto(e.target.value)}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ 
                                fontSize: "14px", 
                                width: "100%", 
                                cursor: "pointer",
                                color: producto === "" ? "#999" : "var(--color-jerarquia4)"
                            }}
                        >
                            <option value="" disabled style={{ color: "#999" }}>
                                Selecciona un producto...
                            </option>
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
                    justifyContent: "center",
                    opacity: !producto ? 0.5 : 1
                }}>
                    <input
                        type="checkbox"
                        id="arrepentimientos"
                        checked={arrepentimientos}
                        disabled={!producto}
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
                            cursor: !producto ? "not-allowed" : "pointer",
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
                /* Estilos para la tabla de usuarios validadores */
                .modal-table {
                    width: 100%;
                    font-size: 0.75rem;
                    border-collapse: collapse;
                }
                .modal-table-th {
                    border: 1px solid #ddd;
                    text-align: center;
                    position: sticky;
                    top: 0;
                    z-index: 1;
                }
                .modal-table-td {
                    border: 1px solid #ddd;
                    border-top: none;
                }
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

export default ModalValidadoresContent;