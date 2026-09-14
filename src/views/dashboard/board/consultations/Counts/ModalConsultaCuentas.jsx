import React, { useState, useCallback } from "react";
import ModalConsultaCuentasHeader from "./ModalConsultaCuentasHeader";
import ModalConsultaCuentasFiltros from "./ModalConsultaCuentasFiltros";
import ModalConsultaCuentasColumnas from "./ModalConsultaCuentasColumnas";
import ModalConsultaCuentasFooter from "./ModalConsultaCuentasFooter";
import ExcelDownloader from "../Historical/ExcelDownloader";
import { toast } from "sonner";
import { postReportCampaign } from "../../../../../services/mark/Orochi/LokiServices";
import * as XLSX from "xlsx";
import { useUserStore } from "../../../../../contextGlobal/userStore";
import { ACTIVE_SERVER } from "../../../../../config/backend";
import { buildSearchCriteria } from "../../../../../forms/queryAdapters";
import { realizarBusquedaRequestSchema } from "../../../../../schemas/formSchemas";
const ModalConsultaCuentas = ({ onClose }) => {
  const user = useUserStore((state) => state.user);
  const jerarquia = user?.Jerarquía;
  const [situacionOptions, setSituacionOptions] = useState([]);
  const [allAvailableOptions, setAllAvailableOptions] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [columnas, setColumnas] = useState([]);
  const [headerData, setHeaderData] = useState({});
  const [fechaDesde, setFechaDesde] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tipoConsulta, setTipoConsulta] = useState("contar");
  const [resultData, setResultData] = useState({
    data: [],
    totalRows: 0,
    excelUrl: "",
  });
  const [excelBlob, setExcelBlob] = useState(null);

  const handleGetSituacionOptions = useCallback((options) => {
    setSituacionOptions(options);
  }, []);

  const handleGetAllAvailableOptions = useCallback((options) => {
    setAllAvailableOptions(options);
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

  const generateExcelFromData = (data) => {
    try {
      // Crear un nuevo libro de trabajo
      const wb = XLSX.utils.book_new();

      // Convertir los datos a una hoja de trabajo
      const ws = XLSX.utils.json_to_sheet(data);

      // Agregar la hoja al libro
      XLSX.utils.book_append_sheet(wb, ws, "Reporte");

      // Generar el archivo Excel
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Convertir el buffer a Blob
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      return blob;
    } catch (error) {
      console.error("Error al generar Excel:", error);
      return null;
    }
  };

  const handleConsultar = async () => {
    if (!headerData.idCartera) {
      toast.warning("Debe seleccionar una cartera");
      return;
    }

    if (!headerData.tipoConsulta) {
      toast.warning("Debe seleccionar un tipo de consulta");
      return;
    }

    // Validar que haya filtros y columnas
    if (filtros.length === 0) {
      toast.warning("Debe agregar al menos un filtro");
      return;
    }

    if (columnas.length === 0) {
      toast.warning("Debe agregar al menos una columna");
      return;
    }

    const consultaJSON = buildSearchCriteria({
      servidor: ACTIVE_SERVER,
      idCartera: headerData.idCartera,
      idProducto: headerData.idProducto || undefined,
      desdeFecha: fechaDesde || undefined,
      esDetalleResultado: tipoConsulta === "detalle",
      parametros: filtros,
      agrupar: columnas,
      jerarquiaEjecutivo: jerarquia ? jerarquia : 0,
    });

    const validation = realizarBusquedaRequestSchema.safeParse(consultaJSON);
    if (!validation.success) {
      toast.error(validation.error.issues[0]?.message || "La consulta no es válida");
      return;
    }

    console.log("  JSON de consulta:", JSON.stringify(consultaJSON, null, 2));

    try {
      setIsLoading(true);
      toast.info("Realizando consulta...");

      const response = await postReportCampaign(validation.data);

      console.log("  Respuesta de la consulta:", response);

      if (response && !response.esError) {
        setResultData({
          data: response.datos || [],
          totalRows: response.totalFilasEncontradas || 0,
          excelUrl: response.rutaDescargaExcel || "",
        });
        toast.success(response.mensaje || "Consulta realizada exitosamente");

        // Generamos el Excel solo si es tipo detalle y hay datos
        if (
          tipoConsulta === "detalle" &&
          response.datos &&
          response.datos.length > 0
        ) {
          const blob = generateExcelFromData(response.datos);
          if (blob) {
            setExcelBlob(blob); // Esto activará la descarga una sola vez
          } else {
            toast.error("Error al generar el Excel");
          }
        } else {
          setExcelBlob(null); // Limpiar el blob si no es detalle
        }
      } else {
        throw new Error(response.mensaje || "Error al realizar la consulta");
      }
    } catch (resultError) {
      console.error("  Error al realizar la consulta:", resultError);
      toast.error("Error al realizar la consulta");
    } finally {
      setIsLoading(false);
    }
  };

  const filtersEnabled = Boolean(headerData.idCartera && headerData.tipoConsulta);

  return (
    <div className="modal-xl-container flex flex-col w-full sm:max-h-[95vh] sm:max-w-[95vw] max-h-[90vh] max-w-[90vw]">
      {/* Header fijo */}
      <div className="flex-shrink-0 px-2 sm:px-0">
          <ModalConsultaCuentasHeader
            onClose={onClose}
            onHeaderDataChange={handleHeaderDataChange}
            jerarquia={jerarquia}
        />
      </div>

      {/* Contenido con scroll */}
      <div
        className="flex-1 scrollbar-gray py-1 overflow-x-hidden"
        style={{ minHeight: 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 w-full">
          {/* Sección de Filtros - Toma todo el ancho en móvil, 8/12 columnas en desktop */}
          <div className="lg:col-span-8 w-full min-w-0 flex flex-col">
            <ModalConsultaCuentasFiltros
              onGetSituacionOptions={handleGetSituacionOptions}
              onGetAllAvailableOptions={handleGetAllAvailableOptions}
              idProducto={headerData.idProducto}
              idCartera={headerData.idCartera}
              onFiltrosChange={handleFiltrosChange}
              fechaDesde={fechaDesde}
              onFechaDesdeChange={setFechaDesde}
              enabled={filtersEnabled}
            />
          </div>

          {/* Sección de Columnas - Toma todo el ancho en móvil, 4/12 columnas en desktop */}
          <div className="lg:col-span-4 w-full min-w-0 flex flex-col">
            <ModalConsultaCuentasColumnas
              situacionOptions={situacionOptions}
              allAvailableOptions={allAvailableOptions}
              onColumnasChange={handleColumnasChange}
              onTipoChange={setTipoConsulta}
              enabled={filtersEnabled}
            />
          </div>
        </div>

        {/* Footer fijo */}
        <div className="flex-shrink-0 w-full px-2 sm:px-0">
          <ModalConsultaCuentasFooter
            onConsultar={handleConsultar}
            isLoading={isLoading}
            resultData={resultData}
            isDetail={tipoConsulta === "detalle"}
          />
        </div>
      </div>

      {/* Componente para descargar Excel */}
      {excelBlob && (
        <ExcelDownloader
          blob={excelBlob}
          fileName={`reporte_consulta_${new Date()
            .toISOString()
            .slice(0, 10)}.xlsx`}
          onDownloadComplete={() => setExcelBlob(null)}
        />
      )}
    </div>
  );
};

export default ModalConsultaCuentas;
