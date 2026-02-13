import React from "react";
import { IconWarning } from "../../../board/executives/scripts/IconScripts";

const HistoricosTipoSelector = ({ 
    cartera, 
    setCartera, 
    carteras, 
    carterasProductosData, 
    setProductos, 
    setProducto, 
    isIndividual, 
    setTipoSeleccionado, 
    handleTipoSeleccion 
}) => {
    // Determinar si no hay selección (null o undefined)
    const noSeleccionado = isIndividual === null || isIndividual === undefined;

    return (
        <div className="w-full flex flex-col gap-3">
            {/* Selectores */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4">
                <div className="relative w-full sm:w-auto">
                    <select
                        className="peer p-2 pt-4 pe-8 block w-full bg-gray-50 border border-jerarquia1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                        value={cartera}
                        onChange={e => {
                            setCartera(e.target.value);
                            const productosFiltrados = carterasProductosData
                                .filter(item => item.cartera === e.target.value)
                                .map(item => item.producto);
                            const productosConDefault = ["-Sin Producto-", ...productosFiltrados];
                            setProductos(productosConDefault);
                            setProducto("-Sin Producto-");
                        }}
                        id="cartera-select"
                    >
                        {carteras.length === 0 && <option value="" disabled hidden></option>}
                        {carteras.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute left-2 top-1 text-xs text-gray-500 pointer-events-none"
                    >
                        Cartera
                    </label>
                </div>
                
                <div className="flex flex-row w-full sm:w-auto justify-between sm:justify-start gap-4">
                    <label className="flex items-center gap-1 cursor-pointer w-1/2 sm:w-auto">
                        <input
                            type="radio"
                            name="tipo"
                            checked={isIndividual === true}
                            onChange={() => {
                                if (typeof setTipoSeleccionado === 'function') setTipoSeleccionado(true);
                                handleTipoSeleccion(true);
                            }}
                            className="modal-radio"
                        />
                        <span className="modal-span-2 text-base">Individual</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer w-1/2 sm:w-auto">
                        <input
                            type="radio"
                            name="tipo"
                            checked={isIndividual === false}
                            onChange={() => {
                                if (typeof setTipoSeleccionado === 'function') setTipoSeleccionado(false);
                                handleTipoSeleccion(false);
                            }}
                            className="modal-radio"
                        />
                        <span className="modal-span-2 text-base">Archivo</span>
                    </label>
                </div>
            </div>

            {/* Mensaje cuando no hay selección */}
            {noSeleccionado && (
               <div className="">
              <div className="flex m-5 flex-col items-center justify-center text-center text-gray-500 bg-gray-200 rounded-lg py-20">
                          <IconWarning className="size-8"/>
                          <p className="text-sm text-gray-400 mt-1">
                            Seleccione una opcion para continuar.
                          </p>
                        </div>
                        </div>
            )}
        </div>
    );
};

export default HistoricosTipoSelector;