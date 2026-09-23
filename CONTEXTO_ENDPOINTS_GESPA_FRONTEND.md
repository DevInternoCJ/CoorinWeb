# Contexto de endpoints Gespa para CoorinWeb

Fecha de actualización: 2026-09-15
Fuente: OpenAPI publicado por Scalar en http://192.168.7.33:8080/openapi/v1.json

## Reglas generales

- Los selects envían el ID; la etiqueta visible es solo presentación.
- Las fechas nuevas se manejan en UI como YYYY-MM-DD.
- El servidor puede enviarse como null cuando la sesión no lo proporciona.
- No asumir una estructura de respuesta cuando Scalar no publica esquema para 200.
- Las acciones de escritura deben bloquearse durante la petición y confirmar el resultado.

## Definición de cuentas

### POST /api/DefinicionGespaBusca/Buscar

Request: DefinicionBusqueda

    {
      "idCuenta": "string",
      "idCartera": 1,
      "criterioBusqueda": "string",
      "servidor": null
    }

### POST /api/DefinicionGespaBusca/Define

Request: Define

    {
      "idCartera": "1",
      "idEjecutivo": "1",
      "selector": "Definir",
      "idSituacion": "1012",
      "idCuenta": "string",
      "comentario": "string",
      "servidor": null
    }

idCartera, idEjecutivo, idSituacion e idCuenta son strings según el DTO publicado. La situación debe enviarse por ID. El legacy excluye el valor 1012 en operación individual y lo utiliza para redefinir.

## Arrepentimientos

### POST /api/ArrepentimientosGespa/Buscar

Usa DefinicionBusqueda:

    {
      "idCuenta": "string",
      "idCartera": 1,
      "criterioBusqueda": "Cuenta",
      "servidor": null
    }

### POST /api/ArrepentimientosGespa/Arrepentimiento

Request: Arrepentimiento

    {
      "idCartera": 1,
      "idCuenta": "string",
      "idEjecutivo": 1,
      "concepto": "string",
      "dato": "string",
      "fechaInsert": "2026-09-15T00:00:00",
      "segundoInsert": null,
      "fechaHoraInsert": "2026-09-15T00:00:00",
      "servidor": null
    }

## Bloqueo de cuentas

### POST /api/BloqueoCuentasGespa/Buscar
### POST /api/BloqueoCuentasGespa/Bloqueo

Ambos usan BloqueoCuentasBusqueda:

    {
      "idCuenta": "string",
      "idCartera": 1,
      "idEjecutivo": "1",
      "comentarios": "string",
      "bloqueo": true,
      "servidor": null
    }

bloqueo true bloquea y false desbloquea.

## Cargos en línea

### POST /api/CargoEnLineaGespa/BusquedaAutorizar

Request: CargoEnLineaGespaAutorizarBuscar:

    {
      "selector": "Pendientes",
      "idCartera": 1,
      "servidor": null
    }

### POST /api/CargoEnLineaGespa/EjecutaAutorizar

Request: CargoEnLineaAutorizar:

    {
      "selector": "Autorizar",
      "idCartera": "1",
      "fechaInicial": "2026-09-15",
      "fechaFinal": "2026-09-15",
      "autorizacion": "string",
      "idEjecutivo": "1",
      "idCuenta": "string",
      "fechaInsert": "2026-09-15",
      "segundoInsert": "string",
      "motivo": "string",
      "servidor": null
    }

### POST /api/CargoEnLineaGespa/BusquedaCorregir

Request: CargoEnLineaCorregirBuscar:

    {
      "selector": "Pendientes",
      "idCartera": 1,
      "servidor": null
    }

### POST /api/CargoEnLineaGespa/EjecutaCorregir

Request: CargoEnLineaCorregir:

    {
      "idCartera": 1,
      "idCuenta": "string",
      "segundoInsert": "string",
      "tarjeta": "string",
      "vencimiento": "string",
      "autorizacion": "string",
      "monto": 0,
      "recurrente": "string",
      "fechaInsert": "string",
      "servidor": null
    }

## Estados de cuenta

### POST /api/EstadosDeCuentaGespa/EstadosDeCuenta

Request: EstadosDeCuenta:

    {
      "fechaDesde": "2026-09-15",
      "fechaHasta": "2026-09-15",
      "idCartera": 1,
      "servidor": null
    }

### POST /api/EstadosDeCuentaGespa/EstadosDeCuenta/Modificar

Request: EstadosDeCuentaGespaModificar:

    {
      "idCuenta": "string",
      "fechaInsert": "string",
      "hora": "00:00:00",
      "servidor": null
    }

La modificación se realiza por registro. El nombre contractual es fechaInsert, no fecha.

## Respuestas

Scalar publica 200 OK para estas operaciones, pero no publica esquema de respuesta. Los formularios deben normalizar respuestas tolerando:

    const rows = Array.isArray(response)
      ? response
      : response?.data ?? response?.datos ?? response?.Tabla1 ?? [];

No agregar propiedades al request basándose únicamente en columnas de respuesta.

## Catálogos y reglas heredadas

| Formulario | Catálogo o control |
|---|---|
| Definición | Cartera y situación; situación usa valores de catálogo y la operación individual excluye 1012 |
| Arrepentimientos | Cartera y criterio de búsqueda/concepto |
| Bloqueo | Cartera y estado de bloqueo |
| Cargos en línea | Cartera y selector de autorización/corrección |
| Estados de cuenta | Cartera y rango de fechas |

Reutilizar CatalogSelect, FloatingSelect, FloatingInput y DatePicker. Al cambiar cartera se deben limpiar cuenta, resultados y acciones dependientes.

## Servicios

Los servicios deben usar Axios, devolver response.data y no mostrar toasts ni modificar estado React. Las rutas son:

    /DefinicionGespaBusca/Buscar
    /DefinicionGespaBusca/Define
    /ArrepentimientosGespa/Buscar
    /ArrepentimientosGespa/Arrepentimiento
    /BloqueoCuentasGespa/Buscar
    /BloqueoCuentasGespa/Bloqueo
    /CargoEnLineaGespa/BusquedaAutorizar
    /CargoEnLineaGespa/EjecutaAutorizar
    /CargoEnLineaGespa/BusquedaCorregir
    /CargoEnLineaGespa/EjecutaCorregir
    /EstadosDeCuentaGespa/EstadosDeCuenta
    /EstadosDeCuentaGespa/EstadosDeCuenta/Modificar

