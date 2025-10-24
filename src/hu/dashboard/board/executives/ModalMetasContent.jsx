import React, { useState, useEffect } from "react";
// import { Input, Label } from 'preline'
import JerarquiaConR from "./JerarquiaConR/JerarquiaConR";
import { Toaster, toast } from "sonner";
import InputNumber from '../../../../components/InputNumber/InputNumber.jsx';
import { obetenerTablaMetas, actualizarMetas, obetenerJerarquiaEncargados } from "../../../../services/mark/albaz/LokiServices";
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
    // Estado para la jerarquía de ejecutivos (solo datos, render y estilos centralizados en JerarquiaConR)
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
    // Estado para errores de validación por campo
    const [inputErrors, setInputErrors] = useState({});

    // Validadores por campo: muestran toasts (sonner) y devuelven true si hay error
    const validateField = (field, value) => {
        switch (field) {
            case 'cuentas': {
                if (value === '' || value === null) {
                    toast.warning('El campo Cuentas es requerido');
                    return true;
                }
                if (!/^\d+$/.test(String(value))) {
                    toast.warning('Cuentas: debe ser un número entero');
                    return true;
                }
                return false;
            }
            case 'titulares': {
                if (value === '' || value === null) {
                    toast.warning('El campo Titulares es requerido');
                    return true;
                }
                if (!/^\d+$/.test(String(value))) {
                    toast.warning('Titulares: debe ser un número entero');
                    return true;
                }
                return false;
            }
            case 'negociaciones': {
                if (value === '' || value === null) {
                    toast.warning('El campo Negociaciones es requerido');
                    return true;
                }
                const n = Number(value);
                if (!Number.isInteger(n) || n < 0 || n > 255) {
                    toast.warning('Negociaciones: debe estar entre 0 y 255');
                    return true;
                }
                return false;
            }
            case 'cumplimientos': {
                if (value === '' || value === null) {
                    toast.warning('El campo Cumplimientos es requerido');
                    return true;
                }
                const n = Number(value);
                if (!Number.isInteger(n) || n < 0 || n > 255) {
                    toast.warning('Cumplimientos: debe estar entre 0 y 255');
                    return true;
                }
                const neg = Number(inputValues.negociaciones) || 0;
                if (n > 0 && neg > 0 && n > neg) {
                    toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
                    return true;
                }
                return false;
            }
            case 'montoCumplido': {
                if (value === '' || value === null) {
                    toast.warning('El campo Monto Cumplido es requerido');
                    return true;
                }
                if (!validateCurrencyInput(value)) {
                    toast.warning('Formato de moneda inválido en Monto Cumplido');
                    return true;
                }
                return false;
            }
            case 'saldoSolucionado': {
                // Ahora saldoSolucionado es opcional (puede ser null/''), solo validar si viene valor
                if (!value || value === '') {
                    return false; // no es error
                }
                if (!validateCurrencyInput(value)) {
                    toast.warning('Formato de moneda inválido en Saldo Solucionado');
                    return 'Formato de moneda inválido en Saldo Solucionado';
                }
                const monto = Number(parseCurrencyToNumber(inputValues.montoCumplido)) || 0;
                const saldo = Number(parseCurrencyToNumber(value)) || 0;
                if (monto > 0 && saldo > 0 && monto >= saldo) {
                    toast.warning('El monto cumplido debe ser menor al saldo solucionado');
                    return 
                }
                return false;
            }
            case 'horaEntrada': {
                if (value === '' || value === null) {
                    toast.warning('El campo H. Entrada es requerido');
                    return true;
                }
                // Validar formato HH:MM:SS (24h) o HH:MM
                const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
                if (!timeRegex.test(String(value))) {
                    toast.warning('Formato de hora inválido en H. Entrada');
                    return true;
                }
                // Extraer hh y mm
                const [hh] = value.split(':').map(Number);
                // Validar rango horario permitido: entre 07:00:00 y 15:59:59
                if (hh < 7 || hh > 15) {
                    toast.warning('El horario de entrada debe de ser entre las 7 y 15 horas.');
                    return true;
                }
                return false;
            }
            case 'horaSalida': {
                if (value === '' || value === null) {
                    toast.warning('El campo H. Salida es requerido');
                    return true;
                }
                const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                if (!timeRegex.test(String(value))) {
                    toast.warning('Formato de hora inválido en H. Salida');
                    return true;
                }
                return false;
            }
            default:
                return false;
        }
    };

    const validateAllRequired = () => {
        // saldoSolucionado es opcional, no lo incluimos en required
        const fields = ['cuentas', 'titulares', 'negociaciones', 'cumplimientos', 'montoCumplido', 'horaEntrada', 'horaSalida'];
        const errors = {};
        for (const f of fields) {
            const hasError = validateField(f, inputValues[f]);
            if (hasError) errors[f] = true;
        }
        setInputErrors(errors);
        return Object.keys(errors).length === 0;
    };


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
                setErrorJerarquia('Error al obtener la jerarquía de ejecutivos',e);
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
    // removed unused allSubordinateIds state (was declared but never read)
    const [allHierarchyIds, setAllHierarchyIds] = useState([]); // ids de toda la jerarquía






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
                setSelectedExecutives(idsSubordinados);
                setSelectedExecutiveNode(idEjecutivo); // Iluminar solo el nodo raíz al inicio
            } else if (idEjecutivo) {
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
        // Si el nodo seleccionado es el ejecutivo de la sesión, enviar TODOS los ids de la jerarquía
        const userDataForIds = JSON.parse(localStorage.getItem('userData'));
        const idEjecutivoSesionLocal = userDataForIds?.idEjecutivo || userDataForIds?.idejecutivo || userDataForIds?.id || null;

        let idsToSend = validIds.slice();
        if (selectedExecutiveNode && Number(selectedExecutiveNode) === Number(idEjecutivoSesionLocal) && Array.isArray(allHierarchyIds) && allHierarchyIds.length > 0) {
            // En el caso del ejecutivo de sesión, pedir absolutamente TODOS los objetos del árbol
            idsToSend = allHierarchyIds.filter(id => Number.isInteger(Number(id)) && Number(id) > 0).map(Number);
            console.log('Ejecutivo de sesión seleccionado -> Enviando TODOS los ids de la jerarquía a obetenerTablaMetas:', idsToSend);
        } else if (idsToSend.length > 0) {
            console.log('Ids enviados a obetenerTablaMetas:', idsToSend, '| Usuario seleccionado:', selectedExecutives);
        } else {
            console.log('No se enviaron ids válidos a obetenerTablaMetas. selectedExecutives:', selectedExecutives);
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
        // Usar idsToSend calculados (puede ser allHierarchyIds cuando aplica)
        if (!idsToSend.length) {
            setTablaMetas([]);
            return;
        }
        setLoading(true);
        setError(null);
        (async () => {
            try {
                const data = await obetenerTablaMetas(idsToSend);
                const processedData = Array.isArray(data) ? data.filter(Boolean) : [];
                setTablaMetas(processedData);
            } catch (e) {
                console.error('Error al obtener la tabla de metas:', e);
                setError('Error al obtener la tabla de metas');
                setTablaMetas([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [selectedExecutives, executiveTree, allHierarchyIds, selectedExecutiveNode]);

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
        // Validar campos requeridos visualmente
        if (!validateAllRequired()) {
            toast.error('Corrija los campos marcados en rojo');
            return;
        }
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

        // Validar relación: Las negociaciones deben ser menor a los contactos con titulares
        const titularesNumEdit = Number(inputValues.titulares) || 0;
        if (negociaciones > 0 && titularesNumEdit > 0 && negociaciones >= titularesNumEdit) {
            toast.warning('Las negociaciones deben ser menor a los contactos con titulares');
            return;
        }
        
    // Validar regla de negocio: Monto Cumplido debe ser menor al Saldo Solucionado
        const montoCumplido = Number(parseCurrencyToNumber(inputValues.montoCumplido)) || 0;
        const saldoSolucionado = Number(parseCurrencyToNumber(inputValues.saldoSolucionado)) || 0;
        
        if (montoCumplido > 0 && saldoSolucionado > 0 && montoCumplido >= saldoSolucionado) {
            const msg = 'El monto cumplido debe ser menor al saldo solucionado';
            // Only show toast; do not set field-level inputErrors here.
            toast.error(msg);
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
                            horaEntrada: inputValues.horaEntrada ? (inputValues.horaEntrada.length === 5 ? inputValues.horaEntrada + ':00' : inputValues.horaEntrada) : '',
                            horaSalida: inputValues.horaSalida ? (inputValues.horaSalida.length === 5 ? inputValues.horaSalida + ':00' : inputValues.horaSalida) : '',
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

        // Validar relación: Los contactos con titulares deben ser menor a las cuentas tocadas
        const titularesNum_forEdit = Number(inputValues.titulares) || 0;
        const cuentasNum_forEdit = Number(inputValues.cuentas) || 0;
        if (titularesNum_forEdit > 0 && cuentasNum_forEdit > 0 && titularesNum_forEdit >= cuentasNum_forEdit) {
            toast.warning('Los contactos con titulares deben ser menor a las cuentas tocadas');
            return;
        }

        if (montoCumplido > 0 && saldoSolucionado > 0 && montoCumplido >= saldoSolucionado) {
            const msg = 'El monto cumplido debe ser menor al saldo solucionado';
            // Only show toast; do not set field-level inputErrors here.
            toast.warning(msg);
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
                    horaEntrada: inputValues.horaEntrada ? (inputValues.horaEntrada.length === 5 ? inputValues.horaEntrada + ':00' : inputValues.horaEntrada) : '',
                    horaSalida: inputValues.horaSalida ? (inputValues.horaSalida.length === 5 ? inputValues.horaSalida + ':00' : inputValues.horaSalida) : '',
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
  <div className="metas-responsive-blocks h-full w-full" style={{ maxHeight: '90vh', overflow: 'hidden', display: 'flex', gap: '1rem' }}>
        {/* Bloque 1: Logo + Jerarquía */}
        <div className="metas-block metas-block-1" style={{ width: 'clamp(180px,22vw,320px)', minWidth: '160px', maxWidth: '28vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* Logo */}
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2vh 0 1vh 0' }}>
                    <img src={ConsorcioLogo} alt="Consorcio Jurídico" style={{ width: 'clamp(40px,7vw,90px)', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0.3vh 1.2vh #bdbdbd)' }} />
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
                />
            </div>

        {/* Bloque 2: Inputs */}
        <div className="metas-block metas-block-2 flex-1 flex flex-col gap-3 min-w-0 w-full">
                {/* Fila de inputs */}
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow border border-[var(--color-jerarquia1)] w-full" style={{overflowX: 'auto'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw', minWidth: 'min(900px,100vw)', width: '100%' }}>
                        {/* Cuentas */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '48px', width: 'clamp(48px,7vw,90px)' }}>
                            <label>Cuentas</label>
                            <div className="relative">
                                <InputNumber
                                    value={inputValues.cuentas}
                                    onChange={(v) => {
                                        setInputValues(prev => ({ ...prev, cuentas: v }));
                                        // Clear error when corrected
                                        if (inputErrors.cuentas) {
                                            const hasError = validateField('cuentas', v);
                                            if (!hasError) setInputErrors(prev => { const n = { ...prev }; delete n.cuentas; return n; });
                                        }
                                        // UX validation: titulares must be less than cuentas
                                        const titularesNum_local = Number(inputValues.titulares) || 0;
                                        const cuentasNum_local = Number(v) || 0;
                                        if (titularesNum_local > 0 && cuentasNum_local > 0 && titularesNum_local >= cuentasNum_local) {
                                            toast.warning('Los contactos con titulares deben ser menor a las cuentas tocadas');
                                        }
                                    }}
                                    min={0}
                                    step={1}
                                    showButtons={false}
                                    error={inputErrors.cuentas}
                                    className="w-full"
                                    id="input-cuentas"
                                    onBlur={() => {
                                        const msg = validateField('cuentas', inputValues.cuentas);
                                        setInputErrors(prev => ({ ...prev, cuentas: msg }));
                                    }}
                                />
                            </div>
                            {/* inline error message removed: toasts + icon handle feedback */}
                        </div>
                        {/* Titulares */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '48px', width: 'clamp(48px,7vw,90px)' }}>
                            <label>Titulares</label>
                            <div className="relative">
                                <InputNumber
                                    value={inputValues.titulares}
                                    onChange={(v) => {
                                        setInputValues(prev => ({ ...prev, titulares: v }));
                                        if (inputErrors.titulares) {
                                            const hasError = validateField('titulares', v);
                                            if (!hasError) setInputErrors(prev => { const n = { ...prev }; delete n.titulares; return n; });
                                        }
                                        // Validación UX: las negociaciones deben ser menor a los contactos con titulares
                                        const negociacionesNum = Number(inputValues.negociaciones) || 0;
                                        const titularesNum = Number(v) || 0;
                                        if (negociacionesNum > 0 && titularesNum > 0 && negociacionesNum >= titularesNum) {
                                            toast.warning('Las negociaciones deben ser menor a los contactos con titulares');
                                        }
                                    }}
                                    min={0}
                                    step={1}
                                    showButtons={false}
                                    error={inputErrors.titulares}
                                    className="w-full"
                                    id="input-titulares"
                                    onBlur={() => {
                                        const msg = validateField('titulares', inputValues.titulares);
                                        setInputErrors(prev => ({ ...prev, titulares: msg }));
                                    }}
                                />
                            </div>
                            {/* inline error message removed: toasts + icon handle feedback */}
                        </div>

                        {/* Negociaciones */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '56px', width: 'clamp(56px,8vw,110px)' }}>
                            <label>Negocians</label>
                            <div className="relative">
                                <InputNumber
                                    value={inputValues.negociaciones}
                                    onChange={(v) => {
                                        setInputValues(prev => ({ ...prev, negociaciones: v }));
                                        const numValue = Number(v) || 0;
                                        const cumplimientos = Number(inputValues.cumplimientos) || 0;
                                        if (numValue > 0 && cumplimientos > 0 && cumplimientos > numValue) {
                                            toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
                                        }
                                        // Validación UX: las negociaciones deben ser menor a los contactos con titulares
                                        const titularesNum = Number(inputValues.titulares) || 0;
                                        if (numValue > 0 && titularesNum > 0 && numValue >= titularesNum) {
                                            toast.warning('Las negociaciones deben ser menor a los contactos con titulares');
                                        }
                                        if (numValue > 255) {
                                            toast.warning('Las negociaciones deben estar entre 0 y 255');
                                        }
                                        if (inputErrors.negociaciones) {
                                            const hasError = validateField('negociaciones', v);
                                            if (!hasError) setInputErrors(prev => { const n = { ...prev }; delete n.negociaciones; return n; });
                                        }
                                    }}
                                    min={0}
                                    max={255}
                                    step={1}
                                    showButtons={false}
                                    error={inputErrors.negociaciones}
                                    id="input-negociaciones"
                                    onBlur={() => {
                                        const msg = validateField('negociaciones', inputValues.negociaciones);
                                        setInputErrors(prev => ({ ...prev, negociaciones: msg }));
                                    }}
                                />
                            </div>
                            {/* inline error message removed: toasts + icon handle feedback */}
                        </div>

                        {/* Cumplimientos */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '56px', width: 'clamp(56px,8vw,110px)' }}>
                            <label>Cmplmtos</label>
                            <div className="relative">
                                <InputNumber
                                    value={inputValues.cumplimientos}
                                    onChange={(v) => {
                                        setInputValues(prev => ({ ...prev, cumplimientos: v }));
                                        const numValue = Number(v) || 0;
                                        const negociaciones = Number(inputValues.negociaciones) || 0;
                                        if (numValue > 0 && negociaciones > 0 && numValue > negociaciones) {
                                            toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
                                        }
                                        if (numValue > 255) {
                                            toast.warning('Los cumplimientos deben estar entre 0 y 255');
                                        }
                                        if (inputErrors.cumplimientos) {
                                            const hasError = validateField('cumplimientos', v);
                                            if (!hasError) setInputErrors(prev => { const n = { ...prev }; delete n.cumplimientos; return n; });
                                        }
                                    }}
                                    min={0}
                                    max={255}
                                    step={1}
                                    showButtons={false}
                                    error={inputErrors.cumplimientos}
                                    id="input-cumplimientos"
                                    onBlur={() => {
                                        const msg = validateField('cumplimientos', inputValues.cumplimientos);
                                        setInputErrors(prev => ({ ...prev, cumplimientos: msg }));
                                    }}
                                />
                            </div>
                            {/* inline error message removed: toasts + icon handle feedback */}
                        </div>

                        {/* Monto Cumplido */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '80px', width: 'clamp(80px,12vw,160px)' }}>
                            <label>M. Cumplido</label>
                            <div className="relative">
                                {(() => {
                                    const err = inputErrors.montoCumplido;
                                    return (
                                        <>
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
                                                    // Normalizar y truncar la parte entera a 9 dígitos
                                                    const raw = String(inputValue).replace(/[^0-9.]/g, '');
                                                    const parts = raw.split('.');
                                                    let intPart = parts[0] || '';
                                                    let decPart = parts[1] || '';
                                                    if (intPart.length > 9) intPart = intPart.substring(0, 9);
                                                    const rebuilt = decPart ? `${intPart}.${decPart}` : intPart;

                                                    // Validar entrada
                                                    if (validateCurrencyInput(rebuilt)) {
                                                        // Formatear automáticamente
                                                        const formatted = formatCurrency(rebuilt);
                                                        setInputValues(v => ({ ...v, montoCumplido: formatted }));
                                                        // clear error if fully valid
                                                        if (inputErrors.montoCumplido) setInputErrors(prev => { const n = { ...prev }; delete n.montoCumplido; return n; });
                                                    } else {
                                                        // if the user typed at least one digit, hide the error icon (UX: immediate feedback)
                                                        if (/\d/.test(rebuilt)) {
                                                            if (inputErrors.montoCumplido) setInputErrors(prev => { const n = { ...prev }; delete n.montoCumplido; return n; });
                                                        }
                                                        // keep the raw truncated input until it can be formatted on valid pattern
                                                        setInputValues(v => ({ ...v, montoCumplido: rebuilt }));
                                                    }
                                                }}
                                                onKeyDown={e => {
                                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onBlur={() => {
                                                    const msg = validateField('montoCumplido', inputValues.montoCumplido);
                                                    setInputErrors(prev => ({ ...prev, montoCumplido: msg }));
                                                }}
                                                placeholder="$0.00"
                                                className={`  px-4 p-1 block w-full rounded-lg sm:text-sm ${err ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white' : 'bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                style={{ color: 'var(--color-jerarquia3)' }}
                                            />
                                            {err && (
                                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                                    <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                                    </svg>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                            {inputErrors.montoCumplido && <p className="text-sm text-red-600 mt-2">{inputErrors.montoCumplido}</p>}
                        </div>

                        {/* Saldo Solucionado */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '80px', width: 'clamp(80px,12vw,160px)' }}>
                            <label>S. Solunado</label>
                            <div className="relative">
                                {(() => {
                                    const err = inputErrors.saldoSolucionado;
                                    return (
                                        <>
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
                                                    // Normalizar y truncar la parte entera a 9 dígitos
                                                    const raw = String(inputValue).replace(/[^0-9.]/g, '');
                                                    const parts = raw.split('.');
                                                    let intPart = parts[0] || '';
                                                    let decPart = parts[1] || '';
                                                    if (intPart.length > 9) intPart = intPart.substring(0, 9);
                                                    const rebuilt = decPart ? `${intPart}.${decPart}` : intPart;

                                                    // Validar entrada
                                                    if (validateCurrencyInput(rebuilt)) {
                                                        // Formatear automáticamente
                                                        const formatted = formatCurrency(rebuilt);
                                                        setInputValues(v => ({ ...v, saldoSolucionado: formatted }));
                                                        // clear error if fully valid
                                                        if (inputErrors.saldoSolucionado) setInputErrors(prev => { const n = { ...prev }; delete n.saldoSolucionado; return n; });
                                                    } else {
                                                        // if the user typed at least one digit, hide the error icon (UX: immediate feedback)
                                                        if (/\d/.test(rebuilt)) {
                                                            if (inputErrors.saldoSolucionado) setInputErrors(prev => { const n = { ...prev }; delete n.saldoSolucionado; return n; });
                                                        }
                                                        // keep the raw truncated input until it can be formatted on valid pattern
                                                        setInputValues(v => ({ ...v, saldoSolucionado: rebuilt }));
                                                    }
                                                }}
                                                onKeyDown={e => {
                                                    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onBlur={() => {
                                                    const msg = validateField('saldoSolucionado', inputValues.saldoSolucionado);
                                                    setInputErrors(prev => ({ ...prev, saldoSolucionado: msg }));
                                                }}
                                                placeholder="$0.00"
                                                className={`  px-4 p-1 block w-full rounded-lg sm:text-sm ${err ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white' : 'bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                style={{ color: 'var(--color-jerarquia3)' }}
                                            />
                                            {err && (
                                                <div className="flex items-center ml-2 pointer-events-none">
                                                    <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                                    </svg>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                            {inputErrors.saldoSolucionado && <p className="text-sm text-red-600 mt-2">{inputErrors.saldoSolucionado}</p>}
                        </div>

                        {/* Segmento */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '56px', width: 'clamp(56px,8vw,110px)' }}>
                            <label>Segmento</label>
                            <input
                                type="text"
                                value={inputValues.segmento}
                                onChange={e => setInputValues(v => ({ ...v, segmento: e.target.value }))}
                                className="peer p-1 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                                style={{ color: 'var(--color-jerarquia3)' }}
                            />
                        </div>

                        {/* Hora Entrada */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '72px', width: 'clamp(72px,10vw,140px)', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <label>H. Entrada</label>
                                {inputErrors.horaEntrada && (
                                    <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                    </svg>
                                )}
                            </div>
                            <div className="relative">
                                {(() => {
                                    const err = inputErrors.horaEntrada;
                                    return (
                                        <input
                                            type="time"
                                            value={inputValues.horaEntrada === null ? '' : inputValues.horaEntrada}
                                            onChange={e => {
                                                const val = e.target.value === '' ? null : e.target.value;
                                                setInputValues(v => ({ ...v, horaEntrada: val }));
                                                // Clear error when user starts typing a valid pattern
                                                if (inputErrors.horaEntrada) {
                                                    const timeRegex = /^([01]\\d|2[0-3]):([0-5]\\d)$/;
                                                    if (val && timeRegex.test(String(val))) {
                                                        setInputErrors(prev => { const n = { ...prev }; delete n.horaEntrada; return n; });
                                                    }
                                                }
                                            }}
                                            onBlur={() => {
                                                const msg = validateField('horaEntrada', inputValues.horaEntrada);
                                                setInputErrors(prev => ({ ...prev, horaEntrada: msg }));
                                            }}
                                            className={`large-time-input block rounded-lg sm:text-sm transition-all duration-150 pr-2 ${err ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white' : 'bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                            style={{
                                                backgroundColor: "var(--color-bgcolor2)",
                                                color: "#111",
                                                border: "1px solid var(--color-jerarquia1)",
                                                borderRadius: "0.25rem",
                                                padding: "0.25rem 0.5rem",
                                                fontSize: "0.75rem",
                                                fontWeight: "400",
                                            }}
                                        />
                                    );
                                })()}
                            </div>
                            {inputErrors.horaEntrada && <p className="text-sm text-red-600 mt-2">{inputErrors.horaEntrada}</p>}
                        </div>

                        {/* Hora Salida */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '72px', width: 'clamp(72px,10vw,140px)', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <label>H. Salida</label>
                                {inputErrors.horaSalida && (
                                    <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                    </svg>
                                )}
                            </div>
                            <div className="relative">
                                {(() => {
                                    const err = inputErrors.horaSalida;
                                    return (
                                        <input
                                            type="time"
                                            value={inputValues.horaSalida === null ? '' : inputValues.horaSalida}
                                            onChange={e => {
                                                const val = e.target.value === '' ? null : e.target.value;
                                                setInputValues(v => ({ ...v, horaSalida: val }));
                                                if (inputErrors.horaSalida) {
                                                    const timeRegex = /^([01]\\d|2[0-3]):([0-5]\\d)$/;
                                                    if (val && timeRegex.test(String(val))) {
                                                        setInputErrors(prev => { const n = { ...prev }; delete n.horaSalida; return n; });
                                                    }
                                                }
                                            }}
                                            onBlur={() => {
                                                const msg = validateField('horaSalida', inputValues.horaSalida);
                                                setInputErrors(prev => ({ ...prev, horaSalida: msg }));
                                            }}
                                            className={`large-time-input block rounded-lg sm:text-sm transition-all duration-150 pr-2 ${err ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white' : 'bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                            style={{
                                                backgroundColor: "var(--color-bgcolor2)",
                                                color: "#111",
                                                border: "1px solid var(--color-jerarquia1)",
                                                borderRadius: "0.25rem",
                                                padding: "0.25rem 0.5rem",
                                                fontSize: "0.75rem",
                                                fontWeight: "400",
                                            }}
                                        />
                                    );
                                })()}
                            </div>
                            {inputErrors.horaSalida && <p className="text-sm text-red-600 mt-2">{inputErrors.horaSalida}</p>}
                        </div>
                    </div>
                </div>

                {/* Tabla principal */}
        <div className="metas-block metas-block-3 bg-white rounded-lg p-2 sm:p-3 shadow border border-[var(--color-jerarquia1)] flex-1 flex flex-col min-w-0 min-h-0 w-full mt-2">
            <div style={{ maxHeight: "32vh", overflow: "auto" }} className="scrollbar-gray w-full">
                <table className="modal-table">
                            <thead>
                                <tr>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>
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
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Ejecutivo</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Usuario</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Cuentas</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Titulares</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Negociaciones</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Cumplimientos</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Monto Cumplido</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Saldo Solucionado</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>Segmento</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>H.Entrada</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2}}>H.Salida</th>
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
                                                style={selectedRows.includes(rowKey)
                                                    ? { cursor: 'pointer', background: 'var(--color-jerarquia1)', color: '#000' }
                                                    : { cursor: 'pointer' }}
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
                                                <td style={{ minWidth: '120px', maxWidth: '22vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}>
                                                    {safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}
                                                </td>
                                                <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.usuario) || safe(row.usuarioEjecutivo) || safe(row.clave)}>
                                                    {safe(row.usuario) || safe(row.usuarioEjecutivo) || safe(row.clave)}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.cuentas, safe(row.totalCuentas, 0)))}>
                                                    {safe(row.cuentas, safe(row.totalCuentas, 0))}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.titulares, safe(row.totalTitulares, 0)))}>
                                                    {safe(row.titulares, safe(row.totalTitulares, 0))}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.negociaciones, safe(row.totalNegociaciones, 0)))}>
                                                    {safe(row.negociaciones, safe(row.totalNegociaciones, 0))}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.cumplimientos, safe(row.totalCumplimientos, 0)))}>
                                                    {safe(row.cumplimientos, safe(row.totalCumplimientos, 0))}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={formatCurrencyForDisplay(safe(row.montoCumplido, safe(row.monto_cumplido, 0)))}>
                                                    {(() => {
                                                        const originalValue = safe(row.montoCumplido, safe(row.monto_cumplido, 0));
                                                        return formatCurrencyForDisplay(originalValue);
                                                    })()}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={formatCurrencyForDisplay(safe(row.saldoSolucionado, safe(row.saldo_solucionado, 0)))}>
                                                    {(() => {
                                                        const originalValue = safe(row.saldoSolucionado, safe(row.saldo_solucionado, 0));
                                                        return formatCurrencyForDisplay(originalValue);
                                                    })()}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.segmento, safe(row.nombreSegmento, '-'))}>
                                                    {safe(row.segmento, safe(row.nombreSegmento, '-'))}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.horaEntrada, safe(row.hora_entrada, '-'))}>
                                                    {safe(row.horaEntrada, safe(row.hora_entrada, '-'))}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.horaSalida, safe(row.hora_salida, '-'))}>
                                                    {safe(row.horaSalida, safe(row.hora_salida, '-'))}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {/* El botón Guardar ahora está fuera de la tabla */}
                    </div>
                    {/* Botón Guardar dentro del contenedor de la tabla pero fuera del scroll */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '2vh' }}>
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
                                    type="button"
                                    className={
                                        `btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center${isDisabled ? ' opacity-50 cursor-not-allowed' : ''}`
                                    }
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
        </div>
    );
};

export default ModalMetasContent;