import api from "../../loki/apiConfig";
import {
  catalogBootstrapSchema,
  catalogoSchema,
  carteraSchema,
  productoSchema,
  valorCatalogoSchema,
} from "../../schemas/formSchemas";
import { clearAuth, getToken } from "../mark/albaz/LokiServices";
import { ACTIVE_SERVER } from "../../config/backend";

const unwrap = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;
  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  return [];
};

const firstDefined = (row, keys) => keys.reduce((value, key) => value ?? row?.[key], undefined);
const numeric = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};
const normalizeCartera = (row) => ({
  ...row,
  idCartera: numeric(firstDefined(row, ["idCartera", "IdCartera", "id_cartera", "carteraId", "id", "Id"])),
  cartera: firstDefined(row, ["cartera", "Cartera", "NombreCartera", "nombreCartera", "nombre_cartera", "descripcion", "Descripcion", "nombre"]),
});
const normalizeProducto = (row) => ({
  ...row,
  idCartera: numeric(firstDefined(row, ["idCartera", "IdCartera", "id_cartera", "carteraId"])),
  cartera: firstDefined(row, ["cartera", "Cartera", "NombreCartera", "nombreCartera", "nombre_cartera"]),
  idProducto: numeric(firstDefined(row, ["idProducto", "IdProducto", "id_producto", "productoId", "id", "Id"])),
  producto: firstDefined(row, ["producto", "Producto", "NombreProducto", "nombreProducto", "nombre_producto", "descripcion", "Descripcion", "nombre"]),
});

const request = async (config) => {
  if (!getToken()) throw new Error("No hay token de autenticación disponible.");
  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    if ([401, 403].includes(error.response?.status)) clearAuth();
    throw error;
  }
};

const parseList = (schema, payload, keys) => {
  const rows = unwrap(payload, keys);
  const parsed = rows.flatMap((row) => {
    const result = schema.safeParse(row);
    return result.success ? [result.data] : [];
  });
  return parsed;
};

export const CatalogService = {
  async getCarteras() {
    const data = await request({ method: "GET", url: "/campañas/carteras" });
    return parseList(carteraSchema, unwrap(data, ["Carteras", "carteras"]).map(normalizeCartera), []);
  },

  async getCarterasProductos() {
    const data = await request({ method: "GET", url: "/campañas/carteras-productos" });
    const rows = unwrap(data, ["Productos", "productos", "CarterasProductos", "carterasProductos"]);
    return rows.flatMap((row) => {
      const normalized = normalizeProducto(row);
      const parsed = productoSchema.safeParse(normalized);
      return parsed.success ? [parsed.data] : [];
    });
  },

  async getCatalogos() {
    const data = await request({ method: "GET", url: "/Catalogos/catalogos" });
    return parseList(catalogoSchema, data, ["Catalogos", "catalogos"]);
  },

  async getValoresCatalogo() {
    const data = await request({ method: "GET", url: "/Catalogos/valores-catalogo" });
    const rows = unwrap(data, ["Valores", "valores", "valoresCatalogo", "ValoresCatalogo"]);
    return parseList(valorCatalogoSchema, rows.map((row) => ({
      ...row,
      idValor: row?.idValor ?? row?.IdValor,
      idCatálogo: row?.idCatálogo ?? row?.idCatalogo ?? row?.IdCatálogo ?? row?.IdCatalogo,
      valor: row?.valor ?? row?.Valor,
      detalle: row?.detalle ?? row?.Detalle ?? null,
      nivel: row?.nivel ?? row?.Nivel,
      orden: row?.orden ?? row?.Orden,
    })), []);
  },

  async getConsultaBootstrap() {
    const data = await request({
      method: "GET",
      url: "/Catalogo/cargaCatalogos",
      params: { servidor: ACTIVE_SERVER },
    });
    const normalized = {
      carteras: unwrap(data, ["Carteras", "carteras"]).map(normalizeCartera).filter((row) => Number.isFinite(row.idCartera) && typeof row.cartera === "string" && row.cartera.trim()),
      productos: unwrap(data, ["Productos", "productos"]).map(normalizeProducto).filter((row) => Number.isFinite(row.idProducto) && typeof row.producto === "string" && row.producto.trim()),
      rechazos: unwrap(data, ["Rechazos", "rechazos"]),
      catalogosConsultas: unwrap(data, ["CatalogosConsultas", "catalogosConsultas"]),
      versiones: unwrap(data, ["Versiones", "versiones"]),
    };
    return catalogBootstrapSchema.parse(normalized);
  },

  async getColumnasProducto(idProducto) {
    const data = await request({
      method: "GET",
      url: "/Catalogo/ColumnasProducto",
      params: { servidor: ACTIVE_SERVER, idProducto },
    });
    return unwrap(data, ["Columnas", "columnas"]).map((item) => String(item?.nombre ?? item?.Nombre ?? item)).filter(Boolean);
  },
};

export default CatalogService;
