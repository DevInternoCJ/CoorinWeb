import React, { useState, useCallback } from "react";
import ModalConsultaCuentasHeader from "./ModalConsultaCuentasHeader";
import ModalConsultaCuentasFiltros from "./ModalConsultaCuentasFiltros";
import ModalConsultaCuentasColumnas from "./ModalConsultaCuentasColumnas";
import ModalConsultaCuentasFooter from "./ModalConsultaCuentasFooter";
import { toast } from "sonner";
import { postReportCampaign } from "../../../../../services/mark/albaz/LokiServices";

const ModalConsultaCuentas = ({ onClose }) => {
    const [situacionOptions, setSituacionOptions] = useState([]);
    const [allAvailableOptions, setAllAvailableOptions] = useState([]);
    const [totalFiltros, setTotalFiltros] = useState(0);
    const [totalColumnas, setTotalColumnas] = useState(0);
    const [filtros, setFiltros] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const [headerData, setHeaderData] = useState({});
    const [fechaDesde, setFechaDesde] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resultData, setResultData] = useState({
        data: [],
        totalRows: 0,
        excelUrl: ""
    });

    const handleGetSituacionOptions = useCallback((options) => {
        setSituacionOptions(options);
    }, []);

    const handleGetAllAvailableOptions = useCallback((options) => {
        setAllAvailableOptions(options);
    }, []);

    const handleFiltrosCount = useCallback((count) => {
        setTotalFiltros(count);
    }, []);

    const handleColumnasCount = useCallback((count) => {
        setTotalColumnas(count);
    }, []);

    const handleFiltrosChange = useCallback((filtrosData) => {
        setFiltros(filtrosData);
    }, []);

    const handleColumnasChange = useCallback((columnasData) => {
        setColumnas(columnasData);
    }, []);

    const handleHeaderDataChange = useCallback((data) => {
        setHeaderData(data);
    }, []);

    const handleConsultar = async () => {
        // Validar que haya filtros y columnas
        if (filtros.length === 0) {
            toast.warning("Debe agregar al menos un filtro");
            return;
        }

        if (columnas.length === 0) {
            toast.warning("Debe agregar al menos una columna");
            return;
        }

        // Construir el JSON
        const consultaJSON = {
            servidor: "Albaz",
            idCartera: headerData.idCartera || 1,
            idProducto: headerData.idProducto || 1,
            desdeFecha: fechaDesde || "2025-06-11",
            esDetalleResultado: headerData.esDetalleResultado || false,
            parametros: filtros.map(filtro => ({
                concepto: filtro.concepto,
                campo: filtro.campo,
                valores: filtro.valores
            })),
            agrupar: columnas.map(columna => ({
                campo: columna.nombre,
                concepto: columna.concepto
            }))
        };

        console.log("📤 JSON de consulta:", JSON.stringify(consultaJSON, null, 2));

        try {
            setIsLoading(true);
            toast.info("Realizando consulta...");
            
            const response = await postReportCampaign(consultaJSON);
            
            console.log("📥 Respuesta de la consulta:", response);
            
            if (response && !response.esError) {
                setResultData({
                    data: response.datos || [],
                    totalRows: response.totalFilasEncontradas || 0,
                    excelUrl: response.rutaDescargaExcel || ""
                });
                toast.success(response.mensaje || "Consulta realizada exitosamente");
            } else {
                throw new Error(response.mensaje || "Error al realizar la consulta");
            }

        } catch (resultError) {
            console.error("❌ Error al realizar la consulta:", resultError);
            toast.error("Error al realizar la consulta");
        } finally {
            setIsLoading(false);
        }
    
    };
    

    const totalItems = totalFiltros + totalColumnas;

    return (
        <div 
            className="modal-xl-container flex flex-col w-full sm:max-h-[95vh] sm:max-w-[95vw] max-h-[90vh] max-w-[90vw]"
        >
            {/* Header fijo */}
            <div className="flex-shrink-0 px-2 sm:px-0">
                <ModalConsultaCuentasHeader 
                    onClose={onClose}
                    onHeaderDataChange={handleHeaderDataChange}
                />
            </div>
            
            {/* Contenido con scroll */}
            <div className="flex-1 scrollbar-gray py-2 overflow-y-auto overflow-x-hidden" style={{ height: "400px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 w-full">
                    {/* Sección de Filtros - Toma todo el ancho en móvil, 8/12 columnas en desktop */}
                    <div className="lg:col-span-8 w-full min-w-0 flex flex-col">
                        <ModalConsultaCuentasFiltros 
                            onGetSituacionOptions={handleGetSituacionOptions}
                            onGetAllAvailableOptions={handleGetAllAvailableOptions}
                            idProducto={1}
                            idCartera={1}
                            onFiltrosCountChange={handleFiltrosCount}
                            onFiltrosChange={handleFiltrosChange}
                            isDateEnabled={totalItems >= 4}
                        />
                    </div>
                    
                    {/* Sección de Columnas - Toma todo el ancho en móvil, 4/12 columnas en desktop */}
                    <div className="lg:col-span-4 w-full min-w-0 flex flex-col">
                        <ModalConsultaCuentasColumnas 
                            situacionOptions={situacionOptions}
                            allAvailableOptions={allAvailableOptions}
                            onColumnasCountChange={handleColumnasCount}
                            onColumnasChange={handleColumnasChange}
                        />
                    </div>
                </div>
                 
            {/* Footer fijo */}
            <div className="flex-shrink-0 w-full px-2 sm:px-0">
                <ModalConsultaCuentasFooter 
                    onConsultar={handleConsultar}
                    isLoading={isLoading}
                    resultData={resultData}
                />
            </div>
            </div>
           
        </div>
    );
};

export default ModalConsultaCuentas;