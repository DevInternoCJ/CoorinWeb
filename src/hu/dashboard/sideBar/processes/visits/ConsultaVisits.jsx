import React, { useState, useEffect } from "react";
import {
  infoEjecutivo,
  getSearchesInformation,
} from "../../../../../services/mark/Orochi/LokiServices";
import CloseButtonReusable from "../../../components/CloseButtonReusable";

const ConsultVisitContent = ({ onClose }) => {
  // Obtener datos de usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const idCartera = userData?.idCartera || 1;
  const idProducto =
    userData?.idProducto ?? userData?.idproducto ?? userData?.producto ?? 1;
  const jerarquia = userData?.jerarquia ?? userData?.Jerarquia ?? 4;
  const idEjecutivo =
    userData?.idEjecutivo ??
    userData?.idejecutivo ??
    userData?.ejecutivo ??
    null;

  // Estados para selects y fechas
  const [cartera, setCartera] = useState(idCartera);
  const [carterasOptions, setCarterasOptions] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [consultasOptions, setConsultasOptions] = useState([]);
  const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
  const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [errorConsultas, setErrorConsultas] = useState(null);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [errorExcel, setErrorExcel] = useState(null);

  useEffect(() => {
    if (!idEjecutivo) return;
    setLoadingConsultas(true);
    setErrorConsultas(null);
    infoEjecutivo(idEjecutivo)
      .then((data) => {
        // Extraer carteras únicas
        const carterasUnicas = Array.isArray(data)
          ? Array.from(
              new Map(
                data.map((item) => [
                  item.idCartera,
                  {
                    id: item.idCartera,
                    nombre: item.NombreCartera || `Cartera ${item.idCartera}`,
                  },
                ]),
              ).values(),
            )
          : [];
        setCarterasOptions(carterasUnicas);
        // Filtrar consultas por cartera e idProducto
        const filtered = Array.isArray(data)
          ? data.filter(
              (item) =>
                String(item.idCartera) === String(cartera) &&
                String(item.idProducto) === String(idProducto),
            )
          : [];
        setConsultasOptions(filtered);
      })
      .catch(() => {
        setErrorConsultas("Error al cargar las consultas");
        setConsultasOptions([]);
        setCarterasOptions([]);
      })
      .finally(() => setLoadingConsultas(false));
  }, [idEjecutivo, cartera, idProducto]);

  // Handler para exportar búsquedas a Excel/CSV
  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    setErrorExcel(null);
    try {
      // Usar los parámetros actuales
      const params = {
        idCartera: cartera,
        idConsulta: consulta,
        idProducto,
        desde,
        hasta,
        jerarquia,
      };
      const response = await getSearchesInformation(params);
      // response.data es un Blob
      if (response && response.data instanceof Blob) {
        // Leer el contenido del blob como texto
        const text = await response.data.text();
        let csvContent = text;
        // Si parece JSON, convertir a CSV
        try {
          const json = JSON.parse(text);
          if (
            Array.isArray(json) &&
            json.length > 0 &&
            typeof json[0] === "object"
          ) {
            const headers = Object.keys(json[0]);
            const rows = json.map((obj) =>
              headers
                .map((h) => {
                  let value = obj[h];
                  // Quitar comas internas para no romper el CSV
                  if (typeof value === "string")
                    value = value.replace(/,/g, "");
                  return value;
                })
                .join(","),
            );
            csvContent = headers.join(",") + "\n" + rows.join("\n");
          }
        } catch (e) {
          console.error("Error al convertir a CSV:", e);
          // No es JSON, dejar como está
        }
        // Descargar como CSV limpio
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `consulta_visitas_${desde}_a_${hasta}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        setErrorExcel("No se pudo descargar el archivo.");
      }
    } catch (err) {
      setErrorExcel("Error al obtener las búsquedas.", err);
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <>
      {/* Botón de cierre */}
      <div className="absolute top-2 right-2 z-20">
        <CloseButtonReusable onClose={onClose} />
      </div>

      <div
        className="flex flex-col items-center mx-auto px-2 sm:px-4"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Row 1: Título, Select Cartera, Select Consulta */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4 items-center mt-2">
          {/* Título */}
          <div className="col-span-1 sm:col-span-4 text-center sm:text-left">
            <span className="text-lg font-semibold text-jerarquia3">
              Consulta Visitas
            </span>
          </div>

          {/* Select Cartera */}
          <div className="relative col-span-1 sm:col-span-4">
            <select
              value={cartera}
              onChange={(e) => setCartera(e.target.value)}
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              id="cartera-select-consults-visits"
            >
              {carterasOptions.length === 0 && (
                <option value="">Cargando...</option>
              )}
              {carterasOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>
            <label
              htmlFor="cartera-select-consults-visits"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              Cartera
            </label>
          </div>

          {/* Select Consulta */}
          <div className="relative col-span-1 sm:col-span-4">
            <select
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              id="consulta-select-consult-visits"
              disabled={loadingConsultas || errorConsultas}
            >
              <option value="">- Todas -</option>
              {consultasOptions.map((item) => (
                <option
                  key={item.idConsulta || item.NombreConsulta}
                  value={item.idConsulta}
                >
                  {item.NombreConsulta}
                </option>
              ))}
            </select>
            <label
              htmlFor="consulta-select-consult-visits"
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

        {/* Row 2: Desde, Hasta, Botón Guardar Excel */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          {/* Desde */}
          <div className="col-span-1 sm:col-span-4">
            <div className="relative w-full min-w-0">
              <input
                type="date"
                id="fecha-desde-consults-visits"
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={desde}
                onChange={(e) => {
                  setDesde(e.target.value);
                  if (e.target.value > hasta) {
                    setHasta(e.target.value);
                  }
                }}
                placeholder=" "
              />
              <label
                htmlFor="fecha-desde-consults-visits"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Desde
              </label>
            </div>
          </div>

          {/* Hasta */}
          <div className="col-span-1 sm:col-span-4">
            <div className="relative w-full min-w-0">
              <input
                type="date"
                id="fecha-hasta-consults-visits"
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="fecha-hasta-consults-visits"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Hasta
              </label>
            </div>
          </div>

          {/* Botón Guardar Excel */}
          <div className="col-span-1 sm:col-span-4 flex items-end justify-center">
            <button
              type="button"
              className="btn-success"
              onClick={handleDownloadExcel}
              disabled={loadingExcel || !consulta}
            >
              {loadingExcel ? "Exportando..." : "Guardar Excel"}
            </button>
            {errorExcel && (
              <div className="text-red-500 text-xs mt-1">{errorExcel}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultVisitContent;
