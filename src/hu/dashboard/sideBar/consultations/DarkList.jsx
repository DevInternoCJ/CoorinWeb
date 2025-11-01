
import React, { useState } from "react";
import ConsorcioLogo from "../../../../assets/logo_coorin_7.svg";
import { darkListV2 } from "../../../../services/mark/albaz/LokiServices";

const DarkListContent = () => {

    const [tipo, setTipo] = useState("cuenta");
    const [valor, setValor] = useState("");
    const [resultado, setResultado] = useState(null); // {enListaNegra: bool, msg: string}
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener idCartera desde localStorage
    const getIdCartera = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData?.idCartera || 0; // fallback a 1 si no existe
    };

    // Reiniciar mensajes y valor al cambiar de tipo
    const handleTipoChange = (nuevoTipo) => {
        setTipo(nuevoTipo);
        setValor("");
        setError(null);
        setResultado(null);
        
    };

    const handleBuscar = async (e) => {
        e.preventDefault();
        setResultado(null);
        setError(null);
        if (!tipo || !valor) {
            setError("Seleccione un tipo y escriba un dato para buscar.");
            return;
        }
        // Si es correo y no tiene formato @dominio.ext, mostrar error y no buscar
        if (tipo === "correo" && !/^.+@.+\.[a-zA-Z]{2,}$/.test(valor)) {
            setError("El correo debe tener el formato usuario@dominio.com para poder buscar.");
            return;
        }
        // Validación de teléfono: mínimo 10, máximo 15 dígitos
        if (tipo === "telefono") {
            const soloNumeros = valor.replace(/\D/g, "");
            if (soloNumeros.length < 10 || soloNumeros.length > 15) {
                setError("El teléfono debe tener entre 10 y 15 dígitos.");
                return;
            }
        }
        // Validación de cuenta: máximo 16 dígitos, solo números
        if (tipo === "cuenta") {
            const soloNumeros = valor.replace(/\D/g, "");
            if (soloNumeros.length === 0 || soloNumeros.length > 16) {
                setError("La cuenta debe tener máximo 16 dígitos.");
                return;
            }
        }
        // Validación de correo: formato válido (cualquier dominio), sin símbolos al inicio/fin, sin puntos dobles, sin comillas, sin dominio tipo IP, y debe terminar con .dominio
        if (tipo === "correo") {
            const partes = valor.split('@');
            // 1. Si el usuario ya ingresó al menos un @, validar que solo haya uno
            if (valor.includes('@') && partes.length !== 2) {
                setError("El correo debe contener un solo @.");
                return;
            }
            // Si no hay ningún @, no mostrar error y dejar que la ayuda sea visible
            if (!valor.includes('@')) {
                // No ejecutar más validaciones hasta que haya un @
                // Así solo se muestra la ayuda
                setError(null);
                return;
            }
            const local = partes[0];
            const domain = partes[1];
            // 2. No debe iniciar ni terminar con punto ni símbolos especiales
            if (/^[_\-.,:;.]/.test(local) || /[_\-.,:;.]$/.test(local)) {
                setError("El correo no debe iniciar ni terminar con símbolos antes del @.");
                return;
            }
            // 3. No debe contener comillas
            if (valor.includes('"') || valor.includes("'")) {
                setError("El correo no debe contener comillas.");
                return;
            }
            // 4. No debe tener puntos dobles en la parte local
            if (/\.\./.test(local)) {
                setError("El correo no debe tener dos puntos seguidos antes del @.");
                return;
            }
            // 5. No debe ser dominio tipo IP ni entre corchetes
            if (/^\[.*\]$/.test(domain) || /^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
                setError("El dominio no puede ser una IP ni estar entre corchetes.");
                return;
            }
            // 6. Debe terminar con .dominio (mínimo 2 letras)
            if (!/\.[a-zA-Z]{2,}$/.test(domain)) {
                setError("El dominio debe terminar con un punto y al menos dos letras. Ejemplo: usuario@dominio.com");
                return;
            }
            // 7. Validación general de caracteres válidos (solo letras, números, punto, guion y guion bajo en la parte local)
            if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)) {
                setError("El correo solo puede contener letras, números, puntos, guiones y guiones bajos antes del @. Ejemplo: usuario@dominio.com");
                return;
            }
        }
        setLoading(true);
        try {
            const res = await darkListV2({ idCartera: getIdCartera(), selector: tipo, dato: valor });
            if (typeof res?.enListaNegra === "boolean") {
                setResultado({
                    enListaNegra: res.enListaNegra,
                    msg: res.enListaNegra
                        ? `El ${tipo} "${valor}" SÍ se encuentra en lista negra.`
                        : `El ${tipo} "${valor}" no se encuentra en lista negra.`
                });
            } else {
                setError("Respuesta inesperada del servidor.");
            }
        } catch {
            setError("Error al consultar la lista negra.");
        } finally {
            setLoading(false);
        }
    };

    // Mensaje de ayuda dinámico según el tipo
    let ayuda = '';
    if (tipo === 'telefono') {
        ayuda = 'Ingrese solo números, mínimo 10 y máximo 15 dígitos.';
    } else if (tipo === 'cuenta') {
        ayuda = 'Ingrese solo números, máximo 16 dígitos.';
    } else if (tipo === 'correo') {
        ayuda = 'Ingrese un correo válido, sin símbolos al inicio o final antes del @ y debe terminar con un dominio. Ejemplo: usuario@dominio.com';
    }

    return (
    <div className="w-full max-w-lg mx-auto p-6 box-border flex flex-col min-h-[360px]">
            <div className="flex flex-col w-full">
                <div className="mb-3">
                    <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                </div>
                {/* Radio buttons abajo del logo */}
                <div className="flex justify-center gap-6 mb-4 w-full">
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="radio"
                            name="tipo"
                            value="telefono"
                            checked={tipo === "telefono"}
                            onChange={() => handleTipoChange("telefono")}
                            className="h-4 w-4 text-jerarquia2 focus:ring-jerarquia2"
                        />
                        <span className="text-sm text-gray-700">Teléfono</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="radio"
                            name="tipo"
                            value="cuenta"
                            checked={tipo === "cuenta"}
                            onChange={() => handleTipoChange("cuenta")}
                            className="h-4 w-4 text-jerarquia2 focus:ring-jerarquia2"
                        />
                        <span className="text-sm text-gray-700">Cuenta</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="radio"
                            name="tipo"
                            value="correo"
                            checked={tipo === "correo"}
                            onChange={() => handleTipoChange("correo")}
                            className="h-4 w-4 text-jerarquia2 focus:ring-jerarquia2"
                        />
                        <span className="text-sm text-gray-700">Correo</span>
                    </label>
                </div>

                <form onSubmit={handleBuscar} className="flex flex-col w-full gap-3 mb-6 items-center justify-center">
                    <div className="w-full flex justify-center">
                            <input
                                className="block w-[500px] bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2"
                            type="text"
                            value={valor}
                            onChange={e => {
                                if (tipo === "telefono") {
                                    const soloNumeros = e.target.value.replace(/\D/g, "").slice(0, 15);
                                    setValor(soloNumeros);
                                } else if (tipo === "cuenta") {
                                    const soloNumeros = e.target.value.replace(/\D/g, "").slice(0, 16);
                                    setValor(soloNumeros);
                                } else if (tipo === "correo") {
                                    setValor(e.target.value.toLowerCase());
                                } else {
                                    setValor(e.target.value);
                                }
                            }}
                            onPaste={e => {
                                if (tipo === "telefono") {
                                    e.preventDefault();
                                    const pasted = e.clipboardData.getData('text');
                                    const soloNumeros = pasted.replace(/\D/g, "").slice(0, 15);
                                    setValor(soloNumeros);
                                }
                            }}
                            placeholder={tipo === "telefono" ? "Teléfono" : tipo === "cuenta" ? "Cuenta" : "Correo"}
                            disabled={loading}
                            maxLength={tipo === "telefono" ? 15 : tipo === "cuenta" ? 16 : undefined}
                        />
                    </div>

                    <div className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="btn-success min-w-[95px] px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:brightness-95 inline-flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>
                </form>

                    <div className="w-full h-0.5 bg-gray-200 rounded mb-4" />
                </div>

                {/* Mensaje de validación o resultado (mostrados arriba); la ayuda se muestra en el footer para no rellenar espacio) */}
                {(resultado || error) && (
                    <div className="w-full mt-2 mb-2 flex flex-col items-center">
                        {resultado ? (
                            <div className={`text-sm font-semibold ${resultado.enListaNegra ? 'text-red-600' : 'text-emerald-600'}`}>
                                {resultado.msg}
                            </div>
                        ) : (
                            <div className="text-sm text-red-600">{error}</div>
                        )}
                    </div>
                )}

                {/* Footer-like: ayuda bajada al final */}
                {ayuda && (
                    <div className="mt-auto pt-8">
                        <div className="text-sm text-gray-600">{ayuda}</div>
                    </div>
                )}
        </div>
    );
}

export default DarkListContent;