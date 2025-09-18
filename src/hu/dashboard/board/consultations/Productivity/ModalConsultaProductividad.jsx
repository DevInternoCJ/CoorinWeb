import React, { useState, useEffect } from "react";
import ModalProductividadHeader from "./ModalProductividadHeader";
import ModalProductividadContent from "./ModalProductividadContent";
import ModalProductividadFooter from "./ModalProductividadFooter";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";
import { getProductivity } from '../../../../../services/LokiServices';

// Flecha tipo chevron moderna usando clase global
const DropdownArrow = () => (
    <span className="modal-dropdown-arrow">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalConsultaProductividad = ({ onClose }) => {
    // Estados para productividad
    const [timeFilter, setTimeFilter] = useState('Dia'); // 'Dia' o 'Hora'
    const [selectedIndicator, setSelectedIndicator] = useState('Sesiones'); // Seleccionar "Sesiones" por defecto
    const [productivityData, setProductivityData] = useState([]);
    const [loadingProductivity, setLoadingProductivity] = useState(false);
    const [errorProductivity, setErrorProductivity] = useState(null);
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);

    // Definir indicadores según el filtro de tiempo
    const indicadoresDia = [
        'Sesiones',
        'Contactos', 
        'Negociaciones',
        'Porcentajes',
        'Tiempos',
        'Tiempo Promedio'
    ];

    const indicadoresHora = [
        'Cuentas',
        'Titulares',
        'Conocidos',
        'Desconocidos',
        'Sin Contacto',
        'Negociaciones',
        'Monto Negociaciones',
        'Saldo Solucionado'
    ];

    // Función para obtener datos de productividad
    const fetchProductivityData = async (indicador, idsEjecutivos) => {
        if (!indicador || !idsEjecutivos || idsEjecutivos.length === 0) return;
        
        setLoadingProductivity(true);
        setErrorProductivity(null);
        
        try {
            const requestData = {
                indicador: indicador,
                idsEjecutivos: idsEjecutivos
            };
            
            console.log('📤 Enviando datos de productividad:', requestData);
            const data = await getProductivity(requestData);
            
            // Manejar diferentes tipos de respuesta del servidor
            if (Array.isArray(data)) {
                setProductivityData(data);
            } else if (data && data.message) {
                // Servidor devuelve mensaje (sin datos)
                console.log('📝 Servidor responde:', data.message);
                setProductivityData([]);
            } else if (data && typeof data === 'object') {
                // Si es un objeto, intentar extraer array de datos
                const dataArray = Object.values(data).find(val => Array.isArray(val));
                setProductivityData(dataArray || []);
            } else {
                setProductivityData([]);
            }
        } catch (error) {
            console.error('❌ Error al obtener datos de productividad:', error);
            setErrorProductivity('Error al obtener los datos de productividad');
            setProductivityData([]);
        } finally {
            setLoadingProductivity(false);
        }
    };

    // Efecto para cargar datos cuando cambian el indicador o ejecutivo seleccionado
    useEffect(() => {
        if (selectedIndicator && selectedExecutiveNode) {
            const idsToSend = [selectedExecutiveNode];
            fetchProductivityData(selectedIndicator, idsToSend);
        }
    }, [selectedIndicator, selectedExecutiveNode]);
    return (
        <div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
            <ModalProductividadHeader onClose={onClose} />
            
            {/* Row superior con 2 columnas alineadas con las de abajo */}
            <div className="flex gap-4 mb-4 px-4">
                {/* Columna izquierda - Logo del Consorcio Jurídico */}
                <div className="w-72 flex justify-center items-center">
                    <img 
                        src={ConsorcioLogo} 
                        alt="Consorcio Jurídico" 
                        style={{ 
                            height: "50px", 
                            width: "auto",
                            objectFit: "contain"
                        }}
                    />
                </div>
                
                {/* Columna derecha - Controles de Indicadores */}
                <div className="flex-1 flex justify-center items-center">
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "1rem" 
                    }}>
                        <span className="modal-span-1">Indicadores</span>
                        <div className="relative">
                            <select
                                value={selectedIndicator}
                                onChange={(e) => setSelectedIndicator(e.target.value)}
                                className="modal-dropdown-select appearance-none w-32 font-semibold"
                            >
                                {(timeFilter === 'Dia' ? indicadoresDia : indicadoresHora).map((indicador) => (
                                    <option key={indicador} value={indicador}>
                                        {indicador}
                                    </option>
                                ))}
                            </select>
                            <DropdownArrow />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 text-[var(--color-jerarquia4)] text-sm font-medium">
                                <input 
                                    type="radio" 
                                    name="timeFilter" 
                                    value="Dia" 
                                    checked={timeFilter === 'Dia'}
                                    onChange={(e) => {
                                        setTimeFilter(e.target.value);
                                        setSelectedIndicator('Sesiones'); // Seleccionar "Sesiones" por defecto para "Día"
                                    }}
                                    className="modal-radio"
                                />
                                Día
                            </label>
                            <label className="flex items-center gap-1 text-[var(--color-jerarquia4)] text-sm font-medium">
                                <input 
                                    type="radio" 
                                    name="timeFilter" 
                                    value="Hora" 
                                    checked={timeFilter === 'Hora'}
                                    onChange={(e) => {
                                        setTimeFilter(e.target.value);
                                        setSelectedIndicator('Cuentas'); // Seleccionar "Cuentas" por defecto para "Hora"
                                    }}
                                    className="modal-radio"
                                />
                                Hora
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col gap-4 scrollbar-gray"
                style={{
                    overflowY: "auto",
                    width: "100%",
                    minHeight: "400px",
                    maxHeight: "60vh",
                    padding: "1rem 0"
                }}
            >
                <ModalProductividadContent 
                    timeFilter={timeFilter}
                    selectedIndicator={selectedIndicator}
                    selectedExecutiveNode={selectedExecutiveNode}
                    setSelectedExecutiveNode={setSelectedExecutiveNode}
                    productivityData={productivityData}
                    loadingProductivity={loadingProductivity}
                    errorProductivity={errorProductivity}
                />
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ModalProductividadFooter />
            </div>
            {/* El scroll personalizado ahora se maneja solo con la clase global scrollbar-gray */}
        </div>
    );
};

export default ModalConsultaProductividad;