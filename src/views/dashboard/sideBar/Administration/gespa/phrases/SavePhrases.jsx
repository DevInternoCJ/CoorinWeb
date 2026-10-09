import React, { useState, useEffect } from "react";
import {
  getPhrases,
  putPhrases,
} from "../../../../../../services/mark/Orochi/LokiServices";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { toast } from "sonner"; // si ya usas sonner en tu proyecto
import { IconActive, IconOffActive } from "./IconPhrases";

const SavePhrases = () => {
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;

  const fetchPhrases = async () => {
    if (!idEjecutivo) {
      console.warn("No hay idEjecutivo disponible");
      setError("No se pudo identificar al usuario");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getPhrases(idEjecutivo);
      console.log("Objeto response:", response);
      const phrasesArray = Array.isArray(response)
        ? response
        : response?.data || response?.frases || [];
      setPhrases(phrasesArray);
      return response;
    } catch (error) {
      console.error("Error fetching phrases:", error);
      setError(error.message || "Error al cargar las frases");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idEjecutivo) {
      fetchPhrases();
    }
  }, [idEjecutivo]);

  //Manejador del cambio de estado del switch
  const handleTogglePhrase = async (phrase) => {
    const newStatus = !phrase.fraseActiva;

    // Actualización optimista en UI
    setPhrases((prev) =>
      prev.map((p) =>
        p.idRegistro === phrase.idRegistro
          ? { ...p, fraseActiva: newStatus }
          : p,
      ),
    );

    try {
      toast.loading("Actualizando frase...");
      await putPhrases(phrase.idRegistro, newStatus);
      toast.success(
        `Frase ${newStatus ? "activada" : "desactivada"} correctamente`,
      );
    } catch (error) {
      console.error("Error al actualizar la frase:", error);
      toast.error("No se pudo actualizar la frase");

      // Revertir el cambio si falla
      setPhrases((prev) =>
        prev.map((p) =>
          p.idRegistro === phrase.idRegistro
            ? { ...p, fraseActiva: !newStatus }
            : p,
        ),
      );
    } finally {
      toast.dismiss(); // cierra el loading
    }
  };

  const renderEmptyState = () => {
    if (!idEjecutivo) {
      return (
        <div className="p-4 py-10 text-center bg-surface-secondary">
          <p className="text-foreground">Sesion expirada sesion</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Cargando frases...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-destructive/10 border-l-4 border-destructive/30">
          <p className="text-destructive">Error: {error}</p>
        </div>
      );
    }

    if (phrases.length === 0) {
      return (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No hay frases guardadas</p>
        </div>
      );
    }

    return null;
  };

  const tableHeaders = [
    { key: "idEjecutivo", label: "idEjecutivo" },
    { key: "texto", label: "Texto" },
    { key: "fraseActiva", label: "Frase Activa" },
    { key: "fechaInsert", label: "FechaInsert" },
    { key: "segundoInsert", label: "SegundoInsert" },
  ];

  const renderTableHeader = () => (
    <thead className="bg-jerarquia4">
      <tr>
        {tableHeaders.map(({ key, label }) => (
          <th
            key={key}
            className="px-6 py-3 text-left text-xs font-medium text-neutral-200 tracking-wider"
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
  // Aquí sustituimos el getStatusBadge por el switch
  const renderSwitch = (phrase) => (
    <div className="flex items-center justify-center">
      <label
        htmlFor={`switch-${phrase.idRegistro}`}
        className="relative inline-block w-11 h-6 cursor-pointer"
      >
        <input
          type="checkbox"
          id={`switch-${phrase.idRegistro}`}
          className="peer sr-only"
          checked={phrase.fraseActiva}
          onChange={() => handleTogglePhrase(phrase)}
        />
        <span className="absolute inset-0 bg-surface-secondary rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-jerarquia3"></span>
        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-surface rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center text-muted-foreground peer-checked:text-white transition-colors duration-200">
          <IconActive />
        </span>
        <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center text-muted-foreground peer-checked:text-jerarquia3 transition-colors duration-200 ">
          <IconOffActive />
        </span>
      </label>
    </div>
  );

  const renderTableRow = (phrase, index) => (
    <tr
      key={phrase.idRegistro || index}
      className="hover:bg-surface-secondary transition-colors"
    >
      <td className="px-6 py-2 whitespace-nowrap text-sm text-foreground">
        {phrase.idEjecutivo}
      </td>

      <td className="px-6 py-2 text-sm text-foreground">
        <kbd className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-surface-secondary border border-transparent font-mono text-sm text-foreground rounded-md">
          {phrase.texto}
        </kbd>
      </td>
      <td className="px-6 py-2 whitespace-nowrap text-sm">
        {renderSwitch(phrase)}
      </td>
      <td className="px-6 py-2 whitespace-nowrap text-sm text-foreground">
        {phrase.fechaInsert}
      </td>
      <td className="px-6 py-2 whitespace-nowrap text-sm text-foreground">
        {phrase.segundoInsert}
      </td>
    </tr>
  );

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        {renderTableHeader()}
        <tbody className="bg-surface divide-y text-start items-center divide-border">
          {phrases.map((phrase, index) => renderTableRow(phrase, index))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="m-5 bg-surface-secondary">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold text-foreground">Frases guardadas</h5>
      </div>
      <div className="relative bg-surface border border-border rounded-lg overflow-hidden">
        {!loading && !error && phrases.length > 0
          ? renderTable()
          : renderEmptyState()}
      </div>
    </div>
  );
};

export default SavePhrases;
