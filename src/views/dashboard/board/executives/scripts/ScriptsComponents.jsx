import React from "react";
import ButtonSave from "../../../sideBar/Administration/gespa/ButtonSave";
import IconCircular from "../../../../../components/Iconos/IconCircular";
import { IconClean } from "./IconScripts";
import { toast } from "sonner";

export const ScriptHeader = ({ scriptOptions, selectedScript, onWalletChange, SelectWallet }) => (
  <div className="flex justify-between items-center mb-0.5">
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-300">Script</label>
      <SelectWallet
        options={scriptOptions}
        label="Selecciona un script"
        onChange={onWalletChange}
        value={selectedScript?.idScript.toString() || ""}
      />
    </div>
  </div>
);

export const ScriptInputs = ({ editedData, onInputChange }) => (
  <>
    <div className="mb-2">
      <input
        type="text"
        value={editedData.nombre}
        onChange={(e) => onInputChange("nombre", e.target.value)}
        className="w-full px-2 py-1 text-white border bg-gray-800 border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent transition-all"
        placeholder="Nombre del script"
      />
    </div>
    <div className="mb-2">
      <input
        type="text"
        value={editedData.descripcion}
        onChange={(e) => onInputChange("descripcion", e.target.value)}
        className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent resize-none transition-all"
        placeholder="Descripción del script"
      />
    </div>
  </>
);

export const FormatToolbar = ({ onInsertFormat, onCleanFormat, IconCircular, IconClean }) => (
  <div className="flex gap-2 my-2">
    <button className="font-bold" onClick={() => onInsertFormat("*")} type="button">
      <IconCircular 
        textColor="text-gray-200" 
        borderColor="border-gray-800 hover:border-jerarquia3" 
        bgColor="bg-gray-800 hover:bg-jerarquia3" 
        tooltip="Agregar / Quitar resaltado"
      >
        N
      </IconCircular>
    </button>
    <button onClick={() => onInsertFormat("&")} type="button">
      <IconCircular 
        textColor="text-lime-500" 
        borderColor="border-gray-800 hover:border-jerarquia3" 
        bgColor="bg-gray-800 hover:bg-jerarquia3" 
        tooltip="Agregar / Quitar color"
      >
        C
      </IconCircular>
    </button>
    <button onClick={onCleanFormat} type="button">
      <IconCircular 
        textColor="text-gray-200" 
        borderColor="border-gray-800 hover:border-jerarquia3" 
        bgColor="bg-gray-800 hover:bg-jerarquia3" 
        tooltip="Deshacer cambios"
      >
        <IconClean />
      </IconCircular>
    </button>
  </div>
);

