import React, { useState, useEffect } from "react";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import FloatingInput from "../../../../../components/Select/FloatingInput";
import { toast } from "sonner";
import {
  infoEjecutivo,
  getCommentsInformation,
} from "../../../../../services/mark/Orochi/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";

const CommentsContent = ({ headerControlsActive = false }) => {
  // Mensaje de footer dinámico
  // Obtener datos de usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const idCartera = userData?.idCartera || 0;
  const idProducto = userData?.idProducto ?? 0;
  const jerarquia = userData?.Jerarquía ?? 0;
  const idEjecutivo = userData?.idEjecutivo ?? null;

  // El valor mostrado en el dropdown es idCartera
  const [cartera, setCartera] = useState(() => {
    const saved = localStorage.getItem("selectedCartera");
    return saved ? parseInt(saved, 10) : idCartera;
  });
  const [carterasOptions, setCarterasOptions] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
  const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));
  const [consultasOptions, setConsultasOptions] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [errorConsultas, setErrorConsultas] = useState(null);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [errorExcel, setErrorExcel] = useState(null);
  const [consultaSinRegistros, setConsultaSinRegistros] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [footerColor, setFooterColor] = useState("text-gray-600");
  const [abortController, setAbortController] = useState(null);
  const minDate = "2016-01-01";
  const maxDate = new Date().toISOString().slice(0, 10);

  // Persistir la cartera seleccionada
  useEffect(() => {
    localStorage.setItem("selectedCartera", cartera);
  }, [cartera]);

  useEffect(() => {
    if (!idEjecutivo) return;
    setLoadingConsultas(true);
    setErrorConsultas(null);
    infoEjecutivo(idEjecutivo)
      .then((data) => {
        console.log("Respuesta infoEjecutivo:", data);
        // Filtrar por idCartera e idProducto sobre data.consultas
        let filtered = Array.isArray(data?.consultas)
          ? data.consultas.filter(
              (item) =>
                String(item.idCartera) === String(idCartera) &&
                String(item.idProducto) === String(idProducto),
            )
          : [];
        console.log("Consultas filtradas:", filtered);
        setConsultasOptions(filtered);
      })
      .catch((err) => {
        setErrorConsultas("Error al cargar las consultas");
        setConsultasOptions([]);
        console.error("Error en infoEjecutivo:", err);
      })
      .finally(() => setLoadingConsultas(false));
  }, [idCartera, idProducto, idEjecutivo]);

  // Función para consumir el endpoint y descargar el Excel usando ExcelExporter
  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    setErrorExcel(null);
    const toastId = toast.loading(`Exportando comentarios...`);
    const controller = new AbortController();
    setAbortController(controller);
    try {
      const idConsultaFinal = consulta === "" ? "0" : consulta;
      const params = {
        idCartera: cartera,
        idConsulta: idConsultaFinal,
        idProducto,
        desde,
        hasta,
        jerarquia,
      };
      const response = await getCommentsInformation(params, {
        signal: controller.signal,
      });

      const result = await exportFromAPIResponse(
        response,
        `busquedas_${desde}_a_${hasta}`,
        {
          consultaName: "Pagos",
          accountFields: ["cuenta"],
          dateFields: ["fechapago", "fechaPago"],
          currencyFields: ["montopago", "montoPago"],
          showToast: true,
          successMessage:
            "Archivo descargado correctamente. Abre el archivo en Excel para visualizar los pagos.",
        },
      );

      if (result) {
        toast.success(
          "Archivo descargado correctamente. Abre el archivo en Excel para visualizar los pagos.",
        );
        setFooterColor("text-green-600");
      } else {
        setConsultaSinRegistros(true);
        toast.warning("Consulta terminada sin registros");
        setFooterColor("text-black");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Petición cancelada");
        return;
      }
      const status = err?.response?.status;
      const statusText = err?.response?.statusText;
      if (status === 404 && statusText === "Not Found") {
        setConsultaSinRegistros(true);
        setErrorExcel(null);
        toast.warning("Consulta terminada sin registros");
        setFooterColor("text-black");
        toast.warning(
          "Su consulta no cuenta con registros en la fecha especificada",
          {
            duration: 4000,
          },
        );
      } else {
        setConsultaSinRegistros(false);
        setErrorExcel("Error al obtener los pagos.");
        toast.error("No se pudo descargar el archivo de pagos.");
        setFooterColor("text-red-600");
      }
    } finally {
      setLoadingExcel(false);
      setAbortController(null);
      toast.dismiss(toastId);
    }
  };

  // Cancelar petición al desmontar el componente
  useEffect(() => {
    return () => {
      if (abortController) {
        toast.warning("Petición cancelada al cerrar el modal.");
        abortController.abort();
      }
    };
  }, [abortController]);

  return (
    <div className="w-full relative">
      {/* xl y 2xl: 1 fila, 5 columnas */}
      <div className="hidden xl:grid grid-cols-5 gap-3 w-full mb-3">
        <div className="w-full">
          <FloatingSelect
            id="cartera-select-comments-xl"
            label="Cartera"
            value={String(cartera)}
            onChange={(e) => setCartera(e.target.value)}
            options={
              carterasOptions.length === 0
                ? [{ value: String(cartera), label: `Cartera ${cartera}` }]
                : carterasOptions.map((item) => ({ value: String(item.id), label: item.nombre }))
            }
            disabled={loadingConsultas}
          />
        </div>
        <div className="w-full">
          <FloatingSelect
            id="consulta-select-comments-xl"
            label="Consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            options={[
              { value: "", label: "- Todas -" },
              ...consultasOptions.map((item) => ({ value: String(item.idConsulta), label: item.nombreConsulta }))
            ]}
            disabled={!!(loadingConsultas || errorConsultas)}
          />
          {loadingConsultas && <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">Cargando...</span>}
          {errorConsultas && <span className="text-xs text-[var(--color-btn-danger-text,#b91c1c)] block mt-0.5">{errorConsultas}</span>}
        </div>
        <div className="w-full">
          <FloatingInput
            type="date"
            id="fecha-desde-comments-xl"
            label="Desde"
            value={desde}
            min={minDate}
            max={maxDate}
            onChange={(e) => setDesde(e.target.value)}
          />
        </div>
        <div className="w-full">
          <FloatingInput
            type="date"
            id="fecha-hasta-comments-xl"
            label="Hasta"
            value={hasta}
            min={minDate}
            max={maxDate}
            onChange={(e) => setHasta(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="btn-success w-full min-w-[120px] max-w-full px-6 py-1 text-base font-medium rounded-lg shadow-sm flex justify-center self-center"
            style={{ margin: "0 auto", display: "block", height: "32px" }}
            onClick={handleDownloadExcel}
            disabled={loadingExcel}
          >
            {loadingExcel ? "Exportando..." : "Guardar Excel"}
          </button>
        </div>
      </div>
      {/* md: 3 filas, 2 col + 2 col + 1 col */}
      <div className="hidden md:grid xl:hidden w-full gap-3 mb-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="w-full">
            <FloatingSelect
              id="cartera-select-comments-md"
              label="Cartera"
              value={String(cartera)}
              onChange={(e) => setCartera(e.target.value)}
              options={
                carterasOptions.length === 0
                  ? [{ value: String(cartera), label: `Cartera ${cartera}` }]
                  : carterasOptions.map((item) => ({ value: String(item.id), label: item.nombre }))
              }
              disabled={loadingConsultas}
            />
          </div>
          <div className="w-full">
            <FloatingSelect
              id="consulta-select-comments-md"
              label="Consulta"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              options={[
                { value: "", label: "- Todas -" },
                ...consultasOptions.map((item) => ({ value: String(item.idConsulta), label: item.nombreConsulta }))
              ]}
              disabled={!!(loadingConsultas || errorConsultas)}
            />
            {loadingConsultas && <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">Cargando...</span>}
            {errorConsultas && <span className="text-xs text-[var(--color-btn-danger-text,#b91c1c)] block mt-0.5">{errorConsultas}</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="w-full">
            <FloatingInput
              type="date"
              id="fecha-desde-comments-md"
              label="Desde"
              value={desde}
              min={minDate}
              max={maxDate}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>
          <div className="w-full">
            <FloatingInput
              type="date"
              id="fecha-hasta-comments-md"
              label="Hasta"
              value={hasta}
              min={minDate}
              max={maxDate}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            className="btn-success w-full min-w-[120px] max-w-full px-6 py-1 text-base font-medium rounded-lg shadow-sm flex justify-center self-center"
            style={{ margin: "0 auto", display: "block", height: "32px" }}
            onClick={handleDownloadExcel}
            disabled={loadingExcel}
          >
            {loadingExcel ? "Exportando..." : "Guardar Excel"}
          </button>
        </div>
      </div>
      {/* sm: 5 filas, 1 columna cada una */}
      <div className="grid md:hidden w-full grid-cols-1 gap-3 mb-3">
        <div className="w-full">
          <FloatingSelect
            id="cartera-select-comments-sm"
            label="Cartera"
            value={String(cartera)}
            onChange={(e) => setCartera(e.target.value)}
            options={
              carterasOptions.length === 0
                ? [{ value: String(cartera), label: `Cartera ${cartera}` }]
                : carterasOptions.map((item) => ({ value: String(item.id), label: item.nombre }))
            }
            disabled={loadingConsultas}
          />
        </div>
        <div className="w-full">
          <FloatingSelect
            id="consulta-select-comments-sm"
            label="Consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            options={[
              { value: "", label: "- Todas -" },
              ...consultasOptions.map((item) => ({ value: String(item.idConsulta), label: item.nombreConsulta }))
            ]}
            disabled={!!(loadingConsultas || errorConsultas)}
          />
          {loadingConsultas && <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">Cargando...</span>}
          {errorConsultas && <span className="text-xs text-[var(--color-btn-danger-text,#b91c1c)] block mt-0.5">{errorConsultas}</span>}
        </div>
        <div className="w-full">
          <FloatingInput
            type="date"
            id="fecha-desde-comments-sm"
            label="Desde"
            value={desde}
            min={minDate}
            max={maxDate}
            onChange={(e) => setDesde(e.target.value)}
          />
        </div>
        <div className="w-full">
          <FloatingInput
            type="date"
            id="fecha-hasta-comments-sm"
            label="Hasta"
            value={hasta}
            min={minDate}
            max={maxDate}
            onChange={(e) => setHasta(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn-success w-full min-w-[120px] max-w-full px-6 py-1 text-base font-medium rounded-lg shadow-sm flex justify-center self-center"
          style={{ margin: "0 auto", display: "block", height: "32px" }}
          onClick={handleDownloadExcel}
          disabled={loadingExcel}
        >
          {loadingExcel ? "Exportando..." : "Guardar Excel"}
        </button>
      </div>
    </div>
  );
};

export default CommentsContent;
