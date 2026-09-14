# Auditoría de contratos de formularios

Fecha: 2026-09-10.

Esta auditoría cruza `CONTEXTO_FORMULARIOS_FRONTEND_COMPLETO.md` con los servicios presentes en
`src/services/mark/orochi/LokiServices.js`. La existencia de una pantalla legacy no se toma como
evidencia de una ruta HTTP.

## Contratos utilizables hoy

| Formulario | Operación | Ruta encontrada | Estado |
|---|---|---|---|
| `frmLogin` | autenticar | `/Auth/login` | verificado en servicio |
| `frmCapturaVisitas` | consultar cuenta/domicilio / guardar visita | `/procesos/visitas/captura/buscar-cuenta`, `/procesos/visitas/captura/guardar` | contrato documentado |
| `frmEditarVisitas` | buscar / editar | `/procesos/visitas/corregir/buscar`, `/procesos/visitas/corregir/editar` | contrato documentado |
| `frmEliminaVisitas` | eliminar por archivo | `/procesos/visitas/eliminar` | contrato documentado |
| `frmCargaGestionesTel` | cargar archivo | `/Gestiones/carga-llamadas` | verificado en servicio |
| `frmConsultaGestionesTel` | consultar/exportar | `/Gestiones/consulta-llamadas` | verificado en servicio |
| `frmEditarGestiones` | buscar / editar | `/Gestiones/gestiones-cuenta`, `/Gestiones/editar-gestiones` | verificado en servicio |
| `frmComentariosCuentas` | modificar / insertar expediente | `/Comentarios/modificar`, `/Comentarios/insertar-expediente` | verificado en servicio |
| `frmRevisiónSupervisor` | consultar / insertar / exportar | `/Supervisores/supervisores`, `/Supervisores/inserta-cuentas`, `/Supervisores/cuentas` | verificado en servicio |

## Hallazgos que bloquean escrituras

- La carga de visitas usa ahora `/procesos/visitas/carga`, separado de `/Gestiones/carga-llamadas`.
- Corregir y eliminar visitas tienen rutas documentadas; las pantallas nuevas ya pueden consumirlas después de validar el payload.
- Los marcadores de BBVA, HSBC, Daimler, correos y reportes no contienen controles ni contratos suficientes. Deben auditarse contra Designer/eventos legacy y backend antes de definir esquemas.
- Se consolidó la lectura del token con `getToken()` (`sessionStorage` primero y `localStorage` como compatibilidad) y la limpieza con `clearAuth()`. Ya no se sobrescriben métodos nativos de `localStorage`.

## Convención implementada

- Los esquemas viven en `src/schemas/formSchemas.js`.
- Las pantallas validan con `safeParse` antes de consultar o escribir.
- Fechas HTML se mantienen como `YYYY-MM-DD` y se normalizan a ISO al construir el request.
- Archivos admiten máximo 10 MB y extensiones explícitas.
- Las acciones sin endpoint comprobado se bloquean y muestran `pending-audit`.

## Catálogos y selects

`useCatalogStore` mantiene en `sessionStorage` los catálogos separados por identidad de sesión
(`loadedFor`), con estados `idle/loading/ready/error`. `LoginForm` dispara `loadCatalogs` después de
guardar el usuario; `logout` y `clearUserData` limpian la caché. `CatalogSelect` y
`useCatalogOptions` consumen esa caché, filtran productos por `idCartera` y muestran explícitamente
`Cargando catálogos…` o `Sin opciones`. Los DTO se normalizan en `CatalogService` y se validan con
Zod antes de entrar al store.
