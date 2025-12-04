import React, { useState } from "react";
import { newCampaign } from "../../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";

const NewCampaign = ({ onCreated, buttonClassName }) => {
  const [nuevaCampania, setNuevaCampania] = useState("");
  const [loadingNueva, setLoadingNueva] = useState(false);
  const [errorNueva, setErrorNueva] = useState("");

  const handleNuevaCampania = async () => {
    setErrorNueva("");
    const nombre = nuevaCampania.trim();
    if (!nombre) {
      toast.warning("Ingresa el nombre de la campaña");
      return;
    }
    if (nombre.length < 6) {
      toast.warning("El nombre debe tener al menos 6 caracteres");
      return;
    }
    if (nombre.length > 40) {
      toast.warning("El nombre no puede exceder 40 caracteres");
      return;
    }
    setLoadingNueva(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const idEjecutivoInsert =
        userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
      const idProducto =
        userData?.idProducto ?? userData?.idproducto ?? userData?.producto ?? 1;
      const body = {
        campania: nombre,
        numeroCuentas: 0,
        encendido: false,
        idEjecutivoInsert,
        idProducto,
      };
      await newCampaign(body);
      toast.success("¡Campaña creada exitosamente!");
      setNuevaCampania("");
      if (onCreated) onCreated();
    } catch (err) {
      // Validación de error por campaña duplicada
      const errorMsg = err?.response?.data?.error || "";
      if (
        err?.response?.status === 500 &&
        errorMsg.includes("Violation of UNIQUE KEY constraint") &&
        errorMsg.includes("AK_Nombre")
      ) {
        toast.error("Ya existe una campaña con el mismo nombre creada por ti");
        setErrorNueva("");
      } else {
        toast.error("Error al crear campaña", err);
        setErrorNueva("Error al crear campaña");
      }
    } finally {
      setLoadingNueva(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginTop: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
  <div className="relative flex-1 min-w-[420px] max-h-[40px]">
          <input
            type="text"
            className="peer p-2 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-4 focus:pb-1 [&:not(:placeholder-shown)]:pt-4 [&:not(:placeholder-shown)]:pb-1 min-w-[420px] max-h-[40px]"
            value={nuevaCampania}
            onChange={(e) => setNuevaCampania(e.target.value)}
            id="nueva-campania-input"
            placeholder=" "
            disabled={loadingNueva}
            maxLength={40}
          />
          <label
            htmlFor="nueva-campania-input"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-gray-500"
          >
            Ingresa Nueva Campaña
          </label>
        </div>
        <button
          className={buttonClassName || "modal-btn modal-btn-primary"}
          onClick={handleNuevaCampania}
          disabled={loadingNueva}
        >
          {loadingNueva ? "Creando..." : "Nueva"}
        </button>
      </div>
      {errorNueva && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginTop: 4,
            fontSize: 13,
          }}
        >
          {errorNueva}
        </div>
      )}
    </div>
  );
};

export default NewCampaign;
