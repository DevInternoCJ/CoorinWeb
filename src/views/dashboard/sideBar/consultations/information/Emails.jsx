import React, { useState, useEffect } from "react";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import { toast } from "sonner";
import {
  infoEjecutivo,
  getEmailsInfo,
} from "../../../../../services/mark/Orochi/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";

const EmailsContent = () => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [errorExcel, setErrorExcel] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const idCartera = userData?.idCartera || 0;
  const idEjecutivo = userData?.idEjecutivo ?? null;
  const idProducto = userData?.idProducto ?? 0;

  const [cartera, setCartera] = useState(() => {
    const saved = localStorage.getItem("selectedCartera");
    return saved ? parseInt(saved, 10) : idCartera;
  });
  // Opciones de cartera dinámicas
  const [carterasOptions, setCarterasOptions] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [consultasOptions, setConsultasOptions] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [errorConsultas, setErrorConsultas] = useState(null);
  const [abortController, setAbortController] = useState(null);

  // Al abrir el modal (cuando se monta el componente o cambia mostrarTabla a true), mostrar mensaje inicial
  useEffect(() => {
    toast.info("Elija la consulta de las cuentas que desee los correos.");
  }, []);

  // Persistir la cartera seleccionada
  useEffect(() => {
    localStorage.setItem("selectedCartera", cartera);
  }, [cartera]);

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
                ]),
              ).values(),
            )
          : [];
        setCarterasOptions(carterasUnicas);
        // Filtrar consultas por cartera e idProducto
        const filtered = Array.isArray(data.consultas)
          ? data.consultas.filter(
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

  // Handler para exportar correos a Excel/CSV usando ExcelExporter
  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    setErrorExcel(null);
    const toastId = toast.loading(`Exportando correos...`);
    const controller = new AbortController();
    setAbortController(controller);
    try {
      const idCarteraInt = cartera ? parseInt(cartera, 10) : undefined;
      const idConsultaInt = consulta === "" ? 0 : parseInt(consulta, 10);
      const response = await getEmailsInfo(idCarteraInt, idConsultaInt, {
        signal: controller.signal,
      });

      let nombreConsulta = "Correos";
      if (consulta !== "" && consulta !== 0) {
        const consultaObj = consultasOptions.find(
          (opt) => String(opt.idConsulta) === String(consulta),
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
        },
      );

      if (result) {
        toast.success("Libro de Excel Guardado.");
      } else {
        toast.warning("Consulta terminada sin registros.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Petición cancelada");
        return;
      }
      const status = err?.response?.status;
      const mensajeBackend = err?.response?.data?.mensaje;
      if (
        status === 404 &&
        mensajeBackend?.includes("No se encontraron registros para los Correos")
      ) {
        let nombreConsulta = "Correos";
        if (consulta !== "" && consulta !== 0) {
          const consultaObj = consultasOptions.find(
            (opt) => String(opt.idConsulta) === String(consulta),
          );
          if (consultaObj?.nombreConsulta)
            nombreConsulta = consultaObj.nombreConsulta;
        }
        toast.warning(
          `Su consulta ${nombreConsulta} no cuenta con registros.`,
          { duration: 4000 },
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
    <div style={{ width: "100%" }} className="flex flex-col items-center">
      {/* Grid responsivo con 3 columnas, fila única en xl/2xl */}
      <div className="w-full mb-4 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 items-center">
          {/* Dropdown cartera */}
          <div className="w-full">
            <FloatingSelect
              id="cartera-select-emails"
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
          {/* Dropdown consulta */}
          <div className="w-full">
            <FloatingSelect
              id="consulta-select-emails"
              label="Consulta"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              options={[
                { value: "", label: "- Todas -" },
                ...consultasOptions.map((item) => ({ value: String(item.idConsulta), label: item.nombreConsulta }))
              ]}
              disabled={!!(loadingConsultas || errorConsultas)}
            />
            {loadingConsultas && (
              <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
                Cargando...
              </span>
            )}
            {errorConsultas && (
              <span className="text-xs text-[var(--color-btn-danger-text,#b91c1c)] block mt-0.5">
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
              disabled={loadingExcel}
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
