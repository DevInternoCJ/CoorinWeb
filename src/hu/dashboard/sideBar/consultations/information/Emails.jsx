import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  infoEjecutivo,
  getEmailsInfo,
} from "../../../../../services/mark/orochi/LokeServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";

const EmailsContent = ({ mostrarTabla }) => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [errorExcel, setErrorExcel] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const idCartera = userData?.idCartera || 0;
  const idEjecutivo = userData?.idEjecutivo ?? null;
  const idProducto = userData?.idProducto ?? 0;

  const [cartera, setCartera] = useState(idCartera);
  // Opciones de cartera dinámicas
  const [carterasOptions, setCarterasOptions] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [consultasOptions, setConsultasOptions] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [errorConsultas, setErrorConsultas] = useState(null);

  // Al abrir el modal (cuando se monta el componente o cambia mostrarTabla a true), mostrar mensaje inicial
  useEffect(() => {
    toast.info("Elija la consulta de las cuentas que desee los correos.");
  }, []);

  // Cargar opciones de consulta
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
        const filtered = Array.isArray(data.consultas)
          ? data.consultas.filter(
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

  // Handler para exportar correos a Excel/CSV usando ExcelExporter
  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    setErrorExcel(null);
    try {
      const idCarteraInt = cartera ? parseInt(cartera, 10) : undefined;
      const idConsultaInt = consulta === "" ? 0 : parseInt(consulta, 10);
      const response = await getEmailsInfo(idCarteraInt, idConsultaInt);

      let nombreConsulta = "Correos";
      if (consulta !== "" && consulta !== 0) {
        const consultaObj = consultasOptions.find(
          (opt) => String(opt.idConsulta) === String(consulta)
        );
        if (consultaObj?.nombreConsulta)
          nombreConsulta = consultaObj.nombreConsulta;
      }

      const result = await exportFromAPIResponse(
        response,
        `correos_${idCarteraInt}_${idConsultaInt || "todas"}`,
        {
          consultaName: nombreConsulta,
          accountFields: ["cuenta"],
          showToast: true,
          successMessage: "Libro de Excel Guardado.",
          errorMessage: "Error al exportar los correos.",
        }
      );

      if (result) {
        toast.success("Libro de Excel Guardado.");
      } else {
        toast.warning("Consulta terminada sin registros.");
      }
    } catch (err) {
      const status = err?.response?.status;
      const mensajeBackend = err?.response?.data?.mensaje;
      if (
        status === 404 &&
        mensajeBackend?.includes("No se encontraron registros para los Correos")
      ) {
        let nombreConsulta = "Correos";
        if (consulta !== "" && consulta !== 0) {
          const consultaObj = consultasOptions.find(
            (opt) => String(opt.idConsulta) === String(consulta)
          );
          if (consultaObj?.nombreConsulta)
            nombreConsulta = consultaObj.nombreConsulta;
        }
        toast.warning(
          `Su consulta ${nombreConsulta} no cuenta con registros.`,
          { duration: 4000 }
        );
        setErrorExcel(null);
        toast.warning("Consulta terminada sin registros.");
      } else {
        setErrorExcel("Error al exportar los correos.");
        toast.error("Ocurrió un error al guardar el libro de Excel.");
      }
      console.error("Error al exportar los correos:", err);
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col items-center">
      {/* Grid responsivo con 3 columnas, fila única en xl/2xl */}
      <div className="w-full mb-4 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 items-center">
          {/* Dropdown cartera */}
          <div className="relative w-full min-w-0">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              value={cartera}
              onChange={(e) => setCartera(e.target.value)}
              id="cartera-select-emails"
              disabled={loadingConsultas}
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
              htmlFor="cartera-select-emails"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              Cartera
            </label>
          </div>
          {/* Dropdown consulta */}
          <div className="relative w-full min-w-0">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              id="consulta-select-emails"
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
              htmlFor="consulta-select-emails"
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
          {/* Botón Guardar Excel */}
          <div className="flex min-w-0">
            <button
              type="button"
              className="btn-success w-full min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
              onClick={handleDownloadExcel}
              disabled={loadingExcel || !consulta}
            >
              {loadingExcel ? "Exportando..." : "Guardar Excel"}
            </button>
          </div>
        </div>
      </div>
      {errorExcel && (
        <div className="text-red-500 text-xs text-center mt-1">
          {errorExcel}
        </div>
      )}
    </div>
  );
};

export default EmailsContent;
