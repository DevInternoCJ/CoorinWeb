// consulta complemento
import React, { useState, useEffect } from "react";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import { getQueryComplement } from "../../../../../services/mark/Orochi/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";
import { toast } from "sonner";

const TabQueryComplement = () => {
  // Obtener datos de usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const idCartera = userData?.idCartera || 0;
  const idProducto = userData?.idProducto ?? 0;
  const jerarquia = userData?.Jerarquía ?? 0;

  // Obtener fecha actual local para valores por defecto y max
  const hoy = new Date();
  const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

  const [desde, setDesde] = useState(fechaHoy);
  const [hasta, setHasta] = useState(fechaHoy);
  const [cartera, setCartera] = useState(() => {
    const saved = localStorage.getItem("selectedCartera");
    return saved ? parseInt(saved, 10) : idCartera;
  });
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const minDate = "2016-01-01";
  const maxDate = fechaHoy;

  // Guardar cartera seleccionada
  useEffect(() => {
    localStorage.setItem("selectedCartera", cartera);
  }, [cartera]);

  const handleGuardarExcel = async () => {
    if (!cartera || !desde || !hasta) {
      toast.warning("Por favor complete todos los campos requeridos");
      return;
    }

    setLoadingExcel(true);
    const toastId = toast.loading(`Exportando consulta complemento...`);
    const controller = new AbortController();
    setAbortController(controller);

    try {
      // Convertir nombres de parámetros y agregar formato de fecha
      const params = {
        idCartera: parseInt(cartera),
        fechaInicial: desde ? `${desde}T00:00:00Z` : null,
        fechaFinal: hasta ? `${hasta}T00:00:00Z` : null,
        jerarquia,
        idProducto: idProducto || null,
      };

      console.log("Parámetros enviados:", params);

      const response = await getQueryComplement(params, {
        signal: controller.signal,
      });

      // Procesar respuesta Blob y ordenar por Fecha, Hora, NombreEjecutivo y Contacto
      let dataToExport = null;

      try {
        // Convertir Blob a JSON
        let jsonData;
        if (response.data instanceof Blob) {
          const text = await response.data.text();
          jsonData = JSON.parse(text);
        } else {
          jsonData = response.data;
        }

        if (Array.isArray(jsonData) && jsonData.length > 0) {
          // Ordenar por Usuario, Fecha, Contacto y Hora
          dataToExport = [...jsonData].sort((a, b) => {
            // 1. Comparar Usuario
            const usuarioA = (a.Usuario || "").toString().toUpperCase();
            const usuarioB = (b.Usuario || "").toString().toUpperCase();
            const compareUsuario = usuarioA.localeCompare(usuarioB);

            if (compareUsuario !== 0) return compareUsuario;

            // 2. Si Usuario es igual, comparar Fecha
            const fechaA = a.Fecha
              ? new Date(a.Fecha.split("T")[0])
              : new Date(0);
            const fechaB = b.Fecha
              ? new Date(b.Fecha.split("T")[0])
              : new Date(0);
            const compareFecha = fechaA - fechaB;

            if (compareFecha !== 0) return compareFecha;

            // 3. Si Fecha es igual, comparar Contacto
            const contactoA = (a.Contacto || "").toString().toUpperCase();
            const contactoB = (b.Contacto || "").toString().toUpperCase();
            const compareContacto = contactoA.localeCompare(contactoB);

            if (compareContacto !== 0) return compareContacto;

            // 4. Si Contacto es igual, comparar Hora
            const horaA = a.Hora || "00:00:00";
            const horaB = b.Hora || "00:00:00";
            return horaA.localeCompare(horaB);
          });

          console.log(`Registros ordenados: ${dataToExport.length}`);
        } else {
          dataToExport = jsonData;
        }
      } catch (parseError) {
        console.warn(
          "⚠️ No se pudo ordenar, exportando datos originales:",
          parseError,
        );
        dataToExport = null;
      }

      const filename = `ConsultaComplemento_${desde}_${hasta}`;

      // Si se ordenó correctamente, exportar datos procesados
      if (dataToExport) {
        const { exportDataToXLSX } =
          await import("../../../../../utils/ExcelExporter");
        const success = exportDataToXLSX(dataToExport, filename);

        toast.dismiss(toastId);
        if (success) {
          toast.success("Archivo Excel exportado correctamente.");
        } else {
          toast.error("No se pudo exportar el archivo.");
        }
      } else {
        // Fallback: usar exportFromAPIResponse original
        const success = await exportFromAPIResponse(response, filename, {
          consultaName: "Consulta Complemento",
          showToast: false,
        });

        toast.dismiss(toastId);
        if (success) {
          toast.success("Archivo Excel exportado correctamente.");
        } else {
          toast.error("No se pudo exportar el archivo.");
        }
      }
    } catch (err) {
      toast.dismiss(toastId);
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
        toast.info("Exportación cancelada");
      } else {
        console.error("Error al exportar:", err);
        toast.error(
          "Error al exportar los datos, verifique la conexión a internet.",
        );
      }
    } finally {
      setLoadingExcel(false);
      setAbortController(null);
    }
  };

  // Cancelar petición al desmontar el componente
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  return (
    <div className="p-6 md:pt-20 flex flex-col h-full space-y-4 sm:space-y-8">
      {/* Título */}
      <div className="w-full flex items-center justify-center gap-3 -mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-jerarquia3"
        >
          <path
            fill="currentColor"
            d="M7 9H2V7h5zm0 3H2v2h5zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3M2 19h10v-2H2z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-jerarquia3">
          Consulta Complemento
        </h2>
      </div>

      {/* Row 1: Calendario Desde y Select Cartera */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
        <div className="relative flex-1 order-2 sm:order-1">
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            min={minDate}
            max={maxDate}
            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="desde-date"
            placeholder=" "
          />
          <label
            htmlFor="desde-date"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
          >
            Desde
          </label>
        </div>

        <div className="flex-1 order-1 sm:order-2">
          <FloatingSelect
            id="cartera-select"
            label="Cartera"
            value={String(cartera)}
            onChange={(e) => setCartera(e.target.value)}
            options={[
              { value: "1", label: "Cartera 1" },
              { value: "2", label: "Cartera 2" },
              { value: "3", label: "Cartera 3" },
              { value: "31", label: "Cartera 31" },
            ]}
          />
        </div>
      </div>

      {/* Row 2: Calendario Hasta y Botón Guardar Excel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 sm:items-center">
        <div className="relative flex-1">
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            min={minDate}
            max={maxDate}
            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="hasta-date"
            placeholder=" "
          />
          <label
            htmlFor="hasta-date"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
          >
            Hasta
          </label>
        </div>

        <button
          onClick={handleGuardarExcel}
          disabled={loadingExcel}
          className="btn-success w-full sm:flex-1 px-4 py-4 text-base font-medium rounded-lg shadow-sm flex justify-center items-center sm:h-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingExcel ? "Exportando..." : "Guardar Excel"}
        </button>
      </div>
    </div>
  );
};

export default TabQueryComplement;
