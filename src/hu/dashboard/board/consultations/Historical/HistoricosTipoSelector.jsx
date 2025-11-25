import React from "react";

const HistoricosTipoSelector = ({ cartera, setCartera, carteras, carterasProductosData, setProductos, setProducto, producto, productos, isIndividual, setTipoSeleccionado, handleTipoSeleccion, modoHeader }) => (
    <>
        {modoHeader ? (
            // Layout alineado para el header del modal expandido
            <div className="flex flex-row items-center gap-6 justify-center w-full">
                {/* Dropdown Cartera */}
                <div className="relative max-w-[11rem]">
                    <select
                        className="peer p-4 pe-9 block bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 w-[11rem]"
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
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                {/* Radios alineados en la misma fila */}
                <div className="flex flex-row items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tipo"
                            checked={isIndividual === true}
                            onChange={function () {
                                setTipoSeleccionado(true);
                                handleTipoSeleccion(true);
                            }}
                            className="modal-radio"
                        />
                        <span className="modal-span-2">Individual</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tipo"
                            checked={isIndividual === false}
                            onChange={function () {
                                setTipoSeleccionado(false);
                                handleTipoSeleccion(false);
                            }}
                            className="modal-radio"
                        />
                        <span className="modal-span-2">Archivo</span>
                    </label>
                </div>
            </div>
        ) : (
            // Layout original para el modal inicial
            <>
                <div className="relative w-full mb-2 max-w-xs mx-auto sm:max-w-[14rem] md:max-w-[12rem]">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 sm:w-[14rem] md:w-[12rem]"
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
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                            <input
                                type="radio"
                                name="tipo"
                                checked={isIndividual === true}
                                onChange={function () {
                                    setTipoSeleccionado(true);
                                    handleTipoSeleccion(true);
                                }}
                                className="modal-radio"
                            />
                            <span className="modal-span-2 text-sm">Individual</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                            <input
                                type="radio"
                                name="tipo"
                                checked={isIndividual === false}
                                onChange={function () {
                                    setTipoSeleccionado(false);
                                    handleTipoSeleccion(false);
                                }}
                                className="modal-radio"
                            />
                            <span className="modal-span-2 text-sm">Archivo</span>
                        </label>
                    </div>
                </div>
            </>
        )}
    </>
);

export default HistoricosTipoSelector;
