import React, { useState, useEffect, useRef, useCallback } from "react";
import SelectWallet from "../../../board/screenFields/SelectWallet";
import ButtonSave from "../../../sideBar/Administration/gespa/ButtonSave";
import IconCircular from "../../../../../components/iconos/IconCircular";
import {
  PostSaveScripts,
  deleteScripts,
  putUpdateScripts,
} from "../../../../../services/mark/albaz/LokiServices";
import { useUserStore } from "../../../../../contextGlobal/userStore";
import { useWalletProducts } from "../../../../login/WalletProduct";
import { toast } from "sonner";

const EditionScripts = ({
  scripts = [],
  placeholderValues = {},
  onSaveScript,
}) => {
  // Log inicial de props
  console.log("🔄 EditionScripts - Props recibidas:", {
    scripts: scripts.length,
    placeholderValues,
    hasOnSaveScript: !!onSaveScript,
  });
  const [selectedScript, setSelectedScript] = useState(null);
  const [editedData, setEditedData] = useState({
    nombre: "",
    descripcion: "",
    script: "",
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditingScript, setIsEditingScript] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const editableRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const scriptOptions = scripts.map((script) => ({
    value: script.idScript.toString(),
    label: script.nombre,
  }));
  const { walletProducts } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;

  // Función auxiliar para formatear valores
  const formatValue = useCallback((value, key) => {
    if (key === "Saldo" && typeof value === "number") {
      return `$${value.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return String(value).trim();
  }, []);

  // Función para reemplazar placeholders
 const replacePlaceholders = useCallback(
  (text, preview = false) => {
    if (!text) return "";
    if (!preview) return text;

    try {
      console.log("🔄 Iniciando reemplazo de placeholders:", {
        text,
        preview,
        valoresDisponibles: placeholderValues
      });

      const resultado = text.replace(/\[([^\]]+)\]/g, (match, placeholder) => {
        console.log(`🎯 Procesando: [${placeholder}]`);
        let replacement;

        switch (placeholder) {
          case "NombreEjecutivo":
            replacement = user?.nombre || match;
            break;
          case "NombreDeudor":
            replacement = placeholderValues?.NombreDeudor || match;
            break;
          case "idCuenta":
            replacement = placeholderValues?.idCuenta || match;
            break;
          case "RFC":
            replacement = placeholderValues?.RFC || match;
            break;
          case "NúmeroCliente":
            replacement = placeholderValues?.NúmeroCliente || match;
            break;
          case "Saldo":
            replacement = placeholderValues?.Saldo != null
              ? formatValue(placeholderValues.Saldo, "Saldo")
              : match;
            break;
          default:
            replacement = Object.prototype.hasOwnProperty.call(
              placeholderValues,
              placeholder
            )
              ? formatValue(placeholderValues[placeholder], placeholder)
              : match;
        }

        console.log(`✨ Reemplazo completado:`, {
          original: match,
          replacement,
          encontrado: replacement !== match
        });
        return replacement;
      });

      console.log("📝 Texto final:", resultado);
      return resultado;
    } catch (error) {
      console.error("❌ Error al reemplazar placeholders:", error);
      return text;
    }
  },
  [placeholderValues, user, formatValue]
);

  const escapeHtml = useCallback((text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }, []);

  // Renderizar a HTML para contentEditable
  const renderFormattedScriptToHTML = useCallback(
    (text) => {
      if (!text) return "";

      // Primero reemplazamos los placeholders si estamos en vista previa
      const processedText = showPreview
        ? replacePlaceholders(text, true)
        : text;

      let html = "";
      let currentText = "";
      let isBold = false;
      let isColored = false;

      for (let i = 0; i < processedText.length; i++) {
        const char = processedText[i];

        if (char === "*") {
          if (currentText) {
            const classes = `${isBold ? "font-bold" : ""} ${
              isColored ? "text-lime-500" : ""
            }`.trim();
            html += classes
              ? `<span class="${classes}">${escapeHtml(currentText)}</span>`
              : escapeHtml(currentText);
            currentText = "";
          }
          isBold = !isBold;
        } else if (char === "&") {
          if (currentText) {
            const classes = `${isBold ? "font-bold" : ""} ${
              isColored ? "text-lime-500" : ""
            }`.trim();
            html += classes
              ? `<span class="${classes}">${escapeHtml(currentText)}</span>`
              : escapeHtml(currentText);
            currentText = "";
          }
          isColored = !isColored;
        } else {
          currentText += char;
        }
      }

      if (currentText) {
        const classes = `${isBold ? "font-bold" : ""} ${
          isColored ? "text-lime-500" : ""
        }`.trim();
        html += classes
          ? `<span class="${classes}">${escapeHtml(currentText)}</span>`
          : escapeHtml(currentText);
      }

      return html;
    },
    [showPreview, replacePlaceholders, escapeHtml]
  );

  useEffect(() => {
    if (selectedScript) {
      setEditedData({
        nombre: selectedScript.nombre || "",
        descripcion: selectedScript.descripcion || "",
        script: selectedScript.script || "",
      });
      setHasChanges(false);
      setIsEditingScript(false);
      setShowPreview(false);
    }
  }, [selectedScript]);

  // ✅ Actualizar el contenido visual cuando cambia el script
  useEffect(() => {
    if (editableRef.current && editedData.script !== undefined) {
      console.log("🔍 Renderizando con vista previa:", showPreview);
      console.log("📝 Texto actual:", editedData.script);
      console.log("💾 Valores de reemplazo:", placeholderValues);
      const rendered = renderFormattedScriptToHTML(editedData.script);
      console.log("🎨 Texto renderizado:", rendered);
      if (editableRef.current.innerHTML !== rendered) {
        editableRef.current.innerHTML = rendered;
        if (!showPreview) {
          restoreCursorPosition();
        }
      }
    }
  }, [
    editedData.script,
    showPreview,
    placeholderValues,
    renderFormattedScriptToHTML,
  ]);

  const handleWalletChange = (selectedValue) => {
    if (hasChanges) {
      toast.promise(
        new Promise((resolve, reject) => {
          const confirmed = confirm(
            "Tienes cambios sin guardar. ¿Deseas continuar?"
          );
          if (confirmed) {
            resolve();
          } else {
            reject();
          }
        }),
        {
          loading: "Confirmando...",
          success: () => {
            const script = scripts.find(
              (s) => s.idScript.toString() === selectedValue
            );
            setSelectedScript(script);
            return "Cambiando script...";
          },
          error: "Operación cancelada",
        }
      );
      return;
    }

    const script = scripts.find((s) => s.idScript.toString() === selectedValue);
    setSelectedScript(script);
  };

  // ✅ Renderizar a React elements para vista previa
  const renderFormattedScript = (text) => {
    if (!text) return null;

    const parts = [];
    let currentText = "";
    let isBold = false;
    let isColored = false;
    let key = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char === "*") {
        if (currentText) {
          parts.push(
            <span
              key={key++}
              className={`${isBold ? "font-bold" : ""} ${
                isColored ? "text-lime-500" : ""
              }`}
            >
              {currentText}
            </span>
          );
          currentText = "";
        }
        isBold = !isBold;
      } else if (char === "&") {
        if (currentText) {
          parts.push(
            <span
              key={key++}
              className={`${isBold ? "font-bold" : ""} ${
                isColored ? "text-lime-500" : ""
              }`}
            >
              {currentText}
            </span>
          );
          currentText = "";
        }
        isColored = !isColored;
      } else {
        currentText += char;
      }
    }

    if (currentText) {
      parts.push(
        <span
          key={key++}
          className={`${isBold ? "font-bold" : ""} ${
            isColored ? "text-lime-500" : ""
          }`}
        >
          {currentText}
        </span>
      );
    }
    return parts;
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  // ✅ Guardar posición del cursor
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && editableRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editableRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      setCursorPosition(preCaretRange.toString().length);
    }
  };

  // ✅ Restaurar posición del cursor
  const restoreCursorPosition = () => {
    if (!editableRef.current) return;

    const selection = window.getSelection();
    const range = document.createRange();
    let charCount = 0;
    let nodeStack = [editableRef.current];
    let node;
    let foundStart = false;

    while (!foundStart && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        const nextCharCount = charCount + node.length;
        if (cursorPosition >= charCount && cursorPosition <= nextCharCount) {
          range.setStart(node, cursorPosition - charCount);
          range.setEnd(node, cursorPosition - charCount);
          foundStart = true;
        }
        charCount = nextCharCount;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    if (foundStart) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // ✅ Manejar cambios en el editor
  const handleEditorChange = () => {
    if (editableRef.current) {
      saveCursorPosition();
      const html = editableRef.current.innerHTML;

      // Convertir el HTML de vuelta a texto con marcadores
      let text = "";
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const processNode = (node) => {
        if (node.nodeType === 3) {
          // Nodo de texto
          text += node.textContent;
        } else if (node.nodeType === 1) {
          // Elemento
          const classes = node.className;
          const isBold = classes.includes("font-bold");
          const isColored = classes.includes("text-lime-500");

          if (isBold) text += "*";
          if (isColored) text += "&";

          Array.from(node.childNodes).forEach(processNode);

          if (isColored) text += "&";
          if (isBold) text += "*";
        }
      };

      Array.from(tempDiv.childNodes).forEach(processNode);
      handleInputChange("script", text);
    }
  };

  const insertFormatMarker = (marker) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const selectedText = selection.toString();
    if (!selectedText) {
      toast.error("Selecciona un texto para aplicar el formato");
      return;
    }

    const text = editedData.script;
    const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapa &, *, etc.
    const pattern = new RegExp(
      `${escapedMarker}([^${escapedMarker}]*)${escapedMarker}`,
      "g"
    );

    // Verifica si la selección ya está coloreada (ya tiene marcadores &...&)
    const isColored = pattern.test(selectedText);

    let newText;
    if (isColored) {
      // Quita el color (elimina los &)
      newText = text.replace(
        new RegExp(`${escapedMarker}${selectedText}${escapedMarker}`),
        selectedText
      );
    } else {
      // Aplica color (añade & antes y después del texto seleccionado)
      newText = text.replace(selectedText, `${marker}${selectedText}${marker}`);
    }

    handleInputChange("script", newText);
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.focus();
      }
    }, 50);
  };

  const cleanFormatMarkers = () => {
    if (!selectedScript) return;

    toast.promise(
      new Promise((resolve, reject) => {
        const confirmed = confirm(
          "¿Deseas restaurar el script a su versión original del servidor?"
        );
        if (confirmed) {
          resolve();
        } else {
          reject();
        }
      }),
      {
        loading: "Confirmando restauración...",
        success: () => {
          setEditedData((prev) => ({
            ...prev,
            script: selectedScript.script || "",
          }));
          setHasChanges(false);
          setShowPreview(false);
          return "Script restaurado correctamente";
        },
        error: "Restauración cancelada",
      }
    );

    // Refresca visualmente el editor
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.innerHTML = renderFormattedScriptToHTML(
          selectedScript.script || ""
        );
        editableRef.current.focus();
      }
    }, 50);
  };

  const clearScript = async () => {
    if (!selectedScript || !selectedScript.idScript) {
      // Si no hay script seleccionado o es nuevo, solo limpia el contenido
      handleInputChange("script", "");
      toast.success("Contenido borrado correctamente");
      return;
    }

    toast.promise(
      new Promise((resolve, reject) => {
        const confirmed = confirm(
          "¿Estás seguro de eliminar este script? Esta acción no se puede deshacer."
        );
        if (confirmed) {
          resolve();
        } else {
          reject();
        }
      }).then(async () => {
        await deleteScripts({ idScript: selectedScript.idScript });
        // Actualizar la lista de scripts
        if (onSaveScript) {
          onSaveScript();
        }
        // Limpiar el formulario
        setSelectedScript(null);
        setEditedData({
          nombre: "",
          descripcion: "",
          script: "",
        });
        setHasChanges(false);
        setShowPreview(false);
      }),
      {
        loading: "Eliminando script...",
        success: "Script eliminado exitosamente",
        error: (error) => {
          console.error("Error al eliminar script:", error);
          return `Error al eliminar el script: ${error.message}`;
        },
      }
    );
  };

  const handleSave = async () => {
    if (!selectedScript) return;

    try {
      // Preparar los datos para el endpoint en el formato correcto
      const scriptData = {
        idScript: selectedScript.idScript,
        idProducto: idProducto,
        nombre: editedData.nombre,
        descripción: editedData.descripcion, // Note la 'ó' en descripción
        script1: editedData.script,
        fechaInsert: new Date().toISOString().split("T")[0], // Solo la fecha sin la hora
        idEjecutivoInsert: idEjecutivo,
      };

      console.log("Enviando datos:", scriptData);

      let response;
      // Si el script ya existe (tiene ID), actualizarlo
      if (selectedScript.idScript) {
        response = await putUpdateScripts(scriptData);
        console.log("Respuesta actualización:", response);
        toast.success("Script actualizado exitosamente");
      } else {
        // Si es un script nuevo, guardarlo
        response = await PostSaveScripts(scriptData);
        console.log("Respuesta nuevo script:", response);
        toast.success("Script guardado exitosamente");
      }

      // Actualizar el estado local
      setSelectedScript({
        ...selectedScript,
        ...editedData,
      });

      setHasChanges(false);
      setIsEditingScript(false);
      setShowPreview(false);
    } catch (error) {
      console.error("Error al guardar script:", error);

      // Mostrar mensaje de error más detallado
      let errorMessage = "Error desconocido";
      if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors)
          .flat()
          .join("\n");
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error("Error al guardar el script:\n" + errorMessage);
    }
  };

  const handleCancel = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        const confirmed = confirm("¿Deseas descartar los cambios?");
        if (confirmed) {
          resolve();
        } else {
          reject();
        }
      }),
      {
        loading: "Confirmando...",
        success: () => {
          setEditedData({
            nombre: selectedScript?.nombre || "",
            descripcion: selectedScript?.descripcion || "",
            script: selectedScript?.script || "",
          });
          setHasChanges(false);
          setIsEditingScript(false);
          setShowPreview(false);
          return "Cambios descartados";
        },
        error: "Operación cancelada",
      }
    );
  };

  return (
    <div className="rounded-lg">
      <div className="flex justify-between items-center mb-0.5">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">Script</label>
          <SelectWallet
            options={scriptOptions}
            label="Selecciona un script"
            onChange={handleWalletChange}
            value={selectedScript?.idScript.toString() || ""}
          />
        </div>
      </div>
      <div className="bg-gray-700 rounded-lg p-4 gap-2">
        {selectedScript ? (
          <div className="space-y-4">
            <div className="mb-2">
              <input
                type="text"
                value={editedData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className="w-full px-2 py-1 text-white border bg-gray-800 border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent transition-all"
                placeholder="Nombre del script"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={editedData.descripcion}
                onChange={(e) =>
                  handleInputChange("descripcion", e.target.value)
                }
                className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent resize-none transition-all"
                placeholder="Descripción del script"
              />
            </div>
            <div className="">
              <div className="block md:flex justify-between items-center">
                {!showPreview && (
                  <div className="flex gap-2 mb-2">
                    <button
                      className="font-bold"
                      onClick={() => insertFormatMarker("*")}
                      type="button"
                    >
                      <IconCircular
                        textColor="text-gray-200"
                        borderColor="border-gray-800 hover:border-jerarquia3"
                        bgColor="bg-gray-800 hover:bg-jerarquia3"
                        tooltip="Texto en Negrita"
                      >
                        N
                      </IconCircular>
                    </button>
                    <button
                      onClick={() => insertFormatMarker("&")}
                      type="button"
                      className=""
                    >
                      <IconCircular
                        textColor="text-lime-500"
                        borderColor="border-gray-800 hover:border-jerarquia3"
                        bgColor="bg-gray-800 hover:bg-jerarquia3"
                        tooltip="Color de texto"
                      >
                        C
                      </IconCircular>
                    </button>
                    <button
                      onClick={cleanFormatMarkers}
                      type="button"
                      className=""
                    >
                      <IconCircular
                        textColor="text-gray-200"
                        borderColor="border-gray-800 hover:border-jerarquia3"
                        bgColor="bg-gray-800 hover:bg-jerarquia3"
                        tooltip="Limpiar marcadores"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"
                          ></path>
                          <path
                            fill="currentColor"
                            d="M17.003 20a4.9 4.9 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.7 5.7 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.6 16.6 0 0 1 10 24H8a17.3 17.3 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13 13 0 0 0 17.596 28Z"
                          ></path>
                        </svg>
                      </IconCircular>
                    </button>
                  </div>
                )}
                <div
                  className={`flex items-center gap-3 mb-2 ${
                    showPreview ? "ml-auto" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="vista-previa"
                      className="form-checkbox h-4 w-4 bg-blue-600 text-jerarquia1 rounded cursor-pointer"
                      checked={showPreview}
                      onChange={(e) => setShowPreview(e.target.checked)}
                    />
                    <label
                      htmlFor="vista-previa"
                      className="ml-1 text-sm text-jerarquia1 cursor-pointer whitespace-nowrap"
                    >
                      Vista Previa
                    </label>
                  </div>
                  {showPreview ? (
                    <div className="flex gap-2">
                      <ButtonSave
                        onClick={handleSave}
                        className="btn-success"
                      />
                    </div>
                  ) : (
                    <button onClick={clearScript} className="flex btn-danger">
                      Borrar
                    </button>
                  )}
                </div>
              </div>
              <div>
                <div
                  ref={editableRef}
                  contentEditable={!showPreview}
                  suppressContentEditableWarning
                  onInput={handleEditorChange}
                  onFocus={() => setIsEditingScript(true)}
                  onBlur={() => {
                    setIsEditingScript(false);
                    saveCursorPosition();
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = "copy";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!showPreview) {
                      // Usar el texto que ya viene formateado desde DataCharges
                      const droppedText = e.dataTransfer.getData("text/plain");
                      const selection = window.getSelection();
                      if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const span = document.createElement("span");
                        span.textContent = droppedText;
                        range.deleteContents();
                        range.insertNode(span);
                        selection.removeAllRanges();
                        handleEditorChange();
                      }
                    }
                  }}
                  className={`w-full px-3 py-2 bg-gray-800 text-white border border-gray-800 rounded-lg ${
                    !showPreview
                      ? "focus:ring-2 focus:ring-jerarquia2 focus:border-transparent"
                      : ""
                  } text-sm min-h-[288px] max-h-96 overflow-auto transition-all outline-none ${
                    showPreview ? "cursor-default" : "cursor-text"
                  }`}
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "sans-serif",
                    lineHeight: "1.5",
                  }}
                />
              </div>
            </div>
            {hasChanges && (
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Hay cambios sin guardar
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>📝 Selecciona un script para ver y editar su contenido</p>
          </div>
        )}
      </div>
      {scripts.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm bg-gray-800 rounded-lg mt-4">
          <p>No hay scripts disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default EditionScripts;
