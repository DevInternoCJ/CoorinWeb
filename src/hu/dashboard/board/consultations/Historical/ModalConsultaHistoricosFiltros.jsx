import React, { useState, useEffect } from "react";
import HistoricosTipoSelector from "./HistoricosTipoSelector";
// import ExcelDownloader from "./ExcelDownloader";
// import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";
import { toast } from "sonner";
import { exportDataToXLSX } from "../../../../../utils/ExcelExporter";

import {
  historySingle,
  historyArchivoUpload,
} from "../../../../../services/mark/albaz/LokiServices";

async function fetchHistorySingle(params) {
  // Construir el body según los parámetros recibidos
  const body = {
    idCartera: params.idCartera,
    incluirCuenta: params.incluirCuenta,
    incluirNegociaciones: params.incluirNegociaciones,
    incluirVisitas: params.incluirVisitas,
    incluirGestiones: params.incluirGestiones,
    incluirAccionamientos: params.incluirAccionamientos,
    incluirPagos: params.incluirPagos,
    usarPeriodo: params.usarPeriodo,
    fechaDesde: params.usarPeriodo ? params.fechaDesde : null,
    fechaHasta: params.usarPeriodo ? params.fechaHasta : null,
    cuenta: params.cuenta || null,
  };
  // Llamar al endpoint con el body
  return await historySingle(body);
}

