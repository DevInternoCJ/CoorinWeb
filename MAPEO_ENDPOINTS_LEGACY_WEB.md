# Mapeo Legacy ↔ Backend Web ↔ Frontend React

## Alcance

Fuentes revisadas:

- `Endpoints/Consultas/realizarbusqueda.txt`
- `Endpoints/Consultas/guardarconsulta.txt`
- `Endpoints/Consultas/cargar filas de trabajo cuentas.txt`
- Grafo legacy: `legacy-forms-graphify-out/graph.json`

## Consulta de cuentas y generales

| Legacy | Endpoint web | Frontend React | Servicio recomendado |
|---|---|---|---|
| `frmCuentas` / `frmGenerales` → Consultar | `POST /api/Busquedas/realizar-busqueda` | `ModalConsultaCuentas`, `QueryBuilder` | `ConsultationService.realizarBusqueda` |
| `frmCuentas` → Guardar consulta | `POST /api/Busquedas/guardar-consulta` | selector/acción Guardar | `ConsultationService.guardarConsulta` |
| `frmCuentas` → Consulta guardada | `GET/POST /api/Busquedas/consultas` | selector `cmbConsultas` | `ConsultationService.listarConsultas` |
| `frmCuentas` → Eliminar consulta | `DELETE /api/Busquedas/guardar-consulta/{idConsulta}` | acción Eliminar | `ConsultationService.eliminarConsulta` |
| `frmCuentas` → Cargar filas de trabajo | `POST /api/Busquedas/cargar-filas-trabajo` | `ModalSeleccionCampania` | `ConsultationService.cargarFilasTrabajo` |
| `frmCuentas` → Exportar | `POST /api/Reportes/generar-excel` | `ExcelDownloader` | `ReportService.generarExcel` |

## Payload de búsqueda

El formato legacy observado contiene:

```json
{
  "servidor": "Albaz",
  "idCartera": 1,
  "idProducto": 1,
  "desdeFecha": "2025-10-01",
  "esDetalleResultado": true,
  "parametros": [],
  "agrupar": []
}
```

El frontend debe normalizar cada parámetro antes de enviarlo:

```js
{
  concepto: "Cuenta",
  campo: "Situación",
  signo: "=",
  tipoValor: "catalogo",
  idCatalogo: 2,
  idValor: 1042
}
```

Reglas de adaptación:

- `≤` se envía como `<=`.
- `≥` se envía como `>=`.
- Catálogos: enviar `idValor` e `idCatalogo`, no el texto visible.
- Texto libre: enviar `valorTexto`.
- Conteos: enviar valores enteros.
- Fechas: normalizar a `yyyy-MM-dd`.
- No construir SQL en React.

## Consulta guardada

El ejemplo legacy de guardado requiere:

```json
{
  "nombreConsulta": "consulta",
  "idProducto": 1,
  "idCartera": 1,
  "desde": "2025-10-01",
  "idEjecutivo": 38988,
  "parametros": [],
  "agrupar": []
}
```

El `idEjecutivo` debe salir de la sesión autenticada; nunca debe quedar fijo en el frontend.

## Carga de filas de trabajo

Payload legacy identificado:

```json
{
  "idCampania": 102,
  "idConsulta": 26287,
  "idCartera": 1,
  "incluirCuenta": true,
  "incluirUsuario": false,
  "parametros": [],
  "agrupar": []
}
```

Equivalencia React:

- `idCampania`: campaña seleccionada.
- `idConsulta`: consulta guardada opcional.
- `idCartera`: cartera activa.
- `incluirCuenta`/`incluirUsuario`: switches de la UI.
- `parametros`/`agrupar`: reutilizar el estado del `QueryBuilder`.

## Catálogos relacionados

| Necesidad | Endpoint | Store |
|---|---|---|
| Carteras | `GET /api/campañas/carteras` | `catalogStore.carteras` |
| Productos | `GET /api/campañas/carteras-productos` | `catalogStore.productos` |
| Bootstrap de consultas | `GET /api/Catalogo/cargaCatalogos?servidor=Albaz` | `catalogStore.consultas` |
| Valores de catálogo | `GET /api/Catalogos/valores-catalogo` | `catalogStore.valores` |
| Columnas de producto | `GET /api/Catalogo/ColumnasProducto?servidor=Albaz&idProducto={id}` | `columnasPorProducto` |

## Flujo objetivo

```text
Login
  → cargar catálogos Albaz
  → seleccionar cartera
  → filtrar productos
  → seleccionar consulta guardada (opcional)
  → seleccionar concepto
  → cargar campos
  → cargar valor según campo
  → agregar parámetros
  → agregar agrupaciones
  → validar Zod
  → POST realizar-busqueda
  → mostrar resultado/exportar
```

## Pendientes de implementación

1. Crear `ConsultationService` para separar consultas de `LokiServices`.
2. Confirmar nombres finales de rutas de guardar/listar/eliminar con OpenAPI.
3. Añadir `idCatalogo` al DTO backend si `/valores-catalogo` no lo devuelve.
4. Conectar consultas guardadas a `catalogStore.consultas` o a un slice específico.
5. Implementar guardado, actualización y eliminación desde el `QueryBuilder`.
6. Añadir cancelación de búsquedas y limpieza de resultados al cambiar cartera/producto.
7. Cubrir los payloads con schemas Zod y pruebas de contrato.
