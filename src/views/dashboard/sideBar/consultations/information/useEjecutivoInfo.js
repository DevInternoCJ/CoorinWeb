import { useState, useEffect } from "react";
import { infoEjecutivo } from "../../../../../services/mark/Orochi/LokiServices";

/**
 * Hook que encapsula la carga de datos del ejecutivo
 * (carteras disponibles y consultas filtradas).
 *
 * @param {object} params
 * @param {string|number|null} params.idEjecutivo
 * @param {string|number}      params.idProducto
 * @param {boolean}            params.enabled - Solo ejecuta el fetch cuando es true
 */
const useEjecutivoInfo = ({ idEjecutivo, idProducto, enabled = true }) => {
  const [cartera, setCartera] = useState(0);
  const [consulta, setConsulta] = useState("");
  const [carterasOptions, setCarterasOptions] = useState([]);
  const [consultasOptions, setConsultasOptions] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [errorConsultas, setErrorConsultas] = useState(null);

  useEffect(() => {
    if (!idEjecutivo || !enabled) return;

    setLoadingConsultas(true);
    setErrorConsultas(null);

    infoEjecutivo(idEjecutivo)
      .then((data) => {
        // Extraer carteras únicas del array de respuesta
        const carterasUnicas = Array.isArray(data)
          ? Array.from(
              new Map(
                data.map((item) => [
                  item.idCartera,
                  {
                    id: item.idCartera,
                    nombre: item.NombreCartera || `Cartera ${item.idCartera}`,
                  },
                ]),
              ).values(),
            )
          : [];

        setCarterasOptions(carterasUnicas);

        // Filtrar consultas por cartera e idProducto
        const filtered = Array.isArray(data.consultas)
          ? data.consultas.filter(
              (item) =>
                String(item.idCartera) === String(cartera) &&
                String(item.idProducto) === String(idProducto),
            )
          : [];

        setConsultasOptions(filtered);
      })
      .catch(() => {
        setErrorConsultas("Error al cargar las consultas");
        setConsultasOptions([]);
        setCarterasOptions([]);
      })
      .finally(() => setLoadingConsultas(false));
  }, [idEjecutivo, cartera, idProducto, enabled]);

  return {
    cartera,
    setCartera,
    consulta,
    setConsulta,
    carterasOptions,
    consultasOptions,
    loadingConsultas,
    errorConsultas,
  };
};

export default useEjecutivoInfo;