const ModalConsultaHistoricosFiltros = ({
  onIndividualChange,
  cartera,
  setCartera,
  carteras,
  carterasProductosData,
  setProductos,
  setProducto,
  isIndividual,
  // tipoSeleccionado,
  setTipoSeleccionado,
  
}) => {


  // Estados locales solo para lógica interna
  // const [producto, setProductoLocal] = useState("");
  // const [productos, setProductosLocal] = useState(["-Sin Producto-"]);
  const [archivo, setArchivo] = useState(null);
  // const [cuentaError, setCuentaError] = useState("");
  // tipoSeleccionado y isIndividual ahora vienen del padre
  const [allowSubmit, setAllowSubmit] = useState(true); // Bandera para evitar petición individual al cambiar de modo
  const [periodo, setPeriodo] = useState(true);
  const [fechaDesde, setFechaDesde] = useState(() => {
    const hoy = new Date();
    const mesAtras = new Date(hoy);
    mesAtras.setMonth(hoy.getMonth() - 1);
    const dd = String(mesAtras.getDate()).padStart(2, "0");
    const mm = String(mesAtras.getMonth() + 1).padStart(2, "0");
    const yyyy = mesAtras.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  });
  const [fechaHasta, setFechaHasta] = useState(() => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  });
  const [idCuenta, setIdCuenta] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    cuenta: true,
    gestiones: false,
    visitas: false,
    negociaciones: false,
    accionamientos: false,
    pagos: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [excelBlob, setExcelBlob] = useState(null);



  // Declarar handleBuscar después de allowSubmit y isLoading para evitar ReferenceError
  const handleBuscar = React.useCallback(async () => {
    if (isIndividual) {
      if (!allowSubmit) return;
      // 1. Validar que haya al menos un checkbox seleccionado
      const checkboxesValidos = Object.entries(checkedItems)
        .filter(([key]) =>
          [
            "cuenta",
            "gestiones",
            "visitas",
            "negociaciones",
            "accionamientos",
            "pagos",
          ].includes(key)
        )
        .some(([, checked]) => checked);
      if (!checkboxesValidos) {
        toast.warning(
          "Debe seleccionar al menos una opción: Cuenta, Gestiones, Visitas, Negociaciones, Accionamientos o Pagos"
        );
        return;
      }
      // 2. Si el checkbox "cuenta" está marcado, validar que haya una cuenta válida
      if (checkedItems.cuenta) {
        if (!idCuenta || idCuenta.trim() === "") {
          toast.warning("Debe ingresar un número de cuenta");
          return;
        }
        if (idCuenta.length < 6) {
          toast.warning(
            "Ingrese un número de cuenta válido (mínimo 6 dígitos)"
          );
          return;
        }
      }
      try {
        setIsLoading(true);
        toast.loading("Consultando histórico...", { id: "buscar-loading" });
        const userData = JSON.parse(localStorage.getItem("userData"));
        const idCartera = userData?.idCartera || 1;
        const formatFecha = (fecha) => {
          if (!fecha) return null;
          const [dia, mes, anio] = fecha.split("/");
          return `${anio}-${mes}-${dia}`;
        };
        const params = {
          idCartera,
          incluirCuenta: checkedItems.cuenta,
          incluirNegociaciones: checkedItems.negociaciones,
          incluirVisitas: checkedItems.visitas,
          incluirGestiones: checkedItems.gestiones,
          incluirAccionamientos: checkedItems.accionamientos,
          incluirPagos: checkedItems.pagos,
          usarPeriodo: periodo,
          fechaDesde: periodo ? formatFecha(fechaDesde) : null,
          fechaHasta: periodo ? formatFecha(fechaHasta) : null,
          cuenta: idCuenta || null,
        };
        console.log("Body enviado al endpoint:", params);
        const result = await fetchHistorySingle(params);
        toast.dismiss("buscar-loading");
        if (result?.data && result.data.size === 0) {
          toast.warning("La cuenta ingresada no existe");
          setExcelBlob(null);
          return;
        }
        // Si la respuesta es un Blob de tipo JSON, conviértelo a array antes de exportar
        if (result.data instanceof Blob && result.data.type === "application/json") {
          const text = await result.data.text();
          try {
            const json = JSON.parse(text);
            console.log("[ExcelExporter] JSON parseado:", json);
            if (json.Cuenta && Array.isArray(json.Cuenta)) {
              exportDataToXLSX(json.Cuenta, `historico_${idCuenta}`);
            } else {
              toast.error("No se encontró información de cuenta para exportar.");
            }
          } catch (e) {
            console.error("No se pudo parsear el blob a JSON", e);
            toast.error("Error al procesar los datos para exportar a Excel.");
          }
        } else if (Array.isArray(result.data)) {
          exportDataToXLSX(result.data, `historico_${idCuenta}`);
        } else {
          console.error("Formato de datos inesperado para exportar a Excel:", result.data);
          toast.error("Formato de datos inesperado para exportar a Excel.");
        }
      } catch (error) {
        console.error("Error al consultar histórico individual:", error);
        toast.dismiss("buscar-loading");
        toast.error("Error al consultar histórico individual");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Modo archivo
      if (!archivo) {
        console.log("[Archivo] No hay archivo seleccionado");
        toast.warning("Debes seleccionar un archivo Excel");
        return;
      }
      // Validar al menos un checkbox seleccionado
      const checkboxesValidos = Object.entries(checkedItems)
        .filter(([key]) =>
          [
            "cuenta",
            "gestiones",
            "visitas",
            "negociaciones",
            "accionamientos",
            "pagos",
          ].includes(key)
        )
        .some(([, checked]) => checked);
      if (!checkboxesValidos) {
        toast.warning(
          "Debe seleccionar al menos una opción: Cuenta, Gestiones, Visitas, Negociaciones, Accionamientos o Pagos"
        );
        return;
      }
      try {
        setIsLoading(true);
        console.log("[Archivo] Iniciando consulta por archivo. Archivo:", archivo);
        toast.loading("Consultando histórico por archivo...", { id: "buscar-loading" });
        const userData = JSON.parse(localStorage.getItem("userData"));
        const idCartera = userData?.idCartera || 1;
        const formatFecha = (fecha) => {
          if (!fecha) return null;
          const [dia, mes, anio] = fecha.split("/");
          return `${anio}-${mes}-${dia}`;
        };
        const body = {
          Archivo: archivo,
          IdCartera: idCartera,
          IncluirCuenta: checkedItems.cuenta,
          IncluirNegociaciones: checkedItems.negociaciones,
          IncluirVisitas: checkedItems.visitas,
          IncluirGestiones: checkedItems.gestiones,
          IncluirAccionamientos: checkedItems.accionamientos,
          IncluirPagos: checkedItems.pagos,
          UsarPeriodo: periodo,
          FechaDesde: periodo ? formatFecha(fechaDesde) : null,
          FechaHasta: periodo ? formatFecha(fechaHasta) : null,
        };  
        console.log("[Archivo] Body enviado a /Historico/archivo:", body);
        const result = await historyArchivoUpload(body);
        console.log("[Archivo] Respuesta recibida:", result);
        toast.dismiss("buscar-loading");
        if (result?.data && result.data.size === 0) {
          console.log("[Archivo] El archivo no contiene cuentas válidas");
          toast.warning("El archivo no contiene cuentas válidas");
          setExcelBlob(null);
          return;
        }
        // Si la respuesta es un ArrayBuffer, decodifica y parsea a JSON antes de exportar
        if (result.data instanceof ArrayBuffer) {
          const text = new TextDecoder("utf-8").decode(result.data);
          try {
            const json = JSON.parse(text);
            console.log("[ExcelExporter] JSON parseado desde ArrayBuffer:", json);
            if (json.Cuenta && Array.isArray(json.Cuenta)) {
              exportDataToXLSX(json.Cuenta, "HistoricoPorArchivo");
            } else {
              toast.error("No se encontró información de cuenta para exportar.");
            }
          } catch (e) {
            console.error("No se pudo parsear el ArrayBuffer a JSON", e);
            toast.error("Error al procesar los datos para exportar a Excel.");
          }
        } else if (result.data instanceof Blob && result.data.type === "application/json") {
          const text = await result.data.text();
          try {
            const json = JSON.parse(text);
            console.log("[ExcelExporter] JSON parseado:", json);
            if (json.Cuenta && Array.isArray(json.Cuenta)) {
              exportDataToXLSX(json.Cuenta, "HistoricoPorArchivo");
            } else {
              toast.error("No se encontró información de cuenta para exportar.");
            }
          } catch (e) {
            console.error("No se pudo parsear el blob a JSON", e);
            toast.error("Error al procesar los datos para exportar a Excel.");
          }
        } else if (Array.isArray(result.data)) {
          exportDataToXLSX(result.data, "HistoricoPorArchivo");
        } else {
          console.error("Formato de datos inesperado para exportar a Excel:", result.data);
          toast.error("Formato de datos inesperado para exportar a Excel.");
        }
      } catch (error) {
        console.error("[Archivo] Error al consultar histórico por archivo:", error);
        toast.dismiss("buscar-loading");
        toast.error("Error al consultar histórico por archivo");
      } finally {
        setIsLoading(false);
        console.log("[Archivo] Consulta por archivo finalizada");
      }
    }
  }, [isIndividual, allowSubmit, checkedItems, idCuenta, periodo, fechaDesde, fechaHasta, archivo, setIsLoading, setExcelBlob]);

  // Efecto para procesar automáticamente el archivo si ya está subido y hay al menos un checkbox marcado
  useEffect(() => {
    if (!isIndividual && archivo) {
      const algunoSeleccionado = Object.entries(checkedItems)
        .filter(([key]) => [
          "cuenta",
          "gestiones",
          "visitas",
          "negociaciones",
          "accionamientos",
          "pagos",
        ].includes(key))
        .some(([, checked]) => checked);
      if (algunoSeleccionado) {
        console.log("[Archivo] useEffect: archivo y checkbox válidos, procesando automáticamente");
        (async () => {
          await handleBuscar();
          // Limpiar archivo y checkboxes después de procesar
          setArchivo(null);
          const fileInput = document.getElementById("archivoInput");
          if (fileInput) fileInput.value = "";
          setCheckedItems({
            cuenta: false,
            gestiones: false,
            visitas: false,
            negociaciones: false,
            accionamientos: false,
            pagos: false,
          });
        })();
      }
    }
  }, [archivo, checkedItems, isIndividual, handleBuscar]);

  useEffect(() => {
    if (isIndividual === true) {
      toast.info("Introduzca la cuenta, seleccione qué concepto(s) para buscar en histórico y presione 'Buscar'.");
    } else if (isIndividual === false) {
      toast.info("Seleccione qué concepto(s) y seleccione el libro de Excel (UNA pestaña, UNA columna) con las cuentas para buscarlas en histórico.");
    }
  }, [isIndividual]);

  // Funciones para calcular fechas límite
  const getFechaMaxima = () => {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    return ayer.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  const getFechaMinima = () => {
    const hace10Anos = new Date();
    hace10Anos.setFullYear(hace10Anos.getFullYear() - 10);
    return hace10Anos.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };



  const handleCheckboxChange = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Descargar el archivo Excel cuando excelBlob cambie
  useEffect(() => {
    if (excelBlob) {
      const fileName = isIndividual
        ? `historico_${idCuenta}.xlsx`
        : `historico_archivo.xlsx`;
      const url = window.URL.createObjectURL(excelBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setExcelBlob(null);
    }
  }, [excelBlob, isIndividual, idCuenta]);

  // Eliminado efecto de showToast/cuentaError por no usarse


  // Función para limpiar estado del archivo
  // const limpiarEstadoArchivo = () => {} // Eliminado por no usarse

  // ...existing code...

  const handleTipoSeleccion = (individual) => {
    setAllowSubmit(false); // Evita submit al cambiar
    onIndividualChange(individual);
    // Función para obtener fecha un mes atrás en formato DD/MM/YYYY
    const getFechaMesAtras = () => {
      const hoy = new Date();
      const mesAtras = new Date(hoy);
      mesAtras.setMonth(hoy.getMonth() - 1);
      const dd = String(mesAtras.getDate()).padStart(2, "0");
      const mm = String(mesAtras.getMonth() + 1).padStart(2, "0");
      const yyyy = mesAtras.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };
    // Función para obtener fecha actual en formato DD/MM/YYYY
    const getFechaActual = () => {
      const hoy = new Date();
      const dd = String(hoy.getDate()).padStart(2, "0");
      const mm = String(hoy.getMonth() + 1).padStart(2, "0");
      const yyyy = hoy.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };
    setArchivo(null);
    setExcelBlob(null);
    if (individual) {
      setIdCuenta("");
      setCheckedItems((prev) => ({
        ...prev,
        cuenta: true,
        gestiones: false,
        visitas: false,
        negociaciones: false,
        accionamientos: false,
        pagos: false,
      }));
      setPeriodo(true);
      setFechaDesde(getFechaMesAtras());
      setFechaHasta(getFechaActual());
    } else {
      setIdCuenta("");
      setCheckedItems((prev) => ({
        ...prev,
        cuenta: false,
        gestiones: false,
        visitas: false,
        negociaciones: false,
        accionamientos: false,
        pagos: false,
      }));
      setPeriodo(true);
      setFechaDesde(getFechaMesAtras());
      setFechaHasta(getFechaActual());
    }
    setTimeout(() => setAllowSubmit(true), 100); // Reactiva submit tras cambio
    setTimeout(() => setAllowSubmit(true), 100); // Reactiva submit tras cambio
  };

  if (isIndividual == null) {
    // Mostrar solo el selector, centrado y sin padding extra
    return (
      <HistoricosTipoSelector
        cartera={cartera}
        setCartera={setCartera}
        carteras={carteras}
        carterasProductosData={carterasProductosData}
        setProductos={setProductos}
        setProducto={setProducto}
        isIndividual={isIndividual}
        setTipoSeleccionado={setTipoSeleccionado}
        handleTipoSeleccion={handleTipoSeleccion}
      />
    );
  }

  // Modal expandido: mostrar el resto del contenido con el div contenedor y padding
  return (
    <div
      style={{
        minWidth: "0px",
        overflowY: "auto",
        maxHeight: "70vh"
      }}
      className="overflow-y-auto w-full max-w-sm sm:max-w-[95vw] mx-auto"
    >
      {/* Nueva organización en columnas */}
      <div className="mb-6 w-full flex justify-center">
        <div className="w-full flex flex-col lg:flex-row gap-4 items-start">
          {/* Columna izquierda: checkboxes y input/botón */}
          <div className="w-full lg:w-2/3 flex flex-col gap-2">
            <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-2 w-full bg-white rounded-lg p-4 shadow-sm sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-2">
              {Object.entries(checkedItems).map(([key, checked]) => (
                <label key={key} className="flex items-center gap-x-2 text-xs font-medium text-gray-700 mb-2 w-full">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheckboxChange(key)}
                    className="form-checkbox rounded text-jerarquia1 focus:ring-jerarquia1"
                  />
                  <span className="capitalize">{key === "accionamientos" ? "Accionamientos" : key}</span>
                </label>
              ))}
            </div>
            {/* Input y botón juntos debajo de los checkboxes en lg+ */}
            <div className="w-full flex flex-col gap-2 mt-2 lg:flex-row lg:items-center lg:gap-4">
              {isIndividual ? (
                <>
                  <div className="relative w-full lg:w-2/3">
                    <input
                      type="text"
                      id="cuentaInput"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={16}
                      value={idCuenta}
                      onChange={(e) => {
                        let valor = e.target.value.replace(/\D/g, "");
                        if (valor.length > 16) valor = valor.slice(0, 16);
                        setIdCuenta(valor);
                        setExcelBlob(null);
                      }}
                      placeholder="Ingresa número de cuenta"
                      className="peer pt-4 pb-2 px-2 block w-full bg-gray-50 border border-jerarquia1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
                      style={{ color: 'var(--color-jerarquia3)' }}
                    />
                    <label
                      htmlFor="cuentaInput"
                      className="absolute left-2 top-2 bg-gray-50 px-1 text-xs text-jerarquia1 pointer-events-none transition-all duration-150 peer-focus:-translate-y-4 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-90"
                      style={{ zIndex: 10 }}
                    >
                      Cuenta
                    </label>
                  </div>
                  <div className="flex justify-center w-full lg:w-auto">
                    <button
                      type="button"
                      className="btn-success w-full lg:w-auto px-2 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                      disabled={isLoading}
                      onClick={async () => {
                        if (!allowSubmit) return;
                        // 1. Validar que haya al menos un checkbox seleccionado
                        const checkboxesValidos = Object.entries(checkedItems)
                          .filter(([key]) =>
                            [
                              "cuenta",
                              "gestiones",
                              "visitas",
                              "negociaciones",
                              "accionamientos",
                              "pagos",
                            ].includes(key)
                          )
                          .some(([, checked]) => checked);
                        if (!checkboxesValidos) {
                          toast.warning(
                            "Debe seleccionar al menos una opción: Cuenta, Gestiones, Visitas, Negociaciones, Accionamientos o Pagos"
                          );
                          return;
                        }
                        // 2. Si el checkbox "cuenta" está marcado, validar que haya una cuenta válida
                        if (checkedItems.cuenta) {
                          if (!idCuenta || idCuenta.trim() === "") {
                            toast.warning("Debe ingresar un número de cuenta");
                            return;
                          }
                          if (idCuenta.length < 6) {
                            toast.warning(
                              "Ingrese un número de cuenta válido (mínimo 6 dígitos)"
                            );
                            return;
                          }
                        }
                        await handleBuscar();
                      }}
                    >
                      {isLoading ? (
                        <>
                          <span
                            style={{
                              display: "inline-block",
                              width: "16px",
                              height: "16px",
                              border: "2px solid #ffffff",
                              borderTop: "2px solid transparent",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                              marginRight: "8px",
                            }}
                          ></span>
                          Buscando...
                        </>
                      ) : (
                        "Buscar"
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
                  <div className="flex justify-end w-full lg:w-auto mt-2">
                    <input
                      type="file"
                      id="archivoInput"
                      accept=".xlsx,.xls"
                      style={{ display: "none" }}
                      onChange={async e => {
                        if (e.target.files && e.target.files[0]) {
                          console.log("[Archivo] Archivo seleccionado desde input:", e.target.files[0]);
                          setArchivo(e.target.files[0]);
                          toast.success("Archivo seleccionado: " + e.target.files[0].name);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-success w-full lg:w-auto px-2 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                      disabled={isLoading}
                      onClick={async () => {
                        if (isLoading) return;
                        const algunoSeleccionado = Object.entries(checkedItems)
                          .filter(([key]) =>
                            [
                              "cuenta",
                              "gestiones",
                              "visitas",
                              "negociaciones",
                              "accionamientos",
                              "pagos",
                            ].includes(key)
                          )
                          .some(([, checked]) => checked);
                        if (!algunoSeleccionado) {
                          toast.warning(
                            "Debe seleccionar al menos una opción: Cuenta, Gestiones, Visitas, Negociaciones, Accionamientos o Pagos"
                          );
                          return;
                        }
                        if (!archivo) {
                          document.getElementById("archivoInput").click();
                          return;
                        }
                        console.log("[Archivo] Botón Seleccionar ejecutado. Archivo actual:", archivo);
                        await handleBuscar();
                      }}
                    >
                      {isLoading ? (
                        <>
                          <span
                            style={{
                              display: "inline-block",
                              width: "16px",
                              height: "16px",
                              border: "2px solid #ffffff",
                              borderTop: "2px solid transparent",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                              marginRight: "8px",
                            }}
                          ></span>
                          Seleccionando...
                        </>
                      ) : (
                        "Seleccionar"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Columna derecha: Período y calendarios solo en lg+ */}
          <div className="hidden lg:flex flex-col gap-0 w-1/3 bg-white rounded-lg pt-4 px-4 shadow-sm items-start">
            <label className="flex items-center gap-x-2 text-xs font-medium text-gray-700 mb-1 justify-end self-end">
              <span className="capitalize">Período</span>
              <input
                type="checkbox"
                checked={periodo}
                onChange={() => setPeriodo(!periodo)}
                className="form-checkbox rounded text-jerarquia1 focus:ring-jerarquia1"
              />
            </label>
            <div className="flex flex-col gap-2 w-full">
              <div className={`relative w-full min-w-0`}>
                <input
                  type="date"
                  id="fecha-desde-input"
                  max={getFechaMaxima()}
                  min={getFechaMinima()}
                  className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={fechaDesde.split("/").reverse().join("-")}
                  onChange={e => {
                    const nuevaFecha = e.target.value.split("-").reverse().join("/");
                    setFechaDesde(nuevaFecha);
                    const fechaHastaISO = fechaHasta.split("/").reverse().join("-");
                    if (e.target.value > fechaHastaISO) {
                      setFechaHasta(nuevaFecha);
                    }
                  }}
                  disabled={!periodo}
                  placeholder=" "
                />
                <label
                  htmlFor="fecha-desde-input"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                Desde
                </label>
              </div>
              <div className={`relative w-full min-w-0 mt-1`}>
                <input
                  type="date"
                  id="fecha-hasta-input"
                  max={getFechaMaxima()}
                  min={getFechaMinima()}
                  className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={fechaHasta.split("/").reverse().join("-")}
                  onChange={e => {
                    const nuevaFecha = e.target.value.split("-").reverse().join("/");
                    setFechaHasta(nuevaFecha);
                  }}
                  disabled={!periodo}
                  placeholder=" "
                />
                <label
                  htmlFor="fecha-hasta-input"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Hasta
                </label>
              </div>
            </div>
          </div>
          {/* Período y calendarios debajo del grid solo en md y menores */}
          <div className="flex flex-col gap-0 w-full bg-white rounded-lg pt-4 px-4 shadow-sm items-start lg:hidden mt-4">
            <label className="flex items-center gap-x-2 text-xs font-medium text-gray-700 mb-1 justify-end self-end">
              <span className="capitalize">Período</span>
              <input
                type="checkbox"
                checked={periodo}
                onChange={() => setPeriodo(!periodo)}
                className="form-checkbox rounded text-jerarquia1 focus:ring-jerarquia1"
              />
            </label>
            <div className="flex flex-col gap-2 w-full">
              <div className={`relative w-full min-w-0`}>
                <input
                  type="date"
                  id="fecha-desde-input"
                  max={getFechaMaxima()}
                  min={getFechaMinima()}
                  className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={fechaDesde.split("/").reverse().join("-")}
                  onChange={e => {
                    const nuevaFecha = e.target.value.split("-").reverse().join("/");
                    setFechaDesde(nuevaFecha);
                    const fechaHastaISO = fechaHasta.split("/").reverse().join("-");
                    if (e.target.value > fechaHastaISO) {
                      setFechaHasta(nuevaFecha);
                    }
                  }}
                  disabled={!periodo}
                  placeholder=" "
                />
                <label
                  htmlFor="fecha-desde-input"
                  className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                Desde
                </label>
              </div>
              <div className={`relative w-full min-w-0 mt-1`}>
                <input
                  type="date"
                  id="fecha-hasta-input"
                  max={getFechaMaxima()}
                  min={getFechaMinima()}
                  className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={fechaHasta.split("/").reverse().join("-")}
                  onChange={e => {
                    const nuevaFecha = e.target.value.split("-").reverse().join("/");
                    setFechaHasta(nuevaFecha);
                  }}
                  disabled={!periodo}
                  placeholder=" "
                />
                <label
                  htmlFor="fecha-hasta-input"
                  className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Hasta
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConsultaHistoricosFiltros;