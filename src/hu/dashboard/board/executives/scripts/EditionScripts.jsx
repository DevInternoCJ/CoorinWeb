
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
import { IconClean } from "./IconScripts";
import { 
  formatValue, 
  escapeHtml, 
  createNewScript,
  useScriptInitialization,
  useScriptEditor
} from "./ScriptsUtils";
import {
  ScriptHeader,
  ScriptInputs,
  ScriptEditorToolbar,
  ScriptTextEditor,
  EmptyState
} from "./ScriptsComponents";

const EditionScripts = ({ scripts = [], placeholderValues = {}, onScriptsUpdate }) => {
  const [selectedScript, setSelectedScript] = useState(null);
  const [editedData, setEditedData] = useState({ nombre: "", descripcion: "", script: "" });
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditingScript, setIsEditingScript] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const editableRef = useRef(null);
  const { walletProducts } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;
  // Inicialización de script
  useScriptInitialization(scripts, selectedScript, onScriptsUpdate);
  useEffect(() => {
  if (!selectedScript && scripts.length > 0) {
    const defaultScript =
      scripts.find((s) => s.idScript === 0) || scripts[0];
    setSelectedScript(defaultScript);
  }
}, [scripts, selectedScript]);
  // Opciones de script
  const scriptOptions = scripts.map((script) => ({
    value: script.idScript.toString(),
    label: script.nombre,
  }));
  // Reemplazo de placeholders
  // Reemplazo de placeholders
const replacePlaceholders = useCallback(
  (text, preview = false) => {
    if (!text) return "";
    if (!preview) return text;

    try {
      const resultado = text.replace(/\[([^\]]+)\]/g, (match, placeholder) => {
        let replacement = "";

        switch (placeholder) {
          case "NombreEjecutivo":
            replacement = user?.nombre || "";
            break;

          case "NombreDeudor":
          case "idCuenta":
          case "RFC":
          case "NúmeroCliente":
          case "Saldo":
            replacement =
              placeholderValues[placeholder] != null &&
              placeholderValues[placeholder] !== ""
                ? formatValue(placeholderValues[placeholder], placeholder)
                : "";
            break;

          default:
            replacement = Object.prototype.hasOwnProperty.call(placeholderValues, placeholder)
              ? (placeholderValues[placeholder] !== ""
                  ? formatValue(placeholderValues[placeholder], placeholder)
                  : "")
              : "";
        }

        return replacement; // si no hay valor, retorna vacío (no muestra nada)
      });

      return resultado;
    } catch (error) {
      console.error("Error al reemplazar placeholders:", error);
      return text;
    }
  },
  [placeholderValues, user]
);

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
    [showPreview, replacePlaceholders]
  );

  // Hook de editor
  const { saveCursorPosition, restoreCursorPosition } = useScriptEditor(
    editedData, 
    showPreview, 
    renderFormattedScriptToHTML, 
    editableRef, 
    cursorPosition
  );
  // Efectos
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

  const handleWalletChange = (selectedValue) => {
  if (hasChanges) {
    const selected = scripts.find((s) => s.idScript.toString() === selectedValue);
    toast.custom((t) => (
      <div className=" bg-amber-50 text-amber-700 px-4 py-3 rounded-lg shadow-lg flex flex-col gap-3 w-80">
        <span className="font-medium text-sm">
          Tienes cambios sin guardar. ¿Deseas continuar?
        </span>
        <div className="flex justify-end gap-2">
          <ButtonSave
            onClick={() => {
              toast.dismiss(t.id);
              toast.success("Operación cancelada");
            }}
            className="btn-danger hover:bg-red-600">
            Cancelar
          </ButtonSave>
          <ButtonSave
            onClick={() => {
              toast.dismiss(t.id);
              toast.promise(
                new Promise((resolve) => {
                  setTimeout(() => {
                    setSelectedScript(selected);
                    resolve();
                  }, 300);
                }),
                {
                  loading: "Cambiando script...",
                  success: "Script cambiado correctamente",
                  error: "Error al cambiar script",
                }
              );
            }}
            className="btn-success">
            Continuar
          </ButtonSave>
        </div>
      </div>
    ));
    return;
  }
  const script = scripts.find((s) => s.idScript.toString() === selectedValue);
  setSelectedScript(script);
};

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleEditorChange = () => {
    if (!editableRef.current) return;
     const position = saveCursorPosition(); // guardar antes de leer el HTML
     setCursorPosition(position);
    
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
  if (!selection.rangeCount) return toast.error("Selecciona un texto para aplicar el formato");

  const range = selection.getRangeAt(0);
  const selectedText = selection.toString();

  if (!selectedText.trim()) {
    return toast.error("Selecciona un texto válido para aplicar formato");
  }

  // Crear o quitar formato según el marcador
  const span = document.createElement("span");
  let styleApplied = "";

  if (marker === "*") {
    span.classList.add("font-bold");
    styleApplied = "negrita";
  } else if (marker === "&") {
    span.classList.add("text-lime-500");
    styleApplied = "color";
  }

  const parent = range.commonAncestorContainer.parentElement;

  // Si el texto ya tiene formato, quitarlo
  if (parent && parent.classList.contains(span.classList[0])) {
    const unformatted = document.createTextNode(selectedText);
    parent.replaceWith(unformatted);
    toast.info(`Formato ${styleApplied} eliminado`);
  } else {
    span.textContent = selectedText;
    range.deleteContents();
    range.insertNode(span);
    toast.success(`Formato ${styleApplied} aplicado`);
  }

  // Reubicar cursor al final del texto seleccionado
  selection.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStartAfter(span);
  newRange.collapse(true);
  selection.addRange(newRange);

  // Actualizar el estado del script (sin regenerar HTML)
  handleEditorChange();
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

  const clearScript = async () => {
    if (!selectedScript || !selectedScript.idScript) {
      const newScript = createNewScript();
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
        const filtered = scripts.filter((s) => s.idScript !== selectedScript.idScript);    
        if (!filtered.find((s) => s.idScript === 0)) {
          filtered.unshift(createNewScript());
        }
        onScriptsUpdate?.(filtered);    
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

  const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const placeholder = e.dataTransfer.getData("text/plain"); // o el formato que uses
  const selection = window.getSelection();

  if (window._savedRange) {
    selection.removeAllRanges();
    selection.addRange(window._savedRange);
  }

  const range = selection.getRangeAt(0);
  const textNode = document.createTextNode(placeholder);
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
  handleEditorChange();
};

  return (
    <div className="rounded-lg">
      <ScriptHeader 
        scriptOptions={scriptOptions}
        selectedScript={selectedScript}
        onWalletChange={handleWalletChange}
        SelectWallet={SelectWallet}
      />   
      <div className="bg-gray-700 rounded-lg p-4 gap-2">
        <div className="space-y-4">
          <ScriptInputs 
            editedData={editedData}
            onInputChange={handleInputChange}
          />     
          <div>
            <ScriptEditorToolbar
              showPreview={showPreview}
              onInsertFormat={insertFormatMarker}
              onCleanFormat={cleanFormatMarkers}
              onTogglePreview={setShowPreview}
              onSave={handleSave}
              onClearScript={clearScript}
              IconCircular={IconCircular}
              IconClean={IconClean}
              ButtonSave={ButtonSave}
            />     
            <div>
              <ScriptTextEditor
                editableRef={editableRef}
                showPreview={showPreview}
                onEditorChange={handleEditorChange}
                onFocus={() => setIsEditingScript(true)}
                onBlur={() => {
                  setIsEditingScript(false);
                  const newPosition = saveCursorPosition();
                  setCursorPosition(newPosition);
                }}
                onDrop={handleDrop}
              />
            </div>
          </div>
        </div>
      </div>     
      <EmptyState scriptOptions={scriptOptions} />
    </div>
  );
};

export default EditionScripts;