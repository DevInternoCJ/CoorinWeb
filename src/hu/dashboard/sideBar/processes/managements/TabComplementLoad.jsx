//carga complemento
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { ManagmentLoadFile } from '../../../../../services/mark/orochi/LokiServices';

const TabComplementLoad = () => {
    const [cartera, setCartera] = useState('');
    const [rutaArchivo, setRutaArchivo] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [fileHeaders, setFileHeaders] = useState([]);
    const [numColumnas, setNumColumnas] = useState(0);
    const [numFilas, setNumFilas] = useState(0);
    const [validationMessage, setValidationMessage] = useState('');
    const [isValidFormat, setIsValidFormat] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Campos esperados en el archivo Excel (tal cual vienen)
    const camposEsperadosExcel = [
        'Cuenta',
        'FechaGestion',
        'HoraGestion',
        'ClaveEjecutivo',
        'Contacto',
        'Comentario',
        'Telefono',
        'Sucursal',
        'Extension',
        'Duracion'
    ];

    // Mapeo de campos Excel a nombres de visualización en el front
    const camposMapping = {
        'Cuenta': 'Cuenta',
        'FechaGestion': 'Fecha Ges.',
        'HoraGestion': 'Hora Ges',
        'ClaveEjecutivo': 'Clv. Ejecutivo',
        'Contacto': 'Contacto',
        'Comentario': 'Comentario',
        'Telefono': 'Teléfono',
        'Sucursal': 'Sucursal',
        'Extension': 'Extensión',
        'Duracion': 'Duración'
    };

    const validateHeaders = (headers) => {
        const headersNormalized = headers.map(h => String(h).trim());
        const camposNormalized = camposEsperadosExcel.map(c => c.trim());
        
        const missingFields = camposNormalized.filter(campo => !headersNormalized.includes(campo));
        const extraFields = headersNormalized.filter(header => !camposNormalized.includes(header));
        
        if (missingFields.length > 0 || extraFields.length > 0) {
            let message = 'Los campos esperados no coinciden.\n';
            if (missingFields.length > 0) {
                message += `Campos faltantes: ${missingFields.join(', ')}.\n`;
            }
            if (extraFields.length > 0) {
                message += `Campos extras: ${extraFields.join(', ')}.`;
            }
            return { valid: false, message };
        }
        
        return { valid: true, message: '' };
    };

    const validateFieldValue = (campo, valor, rowIndex) => {
        const errors = [];
        const val = valor ? String(valor).trim() : '';

        // Todos los campos son obligatorios
        if (!val) {
            errors.push(`Fila ${rowIndex + 2}: ${campo} es obligatorio`);
            return errors;
        }

        switch (campo) {
            case 'Cuenta':
                // Verificar que no contenga espacios
                if (/\s/.test(val)) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} no puede contener espacios`);
                }
                // Verificar longitud máxima de 16 caracteres
                if (val.length > 16) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} no puede exceder 16 caracteres (tiene ${val.length})`);
                }
                // Verificar que solo contenga números
                if (!/^\d+$/.test(val)) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} debe contener solo números`);
                }
                break;

            case 'FechaGestion':
                // Formato dd/mm/aaaa
                if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} debe tener formato dd/mm/aaaa`);
                }
                break;

            case 'HoraGestion': {
                // Formato 12h (hh:mm am/pm) o 24h (hh:mm)
                const is12Hour = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm|AM|PM)$/.test(val);
                const is24Hour = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val);
                if (!is12Hour && !is24Hour) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} debe tener formato hh:mm am/pm o hh:mm (24h)`);
                }
                break;
            }

            case 'ClaveEjecutivo':
                // Exactamente 4 caracteres
                if (val.length !== 4) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} debe tener exactamente 4 caracteres`);
                }
                break;

            case 'Contacto':
                // Solo catálogo (validación básica, se puede extender)
                if (val.length > 100) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} no debe exceder 100 caracteres`);
                }
                break;

            case 'Comentario':
                // Longitud máxima 8000 caracteres
                if (val.length > 8000) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} no debe exceder 8000 caracteres (tiene ${val.length})`);
                }
                break;

            case 'Telefono':
                // 10 dígitos, solo números
                if (!/^\d{10}$/.test(val)) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} debe tener exactamente 10 dígitos`);
                }
                break;

            case 'Sucursal':
                // Solo catálogo (validación básica)
                if (val.length > 50) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} no debe exceder 50 caracteres`);
                }
                break;

            case 'Extension':
                // 4 dígitos, solo números (acepta 0000)
                // Convertir a string y rellenar con ceros si es necesario
                let extension = String(valor).trim();
                // Si es un número, asegurarse de que tenga 4 dígitos
                if (/^\d+$/.test(extension)) {
                    extension = extension.padStart(4, '0');
                }
                if (!/^\d{4}$/.test(extension)) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} debe tener exactamente 4 dígitos (ejemplo: 0000, 1234)`);
                }
                break;

            case 'Duracion':
                // Formato hh:mm:ss (00:05:15)
                if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(val)) {
                    errors.push(`Fila ${rowIndex + 2}: ${campo} debe tener formato hh:mm:ss (ejemplo: 00:05:15)`);
                }
                break;

            default:
                break;
        }

        return errors;
    };

    const validateAllData = (data) => {
        const allErrors = [];
        
        data.forEach((row, index) => {
            camposEsperadosExcel.forEach(campo => {
                const errors = validateFieldValue(campo, row[campo], index);
                allErrors.push(...errors);
            });
        });

        return allErrors;
    };

    const processFileData = (data, headers) => {
        setFileHeaders(headers);
        setFileData(data);
        setNumColumnas(headers.length);
        setNumFilas(data.length);

        // Validar que tenga exactamente 10 columnas
        if (headers.length !== 10) {
            setIsValidFormat(false);
            setValidationMessage(`El archivo tiene ${headers.length} columnas, pero se esperan exactamente 10 columnas.`);
            toast.error(`El archivo tiene ${headers.length} columnas, pero se esperan exactamente 10 columnas.`, { duration: 8000 });
            console.error('Columnas recibidas:', headers);
            console.error('Columnas esperadas:', camposEsperadosExcel);
            return;
        }

        const validation = validateHeaders(headers);
        
        if (!validation.valid) {
            setIsValidFormat(false);
            setValidationMessage(validation.message);
            toast.warning(validation.message);
            return;
        }

        // Validar datos de las filas
        const dataErrors = validateAllData(data);
        
        if (dataErrors.length > 0) {
            setIsValidFormat(false);
            // Mostrar los primeros 5 errores
            const errorsToShow = dataErrors.slice(0, 5);
            errorsToShow.forEach(error => {
                toast.warning(error, { duration: 6000 });
            });
            
            if (dataErrors.length > 5) {
                toast.warning(`... y ${dataErrors.length - 5} errores más. Revise los datos antes de cargar.`, { duration: 6000 });
            }
            
            console.warn('Todos los errores de validación:', dataErrors);
            setValidationMessage(`Se encontraron ${dataErrors.length} errores de validación.`);
        } else {
            setIsValidFormat(true);
            setValidationMessage('');
            toast.success(`Archivo válido: ${data.length} filas cargadas correctamente con ${headers.length} columnas.`);
        }
    };

    const handleFileSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv,.xlsx,.xls';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setRutaArchivo(file.name);
                setArchivo(file);
                
                // Procesar cualquier archivo (CSV, Excel) con XLSX
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                        
                        if (jsonData.length > 0) {
                            const headers = jsonData[0].map(h => String(h).trim());
                            const rows = jsonData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== ''));
                            
                            const dataObjects = rows.map(row => {
                                const obj = {};
                                headers.forEach((header, index) => {
                                    obj[header] = row[index] !== undefined ? row[index] : '';
                                });
                                return obj;
                            });
                            
                            processFileData(dataObjects, headers);
                        } else {
                            toast.warning('El archivo está vacío o no contiene datos válidos.');
                        }
                    } catch (error) {
                        toast.warning('Error al leer el archivo: ' + error.message);
                    }
                };
                reader.readAsArrayBuffer(file);
            }
        };
        input.click();
    };

    const handleCargar = async () => {
        if (!isValidFormat) {
            toast.warning('No se puede cargar el archivo. Los campos no coinciden con el formato esperado.');
            return;
        }
        
        if (fileData.length === 0) {
            toast.warning('No hay datos para cargar.');
            return;
        }
        
        if (!cartera) {
            toast.warning('Por favor seleccione una cartera.');
            return;
        }

        if (!archivo) {
            toast.warning('No se ha seleccionado un archivo.');
            return;
        }
        
        try {
            setIsLoading(true);
            console.log('[Archivo] Iniciando carga de gestiones complemento. Archivo:', archivo);
            toast.loading('Cargando gestiones complemento...', { id: 'cargar-loading' });

            const userData = JSON.parse(localStorage.getItem('userData'));
            const idEjecutivo = userData?.idEjecutivo || 0;
            
            // Usar la cartera seleccionada en el select, no la de localStorage
            const idCarteraSeleccionada = parseInt(cartera, 10);
            
            if (!idCarteraSeleccionada || isNaN(idCarteraSeleccionada)) {
                toast.dismiss('cargar-loading');
                toast.warning('El ID de cartera seleccionado no es válido.');
                setIsLoading(false);
                return;
            }

            const body = {
                Archivo: archivo,
                IdCartera: idCarteraSeleccionada,
                IdEjecutivo: idEjecutivo
            };

            console.log('[Archivo] Body enviado a ManagmentLoadFile:', body);
            const result = await ManagmentLoadFile(body);
            console.log('[Archivo] Respuesta recibida:', result);

            toast.dismiss('cargar-loading');

            // Procesar respuesta como JSON
            if (result.data instanceof ArrayBuffer) {
                try {
                    const decoder = new TextDecoder('utf-8');
                    const text = decoder.decode(result.data);
                    const json = JSON.parse(text);
                    
                    console.log('[Archivo] JSON parseado:', json);

                    if (json.success) {
                        // Mostrar mensaje de éxito con estadísticas
                        const mensaje = `✅ ${json.message || 'Carga completada'}\n` +
                                       `📊 Total: ${json.total || 0} | ` +
                                       `✔️ Insertados: ${json.insertados || 0} | ` +
                                       `❌ Incorrectos: ${json.incorrectos || 0}`;
                        
                        toast.success(mensaje, { duration: 5000 });

                        // Si hay errores, mostrarlos
                        if (json.errores && json.errores.length > 0) {
                            console.warn('[Archivo] Errores encontrados:', json.errores);
                            toast.warning(`Se encontraron ${json.errores.length} errores. Revise la consola para más detalles.`);
                        }

                        // Limpiar el formulario después de carga exitosa
                        setArchivo(null);
                        setRutaArchivo('');
                        setFileData([]);
                        setFileHeaders([]);
                        setNumColumnas(0);
                        setNumFilas(0);
                        setIsValidFormat(true);
                    } else {
                        // Error en la carga
                        const errorMsg = json.message || 'Error al cargar las gestiones complemento.';
                        toast.error(errorMsg, { duration: 6000 });
                        
                        if (json.errores && json.errores.length > 0) {
                            console.error('[Archivo] Errores:', json.errores);
                            // Mostrar el primer error detallado si existe
                            if (json.errores[0]) {
                                toast.warning(`Detalle: ${json.errores[0]}`, { duration: 6000 });
                            }
                        }
                    }
                } catch (error) {
                    console.error('[Archivo] Error al procesar respuesta JSON:', error);
                    toast.error('Error al procesar la respuesta del servidor.');
                }
            } else if (result.data) {
                // Si la respuesta ya es un objeto
                if (result.data.success) {
                    const mensaje = ` ${result.data.message || 'Carga completada'}\n` +
                                   ` Total: ${result.data.total || 0} | ` +
                                   ` Insertados: ${result.data.insertados || 0} | ` +
                                   ` Incorrectos: ${result.data.incorrectos || 0}`;
                    
                    toast.success(mensaje, { duration: 5000 });

                    // Limpiar el formulario
                    setArchivo(null);
                    setRutaArchivo('');
                    setFileData([]);
                    setFileHeaders([]);
                    setNumColumnas(0);
                    setNumFilas(0);
                    setIsValidFormat(true);
                } else {
                    const errorMsg = result.data.message || 'Error al cargar las gestiones complemento.';
                    toast.error(errorMsg, { duration: 6000 });
                    
                    if (result.data.errores && result.data.errores.length > 0) {
                        console.error('[Archivo] Errores:', result.data.errores);
                        if (result.data.errores[0]) {
                            toast.warning(`Detalle: ${result.data.errores[0]}`, { duration: 6000 });
                        }
                    }
                }
            } else {
                toast.error('Formato de respuesta no esperado.');
            }
        } catch (error) {
            console.error('[Archivo] Error al cargar gestiones complemento:', error);
            toast.dismiss('cargar-loading');
            
            // Extraer mensaje de error más específico si está disponible
            let errorMessage = 'Error al cargar gestiones complemento.';
            if (error.response?.data) {
                try {
                    const errorData = typeof error.response.data === 'string' 
                        ? JSON.parse(error.response.data) 
                        : error.response.data;
                    errorMessage = errorData.message || errorData.Message || errorMessage;
                } catch {
                    errorMessage = error.response.data.toString().substring(0, 200);
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            toast.error(errorMessage, { duration: 6000 });
        } finally {
            setIsLoading(false);
            console.log('[Archivo] Carga de gestiones complemento finalizada');
        }
    };

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Primera fila con select, input y botón */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                {/* Select Cartera */}
                <div className="relative flex-1">
                    <select
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cartera-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="1">Cartera 1</option>
                        <option value="2">Cartera 2</option>
                        <option value="3">Cartera 3</option>
                        <option value="4">Cartera 4</option>
                        <option value="31">Cartera 31</option>
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>

                {/* Input con botón anidado */}
                <div className="relative flex-[2]">
                    <input
                        type="text"
                        value={rutaArchivo}
                        readOnly
                        className="peer p-4 pr-24 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="archivo-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="archivo-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Archivo
                    </label>
                    <button
                        type="button"
                        onClick={handleFileSelect}
                        className="btn-info absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-medium rounded"
                    >
                        Archivo
                    </button>
                </div>
            </div>

            {/* Tabla con datos o mensaje */}
            <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden">
                <div
                    className="scrollbar-gray w-full flex-1"
                    style={{
                        overflowY: 'auto',
                        maxHeight:
                            window.innerWidth >= 1280 && window.innerWidth < 1536
                                ? '40vh'
                                : window.innerWidth >= 1024
                                    ? '40vh'
                                    : '50vh',
                        minHeight: '0'
                    }}
                >
                    <table className="modal-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Cuenta</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Fecha Ges.</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Hora Ges</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Clv. Ejecutivo</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Contacto</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Comentario</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Teléfono</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Sucursal</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Extensión</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Duración</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.length === 0 ? (
                                <tr style={{ height: '210px' }}>
                                    <td colSpan="10" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '8px' }}>
                                        <span>Aún no se carga Archivo</span>
                                    </td>
                                </tr>
                            ) : (
                                fileData.map((row, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['Cuenta'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['FechaGestion'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['HoraGestion'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['ClaveEjecutivo'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['Contacto'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['Comentario'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['Telefono'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['Sucursal'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['Extension'] || ''}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row['Duracion'] || ''}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Barra inferior con contadores y botón */}
                {fileData.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
                        {/* Columnas (izquierda) */}
                        <div className="flex-1 text-left">
                            <span className="text-sm font-medium text-gray-700">
                                {numColumnas} Columnas
                            </span>
                        </div>

                        {/* Botón Cargar (centro) */}
                        <div className="flex-1 flex justify-center">
                            <button
                                type="button"
                                onClick={handleCargar}
                                className="btn-success px-6 py-2 text-sm font-medium rounded"
                                disabled={!isValidFormat || isLoading}
                                style={{ 
                                    opacity: (!isValidFormat || isLoading) ? 0.5 : 1, 
                                    cursor: (!isValidFormat || isLoading) ? 'not-allowed' : 'pointer' 
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: "16px",
                                                height: "16px",
                                                border: "2px solid #ffffff",
                                                borderTop: "2px solid transparent",
                                                borderRadius: "50%",
                                                animation: "spin 1s linear infinite",
                                                marginRight: "8px",
                                            }}
                                        ></span>
                                        Cargando...
                                    </>
                                ) : (
                                    "Cargar"
                                )}
                            </button>
                        </div>

                        {/* Filas (derecha) */}
                        <div className="flex-1 text-right">
                            <span className="text-sm font-medium text-gray-700">
                                {numFilas} Filas
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabComplementLoad;