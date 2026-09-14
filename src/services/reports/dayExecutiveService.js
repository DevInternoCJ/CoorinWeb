import api from "../../loki/apiConfig";
import { diaEjecutivoSchema } from "../../schemas/formSchemas";

const unwrapRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  const candidates = [
    payload?.data,
    payload?.datos,
    payload?.resultado,
    payload?.resultados,
    payload?.items,
  ];
  const arrayResult = candidates.find(Array.isArray);
  if (arrayResult) return arrayResult;

  const nestedObject = candidates.find(
    (candidate) => candidate && typeof candidate === "object",
  );
  if (nestedObject) return unwrapRows(nestedObject);

  const normalizedKeys = Object.keys(payload).map((key) =>
    key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
  );
  const looksLikeEntry = ["horainicio", "horafin", "accion", "modo", "resultado", "cuenta"]
    .some((key) => normalizedKeys.includes(key));

  return looksLikeEntry ? [payload] : [];
};

export const getExecutiveDayReport = async (request, options = {}) => {
  const payload = diaEjecutivoSchema.parse(request);
  const response = await api.post(
    "/DiaDelEjecutivo/DiaDelEjecutivo",
    payload,
    { signal: options.signal },
  );

  return {
    rows: unwrapRows(response.data),
    message: response.data?.mensaje || response.data?.message || "",
  };
};
