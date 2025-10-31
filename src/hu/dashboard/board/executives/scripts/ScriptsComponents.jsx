import React from "react";

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
        tooltip="Agregar/quitar resaltado"
      >
        N
      </IconCircular>
    </button>
    <button onClick={() => onInsertFormat("&")} type="button">
      <IconCircular 
        textColor="text-lime-500" 
        borderColor="border-gray-800 hover:border-jerarquia3" 
        bgColor="bg-gray-800 hover:bg-jerarquia3" 
        tooltip="Agregar/quitar color"
      >
        C
      </IconCircular>
    </button>
    <button onClick={onCleanFormat} type="button">
      <IconCircular 
        textColor="text-gray-200" 
        borderColor="border-gray-800 hover:border-jerarquia3" 
        bgColor="bg-gray-800 hover:bg-jerarquia3" 
        tooltip="Deshacer Cambios"
      >
        <IconClean />
      </IconCircular>
    </button>
  </div>
);

export const PreviewControls = ({ showPreview, onTogglePreview, onSave, onClearScript, ButtonSave }) => (
  <div className={`flex items-end gap-3 my-2 ${showPreview ? "ml-auto" : ""}`}>
    <div className="text-center items-center">
      <input 
        type="checkbox" 
        id="vista-previa" 
        className="form-checkbox h-4 w-4 bg-blue-600 text-end text-jerarquia1 rounded cursor-pointer" 
        checked={showPreview} 
        onChange={(e) => onTogglePreview(e.target.checked)} 
      />
      <label 
        htmlFor="vista-previa" 
        style={{color: "#3eac91"}} 
        className="ml-1 text-sm cursor-pointer text-end"
      >
        Vista Previa
      </label>
    </div>
    {showPreview ? (
      <div className="flex gap-2">
        <ButtonSave onClick={onSave} className="btn-success" />
      </div>
    ) : (
      <button onClick={onClearScript} className="flex btn-danger">
        Borrar
      </button>
    )}
  </div>
);

export const ScriptEditorToolbar = ({ 
  showPreview, 
  onInsertFormat, 
  onCleanFormat, 
  onTogglePreview, 
  onSave, 
  onClearScript,
  IconCircular,
  IconClean,
  ButtonSave 
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