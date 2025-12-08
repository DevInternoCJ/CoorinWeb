import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  infoEjecutivo,
  getOffersInformation,
} from "../../../../../services/mark/orochi/LokeServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";

const OffersContent = ({ headerControlsActive = false }) => {
  // Obtener datos de usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const idCartera = userData?.idCartera || 0;
  const idProducto = userData?.idProducto ?? 0;
  const jerarquia = userData?.Jerarquía ?? 0;
  const idEjecutivo = userData?.idEjecutivo ?? null;

  // El valor mostrado en el dropdown es idCartera
  const [cartera, setCartera] = useState(idCartera);
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
  const [footerMsg, setFooterMsg] = useState(
    "Elija la consulta de las cuentas que desee los pagos y el periodo de los pagos."
  );
  const [footerColor, setFooterColor] = useState("text-gray-600");
  // Eliminado: processAPIResponse ya no es necesario

  const minDate = "2016-01-01";
  const maxDate = new Date().toISOString().slice(0, 10);

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
                String(item.idProducto) === String(idProducto)
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
      const response = await getOffersInformation(params);

      // Usar la función centralizada para exportar y mostrar toasts
      const result = await exportFromAPIResponse(
        response,
        `ofrecimientos_${desde}_a_${hasta}`,
        {
          consultaName: "Ofrecimientos",
          accountFields: ["cuenta"],
          dateFields: ["fechaofrecimiento", "fechaOfrecimiento"],
          currencyFields: ["montoofrecimiento", "montoOfrecimiento"],
          showToast: true,
          successMessage:
            "Archivo descargado correctamente. Abre el archivo en Excel para visualizar los ofrecimientos.",
          errorMessage: "No se pudo descargar el archivo de ofrecimientos.",
        }
      );
      if (result) {
        setFooterMsg(
          "Archivo descargado correctamente. Abre el archivo en Excel para visualizar los ofrecimientos."
        );
        setFooterColor("text-green-600");
      } else {
        setConsultaSinRegistros(true);
        setFooterMsg("Consulta terminada sin registros");
        setFooterColor("text-black");
      }
    } catch (err) {
      const status = err?.response?.status;
      const statusText = err?.response?.statusText;
      if (status === 404 && statusText === "Not Found") {
        setConsultaSinRegistros(true);
        setErrorExcel(null);
        setFooterMsg("Consulta terminada sin registros");
        setFooterColor("text-black");
        toast.warning(
          "Su consulta no cuenta con registros en la fecha especificada",
          {
            duration: 4000,
          }
        );
      } else {
        setConsultaSinRegistros(false);
        setErrorExcel("Error al obtener los ofrecimientos.");
        setFooterMsg("No se pudo descargar el archivo de ofrecimientos.");
        setFooterColor("text-red-600");
      }
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center"
      style={{ minHeight: 0, height: "auto" }}
    >
      <div className="w-full relative">
        {/* ...estructura responsiva igual a Payments.jsx... */}
      </div>
    </div>
  );
};
export default OffersContent;
