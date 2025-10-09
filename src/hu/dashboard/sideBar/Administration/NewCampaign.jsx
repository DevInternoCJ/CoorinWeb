import React, { useState } from "react";
import { newCampaign } from "../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";

const NewCampaign = ({ onCreated }) => {
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
      toast.error("Error al crear campaña", err);
      setErrorNueva("Error al crear campaña");
    } finally {
      setLoadingNueva(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginTop: 8,
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
        <input
          type="text"
          className="modal-input w-130"
          placeholder="Ingresa Nueva Campaña"
          value={nuevaCampania}
          onChange={(e) => setNuevaCampania(e.target.value)}
          disabled={loadingNueva}
          maxLength={40}
        />
        <button
          className="modal-btn modal-btn-primary"
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