export const PreviewControls = ({ 
  showPreview, 
  onTogglePreview, 
  onSave, 
  onClearScript, 
  ButtonSave,
  isConfirming,
  toast
}) => {
  const handleSaveClick = () => {
    toast.custom((t) => (
      <div className="bg-amber-50 text-amber-700 px-4 py-3 rounded-lg shadow-lg flex flex-col gap-3 w-80">
        <span className="font-medium text-sm">
          ¿Está seguro de guardar los cambios?
        </span>
        <div className="flex justify-end gap-2">
          <ButtonSave
            onClick={() => {
              toast.dismiss(t);
              toast.info("Guardado cancelado");
            }}
            className="btn-danger hover:bg-red-600"
          >
            Cancelar
          </ButtonSave>
          <ButtonSave
            onClick={() => {
              toast.dismiss(t);
              toast.promise(
                onSave(),
                {
                  loading: "Guardando script...",
                  success: "Script guardado correctamente",
                  error: "Error al guardar el script",
                }
              );
            }}
            className="btn-success hover:bg-green-600"
          >
            Confirmar
          </ButtonSave>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: "top-center",
    });
  };

  const handleClearClick = () => {
    toast.custom((t) => (
      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg shadow-lg flex flex-col gap-3 w-80">
        <span className="font-medium text-sm">
          ¿Está seguro de borrar el script?
        </span>
        <div className="flex justify-end gap-2">
          <ButtonSave
            onClick={() => {
              toast.dismiss(t);
              toast.info("Operación cancelada");
            }}
            className="btn-secondary hover:bg-gray-400"
          >
            Cancelar
          </ButtonSave>
          <ButtonSave
            onClick={() => {
              toast.dismiss(t);
              toast.promise(
                new Promise((resolve) => {
                  onClearScript();
                  resolve();
                }),
                {
                  loading: "Borrando script...",
                  success: "Script borrado correctamente",
                  error: "Error al borrar el script",
                }
              );
            }}
            className="btn-danger hover:bg-red-600"
          >
            Confirmar
          </ButtonSave>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: "top-center",
    });
  };

  return (
    <div className={`flex items-end gap-3 my-2 ${showPreview ? "ml-auto" : ""}`}>
      <div className="text-center items-center">
        <input 
          type="checkbox" 
          id="vista-previa" 
          className="form-checkbox h-4 w-4 bg-blue-600 text-end text-jerarquia1 rounded cursor-pointer" 
          checked={showPreview} 
          onChange={(e) => onTogglePreview(e.target.checked)} 
          disabled={isConfirming}
        />
        <label 
          htmlFor="vista-previa" 
          style={{color: "#3eac91"}} 
          className={`ml-1 text-sm cursor-pointer text-end ${isConfirming ? 'opacity-50' : ''}`}
        >
          Vista Previa
        </label>
      </div>
      {showPreview ? (
        <div className="flex gap-2">
          <ButtonSave 
            onClick={handleSaveClick} 
            className="btn-success"
            disabled={isConfirming}
          />
        </div>
      ) : (
        <button 
          onClick={handleClearClick} 
          className="flex btn-danger"
          disabled={isConfirming}
        >
          Borrar
        </button>
      )}
    </div>
  );
};

export const ScriptEditorToolbar = ({ 
  showPreview, 
  onInsertFormat, 
  onCleanFormat, 
  onTogglePreview, 
  onSave, 
  onClearScript,
  IconCircular,
  IconClean,
  ButtonSave,
  isConfirming,
}) => (
  <div className="block md:flex justify-between items-center my-1">
    {!showPreview && (
      <FormatToolbar 
        onInsertFormat={onInsertFormat} 
        onCleanFormat={onCleanFormat}
        IconCircular={IconCircular}
        IconClean={IconClean}
      />
    )}
    <PreviewControls 
      showPreview={showPreview}
      onTogglePreview={onTogglePreview}
      onSave={onSave}
      onClearScript={onClearScript}
      ButtonSave={ButtonSave}
      isConfirming={isConfirming}
      toast={toast}
    />
  </div>
);

export const ScriptTextEditor = ({ 
  editableRef, 
  showPreview, 
  onEditorChange, 
  onFocus, 
  onBlur,
  onDrop 
}) => (
  <div
    ref={editableRef}
    contentEditable={!showPreview}
    suppressContentEditableWarning
    onInput={onEditorChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onDragOver={(e) => { 
      e.preventDefault(); 
      e.stopPropagation(); 
      e.dataTransfer.dropEffect = "copy"; 
    }}
    onDrop={onDrop}
    className={`w-full px-3 py-2 bg-gray-800 text-white border border-gray-800 rounded-lg ${
      !showPreview ? "focus:ring-2 focus:ring-jerarquia2 focus:border-transparent resize-none transition-all" : ""
    } text-sm min-h-[288px] max-h-96 overflow-auto transition-all outline-none ${
      showPreview ? "cursor-default" : "cursor-text"
    }`}
    style={{ whiteSpace: "pre-wrap", fontFamily: "sans-serif", lineHeight: "1.5" }}
  />
);

export const EmptyState = ({ scriptOptions }) => (
  scriptOptions.length === 0 && (
    <div className="text-center py-8 text-gray-400 text-sm bg-gray-800 rounded-lg mt-4">
      <p>No hay scripts disponibles.</p>
    </div>
  )
);