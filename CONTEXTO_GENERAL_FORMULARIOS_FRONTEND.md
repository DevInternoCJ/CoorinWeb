# Contexto general: funcionalidad de formularios en el frontend de CoorinWeb

Fecha de elaboración: 2026-09-11  
Proyecto: CoorinWeb  
Propósito: servir como guía funcional y técnica para trasladar al frontend actual los formularios existentes en la solución legacy.

## 1. Objetivo

Implementar formularios consistentes, trazables y seguros para los módulos de CoorinWeb, conservando las reglas funcionales observadas en el sistema legacy:

- captura, consulta, edición y eliminación de información;
- filtros dependientes de cartera, producto, cuenta, usuario y jerarquía;
- catálogos y selects en cascada;
- tablas con selección y acciones por fila;
- carga, previsualización y procesamiento de archivos;
- reportes, exportaciones, mensajes y confirmaciones;
- visibilidad, habilitación y protección de rutas según permisos.

Este documento es una guía de implementación. No sustituye la auditoría de los handlers legacy ni confirma por sí mismo la existencia de un endpoint backend.

## 2. Estado actual de la solución

La aplicación está construida con React 19, Vite, React Router, Zustand, Axios, Tailwind/Preline, Zod y `xlsx`. Las piezas relevantes ya existentes son:

| Pieza | Ubicación | Responsabilidad |
|---|---|---|
| Contratos de formularios | `src/forms/formContracts.js` | Identificador canónico, módulo, estado y endpoints conocidos |
| Esquemas y utilidades Zod | `src/schemas/formSchemas.js` | Validación, coerción, archivos, grids y normalización |
| Hook de validación | `src/hooks/useZodValidation.js` | Errores por campo, limpieza y foco del primer error |
| Catálogos | `src/hooks/useCatalogOptions.js`, `src/contextGlobal/catalogStore.js` | Opciones compartidas y dependencias entre selects |
| Inputs/selects | `src/components/Select/` | Controles visuales reutilizables |
| Errores | `src/components/Formulario/FieldError.jsx` | Presentación uniforme de errores |
| Servicios | `src/services/` | Comunicación con API por dominio |

Antes de crear una abstracción nueva, se debe revisar si estas piezas cubren la necesidad.

## 3. Principios de implementación

1. Cada pantalla debe tener un `formId` canónico y un contrato asociado.
2. El esquema Zod es la fuente de verdad de la validación del payload del frontend.
3. Los valores de selects son identificadores; el texto visible solo es presentación.
4. La validación debe ejecutarse antes de consultar y antes de cualquier operación de escritura.
5. Los botones de acción deben reflejar `loading`, `submitting`, permisos y existencia de resultados.
6. La autorización debe proteger navegación y rutas, no únicamente ocultar controles.
7. Un endpoint no se debe inferir por el nombre del formulario. Si no está verificado, usar estado `pending-audit`.
8. Los datos técnicos necesarios para acciones de fila deben conservarse aunque sus columnas no se muestren.
9. Las fechas se validan como `YYYY-MM-DD` en UI y se normalizan a ISO al enviar.
10. Las acciones destructivas requieren confirmación y manejo explícito de error.

## 4. Modelo funcional común

Cada formulario debe describirse con esta información mínima:

```js
{
  formId: "frmConsultaVisitas",
  module: "Visitas",
  status: "verified | partial | pending-audit",
  schema,
  permissions: ["..."],
  fields: [/* tipo, label, required, visible, enabled */],
  endpoints: [/* method, path, purpose */],
  resultGrid: { columns, hiddenColumns, rowActions },
  fileUpload: { acceptedExtensions, maxBytes },
  export: { enabled, format },
}
```

El estado de ejecución recomendado es:

```text
idle -> validating -> loading/submitting -> success | empty | error
```

Para cargas de archivo:

```text
idle -> selected -> preview -> processing -> success | error
```

Cada transición debe limpiar o invalidar los datos dependientes que ya no sean válidos.

## 5. Comportamientos que deben replicarse

### Selects y dependencias

- cartera seleccionada: recarga productos, encargados, sucursales y filtros dependientes;
- producto seleccionado: recalcula filtros y columnas disponibles;
- cuenta seleccionada: carga domicilios, teléfonos, datos del deudor y opciones de captura;
- reporte o indicador seleccionado: cambia visibilidad de campos y columnas.

Al cambiar un valor padre, limpiar el valor hijo anterior, cancelar o invalidar consultas pendientes y conservar únicamente opciones válidas.

### Visibilidad y permisos

La visibilidad de campos, botones y columnas debe ser derivada del estado de usuario, jerarquía, configuración del formulario y datos seleccionados. Un elemento oculto no debe considerarse una autorización válida para invocar el endpoint.

### Grids

Los grids deben separar el modelo completo (`dataColumns`) de la vista (`displayColumns`). Las acciones deben ser explícitas y validar su payload:

```js
{ rowId, action: "select | edit | delete | close | export" }
```

Para operaciones masivas, exigir al menos una fila seleccionada y deshabilitar la acción durante el procesamiento.

### Archivos

