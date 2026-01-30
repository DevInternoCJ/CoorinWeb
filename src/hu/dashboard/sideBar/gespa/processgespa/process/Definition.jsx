import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { getCarteras } from "../../../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";

const Definition = ({
  cartera,
  onCarteraChange,
  tipo,
  onTipoChange,
  searchValue,
  onSearchChange,
  onSearchClick,
}) => {
  const [carteraOptions, setCarteraOptions] = useState([
    { value: "", label: "Seleccione una cartera" },
  ]);

  // Efecto para cargar las carteras desde el servicio
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

  return (
    <>
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
    </>
  );
};

export default Definition;
