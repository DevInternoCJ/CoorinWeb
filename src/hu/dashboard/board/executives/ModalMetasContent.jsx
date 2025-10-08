import React, { useState, useEffect } from "react";
import JerarquiaConR from "./JerarquiaConR/JerarquiaConR";
import { Toaster, toast } from "sonner";
import { obetenerTablaMetas, actualizarMetas, obetenerJerarquiaEncargados } from '../../../../services/LokiServices';
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";

// Función para inyectar estilos CSS que oculten los controles de incremento
const injectHideNumberArrowsStyles = () => {
    if (typeof document !== 'undefined') {
        const style = document.createElement('style');
        style.textContent = `
            input[type=number]::-webkit-outer-spin-button,
            input[type=number]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `;
        if (!document.head.querySelector('style[data-hide-number-arrows]')) {
            style.setAttribute('data-hide-number-arrows', 'true');
            document.head.appendChild(style);
        }
    }
};

// Funciones para formateo de moneda
const formatCurrency = (value) => {
    if (!value || value === '') return '';
    
    // Remover todo excepto números y punto decimal
    const cleanValue = value.toString().replace(/[^\d.]/g, '');
    
    // Si no hay números después de limpiar, retornar vacío
    if (!cleanValue || cleanValue === '' || cleanValue === '.') return '';
    
    // Validar que no tenga más de un punto decimal
    const parts = cleanValue.split('.');
    if (parts.length > 2) return formatCurrency(parts[0] + '.' + parts[1]);
    
    let numberPart = parts[0];
    let decimalPart = parts[1];
    
    // Si la parte entera está vacía pero hay decimales, agregar 0
    if (!numberPart && decimalPart !== undefined) {
        numberPart = '0';
    }
    
    // Si no hay parte entera y no hay decimales, retornar vacío
    if (!numberPart) return '';
    
    // Limitar a 9 dígitos enteros máximo (999,999,999)
    if (numberPart && numberPart.length > 9) {
        numberPart = numberPart.substring(0, 9);
    }
    
    // Limitar a 2 decimales
    if (decimalPart && decimalPart.length > 2) {
        decimalPart = decimalPart.substring(0, 2);
    }
    
    // Formatear la parte entera con separadores de miles
    const formattedNumber = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Construir el valor final
    let result = '$' + formattedNumber;
    if (decimalPart !== undefined) {
        result += '.' + decimalPart;
    }
    
    return result;
};

