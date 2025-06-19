import React from "react";

// Flecha tipo chevron moderna
const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#2b463c",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalConsultaCuentasHeader = () => (
    <div className="flex items-center gap-4 mb-2 w-full">
        {/* Logo preparado */}
        {/* <div className="flex flex-col items-center gap-2 min-w-[120px]"> */}
            {/* <img src={logo} alt="Logo" className="h-10 w-auto object-contain" /> */}
        {/* </div> */}
        <h2 className="text-xl font-bold text-[var(--color-jerarquia3)] mb-1 flex justify-start">
            Consulta de cuentas
        </h2>
        <div className="flex-1 flex flex-row items-center gap-4 justify-end">
            <div className="flex items-center gap-8">
                <span className="text-base text-[var(--color-jerarquia4)] font-semibold">Cartera</span>
                <span className="text-base text-[var(--color-jerarquia4)]">American Express</span>
                <span className="text-base text-[var(--color-jerarquia4)] font-semibold ml-8">Producto</span>
                <div className="relative">
                    <select
                        className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                    >
                        <option>Amex</option>
                    </select>
                    <DropdownArrow />
                </div>
                <span className="text-base text-[var(--color-jerarquia4)] font-semibold ml-8">Consulta</span>
                <div className="relative">
                    <select
                        className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                    >
                        <option value=""> </option>
                    </select>
                    <DropdownArrow />
                </div>
            </div>
        </div>
        {/* Aquí puedes agregar botones de minimizar/cerrar si lo necesitas */}
    </div>
);

export default ModalConsultaCuentasHeader;
