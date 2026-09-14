import React from "react";
import FloatingSelect from "./FloatingSelect";
import FieldError from "../Formulario/FieldError";
import useCatalogOptions from "../../hooks/useCatalogOptions";
import { useCatalogStore } from "../../contextGlobal/catalogStore";

const CatalogSelect = ({
  id,
  label = "Cartera",
  value,
  onChange,
  type = "cartera",
  required = false,
  error,
  disabled = false,
  className = "",
  idCartera = "",
  catalogId,
  filter,
}) => {
  const catalogs = useCatalogOptions({ loadProducts: type === "producto", idCartera });
  const catalogStore = useCatalogStore();
  const catalogOptions = catalogId ? catalogStore.valoresFor(catalogId, filter || {}) : [];
  const options = catalogId
    ? catalogOptions.map((item) => ({
        value: item.idValor,
        label: item.valor,
      }))
    : type === "producto"
      ? catalogs.productoOptions
      : catalogs.carteraOptions;
  const loading = catalogs.loading;

  return (
    <div className={className}>
      <FloatingSelect
        id={id}
        label={label}
        value={String(value ?? "")}
        onChange={onChange}
        options={options}
        required={required}
        disabled={disabled || loading}
        placeholder={loading ? "Cargando catálogos…" : options.length ? "Seleccionar…" : "Sin opciones"}
      />
      {/* Un error de una petición auxiliar no debe permanecer visible si el
          catálogo ya resolvió opciones válidas para este selector. */}
      <FieldError
        id={`${id}-error`}
        message={error || (!loading && options.length === 0 ? catalogs.error : null)}
      />
    </div>
  );
};

export default CatalogSelect;
