import React from "react";
import { IconCustomTable } from "./IconesConsultations";


const ModalConsultaCuentasFooter = () => (
    <>
        <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex flex-row w-full items-center">
                {/* Botón Consultar centrado, alineado con la tabla Filtros (3/4) */}
                <div className="flex justify-center items-center" style={{ width: "75%" }}>
                    <button
                        className="bg-[var(--color-background-secondary)] text-white rounded px-6 py-2 font-semibold hover:bg-[var(--color-jerarquia3)] transition flex items-center gap-2"
                        style={{ cursor: "pointer" }}
                    >
                        Consultar
                        <span className="material-icons text-base align-middle">table_view</span>
                    </button>
                    <IconCustomTable className="ml-2 size-6" style={{ color: "var(--color-jerarquia3)", cursor: "pointer" }} />
                </div>
                {/* Radios alineados con la tabla Columnas (1/4) */}
                <div className="flex justify-center items-center gap-8 pr-2" style={{ width: "25%" }}>
                    <label className="flex items-center gap-1">
                        <input type="radio" name="tipo" defaultChecked /> Contar
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="radio" name="tipo" /> Detalle
                    </label>
                </div>
            </div>
            {/* Tabla vacía visual */}
            <div className="w-full flex justify-center">
                <table
                    className="w-full border border-[var(--color-jerarquia1)] rounded text-xs bg-white"
                    style={{ minHeight: "20vh" }}
                >
                    <thead>
                        <tr>
                            <th className="px-2 py-1 border-b text-left">Columna 1</th>
                            <th className="px-2 py-1 border-b text-left">Columna 2</th>
                            <th className="px-2 py-1 border-b text-left">Columna 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Vacío */}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="w-full text-xs text-gray-500 mt-8 mb-2 flex justify-start">
            Indique los parámetros que desea buscar y presione Agregar.
        </div>
    </>
);

export default ModalConsultaCuentasFooter;
