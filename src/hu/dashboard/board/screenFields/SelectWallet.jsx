import React from "react";

const SelectWallet = ({ 
    options = [], // ⭐ Valor por defecto para evitar el error
    value, 
    defaultValue = "", 
    onChange, 
    label, 
    relative = true,
    ...props
}) => {
    // Generamos un ID único si no se proporciona para accesibilidad
    const selectId = props.id || `select-wallet-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={relative ? "relative" : "static"}>
            <select
                id={selectId} // 2. Asocia el ID para la accesibilidad
                defaultValue={defaultValue}
                onChange={e => onChange(e.target.value)}
                value={value}
                {...props}
                className={`peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-blue-500
                             focus:pb-2  not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            
            {/* 3. ELEMENTO LABEL FLOTANTE (Necesario para el estilo) */}
            {label && (
                <label
                    htmlFor={selectId}
                    className="absolute -top-3 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                        peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500 text-neutral-500"
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default SelectWallet;