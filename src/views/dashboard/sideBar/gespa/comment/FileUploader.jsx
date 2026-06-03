// FileUploader.jsx
import React, { useRef, useEffect } from "react";
import SaveButton from "../../Administration/gespa/ButtonSave";

/**
 * FileUploader
 * - maneja selección de archivo y expone: selectedFile, selectedFileName, onSelect
 * - renderiza botones: seleccionar y acción (guardar) - la acción de guardar se delega al prop onSave
 */
const FileUploader = ({ onFileChange, onSave, saveDisabled, uploading = false }) => {
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      onFileChange && onFileChange(f, f.name);
    } else {
      onFileChange && onFileChange(null, "");
    }
  };

  useEffect(() => {
    if (saveDisabled && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [saveDisabled]);

  return (
    <div className="my-3 mx-5 flex items-center gap-3">
      <div className="relative flex-grow">
        <label htmlFor="file-input" className="sr-only">
          {uploading ? "Subiendo archivo..." : "Seleccionar archivo"}
        </label>
        <input 
          id="file-input"
          ref={fileInputRef} 
          type="file" 
          onChange={handleInputChange}
          accept=".xls,.xlsx,.csv"
          disabled={uploading}
          className="block w-full border border-[var(--color-border)] shadow-xs rounded-lg text-sm text-[var(--color-text-secondary)] focus:z-10 focus:border-[var(--color-jerarquia2)] focus:ring-[var(--color-jerarquia2)] disabled:opacity-50 disabled:pointer-events-none bg-[var(--color-surface)] file:bg-[var(--color-surface-secondary)] file:border-0 file:me-4 file:py-2.5 file:px-4 file:text-[var(--color-text-primary)] file:font-semibold file:cursor-pointer hover:file:bg-[var(--color-surface-secondary)]/80 file:transition-colors"
        />
      </div>

      <SaveButton
        className={`btn-success shrink-0 ${(saveDisabled || uploading) ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (saveDisabled || uploading) return;
          onSave && onSave();
        }}
        disabled={saveDisabled || uploading}
        aria-disabled={saveDisabled || uploading}
        title={
          uploading ? "Subiendo..." : 
          saveDisabled ? "Seleccione un archivo antes de guardar" : 
          "Guardar"
        }
      >
        {uploading ? "Subiendo..." : "Guardar"}
      </SaveButton>
    </div>
  );
};

export default FileUploader;
