import * as XLSX from 'xlsx';
/**
 * Exporta datos a Excel (.xlsx) con ajuste automático de ancho de columna
 * @param {Array} data - Array de objetos con los datos
 * @param {string} filename - Nombre del archivo (sin extensión)
 * @param {Object} options - Opciones de configuración
 */
export const exportDataToXLSX = (data, filename = 'export', options = {}) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        toast.warning('No hay datos para exportar.');
        return false;
    }
    const ws = XLSX.utils.json_to_sheet(data);
    // Calcular el ancho máximo de cada columna
    const keys = Object.keys(data[0]);
    const cols = keys.map(key => {
        const maxLen = Math.max(
            key.length,
            ...data.map(row => (row[key] ? row[key].toString().length : 0))
        );
        return { wch: maxLen + 2 };
    });
    ws['!cols'] = cols;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, filename + '.xlsx');
    toast.success('Archivo Excel exportado correctamente.');
    return true;
};
/**
 * ExcelExporter - Componente maestro para exportar datos a Excel/CSV
 * 
 * Uso:
 * import { exportToCSV, exportDataToCSV, formatValueForCSV } from '../utils/ExcelExporter';
 * 
 * // Exportar datos directamente
 * exportDataToCSV(data, 'mi_archivo', { dateFields: ['fecha'], currencyFields: ['monto'] });
 * 
 * // Exportar con configuración personalizada
 * exportToCSV({
 *   data: misDatos,
 *   filename: 'reporte',
 *   headers: ['col1', 'col2'],
 *   dateFields: ['fechaPago'],
 *   currencyFields: ['monto'],
 *   accountFields: ['cuenta'],
 *   onSuccess: () => toast.success('Exportado'),
 *   onError: (err) => toast.error('Error')
            const result = exportDataToXLSX(data, filename, exportOptions);
 */

import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Formatea un valor para CSV según su tipo
 * @param {any} value - Valor a formatear
 * @param {string} fieldName - Nombre del campo
 * @param {Object} options - Opciones de formato
 * @returns {string} Valor formateado para CSV
 */
