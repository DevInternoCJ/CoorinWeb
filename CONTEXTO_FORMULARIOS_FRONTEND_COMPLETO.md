# Contexto consolidado de formularios para Coorin Web

Fecha de revisión: 2026-09-10.

Fuente primaria: archivos `*.cs` dentro de `D:\CésarRdz\1 Coorin Piso TODOS\VERSIONES EN CURSO\Coorin_Piso_v02 - Sor Lay CalidadEstad\Forms`. El árbol contiene 92 formularios legacy distintos, sin contar diseñadores, recursos, copias `.csold` ni archivos empaquetados.

## Mapa real

### Base y utilidades

| Formulario | Ruta relativa | Rol |
|---|---|---|
| `frmLogin` | raíz | autenticación |
| `frmMenu` | `Menú/` | shell/RBAC |
| `frmHistóricoCRM` | `Menú/` | histórico CRM |
| `frmMessageBox` | raíz | modal global |
| `frmReporteVista` | raíz | visor tabular/exportación |
| `frmComplemento` | `Menú/6 Ayuda/` | complemento |
| `frmVersionamiento` | `Menú/6 Ayuda/` | changelog |

### Administración

`frmCampañas`, `frmCargaFilas`, `frmMuestraFilas` (`Menú/1 Administración/Campañas/`); `frmCambioEncargado`, `frmMetasEjecutivos`, `frmSesiones`, `frmValidadores` (`.../Personal/`); `frmCamposPantalla`, `frmCatálogos`, `frmPlantillasCorreos`, `frmScripts` (`.../Collection App/`); `frmReseteoContraseña`, `frmSoporte`, `Frases` (`Menú/1 Administración/`).

### Consulta e información

`frmCuentas`, `frmGenerales`, `frmHistórico`, `frmInformeArrepentimientos`, `frmListasNegras`, `frmProductividad` en `Menú/2 Consulta/`; `frmBúsquedas`, `frmConsultaComentarios`, `frmCorreos`, `frmDatosErroneos`, `frmDomicilios`, `frmOfrecimientos`, `frmPagosNegociaciones`, `frmPagosReportados`, `frmVGP` en `Menú/2 Consulta/Información/`.

### Procesos generales

En `Menú/3 Procesos/`: `Cargas`, `frmMetas`, `frmSpeechSorianaCalidad`.

En `Collection App/`: `frmArrepentimientos`, `frmAutorizacionCargos`, `frmBloqueoCuentas`, `frmComentariosCuentas`, `frmDefinirCuentas`, `frmEstadosDeCuenta`, `frmNegociacionesPermanentes`, `frmSucursales`.

En `Gestiones/`: `frmCargaGestionesTel`, `frmConsultaGestionesTel`, `frmEditarGestiones`, `frmIntentosViciDial`.

En `Correos/`: `frmConfiguraciónCorreo`, `frmEnvíoEjecutivos`.

En `Domicilios/`: `frmLimpiezaDomicilios`.

En `Negociaciones/`: `frmNegociacionesComplemento`.

En `Supervisor/`: `frmRevisiónSupervisor`.

### Visitas y accionamientos

Visitas (`Menú/3 Procesos/Visitas/`): `frmCapturaVisitas`, `frmCargaVisitas`, `frmConsultaVisitas`, `frmEditarVisitas`, `frmEliminaVisitas`.

Accionamientos (`Menú/3 Procesos/Accionamientos/`): `frmAccionamientos`, `frmAccionamientosResultado`, `frmCapturaCarteoDevuelto`, `frmConsultaCarteoDevuelto`, `frmInformeAccionamientos`.

### Carteras y procesos especiales

- BBVA (`.../BBVA/`): `frmBBVACarteo`, `frmBBVACondonaciones`, `frmBBVAProyeccion`, `frmBBVARemanentes`, `frmBBVAUsuariosCyber`, `frmBBVAVinculaciones`.
- AMEX (`.../Amex/`): `frmCargaConversacion`, `frmCodificaciónAmex`, `frmLanas`, `frmNegociacionesSinValidación`.
- HSBC (`.../HSBC/`): `frmHSBC_Demograficos`, `frmHSBCasistencia`.
- Santander (`.../Santander/`): `frmReportesSantander`, `frmNoConfirmadosSantander` (`No confirmados/`).
- Toyota (`.../Toyota/`): `frmDocumentacionAmexLegal`, `frmProcesoJudicial`.
- Daimler (`.../Daimler/`): `frmDaimler`.

### Reportes y auditoría

Reportes (`Menú/4 Reportes/`): `frmDíaEjecutivo`, `frmExportTxt`, `frmProductividadMensual`, `frmReporteCalidad`, `frmReporteEjecutivos`, `frmReportesAlCliente`.

Auditoría (`Menú/5 Auditoría/`): `frmCalidad`, `frmAuditoría_Detalle`.

## Formularios que faltaban en el contexto previo

`frmAccionamientosResultado`, `frmBBVAProyeccion`, `frmBBVARemanentes`, `frmBBVAUsuariosCyber`, `frmBBVAVinculaciones`, `frmCargaGestionesTel`, `frmConsultaGestionesTel`, `frmEditarGestiones`, `frmConfiguraciónCorreo`, `frmEnvíoEjecutivos`, `frmDaimler`, `frmDocumentacionAmexLegal`, `frmHSBC_Demograficos`, `frmHSBCasistencia`, `frmLimpiezaDomicilios`, `frmNegociacionesComplemento`, `frmNegociacionesPermanentes`, `frmNegociacionesSinValidación`, `frmNoConfirmadosSantander`, `frmProcesoJudicial`, `frmReporteCalidad`, `frmReportesSantander`, `frmRevisiónSupervisor`, `frmSucursales`, `frmCargaFilas`, `frmMuestraFilas`, `frmPagosNegociaciones`, `frmEditarVisitas` y `frmEliminaVisitas`.

También deben registrarse `Frases`, `Cargas` y `frmReporteVista`, pues son pantallas/clases reales aunque no sigan el patrón `frm...` o estén fuera del árbol funcional documentado.

## Correcciones de nomenclatura

| Nombre previo | Nombre físico canónico |
|---|---|
| `frmConsultaVGP` | `frmVGP` |
| `frmCorregirVisitas` | `frmEditarVisitas` |
| `frmEliminarVisitas` | `frmEliminaVisitas` |
| `frmGestiones` | `frmCargaGestionesTel`, `frmConsultaGestionesTel`, `frmEditarGestiones`, `frmIntentosViciDial` |
| `frmSupervisor` | `frmRevisiónSupervisor` |

## Estado de integración frontend

1. **Con contrato ya documentado:** autenticación, Collection App, visitas, búsqueda, reportes base, catálogos, campos por pantalla, frases y scripts.
2. **Requiere consolidación de contrato:** negociaciones, gestiones, domicilios, correos, accionamientos y reportes especializados.
3. **Requiere auditoría específica:** BBVA adicional, HSBC, Santander, Toyota y Daimler.

Cada `FormContext` debe conservar `formId` canónico, `legacyPath`, módulo, permisos mínimos, esquema Zod, endpoints de lectura/escritura, cargas de archivo y configuración de grids/exportación. Si la ruta HTTP no fue verificada en Loki, usar `pending-audit`; no inferir endpoints por el nombre del formulario.

## Evidencia y límite

Este inventario confirma existencia y ubicación física. No implica que exista un endpoint Loki equivalente. El siguiente paso técnico es auditar los handlers de cada `.cs` y compararlos con controladores, DAOs y modelos de `CoorinWeb`.

## Especificación frontend con Zod

