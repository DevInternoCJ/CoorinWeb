
import React, { useState } from "react";
import { darkListV2 } from "../../../../services/LokiServices";

const DarkList = () => {

    const [tipo, setTipo] = useState("cuenta");
    const [valor, setValor] = useState("");
    const [resultado, setResultado] = useState(null); // {enListaNegra: bool, msg: string}
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            const res = await darkListV2({ idCartera: 1, selector: tipo, dato: valor });
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
        <div>
            <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', overflow: 'hidden', minHeight: 400, justifyContent: 'center' }}>
            <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Radio buttons arriba del input */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 16, width: '100%' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <input type="radio" name="tipo" value="telefono" checked={tipo === "telefono"} onChange={() => handleTipoChange("telefono")} />
                        Teléfono
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <input type="radio" name="tipo" value="cuenta" checked={tipo === "cuenta"} onChange={() => handleTipoChange("cuenta")} />
                        Cuenta
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <input type="radio" name="tipo" value="correo" checked={tipo === "correo"} onChange={() => handleTipoChange("correo")} />
                        Correo
                    </label>
                </div>
                <form onSubmit={handleBuscar} style={{ display: 'flex', width: '100%', gap: 12, marginBottom: 24, justifyContent: 'center', alignItems: 'center' }}>
                    <input
                        className="modal-dropdown-select"
                        style={{ flex: 1, minWidth: 200, maxWidth: 350, height: 36, borderRadius: 6, border: '1px solid #bdbdbd', padding: '0 10px', fontSize: 15 }}
                        type="text"
                        value={valor}
                        onChange={e => {
                            if (tipo === "telefono") {
                                // Solo permitir números, máximo 15
                                const soloNumeros = e.target.value.replace(/\D/g, "").slice(0, 15);
                                setValor(soloNumeros);
                            } else if (tipo === "cuenta") {
                                // Solo permitir números, máximo 16
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
                    <button type="submit" className="modal-btn" style={{ background: '#526581', color: '#fff', minWidth: 120, height: 36, borderRadius: 6, fontSize: 15 }} disabled={loading}>
                        {loading ? "Buscando..." : "Buscar"}
                    </button>
                </form>
                {/* Piso firme (línea divisoria) */}
                <div style={{ width: '100%', height: 2, background: '#bdbdbd', borderRadius: 2, margin: '0 0 18px 0' }} />
            </div>
            {/* Mensaje de validación, ayuda o resultado, al final arriba del footer, solo si hay mensaje */}
            {(resultado || error || ayuda) && (
                <div style={{ width: '100%', minHeight: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 0 8px 0' }}>
                    {resultado ? (
                        <div
                            style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: resultado.enListaNegra === true ? '#d32f2f' : '#388e3c',
                                fontWeight: 'bold'
                            }}
                        >
                            {resultado.msg}
                        </div>
                    ) : error ? (
                        <div style={{ color: 'red', fontSize: 15, textAlign: 'center', marginBottom: 2 }}>{error}</div>
                    ) : (
                        ayuda && <div className="modal-span-2" style={{ fontSize: 14, textAlign: 'center', color: '#526581' }}>{ayuda}</div>
                    )}
                </div>
            )}
            </div>
            {/* Footer vacío para mantener el espacio visual, si se requiere */}
        </div>
    );
}

export default DarkList;