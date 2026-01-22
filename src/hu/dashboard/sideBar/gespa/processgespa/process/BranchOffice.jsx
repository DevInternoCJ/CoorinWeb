// FileUploader.jsx
import React, { useRef, useState, useEffect} from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import { IconFile } from "../../comment/IconsComments";
import SelectWallet from "../../../../board/screenFields/SelectWallet";
import { getCarteras } from "../../../../../../services/mark/orochi/LokiServices";
import { toast } from "sonner";

const FileUploader = ({ onFileChange, onSave, saveDisabled, cartera, onCarteraChange,
  selectWidth = "w-64",
}) => {
  const [carteraOptions, setCarteraOptions] = useState([
        { value: "", label: "Seleccione una cartera" },
      ]);
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
      useEffect(() => {
        const fetchCarteras = async () => {
          try {
            const carteras = await getCarteras();
    
            const options = [
              { value: "", label: "Seleccione una cartera" },
              ...carteras.map((cartera) => ({
                label: cartera.cartera,
                value: cartera.idCartera,
              }))
            ];
    
            setCarteraOptions(options);
          } catch (error) {
            console.error("Error fetching carteras:", error);
            toast.error("Error al cargar las carteras");
            setCarteraOptions([{ value: "", label: "Error al cargar" }]);
          }
        };
    
        fetchCarteras();
      }, []);

  return (
    <div className=" d-flex items-center justify-center">
        <div className={selectWidth}>
          <SelectWallet
          label="Cartera"
          value={cartera}
          onChange={onCarteraChange}
          options={carteraOptions}
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
