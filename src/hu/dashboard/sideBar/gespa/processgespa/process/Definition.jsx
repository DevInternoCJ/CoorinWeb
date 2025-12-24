import React from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import SelectWallet from "../../../../board/screenFields/SelectWallet"; // ajusta el path

const Definition = ({
  cartera,
  onCarteraChange,
  tipo,
  onTipoChange,
  searchValue,
  onSearchChange,
  onSearchClick,
}) => {

  const carteraOptions = [
    { value: "", label: "Seleccione" },
    { value: "amex", label: "American Express" },
    { value: "banamex", label: "Banamex" },
    { value: "santander", label: "Santander" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Cartera y Tipo */}
      <div className="flex items-center justify-start gap-10 text-sm">

        {/* Select reutilizable */}
        <div className="w-64">
          <SelectWallet
            label="Cartera"
            options={carteraOptions}
            value={cartera}
            onChange={onCarteraChange}
          />
        </div>
        {/* Tipo */}
        <div className="flex gap-6">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={tipo === "individual"}
              onChange={() => onTipoChange("individual")}
            />
            Individual
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={tipo === "archivo"}
              onChange={() => onTipoChange("archivo")}
            />
            Archivo
          </label>
        </div>
      </div>
      {/* Input + Botón */}
      <div className="flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-200 h-8 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
        />
        <SaveButton
          onClick={onSearchClick}
          className="btn-success"
        >
          Buscar
        </SaveButton>
      </div>
    </div>
  );
};

export default Definition;
