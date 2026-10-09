# Arquitectura CoorinWeb

Diagrama revisado el 7 de octubre de 2026 sobre el estado actual del directorio de trabajo.

- `coorinweb-arquitectura.tldr`: diagrama nativo editable. Abrir en https://www.tldraw.com con el menú de archivo → abrir, y ajustar el zoom al contenido.
- `coorinweb-arquitectura.svg`: vista completa para documentación y consulta.
- `generar-diagrama.mjs`: regenera ambos archivos con `node docs/arquitectura/generar-diagrama.mjs` desde la raíz.
- `tldraw-schema.json`: esquema del ejemplo oficial de snapshots de tldraw, utilizado para generar registros migrables.

El documento contiene 12 bloques, textos editables y 14 segmentos de conexión. Las flechas representan dependencias o solicitudes; las respuestas regresan por las mismas capas. Los conectores son posiciones absolutas, por lo que deben ajustarse al reorganizar bloques.

## Evidencia

Entrada y rutas: `src/main.jsx`, `src/App.jsx` y `src/utils/ProtectedRoute.jsx`.

Estado: `src/contextGlobal/userStore.js`, `catalogStore.js` y `themeStore.js`. Catálogos persisten explícitamente en sessionStorage; el cliente HTTP consulta sessionStorage con respaldo en localStorage. La entrada implementa sincronización entre pestañas mediante una señal transitoria en localStorage.

Contratos: `src/schemas/formSchemas.js`, `src/forms/formContracts.js`, `src/forms/queryAdapters.js` y `src/hooks/useZodValidation.js`.

Integración: `src/services/catalogs/CatalogService.js`, `src/services/consultations/ConsultationService.js`, `src/services/visits/VisitService.js`, `src/services/reports/dayExecutiveService.js`, `src/services/mark/login/AuthServices.js`, implementaciones Loki de `orochi` y `albaz`, `src/loki/apiConfig.js` y `src/config/backend.js`.

Contexto funcional y backend: `CONTEXTO_FORMULARIOS_FRONTEND_COMPLETO.md`, `CONTEXTO_ENDPOINTS_BACKEND_COORINWEB.md`, `MAPEO_ENDPOINTS_LEGACY_WEB.md` y el informe existente `legacy-forms-graphify-out/GRAPH_REPORT.md`. El grafo legacy orienta la migración; el código actual define las relaciones del frontend. No se regeneraron los grafos.

`ACTIVE_SERVER = "albaz"` es un selector de datos, distinto de la URL base `VITE_API_URL`. La carpeta `orochi` sigue siendo una dependencia real y su nombre no demuestra el servidor seleccionado por cada endpoint. El backend C# está documentado en el contexto local; no se verificaron su implementación, bases de datos ni despliegue. Los contratos pendientes se muestran mediante `PendingAuditForm` y no se dan por implementados.

## Validación

El archivo `.tldr` pasó migración de esquema y validación de sus 59 registros con `createTLSchema()` del paquete oficial `@tldraw/tlschema`, instalado temporalmente fuera del proyecto. No se cambiaron dependencias ni código de aplicación.

Formato y esquema basados en fuentes oficiales:

- https://tldraw.dev/reference/tldraw/TldrawFile
- https://github.com/tldraw/tldraw/blob/main/apps/examples/src/examples/editor-api/snapshots/snapshot.json
