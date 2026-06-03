import React, { useState } from 'react'
import SaveButton from '../../../Administration/gespa/ButtonSave';

const AccountStatements = ({ 
  onConsultar,
  defaultStartDate = "",
  defaultEndDate = "",
  buttonLabel = "Consultar",
  buttonClassName = "bg-slate-600 hover:bg-slate-700"
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleConsultar = () => {
    if (onConsultar) {
      onConsultar({ startDate, endDate });
    }
  };

  // Función para formatear la fecha a dd/MM/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Contenedor de los dos date inputs */}
      <div className="flex justify-evenly gap-6">
        
        {/* Desde */}
        <div className=" items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)] font-medium">
            Desde
          </label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[var(--color-surface-secondary)] py-2.5 sm:py-3 px-4 block w-full border border-[var(--color-border)] rounded-lg sm:text-sm text-[var(--color-text-primary)] focus:border-[var(--color-jerarquia2)] focus:ring-[var(--color-jerarquia2)] disabled:opacity-50 disabled:pointer-events-none"
            />
          </div>
        </div>
        {/* Hasta */}
        <div className=" items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)] font-medium">
            Hasta
          </label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[var(--color-surface-secondary)] py-2.5 sm:py-3 px-4 block w-full border border-[var(--color-border)] rounded-lg sm:text-sm text-[var(--color-text-primary)] focus:border-[var(--color-jerarquia2)] focus:ring-[var(--color-jerarquia2)] disabled:opacity-50 disabled:pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className='justify-end ml-auto mr-25'>
      <SaveButton
        onClick={handleConsultar}
        className="btn-success"
      >
        {buttonLabel}
      </SaveButton>
      </div>
    </div>
  );
};

// Ejemplo de uso
const DateRangeSelectorExample = () => {
  const handleConsultar = ({ startDate, endDate }) => {
    console.log("Fecha desde:", startDate);
    console.log("Fecha hasta:", endDate);
    // Aquí puedes hacer tu petición API
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <DateRangeSelector 
          onConsultar={handleConsultar}
          defaultStartDate="2025-12-28"
          defaultEndDate="2025-12-29"
        />
      </div>
    </div>
  );
};
export default AccountStatements


