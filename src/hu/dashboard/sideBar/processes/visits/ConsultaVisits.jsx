import React, { useState, useEffect } from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import { infoEjecutivo, getSearchesInformation } from "../../../../../services/mark/Orochi/LokiServices";


const ConsultVisitContent = () => {
  // Mensaje de footer dinámico
  const [footerMsg, setFooterMsg] = useState(
    "Elija la consulta de las cuentas que desee las consultas y el periodo."
  );

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
                ])
              ).values()
            )
          : [];
        setCarterasOptions(carterasUnicas);
        // Filtrar consultas por cartera e idProducto
        const filtered = Array.isArray(data)
          ? data.filter(
              (item) =>
                String(item.idCartera) === String(cartera) &&
                String(item.idProducto) === String(idProducto)
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
    setFooterMsg("Consulta terminada. Guardando libro de Excel.");
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
                .join(",")
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
        setFooterMsg("Libro de Excel Guardado.");
      } else {
        setErrorExcel("No se pudo descargar el archivo.");
        setFooterMsg("Ocurrió un error al guardar el libro de Excel.");
      }
    } catch (err) {
      setErrorExcel("Error al obtener las búsquedas.", err);
      setFooterMsg("Ocurrió un error al guardar el libro de Excel.");
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <div
      className="w-full max-w-xs mx-auto flex flex-col items-center"
      style={{ minHeight: 0, height: "auto" }}
    >
      {/* Logo centrado arriba de Cartera */}
      <div className="flex justify-center mb-4 w-full">
        <img
          src={ConsorcioLogo}
          alt="Logo Coorin"
          className="h-20 w-20 object-contain mx-auto"
        />
      </div>
      <div className="w-full relative">
        {/* Cartera y Consulta en el mismo row */}
        <div className="flex flex-row gap-3 w-full mb-3">
          {/* Cartera */}
          <div className="relative w-1/2">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              value={cartera}
              onChange={(e) => setCartera(e.target.value)}
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
          {/* Consulta */}
          <div className="relative w-1/2">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
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
        {/* Fechas */}
        <div className="flex gap-3 mb-3">
          {/* Desde */}
          <div className="hs-input-group w-full">
            <span className="hs-input-group-text min-w-[90px]">Desde</span>
            <input
              type="date"
              className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>
          {/* Hasta */}
          <div className="hs-input-group w-full">
            <span className="hs-input-group-text min-w-[90px]">Hasta</span>
            <input
              type="date"
              className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center items-end w-full">
          <button
            type="button"
            className="btn-success w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
            style={{ margin: "0 auto", display: "block" }}
            onClick={handleDownloadExcel}
            disabled={loadingExcel || !consulta}
          >
            {loadingExcel ? "Exportando..." : "Guardar Excel"}
          </button>
        </div>
        {errorExcel && (
          <div className="text-red-500 text-xs text-center mt-1">
            {errorExcel}
          </div>
        )}
      </div>
      {/* Footer informativo */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 52,
        }}
      >
        <span className="text-gray-600 text-sm pl-2">{footerMsg}</span>
      </div>
    </div>
  );
};

export default ConsultVisitContent;
