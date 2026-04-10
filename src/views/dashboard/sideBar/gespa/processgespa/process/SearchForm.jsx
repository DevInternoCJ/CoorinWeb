import React from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import SelectWallet from "../../../../board/screenFields/SelectWallet";

const SearchForm = ({
  // Configuración del select principal
  selectConfig = {
    label: "Cartera",
    value: "",
    onChange: () => {},
    options: [],
  },
  
  // Configuración de los radio buttons (opcional)
  radioConfig = null,

  searchConfig = {
    value: "",
    onChange: () => {},
    placeholder: "Buscar...",
  },
  
  // Configuración del botón
  buttonConfig = {
    onClick: () => {},
    label: "Buscar",
    className: "btn-success",
  },
  
  // Layout personalizable
  layout = "horizontal", // "horizontal" | "vertical"
  selectWidth = "w-64",
}) => {
  return (
    <div className={`flex ${layout === "vertical" ? "flex-col" : "flex-col"} gap-3 w-full`}>
      
      {/* Fila superior: Select y Radio buttons */}
      <div className="flex items-center justify-start gap-10 text-sm">
        
        {/* Select reutilizable */}
        <div className={selectWidth}>
          <SelectWallet
            label={selectConfig.label}
            options={selectConfig.options}
            value={selectConfig.value}
            onChange={selectConfig.onChange}
          />
        </div>
        
        {/* Radio buttons (condicional) */}
        {radioConfig && (
          <div className="flex flex-col gap-1">
            {radioConfig.label && (
              <span className="text-xs text-gray-500 font-medium">
                {radioConfig.label}
              </span>
            )}
            <div className="flex gap-6">
              {radioConfig.options.map((option) => (
                <label key={option.value} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={radioConfig.value === option.value}
                    onChange={() => radioConfig.onChange(option.value)}
                    className="cursor-pointer"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Input + Botón */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={searchConfig.value}
          onChange={(e) => searchConfig.onChange(e.target.value)}
          placeholder={searchConfig.placeholder}
          className="flex-1 bg-gray-200 h-8 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SaveButton
          onClick={buttonConfig.onClick}
          className={buttonConfig.className}
        >
          {buttonConfig.label}
        </SaveButton>
      </div>
    </div>
  );
};

export default SearchForm;