Validar extensión, tamaño y existencia del archivo en el cliente; volver a validar en backend. Mostrar preview cuando aplique, progreso/espera durante el procesamiento y un resultado recuperable ante error.

## 6. Formularios y cobertura

La prioridad de implementación es:

1. Login, catálogos y formularios base de visitas.
2. Consultas y edición de gestiones.
3. Collection App y formularios de cuenta.
4. Reportes, exportación y auditoría.
5. Procesos especializados por cliente: BBVA, AMEX, HSBC, Santander, Toyota y Daimler.

Los formularios de visitas y gestiones ya cuentan con esquemas/contratos parciales o verificados en el código. Para el resto se debe extraer primero el conjunto real de controles, reglas y eventos del legacy y luego crear el esquema y contrato correspondiente.

## 7. Flujo de trabajo por formulario

1. Registrar el `formId` y su módulo.
2. Identificar controles, valores iniciales, reglas condicionales y acciones.
3. Crear o extender el esquema Zod.
4. Definir el contrato API; marcar como `pending-audit` lo no comprobado.
5. Reutilizar controles, catálogos, hook de validación y componentes de modal/grid.
6. Implementar estados de carga, vacío, error y éxito.
7. Añadir permisos y protección de ruta.
8. Probar validación, cascadas, acciones de fila, exportación y cancelación de peticiones.
9. Comparar el resultado con el comportamiento legacy y documentar diferencias intencionales.

## 8. Criterios de aceptación

- No se puede enviar un formulario inválido.
- El usuario recibe el error junto al campo y el foco llega al primer error.
- Los valores dependientes se limpian al cambiar su selección padre.
- Ningún botón permite doble envío.
- Los selects muestran etiquetas, pero envían valores estables.
- Las acciones destructivas solicitan confirmación.
- Los endpoints no auditados están identificados y no se presentan como definitivos.
- Las tablas conservan identificadores técnicos para sus acciones.
- Las cargas de archivo validan tamaño y extensión y muestran su estado.
- El formulario funciona con teclado y mantiene un orden de foco accesible.

## 9. Riesgos y decisiones pendientes

- La existencia de un formulario legacy no garantiza un endpoint equivalente en la API actual.
- No implementar drag & drop como requisito base: la evidencia disponible apunta a transferencia reactiva entre controles, no a arrastre nativo.
- Confirmar nombres exactos de campos y fechas con backend antes de cerrar cada contrato.
- Definir una estrategia común de cancelación de solicitudes y exportación para evitar duplicación entre módulos.
- Mantener separadas las reglas de negocio, los esquemas, los servicios y la representación visual.

## 10. Archivos de referencia del proyecto

- `CONTEXTO_FORMULARIOS_FRONTEND_COMPLETO.md`: inventario y comportamiento detallado del legacy.
- `CONTEXTO_ENDPOINTS_FRONTEND_COMPLETO.md`: matriz de endpoints y estado de verificación.
- `CONTEXTO_CATALOGOS_DROPDOWNS_FRONTEND.md`: catálogos, opciones y cascadas.
- `AUDITORIA_CONTRATOS_FORMULARIOS.md`: revisión de contratos existentes.
- `src/forms/formContracts.js`: contratos consumibles por el frontend.
- `src/schemas/formSchemas.js`: esquemas y utilidades de validación actuales.

## 11. Análisis comparativo: frontend actual contra legacy

### Conclusión arquitectónica

El legacy es una aplicación WinForms orientada a ventanas, controles mutables y eventos directos (`ComboBox`, `DataGridView`, `KeyPress`, `Visible`, `Enabled`). CoorinWeb ya utiliza una arquitectura distinta: React compuesto por vistas, modales, componentes reutilizables, hooks, stores Zustand y servicios Axios.

La adaptación correcta es conservar la arquitectura de CoorinWeb y trasladar únicamente las reglas funcionales del legacy. No se debe reproducir una ventana monolítica ni introducir un store global por cada formulario.

| Aspecto | Legacy | Frontend actual | Decisión |
|---|---|---|---|
| Pantalla | Una clase/formulario por ventana | Vistas y modales compuestos | Mantener modales y composición React |
| Estado | Campos mutables y eventos imperativos | `useState`, hooks y Zustand | Usar estado local para el flujo; global solo para sesión/catálogos |
| API | Consultas SQL y lógica en handlers | Servicios Axios por dominio | Extraer reglas y payloads, nunca SQL ni handlers |
| Validación | `KeyPress`, límites y validación al guardar | Zod + validación de API | Centralizar reglas en schemas y conservar UX inmediata |
| Catálogos | `DataTable` compartido y filtros de filas | `catalogStore` y `useCatalogOptions` | Reutilizar store; agregar solo filtros faltantes |
| Navegación | `frmMenu` muestra/oculta opciones | Sidebar + selección de modal + URL | Mantener navegación actual y reforzar permisos de ruta |
| Tablas | `DataGridView` con columnas ocultas | Componentes y tablas dentro de vistas | Definir columnas por pantalla, conservar IDs técnicos |
| Archivos | `OpenFileDialog`, preview y procesamiento | `input[type=file]`, `FormData`, estados React | Mantener flujo React y adaptar reglas de archivo |
| Mensajes | `MessageBox` y labels de error | Modal/toast/mensajes inline | Usar patrón actual; migrar solo texto, severidad y confirmación |

