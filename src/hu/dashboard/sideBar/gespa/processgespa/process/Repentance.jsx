import React, { useState } from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import SelectWallet from "../../../../board/screenFields/SelectWallet"; // ajusta el path

const Repentance = ({ searchValue, onSearchClick, onSearchChange }) => {
  const [cartera, setCartera] = useState("");
  const [cuenta, setCuenta] = useState("");

  // Opciones para los selects
  const carteraOptions = [
    { value: "", label: "Selecciona una cartera" },
    { value: "amex", label: "American Express" },
    { value: "banamex", label: "Banamex" },
    { value: "santander", label: "Santander" },
    { value: "hsbc", label: "HSBC" },
  ];

  const cuentaOptions = [
    { value: "", label: "Selecciona un tipo" },
    { value: "individual", label: "Individual" },
    { value: "archivo", label: "Archivo" },
    { value: "lote", label: "Lote" },
  ];

  const handleBuscar = () => {
    console.log("Buscar:", {
      cartera,
      cuenta,
      busqueda: searchValue,
    });
    onSearchClick();
  };

  return (
    <div className=" w-full">
      {/* Formulario */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          div
          {/* Select Cartera */}
          <SelectWallet
            label="Cartera"
            options={carteraOptions}
            value={cartera}
            onChange={setCartera}
          />

          {/* Select Cuenta */}
          <SelectWallet
            label="Cuenta"
            options={cuentaOptions}
            value={cuenta}
            onChange={setCuenta}
          />

          {/* Input + Botón */}
          <div className="flex items-center">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-gray-200 h-8 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            />
            <SaveButton onClick={onSearchClick} className="btn-success">
              Buscar
            </SaveButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repentance;
