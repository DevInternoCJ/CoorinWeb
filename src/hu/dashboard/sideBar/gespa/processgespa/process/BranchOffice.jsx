// FileUploader.jsx
import React, { useRef, useState } from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import { IconFile } from "../../comment/IconsComments";
import SelectWallet from "../../../../board/screenFields/SelectWallet";

/**
 * FileUploader
 * - maneja selección de archivo y expone: selectedFile, selectedFileName, onSelect
 * - renderiza botones: seleccionar y acción (guardar) - la acción de guardar se delega al prop onSave
 */
const FileUploader = ({ onFileChange, onSave, saveDisabled, 
     selectConfig = {
    label: "Cartera",
    value: "",
    onChange: () => {},
    options: [],
  },
  selectWidth = "w-64",
}) => {
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
  const carteraOptions = [
    { value: "", label: "Seleccione" },
    { value: "amex", label: "American Express" },
  ];

  return (
    <div className=" d-flex items-center justify-center">
                <div className={selectWidth}>
          <SelectWallet
            label={selectConfig.label}
            options={carteraOptions}
            value={selectConfig.value}
            onChange={selectConfig.onChange}
          />
        </div>
    <div className="my-3 bg-neutral-100 flex items-center gap-5 rounded-md border-none">
      <div className="flex-1 bg-background-tertiary border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 truncate">
        {selectedFileName || "Seleccione archivo"}
      </div>

      <input ref={fileInputRef} type="file" className="hidden" onChange={handleInputChange} />
      <SaveButton tooltip="Seleccionar archivo" className="btn-info w-14" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
        <IconFile className="size-5.5 " />
      </SaveButton>

      <SaveButton
        className={`btn-success ${saveDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (saveDisabled) return;
          onSave && onSave();
        }}
        disabled={saveDisabled}
        aria-disabled={saveDisabled}
        title={saveDisabled ? "Seleccione un archivo antes de guardar" : "Guardar"}
      >
        Guardar
      </SaveButton>
    </div>
    </div>
  );
};

export default FileUploader;