// Función específica para formatear moneda en la tabla (siempre 2 decimales)
const formatCurrencyForDisplay = (value) => {
    if (!value || value === '') return '$0.00';
    
    // Convertir a número y asegurar 2 decimales
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '$0.00';
    
    // Formatear con 2 decimales y separadores de miles
    return '$' + numValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const parseCurrencyToNumber = (formattedValue) => {
    if (!formattedValue || formattedValue === '') return '';
    
    // Asegurar que sea una cadena
    const stringValue = formattedValue.toString();
    
    // Remover $ y comas, mantener solo números y punto decimal
    const cleanValue = stringValue.replace(/[$,]/g, '');
    
    return cleanValue;
};

const validateCurrencyInput = (value) => {
    // Permitir vacío
    if (value === '') return true;
    
    // Remover formato para validar
    const cleanValue = parseCurrencyToNumber(value);
    
    // Validar formato: máximo 9 enteros y 2 decimales
    const regex = /^\d{0,9}(\.\d{0,2})?$/;
    return regex.test(cleanValue) && parseFloat(cleanValue) >= 0;
};


const ModalMetasContent = () => {
    const [tablaMetas, setTablaMetas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Inyectar estilos para ocultar los controles de incremento
    React.useEffect(() => {
        injectHideNumberArrowsStyles();
    }, []);
    // Estado para la jerarquía de ejecutivos (lógica separada)
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    // Estado para checkboxes y edición de inputs
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Estado para los inputs de arriba
    const [inputValues, setInputValues] = useState({
        cuentas: '',
        titulares: '',
        negociaciones: '',
        cumplimientos: '',
        montoCumplido: '',
        saldoSolucionado: '',
        segmento: '',
        horaEntrada: '',
        horaSalida: ''
    });


    // Lógica separada para obtener la jerarquía de ejecutivos
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
            } catch (e) {
                setErrorJerarquia('Error al obtener la jerarquía de ejecutivos');
                setExecutiveTree([]);
            } finally {
                setLoadingJerarquia(false);
            }
        };
        fetchExecutiveTree();
    }, []);


    // Estado para los ejecutivos seleccionados desde la jerarquía (array)
    const [selectedExecutives, setSelectedExecutives] = useState([]); // array de idEjecutivo
    // Estado para el nodo actualmente seleccionado en la jerarquía (para iluminar solo uno)
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    const [allSubordinateIds, setAllSubordinateIds] = useState([]);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]); // ids de toda la jerarquía

    // Handler para click en ejecutivo de la jerarquía (selección inteligente)
    const handleExecutiveClick = (node) => {
        setInputValues({
            cuentas: '',
            titulares: '',
            negociaciones: '',
            cumplimientos: '',
            montoCumplido: '',
            saldoSolucionado: '',
            segmento: '',
            horaEntrada: '',
            horaSalida: ''
        });
        setSelectedRows([]);
        setError(null);
        setTablaMetas([]);
        setLoading(true);

        const userData = JSON.parse(localStorage.getItem('userData'));
        const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;

        setSelectedExecutiveNode(node.idEjecutivo); // Guardar el nodo seleccionado para iluminar

        if (node.idEjecutivo === Number(idEjecutivoSesion)) {
            if (Array.isArray(node.subordinados) && node.subordinados.length > 0) {
                const idsSubordinados = node.subordinados.map(sub => sub.idEjecutivo).filter(Boolean);
                setSelectedExecutives(idsSubordinados);
            } else {
                setSelectedExecutives([]);
            }
        } else if (Array.isArray(node.subordinados) && node.subordinados.length > 0) {
            // Si tiene subordinados, mostrar solo los subordinados de ese subordinado
            const idsSubSub = node.subordinados.map(sub => sub.idEjecutivo).filter(Boolean);
            setSelectedExecutives(idsSubSub);
        } else {
            // Si no tiene subordinados, marcar solo este nodo como seleccionado (para iluminarlo)
            setSelectedExecutives([node.idEjecutivo]);
        }
        setLoading(false);
    };


    // Renderizado recursivo de la jerarquía, cada ejecutivo es clickeable y solo uno puede estar seleccionado
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
                        }}
                        onClick={() => handleExecutiveClick(node)}
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



    // Al cargar, seleccionar por defecto el ejecutivo logueado y calcular todos los ids de la jerarquía
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
            // ids subordinados directos
            if (Array.isArray(rootNode.subordinados) && rootNode.subordinados.length > 0) {
                const idsSubordinados = rootNode.subordinados.map(sub => Number(sub.idEjecutivo)).filter(id => Number.isInteger(id) && id > 0);
                setAllSubordinateIds(idsSubordinados);
                setSelectedExecutives(idsSubordinados);
                setSelectedExecutiveNode(idEjecutivo); // Iluminar solo el nodo raíz al inicio
            } else if (idEjecutivo) {
                setAllSubordinateIds([Number(idEjecutivo)]);
                setSelectedExecutives([Number(idEjecutivo)]);
                setSelectedExecutiveNode(idEjecutivo);
            }
            // ids de toda la jerarquía (incluyendo el propio)
            const allIds = getAllHierarchyIds(rootNode)
                .map(id => Number(id))
                .filter(id => Number.isInteger(id) && id > 0);
            setAllHierarchyIds(allIds);
        } else {
            setAllHierarchyIds([]);
        }
    }, [executiveTree]);

    // Cuando cambian los ejecutivos seleccionados, buscar sus metas
    useEffect(() => {
        // Filtrar solo ids válidos (enteros > 0) y detectar los inválidos
        let validIds = [];
        let invalidIndexes = [];
        if (Array.isArray(selectedExecutives)) {
            selectedExecutives.forEach((id, idx) => {
                const numId = Number(id);
                if (Number.isInteger(numId) && numId > 0 && !isNaN(numId)) {
                    validIds.push(numId);
                } else {
                    invalidIndexes.push(idx);
                }
            });
        }
        if (validIds.some(id => isNaN(id))) {
            validIds = validIds.filter(id => Number.isInteger(id) && id > 0 && !isNaN(id));
        }
        if (invalidIndexes.length > 0 && Array.isArray(selectedExecutives)) {
            const idInvalidos = invalidIndexes.map(idx => selectedExecutives[idx]);
            console.warn('Lista de idInvalidos detectados:', idInvalidos);
            const omitidos = invalidIndexes.map(idx => {
                let usuario = selectedExecutives[idx];
                let nombre = '';
                const buscarNombre = (tree) => {
                    if (!Array.isArray(tree)) return null;
                    for (const node of tree) {
                        if (node.idEjecutivo === usuario || node.usuario === usuario) {
                            return node.nombreEjecutivo || node.nombre || '';
                        }
                        if (node.subordinados) {
                            const found = buscarNombre(node.subordinados);
                            if (found) return found;
                        }
                    }
                    return null;
                };
                nombre = buscarNombre(executiveTree) || '';
                return `${usuario}${nombre ? ' (' + nombre + ')' : ''}`;
            });
            const mensaje = `Se omitieron los siguientes usuarios por tener id inválido: ${omitidos.join(', ')}`;
            console.warn(mensaje);
            toast.warning(mensaje);
        }
        if (validIds.length > 0) {
            console.log('🟢 Ids enviados a obetenerTablaMetas:', validIds, '| Usuario seleccionado:', selectedExecutives);
        } else {
            console.log('⚠️ No se enviaron ids válidos a obetenerTablaMetas. selectedExecutives:', selectedExecutives);
        }

        // // Lógica para ocultar la info de un subordinado directo o de un subordinado de un subordinado directo ("nieto") sin subordinados, solo cuando se selecciona uno a uno
        // // Caso: solo hay un id seleccionado y ese nodo es subordinado directo o nieto directo y no tiene subordinados
        // let debeOcultar = false;
        // if (selectedExecutives.length === 1 && executiveTree.length > 0) {
        //     const userData = JSON.parse(localStorage.getItem('userData'));
        //     const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
        //     const rootNode = executiveTree.find(n => n.idEjecutivo === Number(idEjecutivoSesion));
        //     if (rootNode && Array.isArray(rootNode.subordinados)) {
        //         // 1. Buscar si el seleccionado es subordinado directo de la raíz
        //         const sub = rootNode.subordinados.find(s => s.idEjecutivo === Number(selectedExecutives[0]));
        //         if (sub && (!Array.isArray(sub.subordinados) || sub.subordinados.length === 0)) {
        //             debeOcultar = true;
        //         }
        //         // 2. Buscar si el seleccionado es subordinado de un subordinado directo (nieto)
        //         if (!debeOcultar) {
        //             for (const subDir of rootNode.subordinados) {
        //                 if (Array.isArray(subDir.subordinados)) {
        //                     const nieto = subDir.subordinados.find(n => n.idEjecutivo === Number(selectedExecutives[0]));
        //                     if (nieto && (!Array.isArray(nieto.subordinados) || nieto.subordinados.length === 0)) {
        //                         debeOcultar = true;
        //                         break;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // if (!validIds.length || debeOcultar) {
        if (!validIds.length) {
            setTablaMetas([]);
            return;
        }
        setLoading(true);
        setError(null);
        (async () => {
            try {
                const data = await obetenerTablaMetas(validIds);
                const processedData = Array.isArray(data) ? data.filter(Boolean) : [];
                setTablaMetas(processedData);
            } catch {
                setError('Error al obtener la tabla de metas');
                setTablaMetas([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [selectedExecutives, executiveTree]);

    // Manejo de selección individual
    const handleRowCheckbox = (rowKey) => {
        setSelectedRows(prev =>
            prev.includes(rowKey)
                ? prev.filter(k => k !== rowKey)
                : [...prev, rowKey]
        );
    };

    // Manejo de selección global
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            setSelectedRows(tablaMetas.map((row, i) => row.id || row.usuario || i));
            setSelectAll(true);
        }
    };

    // Sincronizar selectAll si cambia la selección manual
    useEffect(() => {
        if (tablaMetas.length > 0) {
            setSelectAll(selectedRows.length === tablaMetas.length);
        } else {
            setSelectAll(false);
        }
    }, [selectedRows, tablaMetas]);

    // Handler para el botón Guardar
    const handleGuardar = async () => {
        // Validar tipos de datos TinyInt (0-255) para Negociaciones y Cumplimientos
        const negociaciones = Number(inputValues.negociaciones) || 0;
        const cumplimientos = Number(inputValues.cumplimientos) || 0;
        
        if (negociaciones < 0 || negociaciones > 255) {
            toast.warning('Las negociaciones deben estar entre 0 y 255');
            return;
        }
        
        if (cumplimientos < 0 || cumplimientos > 255) {
            toast.warning('Los cumplimientos deben estar entre 0 y 255');
            return;
        }
        
        // Validar relación: Los cumplimientos deben ser menor o igual a las negociaciones
        if (cumplimientos > 0 && negociaciones > 0 && cumplimientos > negociaciones) {
            toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
            return;
        }
        
        // Validar regla de negocio: Monto Cumplido debe ser menor al Saldo Solucionado
        const montoCumplido = Number(parseCurrencyToNumber(inputValues.montoCumplido)) || 0;
        const saldoSolucionado = Number(parseCurrencyToNumber(inputValues.saldoSolucionado)) || 0;
        
        if (montoCumplido > 0 && saldoSolucionado > 0 && montoCumplido >= saldoSolucionado) {
            toast.error('El monto cumplido debe ser menor al saldo solucionado');
            return;
        }

        // Alta de metas para todos los ejecutivos seleccionados (inputs de arriba)
        if (selectedExecutives.length > 0 && selectedRows.length === 0) {
            try {
                for (const idEjecutivo of selectedExecutives) {
                    let nuevoValor = 1;
                    if (inputValues.nuevo !== undefined) {
                        if (inputValues.nuevo === true || inputValues.nuevo === 1 || inputValues.nuevo === '1' || inputValues.nuevo === 'true') {
                            nuevoValor = 1;
                        } else {
                            nuevoValor = 0;
                        }
                    }
                    const payload = {
                        idEjecutivo,
                        cuentas: Number(inputValues.cuentas) || 0,
                        titulares: Number(inputValues.titulares) || 0,
                        negociaciones: Number(inputValues.negociaciones) || 0,
                        cumplimientos: Number(inputValues.cumplimientos) || 0,
                        montoCumplido,
                        saldoSolucionado,
                        segmento: inputValues.segmento || null,
                        horaEntrada: inputValues.horaEntrada || '',
                        horaSalida: inputValues.horaSalida || '',
                        nuevo: nuevoValor
                    };
                    await actualizarMetas(payload);
                }
                toast.success('¡Metas guardadas correctamente!');
                setInputValues({
                    cuentas: '', titulares: '', negociaciones: '', cumplimientos: '', montoCumplido: '', saldoSolucionado: '', segmento: '', horaEntrada: '', horaSalida: ''
                });
                // Refrescar la tabla
                try {
                    const dataArr = await Promise.all(selectedExecutives.map(id => obetenerTablaMetas(id)));
                    setTablaMetas(dataArr.flat().filter(Boolean));
                } catch {
                    toast.error('Error al refrescar la tabla de metas');
                    setTablaMetas([]);
                }
            } catch (e) {
                toast.error('Error al guardar metas: ' + (e?.message || e));
            }
            return;
        }
        // Edición múltiple de filas seleccionadas en la tabla
        if (selectedRows.length === 0) return;
        
        // Validar nuevamente para el caso de actualización de filas
        if (negociaciones < 0 || negociaciones > 255) {
            toast.warning('Las negociaciones deben estar entre 0 y 255');
            return;
        }
        
        if (cumplimientos < 0 || cumplimientos > 255) {
            toast.warning('Los cumplimientos deben estar entre 0 y 255');
            return;
        }
        
        // Validar relación: Los cumplimientos deben ser menor o igual a las negociaciones
        if (cumplimientos > 0 && negociaciones > 0 && cumplimientos > negociaciones) {
            toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
            return;
        }
        
        if (montoCumplido > 0 && saldoSolucionado > 0 && montoCumplido >= saldoSolucionado) {
            toast.warning('El monto cumplido debe ser menor al saldo solucionado');
            return;
        }
        
        try {
            for (const rowKey of selectedRows) {
                const row = tablaMetas.find((r, i) => (r.id || r.usuario || i) === rowKey);
                if (!row) continue;
                let nuevoValor = 0;
                if (row.nuevo !== undefined) {
                    if (row.nuevo === true || row.nuevo === 1 || row.nuevo === '1' || row.nuevo === 'true') {
                        nuevoValor = 1;
                    } else {
                        nuevoValor = 0;
                    }
                }
                // Usar valores de los inputs principales para actualizar la fila seleccionada
                const payload = {
                    idEjecutivo: row.idEjecutivo || row.id || row.usuario || rowKey,
                    cuentas: Number(inputValues.cuentas) || 0,
                    titulares: Number(inputValues.titulares) || 0,
                    negociaciones: Number(inputValues.negociaciones) || 0,
                    cumplimientos: Number(inputValues.cumplimientos) || 0,
                    montoCumplido: Number(parseCurrencyToNumber(inputValues.montoCumplido)) || 0,
                    saldoSolucionado: Number(parseCurrencyToNumber(inputValues.saldoSolucionado)) || 0,
                    segmento: inputValues.segmento || null,
                    horaEntrada: inputValues.horaEntrada || '',
                    horaSalida: inputValues.horaSalida || '',
                    nuevo: nuevoValor
                };
                await actualizarMetas(payload);
            }
            toast.success('¡Metas guardadas correctamente!');
            // Refrescar la tabla
            try {
                const dataArr = await Promise.all(selectedExecutives.map(id => obetenerTablaMetas(id)));
                setTablaMetas(dataArr.flat().filter(Boolean));
            } catch {
                toast.error('Error al refrescar la tabla de metas');
                setTablaMetas([]);
            }
        } catch (e) {
            toast.error('Error al guardar metas: ' + (e?.message || e));
        }
    };

    return (
        <div className="flex gap-4 h-full" style={{ maxHeight: '60vh', overflow: 'hidden' }}>
            {/* Columna izquierda: Logo + Jerarquía en una sola columna */}
            <div style={{ width: '18rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0 0.5rem 0' }}>
                    <img src={ConsorcioLogo} alt="Consorcio Jurídico" style={{ width: 70, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px #bdbdbd)' }} />
                </div>
                {/* Jerarquía */}
                <JerarquiaConR
                    executiveTree={executiveTree}
                    loadingJerarquia={loadingJerarquia}
                    errorJerarquia={errorJerarquia}
                    selectedExecutiveNode={selectedExecutiveNode}
                    allHierarchyIds={allHierarchyIds}
                    setSelectedExecutives={setSelectedExecutives}
                    setSelectedRows={setSelectedRows}
                    setSelectedExecutiveNode={setSelectedExecutiveNode}
                    renderExecutiveTree={renderExecutiveTree}
                />
            </div>

            {/* Columna derecha - Inputs y Tabla principal */}
            <div className="flex-1 flex flex-col gap-3" style={{ minWidth: 0 }}>
                {/* Fila de inputs */}
                <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)]" style={{overflowX: 'auto'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', minWidth: 900 }}>
                        {/* Cuentas */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 70 }}>
                            <label>Cuentas</label>
                            <input
                                type="number"
                                min="0"
                                maxLength="10"
                                value={inputValues.cuentas}
                                onChange={e => {
                                    const value = e.target.value;
                                    if (value === '' || (/^\d+$/.test(value) && parseFloat(value) >= 0 && value.length <= 10)) {
                                        setInputValues(v => ({ ...v, cuentas: value }));
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                        e.preventDefault();
                                    }
                                }}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    appearance: "textfield",
                                    MozAppearance: "textfield"
                                }}
                            />
                        </div>

                        {/* Titulares */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 70 }}>
                            <label>Titulares</label>
                            <input
                                type="number"
                                min="0"
                                maxLength="10"
                                value={inputValues.titulares}
                                onChange={e => {
                                    const value = e.target.value;
                                    if (value === '' || (/^\d+$/.test(value) && parseFloat(value) >= 0 && value.length <= 10)) {
                                        setInputValues(v => ({ ...v, titulares: value }));
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                        e.preventDefault();
                                    }
                                }}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    appearance: "textfield",
                                    MozAppearance: "textfield"
                                }}
                            />
                        </div>

                        {/* Negociaciones */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                            <label>Negcianes</label>
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={inputValues.negociaciones}
                                onChange={e => {
                                    const value = e.target.value;
                                    const numValue = parseInt(value);
                                    if (value === '' || (/^\d+$/.test(value) && numValue >= 0 && numValue <= 255)) {
                                        setInputValues(v => ({ ...v, negociaciones: value }));
                                        
                                        // Validar relación con cumplimientos
                                        const cumplimientos = Number(inputValues.cumplimientos) || 0;
                                        if (numValue > 0 && cumplimientos > 0 && cumplimientos > numValue) {
                                            toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
                                        }
                                    } else if (numValue > 255) {
                                        toast.warning('Las negociaciones deben estar entre 0 y 255');
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                        e.preventDefault();
                                    }
                                }}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    appearance: "textfield",
                                    MozAppearance: "textfield"
                                }}
                            />
                        </div>

                        {/* Cumplimientos */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                            <label>Cmplmtos</label>
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={inputValues.cumplimientos}
                                onChange={e => {
                                    const value = e.target.value;
                                    const numValue = parseInt(value);
                                    if (value === '' || (/^\d+$/.test(value) && numValue >= 0 && numValue <= 255)) {
                                        setInputValues(v => ({ ...v, cumplimientos: value }));
                                        
                                        // Validar relación con negociaciones
                                        const negociaciones = Number(inputValues.negociaciones) || 0;
                                        if (numValue > 0 && negociaciones > 0 && numValue > negociaciones) {
                                            toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
                                        }
                                    } else if (numValue > 255) {
                                        toast.warning('Los cumplimientos deben estar entre 0 y 255');
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                        e.preventDefault();
                                    }
                                }}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    appearance: "textfield",
                                    MozAppearance: "textfield"
                                }}
                            />
                        </div>

                        {/* Monto Cumplido */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                            <label>M. Cumplido</label>
                            <input
                                type="text"
                                value={inputValues.montoCumplido}
                                onChange={e => {
                                    const inputValue = e.target.value;
                                    
                                    // Si está vacío o solo contiene $ , limpiar completamente
                                    if (inputValue === '' || inputValue === '$') {
                                        setInputValues(v => ({ ...v, montoCumplido: '' }));
                                        return;
                                    }
                                    
                                    // Validar entrada
                                    if (validateCurrencyInput(inputValue)) {
                                        // Formatear automáticamente
                                        const formatted = formatCurrency(inputValue);
                                        setInputValues(v => ({ ...v, montoCumplido: formatted }));
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder="$0.00"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Saldo Solucionado */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                            <label>S. Solucionado</label>
                            <input
                                type="text"
                                value={inputValues.saldoSolucionado}
                                onChange={e => {
                                    const inputValue = e.target.value;
                                    
                                    // Si está vacío o solo contiene $ , limpiar completamente
                                    if (inputValue === '' || inputValue === '$') {
                                        setInputValues(v => ({ ...v, saldoSolucionado: '' }));
                                        return;
                                    }
                                    
                                    // Validar entrada
                                    if (validateCurrencyInput(inputValue)) {
                                        // Formatear automáticamente
                                        const formatted = formatCurrency(inputValue);
                                        setInputValues(v => ({ ...v, saldoSolucionado: formatted }));
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder="$0.00"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Segmento */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                            <label>Segmento</label>
                            <input
                                type="text"
                                value={inputValues.segmento}
                                onChange={e => setInputValues(v => ({ ...v, segmento: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Hora Entrada */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110, position: 'relative' }}>
                            <label>H. Entrada</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type="time"
                                    value={inputValues.horaEntrada === null ? '' : inputValues.horaEntrada}
                                    onChange={e => setInputValues(v => ({ ...v, horaEntrada: e.target.value === '' ? null : e.target.value }))}
                                    style={{
                                        backgroundColor: "var(--color-bgcolor2)",
                                        color: "#111",
                                        border: "1px solid var(--color-jerarquia1)",
                                        borderRadius: "0.25rem",
                                        padding: "0.25rem 2.2rem 0.25rem 0.5rem",
                                        fontSize: "0.75rem",
                                        fontWeight: "400",
                                        width: '100%'
                                    }}
                                />
                                <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Hora Salida */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110, position: 'relative' }}>
                            <label>H. Salida</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type="time"
                                    value={inputValues.horaSalida === null ? '' : inputValues.horaSalida}
                                    onChange={e => setInputValues(v => ({ ...v, horaSalida: e.target.value === '' ? null : e.target.value }))}
                                    style={{
                                        backgroundColor: "var(--color-bgcolor2)",
                                        color: "#111",
                                        border: "1px solid var(--color-jerarquia1)",
                                        borderRadius: "0.25rem",
                                        padding: "0.25rem 2.2rem 0.25rem 0.5rem",
                                        fontSize: "0.75rem",
                                        fontWeight: "400",
                                        width: '100%'
                                    }}
                                />
                                <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla principal */}
                <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex-1 flex flex-col" style={{ minWidth: 0, minHeight: 0 }}>
                    {/* Tabla con scroll */}
                    <div style={{ maxHeight: "40vh", overflow: "auto", marginBottom: "1rem" }} className="scrollbar-gray">
                        <table className="modal-table">
                            <thead>
                                <tr>
                                    <th>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: 6 }}
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                            Cambiar
                                        </span>
                                    </th>
                                    <th>Ejecutivo</th>
                                    <th>Usuario</th>
                                    <th>Cuentas</th>
                                    <th>Titulares</th>
                                    <th>Negociaciones</th>
                                    <th>Cumplimientos</th>
                                    <th>Monto Cumplido</th>
                                    <th>Saldo Solucionado</th>
                                    <th>Segmento</th>
                                    <th>Hora Entrada</th>
                                    <th>Hora Salida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={12} style={{ textAlign: 'center', height: 120 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                                                <div className="spinner-sonner" style={{ marginBottom: 12 }}>
                                                    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#111">
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
                                                <span style={{ color: '#2b463c', fontWeight: 500, fontSize: 16 }}>Cargando...</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {error && !loading && (
                                    <tr>
                                        <td colSpan={12} style={{ textAlign: 'center', color: '#b71c1c', fontWeight: 500 }}>
                                            {error}
                                        </td>
                                    </tr>
                                )}
                                {!loading && !error && tablaMetas.length === 0 && (
                                    <tr><td colSpan={12} style={{ textAlign: 'center' }}>Sin datos</td></tr>
                                )}
                                {!loading && !error && tablaMetas
                                    // Excluir el propio idEjecutivo de la sesión
                                    .filter(row => {
                                        const userData = JSON.parse(localStorage.getItem('userData'));
                                        const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                                        return row.idEjecutivo !== Number(idEjecutivoSesion);
                                    })
                                    .map((row, i) => {
                                        const rowKey = row.id || row.usuario || i;
                                        // Normalizar valores para que siempre se pinte algo aunque vengan null/undefined
                                        const safe = (val, def = '') => val !== null && val !== undefined ? val : def;
                                        return (
                                            <tr 
                                                key={rowKey} 
                                                className={selectedRows.includes(rowKey) ? 'row-selected' : ''} 
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleRowCheckbox(rowKey)}
                                            >
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(rowKey)}
                                                        onChange={() => handleRowCheckbox(rowKey)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </td>
                                                <td style={{ minWidth: 180, maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}>
                                                    {safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}
                                                </td>
                                                <td>{safe(row.usuario) || safe(row.usuarioEjecutivo) || safe(row.clave)}</td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {safe(row.cuentas, safe(row.totalCuentas, 0))}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {safe(row.titulares, safe(row.totalTitulares, 0))}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {safe(row.negociaciones, safe(row.totalNegociaciones, 0))}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {safe(row.cumplimientos, safe(row.totalCumplimientos, 0))}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {(() => {
                                                            const originalValue = safe(row.montoCumplido, safe(row.monto_cumplido, 0));
                                                            return formatCurrencyForDisplay(originalValue);
                                                        })()}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {(() => {
                                                            const originalValue = safe(row.saldoSolucionado, safe(row.saldo_solucionado, 0));
                                                            return formatCurrencyForDisplay(originalValue);
                                                        })()}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {safe(row.segmento, safe(row.nombreSegmento, '-'))}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {safe(row.horaEntrada, safe(row.hora_entrada, '-'))}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                                    <span>
                                                        {safe(row.horaSalida, safe(row.hora_salida, '-'))}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {/* El botón Guardar ahora está fuera de la tabla */}
                    </div>
                    {/* Botón Guardar dentro del contenedor de la tabla pero fuera del scroll */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
                        {(() => {
                            const montoCumplido = Number(parseCurrencyToNumber(inputValues.montoCumplido)) || 0;
                            const saldoSolucionado = Number(parseCurrencyToNumber(inputValues.saldoSolucionado)) || 0;
                            const negociaciones = Number(inputValues.negociaciones) || 0;
                            const cumplimientos = Number(inputValues.cumplimientos) || 0;
                            
                            const hasMoneyValidationError = montoCumplido > 0 && saldoSolucionado > 0 && montoCumplido >= saldoSolucionado;
                            const hasTinyIntValidationError = negociaciones > 255 || cumplimientos > 255;
                            const hasRelationValidationError = cumplimientos > 0 && negociaciones > 0 && cumplimientos > negociaciones;
                            const hasValidationError = hasMoneyValidationError || hasTinyIntValidationError || hasRelationValidationError;
                            const isDisabled = selectedRows.length === 0 || hasValidationError;

                            let tooltipText = '';
                            if (hasMoneyValidationError) {
                                tooltipText = 'El monto cumplido debe ser menor al saldo solucionado';
                            } else if (hasTinyIntValidationError) {
                                tooltipText = 'Negociaciones y cumplimientos deben estar entre 0 y 255';
                            } else if (hasRelationValidationError) {
                                tooltipText = 'Los cumplimientos deben ser menor o igual a las negociaciones';
                            }

                            return (
                                <button
                                    className="modal-btn"
                                    style={{ 
                                        background: isDisabled ? '#9ca3af' : '#2b463c', 
                                        color: '#fff', 
                                        minWidth: 140, 
                                        height: 40, 
                                        fontWeight: 600, 
                                        fontSize: 16, 
                                        borderRadius: 6, 
                                        opacity: isDisabled ? 0.5 : 1, 
                                        cursor: isDisabled ? 'not-allowed' : 'pointer', 
                                        boxShadow: '0 2px 8px #bdbdbb33' 
                                    }}
                                    onClick={handleGuardar}
                                    disabled={isDisabled}
                                    title={tooltipText}
                                >
                                    Guardar
                                </button>
                            );
                        })()}
                    </div>
                </div>
            </div>

            {/* Scrollbar personalizado ahora solo con la clase global 'scrollbar-gray' */}
        <Toaster position="top-center" richColors />
        </div>
    );
};

export default ModalMetasContent;