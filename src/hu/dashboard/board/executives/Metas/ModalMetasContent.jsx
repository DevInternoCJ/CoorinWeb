import React, { useState, useEffect } from "react";
import TableMetas from "./TableMetas.jsx";
// import { Input, Label } from 'preline'
import TreeMetas from "./TreeMetas.jsx";
import { Toaster, toast } from "sonner";

import { obetenerTablaMetas, actualizarMetas } from "../../../../../services/mark/Orochi/LokiServices.js";


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
const WarningIcon = (title = '', onClick = null) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        className="text-yellow-500 mr-1 cursor-pointer" 
        title={title}
        onClick={onClick}
    >
        <path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/>
    </svg>
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
        // Estado para el ancho de ventana y efecto resize
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);
        useEffect(() => {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    const lastCrossField = React.useRef(null);
    const [tablaMetas, setTablaMetas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Inyectar estilos para ocultar los controles de incremento
    React.useEffect(() => {
        injectHideNumberArrowsStyles();
    }, []);

    // Toast informativo al montar el componente
    React.useEffect(() => {
        toast.info("Seleccione los ejecutivos para guardar sus Metas Diarias");
    }, []);

    // Eliminados estados de jerarquía, ahora se usan en TreeMetas.jsx
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
    negociaciones: { errors: [], showIcon: false, toastShown: false, requiredError: false },
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

    // Componente para icono + tooltip
    const TooltipIcon = ({ message }) => (
        <span className="relative group">
            {WarningIcon(message, () => toast.warning(message))}
            <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none min-w-max shadow-lg border border-yellow-300">
                {message}
            </span>
        </span>
    );




    // Función centralizada de validación y feedback visual
    // Actualiza validationState, muestra toasts y activa iconos según reglas
    // El borde amarillo (requiredError) solo se muestra en blur si el campo está vacío
    // Se limpia requiredError al modificar el valor
    const validateAndSetField = (field, value, allValues = inputValues, showToast = true, eventType = 'change') => {
    // Validación cruzada Negociaciones < Titulares SOLO en onChange
    if ((field === 'negociaciones' || field === 'titulares') && eventType === 'change') {
        const negociacionesNum = Number(field === 'negociaciones' ? value : allValues.negociaciones) || 0;
        const titularesNum = Number(field === 'titulares' ? value : allValues.titulares) || 0;
        let errors = [];
        if (negociacionesNum > 0 && titularesNum > 0 && negociacionesNum >= titularesNum) {
            errors.push({ msg: 'Las negociaciones deben ser menor a los contactos con titulares' });
        }
        // Validación cruzada Cumplimientos vs Negociaciones (bidireccional)
        const cumplimientosNum = Number(allValues.cumplimientos) || 0;
        if (cumplimientosNum > 0 && negociacionesNum > 0 && cumplimientosNum > negociacionesNum) {
            errors.push({ msg: 'Las negociaciones deben ser mayor o igual a los cumplimientos' });
        }
        setValidationState(prev => ({
            ...prev,
            negociaciones: { ...prev.negociaciones, errors, showIcon: errors.length > 0 },
            titulares: { ...prev.titulares, error: errors.find(e => e.msg.includes('titulares')) ? 'Los contactos con titulares deben ser mayor a las negociaciones' : false, showIcon: errors.find(e => e.msg.includes('titulares')) ? true : false }
        }));
        if (errors.length > 0 && showToast) {
            errors.forEach(e => toast.warning(e.msg));
        }
        return errors.length === 0;
    }
    // Validación cruzada Titulares vs Cuentas (función aparte) - SE EJECUTA DESPUÉS PARA NO SOBRESCRIBIR requiredError
    
    if (field === 'titulares' || field === 'cuentas') { 
        // Validación cruzada directa para ambos campos
        const titularesValue = field === 'titulares' ? value : allValues.titulares;
        const cuentasValue = field === 'cuentas' ? value : allValues.cuentas;
        const titularesNum = Number(titularesValue) || 0;
        const cuentasNum = Number(cuentasValue) || 0;
        
        let errorTitulares = false, showIconTitulares = false, requiredErrorTitulares = false;
        let errorCuentas = false, showIconCuentas = false, requiredErrorCuentas = false;
        
        // Validar campo requerido SOLO para el campo actual
        if (field === 'titulares' && (value === '' || value === null || value === undefined)) {
            if (eventType === 'blur' || eventType === 'save') {
                errorTitulares = 'El campo Titulares es requerido';
                requiredErrorTitulares = true;
                if (showToast) toast.warning('El campo Titulares es requerido');
            }
        }
        
        if (field === 'cuentas' && (value === '' || value === null || value === undefined)) {
            if (eventType === 'blur' || eventType === 'save') {
                errorCuentas = 'El campo Cuentas es requerido';
                requiredErrorCuentas = true;
                if (showToast) toast.warning('El campo Cuentas es requerido');
            }
        }
        
        // Validación cruzada solo si ambos tienen valores - ICONOS SINCRONIZADOS
        if (titularesNum > 0 && cuentasNum > 0 && titularesNum >= cuentasNum) {
            errorTitulares = 'Titulares debe ser menor que Cuentas';
            showIconTitulares = true;
            errorCuentas = 'Cuentas debe ser mayor que Titulares';
            showIconCuentas = true;
            if (showToast) toast.warning('Titulares debe ser menor que Cuentas');
        }
        
        // Actualizar AMBOS campos para iconos sincronizados, pero requiredError independiente
        updateValidation('titulares', { 
            error: errorTitulares, 
            showIcon: showIconTitulares, 
            requiredError: field === 'titulares' ? requiredErrorTitulares : validationState.titulares.requiredError 
        });
        updateValidation('cuentas', { 
            error: errorCuentas, 
            showIcon: showIconCuentas, 
            requiredError: field === 'cuentas' ? requiredErrorCuentas : validationState.cuentas.requiredError 
        });
        
        return !(errorTitulares || errorCuentas);
    }
    
    // --- Validación cruzada Cumplimientos vs Negociaciones (bidireccional y limpieza de error) ---
    if (field === 'cumplimientos' || field === 'negociaciones') {
        const cumplimientosNum = Number(field === 'cumplimientos' ? value : allValues.cumplimientos) || 0;
        const negociacionesNum = Number(field === 'negociaciones' ? value : allValues.negociaciones) || 0;
        if (cumplimientosNum > 0 && negociacionesNum > 0 && cumplimientosNum > negociacionesNum) {
            setValidationState(prev => ({
                ...prev,
                cumplimientos: { ...prev.cumplimientos, error: 'Los cumplimientos deben ser menor o igual a las negociaciones', showIcon: true },
                negociaciones: { ...prev.negociaciones, error: 'Las negociaciones deben ser mayor o igual a los cumplimientos', showIcon: true }
            }));
            if (showToast) toast.warning('Los cumplimientos deben ser menor o igual a las negociaciones');
            return false;
        } else {
            setValidationState(prev => ({
                ...prev,
                cumplimientos: { ...prev.cumplimientos, error: false, showIcon: false },
                negociaciones: { ...prev.negociaciones, error: false, showIcon: false }
            }));
        }
    }
    let error = false;
    let showIcon = false;
    let requiredError = false;
    // Reglas por campo
    // Solo disparar validación cruzada negociaciones < titulares en onChange
    // El resto de validaciones pueden ir en ambos eventos
    switch (field) {
            case 'cuentas': {
                // Primero validar si es requerido
                if (value === '' || value === null || value === undefined) {
                    if (eventType === 'blur' || eventType === 'save') {
                        error = 'El campo Cuentas es requerido';
                        requiredError = true;
                        if (showToast) {
                            toast.warning('El campo Cuentas es requerido');
                        }
                    } else {
                        requiredError = false;
                    }
                } else {
                    requiredError = false;
                    if (!/^\d+$/.test(String(value))) {
                        error = 'Cuentas: debe ser un número entero';
                        showIcon = true;
                    }
                }
                
                updateValidation('cuentas', { error, showIcon, requiredError });
                
                // Validación cruzada: si titulares ya tiene valor, forzar validación en titulares solo si no venimos de titulares
                if (allValues.titulares !== undefined && allValues.titulares !== '' && lastCrossField.current !== 'titulares') {
                    lastCrossField.current = 'cuentas';
                    setTimeout(() => {
                        validateAndSetField('titulares', allValues.titulares, { ...allValues, cuentas: value }, false);
                        lastCrossField.current = null;
                    }, 0);
                }
                break;
            }
            case 'titulares': {
                // Primero validar si es requerido
                if (value === '' || value === null || value === undefined) {
                    if (eventType === 'blur' || eventType === 'save') {
                        error = 'El campo Titulares es requerido';
                        requiredError = true;
                        if (showToast) {
                            toast.warning('El campo Titulares es requerido');
                        }
                    } else {
                        requiredError = false;
                    }
                } else {
                    requiredError = false;
                    if (!/^\d+$/.test(String(value))) {
                        error = 'Titulares: debe ser un número entero';
                        showIcon = true;
                    }
                }
                
                updateValidation('titulares', { error, showIcon, requiredError });
                
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
                let errors = [];
                let reqError = false;
                let showIconNeg = false;
                
                // Primero validar si es requerido
                if (value === '' || value === null || value === undefined) {
                    if (eventType === 'blur' || eventType === 'save') {
                        errors.push({ msg: 'El campo Negociaciones es requerido' });
                        reqError = true;
                        // NO mostrar ícono para campo requerido, solo borde amarillo
                        showIconNeg = false;
                        if (showToast) {
                            toast.warning('El campo Negociaciones es requerido');
                        }
                    }
                } else {
                    const n = Number(value);
                    if (!Number.isInteger(n) || n < 0 || n > 255) {
                        errors.push({ msg: 'Negociaciones: debe estar entre 0 y 255' });
                        showIconNeg = true;
                    }
                    // Validación cruzada negociaciones < titulares
                    const titularesNum = Number(allValues.titulares) || 0;
                    if (n > 0 && titularesNum > 0 && n >= titularesNum) {
                        errors.push({ msg: 'Las negociaciones deben ser menor a los contactos con titulares' });
                        showIconNeg = true;
                    }
                    // Validación cruzada negociaciones >= cumplimientos
                    const cumplimientosNum = Number(allValues.cumplimientos) || 0;
                    if (cumplimientosNum > 0 && n > 0 && cumplimientosNum > n) {
                        errors.push({ msg: 'Las negociaciones deben ser mayor o igual a los cumplimientos' });
                        showIconNeg = true;
                    }
                }
                
                updateValidation('negociaciones', { errors, showIcon: showIconNeg, requiredError: reqError });
                
                // Validación cruzada: si cumplimientos ya tiene valor, forzar validación en cumplimientos solo si no venimos de cumplimientos
                if (allValues.cumplimientos !== undefined && allValues.cumplimientos !== '' && lastCrossField.current !== 'cumplimientos') {
                    lastCrossField.current = 'negociaciones';
                    setTimeout(() => {
                        validateAndSetField('cumplimientos', allValues.cumplimientos, { ...allValues, negociaciones: value }, false, eventType);
                        lastCrossField.current = null;
                    }, 0);
                }
                
                if (errors.length > 0 && showToast && !reqError) {
                    errors.forEach(e => toast.warning(e.msg));
                }
                break;
            }
            case 'cumplimientos': {
                if (value === '' || value === null) {
                    if (eventType === 'blur' || eventType === 'save') {
                        error = 'El campo Cumplimientos es requerido';
                        requiredError = true;
                        if (showToast) {
                            toast.warning('El campo Cumplimientos es requerido');
                        }
                    } else {
                        requiredError = false;
                    }
                } else {
                    requiredError = false;
                    const n = Number(value);
                    if (!Number.isInteger(n) || n < 0 || n > 255) {
                        error = 'Cumplimientos: debe estar entre 0 y 255';
                        showIcon = true;
                    }
                }
                
                updateValidation('cumplimientos', { error, showIcon, requiredError });
                
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
                    if (eventType === 'blur' || eventType === 'save') {
                        error = 'El campo Monto Cumplido es requerido';
                        requiredError = true;
                        if (showToast) {
                            toast.warning('El campo Monto Cumplido es requerido');
                        }
                    } else {
                        requiredError = false;
                    }
                } else {
                    requiredError = false;
                    if (!validateCurrencyInput(value)) {
                        error = 'Formato de moneda inválido en Monto Cumplido';
                        showIcon = true;
                    } else {
                        // Validación cruzada: monto debe ser menor que saldo
                        const monto = Number(parseCurrencyToNumber(value)) || 0;
                        const saldo = Number(parseCurrencyToNumber(allValues.saldoSolucionado)) || 0;
                        if (monto > 0 && saldo > 0 && monto >= saldo) {
                            error = 'El Monto Cumplido debe ser menor al Saldo Solucionado';
                            showIcon = true;
                        }
                    }
                }
                
                console.log('montoCumplido validation:', { error, showIcon, requiredError });
                updateValidation('montoCumplido', { error, showIcon, requiredError });
                
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
                if (value === '' || value === null || value === undefined) {
                    if (eventType === 'blur' || eventType === 'save') {
                        error = 'El campo Saldo Solucionado es requerido';
                        requiredError = true;
                        if (showToast) {
                            toast.warning('El campo Saldo Solucionado es requerido');
                        }
                    } else {
                        requiredError = false;
                    }
                } else {
                    requiredError = false;
                    if (!validateCurrencyInput(value)) {
                        error = 'Formato de moneda inválido en Saldo Solucionado';
                        showIcon = true;
                    } else {
                        // Validación cruzada: saldo debe ser mayor que monto
                        const monto = Number(parseCurrencyToNumber(allValues.montoCumplido)) || 0;
                        const saldo = Number(parseCurrencyToNumber(value)) || 0;
                        if (monto > 0 && saldo > 0 && monto >= saldo) {
                            error = 'El Saldo Solucionado debe ser mayor al Monto Cumplido';
                            showIcon = true;
                        }
                    }
                }
                
                console.log('saldoSolucionado validation:', { error, showIcon, requiredError });
                updateValidation('saldoSolucionado', { error, showIcon, requiredError });
                
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
                    if (eventType === 'blur' || eventType === 'save') {
                        error = 'El campo H. Entrada es requerido';
                        requiredError = true;
                        if (showToast) {
                            toast.warning('El campo H. Entrada es requerido');
                        }
                    } else {
                        requiredError = false;
                    }
                } else {
                    requiredError = false;
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
                
                console.log('horaEntrada validation:', { error, showIcon, requiredError });
                updateValidation('horaEntrada', { error, showIcon, requiredError });
                break;
            }
            case 'horaSalida': {
                if (value === '' || value === null) {
                    if (eventType === 'blur' || eventType === 'save') {
                        error = 'El campo H. Salida es requerido';
                        requiredError = true;
                        if (showToast) {
                            toast.warning('El campo H. Salida es requerido');
                        }
                    } else {
                        requiredError = false;
                    }
                } else {
                    requiredError = false;
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
                
                console.log('horaSalida validation:', { error, showIcon, requiredError });
                updateValidation('horaSalida', { error, showIcon, requiredError });
                break;
            }
            default:
                break;
        }
        
        // Validación cruzada Titulares vs Cuentas (DESPUÉS de validaciones individuales para no sobrescribir requiredError)
        if ((field === 'titulares' || field === 'cuentas') && eventType !== 'change') {
            const titularesValue = field === 'titulares' ? value : allValues.titulares;
            const cuentasValue = field === 'cuentas' ? value : allValues.cuentas;
            const titularesNum = Number(titularesValue) || 0;
            const cuentasNum = Number(cuentasValue) || 0;
            
            // Mantener requiredError si el campo está vacío
            let requiredErrorTitulares = false;
            let requiredErrorCuentas = false;
            
            if (field === 'titulares' && (value === '' || value === null || value === undefined)) {
                if (eventType === 'blur' || eventType === 'save') {
                    requiredErrorTitulares = true;
                }
            }
            
            if (field === 'cuentas' && (value === '' || value === null || value === undefined)) {
                if (eventType === 'blur' || eventType === 'save') {
                    requiredErrorCuentas = true;
                }
            }
            
            if (titularesNum > 0 && cuentasNum > 0 && titularesNum >= cuentasNum) {
                if (field === 'titulares') {
                    updateValidation('titulares', { error: 'Titulares debe ser menor que Cuentas', showIcon: true, requiredError: requiredErrorTitulares });
                }
                if (field === 'cuentas') {
                    updateValidation('cuentas', { error: 'Cuentas debe ser mayor que Titulares', showIcon: true, requiredError: requiredErrorCuentas });
                }
                if (showToast) {
                    toast.warning('Titulares debe ser menor que Cuentas');
                }
                return false;
            }
        }
        
        // Los casos del switch ya manejan updateValidation y toast individualmente
        return !error;
    };

    // Validar todos los campos requeridos y actualizar el estado centralizado
    const validateAllFields = (values = inputValues) => {
        const fields = ['cuentas', 'titulares', 'negociaciones', 'cumplimientos', 'montoCumplido', 'horaEntrada', 'horaSalida'];
        let allValid = true;
        fields.forEach(f => {
            // Usar 'save' como eventType para activar validación completa con requiredError
            const valid = validateAndSetField(f, values[f], values, true, 'save');
            if (!valid) allValid = false;
        });
        return allValid;
    };




    // Estado para los ejecutivos seleccionados desde la jerarquía (array)
    const [selectedExecutives, setSelectedExecutives] = useState([]); // array de idEjecutivo
    // Estado para el nodo actualmente seleccionado en la jerarquía (para iluminar solo uno)
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    // removed unused allSubordinateIds state (was declared but never read)
    const [allHierarchyIds] = useState([]); // ids de toda la jerarquía






    // Eliminado efecto de inicialización de executiveTree, ahora TreeMetas.jsx maneja la jerarquía

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
            const mensaje = `Se omitieron los siguientes usuarios por tener id inválido: ${idInvalidos.join(', ')}`;
            toast.warning(mensaje);
        }
        // Si el nodo seleccionado es el ejecutivo de la sesión, enviar TODOS los ids de la jerarquía
        const userDataForIds = JSON.parse(localStorage.getItem('userData'));
        const idEjecutivoSesionLocal = userDataForIds?.idEjecutivo || userDataForIds?.idejecutivo || userDataForIds?.id || null;

        let idsToSend = validIds.slice();
        if (selectedExecutiveNode && Number(selectedExecutiveNode) === Number(idEjecutivoSesionLocal) && Array.isArray(allHierarchyIds) && allHierarchyIds.length > 0) {
            idsToSend = allHierarchyIds.filter(id => Number.isInteger(Number(id)) && Number(id) > 0).map(Number);
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
                setError('Error al obtener la tabla de metas',e);
                setTablaMetas([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [selectedExecutives, allHierarchyIds, selectedExecutiveNode]);

    // Manejo de selección individual
    const handleRowCheckbox = (rowKey) => {
        setSelectedRows(prev =>
            prev.includes(rowKey)
                ? prev.filter(k => k !== rowKey)
                : [...prev, rowKey]
        );
        // Validar campos requeridos al seleccionar (sin segmento ni saldoSolucionado)
        const requiredFields = ['cuentas', 'titulares', 'negociaciones', 'cumplimientos', 'montoCumplido', 'horaEntrada', 'horaSalida'];
        const missingFields = requiredFields.filter(f => !inputValues[f] || inputValues[f] === '');
        if (missingFields.length > 0) {
            toast.warning('Faltan campos requeridos por llenar.');
        }
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
                // Refrescar la tabla manteniendo el orden original
                try {
                    const prevOrder = tablaMetas.map(row => row.idEjecutivo || row.id || row.usuario);
                    const dataArr = await Promise.all(selectedExecutives.map(id => obetenerTablaMetas(id)));
                    let newMetas = dataArr.flat().filter(Boolean);
                    // Reordenar según el orden anterior
                    if (prevOrder.length > 0) {
                        newMetas = prevOrder
                            .map(key => newMetas.find(row => (row.idEjecutivo || row.id || row.usuario) === key))
                            .filter(Boolean);
                    }
                    setTablaMetas(newMetas);
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
            // Refrescar la tabla manteniendo el orden original
            try {
                // Refrescar la tabla usando los ids seleccionados y toda la jerarquía si corresponde
                const prevOrder = tablaMetas.map(row => row.idEjecutivo || row.id || row.usuario);
                let idsToRefresh = [];
                if (selectedExecutiveNode && Array.isArray(allHierarchyIds) && allHierarchyIds.length > 0) {
                    idsToRefresh = allHierarchyIds;
                } else {
                    idsToRefresh = selectedExecutives;
                }
                const dataArr = await Promise.all(idsToRefresh.map(id => obetenerTablaMetas(id)));
                let newMetas = dataArr.flat().filter(Boolean);
                // Reordenar según el orden anterior
                if (prevOrder.length > 0) {
                    newMetas = prevOrder
                        .map(key => newMetas.find(row => (row.idEjecutivo || row.id || row.usuario) === key))
                        .filter(Boolean);
                    // Agregar los que no estaban antes (nuevos subordinados)
                    const nuevos = newMetas.filter(row => !prevOrder.includes(row.idEjecutivo || row.id || row.usuario));
                    newMetas = newMetas.concat(nuevos);
                }
                setTablaMetas(newMetas);
            } catch {
                toast.error('Error al refrescar la tabla de metas');
                setTablaMetas([]);
            }
        } catch (e) {
            toast.error('Error al guardar metas: ' + (e?.message || e));
        }
    };

    return (
        <div
            className="metas-responsive-blocks w-full flex flex-col lg:flex-row gap-3"
            style={{
                maxHeight: windowWidth >= 1024 ? '100vh' : 'none',
                overflowY: windowWidth >= 1024 ? 'auto' : 'visible',
                minHeight: 0
            }}
        >
            {/* Bloque 1: Jerarquía - En lg+: lateral izquierdo, en <lg: altura auto */}
            <div
                className="w-full lg:w-auto lg:min-w-[200px] lg:max-w-[28vw] shrink-0"
                style={{
                    maxHeight:
                        windowWidth >= 1280
                            ? '100vh'
                            : windowWidth >= 1024
                                ? '100vh'
                                : '40vh',
                    overflowY: 'auto',
                    minHeight: 0
                }}
            >
                <TreeMetas
                    setSelectedExecutives={setSelectedExecutives}
                    setSelectedRows={setSelectedRows}
                    selectedExecutiveNode={selectedExecutiveNode}
                    setSelectedExecutiveNode={setSelectedExecutiveNode}
                />
            </div>

            {/* Bloque 2: Inputs + Tabla */}
            <div className="flex-1 flex flex-col min-w-0 w-full gap-3" style={{minHeight: 0}}>
                {/* Fila de inputs */}
                <div className="w-full shrink-0">
                    <div className="bg-white rounded-lg p-2 sm:p-3 shadow border border-[var(--color-jerarquia1)] w-full">
                        {/* Grid responsive: xs=1col, sm=2cols, md=3cols, lg+=5cols */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
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
                                                        onBlur={e => {
                                                            const v = e.target.value;
                                                            validateAndSetField('cuentas', v, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-cuentas"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.cuentas.error === 'string' && validationState.cuentas.showIcon && (
                                                            WarningIcon(validationState.cuentas.error, () => toast.warning(validationState.cuentas.error))
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
                                                        onBlur={e => {
                                                            const v = e.target.value;
                                                            validateAndSetField('titulares', v, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-titulares"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.titulares.error === 'string' && validationState.titulares.showIcon && (
                                                            WarningIcon(validationState.titulares.error, () => toast.warning(validationState.titulares.error))
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
                                                            validateAndSetField('negociaciones', inputValues.negociaciones, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-negociaciones"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {Array.isArray(validationState.negociaciones.errors) && validationState.negociaciones.showIcon && validationState.negociaciones.errors.map((err, idx) => (
                                                            <TooltipIcon key={idx} message={err.msg} />
                                                        ))}
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
                                                            validateAndSetField('cumplimientos', inputValues.cumplimientos, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-cumplimientos"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {typeof validationState.cumplimientos.error === 'string' && validationState.cumplimientos.showIcon && (
                                                            WarningIcon(validationState.cumplimientos.error, () => toast.warning(validationState.cumplimientos.error))
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
                                                            validateAndSetField('montoCumplido', inputValues.montoCumplido, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-montoCumplido"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {validationState.montoCumplido.showIcon && (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" 
                                                                height="18" 
                                                                viewBox="0 0 24 24" 
                                                                className="text-yellow-500 mr-1 cursor-pointer" 
                                                                title={validationState.montoCumplido.error}
                                                                onClick={() => toast.warning('Error en Monto Cumplido: ' + validationState.montoCumplido.error)}
                                                            >
                                                                <path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/>
                                                            </svg>
                                                        )}
                                                        Monto Cumplido
                                                    </label>
                                                </div>
                                            </div>
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
                                                            validateAndSetField('saldoSolucionado', inputValues.saldoSolucionado, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-saldoSolucionado"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {validationState.saldoSolucionado.showIcon && (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" 
                                                                height="18" 
                                                                viewBox="0 0 24 24" 
                                                                className="text-yellow-500 mr-1 cursor-pointer" 
                                                                title={validationState.saldoSolucionado.error}
                                                                onClick={() => toast.warning('Error en Saldo Solucionado: ' + validationState.saldoSolucionado.error)}
                                                            >
                                                                <path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/>
                                                            </svg>
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
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
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
                                                            validateAndSetField('horaEntrada', inputValues.horaEntrada, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-horaEntrada"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {validationState.horaEntrada.showIcon && (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" 
                                                                height="18" 
                                                                viewBox="0 0 24 24" 
                                                                className="text-yellow-500 mr-1 cursor-pointer" 
                                                                title={validationState.horaEntrada.error}
                                                                onClick={() => toast.warning('Error en Hora Entrada: ' + validationState.horaEntrada.error)}
                                                            >
                                                                <path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/>
                                                            </svg>
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
                                                            validateAndSetField('horaSalida', inputValues.horaSalida, inputValues, true, 'blur');
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="input-horaSalida"
                                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs flex items-center gap-1 peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
                                                    >
                                                        {validationState.horaSalida.showIcon && (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" 
                                                                height="18" 
                                                                viewBox="0 0 24 24" 
                                                                className="text-yellow-500 mr-1 cursor-pointer" 
                                                                title={validationState.horaSalida.error}
                                                                onClick={() => toast.warning('Error en Hora Salida: ' + validationState.horaSalida.error)}
                                                            >
                                                                <path fill="currentColor" d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99zM12 6c2.76 0 5 2.24 5 5v7H7v-7c0-2.76 2.24-5 5-5m0-4.5c-.83 0-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5M11 8h2v4h-2zm0 6h2v2h-2z"/>
                                                            </svg>
                                                        )}
                                                        Hora Salida
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Botón Guardar */}
                                            <div className="w-full flex items-end">
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
                                                            className={`btn-success w-full px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center${isDisabled ? ' opacity-50 cursor-not-allowed' : ''}`}
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
                </div>

                {/* Tabla - ocupa el espacio restante con scroll y altura máxima */}
                <div
                    className="flex-1 min-h-[250px] w-full lg:overflow-hidden overflow-x-auto"
                    style={{
                        maxHeight:
                            windowWidth >= 1280
                                ? '100vh'
                                : windowWidth >= 1024
                                    ? '100vh'
                                    : '50vh',
                        overflowY: 'auto',
                        minHeight: 0
                    }}
                >
                    <TableMetas
                        tablaMetas={tablaMetas}
                        loading={loading}
                        error={error}
                        selectedRows={selectedRows}
                        selectAll={selectAll}
                        handleSelectAll={handleSelectAll}
                        handleRowCheckbox={handleRowCheckbox}
                        formatCurrencyForDisplay={formatCurrencyForDisplay}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalMetasContent;