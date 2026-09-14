# Contexto de catálogos y dropdowns para Coorin Web

Fecha de revisión: 2026-09-10.

Este documento define cómo cargar y consumir catálogos en el frontend. En legacy los formularios usan una caché global `Catálogo`, configuran `ValueMember` y `DisplayMember`, y filtran catálogos relacionados al cambiar la selección. El equivalente web debe centralizar esa caché por servidor/usuario, conservar IDs como `value` y usar textos solo como `label`.

## Fuentes de catálogos

### Catálogos Gespa

| Método | Endpoint | Respuesta esperada | Uso |
|---|---|---|---|
| GET | `/api/Catalogos/catalogos` | `{ idCatalogo, catálogo, descripción }[]` | catálogo maestro |
| GET | `/api/Catalogos/valores-catalogo` | `{ idValor, idCatálogo, valor, detalle }[]` | opciones de cada catálogo |

Estas rutas obtienen `Servidor` desde el claim JWT. No enviar servidor manualmente desde el componente.

### Catálogos de consulta

| Método | Endpoint | Parámetros |
|---|---|---|
| GET | `/api/Catalogo/cargaCatalogos` | `servidor` requerido; devuelve `Carteras`, `Productos`, `Rechazos`, `CatalogosConsultas`, `Versiones` |
| GET | `/api/Catalogo/ColumnasProducto` | `servidor`, `idProducto` |
| GET | `/api/Catalogo/UsuariosRH` | `servidor`, `usuario` |
| GET | `/api/Catalogo/Versionamiento` | `servidor` |
| GET | `/api/campañas/carteras` | servidor desde JWT |
| GET | `/api/campañas/carteras-productos` | servidor desde JWT; carteras activas y productos |
| GET | `/api/CamposPantalla/obtener/{idProducto}` | configuración de campos del producto |
| GET | `/api/CamposPantalla/mostrar/{idProducto}` | configuración visible del producto |

`/api/Catalogo/cargaCatalogos` es el bootstrap de consultas; `/api/Catalogos/*` es el catálogo maestro de Gespa. No mezclarlos sin un adaptador.

## Schemas Zod para respuestas

```ts
import * as z from "zod";

export const catalogoSchema = z.object({
  idCatalogo: z.coerce.number().int().positive(),
  catálogo: z.string(),
  descripción: z.string().nullable().optional(),
});

export const valorCatalogoSchema = z.object({
  idValor: z.coerce.number().int().positive(),
  idCatálogo: z.coerce.number().int().positive(),
  valor: z.string(),
  detalle: z.string().nullable().optional(),
});

export const carteraSchema = z.object({
  idCartera: z.coerce.number().int().positive(),
  Cartera: z.string().min(1),
}).passthrough();

export const productoSchema = z.object({
  idProducto: z.coerce.number().int().positive(),
  Producto: z.string().min(1),
  idCartera: z.coerce.number().int().positive().optional(),
}).passthrough();

export const catalogBootstrapSchema = z.object({
  Carteras: z.array(carteraSchema),
  Productos: z.array(productoSchema),
  Rechazos: z.array(z.unknown()),
  CatalogosConsultas: z.array(z.unknown()),
  Versiones: z.array(z.unknown()),
});

export type Catalogo = z.infer<typeof catalogoSchema>;
export type ValorCatalogo = z.infer<typeof valorCatalogoSchema>;
export type Cartera = z.infer<typeof carteraSchema>;
```

## Modelo común de dropdown

```ts
export const optionSchema = z.object({
  value: z.union([z.string(), z.number()]),
  label: z.string().min(1),
  disabled: z.boolean().optional(),
});

export type SelectOption = z.infer<typeof optionSchema>;

export function toOptions<T extends Record<string, unknown>>(
  rows: T[], valueKey: keyof T, labelKey: keyof T,
): SelectOption[] {
  return rows.map((row) => ({
    value: row[valueKey] as string | number,
    label: String(row[labelKey] ?? ""),
  }));
}
```

Reglas: `value` debe ser el ID; `label` es solo presentación; no usar el texto para filtrar o enviar al API; incluir opción vacía únicamente cuando el formulario permita no seleccionar; limpiar los hijos de una cascada antes de cargar nuevas opciones.

## Dropdowns por formulario

| Formulario | Dropdowns | Fuente |
|---|---|---|
| `frmCuentas` | concepto, campo, cartera, producto, signo, valores, consulta | bootstrap de consulta, columnas de producto y catálogos de consulta |
| `frmCampañas` | cartera, producto, encargado/campaña | `/api/campañas/carteras-productos`, `/api/campañas/campañas-encargado/...` |
| `frmCargaFilas`, `frmMuestraFilas` | cartera, campaña | carteras/campañas |
| `frmScripts`, `Frases`, `frmPlantillasCorreos` | cartera, producto, tipo/plantilla | carteras, productos y catálogos Gespa |
| `frmCamposPantalla` | producto, campo, tipo de control | `/api/CamposPantalla/*`, catálogo de productos |
| `frmCatálogos` | catálogo, valor | `/api/Catalogos/catalogos`, `/api/Catalogos/valores-catalogo` |
| `frmCapturaVisitas` | cartera, domicilio, causa, sucursal, contacto, situación, parentesco, fachada, puerta, herrería, niveles, vivienda, habitación, económico, marca, año, fotografía, acuse, energía | catálogos Gespa y búsqueda de cuenta/domicilios |
| `frmCargaVisitas`, `frmConsultaVisitas`, `frmEditarVisitas`, `frmEliminaVisitas` | cartera; consulta/dato; sucursal | carteras y catálogos de visitas |
| `frmDefinirCuentas` | cartera, situación | carteras y valores de situación |
| `frmArrepentimientos` | criterio/concepto | catálogo de conceptos de arrepentimiento |
| `frmBloqueoCuentas`, `frmAutorizacionCargos`, `frmEstadosDeCuenta` | cartera, estatus/tipo | carteras y catálogos de operación |
| `frmBúsquedas`, `frmGenerales`, `frmVGP`, `frmDomicilios` | cartera, producto, tipo de consulta, herramientas | bootstrap, columnas producto y catálogos de consulta |
| `frmReporteEjecutivos` | cartera, producto, indicador, encargado | carteras/productos y endpoints de encargados |
| `frmReportesAlCliente` | cartera, producto, reporte, segmento | `/api/reportes-cliente/definiciones` + carteras/productos |
| `frmSoporte` | cartera, refacción, tipo/prioridad | carteras y catálogos de soporte |
| BBVA/AMEX/HSBC/Santander/Toyota/Daimler | segmento, cartera, etapa, codificación y opciones específicas | `pending-audit` hasta confirmar DTO y catálogo en backend |

## Dependencias entre dropdowns

```text
Servidor/JWT
  └─ Carteras
      ├─ Productos
      │   └─ ColumnasProducto / CamposPantalla
      ├─ Encargados
      ├─ Sucursales y campañas
      └─ Opciones operativas filtradas por cartera/producto
```

Implementación: al cambiar cartera, invalidar producto, encargado, campaña y resultados; cargar productos filtrados por `idCartera`; al cambiar producto, cargar columnas/campos y recalcular visibilidad; al cambiar reporte o indicador, reconstruir el schema y las columnas visibles.

## Estado y caché

```ts
type CatalogState = {
  status: "idle" | "loading" | "ready" | "error";
  carteras: SelectOption[];
  productos: SelectOption[];
  valores: Record<number, SelectOption[]>;
  loadedForServer?: string;
  error?: string;
};
```

- Cargar catálogos base después del login y antes de montar formularios dependientes.
- Cachear por servidor y usuario/jerarquía cuando la respuesta dependa de permisos.
- Revalidar al cambiar servidor o cuando el backend devuelva `401`, `403` o `404`.
- Mostrar `loading` en el dropdown, no una lista vacía indistinguible de “sin resultados”.
- Si una cartera viene fijada en el JWT/perfil, ocultar el selector y mostrar su etiqueta, igual que en legacy.
- No permitir enviar un ID que ya no exista en las opciones cargadas.

## Contratos pendientes

Los nombres exactos de propiedades de algunos catálogos operativos (`sucursales`, `situaciones`, `causas`, `etapas`, `segmentos`, `refacciones`) deben confirmarse contra DTOs/respuestas reales. Hasta entonces deben conservar estado `pending-audit`; los componentes pueden usar `unknown` validado en el adaptador, pero no inventar IDs ni valores fijos.

## IDs de catálogos confirmados en legacy

La auditoría de llamadas a `Catálogo.ValoresDelCatálogo(...)` confirmó los siguientes `idCatálogo`. Estos valores sí pueden usarse en el adaptador de catálogos, siempre filtrando los `idValor` indicados:

| `idCatálogo` | Nombre funcional | Dropdown/formulario | Filtro adicional confirmado |
|---:|---|---|---|
| 1 | Sucursales | `frmCuentas`, `frmGenerales`, `frmCapturaVisitas`, `frmEditarVisitas`, `frmSucursales` | sin filtro |
| 2 | Situaciones | `frmCuentas`, `frmGenerales`, `frmCapturaVisitas`, `frmDefinirCuentas`, `frmComentariosCuentas` | definición: nivel `3104`, excluir `1014`; agregar `1012` desde nivel `3101`; comentarios: nivel `3101`, excluir `1032`, `1031` |
| 4 | Niveles | `frmCuentas` | sin filtro |
| 5 | Contacto | `frmGenerales`, `frmCapturaVisitas` | en un caso se usa nivel `1601`; en captura de visitas se consume el catálogo completo |
| 8 | Acercamientos / tipo de negociación | `frmGenerales`, `frmInformeAccionamientos`, `frmAccionamientos` | depende del campo seleccionado |
| 9 | Estado | `frmGenerales` | sin filtro |
| 10 | Causas de no pago | `frmCuentas`, `frmGenerales`, `frmCapturaVisitas` | sin filtro |
| 11 | Parentesco | `frmGenerales`, `frmCapturaVisitas` | sin filtro |
| 12 | Clase | `frmGenerales` | sin filtro |
| 13 | Etapa / relación específica | `frmGenerales` | nivel `2207` para el caso documentado como red social |
| 18 | Datos erróneos | `frmDatosErroneos` | se ordena por `idValor ASC` |
| 21 | Modo / carta-convenio | `frmGenerales` | depende del campo seleccionado |
| 23 | Telefonía | `frmGenerales` | sin filtro |
| 24 | Origen | `frmGenerales` | sin filtro |
| 25 | Viviendas | `frmCapturaVisitas` | sin filtro |
| 26 | Habitación | `frmCapturaVisitas` | excluir `idValor = 2807` |
| 27 | Económicos | `frmCapturaVisitas` | sin filtro |
| 30 | Causa de devolución | `frmCapturaCarteoDevuelto` | sin filtro |

### `idValor` explícitos confirmados

Los siguientes valores no deben reemplazarse por etiquetas de texto:

| `idValor` | Uso |
|---:|---|
| 1012 | situación agregada en `frmDefinirCuentas` |
| 1014 | situación excluida en `frmDefinirCuentas` |
| 1031, 1032 | situaciones excluidas en `frmComentariosCuentas` |
| 1601 | nivel de `Contacto` usado en `frmGenerales` |
| 2207 | nivel de `Etapa`/red social usado en `frmGenerales` |
| 2807 | habitación excluida en `frmCapturaVisitas` |
| 3101 | nivel de situaciones para comentarios y valor `1012` |
| 3104 | nivel de situaciones para definición |

`3101`, `3104`, `1601` y `2207` son parámetros de nivel/relación usados por el helper legacy; no son `idValor` enviados al dropdown. En frontend deben modelarse como filtros de la consulta local:

```ts
export const catalogFilterSchema = z.object({
  idCatalogo: z.coerce.number().int().positive(),
  nivel: z.coerce.number().int().positive().optional(),
  includeValues: z.array(z.coerce.number().int().positive()).default([]),
  excludeValues: z.array(z.coerce.number().int().positive()).default([]),
});

export const confirmedCatalogFilters = {
  situacionesDefinicion: { idCatalogo: 2, nivel: 3104, excludeValues: [1014] },
  situacionesComentarios: { idCatalogo: 2, nivel: 3101, excludeValues: [1031, 1032] },
  situacionAgregada: { idCatalogo: 2, nivel: 3101, includeValues: [1012] },
  contactoGenerales: { idCatalogo: 5, nivel: 1601 },
  etapaRedSocial: { idCatalogo: 13, nivel: 2207 },
  habitacionVisita: { idCatalogo: 26, excludeValues: [2807] },
} as const;
```

## Resolver opciones para dropdown

```ts
export function valuesFor(
  values: ValorCatalogo[],
  idCatalogo: number,
  filter: { nivel?: number; includeValues?: number[]; excludeValues?: number[] } = {},
) {
  const include = new Set(filter.includeValues ?? []);
  const exclude = new Set(filter.excludeValues ?? []);

  return values
    .filter((v) => v.idCatálogo === idCatalogo)
    .filter((v) => filter.nivel == null || (v as any).nivel === filter.nivel)
    .filter((v) => include.size === 0 || include.has(v.idValor))
    .filter((v) => !exclude.has(v.idValor))
    .map((v) => ({ value: v.idValor, label: v.valor, detalle: v.detalle }));
}
```

El campo `nivel` no forma parte de la proyección actual de `/api/Catalogos/valores-catalogo`; para reproducir exactamente los filtros `3101`, `3104`, `1601` y `2207`, el backend debe incluirlo en la respuesta o exponer un endpoint de valores filtrados. Mientras eso no ocurra, el frontend no debe asumir que `detalle` equivale a `nivel`.

## Contrato mínimo recomendado para backend

```json
{
  "idValor": 1012,
  "idCatálogo": 2,
  "valor": "Situación ejemplo",
  "detalle": "Descripción",
  "nivel": 3101,
  "activo": true,
  "orden": 1
}
```

La incorporación de `nivel`, `activo` y `orden` permite reproducir filtros, exclusiones, ordenamiento y visibilidad sin hardcodear listas de etiquetas en cada formulario.