La implementación propuesta usa Zod 4 como validador TypeScript-first: el esquema valida datos no confiables y permite inferir el tipo del formulario con `z.infer`. El proyecto frontend debe tener `strict: true` en `tsconfig.json` y registrar los esquemas mediante React Hook Form/Zod resolver o el adaptador de formularios equivalente. Referencia oficial: [Zod](https://zod.dev/).

### Primitivas compartidas

```ts
import * as z from "zod";

const id = z.coerce.number().int().positive();
const requiredText = (label: string) => z.string().trim().min(1, `${label} es obligatorio.`);
const optionalText = z.string().trim().max(500).optional().or(z.literal(""));
const dateOnly = z.coerce.date({ error: "La fecha no es válida." });
const dateRange = z.object({
  fechaInicio: dateOnly,
  fechaFin: dateOnly,
}).refine((v) => v.fechaFin >= v.fechaInicio, {
  path: ["fechaFin"], message: "La fecha final debe ser igual o posterior a la inicial."
});

export const accountSearchSchema = z.object({
  idCartera: id,
  parametro: requiredText("El parámetro"),
  tipoBusqueda: id,
});

export const fileUploadSchema = z.object({
  idCartera: id,
  archivo: z.instanceof(File, { error: "Seleccione un archivo." }),
  complemento: z.boolean().default(false),
});
```

### Formularios ya documentados y validados

| Formulario | Inputs | Dropdowns | Checks/radios | Botones | Columnas/grid |
|---|---|---|---|---|---|
| `frmLogin` | usuario, contraseña, nueva contraseña, repetición | servidor | — | acceder, sí, no | — |
| `frmCuentas` | valores dinámicos, periodo | concepto, campo, cartera, producto, signo, consulta | general, contar/detalle | agregar, agrupar, consultar, guardar, exportar | parámetros, agrupación, cuentas |
| `frmCapturaVisitas` | cuenta, visitador, atendió, observación, teléfono, domicilio, auto, medidor, monto | cartera, domicilio, causa, sucursal, contacto, situación, parentesco, fachada, puerta, herrería, niveles, vivienda, habitación, económicos, marca, año, mapeo, fotografía, acuse, energía | expediente | capturar, eliminar fila | teléfonos de visita |
| `frmCargaVisitas` | ruta/archivo | cartera | complemento | seleccionar archivo, cargar | vista previa de visitas |
| `frmConsultaVisitas` | fecha inicio/fin | consulta, cartera | complemento | consultar, exportar | resultado dinámico |
| `frmEditarVisitas` | cuenta, usuario, comentario, fecha | cartera, dato, sucursal | — | buscar, editar | visitas encontradas |
| `frmEliminaVisitas` | ruta/archivo | cartera | complemento | seleccionar archivo, cargar | vista previa |
| `frmBBVACondonaciones` | fecha | — | — | generar, exportar | resultado batch |
| `frmBBVACarteo` | fecha asignación, primer pago, segundo pago | segmento, cartera | — | generar, exportar | resultado |
| `frmCodificaciónAmex` | desarrollo, comentario, rango de fechas | codificación, etapa | header, archivo, ACORN, validar por fila | filtrar, aplicar etapa, guardar comentario, exportar | id, cuenta, codificación, códigos, condiciones, creado, validado, enviado, etapa, desarrollo |
| `frmReporteEjecutivos` | fecha inicio/fin | cartera, producto, indicador, encargado | porcentajes | buscar, exportar | productividad |
| `frmReportesAlCliente` | fecha desde/hasta | cartera, producto, reporte, segmento | — | generar, exportar | archivo generado |
| `frmSoporte` | extensión, desarrollo, comentario, objetivo de cambio, usuario, fecha compromiso | refacción, cartera | prioridad alto/medio/bajo, tipo de solicitud | reportar, comentario, contraseña, exportar, cerrar fila | reportes de soporte |
| `frmReseteoContraseña` | usuario | — | — | buscar, resetear | datos de usuario |
| `frmExportTxt` | — | valores definidos por el reporte | — | exportar | layout generado |

### Esquemas Zod de los formularios principales

```ts
export const loginSchema = z.object({
  usuario: requiredText("El usuario"),
  contraseña: z.string().min(1, "La contraseña es obligatoria."),
  servidor: requiredText("El servidor"),
});

export const capturaVisitaSchema = z.object({
  idCartera: id,
  cuenta: requiredText("La cuenta"),
  idDomicilio: id,
  fechaVisita: dateOnly,
  horaVisita: z.string().regex(/^([01]\\d|2[0-3]):[0-5]\\d$/, "La hora no es válida."),
  usuarioVisitador: requiredText("El visitador"),
  idHabitacion: id,
  idContacto: id,
  idParentesco: id,
  idSituacion: id,
  idCausaNoPago: id,
  idSucursal: id,
  atendio: requiredText("La persona que atendió"),
  comentario: optionalText,
  colorFachada: optionalText,
  colorPuerta: optionalText,
  colorHerreria: optionalText,
  pisos: z.coerce.number().int().min(0).max(100),
  idVivienda: id,
  idEconomico: id,
  nombrePropietario: optionalText,
  autoMarca: optionalText,
  autoModelo: optionalText,
  autoColor: optionalText,
  autoPlacas: optionalText,
});

export const consultaVisitasSchema = dateRange.extend({
  idCartera: id,
  idConsulta: id,
  complemento: z.boolean().default(false),
});

export const bbvaCondonacionesSchema = z.object({ fecha: dateOnly });

export const bbvaCarteoSchema = z.object({
  fechaAsignacion: dateOnly,
  fechaPrimerPago: dateOnly,
  fechaSegundoPago: dateOnly,
  segmento: z.enum(["Auto", "Consumo", "Pyme", "Tdc Banco", "Tdc Finanzia"]),
  cartera: z.enum(["Castigada", "Fallida", "Vencida", "Vigente"]),
}).refine((v) => v.fechaPrimerPago >= v.fechaAsignacion, {
  path: ["fechaPrimerPago"], message: "El primer pago no puede ser anterior a la asignación."
}).refine((v) => v.fechaSegundoPago >= v.fechaPrimerPago, {
  path: ["fechaSegundoPago"], message: "El segundo pago no puede ser anterior al primero."
});

export const codificacionAmexFilterSchema = dateRange.extend({
  idCodificacion: id.optional(),
  acorn: z.boolean().default(false),
  archivo: z.boolean().default(false),
});

export const reporteEjecutivosSchema = dateRange.extend({
  idCartera: id,
  idProducto: id.optional(),
  idIndicador: id,
  idEncargado: id.optional(),
  porcentajes: z.boolean().default(false),
});

export const soporteSchema = z.object({
  idRefaccion: id.optional(),
  idCartera: id.optional(),
  extension: requiredText("La extensión"),
  tipo: z.enum(["Reposición", "Mantenimiento", "Falla técnica", "Otro"]),
  comentario: requiredText("El comentario"),
  prioridad: z.enum(["alto", "medio", "bajo"]),
  fechaCompromiso: dateOnly.optional(),
});

export type CapturaVisitaValues = z.infer<typeof capturaVisitaSchema>;
export type ReporteEjecutivosValues = z.infer<typeof reporteEjecutivosSchema>;
```

### Matriz para formularios restantes

| Grupo | Formularios | Estructura mínima a implementar |
|---|---|---|
| Collection App | `frmArrepentimientos`, `frmAutorizacionCargos`, `frmBloqueoCuentas`, `frmComentariosCuentas`, `frmDefinirCuentas`, `frmEstadosDeCuenta`, `frmNegociacionesPermanentes`, `frmSucursales` | búsqueda por cuenta/cartera, datos dinámicos, acción principal, comentario opcional, tabla de resultados |
| Gestiones | `frmCargaGestionesTel`, `frmConsultaGestionesTel`, `frmEditarGestiones`, `frmIntentosViciDial` | archivo o cuenta, rango de fechas, filtros de gestión, grid editable y exportación |
| Consulta | `frmGenerales`, `frmHistórico`, `frmInformeArrepentimientos`, `frmListasNegras`, `frmBúsquedas`, `frmConsultaComentarios`, `frmCorreos`, `frmDatosErroneos`, `frmDomicilios`, `frmOfrecimientos`, `frmPagosNegociaciones`, `frmPagosReportados`, `frmVGP` | cartera/cuenta, filtros específicos, grid, exportar; marcar endpoint como `pending-audit` hasta verificarlo |
| Especiales | `frmBBVAProyeccion`, `frmBBVARemanentes`, `frmBBVAUsuariosCyber`, `frmBBVAVinculaciones`, `frmLanas`, `frmCargaConversacion`, `frmNegociacionesSinValidación`, `frmDaimler`, `frmHSBC_Demograficos`, `frmHSBCasistencia`, `frmReportesSantander`, `frmNoConfirmadosSantander`, `frmDocumentacionAmexLegal`, `frmProcesoJudicial` | no fijar nombres de campos ni endpoint por inferencia; extraer controles del Designer y reglas del handler antes de crear el schema |
| Administración | `frmCampañas`, `frmCargaFilas`, `frmMuestraFilas`, `frmCambioEncargado`, `frmMetasEjecutivos`, `frmSesiones`, `frmValidadores`, `frmCamposPantalla`, `frmCatálogos`, `frmPlantillasCorreos`, `frmScripts`, `Frases` | formularios CRUD, selects de catálogos, grids con acciones por fila y permisos por jerarquía |
| Reportes/auditoría | `frmDíaEjecutivo`, `frmProductividad`, `frmProductividadMensual`, `frmReporteCalidad`, `frmCalidad`, `frmAuditoría_Detalle`, `frmAccionamientos`, `frmAccionamientosResultado`, `frmCapturaCarteoDevuelto`, `frmConsultaCarteoDevuelto`, `frmInformeAccionamientos` | rango de fechas, cartera/producto, filtros, grid, exportación y estado de ejecución |

### Reglas de UI y restricciones

- Los `ComboBox` se representan como `select` con opciones `{label, value}`; el schema valida el `value`, no el texto mostrado.
- Los `DataGridView` se representan como tablas con `columns`, `rows`, selección por fila y acciones explícitas; cada columna editable debe tener un schema de fila separado.
- Los `CheckBox` siempre deben tener valor booleano con `.default(false)`.
- Los botones de consulta deben validar el filtro; los botones de escritura deben validar el payload completo y deshabilitarse durante la petición.
- Fechas y números provenientes de HTML deben usar `z.coerce`; las fechas se deben normalizar a ISO antes de enviar al API.
- Los archivos deben validarse por extensión/tamaño en UI y nuevamente en el backend; no confiar solo en el nombre del archivo.
- No se deben crear schemas basados únicamente en el nombre de una pantalla especial: primero se debe verificar su Designer y su código de eventos.

## Comportamiento legacy que debe replicarse

La revisión de los `.cs` y `.Designer.cs` encontró que la interacción legacy es principalmente reactiva a eventos de selección, carga y consulta. No se encontraron llamadas explícitas a `DoDragDrop`, `DragEnter`, `DragOver`, `DragDrop`, `ItemDrag` ni uso de `Clipboard` en los formularios auditados. Por tanto, el “arrastre de información” no aparece como una funcionalidad implementada; lo que sí existe es transferencia automática de datos entre controles después de seleccionar una fila, cartera, producto o domicilio.

### 1. Visibilidad dinámica y RBAC

`frmMenu` oculta o muestra módulos según jerarquía, servidor y configuración. En el arranque aparecen ocultos, entre otros, AMEX, BBVA, HSBC, Daimler, Santander, auditoría, domicilios, complemento, ciertos reportes, visitas, gestiones y accionamientos; después se habilitan selectivamente para perfiles permitidos. Esto debe ser una política de navegación y también una protección de ruta, no solo CSS.

`frmReportesAlCliente` muestra u oculta fecha desde, fecha hasta, cartera, producto y segmento según metadatos del reporte (`ParamDesde`, `ParamHasta`, `ParamProducto`) y según si el ejecutivo ya tiene producto asignado. `frmReporteEjecutivos` cambia las columnas del grid según el indicador seleccionado y solo muestra porcentajes cuando el indicador lo requiere. `frmHistórico` activa selectores de archivo/individual, periodo y tipos de histórico de acuerdo con el modo de consulta. `frmVGP` y otras consultas ocultan cartera cuando el usuario ya tiene una cartera fija.

Contrato recomendado para frontend:

```ts
export type FieldVisibility = Record<string, boolean>;

export type FormUiState = {
  loading: boolean;
  submitting: boolean;
  visible: FieldVisibility;
  enabled: Record<string, boolean>;
  readOnly: Record<string, boolean>;
  visibleColumns: string[];
  message?: { type: "info" | "success" | "error"; text: string };
};

export const reportParamsSchema = z.object({
  paramDesde: z.boolean(),
  paramHasta: z.boolean(),
  paramProducto: z.boolean(),
  ejecutivoTieneProducto: z.boolean(),
});
```

### 2. Cascada de selects y transferencia de información

Los eventos `SelectedIndexChanged` cargan o recalculan información dependiente. El patrón encontrado es: cartera seleccionada → productos/encargados/sucursales; producto seleccionado → filtros disponibles; indicador o reporte seleccionado → columnas y campos visibles; cuenta seleccionada → domicilios, teléfonos, datos del deudor y controles de captura.

En frontend se debe usar estado derivado y consultas cancelables:

```ts
const selectionSchema = z.object({
  idCartera: z.coerce.number().int().positive(),
  idProducto: z.coerce.number().int().positive().optional(),
  idCuenta: z.string().trim().optional(),
});

// Al cambiar idCartera:
// 1. limpiar producto/encargado/sucursal anterior;
// 2. cargar opciones dependientes;
// 3. conservar solo valores válidos;
// 4. recalcular visibilidad y columnas;
// 5. invalidar resultados de una consulta anterior.
```

No se debe copiar el texto visible como identificador. Cada opción debe mantener `{ value: id, label: texto }`.

### 3. Flujos de archivo y estados de carga

`frmCargaVisitas`, `frmEliminaVisitas`, `frmCargaGestionesTel` y `frmCodificaciónAmex` tienen flujo por etapas: seleccionar archivo, mostrar ruta/preview, cargar datos, mostrar registros y ejecutar. Mientras se procesa, el botón de archivo o acción se oculta/deshabilita, el grid puede aparecer, se muestra `picWait` y al terminar se restablece la acción. Este patrón debe implementarse como máquina de estados:

`idle → selected → preview → processing → success | error`.

Los reportes y consultas tienen el mismo patrón `idle → loading → data | error`; durante `loading` se oculta o deshabilita consultar/generar y exportar solo se muestra cuando hay resultados.

### 4. Grids interactivos

- `frmCuentas`: agrega parámetros a un grid, permite borrar filas, agrupar parámetros y alternar contar/detalle.
- `frmCapturaVisitas`: permite eliminar teléfonos de la visita desde una columna de acción.
- `frmCodificaciónAmex`: selección por checkbox de filas, aplicación masiva de etapa, comentario masivo y exportación.
- `frmSoporte`: columnas de cierre/acción por fila y grids separados para reportes y otros registros.
- `frmReporteEjecutivos`: grid de solo lectura con columnas que cambian por indicador.
- `frmMessageBox` y `frmReporteVista`: columnas ocultas para datos internos y acciones de fila mediante `CellContentClick`.

Modelo frontend recomendado:

```ts
export const gridActionSchema = z.object({
  rowId: z.union([z.string(), z.number()]),
  action: z.enum(["delete", "close", "select", "edit", "export"]),
});

export const batchSelectionSchema = z.object({
  selectedIds: z.array(z.union([z.string(), z.number()])).min(1, "Seleccione al menos un registro."),
  etapa: z.coerce.number().int().positive().optional(),
  comentario: z.string().trim().max(500).optional(),
});
```

### 5. Doble clic, teclado y modal

`frmMenu` tiene doble clic sobre el logo; `frmLogin` maneja teclado y enter en los controles de acceso; los formularios de mensajes usan modal para confirmaciones, errores y encuestas. El frontend debe conservar navegación por teclado, `Enter` para enviar cuando corresponda, foco después de errores y confirmación antes de acciones destructivas como eliminar visitas, bloquear cuentas o cerrar tickets.

### 6. Columnas ocultas y datos técnicos

Algunas columnas se esconden deliberadamente (`id`, usuario, fechas internas, cartera, encargado, campos de ordenamiento o columnas auxiliares). En el frontend deben existir dos configuraciones: `dataColumns` para el modelo completo y `displayColumns` para la vista. No eliminar del response las columnas técnicas necesarias para acciones por fila.

### 7. Prioridad de replicación

1. **Alta:** estados de carga, visibilidad por permisos, cascadas cartera/producto, preview de archivos y botones condicionados.
2. **Alta:** selección múltiple, acciones por fila, columnas dinámicas y exportación.
3. **Media:** doble clic, atajos de teclado, foco y menús/modales.
4. **No implementar aún:** drag & drop nativo; no hay evidencia en legacy. Solo agregarlo si el producto frontend lo solicita como mejora nueva.
