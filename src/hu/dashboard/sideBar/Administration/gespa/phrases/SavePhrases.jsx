import React, { useState, useEffect } from "react";
import { getPhrases } from "../../../../../../services/mark/albaz/LokiServices";
//mport { toast } from "sonner";
import { useUserStore } from "../../../../../../contextGlobal/userStore";

const SavePhrases = () => {
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;

  const fetchPhrases = async () => {
    setLoading(true);
    setError(null);   
    try {
      // Ajusta este objeto según lo que requiera tu API
      const requestData = { idEjecutivo};     
      const response = await getPhrases(requestData);
      console.log("objeto response:", response);
      setPhrases(response || []);
      return response;
    } catch (error) {
      console.error("Error fetching phrases:", error);
      setError(error.message || "Error al cargar las frases");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Cargar frases al montar el componente
  useEffect(() => {
    fetchPhrases();
  }, []);

  return (
    <div className="m-5 bg-gray-100">
      <h5 className="font-semibold text-gray-800">Frases guardadas</h5>
      <div className="relative bg-white shadow-2xs rounded-xl">
        <div className="min-h-56 border border-gray-300 rounded-lg mb-3">
          <div className="p-4 md:p-5">
            {loading && <p className="text-gray-500">Cargando frases...</p>}
            
            {error && (
              <p className="text-red-500">Error: {error}</p>
            )}
            
            {!loading && !error && phrases.length === 0 && (
              <p className="text-gray-500">No hay frases guardadas</p>
            )}
            
            {!loading && !error && phrases.length > 0 && (
              <ul className="space-y-2">
                {phrases.map((phrase, index) => (
                  <li key={index} className="p-2 bg-gray-50 rounded">
                    {phrase.text || JSON.stringify(phrase)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SavePhrases;