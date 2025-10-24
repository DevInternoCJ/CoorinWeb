import React, { useState, useEffect } from "react";
// import ExcelDownloader from "./ExcelDownloader";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";
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

const ModalConsultaHistoricosFiltros = ({ onIndividualChange }) => {
  // Estados para dropdowns de cartera/producto
  const [cartera, setCartera] = useState("");
  const [producto, setProducto] = useState("");
  const [carteras, setCarteras] = useState(["American Express"]); // Puedes cargar dinámicamente
  const [productos, setProductos] = useState(["-Sin Producto-"]);
  const [carterasProductosData, setCarterasProductosData] = useState([]); // [{cartera, producto}]
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null); // null: ninguno, true: individual, false: archivo
  const [isIndividual, setIsIndividual] = useState(null);
  const [idCuenta, setIdCuenta] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    cuenta: true,
    gestiones: false,
    visitas: false,
    negociaciones: false,
    accionamientos: false,
    pagos: false,
  });

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
  const [archivo, setArchivo] = useState(null);
  const [cuentaError, setCuentaError] = useState("");
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
    setIsIndividual(individual);
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
      <div style={{ minWidth: "400px", paddingRight: "1rem" }}>
        {/* Logo del Consorcio */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <img
            src={ConsorcioLogo}
            alt="Consorcio Jurídico"
            style={{ height: "60px", objectFit: "contain" }}
          />
        </div>

        {/* Sección Cartera con dropdown estilo preline */}
  <div className="relative w-full mb-2 max-w-xs mx-auto sm:max-w-[14rem] md:max-w-[12rem]">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 sm:w-[14rem] md:w-[12rem]"
            value={cartera}
            onChange={e => {
              setCartera(e.target.value);
              const productosFiltrados = carterasProductosData
                .filter(item => item.cartera === e.target.value)
                .map(item => item.producto);
              const productosConDefault = ["-Sin Producto-", ...productosFiltrados];
              setProductos(productosConDefault);
              setProducto("-Sin Producto-");
            }}
            id="cartera-select"
          >
            {carteras.length === 0 && <option value="" disabled hidden></option>}
            {carteras.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <label
            htmlFor="cartera-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Cartera
          </label>
        </div>

        {/* Radio buttons Individual/Archivo */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="tipo"
                checked={isIndividual === true}
                onChange={function () {
                  setTipoSeleccionado(true);
                  handleTipoSeleccion(true);
                }}
                className="modal-radio"
              />
              <span className="modal-span-2">Individual</span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="tipo"
                checked={isIndividual === false}
                onChange={function () {
                  setTipoSeleccionado(false);
                  handleTipoSeleccion(false);
                }}
                className="modal-radio"
              />
              <span className="modal-span-2">Archivo</span>
            </label>
          </div>
        </div>

        {/* Mostrar el resto solo si se seleccionó un radio button */}
        {tipoSeleccionado !== null && (

          <>
            {/* Checkboxes de tipos de consulta: ahora siempre visibles */}
            <div className="mb-6 w-full flex justify-center">
              <div className="w-full max-w-md flex flex-col items-center">
                <div className="grid grid-cols-3 gap-2 w-full bg-white rounded-lg p-2 shadow-sm justify-items-center sm:flex sm:flex-row sm:justify-center sm:items-center">
                  {Object.entries(checkedItems).map(([key, checked]) => (
                    <label key={key} className="flex items-center gap-1 justify-center sm:mb-0 mb-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxChange(key)}
                        className="modal-checkbox"
                      />
                      <span className="modal-span-2 capitalize">{key === "accionamientos" ? "Accionamientos" : key}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Período, Desde y Hasta alineados en un solo div */}
            <div className="mb-6 w-full flex justify-center"> 
              <div className="flex flex-row items-center gap-2 flex-wrap bg-white rounded-lg p-2 shadow-sm">
                {/* Checkbox Período */}
                <label className="flex items-center gap-2 cursor-pointer min-w-[80px]">
                  <input
                    type="checkbox"
                    checked={periodo}
                    onChange={() => setPeriodo(!periodo)}
                    className="modal-checkbox"
                  />
                  <span className="modal-span-1">Período</span>
                </label>
                {/* Desde */}
                <div className={`hs-input-group max-w-[120px] sm:max-w-[180px] ${!periodo ? 'opacity-50 pointer-events-none' : ''}`}>
                  <span className="hs-input-group-text min-w-[50px] sm:min-w-[70px]">Desde</span>
                  <input
                    type="date"
                    max={getFechaMaxima()}
                    min={getFechaMinima()}
                    className="bg-gray-50 py-2 px-2 sm:py-3 sm:px-4 block w-full border-gray-200 rounded-lg text-xs sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
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
                  />
                </div>
                {/* Hasta */}
                <div className={`hs-input-group max-w-[120px] sm:max-w-[180px] ${!periodo ? 'opacity-50 pointer-events-none' : ''}`}>
                  <span className="hs-input-group-text min-w-[50px] sm:min-w-[70px]">Hasta</span>
                  <input
                    type="date"
                    min={fechaDesde.split("/").reverse().join("-")}
                    max={getFechaMaxima()}
                    className="bg-gray-50 py-2 px-2 sm:py-3 sm:px-4 block w-full border-gray-200 rounded-lg text-xs sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    value={fechaHasta.split("/").reverse().join("-")}
                    onChange={e => {
                      const nuevaFecha = e.target.value.split("-").reverse().join("/");
                      setFechaHasta(nuevaFecha);
                    }}
                    disabled={!periodo}
                  />
                </div>
              </div>
            </div>


            {/* Campo de cuenta individual */}
            {isIndividual && (
              <>
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="flex flex-row items-center justify-center gap-2 w-full flex-wrap">
                    <label htmlFor="cuentaInput" className="modal-span-1 whitespace-nowrap text-sm font-medium">Cuenta:</label>
                    <input
                      id="cuentaInput"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={idCuenta}
                      onChange={(e) => {
                        const valor = e.target.value.replace(/\D/g, "");
                        setIdCuenta(valor);
                        setExcelBlob(null);
                      }}
                      placeholder="Ingrese el número de cuenta"
                      style={{
                        padding: "0.5rem",
                        border:
                          idCuenta.length < 6
                            ? "2px solid #e53e3e"
                            : "2px solid #d1d5db",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem"
                      }}
                      className="w-[8.5rem] sm:w-[20rem] md:w-[38.125rem]"
                    />
                    <button
                      onClick={handleBuscar}
                      className="modal-btn modal-btn-primary"
                      style={{ whiteSpace: "nowrap" }}
                      disabled={isLoading}
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
                {/* Descarga automática del Excel ahora se realiza por useEffect */}
              </>
            )}

            {/* Input file oculto y botón Seleccionar para modo Archivo */}
            {!isIndividual && (
              <div className="mb-6 w-full flex justify-center">
                <div className="w-full max-w-md flex flex-col items-center">
                  <button
                    type="button"
                    className="modal-btn modal-btn-primary mt-4 w-full max-w-xs sm:mt-0 sm:w-auto"
                    style={{
                      whiteSpace: "nowrap",
                      opacity:
                        isLoading ||
                        !Object.entries(checkedItems)
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
                          .some(([, checked]) => checked)
                          ? 0.6
                          : 1,
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
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
                        Procesando...
                      </>
                    ) : (
                      "Seleccionar"
                    )}
                  </button>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    id="archivoInput"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const archivoSeleccionado = e.target.files[0];
                      if (archivoSeleccionado) {
                        setArchivo(archivoSeleccionado);
                        setExcelBlob(null);
                        try {
                          setIsLoading(true);
                          toast.loading("Procesando archivo...", {
                            id: "archivo-loading",
                          });
                          const userData = JSON.parse(
                            localStorage.getItem("userData")
                          );
                          const idCartera = userData?.idCartera || 1;
                          const formatFecha = (fecha) => {
                            if (!fecha) return null;
                            const [dia, mes, anio] = fecha.split("/");
                            return `${anio}-${mes}-${dia}`;
                          };
                          const body = {
                            Archivo: archivoSeleccionado,
                            IdCartera: idCartera,
                            IncluirCuenta: checkedItems.cuenta,
                            IncluirNegociaciones: checkedItems.negociaciones,
                            IncluirVisitas: checkedItems.visitas,
                            IncluirGestiones: checkedItems.gestiones,
                            IncluirAccionamientos: checkedItems.accionamientos,
                            IncluirPagos: checkedItems.pagos,
                            UsarPeriodo: periodo,
                          };
                          if (periodo) {
                            body.FechaDesde = formatFecha(fechaDesde);
                            body.FechaHasta = formatFecha(fechaHasta);
                          }
                          console.log(
                            "Body enviado al endpoint archivo:",
                            body
                          );
                          const result = await historyArchivoUpload(body);
                          console.log("Respuesta del endpoint:", result);
                          toast.dismiss("archivo-loading");
                          if (result?.data) {
                            const excelBlob = new Blob([result.data], {
                              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            });
                            if (excelBlob.size === 0) {
                              toast.warning(
                                "El archivo no contiene cuentas válidas"
                              );
                              return;
                            }
                            const fileName = `historico_archivo_${new Date()
                              .toISOString()
                              .slice(0, 10)}.xlsx`;
                            const url = window.URL.createObjectURL(excelBlob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute("download", fileName);
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                            window.URL.revokeObjectURL(url);
                            toast.success(
                              "Archivo procesado y descargado correctamente"
                            );
                            console.log("Archivo procesado exitosamente");
                            setTimeout(() => {
                              limpiarEstadoArchivo();
                              toast.info(
                                "Puede cargar un nuevo archivo si lo desea"
                              );
                            }, 1500);
                          } else {
                            toast.warning("El archivo no pudo ser procesado");
                          }
                        } catch (error) {
                          console.error(
                            "Error al consultar histórico por archivo:",
                            error
                          );
                          toast.dismiss("archivo-loading");
                          toast.error(
                            "Error al consultar histórico por archivo"
                          );
                          setTimeout(() => {
                            limpiarEstadoArchivo();
                          }, 1000);
                        } finally {
                          setIsLoading(false);
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}

          </>
        )}
      </div>
    </>
  );
};

export default ModalConsultaHistoricosFiltros;