export const formatValueForCSV = (value, fieldName, options = {}) => {
    const {
        dateFields = [],
        currencyFields = [],
        accountFields = [],
        textFields = [] // eslint-disable-line no-unused-vars
    } = options;

    const fieldLower = fieldName.toLowerCase();

    // Campos nulos o undefined
    if (value === null || value === undefined) {
        return '';
    }

    // Campos de cuenta (evitar notación científica)
    if (accountFields.some(f => fieldLower.includes(f.toLowerCase())) || fieldLower.includes('cuenta')) {
        if (typeof value === 'number') {
            return `\t"${value.toString()}"`;
        }
        if (typeof value === 'string') {
            return `\t"${value.replace(/,/g, '').replace(/"/g, '')}"`;
        }
    }

    // Campos de fecha (limpiar T00:00:00)
    if (dateFields.some(f => fieldLower.includes(f.toLowerCase())) || fieldLower.includes('fecha')) {
        if (typeof value === 'string') {
            return value.replace(/T00:00:00$/, '').replace(/,/g, '');
        }
    }

    // Campos de moneda (agregar $)
    if (currencyFields.some(f => fieldLower.includes(f.toLowerCase())) || 
        fieldLower.includes('monto') || fieldLower.includes('saldo')) {
        if (value !== undefined && value !== null) {
            const numValue = typeof value === 'string' ? parseFloat(value.replace(/[,$]/g, '')) : value;
            if (!isNaN(numValue)) {
                return `$${numValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
        }
    }

    // Campos de texto general
    if (typeof value === 'string') {
        let formatted = value.replace(/,/g, ''); // Quitar comas
        formatted = formatted.replace(/"/g, '""'); // Escapar comillas dobles
        // Envolver en comillas si contiene caracteres especiales
        if (/[",\s\nñáéíóúüÑÁÉÍÓÚÜ]/i.test(formatted)) {
            formatted = `"${formatted}"`;
        }
        return formatted;
    }

    // Números y otros tipos
    return String(value);
};

/**
 * Genera el contenido CSV a partir de datos
 * @param {Array} data - Array de objetos con los datos
 * @param {Object} options - Opciones de configuración
 * @returns {string} Contenido CSV con BOM para UTF-8
 */
export const generateCSVContent = (data, options = {}) => {
    const {
        headers = null,
        customHeaders = null, // Headers personalizados para mostrar
        dateFields = [],
        currencyFields = [],
        accountFields = [],
        textFields = []
    } = options;

    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No hay datos para exportar');
    }

    // Obtener headers de los datos si no se especifican
    const dataHeaders = headers || Object.keys(data[0]);
    const displayHeaders = customHeaders || dataHeaders;

    // Generar filas
    const rows = data.map(obj => 
        dataHeaders.map(h => formatValueForCSV(obj[h], h, {
            dateFields,
            currencyFields,
            accountFields,
            textFields
        })).join(',')
    );

    // BOM para UTF-8 + headers + filas
    return '\uFEFF' + displayHeaders.join(',') + '\n' + rows.join('\n');
};

/**
 * Descarga un archivo CSV
 * @param {string} csvContent - Contenido del CSV
 * @param {string} filename - Nombre del archivo (sin extensión)
 */
export const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

/**
 * Exporta datos a CSV con configuración completa
 * @param {Object} config - Configuración de exportación
 */
export const exportToCSV = (config) => {
    const {
        data,
        filename = 'export',
        headers = null,
        customHeaders = null,
        dateFields = [],
        currencyFields = [],
        accountFields = [],
        textFields = [],
        onSuccess = null,
        onError = null,
        showToast = true,
        successMessage = 'Archivo exportado correctamente. Ábrelo en Excel para visualizarlo.',
        errorMessage = 'Error al exportar el archivo.'
    } = config;

    try {
        if (!data || data.length === 0) {
            if (showToast) {
                toast.warning('No hay datos para exportar.');
            }
            if (onError) onError(new Error('No hay datos para exportar'));
            return false;
        }

        const csvContent = generateCSVContent(data, {
            headers,
            customHeaders,
            dateFields,
            currencyFields,
            accountFields,
            textFields
        });

        downloadCSV(csvContent, filename);

        if (showToast) {
            toast.success(successMessage);
        }
        if (onSuccess) onSuccess();
        return true;

    } catch (error) {
        console.error('Error al exportar CSV:', error);
        if (showToast) {
            toast.error(errorMessage);
        }
        if (onError) onError(error);
        return false;
    }
};

/**
 * Función simplificada para exportar datos rápidamente
 * @param {Array} data - Datos a exportar
 * @param {string} filename - Nombre del archivo
 * @param {Object} options - Opciones adicionales
 */
export const exportDataToCSV = (data, filename = 'export', options = {}) => {
    return exportToCSV({
        data,
        filename,
        ...options
    });
};

/**
 * Procesa respuesta de API que puede ser Blob o JSON
 * @param {Object} response - Respuesta de la API
 * @param {Object} options - Opciones de procesamiento
 * @returns {Promise<Array>} Datos procesados como array
 */
export const processAPIResponse = async (response, options = {}) => {
    const { consultaName = 'Consulta' } = options;

    // Si la respuesta es un array directo
    if (Array.isArray(response)) {
        if (response.length === 0) {
            toast.warning(`${consultaName} no cuenta con registros.`, { duration: 4000 });
            return null;
        }
        return response;
    }

    // Si tiene propiedad data como array
    if (response?.data && Array.isArray(response.data)) {
        if (response.data.length === 0) {
            toast.warning(`${consultaName} no cuenta con registros.`, { duration: 4000 });
            return null;
        }
        return response.data;
    }

    // Si data es un Blob
    if (response?.data instanceof Blob) {
        try {
            const text = await response.data.text();
            const json = JSON.parse(text);
            
            if (Array.isArray(json)) {
                if (json.length === 0) {
                    toast.warning(`${consultaName} no cuenta con registros.`, { duration: 4000 });
                    return null;
                }
                return json;
            }
            
            // Si es un objeto con mensaje de error
            if (json?.mensaje) {
                toast.warning(json.mensaje, { duration: 4000 });
                return null;
            }
            
            return [json]; // Objeto único, convertir a array
        } catch {
            // No es JSON, podría ser CSV directo
            const text = await response.data.text();
            return { rawCSV: text };
        }
    }

    // Si es un objeto único
    if (response && typeof response === 'object' && !Array.isArray(response)) {
        return [response];
    }

    return null;
};

/**
 * Exporta directamente desde una respuesta de API
 * @param {Object} response - Respuesta de la API
 * @param {string} filename - Nombre del archivo
 * @param {Object} options - Opciones de exportación
 */
// ...existing code...

    export const exportFromAPIResponse = async (response, filename, options = {}) => {
        const {
            consultaName = 'Consulta',
            showToast = true,
            successMessage = 'Archivo exportado correctamente.',
            errorMessage = 'Error al exportar los datos, verifique la conexión a internet.',
            ...exportOptions
        } = options;

        let loadingToast;
        if (showToast) {
            loadingToast = toast.loading("Exportando datos...", { duration: Infinity });
        }

        try {
            const data = await processAPIResponse(response, { consultaName });

            if (!data) {
                if (showToast) toast.dismiss(loadingToast);
                return false;
            }

            // Si es CSV raw, intentar convertir a objeto para exportar a XLSX
            if (data.rawCSV) {
                // Intentar convertir CSV a JSON
                const rows = data.rawCSV.split('\n').map(row => row.split(','));
                const headers = rows[0];
                const jsonData = rows.slice(1).map(row => {
                    const obj = {};
                    headers.forEach((h, i) => {
                        obj[h] = row[i];
                    });
                    return obj;
                });
                const result = exportDataToXLSX(jsonData, filename, exportOptions);
                if (showToast) {
                    toast.dismiss(loadingToast);
                    if (result) {
                        toast.success(successMessage);
                    }
                }
                return result;
            }

            // Exportar a XLSX siempre
            const result = exportDataToXLSX(data, filename, exportOptions);

            if (showToast) {
                toast.dismiss(loadingToast);
                if (result) {
                    toast.success(successMessage);
                }
            }
            return result;

        } catch (error) {
            if (showToast) {
                toast.dismiss(loadingToast);
                toast.error(errorMessage);
            }
            return false;
        }
    };

/**
 * Hook personalizado para manejar exportación con estado
 * @returns {Object} Estados y funciones para exportación
 */
export const useExcelExport = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const exportWithState = async (exportFn) => {
        setLoading(true);
        setError(null);
        try {
            const result = await exportFn();
            return result;
        } catch (err) {
            setError(err.message || 'Error al exportar');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        exportWithState,
        exportToCSV: (config) => exportWithState(() => exportToCSV(config)),
        exportDataToCSV: (data, filename, options) => exportWithState(() => exportDataToCSV(data, filename, options)),
        exportFromAPIResponse: (response, filename, options) => exportWithState(() => exportFromAPIResponse(response, filename, options))
    };
};

export default {
    exportToCSV,
    exportDataToCSV,
    generateCSVContent,
    downloadCSV,
    formatValueForCSV,
    processAPIResponse,
    exportFromAPIResponse,
    useExcelExport
};
