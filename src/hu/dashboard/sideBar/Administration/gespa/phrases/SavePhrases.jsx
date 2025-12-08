import React, { useState, useEffect } from "react";
import {
  getPhrases,
  putPhrases,
} from "../../../../../../services/mark/orochi/LokeServices";
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
          : p
      )
    );

    try {
      toast.loading("Actualizando frase...");
      await putPhrases(phrase.idRegistro, newStatus);
      toast.success(
        `Frase ${newStatus ? "activada" : "desactivada"} correctamente`
      );
    } catch (error) {
      console.error("Error al actualizar la frase:", error);
      toast.error("No se pudo actualizar la frase");

      // Revertir el cambio si falla
      setPhrases((prev) =>
        prev.map((p) =>
          p.idRegistro === phrase.idRegistro
            ? { ...p, fraseActiva: !newStatus }
            : p
        )
      );
    } finally {
      toast.dismiss(); // cierra el loading
    }
  };

  const renderEmptyState = () => {
    if (!idEjecutivo) {
      return (
        <div className="p-4 py-10 text-center bg-gray-200">
          <p className="text-gray-800">Sesion expirada sesion</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500">Cargando frases...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <p className="text-red-700">Error: {error}</p>
        </div>
      );
    }

    if (phrases.length === 0) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500">No hay frases guardadas</p>
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
        <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-jerarquia3"></span>
        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center text-gray-500 peer-checked:text-white transition-colors duration-200">
          <IconActive />
        </span>
        <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center text-gray-500 peer-checked:text-jerarquia3 transition-colors duration-200 ">
          <IconOffActive />
        </span>
      </label>
    </div>
  );

  const renderTableRow = (phrase, index) => (
    <tr
      key={phrase.idRegistro || index}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800">
        {phrase.idEjecutivo}
      </td>

      <td className="px-6 py-2 text-sm text-gray-800">
        <kbd className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-gray-200 border border-transparent font-mono text-sm text-gray-800 rounded-md">
          {phrase.texto}
        </kbd>
      </td>
      <td className="px-6 py-2 whitespace-nowrap text-sm">
        {renderSwitch(phrase)}
      </td>
      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800">
        {phrase.fechaInsert}
      </td>
      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800">
        {phrase.segundoInsert}
      </td>
    </tr>
  );

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {renderTableHeader()}
        <tbody className="bg-white divide-y text-start items-center divide-gray-200">
          {phrases.map((phrase, index) => renderTableRow(phrase, index))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="m-5 bg-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold text-gray-800">Frases guardadas</h5>
      </div>
      <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
        {!loading && !error && phrases.length > 0
          ? renderTable()
          : renderEmptyState()}
      </div>
    </div>
  );
};

export default SavePhrases;
