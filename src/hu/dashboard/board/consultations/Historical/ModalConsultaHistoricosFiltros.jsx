import React, { useState, useEffect } from "react";
import HistoricosTipoSelector from "./HistoricosTipoSelector";
// import ExcelDownloader from "./ExcelDownloader";
// import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";
import { toast } from "sonner";

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
  tipoSeleccionado,
  setTipoSeleccionado
}) => {
  // Estados locales solo para lógica interna
  const [producto, setProductoLocal] = useState("");
  const [productos, setProductosLocal] = useState(["-Sin Producto-"]);
  const [archivo, setArchivo] = useState(null);
  const [cuentaError, setCuentaError] = useState("");
  // tipoSeleccionado y isIndividual ahora vienen del padre
  const [idCuenta, setIdCuenta] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    cuenta: true,
    gestiones: false,
    visitas: false,
    negociaciones: false,
    accionamientos: false,
    pagos: false,
  });

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

  const handleCheckboxChange = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const [excelBlob, setExcelBlob] = useState(null);
  // Eliminar estados no usados para evitar advertencias
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Ocultar el toast automáticamente después de 2 segundos
  useEffect(() => {
    if (showToast && cuentaError) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, cuentaError]);

  // Bandera para evitar petición individual al cambiar de modo
  const [allowSubmit, setAllowSubmit] = useState(true);

  // Función para limpiar estado del archivo
  const limpiarEstadoArchivo = () => {
    setArchivo(null);
    // Limpiar el input file
    const fileInput = document.getElementById("archivoInput");
    if (fileInput) {
      fileInput.value = "";
    }
    // Restablecer checkboxes al estado inicial del modo archivo
    setCheckedItems((prev) => ({
      ...prev,
      cuenta: false,
      gestiones: false,
      visitas: false,
      negociaciones: false,
      accionamientos: false,
      pagos: false,
    }));
  };

  const handleBuscar = async () => {
    if (isIndividual) {
      if (!allowSubmit) return;

      // 1. Primero validar que haya al menos un checkbox seleccionado
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
        // Activar spinner de carga
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

        // Remover toast de loading
        toast.dismiss("buscar-loading");

        if (result?.data && result.data.size === 0) {
          toast.warning("La cuenta ingresada no existe");
          setExcelBlob(null);
          return;
        }

        setExcelBlob(result.data);
        toast.success("Histórico consultado exitosamente. Descarga iniciada.");
      } catch (error) {
        console.error("Error al consultar histórico individual:", error);
        toast.dismiss("buscar-loading");
        toast.error("Error al consultar histórico individual");
      } finally {
        // Desactivar spinner
        setIsLoading(false);
      }
    }
  };

  const handleTipoSeleccion = (individual) => {
    setAllowSubmit(false); // Evita submit al cambiar
    onIndividualChange(individual);
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
  };

  return (
    <>

      <div
        style={{
          minWidth: "400px",
          paddingRight: "1rem",
          overflowY: isIndividual ? "auto" : "unset",
          maxHeight: isIndividual ? "70vh" : "unset"
        }}
      >
        {/* Logo eliminado */}
        {/* Renderizar controles solo en el body si el modal está en estado inicial */}
        {isIndividual == null && (
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
        )}

        {/* Mostrar el resto solo si se seleccionó un radio button */}
        {(isIndividual !== null && typeof isIndividual !== 'undefined') && (

          <>

            {/* Nueva organización en columnas */}
            <div className="mb-6 w-full flex justify-center">
              <div className="w-full max-w-3xl flex flex-row gap-8 items-start">
                {/* 3 columnas de 2 checkboxes */}
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 w-2/3 bg-white rounded-lg p-4 shadow-sm">
                  {Object.entries(checkedItems).map(([key, checked], idx) => (
                    <label key={key} className="flex items-center gap-x-2 text-xs font-medium text-gray-700 mb-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxChange(key)}
                        className="form-checkbox rounded text-jerarquia1 focus:ring-jerarquia1"
                      />
                      <span className="capitalize">{key === "accionamientos" ? "Accionamientos" : key}</span>
                    </label>
                  ))}
                  {/* Mostrar input y botón solo si está en modo Individual, y botón Seleccionar en modo Archivo */}
                  {isIndividual ? (
                    <div className="col-span-3 flex items-center gap-4 mt-2">
                      <div className="relative w-full max-w-xs">
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
                          className="peer pt-4 pb-2 px-4 block w-full bg-gray-50 border border-jerarquia1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
                          style={{ color: 'var(--color-jerarquia3)' }}
                        />
                        <label
                          htmlFor="cuentaInput"
                          className="absolute left-4 top-2 bg-gray-50 px-1 text-xs text-jerarquia1 pointer-events-none transition-all duration-150 peer-focus:-translate-y-4 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-90"
                          style={{ zIndex: 10 }}
                        >
                          Cuenta
                        </label>
                      </div>
                      <div className="flex justify-center w-full">
                        <button
                          type="button"
                          className="btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
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
                    </div>
                  ) : (
                    <div className="col-span-3 flex items-center gap-4 mt-2">
                      <div className="flex justify-end w-full mt-4">
                        <button
                          type="button"
                          className="btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                          disabled={isLoading}
                          onClick={() => {
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
                            document.getElementById("archivoInput").click();
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
                {/* Columna derecha: Período y calendarios */}
                <div className="flex flex-col gap-0 w-1/3 bg-white rounded-lg pt-4 px-4 shadow-sm items-start">
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

            {/* Input y botón debajo de las columnas */}




          </>
        )}
      </div>
    </>
  );
};

export default ModalConsultaHistoricosFiltros;