### Qué debe conservarse del frontend actual

- La entrada de cada proceso desde `CoorinDashboard` y `CoorinSidebar`.
- Los modales existentes y su sincronización con URL mediante `useDashboardModalUrlSync`.
- La composición por piezas, especialmente en captura de visitas (`CaptureVisit` y `CapturaVisitsF2`–`F7`).
- `userStore` para sesión, jerarquía y permisos.
- `catalogStore`/`useCatalogOptions` para carteras, productos y valores de catálogo.
- Los servicios por dominio y el cliente Axios compartido.
- Los componentes visuales actuales, incluyendo selects flotantes, inputs, loaders, modales y estilos Coorin.
- El enfoque de `PendingAuditForm` para pantallas cuyo contrato aún no está confirmado.

### Qué debe adaptarse del legacy

1. **Reglas de negocio:** rangos de fechas, campos obligatorios, relaciones entre controles, valores excluidos y restricciones por cartera.
2. **Estados de interacción:** cuándo se habilita una sección, cuándo aparece un botón y qué datos se limpian al cambiar una selección.
3. **Payloads y respuestas:** nombres de propiedades, identificadores y transformaciones requeridas por cada endpoint verificado.
4. **Acciones de tabla:** selección, edición, eliminación, cierre y acciones masivas por registro.
5. **Flujos de archivo:** extensiones, tamaño, preview, orden de procesamiento y mensajes de resultado.
6. **Confirmaciones:** acciones destructivas y advertencias de datos incompletos.
7. **Accesibilidad operativa:** Enter, foco inicial, foco en errores y navegación por teclado.

### Qué no debe migrarse literalmente

- Clases `Form`, `InitializeComponent` y el diseñador WinForms.
- Consultas SQL, `DataTable`, `DataRow` y filtros de `DataView`.
- Eventos `SelectedIndexChanged` o `KeyPress` como arquitectura de estado.
- Manipulación directa de `Visible`, `Enabled` y colores para representar reglas.
- Un componente gigante que concentre búsqueda, captura, catálogos, tabla y API.
- Drag & drop, si no existe evidencia funcional adicional; el legacy auditado no muestra una dependencia de arrastre nativo.

## 12. Patrón recomendado para cada formulario actual

Cada proceso nuevo debe dividirse, como mínimo, en cuatro responsabilidades:

```text
Vista/modal actual
  ├─ hook de flujo y estado local
  ├─ schema Zod y normalización
  ├─ servicio de dominio/API
  └─ componentes de campos, tabla y mensajes
```

Ejemplo de distribución:

```text
src/views/dashboard/sideBar/processes/<dominio>/<Formulario>.jsx
src/hooks/use<Formulario>Logic.js
src/schemas/formSchemas.js
src/services/<dominio>/<Dominio>Service.js
src/forms/formContracts.js
```

El hook debe orquestar la pantalla, pero no conocer detalles visuales del modal. El servicio no debe mostrar toasts ni modificar estado React. El schema no debe llamar la API. El componente de tabla debe recibir filas, columnas y acciones por props.

## 13. Secuencia de adaptación recomendada

1. Tomar una pantalla ya integrada en el frontend actual, preferentemente visitas o gestiones.
2. Comparar su flujo actual contra los eventos y reglas del formulario legacy equivalente.
3. Registrar únicamente las diferencias funcionales comprobadas.
4. Incorporar la regla en el hook, schema o servicio que corresponda.
5. Evitar crear una nueva abstracción si el frontend actual ya resuelve el comportamiento.
6. Probar el flujo completo desde sidebar/modal, incluyendo cierre, reapertura y cambios de cartera.
7. Replicar el patrón en formularios del mismo dominio.

La migración debe hacerse por familias funcionales, no por copia individual de las 92 ventanas legacy:

| Familia | Base actual a reutilizar | Adaptación principal |
|---|---|---|
| Visitas | `CaptureVisit`, `ConsultaVisits`, servicios de visitas | reglas de cuenta/expediente, domicilios, fechas y captura por secciones |
| Gestiones | componentes de procesos y servicios Loki existentes | carga, consulta, edición y filtros por fecha/cartera |
| Consultas | modales de información y grids actuales | filtros del legacy y columnas técnicas/dinámicas |
| Administración | modales y componentes CRUD existentes | permisos, catálogos, edición por fila y confirmaciones |
| Reportes | tablas, exportación `xlsx` y estados de carga | parámetros visibles por reporte y reglas de exportación |
| Especializados | `PendingAuditForm` como límite seguro | auditar primero; no habilitar campos sensibles por inferencia |

## 14. Resultado esperado

El resultado debe sentirse como CoorinWeb: navegación por sidebar, modales, componentes React y estados visuales actuales, pero con la precisión funcional del legacy en los puntos donde sí existe evidencia. La compatibilidad se mide por comportamiento y contrato, no por conservar la forma interna de la aplicación WinForms.
