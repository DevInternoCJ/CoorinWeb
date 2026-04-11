import React, { useState } from "react";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import CloseButtonReusable from "../../../components/CloseButtonReusable";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import { VisitsLoadFile } from "../../../../../services/mark/Orochi/LokiServices";

const LoadVisitsContent = ({ mostrarTabla, setMostrarTabla, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [footerMsg] = useState("Seleccione un archivo para subir visitas.");
  const [cartera, setCartera] = useState("");
  const [rutaArchivo, setRutaArchivo] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [numColumnas, setNumColumnas] = useState(0);
  const [numFilas, setNumFilas] = useState(0);
  const [isValidFormat, setIsValidFormat] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Campos esperados en el archivo Excel (tal cual vienen)
  const camposEsperadosExcel = [
    "Cuenta",
    "MapeoVivienda",
    "ColorFachada",
    "ColorPuerta",
    "ColorHerreria",
    "NivelesPisos",
    "TipoVivienda",
    "NivelEconomico",
    "PropietarioVivienda",
    "AutoMapeo",
    "AutoMarca",
    "AutoModelo",
    "AutoAño",
    "AutoPlacas",
    "PersonaAtendio",
    "Contacto",
    "Parentesco",
    "Situacion",
    "CausaNoPago",
    "FechaVisita",
    "HoraVisita",
    "ClaveVisitador",
    "Observación",
    "Teléfono1Visita",
    "Teléfono2Visita",
    "Teléfono3Visita",
    "Correo",
    "CalleHorizontalNorte",
    "CalleHorizontalSur",
    "CalleVerticalEste",
    "CalleVerticalOeste",
    "Sucursal",
    "PaqueteVisitas",
    "MontoNegociación",
    "FechaPagoNegociación",
    "Herramienta",
    "NúmeroMedidor",
    "EnergíaElectrica",
    "AcuseRequerimiento",
    "FotografíaPredio",
    "Latitud",
    "Longitud",
  ];

  const validateHeaders = (headers) => {
    const headersNormalized = headers.map((h) => String(h).trim());
    const camposNormalized = camposEsperadosExcel.map((c) => c.trim());

    const missingFields = camposNormalized.filter(
      (campo) => !headersNormalized.includes(campo),
    );
    const extraFields = headersNormalized.filter(
      (header) => !camposNormalized.includes(header),
    );

    if (missingFields.length > 0 || extraFields.length > 0) {
      let message = "Los campos esperados no coinciden.\n";
      if (missingFields.length > 0) {
        message += `Campos faltantes: ${missingFields.join(", ")}.\n`;
      }
      if (extraFields.length > 0) {
        message += `Campos extras: ${extraFields.join(", ")}.`;
      }
      return { valid: false, message };
    }

    return { valid: true, message: "" };
  };

  const validateFieldValue = (campo, valor, rowIndex) => {
    const errors = [];
    const val = valor ? String(valor).trim() : "";

    // Campos obligatorios
    const obligatorios = [
      "Cuenta",
      "Contacto",
      "FechaVisita",
      "HoraVisita",
      "ClaveVisitador",
      "Observación",
      "Sucursal",
    ];
    if (obligatorios.includes(campo) && !val) {
      errors.push(`Fila ${rowIndex + 2}: ${campo} es obligatorio`);
      return errors;
    }

    // Si es opcional y está vacío, no validar más
    if (!val && !obligatorios.includes(campo)) return errors;

    switch (campo) {
      case "Cuenta":
        // Verificar que no contenga espacios
        if (/\s/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no puede contener espacios`,
          );
        }
        // Verificar longitud máxima de 16 caracteres
        if (val.length > 16) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no puede exceder 16 caracteres (tiene ${val.length})`,
          );
        }
        // Verificar que solo contenga números
        if (!/^\d+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo números`,
          );
        }
        break;

      case "ColorFachada":
      case "ColorPuerta":
      case "ColorHerreria":
      case "AutoMarca":
        if (val.length > 50) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 50 caracteres`,
          );
        }
        if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo letras`,
          );
        }
        break;

      case "PropietarioVivienda":
        if (val.length > 100) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 100 caracteres`,
          );
        }
        if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo letras`,
          );
        }
        break;

      case "AutoModelo":
        if (val.length > 50) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 50 caracteres`,
          );
        }
        if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9\s]+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo letras y números`,
          );
        }
        break;

      case "AutoAño":
        if (!/^\d{4}$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe tener exactamente 4 dígitos`,
          );
        }
        break;

      case "AutoPlacas":
        if (val.length > 10) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 10 caracteres`,
          );
        }
        if (!/^[a-zA-Z0-9]+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo letras y números`,
          );
        }
        break;

      case "PersonaAtendio":
        if (val.length > 50) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 50 caracteres`,
          );
        }
        if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo letras`,
          );
        }
        break;

      case "FechaVisita":
      case "FechaPagoNegociación":
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe tener formato dd/mm/aaaa`,
          );
        }
        break;

      case "HoraVisita":
        if (
          !/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm|AM|PM)$/.test(val) &&
          !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val)
        ) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe tener formato hh:mm am/pm o hh:mm (24h)`,
          );
        }
        break;

      case "ClaveVisitador":
        if (val.length !== 4) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe tener exactamente 4 caracteres`,
          );
        }
        break;

      case "Observación":
        if (val.length > 8000) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 8000 caracteres`,
          );
        }
        break;

      case "Teléfono1Visita":
      case "Teléfono2Visita":
      case "Teléfono3Visita":
        if (!/^\d{10}$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe tener exactamente 10 dígitos`,
          );
        }
        break;

      case "Correo":
      case "CalleHorizontalNorte":
      case "CalleHorizontalSur":
      case "CalleVerticalEste":
      case "CalleVerticalOeste":
        if (val.length > 100) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 100 caracteres`,
          );
        }
        break;

      case "PaqueteVisitas":
        if (!/^\d+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe ser un número entero`,
          );
        }
        break;

      case "MontoNegociación":
        if (!/^\d+(\.\d{2})?$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe ser un número con dos decimales (ej: 12556.00)`,
          );
        }
        break;

      case "NúmeroMedidor":
        if (val.length > 15) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} no debe exceder 15 caracteres`,
          );
        }
        if (!/^[a-zA-Z0-9]+$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo letras y números`,
          );
        }
        break;

      case "EnergíaElectrica":
      case "AcuseRequerimiento":
      case "FotografíaPredio":
        if (val !== "0" && val !== "1") {
          errors.push(`Fila ${rowIndex + 2}: ${campo} debe ser 0 o 1`);
        }
        break;

      case "Latitud":
      case "Longitud":
        if (!/^-?\d+\.?\d*$/.test(val)) {
          errors.push(
            `Fila ${rowIndex + 2}: ${campo} debe contener solo números`,
          );
        }
        break;
    }

    return errors;
  };

  const validateAllData = (data) => {
    const allErrors = [];

    data.forEach((row, index) => {
      camposEsperadosExcel.forEach((campo) => {
        const errors = validateFieldValue(campo, row[campo], index);
        allErrors.push(...errors);
      });
    });

    return allErrors;
  };

  const processFileData = (data, headers) => {
    setFileHeaders(headers);
    setFileData(data);
    setNumColumnas(headers.length);
    setNumFilas(data.length);

    // Validar que tenga exactamente 42 columnas
    if (headers.length !== 42) {
      setIsValidFormat(false);
      toast.error(
        `El archivo tiene ${headers.length} columnas, pero se esperan exactamente 42 columnas.`,
        { duration: 8000 },
      );
      console.error("Columnas recibidas:", headers);
      console.error("Columnas esperadas:", camposEsperadosExcel);
      return;
    }

    const validation = validateHeaders(headers);

    if (!validation.valid) {
      setIsValidFormat(false);
      toast.warning(validation.message);
      return;
    }

    // Validar datos de las filas
    const dataErrors = validateAllData(data);

    if (dataErrors.length > 0) {
      setIsValidFormat(false);
      // Mostrar los primeros 5 errores
      const errorsToShow = dataErrors.slice(0, 5);
      errorsToShow.forEach((error) => {
        toast.warning(error, { duration: 6000 });
      });

      if (dataErrors.length > 5) {
        toast.warning(
          `... y ${dataErrors.length - 5} errores más. Revise los datos antes de cargar.`,
          { duration: 6000 },
        );
      }

      console.warn("Todos los errores de validación:", dataErrors);
    } else {
      setIsValidFormat(true);
      toast.success(
        `Archivo válido: ${data.length} filas cargadas correctamente con ${headers.length} columnas.`,
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setRutaArchivo(file.name);
      setArchivo(file);

      // Procesar archivo Excel con XLSX
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (jsonData.length > 0) {
            const headers = jsonData[0].map((h) => String(h).trim());
            const rows = jsonData
              .slice(1)
              .filter((row) =>
                row.some((cell) => cell !== undefined && cell !== ""),
              );

            const dataObjects = rows.map((row) => {
              const obj = {};
              headers.forEach((header, index) => {
                obj[header] = row[index] !== undefined ? row[index] : "";
              });
              return obj;
            });

            processFileData(dataObjects, headers);
          } else {
            toast.warning("El archivo está vacío o no contiene datos válidos.");
          }
        } catch (error) {
          toast.warning("Error al leer el archivo: " + error.message);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileChange({ target: { files: [file] } });
      }
    };
    input.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Por favor seleccione un archivo.");
      return;
    }
    if (!cartera) {
      toast.warning("Por favor seleccione una cartera.");
      return;
    }
    if (!isValidFormat) {
      toast.warning(
        "No se puede cargar el archivo. Los campos no coinciden con el formato esperado.",
      );
      return;
    }
    if (fileData.length === 0) {
      toast.warning("No hay datos para cargar.");
      return;
    }

    setIsLoading(true);

    try {
      // Obtener datos del usuario
      const userData = JSON.parse(localStorage.getItem("userData"));
      const idEjecutivo = userData?.idEjecutivo;

      if (!idEjecutivo) {
        toast.error("No se pudo obtener el ID del ejecutivo");
        setIsLoading(false);
        return;
      }

      // Construir el body con idCartera, idEjecutivo y el archivo
      const body = {
        idCartera: parseInt(cartera, 10),
        idEjecutivo: idEjecutivo,
        archivo: archivo, // Usar el estado 'archivo' que contiene el objeto File
      };

      console.log("📤 Enviando carga de visitas:", {
        idCartera: body.idCartera,
        idEjecutivo: body.idEjecutivo,
        archivo: archivo?.name,
        archivoType: archivo?.type,
        archivoSize: archivo?.size,
      });

      // Llamar al servicio
      const response = await VisitsLoadFile(body);

      console.log("📥 Respuesta recibida:", response);

      // Procesar respuesta JSON
      if (response.status === 200) {
        console.log("📄 Respuesta JSON del servidor:", response.data);

        // Si el servidor retorna un archivo Excel binario codificado
        if (response.data && typeof response.data === "string") {
          // Convertir de base64 a Blob si es necesario
          const binaryString = atob(response.data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "resultado_carga_visitas.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }

        toast.success("Archivo cargado exitosamente");

        // Limpiar el formulario
        setSelectedFile(null);
        setRutaArchivo("");
        setArchivo(null);
        setFileData([]);
        setFileHeaders([]);
        setNumColumnas(0);
        setNumFilas(0);
        setCartera("");
      } else {
        toast.error("Error al cargar el archivo de visitas");
      }
    } catch (error) {
      console.error("❌ Error al cargar visitas:", error);

      // Manejo de errores específicos
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        // Si errorData es un ArrayBuffer, decodificarlo
        let errorMessage = "Error desconocido";
        if (errorData instanceof ArrayBuffer) {
          try {
            const decoder = new TextDecoder("utf-8");
            const decodedText = decoder.decode(errorData);
            console.log("📄 Mensaje decodificado del servidor:", decodedText);

            // Intentar parsear como JSON
            try {
              const jsonError = JSON.parse(decodedText);
              errorMessage =
                jsonError.message || jsonError.error || decodedText;
            } catch {
              errorMessage = decodedText;
            }
          } catch (decodeError) {
            console.error("Error al decodificar respuesta:", decodeError);
          }
        } else if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        }

        if (status === 400) {
          toast.error(`Datos inválidos: ${errorMessage}`);
        } else if (status === 401) {
          toast.error("Sesión expirada. Por favor inicie sesión nuevamente");
        } else if (status === 500) {
          toast.error("Error del servidor al procesar el archivo");
        } else {
          toast.error(`Error al cargar: ${errorMessage}`);
        }
      } else {
        toast.error("Error de conexión al cargar el archivo");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón de cierre */}
      <div className="absolute top-2 right-2 z-20">
        <CloseButtonReusable onClose={onClose} />
      </div>

      <div
        className="flex flex-col items-center mx-auto px-2 sm:px-4"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Fila con Título, Select Cartera e Input Archivo */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4 items-center mt-2">
          {/* Título */}
          <div className="col-span-1 sm:col-span-3 text-center sm:text-left">
            <span className="text-lg font-semibold text-jerarquia3">
              Carga Visitas - Coorin
            </span>
          </div>

          {/* Select Cartera */}
          <div className="col-span-1 sm:col-span-3">
            <FloatingSelect
              id="cartera-select"
              label="Cartera"
              value={cartera}
              onChange={(e) => setCartera(e.target.value)}
              required
              options={[
                { value: "1",  label: "Cartera 1"  },
                { value: "2",  label: "Cartera 2"  },
                { value: "3",  label: "Cartera 3"  },
                { value: "4",  label: "Cartera 4"  },
                { value: "31", label: "Cartera 31" },
              ]}
            />
          </div>

          {/* Input con botón anidado */}
          <div className="relative col-span-1 sm:col-span-6">
            <input
              type="text"
              value={rutaArchivo}
              readOnly
              className="peer p-4 pr-24 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              id="archivo-input"
              placeholder=" "
            />
            <label
              htmlFor="archivo-input"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              Archivo
            </label>
            <button
              type="button"
              onClick={handleFileSelect}
              className="btn-info absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-medium rounded"
            >
              Archivo
            </button>
          </div>
        </div>

        {/* Tabla de datos */}
        <div className="w-full mt-4 metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 overflow-hidden">
          <div
            className="scrollbar-gray w-full flex-1"
            style={{
              overflowY: "auto",
              overflowX: "auto",
              maxHeight: "60vh",
              minHeight: "0",
            }}
          >
            <table
              className="modal-table"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  {camposEsperadosExcel.map((campo, index) => (
                    <th
                      key={index}
                      style={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                      }}
                    >
                      {campo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileData.length === 0 ? (
                  <tr style={{ height: "210px" }}>
                    <td
                      colSpan={camposEsperadosExcel.length}
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        padding: "8px",
                      }}
                    >
                      <span className="text-gray-600 text-sm">
                        Seleccione un archivo para subir visitas.
                      </span>
                    </td>
                  </tr>
                ) : (
                  fileData.map((row, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      {camposEsperadosExcel.map((campo, idx) => (
                        <td
                          key={idx}
                          style={{
                            padding: "8px",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row[campo] || ""}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Barra inferior con contadores y botón */}
          {fileData.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              {/* Columnas (izquierda) */}
              <div className="flex-1 text-left">
                <span className="text-sm font-medium text-gray-700">
                  {numColumnas} Columnas
                </span>
              </div>

              {/* Botón Cargar (centro) */}
              <div className="flex-1 flex justify-center">
                <button
                  type="button"
                  onClick={handleUpload}
                  className="btn-success px-6 py-2 text-sm font-medium rounded"
                  disabled={!isValidFormat || isLoading}
                  style={{
                    opacity: !isValidFormat || isLoading ? 0.5 : 1,
                    cursor:
                      !isValidFormat || isLoading ? "not-allowed" : "pointer",
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
                      Cargando...
                    </>
                  ) : (
                    "Cargar"
                  )}
                </button>
              </div>

              {/* Filas (derecha) */}
              <div className="flex-1 text-right">
                <span className="text-sm font-medium text-gray-700">
                  {numFilas} Filas
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadVisitsContent;
