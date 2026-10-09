import React, { useState } from 'react';
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import { postAccionamientosCarga } from "../../../../../services/mark/orochi/LokiServices";

const CapturaContent = () => {
    const [cartera, setCartera] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [expediente, setExpediente] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [envio, setEnvio] = useState('');
    const [devuelto, setDevuelto] = useState('');
    const [causaDevolucion, setCausaDevolucion] = useState('');

    const [nombre, setNombre] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [estado, setEstado] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCaptura = async () => {
        if (!cartera || !archivo) {
            setEstado('Selecciona una cartera y un archivo de accionamientos.');
            return;
        }
        setLoading(true);
        setEstado('');
        try {
            await postAccionamientosCarga({ idCartera: cartera, archivo });
            setEstado('Archivo cargado correctamente.');
            setArchivo(null);
        } catch (error) {
            setEstado(error?.response?.data?.message || error.message || 'No fue posible cargar el archivo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Row 1: Select Cartera, Input Cuenta, Checkbox Expediente */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-">
                <div className="flex-1">
                    <CatalogSelect
                        id="cartera-captura-select"
                        label="Cartera"
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        required
                    />
                </div>
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={cuenta}
                        onChange={(e) => setCuenta(e.target.value)}
                        className="peer p-4 block w-full bg-surface-secondary border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cuenta-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="cuenta-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-muted-foreground peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-muted-foreground"
                    >
                        {expediente ? "Expediente" : "Cuenta"}
                    </label>
                </div>
                <div className="flex items-center self-center">
                    <input
                        type="checkbox"
                        checked={expediente}
                        onChange={(e) => setExpediente(e.target.checked)}
                        className="w-4 h-4 text-jerarquia1 bg-surface-secondary border-border rounded focus:ring-jerarquia1 focus:ring-2"
                        id="expediente-checkbox"
                    />
                    <label
                        htmlFor="expediente-checkbox"
                        className="ml-2 text-sm font-medium text-foreground"
                    >
                        Expediente
                    </label>
                </div>
            </div>

            {/* Row 2: Select Dirección y Input Nombre (solo lectura) */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <div className="flex-1">
                    <FloatingSelect
                        id="direccion-select"
                        label="Dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        options={[
                            { value: "direccion1", label: "Dirección 1" },
                            { value: "direccion2", label: "Dirección 2" },
                            { value: "direccion3", label: "Dirección 3" },
                        ]}
                    />
                </div>
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="peer p-4 block w-full bg-surface-secondary border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="nombre-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="nombre-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-muted-foreground peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-muted-foreground"
                    >
                        Nombre
                    </label>
                </div>
            </div>

            {/* Row 3: Calendario Envio y calendario Devuelto + select Causa devolucion */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <input
                        type="date"
                        value={envio}
                        onChange={(e) => setEnvio(e.target.value)}
                        className="peer p-4 block w-full bg-surface-secondary border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="envio-date"
                        placeholder=" "
                    />
                    <label
                        htmlFor="envio-date"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-muted-foreground peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-muted-foreground"
                    >
                        Envío
                    </label>
                </div>
                <div className="relative flex-1">
                    <input
                        type="date"
                        value={devuelto}
                        onChange={(e) => setDevuelto(e.target.value)}
                        className="peer p-4 block w-full bg-surface-secondary border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="devuelto-date"
                        placeholder=" "
                    />
                    <label
                        htmlFor="devuelto-date"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-muted-foreground peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-muted-foreground"
                    >
                        Devuelto
                    </label>
                </div>
                <div className="flex-1 sm:hidden md:hidden lg:flex">
                    <CatalogSelect
                        id="causa-devolucion-select"
                        label="Causa Devolución"
                        catalogId={10}
                        value={causaDevolucion}
                        onChange={(e) => setCausaDevolucion(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 4: Select Causa Devolución y Botón Captura */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 sm:items-stretch lg:justify-center">
                <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => setArchivo(e.target.files?.[0] || null)} className="w-full sm:flex-1 text-sm" />
                <div className="flex-1 lg:hidden">
                    <CatalogSelect
                        id="causa-devolucion-select-row4"
                        label="Causa Devolución"
                        catalogId={10}
                        value={causaDevolucion}
                        onChange={(e) => setCausaDevolucion(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleCaptura}
                    disabled={loading}
                    className="btn-success w-full sm:flex-1 md:flex-1 lg:w-auto lg:flex-none lg:min-w-[120px] sm:h-full md:h-full px-4 py-2.5 lg:py-2.5 text-base font-medium rounded-lg shadow-sm flex justify-center items-center sm:self-center md:self-center"
                >
                    {loading ? 'Cargando...' : 'Captura'}
                </button>
                
            </div>
            {estado && <p className="text-sm text-secondary" role="status">{estado}</p>}
        </div>
    );
};

export default CapturaContent;
