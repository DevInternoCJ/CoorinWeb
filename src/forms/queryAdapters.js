const API_SIGN = {
  "≤": "<=",
  "≥": ">=",
  "≠": "<>",
};

export const normalizeQuerySign = (sign = "=") => API_SIGN[sign] ?? sign;

export const getQueryDataType = (type) => ({
  catalogo: "list",
  texto: "char",
  numero: "int",
  fecha: "date",
  bit: "char",
  list: "list",
  char: "char",
  int: "int",
  date: "date",
}[type] ?? "char");

export const getQueryRawValue = (row) => {
  if (["catalogo", "bit", "list"].includes(row.tipoValor)) {
    return String(row.idValor ?? row.valorTexto ?? "").trim();
  }
  return String(row.valorTexto ?? "").trim();
};

export const toParametroDto = (row) => {
  const expression = String(row.apiValores ?? "").trim()
    || `${normalizeQuerySign(row.signo ?? row.operador)}${getQueryRawValue(row)}`;

  return {
    concepto: String(row.concepto ?? "").trim(),
    campo: String(row.campo ?? "").trim(),
    valores: expression,
    parámetros: expression,
    dato: getQueryDataType(row.tipoValor),
  };
};

export const toAgruparDto = (row) => ({
  campo: String(row.campo ?? row.nombre ?? "").trim(),
  concepto: String(row.concepto ?? "").trim(),
});

export const buildSearchCriteria = ({
  servidor,
  idCartera,
  idProducto,
  idConsulta = null,
  desdeFecha,
  esDetalleResultado,
  parametros = [],
  agrupar = [],
  jerarquiaEjecutivo = 0,
}) => ({
  servidor: servidor == null ? null : String(servidor).trim(),
  idCartera: Number(idCartera),
  idProducto: idProducto == null || idProducto === "" ? null : Number(idProducto),
  desdeFecha: desdeFecha ? new Date(`${desdeFecha}T00:00:00Z`).toISOString() : null,
  esDetalleResultado: Boolean(esDetalleResultado),
  idConsulta: idConsulta ? Number(idConsulta) : null,
  parametros: parametros.map(toParametroDto),
  agrupar: agrupar.map(toAgruparDto),
  jerarquiaEjecutivo: Number(jerarquiaEjecutivo) || 0,
});
