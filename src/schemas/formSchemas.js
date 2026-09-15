import { z } from "zod";

const REQUIRED_FILE_MESSAGE = "Seleccione un archivo.";
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const positiveId = (label = "El identificador") =>
  z.coerce
    .number({ error: `${label} no es válido.` })
    .int(`${label} no es válido.`)
    .positive(`${label} es obligatorio.`);

export const requiredText = (label, max = 500) =>
  z
    .string({ error: `${label} es obligatorio.` })
    .trim()
    .min(1, `${label} es obligatorio.`)
    .max(max, `${label} no puede exceder ${max} caracteres.`);

export const optionalText = (max = 500) =>
  z.string().trim().max(max, `No puede exceder ${max} caracteres.`).optional().or(z.literal(""));

export const dateOnly = (label = "La fecha") =>
  z
    .string({ error: `${label} es obligatoria.` })
    .trim()
    .min(1, `${label} es obligatoria.`)
    .regex(/^\d{4}-\d{2}-\d{2}$/, `${label} no es válida.`)
    .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00`)), `${label} no es válida.`);

export const dateRangeSchema = z
  .object({
    fechaInicio: dateOnly("La fecha inicial"),
    fechaFin: dateOnly("La fecha final"),
  })
  .refine(({ fechaInicio, fechaFin }) => fechaFin >= fechaInicio, {
    path: ["fechaFin"],
    message: "La fecha final debe ser igual o posterior a la inicial.",
  });

export const diaEjecutivoSchema = z.object({
  idEjecutivo: z.coerce
    .string({ error: "El ejecutivo es obligatorio." })
    .trim()
    .regex(/^\d+$/, "El ejecutivo no es válido.")
    .refine((value) => Number(value) > 0, "El ejecutivo es obligatorio."),
  fecha: dateOnly("La fecha").refine(
    (value) => value >= "2016-06-23",
    "La fecha debe ser igual o posterior al 23/06/2016.",
  ),
  servidor: requiredText("El servidor", 50),
});

export const loginSchema = z.object({
  username: requiredText("El usuario", 4).regex(/^[A-Z]{1,4}$/, "El usuario solo admite letras (máximo 4)."),
  password: requiredText("La contraseña", 128),
});

export const consultaVisitasSchema = dateRangeSchema.extend({
  idCartera: positiveId("La cartera"),
  idConsulta: positiveId("La consulta"),
  complemento: z.boolean().default(false),
});

export const gestionSearchSchema = z.object({
  idCartera: positiveId("La cartera"),
  idCuenta: requiredText("La cuenta", 50),
});

export const gestionEditSchema = gestionSearchSchema.extend({
  fecha: dateOnly("La fecha"),
  hora: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,7})?)?$/, "La hora no es válida."),
  comentario: requiredText("El comentario", 8000),
});

export const consultaGestionesSchema = dateRangeSchema.extend({
  idCartera: positiveId("La cartera"),
  idProducto: z.coerce.number().int().nonnegative().optional(),
  jerarquia: z.coerce.number().int().nonnegative(),
});

export const uploadFileSchema = (extensions = ["xlsx", "xls", "csv"]) =>
  z
    .custom(
      (value) => typeof File !== "undefined" && value instanceof File,
      REQUIRED_FILE_MESSAGE,
    )
    .refine((file) => !file || file.size <= MAX_UPLOAD_BYTES, "El archivo no puede exceder 10 MB.")
    .refine((file) => {
      if (!file?.name) return true;
      const extension = file.name.split(".").pop()?.toLowerCase();
      return extensions.includes(extension);
    }, `Formato no permitido. Use ${extensions.map((item) => `.${item}`).join(", ")}.`);

export const gestionUploadSchema = z.object({
  idCartera: positiveId("La cartera"),
  archivo: uploadFileSchema(["xlsx", "xls", "csv"]),
});

export const visitFileSchema = z.object({
  idCartera: positiveId("La cartera"),
  archivo: uploadFileSchema(["xlsx", "xls", "csv"]),
  complemento: z.boolean().default(false),
});

export const corregirVisitaSchema = z.object({
  idCartera: positiveId("La cartera"),
  cuenta: requiredText("La cuenta", 50),
  dato: requiredText("El dato a corregir", 80),
  sucursal: optionalText(100),
  usuario: requiredText("El usuario", 50),
  fecha: dateOnly("La fecha"),
  comentario: requiredText("El comentario", 500),
});

export const gridActionSchema = z.object({
  rowId: z.union([z.string().min(1), z.number()]),
  action: z.enum(["delete", "close", "select", "edit", "export"]),
});

export const batchSelectionSchema = z.object({
  selectedIds: z.array(z.union([z.string(), z.number()])).min(1, "Seleccione al menos un registro."),
  etapa: positiveId("La etapa").optional(),
  comentario: optionalText(500),
});

export const getZodFieldErrors = (error) => {
  if (!error) return {};
  return error.issues.reduce((errors, issue) => {
    const field = issue.path.join(".") || "form";
    if (!errors[field]) errors[field] = issue.message;
    return errors;
  }, {});
};

export const catalogoSchema = z.object({
  idCatalogo: positiveId("El catálogo"),
  catálogo: z.string().trim().min(1),
  descripción: z.string().nullable().optional(),
}).passthrough();

export const valorCatalogoSchema = z.object({
  idValor: positiveId("El valor"),
  idCatálogo: positiveId("El catálogo"),
  valor: z.string().trim().min(1),
  detalle: z.string().nullable().optional(),
}).passthrough();

export const carteraSchema = z.object({
  idCartera: positiveId("La cartera"),
  cartera: z.string().trim().min(1),
}).passthrough();

export const productoSchema = z.object({
  idProducto: positiveId("El producto").nullable().optional(),
  producto: z.string().trim().min(1),
  idCartera: positiveId("La cartera").optional(),
}).passthrough();

export const selectOptionSchema = z.object({
  value: z.union([z.string(), z.number()]),
  label: z.string().trim().min(1),
  disabled: z.boolean().optional(),
});

export const catalogFilterSchema = z.object({
  idCatalogo: positiveId("El catálogo"),
  nivel: positiveId("El nivel").optional(),
  includeValues: z.array(positiveId("El valor")).default([]),
  excludeValues: z.array(positiveId("El valor")).default([]),
});

export const apiErrorSchema = z.object({
  error: z.string().optional(),
  mensaje: z.string().optional(),
  message: z.string().optional(),
  details: z.unknown().optional(),
  validation: z.unknown().optional(),
}).passthrough();

export const visitasBuscarQuerySchema = z.object({
  idCartera: positiveId("La cartera"),
  cuentaOrExpediente: requiredText("La cuenta o expediente", 80),
  esExpediente: z.coerce.boolean().default(false),
});

export const endpointRequestSchema = z.object({
  endpoint: requiredText("El endpoint", 250),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  query: z.record(z.string(), z.unknown()).optional(),
  body: z.unknown().optional(),
});

export const parametroBusquedaApiSchema = z.object({
  concepto: requiredText("El concepto", 100),
  campo: requiredText("El campo", 250),
  valores: requiredText("El valor del parámetro", 2000),
  parámetros: requiredText("El parámetro", 2000).nullable().optional(),
  dato: z.enum(["list", "char", "int", "date"]),
});

export const realizarBusquedaRequestSchema = z.object({
  servidor: requiredText("El servidor", 50).nullable(),
  idCartera: positiveId("La cartera"),
  idProducto: positiveId("El producto"),
  desdeFecha: z.iso.datetime().nullable(),
  esDetalleResultado: z.boolean(),
  idConsulta: positiveId("La consulta").nullable(),
  parametros: z.array(parametroBusquedaApiSchema).min(1, "Agregue al menos un filtro."),
  agrupar: z.array(z.object({
    campo: requiredText("El campo", 250),
    concepto: requiredText("El concepto", 100),
  })).default([]),
  jerarquiaEjecutivo: z.coerce.number().int().min(0),
});

export const confirmedCatalogFilters = {
  situacionesDefinicion: { idCatalogo: 2, nivel: 3104, excludeValues: [1014] },
  situacionesComentarios: { idCatalogo: 2, nivel: 3101, excludeValues: [1031, 1032] },
  situacionAgregada: { idCatalogo: 2, nivel: 3101, includeValues: [1012] },
  contactoGenerales: { idCatalogo: 5, nivel: 1601 },
  etapaRedSocial: { idCatalogo: 13, nivel: 2207 },
  habitacionVisita: { idCatalogo: 26, excludeValues: [2807] },
};

// IDs confirmados en el legacy para formularios de consulta/cuentas.
// Bloqueo no se incluye porque proviene de TablaBit(), no de ValoresDelCatálogo().
export const CONFIRMED_CATALOG_IDS = Object.freeze({
  SUCURSALES: 1,
  SITUACIONES: 2,
  NIVELES: 4,
  CAUSAS_NO_PAGO: 10,
});

export const catalogBootstrapSchema = z.object({
  carteras: z.array(carteraSchema).default([]),
  productos: z.array(productoSchema).default([]),
  rechazos: z.array(z.unknown()).default([]),
  catalogosConsultas: z.array(z.unknown()).default([]),
  versiones: z.array(z.unknown()).default([]),
});

export const toOptions = (rows = [], valueKey, labelKey) =>
  rows
    .map((row) => ({
      value: row?.[valueKey],
      label: String(row?.[labelKey] ?? "").trim(),
    }))
    .filter((option) => option.value !== null && option.value !== undefined && option.label)
    .filter((option, index, options) => options.findIndex((item) => String(item.value) === String(option.value)) === index);

export const normalizeDateRange = ({ fechaInicio, fechaFin }) => ({
  fechaInicial: `${fechaInicio}T00:00:00Z`,
  fechaFinal: `${fechaFin}T00:00:00Z`,
});
