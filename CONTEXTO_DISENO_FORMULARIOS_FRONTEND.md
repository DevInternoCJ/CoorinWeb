# Contexto de diseño consistente para formularios — CoorinWeb

## Propósito

Este documento define los componentes, estados visuales y reglas de interacción que deben reutilizarse al crear o ajustar formularios y modales. Su objetivo es preservar una experiencia consistente en modo claro y oscuro, evitando implementar controles nativos o estilos aislados cuando ya existe un componente compartido.

## Base de interfaz

- Usar Preline como base para botones, controles y accesibilidad.
- Usar únicamente tokens semánticos existentes: `bg-surface`, `bg-layer`, `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary` y `text-destructive`.
- No aplicar colores fijos para resolver modo claro/oscuro. Los valores de tema viven en `src/themes/coorin.css`.
- Los modales deben usar `ReusableModal`. Cada modal incluye título, icono, cierre accesible y un tamaño acorde con su contenido; evitar espacios verticales vacíos.

## Controles obligatorios

| Necesidad | Componente | Regla |
|---|---|---|
| Cartera | `CatalogSelect` con `type="cartera"` | El valor enviado es el `id` de la opción. Es requerido cuando el endpoint necesita `IdCartera`. |
| Producto dependiente | `CatalogSelect` con `type="producto"` e `idCartera` | Se deshabilita sin cartera y se limpia cuando ésta cambia. El valor es `idProducto`; puede ser opcional según contrato. |
| Catálogo general | `CatalogSelect` con `catalogId` | Enviar `idValor`, no la etiqueta, salvo que el DTO declare explícitamente texto. |
| Select estático | `FloatingSelect` | Las opciones tienen forma `{ value, label }`; validar `value`. |
| Texto, cuenta, número | `FloatingInput` | Usar el tipo HTML adecuado y helper/error del componente. |
| Fecha | `DatePicker` | Guarda y envía ISO `YYYY-MM-DD`; no sustituirlo por un `input type="date"` aislado. Definir `min`/`max` cuando aplique. |

## Patrón de formularios de reporte

1. Panel de filtros en `bg-surface` con borde `border-border`.
2. Controles en grid adaptable: una columna en móvil, dos en tamaño medio y cuatro cuando haya espacio.
3. Botón principal `bg-primary`, deshabilitado mientras se procesa la consulta.
4. Mensajes de validación o backend dentro de un bloque `bg-destructive/10` y `border-destructive/30`.
5. Área de resultados en `bg-layer`: encabezado, contador de registros y tabla con scroll interno.
6. Estados explícitos: inicial, cargando, vacío y error. Nunca mostrar una tabla vacía sin explicación.

## Controles en filas y columnas

- Los grupos de radios y controles cortos deben usar `grid` con columnas explícitas, nunca depender sólo de `flex-1` para distribuirlos.
- En pantallas compactas mantener cada opción dentro de su celda con `min-w-0` y texto truncable; el campo de captura debe ocupar una fila independiente debajo del grupo de opciones.

## Dependencias entre filtros

- Cartera es la fuente de productos y debe resolverse antes de habilitar Producto.
- Al cambiar un filtro padre se limpian los filtros dependientes y los resultados anteriores.
- No mostrar errores auxiliares de carga si ya existen opciones válidas en el catálogo.
- Validar ids numéricos y fechas antes de construir el body del endpoint.

## Integración y datos

- La etiqueta sirve exclusivamente para presentar información; los requests envían el `value`/id.
- Respetar el método y DTO documentados en `CONTEXTO_ENDPOINTS_BACKEND_COORINWEB.md`.
- Para fechas, normalizar siempre a ISO de fecha antes de enviar JSON: `YYYY-MM-DD` (por ejemplo, `2026-09-15`). No enviar horas, zonas horarias ni el texto mostrado por el datepicker.
- No inventar parámetros ni endpoints: si el contrato no está confirmado, dejar el flujo estático o marcarlo como pendiente de auditoría.

### Reportes con metadatos

- Para `frmReportesAlCliente`, cargar primero `/api/reportes-cliente/definiciones`.
- Producto es un control esencial y permanece siempre visible. `requiereProducto` sólo controla si es obligatorio. Los flags `requiereDesde` y `requiereHasta` controlan la visibilidad de fechas. Tomar `idCartera` de la definición como valor inicial de Cartera.
- El selector de reportes muestra el campo `reporte`; una vez seleccionado, presentar `descripcion` debajo de los filtros como texto de ayuda, sin usarlo como valor del select.
- El botón de descarga debe permanecer dentro del panel de filtros, deshabilitado mientras falten requeridos o haya una descarga en curso. La respuesta binaria se descarga usando el nombre de `Content-Disposition` cuando exista.

## Referencias de implementación

- Catálogos: `src/components/Select/CatalogSelect.jsx`
- Fechas: `src/components/Select/DatePicker.jsx`
- Modal: `src/views/dashboard/board/modalGlobalReboot/ReusableModal.jsx`
- Patrón Día del Ejecutivo: `src/views/dashboard/board/consultations/DayExecutive/ModalDayExecutive.jsx`
- Patrón Lista Negra: `src/views/dashboard/sideBar/consultations/DarkList.jsx`
