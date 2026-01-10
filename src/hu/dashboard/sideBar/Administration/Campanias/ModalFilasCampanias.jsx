import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import {
  infoEjecutivo,
  CargarFilasConsulta,
  campainghInCharge,
  sendArchiveCampanias,
} from "../../../../../services/mark/orochi/LokiServices";

const ModalFilasCampañas = ({
  open,
  onClose,
  cartera = "American Express",
  idCampaña,
  onSuccess, // Callback para ejecutar después del éxito
}) => {
  // Estado para loading del botón cargar
  const [loading, setLoading] = useState(false);
  const [tipoFilas, setTipoFilas] = useState("archivo");
  const [fileName, setFileName] = useState("");
  const [fileRows, setFileRows] = useState([]);
  const [fileCols, setFileCols] = useState(0);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ col: null, direction: null });
  const [originalRows, setOriginalRows] = useState([]);

  // Estados para las consultas
  const [consultas, setConsultas] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState("");

  // Estados para el resultado de carga de consulta
  const [consultaCargada, setConsultaCargada] = useState(false);
  const [filasCargadas, setFilasCargadas] = useState(0);
  const [mensajeCarga, setMensajeCarga] = useState("");

  // Estado para controlar si el formato de headers es válido
  const [formatoValido, setFormatoValido] = useState(true);
  const [mensajeValidacion, setMensajeValidacion] = useState("");

  // Limpiar estados al cerrar el modal
  React.useEffect(() => {
    if (!open) {
      setTipoFilas("archivo");
      setFileName("");
      setFileRows([]);
      setFileCols(0);
      setFileHeaders([]);
      setSortConfig({ col: null, direction: null });
      setOriginalRows([]);
      setConsultas([]);
      setSelectedConsulta("");
      setConsultaCargada(false);
      setFilasCargadas(0);
      setMensajeCarga("");
      setFormatoValido(true);
      setMensajeValidacion("");
    }
  }, [open]);

  // Cargar consultas cuando se abre el modal
  useEffect(() => {
    const cargarConsultas = async () => {
      if (open) {
        try {
          setLoadingConsultas(true);

          // Obtener el idEjecutivo del localStorage
          const userData = JSON.parse(localStorage.getItem("userData"));
          const idEjecutivo =
            userData?.idEjecutivo ||
            userData?.idejecutivo ||
            userData?.id ||
            null;

          if (!idEjecutivo) {
            toast.error("No se pudo obtener el ID del ejecutivo");
            return;
          }

          // Llamar al endpoint
          console.log("Llamando a infoEjecutivo con idEjecutivo:", idEjecutivo);
          const response = await infoEjecutivo(idEjecutivo);
          console.log("Respuesta recibida:", response);

          // Verificar si la respuesta es un array o un objeto único
          const consultasArray = Array.isArray(response)
            ? response
            : [response];
          console.log("Consultas procesadas:", consultasArray);

          setConsultas(consultasArray);

          // Si hay consultas, seleccionar la primera por defecto
          if (consultasArray.length > 0) {
            setSelectedConsulta(consultasArray[0].idConsulta.toString());
            console.log(
              "Consulta seleccionada por defecto:",
              consultasArray[0].NombreConsulta
            );
          }
        } catch (error) {
          console.error("Error al cargar consultas:", error);
          toast.error("Error al cargar las consultas disponibles");
        } finally {
          setLoadingConsultas(false);
        }
      }
    };

    cargarConsultas();
  }, [open]);

  // Función para determinar si mostrar "F2" en lugar de "Expr1001"
  const shouldShowF2ForColumn2 = () => {
    // Solo si tenemos exactamente 3 columnas
    if (fileHeaders.length !== 3) return false;

    // Limpiar headers
    const cleanHeaders = fileHeaders.map((header) =>
      header
        ? header
            .toString()
            .trim()
            .replace(/[\r\n]/g, "")
        : ""
    );

    // Función local para normalizar
    const normalize = (text) => {
      if (!text) return "";
      return text
        .toString()
        .toLowerCase()
        .replace(/[áàäâ]/g, "a")
        .replace(/[éèëê]/g, "e")
        .replace(/[íìïî]/g, "i")
        .replace(/[óòöô]/g, "o")
        .replace(/[úùüû]/g, "u")
        .replace(/ñ/g, "n");
    };

    // Verificar si posición 1 es "Cuenta" y posición 3 es "Teléfono"/"Telefono"
    const pos1Valid = normalize(cleanHeaders[0]) === "cuenta";
    const pos3Valid = ["telefono"].includes(normalize(cleanHeaders[2]));
    const pos2Empty = !cleanHeaders[1] || cleanHeaders[1].trim() === "";

    console.log("🔍 Evaluando F2:", {
      pos1Valid,
      pos2Empty,
      pos3Valid,
      headers: cleanHeaders,
    });

    return pos1Valid && pos2Empty && pos3Valid;
  };

  // Validar formato de headers
  const validateHeaders = (headers) => {
    // Verificar que tengamos exactamente 3 columnas
    if (headers.length !== 3) {
      return {
        valid: false,
        message: "El archivo debe tener exactamente 3 columnas",
      };
    }

    // Limpiar los headers de espacios en blanco y caracteres especiales
    const cleanHeaders = headers.map((header) =>
      header
        ? header
            .toString()
            .trim()
            .replace(/[\r\n]/g, "")
        : ""
    );

    // Debug: mostrar los headers recibidos
    console.log("Headers recibidos:", cleanHeaders);
    console.log("Headers originales:", headers);
    console.log(
      "Headers detallados:",
      cleanHeaders.map(
        (h, i) => `[${i}]: "${h}" ${h === "" ? "(VACÍO)" : "(OK)"}`
      )
    );

    // Función para normalizar texto (quitar tildes y convertir a minúsculas para comparación)
    const normalizeText = (text) => {
      // Manejar casos donde text es null, undefined o vacío
      if (!text || text === null || text === undefined) {
        return "";
      }

      return text
        .toString()
        .toLowerCase()
        .replace(/[áàäâ]/g, "a")
        .replace(/[éèëê]/g, "e")
        .replace(/[íìïî]/g, "i")
        .replace(/[óòöô]/g, "o")
        .replace(/[úùüû]/g, "u")
        .replace(/ñ/g, "n");
    };

    // Definir variaciones aceptables para cada posición
    const validHeaders = [
      // Posición 1: Cuenta
      ["cuenta"],
      // Posición 2: Usuario
      ["usuario"],
      // Posición 3: Teléfono (con y sin tilde)
      ["telefono", "teléfono"],
    ];

    let errores = [];
    let hasValidFormat = true;

    // Verificar si tenemos exactamente 3 columnas
    if (headers.length !== 3) {
      hasValidFormat = false;
      if (headers.length < 3) {
        errores.push(
          `Faltan ${
            3 - headers.length
          } columna(s). Se requieren 3 columnas: Cuenta, Usuario, Teléfono`
        );
      } else {
        errores.push(
          `Hay ${
            headers.length - 3
          } columna(s) de más. Se requieren exactamente 3 columnas: Cuenta, Usuario, Teléfono`
        );
      }
    }

    // Verificar cada posición disponible (máximo 3)
    const maxCheck = Math.min(cleanHeaders.length, 3);
    for (let i = 0; i < maxCheck; i++) {
      const headerNormalizado = normalizeText(cleanHeaders[i]);
      const validOptions = validHeaders[i];

      // Si el header está vacío
      if (!cleanHeaders[i] || cleanHeaders[i].trim() === "") {
        hasValidFormat = false;
        const expectedOptions = validHeaders[i]
          .map((option) => `"${option}"`)
          .join(" o ");
        errores.push(
          `Posición ${i + 1}: Header vacío. Se esperaba ${expectedOptions}`
        );
        continue;
      }

      // Verificar si el header actual coincide con alguna opción válida
      const isValid = validOptions.some(
        (option) => normalizeText(option) === headerNormalizado
      );

      if (!isValid) {
        hasValidFormat = false;
        const expectedOptions = validHeaders[i]
          .map((option) => `"${option}"`)
          .join(" o ");
        errores.push(
          `Posición ${
            i + 1
          }: Se esperaba ${expectedOptions}, pero se recibió "${
            cleanHeaders[i]
          }"`
        );
      }
    }

    if (hasValidFormat) {
      console.log("✅ Headers válidos - formato correcto");
      return { valid: true };
    } else {
      const mensajeError = `El formato del documento es incorrecto. ${errores.join(
        ". "
      )}`;
      console.log("Headers inválidos:", errores);
      return {
        valid: false,
        message: mensajeError,
      };
    }
  };

  // Procesar archivo CSV
  // Ordenamiento
  const handleSort = (colIdx, type) => {
    if (sortConfig.col === colIdx) {
      // Si ya está ordenando esta columna, revertir al original
      setSortConfig({ col: null, direction: null });
      setFileRows([...originalRows]);
    } else {
      let sorted = [...fileRows];
      if (type === "number") {
        // Si el header es Teléfono, ordenar por longitud descendente
        if (fileHeaders[colIdx] === "Teléfono") {
          sorted.sort(
            (a, b) =>
              (b[colIdx] || "").toString().length -
              (a[colIdx] || "").toString().length
          );
        } else {
          sorted.sort((a, b) => {
            const numA = parseFloat(a[colIdx]) || 0;
            const numB = parseFloat(b[colIdx]) || 0;
            return numA - numB;
          });
        }
      } else {
        sorted.sort((a, b) => {
          const valA = (a[colIdx] || "").toString().toLowerCase();
          const valB = (b[colIdx] || "").toString().toLowerCase();
          return valA.localeCompare(valB);
        });
      }
      setSortConfig({ col: colIdx, direction: "asc" });
      setFileRows(sorted);
    }
  };

  // Procesar archivo CSV
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "csv") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).filter(Boolean);
        let headers = [];
        let rows = [];
        if (lines.length > 0) {
          headers = lines[0].split(",");

          // Debug: mostrar información del archivo
          console.log("🔍 Procesando archivo CSV:");
          console.log("- Total de líneas:", lines.length);
          console.log("- Headers:", headers);
          console.log("- Número de columnas:", headers.length);

          // Validar formato de headers
          const validation = validateHeaders(headers);
          if (!validation.valid) {
            toast.error(validation.message);
            setFormatoValido(false);
            setMensajeValidacion(validation.message);
          } else {
            setFormatoValido(true);
            setMensajeValidacion("");
          }

          rows = lines.slice(1).map((line) => {
            const cols = line.split(",");
            return cols;
          });

          console.log("- Filas de datos:", rows.length);
          console.log("- Primeras 3 filas:", rows.slice(0, 3));
        }
        setFileHeaders(headers);
        setFileCols(headers.length);
        setFileRows(rows);
        setOriginalRows(rows);

        console.log("✅ Estados actualizados:");
        console.log("- fileHeaders:", headers);
        console.log("- fileCols:", headers.length);
        console.log("- fileRows length:", rows.length);
      };
      reader.readAsText(file);
    } else if (ext === "xlsx") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        let headers = [];
        let rows = [];
        if (json.length > 0) {
          headers = json[0];

          // Debug: mostrar información del archivo
          console.log("🔍 Procesando archivo XLSX:");
          console.log("- Total de filas JSON:", json.length);
          console.log("- Headers:", headers);
          console.log("- Número de columnas:", headers.length);

          // Validar formato de headers
          const validation = validateHeaders(headers);
          if (!validation.valid) {
            toast.error(validation.message);
            setFormatoValido(false);
            setMensajeValidacion(validation.message);
          } else {
            setFormatoValido(true);
            setMensajeValidacion("");
          }

          rows = json.slice(1);

          console.log("- Filas de datos:", rows.length);
          console.log("- Primeras 3 filas:", rows.slice(0, 3));
        }
        setFileHeaders(headers);
        setFileCols(headers.length);
        setFileRows(rows);
        setOriginalRows(rows);

        console.log("✅ Estados XLSX actualizados:");
        console.log("- fileHeaders:", headers);
        console.log("- fileCols:", headers.length);
        console.log("- fileRows length:", rows.length);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Acción al presionar Cargar (solo modo archivo)
  const handleCargarArchivo = async () => {
    if (!idCampaña) {
      toast.error("No se encontró el id de la campaña.");
      return;
    }

    // Validar formato antes de cargar
    if (!formatoValido) {
      toast.error(
        "El formato del documento es incorrecto. No se puede procesar la carga."
      );
      return;
    }

    // Validar que haya datos cargados
    if (fileRows.length === 0) {
      toast.error(
        "No hay datos para cargar. Por favor seleccione un archivo válido."
      );
      return;
    }

    // Validar que los campos requeridos no estén vacíos (Cuenta y Teléfono)
    // Usuario puede estar vacío
    const filasConErrores = fileRows.filter(
      (row) =>
        !row[0] ||
        row[0].toString().trim() === "" || // Cuenta vacía
        !row[2] ||
        row[2].toString().trim() === "" // Teléfono vacío
      // row[1] (Usuario) puede estar vacío - no se valida
    );

    if (filasConErrores.length > 0) {
      toast.error(
        `Hay ${filasConErrores.length} fila(s) con datos requeridos vacíos. Los campos Cuenta y Teléfono son obligatorios.`
      );
      return;
    }

    // Obtener idCartera
    const idCartera = getIdCartera();

    // Obtener el archivo original del input
    const fileInput = document.querySelector(
      'input[type="file"][accept=".csv,.xlsx"]'
    );
    const archivo =
      fileInput && fileInput.files && fileInput.files[0]
        ? fileInput.files[0]
        : null;
    if (!archivo) {
      toast.error("No se encontró el archivo seleccionado.");
      return;
    }

    setLoading(true);
    try {
      // Construir el body para el endpoint
      const body = {
        Archivo: archivo,
        IdCampania: idCampaña,
        IdCartera: idCartera,
      };
      const response = await sendArchiveCampanias(body);
      // Esperamos respuesta tipo { mensaje, totalRegistros }
      if (response && response.data) {
        // Si la respuesta es un arraybuffer, intentar parsear a JSON
        let data = response.data;
        if (response.config && response.config.responseType === "arraybuffer") {
          try {
            const decoder = new TextDecoder("utf-8");
            const text = decoder.decode(new Uint8Array(data));
            data = JSON.parse(text);
          } catch (e) {
            // Si falla el parseo, mostrar error genérico
            toast.error("No se pudo procesar la respuesta del servidor.", e);
            setMensajeCarga("");
            setFilasCargadas(0);
            return;
          }
        }
        // Construir mensaje de éxito y, si corresponde, agregar el conteo de filas
        const total = data.totalRegistros || 0;
        let serverMsg = (data.mensaje || "Carga exitosa").toString();
        // Si el servidor reporta el mensaje de procesamiento estándar, mostrar sólo el conteo de filas
        if (/carga filas procesadas correctamente/i.test(serverMsg)) {
          serverMsg = `Se cargaron ${total} filas.`;
        }
        toast.success(serverMsg);
        setMensajeCarga(serverMsg);
        setFilasCargadas(total);
        // Si hay callback de éxito, ejecutarlo para actualizar campañas
        if (typeof onSuccess === "function") {
          setTimeout(async () => {
            try {
              await onSuccess();
            } catch (refreshError) {
              console.error(
                "Error al actualizar campañas tras carga de archivo:",
                refreshError
              );
            }
          }, 0); // pequeño delay para UX
        }
      } else {
        toast.error("No se recibió respuesta válida del servidor.");
        setMensajeCarga("");
        setFilasCargadas(0);
      }
    } catch (err) {
      let errorMsg = "Error al cargar filas.";
      if (err.response && err.response.data) {
        try {
          // Si es arraybuffer, intentar parsear
          const decoder = new TextDecoder("utf-8");
          const text = decoder.decode(new Uint8Array(err.response.data));
          const data = JSON.parse(text);
          errorMsg = data.mensaje || errorMsg;
        } catch (e) {
          (errorMsg =
            "No se pudo procesar la respuesta de error del servidor."),
            e;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg);
      setMensajeCarga(errorMsg);
      setFilasCargadas(0);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener idCartera desde localStorage
  const getIdCartera = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.idCartera || userData?.idcartera || userData?.cartera || 1; // fallback a 1 si no existe
  };

  // Función para obtener idEncargado (idEjecutivo) desde localStorage
  const getIdEncargado = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.idEjecutivo || userData?.idejecutivo || userData?.id || 1; // fallback a 1 si no existe
  };

  // Función para obtener idProducto desde localStorage
  const getIdProducto = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return (
      userData?.idProducto || userData?.idproducto || userData?.producto || 1
    ); // fallback a 1 si no existe
  };

  // Acción al presionar Cargar (modo consulta)
  const handleCargarConsulta = async () => {
    if (!selectedConsulta) {
      toast.error("Por favor selecciona una consulta.");
      return;
    }

    if (!idCampaña) {
      toast.error("No se encontró el id de la campaña.");
      return;
    }

    setLoading(true);
    try {
      // Obtener idCartera del localStorage
      const idCartera = getIdCartera();

      // Preparar el payload para el endpoint
      const payload = {
        idCampania: idCampaña,
        idConsulta: parseInt(selectedConsulta),
        idCartera: idCartera,
      };

      console.log("Enviando a CargarFilasConsulta con payload:", payload);

      // Llamar al endpoint
      const response = await CargarFilasConsulta(payload);
      console.log("Respuesta recibida:", response);

      // Validar que la respuesta tenga la estructura esperada
      if (!response) {
        throw new Error("No se recibió respuesta del servidor");
      }

      // Manejar la respuesta exitosa
      const { mensaje, filasCargadas } = response;

      // Obtener el número de filas cargadas (el valor del objeto filasCargadas)
      const totalFilas = filasCargadas
        ? Object.values(filasCargadas)[0] || 0
        : 0;

      // Mostrar toast de éxito con información específica
      if (totalFilas > 0) {
        toast.success(
          `${mensaje || "Se cargaron correctamente"} - ${totalFilas} filas`
        );
      } else {
        toast.warning(`${mensaje || "Consulta procesada"} - 0 filas cargadas`);
      }

      // Actualizar los estados para mostrar en el footer
      setConsultaCargada(true);
      setFilasCargadas(totalFilas);
      setMensajeCarga(`${totalFilas} filas cargadas`);

      // Llamar al endpoint campainghInCharge después del éxito
      try {
        const idEncargado = getIdEncargado();
        const idProducto = getIdProducto();

        console.log("Llamando a campainghInCharge con:", {
          idEncargado,
          idCartera,
          idProducto,
        });

        const campainResponse = await campainghInCharge({
          idEncargado,
          idCartera,
          idProducto,
        });

        console.log("Respuesta de campainghInCharge:", campainResponse);

        // Llamar al callback de éxito para actualizar la tabla de campañas
        if (typeof onSuccess === "function") {
          // Pequeño delay para que el usuario vea el toast de éxito
          setTimeout(async () => {
            try {
              console.log("Actualizando tabla de campañas...");
              await onSuccess();
              console.log("Tabla de campañas actualizada");
            } catch (refreshError) {
              console.error("Error al actualizar tabla:", refreshError);
            }
          }, 1000); // 1 segundo de delay
        }
      } catch (campainError) {
        console.error("Error en campainghInCharge (no crítico):", campainError);
        // No mostramos error al usuario ya que la carga principal fue exitosa

        // Aún así, intentamos actualizar la tabla (fallback)
        if (typeof onSuccess === "function") {
          setTimeout(async () => {
            try {
              console.log("Actualizando tabla de campañas (fallback)...");
              await onSuccess();
              console.log("Tabla de campañas actualizada (fallback)");
            } catch (refreshError) {
              console.error(
                "Error al actualizar tabla (fallback):",
                refreshError
              );
            }
          }, 1000);
        }
      }
    } catch (err) {
      console.error("❌ Error al cargar la consulta:", err);

      // Mensaje de error específico y claro para el usuario
      let errorMessage = "No se pudo realizar la carga de filas";

      // Personalizar mensaje según el tipo de error
      if (err.response?.status === 401) {
        errorMessage = "Sesión expirada. Por favor, inicia sesión nuevamente";
      } else if (err.response?.status === 404) {
        errorMessage = "No se encontró la consulta o campaña especificada";
      } else if (err.response?.status === 500) {
        errorMessage = "Error interno del servidor. Intenta nuevamente";
      } else if (err.message?.includes("token")) {
        errorMessage = "Error de autenticación. Verifica tu sesión";
      } else if (err.message?.includes("Network")) {
        errorMessage = "Error de conexión. Verifica tu conexión a internet";
      } else if (err.message?.includes("timeout")) {
        errorMessage = "La operación tardó demasiado. Intenta nuevamente";
      } else if (err.response?.data?.message) {
        // Si el servidor envía un mensaje específico, usarlo
        errorMessage = `No se pudo cargar: ${err.response.data.message}`;
      } else if (err.message) {
        // Usar el mensaje del error si existe
        errorMessage = `Error: ${err.message}`;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return open ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 8,
          padding: 28,
          minWidth: 900,
          minHeight: 520,
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="flex items-center mb-2 w-full"
          style={{ position: "relative" }}
        >
          <span
            className="modal-span-1 pl-1 mr-4"
            style={{
              color: "var(--color-jerarquia2)",
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            Filas de trabajo (Promesa Midprimes) - Coorin
          </span>
          <button
            className="modal-btn modal-btn-close"
            style={{ fontSize: 20, position: "absolute", right: 12, top: 8 }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 10,
            width: "100%",
            minHeight: 380,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "center",
              width: "100%",
              gap: 18,
            }}
          >
            {tipoFilas === "archivo" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: "bold", color: "#000" }}>
                  Cartera:
                </span>
                <span style={{ color: "#000" }}>{cartera}</span>
              </div>
            ) : (
              <div></div>
            )}
            {fileRows.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 18,
                  height: "100%",
                }}
              >
                <label style={{ color: "#000", fontWeight: 400 }}>
                  <input
                    type="radio"
                    name="tipo"
                    checked={tipoFilas === "archivo"}
                    onChange={() => setTipoFilas("archivo")}
                  />{" "}
                  Archivo
                </label>
                <label style={{ color: "#000", fontWeight: 400 }}>
                  <input
                    type="radio"
                    name="tipo"
                    checked={tipoFilas === "consulta"}
                    onChange={() => setTipoFilas("consulta")}
                  />{" "}
                  Consulta
                </label>
              </div>
            )}
            <div></div>
          </div>
          {tipoFilas === "archivo" ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 12,
                }}
              >
                <input
                  type="text"
                  value={fileName}
                  readOnly
                  style={{
                    flex: 1,
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    marginRight: 18,
                    minWidth: 180,
                  }}
                />
                <label
                  style={{
                    background: "var(--color-jerarquia2)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 18px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Archivo
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div style={{ width: "100%", marginBottom: 8 }}>
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>Cuenta</th>
                      <th>Usuario</th>
                      <th>Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        {" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Tabla cargada desde archivo */}
              {(() => {
                console.log("🎯 Evaluando renderizado de tabla:");
                console.log("- fileRows.length:", fileRows.length);
                console.log("- tipoFilas:", tipoFilas);
                console.log("- Debe mostrar tabla:", fileRows.length > 0);
                return null;
              })()}
              {fileRows.length > 0 && (
                <div
                  className="scrollbar-gray"
                  style={{
                    width: "100%",
                    marginBottom: 8,
                    maxHeight: 320,
                    height: 320,
                    overflowY: "auto",
                  }}
                >
                  <table className="modal-table" style={{ marginTop: 12 }}>
                    <thead>
                      <tr>
                        {/* Columna 1 */}
                        <th
                          style={{
                            background: "var(--color-jerarquia3)",
                            color: "#fff",
                            textAlign: "center",
                            cursor:
                              typeof fileHeaders[0] === "string" &&
                              !fileHeaders[0].includes("Expr")
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (typeof fileHeaders[0] === "string") {
                              if (!fileHeaders[0].includes("Expr")) {
                                handleSort(
                                  0,
                                  fileHeaders[0] === "Cuenta" ||
                                    fileHeaders[0] === "Teléfono"
                                    ? "number"
                                    : "string"
                                );
                              }
                            } else {
                              toast.error(
                                "El encabezado de la columna 1 no es válido."
                              );
                            }
                          }}
                        >
                          {fileCols >= 1
                            ? fileHeaders[0] || "Expr1000"
                            : "Expr1000"}
                          {/* Indicador de error si el header no es correcto */}
                          {!formatoValido &&
                            fileCols >= 1 &&
                            fileHeaders[0] &&
                            !fileHeaders[0]
                              .toLowerCase()
                              .includes("cuenta") && (
                              <span
                                style={{
                                  marginLeft: 4,
                                  color: "#ff4444",
                                  fontSize: 12,
                                }}
                                title="Se esperaba 'Cuenta'"
                              >
                                ❌
                              </span>
                            )}
                          {typeof fileHeaders[0] === "string" &&
                            !fileHeaders[0].includes("Expr") && (
                              <span style={{ marginLeft: 6, fontSize: 14 }}>
                                {sortConfig.col === 0
                                  ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                  : "⇅"}
                              </span>
                            )}
                        </th>
                        {/* Columna 2 */}
                        <th
                          style={{
                            background: "var(--color-jerarquia3)",
                            color: "#fff",
                            textAlign: "center",
                            cursor:
                              typeof fileHeaders[1] === "string" &&
                              !fileHeaders[1].includes("Expr")
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (typeof fileHeaders[1] === "string") {
                              if (!fileHeaders[1].includes("Expr")) {
                                handleSort(
                                  1,
                                  fileHeaders[1] === "Cuenta" ||
                                    fileHeaders[1] === "Teléfono"
                                    ? "number"
                                    : "string"
                                );
                              }
                            } else {
                              toast.error(
                                "El encabezado de la columna 2 no es válido."
                              );
                            }
                          }}
                        >
                          {fileCols >= 2
                            ? fileHeaders[1] ||
                              (shouldShowF2ForColumn2() ? "F2" : "Expr1001")
                            : "Expr1001"}
                          {typeof fileHeaders[1] === "string" &&
                            !fileHeaders[1].includes("Expr") && (
                              <span style={{ marginLeft: 6, fontSize: 14 }}>
                                {sortConfig.col === 1
                                  ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                  : "⇅"}
                              </span>
                            )}
                        </th>
                        {/* Columna 3 */}
                        <th
                          style={{
                            background: "var(--color-jerarquia3)",
                            color: "#fff",
                            textAlign: "center",
                            cursor:
                              typeof fileHeaders[2] === "string" &&
                              !fileHeaders[2].includes("Expr")
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (typeof fileHeaders[2] === "string") {
                              if (!fileHeaders[2].includes("Expr")) {
                                handleSort(
                                  2,
                                  fileHeaders[2] === "Cuenta" ||
                                    fileHeaders[2] === "Teléfono"
                                    ? "number"
                                    : "string"
                                );
                              }
                            } else {
                              toast.error(
                                "El encabezado de la columna 3 no es válido."
                              );
                            }
                          }}
                        >
                          {fileCols >= 3
                            ? fileHeaders[2] || "Expr1002"
                            : "Expr1002"}
                          {typeof fileHeaders[2] === "string" &&
                            !fileHeaders[2].includes("Expr") && (
                              <span style={{ marginLeft: 6, fontSize: 14 }}>
                                {sortConfig.col === 2
                                  ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                  : "⇅"}
                              </span>
                            )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileRows.map((row, idx) => (
                        <tr key={idx}>
                          {/* Columna 1 - Cuenta */}
                          <td style={{ textAlign: "center" }}>
                            {row[0] ? row[0] : ""}
                            {/* Mostrar indicador de error solo si el formato es válido y el campo requerido está vacío */}
                            {formatoValido &&
                              (!row[0] || row[0].toString().trim() === "") && (
                                <span
                                  style={{
                                    border: "1px solid red",
                                    background: "#fff",
                                    color: "red",
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    padding: "0 2px",
                                    fontSize: 16,
                                    marginLeft: 4,
                                  }}
                                  title="Campo requerido"
                                >
                                  &#10006;
                                </span>
                              )}
                          </td>
                          {/* Columna 2 - Usuario */}
                          <td style={{ textAlign: "center" }}>
                            {row[1] ? row[1] : ""}
                            {/* Usuario puede estar vacío - no mostrar error */}
                          </td>
                          {/* Columna 3 - Teléfono */}
                          <td style={{ textAlign: "center" }}>
                            {row[2] ? row[2] : ""}
                            {/* Mostrar indicador de error solo si el formato es válido y el campo requerido está vacío */}
                            {formatoValido &&
                              (!row[2] || row[2].toString().trim() === "") && (
                                <span
                                  style={{
                                    border: "1px solid red",
                                    background: "#fff",
                                    color: "red",
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    padding: "0 2px",
                                    fontSize: 16,
                                    marginLeft: 4,
                                  }}
                                  title="Campo requerido"
                                >
                                  &#10006;
                                </span>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 60,
                  justifyContent: "center",
                  height: 280,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 80,
                    marginTop: -30,
                    justifyContent: "center",
                  }}
                >
                  <label
                    style={{ fontWeight: 500, color: "#000", marginRight: 8 }}
                  >
                    Consulta
                  </label>
                  <select
                    className="py-3 px-4 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none min-w-60"
                    value={selectedConsulta}
                    onChange={(e) => {
                      setSelectedConsulta(e.target.value);
                      console.log("Consulta seleccionada:", e.target.value);
                    }}
                    disabled={loadingConsultas}
                  >
                    {loadingConsultas ? (
                      <option value="">Cargando consultas...</option>
                    ) : consultas.length === 0 ? (
                      <option value="">No hay consultas disponibles</option>
                    ) : (
                      <>
                        {consultas.map((consulta) => (
                          <option
                            key={consulta.idConsulta}
                            value={consulta.idConsulta.toString()}
                          >
                            {consulta.NombreConsulta}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                {!consultaCargada && (
                  <button
                    style={{
                      background: "var(--color-jerarquia2)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 18px",
                      fontWeight: 500,
                      cursor: loading ? "wait" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      marginTop: 80,
                    }}
                    onClick={handleCargarConsulta}
                    disabled={loading || !selectedConsulta}
                  >
                    {loading ? "Cargando..." : "Cargar"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {/* Grid resumen abajo del modal, arriba de Resultado solo si está en archivo */}
        {tipoFilas === "archivo" && fileRows.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "center",
              width: "100%",
              position: "relative",
              marginTop: 12,
              padding: "0 28px",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {/* Columna: número de columnas */}
            <div
              style={{ textAlign: "left", color: "var(--color-jerarquia3)" }}
            >
              ( {fileCols} / 3 )
            </div>
            {/* Columna: botón cargar */}
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  background: !formatoValido
                    ? "#ccc"
                    : "var(--color-jerarquia2)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "6px 32px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: loading || !formatoValido ? "not-allowed" : "pointer",
                  opacity: loading || !formatoValido ? 0.7 : 1,
                }}
                onClick={handleCargarArchivo}
                disabled={loading || !formatoValido}
              >
                {loading ? "Cargando..." : "Cargar"}
              </button>
            </div>
            {/* Columna: número de registros */}
            <div
              style={{ textAlign: "right", color: "var(--color-jerarquia3)" }}
            >
              ( {fileRows.length} / {fileRows.length} )
            </div>
          </div>
        )}
        <div
          style={{
            color: !formatoValido && fileRows.length > 0 ? "#ff4444" : "#444",
            fontSize: 13,
            marginTop: "auto",
            paddingTop: 18,
            width: "100%",
            textAlign: "left",
            fontWeight:
              !formatoValido && fileRows.length > 0 ? "600" : "normal",
          }}
        >
          {(tipoFilas === "consulta" && consultaCargada && mensajeCarga) ||
          (fileRows.length > 0 && filasCargadas > 0 && mensajeCarga)
            ? mensajeCarga
            : fileRows.length > 0
            ? !formatoValido
              ? `${
                  mensajeValidacion ||
                  "El formato del documento es incorrecto. Los headers deben ser: Cuenta, Usuario, Teléfono"
                }`
              : "Verifique la equivalencia de columnas, si es correcta presione Cargar."
            : "Resultado"}
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalFilasCampañas;
