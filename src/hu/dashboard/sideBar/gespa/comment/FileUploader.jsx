// FileUploader.jsx
import React, { useRef, useState } from "react";
import SaveButton from "../../Administration/gespa/ButtonSave";
import { IconFile } from "./IconsComments";

/**
 * FileUploader
 * - maneja selección de archivo y expone: selectedFile, selectedFileName, onSelect
 * - renderiza botones: seleccionar y acción (guardar) - la acción de guardar se delega al prop onSave
 */
const FileUploader = ({ onFileChange, onSave, saveDisabled, uploading = false }) => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleInputChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setSelectedFileName(f.name);
      onFileChange && onFileChange(f, f.name);
    } else {
      setSelectedFileName("");
      onFileChange && onFileChange(null, "");
    }
  };

  return (
    <div className="my-3 mx-5 bg-neutral-100 flex items-center gap-5 rounded-md border-none">
      <div className="flex-1 bg-background-tertiary border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 truncate">
        {uploading ? "Subiendo archivo..." : (selectedFileName || "Seleccione archivo")}
      </div>

      <input 
        ref={fileInputRef} 
        type="file" 
        className="hidden" 
        onChange={handleInputChange}
        accept=".xls,.xlsx,.csv"
        disabled={uploading}
      />
      
      <SaveButton 
        tooltip="Seleccionar archivo" 
        className="btn-info w-14" 
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        disabled={uploading}
      >
        <IconFile className="size-5.5" />
      </SaveButton>

      <SaveButton
        className={`btn-success ${(saveDisabled || uploading) ? "opacity-50 cursor-not-allowed" : ""}`}
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
