// FileUploader.jsx
import React, { useRef, useEffect } from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import CatalogSelect from "../../../../../../components/Select/CatalogSelect";

const FileUploader = ({
  onFileChange,
  onSave,
  saveDisabled,
  cartera,
  onCarteraChange,
  selectWidth = "w-full",
}) => {
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
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <div className={selectWidth}>
        <CatalogSelect
          id="sucursales-cartera"
          label="Cartera"
          value={cartera}
          onChange={onCarteraChange}
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-grow">
          <label htmlFor="file-input" className="sr-only">
            Seleccionar archivo
          </label>
          <input 
            id="file-input"
            ref={fileInputRef} 
            type="file" 
            onChange={handleInputChange}
            disabled={false}
            className="block w-full border border-[var(--color-border)] shadow-xs rounded-lg text-sm text-[var(--color-text-secondary)] focus:z-10 focus:border-[var(--color-jerarquia2)] focus:ring-[var(--color-jerarquia2)] disabled:opacity-50 disabled:pointer-events-none bg-[var(--color-surface)] file:bg-[var(--color-surface-secondary)] file:border-0 file:me-4 file:py-2.5 file:px-4 file:text-[var(--color-text-primary)] file:font-semibold file:cursor-pointer hover:file:bg-[var(--color-surface-secondary)]/80 file:transition-colors"
          />
        </div>

        <SaveButton
          className={`btn-success shrink-0 ${saveDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => {
            if (saveDisabled) return;
            onSave && onSave();
          }}
          disabled={saveDisabled}
          aria-disabled={saveDisabled}
          title={
            saveDisabled ? "Seleccione un archivo antes de guardar" : "Guardar"
          }
        >
          Guardar
        </SaveButton>
      </div>
    </div>
  );
};

export default FileUploader;
