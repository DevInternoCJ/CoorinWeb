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

const EditionScripts = ({ scripts = [], placeholderValues = {}, onScriptsUpdate }) => {
  // Estados
  const [selectedScript, setSelectedScript] = useState(null);
  const [editedData, setEditedData] = useState({ nombre: "", descripcion: "", script: "" });
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditingScript, setIsEditingScript] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const editableRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const { walletProducts } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;

  useEffect(() => {
    if (scripts.length > 0 && !selectedScript) {
      // Buscar el script con idScript === 0 (Nuevo)
      const nuevoScript = scripts.find((s) => s.idScript === 0);
      
      if (nuevoScript) {
        setSelectedScript(nuevoScript);
      } else {
        // Si no existe "Nuevo", crear uno temporal
        const newScript = { 
          idScript: 0, 
          nombre: " -- Nuevo -- ", 
          descripcion: "", 
          script: "" 
        };  
        // Actualizar en el padre para que aparezca en la lista
        onScriptsUpdate?.([newScript, ...scripts]);
        setSelectedScript(newScript);
      }
    }
  }, [scripts, selectedScript, onScriptsUpdate]);

  const scriptOptions = scripts.map((script) => ({
    value: script.idScript.toString(),
    label: script.nombre,
  }));

  // Formateo de valores
  const formatValue = useCallback((value, key) => {
    if (key === "Saldo" && typeof value === "number") {
      return `$${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return String(value).trim();
  }, []);

  // Reemplazo de placeholders
  const replacePlaceholders = useCallback(
    (text, preview = false) => {
      if (!text) return "";
      if (!preview) return text;
      try {
        const resultado = text.replace(/\[([^\]]+)\]/g, (match, placeholder) => {
          let replacement;
          switch (placeholder) {
            case "NombreEjecutivo":
              replacement = user?.nombre || match;
              break;
            case "NombreDeudor":
            case "idCuenta":
            case "RFC":
            case "NúmeroCliente":
            case "Saldo":
              replacement =
                placeholderValues[placeholder] != null
                  ? formatValue(placeholderValues[placeholder], placeholder)
                  : match;
              break;
            default:
              replacement = Object.prototype.hasOwnProperty.call(placeholderValues, placeholder)
                ? formatValue(placeholderValues[placeholder], placeholder)
                : match;
          }
          return replacement;
        });
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

  // Renderizado de script a HTML
  const renderFormattedScriptToHTML = useCallback(
    (text) => {
      if (!text) return "";
      const processedText = showPreview ? replacePlaceholders(text, true) : text;
      let html = "";
      let currentText = "";
      let isBold = false;
      let isColored = false;
      for (let i = 0; i < processedText.length; i++) {
        const char = processedText[i];
        if (char === "*") {
          if (currentText) {
            const classes = `${isBold ? "font-bold" : ""} ${isColored ? "text-lime-500" : ""}`.trim();
            html += classes ? `<span class="${classes}">${escapeHtml(currentText)}</span>` : escapeHtml(currentText);
            currentText = "";
          }
          isBold = !isBold;
        } else if (char === "&") {
          if (currentText) {
            const classes = `${isBold ? "font-bold" : ""} ${isColored ? "text-lime-500" : ""}`.trim();
            html += classes ? `<span class="${classes}">${escapeHtml(currentText)}</span>` : escapeHtml(currentText);
            currentText = "";
          }
          isColored = !isColored;
        } else {
          currentText += char;
        }
      }
      if (currentText) {
        const classes = `${isBold ? "font-bold" : ""} ${isColored ? "text-lime-500" : ""}`.trim();
        html += classes ? `<span class="${classes}">${escapeHtml(currentText)}</span>` : escapeHtml(currentText);
      }
      return html;
    },
    [showPreview, replacePlaceholders, escapeHtml]
  );

  // Inicializar datos al seleccionar script
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

  // Actualizar contentEditable
  useEffect(() => {
    if (editableRef.current && editedData.script !== undefined) {
      const rendered = renderFormattedScriptToHTML(editedData.script);
      if (editableRef.current.innerHTML !== rendered) {
        editableRef.current.innerHTML = rendered;
        if (!showPreview) restoreCursorPosition();
      }
    }
  }, [editedData.script, showPreview, placeholderValues, renderFormattedScriptToHTML]);

  // Selección de wallet/script
    const handleWalletChange = (selectedValue) => {
    if (hasChanges) {
      toast.promise(
        new Promise((resolve, reject) => {
          const confirmed = confirm("Tienes cambios sin guardar. ¿Deseas continuar?");
          confirmed ? resolve() : reject();
        }),
        {
          loading: "Confirmando...",
          success: () => {
            const script = scripts.find((s) => s.idScript.toString() === selectedValue);
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

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

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
        while (i--) nodeStack.push(node.childNodes[i]);
      }
    }
    if (foundStart) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleEditorChange = () => {
    if (!editableRef.current) return;
    saveCursorPosition();
    const html = editableRef.current.innerHTML;

    let text = "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const processNode = (node) => {
      if (node.nodeType === 3) text += node.textContent;
      else if (node.nodeType === 1) {
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
  };

  const insertFormatMarker = (marker) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const selectedText = selection.toString();
    if (!selectedText) return toast.error("Selecciona un texto para aplicar el formato");

    const text = editedData.script;
    const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`${escapedMarker}([^${escapedMarker}]*)${escapedMarker}`, "g");
    const isColored = pattern.test(selectedText);

    let newText;
    if (isColored) {
      newText = text.replace(new RegExp(`${escapedMarker}${selectedText}${escapedMarker}`), selectedText);
      toast.info("Formato eliminado");
    } else {
      newText = text.replace(selectedText, `${marker}${selectedText}${marker}`);
      toast.success("Formato aplicado");
    }
    handleInputChange("script", newText);
    setTimeout(() => editableRef.current?.focus(), 50);
  };

  const cleanFormatMarkers = () => {
    if (!selectedScript) return;
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setEditedData((prev) => ({ ...prev, script: selectedScript.script || "" }));
          setHasChanges(false);
          setShowPreview(false);
          if (editableRef.current)
            editableRef.current.innerHTML = renderFormattedScriptToHTML(selectedScript.script || "");
          resolve();
        }, 400);
      }),
      {
        loading: "Restaurando script original...",
        success: "Script restaurado correctamente",
        error: "No se pudo restaurar el script",
      }
    );
  };

 // ✅ Modificar clearScript
  const clearScript = async () => {
    if (!selectedScript || !selectedScript.idScript) {
      const newScript = { 
        idScript: 0, 
        nombre: " -- Nuevo -- ", 
        descripcion: "", 
        script: "" 
      };  
      // ✅ Actualizar en el padre
      const updatedScripts = scripts.find((s) => s.idScript === 0) 
        ? scripts 
        : [newScript, ...scripts];
      
      onScriptsUpdate?.(updatedScripts);
      setSelectedScript(newScript);
      setEditedData({ nombre: "", descripcion: "", script: "" });
      setHasChanges(false);
      return toast.success("Contenido borrado correctamente");
    }

    toast.promise(
      (async () => {
        await deleteScripts({ idScript: selectedScript.idScript });

        // ✅ Actualizar scripts en el padre
        const filtered = scripts.filter((s) => s.idScript !== selectedScript.idScript);
        
        if (!filtered.find((s) => s.idScript === 0)) {
          filtered.unshift({ 
            idScript: 0, 
            nombre: " ", 
            descripcion: "", 
            script: "" 
          });
        }
        onScriptsUpdate?.(filtered); // ✅ Notificar al padre
        // Seleccionar automáticamente el script "Nuevo"
        const newScript = filtered.find((s) => s.idScript === 0);
        setSelectedScript(newScript);
        setEditedData({ nombre: "", descripcion: "", script: "" });
        setHasChanges(false);
        setShowPreview(false);
      })(),
      {
        loading: "Eliminando script...",
        success: "Script eliminado. Ahora puedes editar el script Nuevo",
        error: "Error al eliminar el script",
      }
    );
  };


   // ✅ Modificar handleSave
  const handleSave = async () => {
    if (!editedData.nombre) return toast.error("El nombre del script es obligatorio");
    if (!selectedScript) return toast.error("Selecciona un script antes de guardar");
    const scriptData = {
      idScript: selectedScript.idScript,
      idProducto: idProducto,
      nombre: editedData.nombre,
      descripción: editedData.descripcion,
      script1: editedData.script,
      fechaInsert: new Date().toISOString().split("T")[0],
      idEjecutivoInsert: idEjecutivo,
    };

    toast.promise(
      (async () => {
        let response;
        if (selectedScript.idScript) {
          response = await putUpdateScripts(scriptData);     
          // ✅ Actualizar scripts en el padre
          const updatedScripts = scripts.map((s) =>
            s.idScript === selectedScript.idScript ? { ...s, ...editedData } : s
          );
          onScriptsUpdate?.(updatedScripts);      
          toast.success("Script actualizado exitosamente");
        } else {
          response = await PostSaveScripts(scriptData);
          const newScript = { ...editedData, idScript: response.idScript };
          onScriptsUpdate?.([...scripts, newScript]);      
          setSelectedScript(newScript);
          toast.success("Script guardado exitosamente");
        }      
        setHasChanges(false);
        setIsEditingScript(false);
        setShowPreview(false);
        return response;
      })(),
      {
        loading: "Guardando script...",
        success: "Cambios guardados correctamente",
        error: (error) => {
          console.error("Error al guardar script:", error);
          return error.message || "Error desconocido";
        },
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
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent resize-none transition-all"
                placeholder="Descripción del script"
              />
            </div>
            <div className="">
              <div className="block md:flex justify-between items-center">
                {!showPreview && (
                  <div className="flex gap-2 mb-2">
                    <button className="font-bold" onClick={() => insertFormatMarker("*")} type="button">
                      <IconCircular textColor="text-gray-200" borderColor="border-gray-800 hover:border-jerarquia3" bgColor="bg-gray-800 hover:bg-jerarquia3" tooltip="Agregar/quitar resaltado">
                        N
                      </IconCircular>
                    </button>
                    <button onClick={() => insertFormatMarker("&")} type="button">
                      <IconCircular textColor="text-lime-500" borderColor="border-gray-800 hover:border-jerarquia3" bgColor="bg-gray-800 hover:bg-jerarquia3" tooltip="Agregar/quitar color">
                        C
                      </IconCircular>
                    </button>
                    <button onClick={cleanFormatMarkers} type="button">
                      <IconCircular textColor="text-gray-200" borderColor="border-gray-800 hover:border-jerarquia3" bgColor="bg-gray-800 hover:bg-jerarquia3" tooltip="Deshacer Cambios">
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 32 32">
                          <path fill="currentColor" d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"></path>
                          <path fill="currentColor" d="M17.003 20a4.9 4.9 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.7 5.7 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.6 16.6 0 0 1 10 24H8a17.3 17.3 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13 13 0 0 0 17.596 28Z"></path>
                        </svg>
                      </IconCircular>
                    </button>
                  </div>
                )}
                <div className={`flex items-center gap-3 mb-2 ${showPreview ? "ml-auto" : ""}`}>
                  <div className=" text-center items-center">
                    <input type="checkbox" id="vista-previa" className="form-checkbox  h-4 w-4 bg-blue-600 text-end text-jerarquia1 rounded cursor-pointer" checked={showPreview} onChange={(e) => setShowPreview(e.target.checked)} />
                    <label htmlFor="vista-previa" style={{color: "#3eac91"}} className="ml-1 text-sm cursor-pointer text-end ">
                      Vista Previa
                    </label>
                  </div>
                  {showPreview ? (
                    <div className="flex gap-2">
                      <ButtonSave onClick={handleSave} className="btn-success" />
                    </div>
                  ) : (
                    <button onClick={clearScript} className="flex btn-danger">
                      Borrar
                    </button>
                  )}
                </div>
              </div>
              {/* Editor */}
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
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = "copy"; }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!showPreview) {
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
                  className={`w-full px-3 py-2 bg-gray-800 text-white border border-gray-800 rounded-lg ${!showPreview ? "focus:ring-2 focus:ring-jerarquia2 focus:border-transparent" : ""} text-sm min-h-[288px] max-h-96 overflow-auto transition-all outline-none ${showPreview ? "cursor-default" : "cursor-text"}`}
                  style={{ whiteSpace: "pre-wrap", fontFamily: "sans-serif", lineHeight: "1.5" }}
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
      </div>
      {scriptOptions.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm bg-gray-800 rounded-lg mt-4">
          <p>No hay scripts disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default EditionScripts;