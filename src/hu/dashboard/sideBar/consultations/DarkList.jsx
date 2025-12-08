import React, { useState, useEffect } from "react";
import { darkListV2 } from "../../../../services/mark/orochi/LokeServices";
import { toast } from "sonner";

const DarkListContent = () => {
  const [tipo, setTipo] = useState("cuenta");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState(null); // {enListaNegra: bool, msg: string}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener idCartera desde localStorage
  const getIdCartera = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.idCartera || 0; // fallback a 1 si no existe
  };

  useEffect(() => {
    // Mostrar toast de ayuda inicial para "cuenta"
    toast.info("Ingrese solo números, máximo 16 dígitos.");
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();
    setResultado(null);
    setError(null);
    if (!tipo || !valor) {
      toast.error("Seleccione un tipo y escriba un dato para buscar.");
      return;
    }
    if (tipo === "correo" && !/^.+@.+\.[a-zA-Z]{2,}$/.test(valor)) {
      toast.error(
        "El correo debe tener el formato usuario@dominio.com para poder buscar."
      );
      return;
    }
    if (tipo === "telefono") {
      const soloNumeros = valor.replace(/\D/g, "");
      if (soloNumeros.length < 10 || soloNumeros.length > 15) {
        toast.error("El teléfono debe tener entre 10 y 15 dígitos.");
        return;
      }
    }
    if (tipo === "cuenta") {
      const soloNumeros = valor.replace(/\D/g, "");
      if (soloNumeros.length === 0 || soloNumeros.length > 16) {
        toast.error("La cuenta debe tener máximo 16 dígitos.");
        return;
      }
    }
    if (tipo === "correo") {
      const partes = valor.split("@");
      if (valor.includes("@") && partes.length !== 2) {
        toast.error("El correo debe contener un solo @.");
        return;
      }
      if (!valor.includes("@")) {
        return;
      }
      const local = partes[0];
      const domain = partes[1];
      if (/^[_\-.,:;.]/.test(local) || /[_\-.,:;.]$/.test(local)) {
        toast.error(
          "El correo no debe iniciar ni terminar con símbolos antes del @."
        );
        return;
      }
      if (valor.includes('"') || valor.includes("'")) {
        toast.error("El correo no debe contener comillas.");
        return;
      }
      if (/\.\./.test(local)) {
        toast.error("El correo no debe tener dos puntos seguidos antes del @.");
        return;
      }
      if (/^\[.*\]$/.test(domain) || /^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
        toast.error("El dominio no puede ser una IP ni estar entre corchetes.");
        return;
      }
      if (!/\.[a-zA-Z]{2,}$/.test(domain)) {
        toast.error(
          "El dominio debe terminar con un punto y al menos dos letras. Ejemplo: usuario@dominio.com"
        );
        return;
      }
      if (
        !/^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          valor
        )
      ) {
        toast.error(
          "El correo solo puede contener letras, números, puntos, guiones y guiones bajos antes del @. Ejemplo: usuario@dominio.com"
        );
        return;
      }
    }
    setLoading(true);
    try {
      const res = await darkListV2({
        idCartera: getIdCartera(),
        selector: tipo,
        dato: valor,
      });
      if (typeof res?.enListaNegra === "boolean") {
        setResultado({
          enListaNegra: res.enListaNegra,
          msg: res.enListaNegra
            ? `El ${tipo} "${valor}" SÍ se encuentra en lista negra.`
            : `El ${tipo} "${valor}" no se encuentra en lista negra.`,
        });
      } else {
        toast.error("Respuesta inesperada del servidor.");
      }
    } catch {
      toast.error("Error al consultar la lista negra.");
    } finally {
      setLoading(false);
    }
  };

  const handleTipoChange = (nuevoTipo) => {
    setTipo(nuevoTipo);
    setValor("");
    setError(null);
    setResultado(null);

    let ayuda = "";
    if (nuevoTipo === "telefono") {
      ayuda = "Ingrese solo números, mínimo 10 y máximo 15 dígitos.";
    } else if (nuevoTipo === "cuenta") {
      ayuda = "Ingrese solo números, máximo 16 dígitos.";
    } else if (nuevoTipo === "correo") {
      ayuda =
        "Ingrese un correo válido, sin símbolos al inicio o final antes del @ y debe terminar con un dominio. Ejemplo: usuario@dominio.com";
    }
    if (ayuda) toast.info(ayuda);
  };

  return (
    <div className="w-full box-border flex flex-col items-center">
      <form onSubmit={handleBuscar} className="w-full mb-6">
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          {/* Columna vacía al inicio */}
          <div className="flex-1 min-w-0"></div>
          {/* Radio buttons juntos */}
          <div className="flex flex-row gap-1 flex-1 min-w-0 justify-end">
            <label className="inline-flex items-center gap-1">
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
            <label className="inline-flex items-center gap-1">
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
            <label className="inline-flex items-center gap-1">
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
          {/* Input */}
          <div className="flex-[2] min-w-0">
            <input
              className="block w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2"
              type="text"
              value={valor}
              onChange={(e) => {
                if (tipo === "telefono") {
                  const soloNumeros = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 15);
                  setValor(soloNumeros);
                } else if (tipo === "cuenta") {
                  const soloNumeros = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 16);
                  setValor(soloNumeros);
                } else if (tipo === "correo") {
                  setValor(e.target.value.toLowerCase());
                } else {
                  setValor(e.target.value);
                }
              }}
              onPaste={(e) => {
                if (tipo === "telefono") {
                  e.preventDefault();
                  const pasted = e.clipboardData.getData("text");
                  const soloNumeros = pasted.replace(/\D/g, "").slice(0, 15);
                  setValor(soloNumeros);
                }
              }}
              placeholder={
                tipo === "telefono"
                  ? "Teléfono"
                  : tipo === "cuenta"
                  ? "Cuenta"
                  : "Correo"
              }
              disabled={loading}
              maxLength={
                tipo === "telefono" ? 15 : tipo === "cuenta" ? 16 : undefined
              }
            />
          </div>
          {/* Botón */}
          <div className="flex-1 min-w-0 flex justify-center">
            <button
              type="submit"
              className="btn-success w-full px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:brightness-95 flex justify-center"
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
          {/* Columna vacía al final */}
          <div className="flex-1 min-w-0"></div>
        </div>
      </form>
      <div className="w-full h-0.5 bg-gray-200 rounded mb-4" />

      {(resultado || error) && (
        <div className="w-full mt-2 mb-2 flex flex-col items-center">
          {resultado ? (
            <div
              className={`text-sm font-semibold ${
                resultado.enListaNegra ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {resultado.msg}
            </div>
          ) : (
            <div className="text-sm text-red-600">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DarkListContent;
