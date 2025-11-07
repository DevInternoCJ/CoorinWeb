import React, { useState, useEffect } from "react";
// import { Input, Label } from 'preline'
import JerarquiaConR from "../../branchs/JerarquiaConR.jsx";
import { Toaster, toast } from "sonner";

import { obetenerTablaMetas, actualizarMetas, obetenerJerarquiaEncargados } from "../../../../../services/mark/albaz/LokiServices.js";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";


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

// SVG de advertencia reutilizable
const WarningIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-yellow-500 mr-1 cursor-pointer"><path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/></svg>
);


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
    const lastCrossField = React.useRef(null);
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
    
    // Estado centralizado de validación por campo
    // Estructura: { [campo]: { error: string|false, warning: string|false, showIcon: bool, toastShown: bool } }
    const [validationState, setValidationState] = useState({
    cuentas: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    titulares: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    negociaciones: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    cumplimientos: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    montoCumplido: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    saldoSolucionado: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    segmento: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    horaEntrada: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false },
    horaSalida: { error: false, warning: false, showIcon: false, toastShown: false, requiredError: false }
    });

    // Función para actualizar el estado de validación de un campo
    const updateValidation = (field, changes) => {
        setValidationState(prev => ({
            ...prev,
            [field]: { ...prev[field], ...changes }
        }));
    };




    // Función centralizada de validación y feedback visual
    // Actualiza validationState, muestra toasts y activa iconos según reglas
    const validateAndSetField = (field, value, allValues = inputValues, showToast = true) => {
    // --- Validación cruzada Titulares vs Cuentas (bidireccional y limpieza de error) ---
    if (field === 'titulares' || field === 'cuentas') {
        const titularesNum = Number(field === 'titulares' ? value : allValues.titulares) || 0;
        const cuentasNum = Number(field === 'cuentas' ? value : allValues.cuentas) || 0;
        if (titularesNum > 0 && cuentasNum > 0 && titularesNum >= cuentasNum) {
            if (field === 'titulares') {
                error = 'Los contactos con titulares deben ser menor a las cuentas tocadas';
                showIcon = true;
                // Reflejar error en cuentas también
                updateValidation('cuentas', { error: 'Las cuentas tocadas deben ser mayor a los titulares', showIcon: true });
            } else if (field === 'cuentas') {
                error = 'Las cuentas tocadas deben ser mayor a los titulares';
                showIcon = true;
                updateValidation('titulares', { error: 'Los contactos con titulares deben ser menor a las cuentas tocadas', showIcon: true });
            }
        } else {
            // Limpiar error cruzado si ya no aplica
            updateValidation('titulares', { error: false, showIcon: false });
            updateValidation('cuentas', { error: false, showIcon: false });
        }
    }
    // --- Validación cruzada Cumplimientos vs Negociaciones (bidireccional y limpieza de error) ---
    if (field === 'cumplimientos' || field === 'negociaciones') {
        const cumplimientosNum = Number(field === 'cumplimientos' ? value : allValues.cumplimientos) || 0;
        const negociacionesNum = Number(field === 'negociaciones' ? value : allValues.negociaciones) || 0;
        if (cumplimientosNum > 0 && negociacionesNum > 0 && cumplimientosNum > negociacionesNum) {
            if (field === 'cumplimientos') {
                error = 'Los cumplimientos deben ser menor o igual a las negociaciones';
                showIcon = true;
                updateValidation('negociaciones', { error: 'Las negociaciones deben ser mayor o igual a los cumplimientos', showIcon: true });
            } else if (field === 'negociaciones') {
                error = 'Las negociaciones deben ser mayor o igual a los cumplimientos';
                showIcon = true;
                updateValidation('cumplimientos', { error: 'Los cumplimientos deben ser menor o igual a las negociaciones', showIcon: true });
            }
        } else {
            updateValidation('cumplimientos', { error: false, showIcon: false });
            updateValidation('negociaciones', { error: false, showIcon: false });
        }
    }
    let error = false;
    let showIcon = false;
    let requiredError = false;

    // Validaciones cruzadas para montoCumplido y saldoSolucionado
    if (field === 'montoCumplido' || field === 'saldoSolucionado') {
        const monto = Number(parseCurrencyToNumber(field === 'montoCumplido' ? value : allValues.montoCumplido)) || 0;
        const saldo = Number(parseCurrencyToNumber(field === 'saldoSolucionado' ? value : allValues.saldoSolucionado)) || 0;
        if (monto > 0 && saldo > 0 && monto >= saldo) {
            if (field === 'montoCumplido') {
                error = 'El Monto Cumplido debe ser menor al Saldo Solucionado';
                showIcon = true;
            } else if (field === 'saldoSolucionado') {
                error = 'El Saldo Solucionado debe ser mayor al Monto Cumplido';
                showIcon = true;
            }
        }
    }
        // Reglas por campo
        switch (field) {
            case 'cuentas':
                if (value === '' || value === null) {
                    error = 'El campo Cuentas es requerido';
                    requiredError = true;
                } else if (!/^\d+$/.test(String(value))) {
                    error = 'Cuentas: debe ser un número entero';
                    showIcon = true;
                }
                // Validación cruzada: si titulares ya tiene valor, forzar validación en titulares solo si no venimos de titulares
                if (allValues.titulares !== undefined && allValues.titulares !== '' && lastCrossField.current !== 'titulares') {
                    lastCrossField.current = 'cuentas';
                    setTimeout(() => {
                        validateAndSetField('titulares', allValues.titulares, { ...allValues, cuentas: value }, false);
                        lastCrossField.current = null;
                    }, 0);
                }
                break;
            case 'titulares': {
                if (value === '' || value === null) {
                    error = 'El campo Titulares es requerido';
                    requiredError = true;
                } else if (!/^\d+$/.test(String(value))) {
                    error = 'Titulares: debe ser un número entero';
                    showIcon = true;
                }
                // Validación cruzada: si cuentas ya tiene valor, forzar validación en cuentas solo si no venimos de cuentas
                if (allValues.cuentas !== undefined && allValues.cuentas !== '' && lastCrossField.current !== 'cuentas') {
                    lastCrossField.current = 'titulares';
                    setTimeout(() => {
                        validateAndSetField('cuentas', allValues.cuentas, { ...allValues, titulares: value }, false);
                        lastCrossField.current = null;
                    }, 0);
                }
                break;
            }
            case 'negociaciones': {
                if (value === '' || value === null) {
                    error = 'El campo Negociaciones es requerido';
                    requiredError = true;
                } else {
                    const n = Number(value);
                    if (!Number.isInteger(n) || n < 0 || n > 255) {
                        error = 'Negociaciones: debe estar entre 0 y 255';
                        showIcon = true;
                    }
                }
                // Validación cruzada: si cumplimientos ya tiene valor, forzar validación en cumplimientos solo si no venimos de cumplimientos
                if (allValues.cumplimientos !== undefined && allValues.cumplimientos !== '' && lastCrossField.current !== 'cumplimientos') {
                    lastCrossField.current = 'negociaciones';
                    setTimeout(() => {
                        validateAndSetField('cumplimientos', allValues.cumplimientos, { ...allValues, negociaciones: value }, false);
                        lastCrossField.current = null;
                    }, 0);
                }
                break;
            }
            case 'cumplimientos': {
                if (value === '' || value === null) {
                    error = 'El campo Cumplimientos es requerido';
                    requiredError = true;
                } else {
                    const n = Number(value);
                    if (!Number.isInteger(n) || n < 0 || n > 255) {
                        error = 'Cumplimientos: debe estar entre 0 y 255';
                        showIcon = true;
                    }
                }
                // Validación cruzada: si negociaciones ya tiene valor, forzar validación en negociaciones solo si no venimos de negociaciones
                if (allValues.negociaciones !== undefined && allValues.negociaciones !== '' && lastCrossField.current !== 'negociaciones') {
                    lastCrossField.current = 'cumplimientos';
                    setTimeout(() => {
                        validateAndSetField('negociaciones', allValues.negociaciones, { ...allValues, cumplimientos: value }, false);
                        lastCrossField.current = null;
                    }, 0);
                }
                break;
            }
            case 'montoCumplido': {
                if (value === '' || value === null) {
                    error = 'El campo Monto Cumplido es requerido';
                    requiredError = true;
                } else if (!validateCurrencyInput(value)) {
                    error = 'Formato de moneda inválido en Monto Cumplido';
                    showIcon = true;
                }
                // Validación cruzada: si saldoSolucionado ya tiene valor, forzar validación en saldoSolucionado solo si no venimos de saldoSolucionado
                if (allValues.saldoSolucionado !== undefined && allValues.saldoSolucionado !== '' && lastCrossField.current !== 'saldoSolucionado') {
                    lastCrossField.current = 'montoCumplido';
                    setTimeout(() => {
                        validateAndSetField('saldoSolucionado', allValues.saldoSolucionado, { ...allValues, montoCumplido: value }, false);
                        lastCrossField.current = null;
                    }, 0);
                }
                break;
            }
            case 'saldoSolucionado': {
                if (!value || value === '') {
                    error = false;
                } else if (!validateCurrencyInput(value)) {
                    error = 'Formato de moneda inválido en Saldo Solucionado';
                    showIcon = true;
                }
                // Validación cruzada: si montoCumplido ya tiene valor, forzar validación en montoCumplido solo si no venimos de montoCumplido
                if (allValues.montoCumplido !== undefined && allValues.montoCumplido !== '' && lastCrossField.current !== 'montoCumplido') {
                    lastCrossField.current = 'saldoSolucionado';
                    setTimeout(() => {
                        validateAndSetField('montoCumplido', allValues.montoCumplido, { ...allValues, saldoSolucionado: value }, false);
                        lastCrossField.current = null;
                    }, 0);
                }
                break;
            }
            case 'horaEntrada': {
                if (value === '' || value === null) {
                    error = 'El campo H. Entrada es requerido';
                    requiredError = true;
                } else {
                    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
                    if (!timeRegex.test(String(value))) {
                        error = 'Formato de hora inválido en H. Entrada';
                        showIcon = true;
                    } else {
                        const [hh] = value.split(':').map(Number);
                        if (hh < 7 || hh > 15) {
                            error = 'El horario de entrada debe de ser entre las 7 y 15 horas.';
                            showIcon = true;
                        }
                    }
                }
                break;
            }
            case 'horaSalida': {
                if (value === '' || value === null) {
                    error = 'El campo H. Salida es requerido';
                    requiredError = true;
                } else {
                    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
                    if (!timeRegex.test(String(value))) {
                        error = 'Formato de hora inválido en H. Salida';
                        showIcon = true;
                    } else {
                        // Validar rango de hora de salida entre 07:00 y 22:00
                        const [hhSalida, mmSalida] = value.split(':').map(Number);
                        if (hhSalida < 7 || hhSalida > 22) {
                            error = 'El horario de salida debe ser entre las 07:00 y 22:00 horas.';
                            showIcon = true;
                        } else if (allValues.horaEntrada && /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(allValues.horaEntrada)) {
                            // Validar diferencia máxima de 10 horas entre entrada y salida
                            const [hhEntrada, mmEntrada] = allValues.horaEntrada.split(':').map(Number);
                            let diff = (hhSalida * 60 + (mmSalida || 0)) - (hhEntrada * 60 + (mmEntrada || 0));
                            if (diff >= 600) { // 600 minutos = 10 horas
                                error = 'Debe haber menos de 10 horas entre la entrada y la salida.';
                                showIcon = true;
                            }
                        }
                    }
                }
                break;
            }
            default:
                break;
        }
        // Feedback visual y toast
        if (error && showToast) {
            toast.warning(error);
        }
    updateValidation(field, { error, showIcon, requiredError });
        return !error;
    };

    // Validar todos los campos requeridos y actualizar el estado centralizado
    const validateAllFields = (values = inputValues) => {
        const fields = ['cuentas', 'titulares', 'negociaciones', 'cumplimientos', 'montoCumplido', 'horaEntrada', 'horaSalida'];
        let allValid = true;
        fields.forEach(f => {
            const valid = validateAndSetField(f, values[f], values, false);
            if (!valid) allValid = false;
        });
        return allValid;
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
                setErrorJerarquia('Error al obtener la jerarquía de ejecutivos', e);
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
        // Validar todos los campos requeridos visualmente y feedback
        if (!validateAllFields()) {
            toast.warning('Corrija los campos marcados en Amarillo');
            return;
        }
        // Validar tipos de datos TinyInt (0-255) para Negociaciones y Cumplimientos
        const negociaciones = Number(inputValues.negociaciones) || 0;
        const cumplimientos = Number(inputValues.cumplimientos) || 0;

        if (negociaciones < 0 || negociaciones > 255) {
            toast.warning('Las negociaciones deben estar entre 0 y 255');
            return;
        }

        // Validar regla de negocio: Monto Cumplido debe ser menor al Saldo Solucionado
        const montoCumplido = Number(parseCurrencyToNumber(inputValues.montoCumplido)) || 0;
        const saldoSolucionado = Number(parseCurrencyToNumber(inputValues.saldoSolucionado)) || 0;


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
            showValidationWarningSVG('negociaciones', 'Las negociaciones deben estar entre 0 y 255');
            toast.warning('Las negociaciones deben estar entre 0 y 255');
            return;
        }



    // Función para mostrar el SVG de advertencia en el campo de validación
    const showValidationWarningSVG = (field, message) => {
        setValidationState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                error: message,
                showIcon: true,
                warningSVG: (
                    <span className="relative group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-yellow-500 mr-1 cursor-pointer"><path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/></svg>
                        <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                            {message}
                        </span>
                    </span>
                )
            }
        }));
    };

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
                                {/* Fila de inputs en dos filas */}
                                <div className="bg-white rounded-lg p-2 sm:p-3 shadow border border-[var(--color-jerarquia1)] w-full" style={{ overflowX: 'auto' }}>
                                    <div className="flex flex-col gap-2 min-w-[min(900px,100vw)] w-full">
                                        {/* Primera fila: Cuentas, Titulares, Negociaciones, Cumplimientos, Monto Cumplido */}
                                        <div className="flex flex-row gap-4 w-full">
                                            {/* Cuentas */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="text"
                                                        className={`peer px-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.cuentas.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-cuentas"
                                                        placeholder=" "
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.cuentas}
                                                        onChange={e => {
                                                            let v = e.target.value;
                                                            v = v.replace(/[^0-9]/g, '');
                                                            if (v.length > 9) v = v.substring(0, 9);
                                                            setInputValues(prev => ({ ...prev, cuentas: v }));
                                                            validateAndSetField('cuentas', v);
                                                        }}
                                                        min={0}
                                                        step={1}
                                                        onBlur={() => {
                                                            validateAndSetField('cuentas', inputValues.cuentas);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-cuentas"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {/* Mostrar campanita si hay error tipo string y showIcon activo */}
                                                        {typeof validationState.cuentas.error === 'string' && validationState.cuentas.showIcon && (
                                                            <span className="relative group">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-yellow-500 mr-1 cursor-pointer"><path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/></svg>
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.cuentas.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Cuentas
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Titulares */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="text"
                                                        className={`peer px-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.titulares.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-titulares"
                                                        placeholder=" "
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.titulares}
                                                        onChange={e => {
                                                            let v = e.target.value;
                                                            v = v.replace(/[^0-9]/g, '');
                                                            if (v.length > 9) v = v.substring(0, 9);
                                                            setInputValues(prev => ({ ...prev, titulares: v }));
                                                            validateAndSetField('titulares', v);
                                                        }}
                                                        min={0}
                                                        step={1}
                                                        onBlur={() => {
                                                            validateAndSetField('titulares', inputValues.titulares);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-titulares"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.titulares.error === 'string' && validationState.titulares.showIcon && (
                                                            <span className="relative group">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-yellow-500 mr-1 cursor-pointer"><path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/></svg>
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.titulares.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Titulares
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Negociaciones */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="text"
                                                        className={`peer px-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.negociaciones.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-negociaciones"
                                                        placeholder=" "
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.negociaciones}
                                                        onChange={e => {
                                                            let v = e.target.value;
                                                            v = v.replace(/[^0-9]/g, '');
                                                            if (v.length > 9) v = v.substring(0, 9);
                                                            setInputValues(prev => ({ ...prev, negociaciones: v }));
                                                            validateAndSetField('negociaciones', v);
                                                        }}
                                                        min={0}
                                                        step={1}
                                                        onBlur={() => {
                                                            validateAndSetField('negociaciones', inputValues.negociaciones);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-negociaciones"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.negociaciones.error === 'string' && validationState.negociaciones.showIcon && (
                                                            <span className="relative group">
                                                                {WarningIcon}
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.negociaciones.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Negociaciones
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Cumplimientos */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="text"
                                                        className={`peer px-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.cumplimientos.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-cumplimientos"
                                                        placeholder=" "
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.cumplimientos}
                                                        onChange={e => {
                                                            let v = e.target.value;
                                                            v = v.replace(/[^0-9]/g, '');
                                                            if (v.length > 9) v = v.substring(0, 9);
                                                            setInputValues(prev => ({ ...prev, cumplimientos: v }));
                                                            validateAndSetField('cumplimientos', v);
                                                        }}
                                                        min={0}
                                                        step={1}
                                                        onBlur={() => {
                                                            validateAndSetField('cumplimientos', inputValues.cumplimientos);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-cumplimientos"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.cumplimientos.error === 'string' && validationState.cumplimientos.showIcon && (
                                                            <span className="relative group">
                                                                {WarningIcon}
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.cumplimientos.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Cumplimientos
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Monto Cumplido */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="text"
                                                        className={`peer pl-6 pr-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.montoCumplido.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-montoCumplido"
                                                        placeholder=" "
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.montoCumplido}
                                                        onChange={e => {
                                                            let v = e.target.value;
                                                            v = v.replace(/[^0-9.]/g, '');
                                                            const parts = v.split('.');
                                                            let intPart = parts[0] || '';
                                                            let decPart = parts[1] || '';
                                                            if (intPart.length > 9) intPart = intPart.substring(0, 9);
                                                            if (decPart.length > 2) decPart = decPart.substring(0, 2);
                                                            v = decPart ? `${intPart}.${decPart}` : intPart;
                                                            setInputValues(prev => ({ ...prev, montoCumplido: v }));
                                                            validateAndSetField('montoCumplido', v);
                                                        }}
                                                        onBlur={() => {
                                                            validateAndSetField('montoCumplido', inputValues.montoCumplido);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-montoCumplido"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.montoCumplido.error === 'string' && validationState.montoCumplido.showIcon && (
                                                            <span className="relative group">
                                                                {WarningIcon}
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.montoCumplido.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Monto Cumplido
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Segunda fila: Saldo Solucionado, Segmento, H. Entrada, H. Salida */}
                                        <div className="flex flex-row gap-4 w-full">
                                            {/* Saldo Solucionado */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="text"
                                                        className={`peer pl-6 pr-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.saldoSolucionado.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-saldoSolucionado"
                                                        placeholder=" "
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.saldoSolucionado}
                                                        onChange={e => {
                                                            let v = e.target.value;
                                                            v = v.replace(/[^0-9.]/g, '');
                                                            const parts = v.split('.');
                                                            let intPart = parts[0] || '';
                                                            let decPart = parts[1] || '';
                                                            if (intPart.length > 9) intPart = intPart.substring(0, 9);
                                                            if (decPart.length > 2) decPart = decPart.substring(0, 2);
                                                            v = decPart ? `${intPart}.${decPart}` : intPart;
                                                            setInputValues(prev => ({ ...prev, saldoSolucionado: v }));
                                                            validateAndSetField('saldoSolucionado', v);
                                                        }}
                                                        onBlur={() => {
                                                            validateAndSetField('saldoSolucionado', inputValues.saldoSolucionado);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-saldoSolucionado"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.saldoSolucionado.error === 'string' && validationState.saldoSolucionado.showIcon && (
                                                            <span className="relative group">
                                                                {WarningIcon}
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.saldoSolucionado.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Saldo Solucionado
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Segmento */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="text"
                                                        className={`peer px-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.segmento.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-segmento"
                                                        placeholder=" "
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.segmento}
                                                        onChange={e => setInputValues(v => ({ ...v, segmento: e.target.value }))}
                                                    />
                                                    <label
                                                        htmlFor="input-segmento"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        Segmento
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Hora Entrada */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="time"
                                                        min="07:00"
                                                        max="19:00"
                                                        className={`peer px-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.horaEntrada.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-horaEntrada"
                                                        placeholder="00:00"
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.horaEntrada === null ? '' : inputValues.horaEntrada}
                                                        onChange={e => {
                                                            const val = e.target.value === '' ? null : e.target.value;
                                                            setInputValues(v => ({ ...v, horaEntrada: val }));
                                                            validateAndSetField('horaEntrada', val);
                                                        }}
                                                        onBlur={() => {
                                                            validateAndSetField('horaEntrada', inputValues.horaEntrada);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-horaEntrada"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.horaEntrada.error === 'string' && validationState.horaEntrada.showIcon && (
                                                            <span className="relative group">
                                                                {WarningIcon}
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.horaEntrada.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Hora Entrada
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Hora Salida */}
                                            <div className="w-full">
                                                <div className="relative w-full min-w-0">
                                                    <input
                                                        type="time"
                                                        min="07:00"
                                                        max="19:00"
                                                        className={`peer px-3 py-2 block w-full bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:pt-5 focus:pb-1 not-placeholder-shown:pt-5 not-placeholder-shown:pb-1 autofill:pt-5 autofill:pb-1 ${validationState.horaSalida.requiredError ? 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400 border-2' : 'border-transparent focus:ring-jerarquia1 focus:border-jerarquia1'}`}
                                                        id="input-horaSalida"
                                                        placeholder="00:00"
                                                        style={{ color: 'var(--color-jerarquia3)' }}
                                                        value={inputValues.horaSalida === null ? '' : inputValues.horaSalida}
                                                        onChange={e => {
                                                            const val = e.target.value === '' ? null : e.target.value;
                                                            setInputValues(v => ({ ...v, horaSalida: val }));
                                                            validateAndSetField('horaSalida', val);
                                                        }}
                                                        onBlur={() => {
                                                            validateAndSetField('horaSalida', inputValues.horaSalida);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-horaSalida"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.horaSalida.error === 'string' && validationState.horaSalida.showIcon && (
                                                            <span className="relative group">
                                                                {WarningIcon}
                                                                <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                                                                    {validationState.horaSalida.error}
                                                                </span>
                                                            </span>
                                                        )}
                                                        Hora Salida
                                                    </label>
                                                </div>
                                            </div>
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
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Ejecutivo</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Usuario</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Cuentas</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Titulares</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Negociaciones</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Cumplimientos</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Monto Cumplido</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Saldo Solucionado</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Segmento</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>H.Entrada</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>H.Salida</th>
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


                            return (
                                <button
                                    type="button"
                                    className={
                                        `btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center${isDisabled ? ' opacity-50 cursor-not-allowed' : ''}`
                                    }
                                    onClick={handleGuardar}
                                    disabled={isDisabled}
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