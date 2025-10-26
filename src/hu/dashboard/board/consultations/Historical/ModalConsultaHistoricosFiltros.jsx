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
      <div className="w-full md:grid md:grid-cols-3 md:gap-3 flex flex-col">
  {/* Columna 1: Logo, dropdown, radios */}
  <div className="flex flex-col items-center md:items-center md:justify-center gap-4 md:gap-6 text-center">
          <div className="flex justify-center md:justify-start mb-4 md:mb-0">
            <img src={ConsorcioLogo} alt="Consorcio Jurídico" style={{ height: "60px", objectFit: "contain" }} />
          </div>
          <div className="relative w-full mb-2 max-w-xs md:max-w-[12rem]">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 md:w-[12rem]"
              value={cartera}
              onChange={e => {
                setCartera(e.target.value);
                const productosFiltrados = carterasProductosData.filter(item => item.cartera === e.target.value).map(item => item.producto);
                const productosConDefault = ["-Sin Producto-", ...productosFiltrados];
                setProductos(productosConDefault);
                setProducto("-Sin Producto-");
              }}
              id="cartera-select"
            >
              {carteras.length === 0 && <option value="" disabled hidden></option>}
              {carteras.map(c => (<option key={c} value={c}>{c}</option>))}
            </select>
            <label htmlFor="cartera-select" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">Cartera</label>
          </div>
          <div className="flex gap-6 md:gap-2 justify-center md:justify-start mb-2">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="tipo" checked={isIndividual === true} onChange={() => { setTipoSeleccionado(true); handleTipoSeleccion(true); }} className="modal-radio" />
              <span className="modal-span-2">Individual</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="tipo" checked={isIndividual === false} onChange={() => { setTipoSeleccionado(false); handleTipoSeleccion(false); }} className="modal-radio" />
              <span className="modal-span-2">Archivo</span>
            </label>
          </div>
        </div>

        {/* Columna 2: Checkboxes en dos filas */}
        {tipoSeleccionado !== null && (
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
            <div className="grid grid-rows-6 gap-2 w-full bg-white rounded-lg p-2 shadow-sm place-items-center text-center">
              {['cuenta','gestiones','visitas','negociaciones','accionamientos','pagos'].map(key => (
                <div key={key} className="flex items-center gap-1 justify-center">
                  <input type="checkbox" checked={checkedItems[key]} onChange={() => handleCheckboxChange(key)} className="modal-checkbox" />
                  <span className="modal-span-2 capitalize">{key === "accionamientos" ? "Accionamientos" : key}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Columna 3: Período y calendarios */}
        {tipoSeleccionado !== null && (
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 h-full">
            <div className="grid grid-rows-3 gap-2 w-full bg-white rounded-lg p-2 shadow-sm place-items-center text-center h-full items-center justify-center">
              <div className="flex items-center gap-2 my-0 md:my-0">
                <label className="flex items-center gap-2 cursor-pointer min-w-[80px]">
                  <input type="checkbox" checked={periodo} onChange={() => setPeriodo(!periodo)} className="modal-checkbox" />
                  <span className="modal-span-1">Período</span>
                </label>
              </div>
              <div className={`hs-input-group w-full ${!periodo ? 'opacity-50 pointer-events-none' : ''}`}> 
                <span className="hs-input-group-text min-w-[50px] sm:min-w-[70px]">Desde</span>
                <input type="date" max={getFechaMaxima()} min={getFechaMinima()} className="bg-gray-50 py-2 px-2 sm:py-3 sm:px-4 block w-full border-gray-200 rounded-lg text-xs sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={fechaDesde.split("/").reverse().join("-")} onChange={e => { const nuevaFecha = e.target.value.split("-").reverse().join("/"); setFechaDesde(nuevaFecha); const fechaHastaISO = fechaHasta.split("/").reverse().join("-"); if (e.target.value > fechaHastaISO) { setFechaHasta(nuevaFecha); } }} disabled={!periodo} />
              </div>
              <div className={`hs-input-group w-full ${!periodo ? 'opacity-50 pointer-events-none' : ''}`}> 
                <span className="hs-input-group-text min-w-[50px] sm:min-w-[70px]">Hasta</span>
                <input type="date" min={fechaDesde.split("/").reverse().join("-")} max={getFechaMaxima()} className="bg-gray-50 py-2 px-2 sm:py-3 sm:px-4 block w-full border-gray-200 rounded-lg text-xs sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={fechaHasta.split("/").reverse().join("-")} onChange={e => { const nuevaFecha = e.target.value.split("-").reverse().join("/"); setFechaHasta(nuevaFecha); }} disabled={!periodo} />
              </div>
            </div>
          </div>
        )}

        {/* Abajo de todo: input cuenta y botón buscar, respetando orden mobile */}
        {tipoSeleccionado !== null && isIndividual && (
          <div className="w-full flex justify-center items-center gap-4 mt-4">
            <label htmlFor="cuentaInput" className="modal-span-1 whitespace-nowrap text-sm font-medium">Cuenta:</label>
            <input id="cuentaInput" type="text" inputMode="numeric" pattern="[0-9]*" value={idCuenta} onChange={e => { const valor = e.target.value.replace(/\D/g, ""); setIdCuenta(valor); setExcelBlob(null); }} placeholder="Ingrese el número de cuenta" style={{ padding: "0.5rem", border: idCuenta.length < 6 ? "2px solid #e53e3e" : "2px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem" }} className="w-full max-w-md" />
            <button type="button" className={`btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center${isLoading ? ' opacity-50 cursor-not-allowed' : ''}`} onClick={handleBuscar} disabled={isLoading} style={{ whiteSpace: "nowrap" }}>
              {isLoading ? (<><span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #ffffff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: "8px" }}></span>Buscando...</>) : ("Buscar")}
            </button>
          </div>
        )}

        {/* Input file oculto y botón Seleccionar para modo Archivo */}
        {tipoSeleccionado !== null && !isIndividual && (
          <div className="mb-6 w-full flex justify-center">
            <div className="w-full max-w-md flex flex-col items-center">
              <button type="button" className={`btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center mt-4 max-w-xs sm:mt-0${isLoading || !Object.entries(checkedItems).filter(([key]) => ["cuenta","gestiones","visitas","negociaciones","accionamientos","pagos"].includes(key)).some(([, checked]) => checked) ? ' opacity-50 cursor-not-allowed' : ''}`} style={{ whiteSpace: "nowrap" }} disabled={isLoading || !Object.entries(checkedItems).filter(([key]) => ["cuenta","gestiones","visitas","negociaciones","accionamientos","pagos"].includes(key)).some(([, checked]) => checked)} onClick={() => { if (isLoading) return; const algunoSeleccionado = Object.entries(checkedItems).filter(([key]) => ["cuenta","gestiones","visitas","negociaciones","accionamientos","pagos"].includes(key)).some(([, checked]) => checked); if (!algunoSeleccionado) { toast.warning("Debe seleccionar al menos una opción: Cuenta, Gestiones, Visitas, Negociaciones, Accionamientos o Pagos"); return; } document.getElementById("archivoInput").click(); }}>
                {isLoading ? (<><span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #ffffff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: "8px" }}></span>Procesando...</>) : ("Seleccionar")}
              </button>
              <input type="file" accept=".xlsx,.xls" id="archivoInput" style={{ display: "none" }} onChange={async e => { const archivoSeleccionado = e.target.files[0]; if (archivoSeleccionado) { setArchivo(archivoSeleccionado); setExcelBlob(null); try { setIsLoading(true); toast.loading("Procesando archivo...", { id: "archivo-loading" }); const userData = JSON.parse(localStorage.getItem("userData")); const idCartera = userData?.idCartera || 1; const formatFecha = fecha => { if (!fecha) return null; const [dia, mes, anio] = fecha.split("/"); return `${anio}-${mes}-${dia}`; }; const body = { Archivo: archivoSeleccionado, IdCartera: idCartera, IncluirCuenta: checkedItems.cuenta, IncluirNegociaciones: checkedItems.negociaciones, IncluirVisitas: checkedItems.visitas, IncluirGestiones: checkedItems.gestiones, IncluirAccionamientos: checkedItems.accionamientos, IncluirPagos: checkedItems.pagos, UsarPeriodo: periodo, }; if (periodo) { body.FechaDesde = formatFecha(fechaDesde); body.FechaHasta = formatFecha(fechaHasta); } console.log("Body enviado al endpoint archivo:", body); const result = await historyArchivoUpload(body); console.log("Respuesta del endpoint:", result); toast.dismiss("archivo-loading"); if (result?.data) { const excelBlob = new Blob([result.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", }); if (excelBlob.size === 0) { toast.warning("El archivo no contiene cuentas válidas"); return; } const fileName = `historico_archivo_${new Date().toISOString().slice(0, 10)}.xlsx`; const url = window.URL.createObjectURL(excelBlob); const link = document.createElement("a"); link.href = url; link.setAttribute("download", fileName); document.body.appendChild(link); link.click(); link.remove(); window.URL.revokeObjectURL(url); toast.success("Archivo procesado y descargado correctamente"); console.log("Archivo procesado exitosamente"); setTimeout(() => { limpiarEstadoArchivo(); toast.info("Puede cargar un nuevo archivo si lo desea"); }, 1500); } else { toast.warning("El archivo no pudo ser procesado"); } } catch (error) { console.error("Error al consultar histórico por archivo:", error); toast.dismiss("archivo-loading"); toast.error("Error al consultar histórico por archivo"); setTimeout(() => { limpiarEstadoArchivo(); }, 1000); } finally { setIsLoading(false); } } }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalConsultaHistoricosFiltros;
