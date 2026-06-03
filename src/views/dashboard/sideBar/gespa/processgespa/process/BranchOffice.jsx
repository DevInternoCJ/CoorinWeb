// FileUploader.jsx
import React, { useRef, useState, useEffect } from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import SelectWallet from "../../../../board/screenFields/SelectWallet";
import { getCarteras } from "../../../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";

const FileUploader = ({
  onFileChange,
  onSave,
  saveDisabled,
  cartera,
  onCarteraChange,
  selectWidth = "w-full",
}) => {
  const [carteraOptions, setCarteraOptions] = useState([
    { value: "", label: "Seleccione una cartera" },
  ]);
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
    const fetchCarteras = async () => {
      try {
        const carteras = await getCarteras();

        const options = [
          { value: "", label: "Seleccione una cartera" },
          ...carteras.map((cartera) => ({
            label: cartera.cartera,
            value: cartera.idCartera,
          })),
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

  useEffect(() => {
    if (saveDisabled && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [saveDisabled]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <div className={selectWidth}>
        <SelectWallet
          label="Cartera"
          value={cartera}
          onChange={onCarteraChange}
          options={carteraOptions}
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
