import React from "react";
import FloatingSelect from "../../../../components/Select/FloatingSelect";

const SelectWallet = ({
  options = [], // Valor por defecto para evitar el error
  value,
  defaultValue = "",
  onChange,
  label,
  relative = true,
  ...props
}) => {
  // Generamos un ID único si no se proporciona para accesibilidad
  const selectId =
    props.id || `select-wallet-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div>
      <FloatingSelect
        placeholder={label}
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        label={label}
        {...props}
      />
    </div>
  );
};

export default SelectWallet;
