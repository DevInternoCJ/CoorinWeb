import React, { useState, useEffect } from "react";
import {
  infoEjecutivo,
  getPaymentsInformation,
} from "../../../../../services/mark/Orochi/LokiServices";
import { Toaster, toast } from "sonner";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";

const PaymentsContent = ({ headerControlsActive = false }) => {
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
  const [abortController, setAbortController] = useState(null);

  const minDate = "2016-01-01";
  const maxDate = new Date().toISOString().slice(0, 10);

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
    const toastId = toast.loading(`Exportando pagos...`);
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
      const response = await getPaymentsInformation(params, {
        signal: controller.signal,
      });

      const result = await exportFromAPIResponse(
        response,
        `pagos_${desde}_a_${hasta}`,
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
      } else {
        setConsultaSinRegistros(true);
        toast.warning("Consulta terminada sin registros");
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
    <div
      className="w-full flex flex-col items-center"
      style={{ minHeight: 0, height: "auto" }}
    >
      {headerControlsActive ? (
        /* Contenido cuando los controles están en el header */
        <div className="w-full p-4 text-center">
          {/* Espacio vacío - controles en header */}
        </div>
      ) : (
        <div className="w-full relative">
          {/* xl y 2xl: 1 fila, 5 columnas, visible desde xl en adelante */}
          <div className="hidden xl:grid grid-cols-5 gap-3 w-full mb-3">
            <div className="relative w-full">
              {/* Cartera */}
              <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={cartera}
                onChange={(e) => setCartera(e.target.value)}
                id="cartera-select-ofrecimiento-2xl"
              >
                {carterasOptions.length === 0 ? (
                  <option value={cartera}>{`Cartera ${cartera}`}</option>
                ) : (
                  carterasOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))
                )}
              </select>
              <label
                htmlFor="cartera-select-ofrecimiento-2xl"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Cartera
              </label>
            </div>
            <div className="relative w-full">
              {/* Consulta */}
              <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                id="consulta-select-ofrecimiento-2xl"
                disabled={loadingConsultas || errorConsultas}
              >
                <option value="">- Todas -</option>
                {consultasOptions.map((item) => (
                  <option
                    key={item.idConsulta || item.nombreConsulta}
                    value={item.idConsulta}
                  >
                    {item.nombreConsulta}
                  </option>
                ))}
              </select>
              <label
                htmlFor="consulta-select-ofrecimiento-2xl"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Consulta
              </label>
              {loadingConsultas && (
                <span className="text-xs text-gray-500 absolute right-2 top-2">
                  Cargando...
                </span>
              )}
              {errorConsultas && (
                <span className="text-xs text-red-500 absolute right-2 top-2">
                  {errorConsultas}
                </span>
              )}
            </div>
            <div className="relative w-full min-w-0">
              {/* Desde */}
              <input
                type="date"
                id="fecha-desde-offers-2xl"
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={desde}
                min={minDate}
                max={maxDate}
                onChange={(e) => setDesde(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="fecha-desde-offers-2xl"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Desde
              </label>
            </div>
            <div className="relative w-full min-w-0">
              {/* Hasta */}
              <input
                type="date"
                id="fecha-hasta-offers-2xl"
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={hasta}
                min={minDate}
                max={maxDate}
                onChange={(e) => setHasta(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="fecha-hasta-offers-2xl"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Hasta
              </label>
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
          {/* md: 3 filas, 2 col + 2 col + 1 col, solo visible en md */}
          <div className="hidden md:grid xl:hidden w-full gap-3 mb-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Cartera */}
              <div className="relative w-full">
                {/* ...código cartera... */}
                <select
                  className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={cartera}
                  onChange={(e) => setCartera(e.target.value)}
                  id="cartera-select-ofrecimiento-md"
                >
                  {carterasOptions.length === 0 ? (
                    <option value={cartera}>{`Cartera ${cartera}`}</option>
                  ) : (
                    carterasOptions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))
                  )}
                </select>
                <label
                  htmlFor="cartera-select-ofrecimiento-md"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                >
                  Cartera
                </label>
              </div>
              {/* Consulta */}
              <div className="relative w-full">
                {/* ...código consulta... */}
                <select
                  className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  id="consulta-select-ofrecimiento-md"
                  disabled={loadingConsultas || errorConsultas}
                >
                  <option value="">- Todas -</option>
                  {consultasOptions.map((item) => (
                    <option
                      key={item.idConsulta || item.nombreConsulta}
                      value={item.idConsulta}
                    >
                      {item.nombreConsulta}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="consulta-select-ofrecimiento-md"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                >
                  Consulta
                </label>
                {loadingConsultas && (
                  <span className="text-xs text-gray-500 absolute right-2 top-2">
                    Cargando...
                  </span>
                )}
                {errorConsultas && (
                  <span className="text-xs text-red-500 absolute right-2 top-2">
                    {errorConsultas}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Desde */}
              <div className="relative w-full min-w-0">
                {/* ...código desde... */}
                <input
                  type="date"
                  id="fecha-desde-offers-md"
                  className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={desde}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setDesde(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="fecha-desde-offers-md"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Desde
                </label>
              </div>
              {/* Hasta */}
              <div className="relative w-full min-w-0">
                {/* ...código hasta... */}
                <input
                  type="date"
                  id="fecha-hasta-offers-md"
                  className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={hasta}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setHasta(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="fecha-hasta-offers-md"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Hasta
                </label>
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
          {/* sm: 5 filas, 1 columna cada una, solo visible en sm */}
          <div className="grid md:hidden w-full grid-cols-1 gap-3 mb-3">
            <div className="relative w-full">
              {/* ...código cartera... */}
              <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={cartera}
                onChange={(e) => setCartera(e.target.value)}
                id="cartera-select-ofrecimiento-sm"
              >
                {carterasOptions.length === 0 ? (
                  <option value={cartera}>{`Cartera ${cartera}`}</option>
                ) : (
                  carterasOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))
                )}
              </select>
              <label
                htmlFor="cartera-select-ofrecimiento-sm"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Cartera
              </label>
            </div>
            <div className="relative w-full">
              {/* ...código consulta... */}
              <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                id="consulta-select-ofrecimiento-sm"
                disabled={loadingConsultas || errorConsultas}
              >
                <option value="">- Todas -</option>
                {consultasOptions.map((item) => (
                  <option
                    key={item.idConsulta || item.nombreConsulta}
                    value={item.idConsulta}
                  >
                    {item.nombreConsulta}
                  </option>
                ))}
              </select>
              <label
                htmlFor="consulta-select-ofrecimiento-sm"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Consulta
              </label>
              {loadingConsultas && (
                <span className="text-xs text-gray-500 absolute right-2 top-2">
                  Cargando...
                </span>
              )}
              {errorConsultas && (
                <span className="text-xs text-red-500 absolute right-2 top-2">
                  {errorConsultas}
                </span>
              )}
            </div>
            <div className="relative w-full min-w-0">
              {/* ...código desde... */}
              <input
                type="date"
                id="fecha-desde-offers-sm"
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={desde}
                min={minDate}
                max={maxDate}
                onChange={(e) => setDesde(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="fecha-desde-offers-sm"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Desde
              </label>
            </div>
            <div className="relative w-full min-w-0">
              {/* ...código hasta... */}
              <input
                type="date"
                id="fecha-hasta-offers-sm"
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={hasta}
                min={minDate}
                max={maxDate}
                onChange={(e) => setHasta(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="fecha-hasta-offers-sm"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Hasta
              </label>
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
      )}
    </div>
  );
};

export default PaymentsContent;
