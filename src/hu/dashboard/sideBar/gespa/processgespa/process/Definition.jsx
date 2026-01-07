import React from "react";
import SearchForm from "./SearchForm"; // ajusta el path

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
  ];

  return (
    <SearchForm
      selectConfig={{
        label: "Cartera",
        value: cartera,
        onChange: onCarteraChange,
        options: carteraOptions,
      }}
      radioConfig={{
        label: "Tipo",
        value: tipo,
        onChange: onTipoChange,
        options: [
          { value: "individual", label: "Individual" },
          { value: "archivo", label: "Archivo" },
        ],
      }}
      searchConfig={{
        value: searchValue,
        onChange: onSearchChange,
        placeholder: "Buscar...",
      }}
      buttonConfig={{
        onClick: onSearchClick,
        label: "Buscar",
        className: "btn-success",
      }}
    />
  );
};

export default Definition;