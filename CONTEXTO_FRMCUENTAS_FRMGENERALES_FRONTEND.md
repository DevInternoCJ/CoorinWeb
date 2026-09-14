# Contexto frontend: `frmCuentas` y `frmGenerales`

Fecha de revisión: 2026-09-10.

Fuentes legacy:

- `Forms/Menú/2 Consulta/frmCuentas.cs`
- `Forms/Menú/2 Consulta/frmGenerales.cs`

## 1. `frmCuentas`

### Propósito

Es un constructor de consultas parametrizadas sobre cuentas. Permite seleccionar cartera y producto, construir filtros mediante concepto/campo/operador/valor, agregar parámetros a una tabla, agrupar campos, ejecutar la búsqueda, guardar consultas y exportar resultados.

### Flujo

1. Carga carteras y productos.
2. Filtra productos por la cartera seleccionada.
3. Oculta cartera o producto si vienen fijados por el perfil del ejecutivo.
4. Carga consultas guardadas filtradas por producto.
5. El concepto determina los campos disponibles.
6. El campo determina el origen y tipo del valor.
7. `Agregar` añade una fila al grid de parámetros.
8. `Agrupar` añade campos al grid de agrupaciones.
9. `Consultar` valida la configuración y ejecuta la búsqueda.
10. `Guardar` persiste la consulta.
11. `Exportar` descarga los resultados.

### Selects

| Control | Value | Label | Fuente/condición |
|---|---|---|---|
| `cmbCarteras` | `idCartera` | `Cartera` | `/api/campañas/carteras` o bootstrap de catálogos |
| `cmbProductos` | `idProducto` | `Producto` | productos filtrados por `idCartera` |
| `cmbConsultas` | `idConsulta` | `NombreConsulta` | consultas del ejecutivo filtradas por producto |
| `cmbConceptos` | texto funcional | texto funcional | define el grupo de campos |
| `cmbCampos` | nombre de campo | nombre de campo | columnas de producto o campos funcionales |
| `cmbSignos` | `Signo` | `Texto` | operadores de comparación |
| `cmbValores` | `idValor` o texto | `Valor` o texto | catálogo, booleano, columna o entrada libre |

### Catálogos de `cmbValores`

| Campo | Fuente |
|---|---|
| Situación | `idCatalogo = 2` |
| Nivel | `idCatalogo = 4` |
| Sucursal | `idCatalogo = 1` |
| CausaNoPago | `idCatalogo = 10` |
| Bloqueo | `TablaBit()` |
| RFC y otros textos | entrada libre |

### Reglas de cambio

- Cambiar cartera filtra productos y reinicia campos, valores, parámetros y resultados incompatibles.
- Cambiar producto filtra consultas guardadas y carga columnas del producto.
- Cambiar concepto reconstruye `cmbCampos`.
- Cambiar campo reconstruye `cmbValores`.
- Si el valor proviene de catálogo, se envía `idValor`, no el texto visible.
- Si el campo es libre, se envía `valorTexto`.
- Los resultados anteriores se limpian antes de una nueva consulta.
- Durante la consulta se deshabilitan acciones y se muestra loader.

### Agregado de parámetros

`Agregar` recibe:

```ts
{
  concepto,
  campo,
  signo,
  valorTexto?,
  idValor?,
  idCatalogo?,
  tipoValor
}
```

Validaciones:

- cartera válida;
- producto válido cuando aplica;
- concepto, campo y operador seleccionados;
- `idValor` obligatorio para campos catalogados;
- `valorTexto` obligatorio para campos libres;
- campo compatible con el producto;
- evitar filtros duplicados incompatibles.

```ts
import * as z from "zod";

export const cuentaParameterRowSchema = z.object({
  concepto: z.string().trim().min(1),
  campo: z.string().trim().min(1),
  signo: z.string().trim().min(1),
  valorTexto: z.string().optional(),
  idValor: z.coerce.number().int().positive().optional(),
  idCatalogo: z.coerce.number().int().positive().optional(),
  tipoValor: z.enum(["catalogo", "texto", "numero", "fecha", "bit", "columna"]),
}).superRefine((value, ctx) => {
  if (value.tipoValor === "catalogo" && !value.idValor) {
    ctx.addIssue({
      code: "custom",
      path: ["idValor"],
      message: "Seleccione un valor de catálogo.",
    });
  }
  if (value.tipoValor !== "catalogo" && !value.valorTexto?.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["valorTexto"],
      message: "Capture un valor.",
    });
  }
});
```

### Agrupación

La agrupación es independiente de los filtros. El usuario selecciona un campo y lo agrega al grid de agrupaciones. Cada fila puede eliminarse. La consulta envía parámetros y agrupaciones por separado.

### Consultas guardadas

`cmbConsultas` consume `Ejecutivo.Consultas`. Al seleccionar una consulta:

- limpia el resultado actual;
- recupera parámetros y agrupaciones;
- reconstruye los selects;
- habilita guardar/actualizar si existe una consulta válida.

## 2. `frmGenerales`

### Propósito

Comparte el constructor de consultas de `frmCuentas`, pero consulta información relacionada con la cuenta: teléfonos, gestiones, negociaciones, seguimientos y chats.

### Diferencias

| Aspecto | `frmCuentas` | `frmGenerales` |
|---|---|---|
| Alcance | datos y atributos de cuenta | actividad y relaciones de la cuenta |
| Conceptos | principalmente Cuenta | Teléfonos, Gestiones, Negociaciones, Seguimientos, Chats |
| Producto | filtra columnas y consultas | filtra consultas por productos de la cartera y consultas de cartera |
| Valores | catálogos básicos y texto | catálogos, booleanos, municipios, herramientas y texto |

### Catálogos por concepto

| Concepto/campo | Fuente |
|---|---|
| Teléfonos → Clase | `idCatalogo = 12` |
| Teléfonos → Telefonía | `idCatalogo = 23` |
| Teléfonos → Origen | `idCatalogo = 24` |
| Teléfonos → Confirmado | `TablaBit()` |
| Gestiones → Contacto | `idCatalogo = 5`, nivel `1601` |
| Gestiones → Situación | `idCatalogo = 2` |
| Gestiones → Sucursal | `idCatalogo = 1` |
| Gestiones → Modo | `idCatalogo = 21` |
| Gestiones → Acercamiento | `idCatalogo = 8` |
| Gestiones → Parentesco | `idCatalogo = 11` |
| Gestiones → CausaNoPago | `idCatalogo = 10` |
| Negociaciones → Estado | `idCatalogo = 9` |
| Negociaciones → CartaConvenio | `TablaBit()` |
| Negociaciones → Herramienta | tabla de herramientas, `idHerramienta` |
| Negociaciones → TipoNegociación | `idCatalogo = 8` |
| Negociaciones → Modo | `idCatalogo = 21` |
| Seguimientos → Recordatorio/Realizado | `TablaBit()` |
| Chats → Salida | `TablaBit()` |
| Chats → Contacto | `idCatalogo = 5` |
| Chats → Etapa | `idCatalogo = 13`, nivel `2207` |
| Chats → Situación | `idCatalogo = 2` |
| Chats → Parentesco | `idCatalogo = 11` |
| Chats → CausaNoPago | `idCatalogo = 10` |
| Chats → Sucursal | `idCatalogo = 1` |
| Generales → Municipio | tabla de municipios, value/label `Municipio` |

Campos de fecha, hora, duración, montos, pagos, plazos, teléfonos, usuarios, comentarios y extensiones se capturan como texto, número o fecha; no deben convertirse automáticamente en dropdown.

## 3. Componente frontend compartido

Ambos formularios deben reutilizar un `QueryBuilder`, variando únicamente la definición de conceptos, campos y fuentes de valores.

```ts
export const accountQuerySchema = z.object({
  idCartera: z.coerce.number().int().positive(),
  idProducto: z.coerce.number().int().positive().optional(),
  idConsulta: z.coerce.number().int().positive().optional(),
  parametros: z.array(cuentaParameterRowSchema).min(1),
  agrupaciones: z.array(z.object({ campo: z.string().min(1) })).default([]),
  modo: z.enum(["contar", "detalle"]).default("detalle"),
});
```

### Endpoints relacionados

- GET `/api/Catalogo/cargaCatalogos`
- GET `/api/campañas/carteras-productos`
- GET `/api/Catalogo/ColumnasProducto?servidor=...&idProducto=...`
- POST `/api/Busqueda/realizar-busqueda`
- POST `/api/Busqueda/guardar-consulta`
- GET/POST `/api/Reportes/generar-excel`

El frontend debe enviar parámetros estructurados. Nunca debe enviar SQL construido desde los valores del usuario.

## 4. Especificación precisa de filtros de `frmCuentas.cs`

Esta sección prevalece sobre cualquier descripción genérica anterior. Está derivada de los eventos y métodos reales del formulario.

### Conceptos y campos que llenan `cmbCampos`

`cmbConceptos_SelectedIndexChanged` primero ejecuta `LimpiaParámetros()`: limpia el datasource de campos, elimina sus opciones, restablece signos, limpia resultados y conserva las tablas de parámetros/agrupación para que se reconstruyan de forma controlada.

| `cmbConceptos.Text` | Opciones exactas de `cmbCampos` | Signos |
|---|---|---|
| `Cuenta` | `Situación`, `Nivel`, `Sucursal`, `CausaNoPago`, `RFC`, `Bloqueo` | solo `=` y `≠` |
| `Producto` | columnas devueltas por `Catálogo.ProductoColumnas(cmbProductos.SelectedValue, cmbCarteras.SelectedValue)`; `ValueMember` y `DisplayMember` = `name` | lista completa de signos |
| `Conteos` | `Gestiones`, `Visitas`, `Chats`, `Comentarios`, `Negociaciones`, `Seguimientos`, `Teléfonos`, `Correos`, `Domicilios`, `Cartas`, `Blasters`, `Emails`, `SMSs`, `Telegramas`, `Pagos`, `SumaPagos` | lista completa de signos |
| `Fechas` | `Activación`, `Última gestión`, `Última visita`, `Última negociación`, `Último pago`, `Próximo seguimiento` | lista completa de signos |

Los signos se cargan como `{ value: Signo, label: Texto }`:

```ts
const signs = [
  { value: "<", label: "< menor" },
  { value: "≤", label: "≤ menor o Igual" },
  { value: "=", label: "= Igual" },
  { value: "≥", label: "≥ MAYOR o Igual" },
  { value: ">", label: "> MAYOR" },
  { value: "≠", label: "≠ Diferente" },
] as const;
```

Para `Cuenta`, el frontend debe mostrar únicamente `=` y `≠`.

### Condiciones exactas de `cmbValores`

`cmbCampos_SelectedIndexChanged` llama a `EstableceValores()`, que siempre limpia primero el datasource. El comportamiento es:

| Condición | Control de valor | Fuente |
|---|---|---|
| concepto = `Cuenta` y campo = `Situación` | dropdown, `value=idValor`, `label=Valor` | `idCatalogo=2` |
| concepto = `Cuenta` y campo = `Nivel` | dropdown | `idCatalogo=4` |
| concepto = `Cuenta` y campo = `Sucursal` | dropdown | `idCatalogo=1` |
| concepto = `Cuenta` y campo = `CausaNoPago` | dropdown | `idCatalogo=10` |
| concepto = `Cuenta` y campo = `Bloqueo` | dropdown | `TablaBit()` |
| concepto = `Cuenta` y campo = `RFC` | entrada simple | texto libre |
| concepto = `Producto` | entrada simple por defecto | el tipo depende de la columna y del operador |
| concepto = `Conteos` | entrada numérica | cantidad entera |
| concepto = `Fechas` | entrada de fecha | fecha válida |

Cuando no se cumple la rama de `Cuenta`, `cmbValores` usa `ComboBoxStyle.Simple`; el frontend debe representarlo como input, no como select.

### Condiciones de cartera y producto

- `cmbCarteras`: `idCartera`/`Cartera`.
- `cmbProductos`: `idProducto`/`Producto`, filtrado por `idCartera`.
- Si el perfil contiene `idCartera`, el selector de cartera se oculta.
- Si el perfil contiene `idProducto`, el selector de producto se oculta.
- Si la cartera es `4`, aparece `chkGeneral`; marcado deshabilita producto y usa consultas con `ISNULL(idProducto,0)=0`.
- Si la cartera es `31` y tiene columnas de cartera, también aparece `chkGeneral` y se permite alternar vista general/producto.
- Para otras carteras con columnas de cartera, producto puede ocultarse y las consultas se filtran por `idCartera`.
- Al cambiar cartera, `Catálogo.CargaColumnasProducto(null, idCartera)` carga columnas de cartera.
- Al cambiar producto, `Catálogo.CargaColumnasProducto(idProducto, null)` carga columnas de producto.

### Agregado de parámetros y restricciones

El formulario identifica cada fila por la combinación `(Concepto, Campo)`. Por tanto, un campo puede tener varios operadores/valores dentro de la misma fila, pero no se crea una fila duplicada.

Antes de agregar:

1. Convierte `≤` a `<=` y `≥` a `>=` para la expresión interna.
2. Elimina comillas simples del valor.
3. Si ya existe el campo, impide combinar desigualdades en el mismo sentido: si ya hay `>`, no acepta `=` ni otro `>`; si ya hay `<`, no acepta `=` ni otro `<`.
4. Si ya existe `≠`, solo permite agregar más `≠`.
5. Si ya existe `=`, solo permite agregar más `=`.
6. Impide repetir exactamente el mismo parámetro.

Reglas por concepto:

| Concepto | Validación | Tipo interno |
|---|---|---|
| `Cuenta` + catálogo | no repetir el mismo `idValor` en la fila | `list` |
| `Cuenta` + `RFC` | compara texto entre comillas y no permite repetirlo | `char` |
| `Producto` | según columna; `>`/`<` requieren número o fecha; fechas se normalizan a `yyyy-MM-dd` | `char`, `int` o `date` |
| `Conteos` | solo enteros | `int` |
| `Fechas` | fecha parseable, normalizada a `yyyy-MM-dd` | `date` |

Schema recomendado:

```ts
export const cuentaFilterSchema = z.object({
  concepto: z.enum(["Cuenta", "Producto", "Conteos", "Fechas"]),
  campo: z.string().min(1),
  signo: z.enum(["<", "≤", "=", "≥", ">", "≠"]),
  tipo: z.enum(["list", "char", "int", "date"]),
  idCatalogo: z.number().int().positive().optional(),
  idValor: z.number().int().positive().optional(),
  valor: z.string().min(1),
});
```

### Conteos y periodo

Si existe un parámetro o agrupación con concepto `Conteos`, se muestran `dtpDesde` y `lblPeriodo`. La fecha se inicializa desde la consulta guardada o se usa la fecha actual. Si no hay `Conteos`, el periodo se oculta y el resultado anterior se limpia.

### Búsqueda, modo y resultado

- Antes de buscar se ejecuta `ValidaColumnasProducto`; si falla, no se llama al backend.
- `rdoDetalle` produce detalle y exportación Excel; si hay más de 1000 filas no se carga todo el grid visual.
- El modo contar ordena el resultado, agrega porcentajes de `Cuentas` y `Saldo`, y agrega fila de totales.
- Durante la búsqueda se oculta/deshabilita consultar y se muestra loader.
- Al cerrar se cancela la consulta en ejecución.

### Contrato frontend equivalente

```ts
export const cuentaQueryFormSchema = z.object({
  idCartera: z.coerce.number().int().positive(),
  idProducto: z.coerce.number().int().positive().optional(),
  idConsulta: z.coerce.number().int().positive().optional(),
  concepto: z.enum(["Cuenta", "Producto", "Conteos", "Fechas"]),
  campo: z.string().min(1),
  signo: z.enum(["<", "≤", "=", "≥", ">", "≠"]),
  valor: z.string().min(1),
  idValor: z.coerce.number().int().positive().optional(),
  parametros: z.array(cuentaFilterSchema),
  agrupaciones: z.array(z.object({ concepto: z.string(), campo: z.string() })),
  fechaDesde: z.coerce.date().optional(),
  modo: z.enum(["contar", "detalle"]),
});

## 5. Fuente real de datos de cada dropdown

El problema de los dropdowns vacíos no se resuelve solo con `idCatalogo`: `frmCuentas` recibe parte de sus opciones de la caché legacy `Catálogo` y de `Ejecutivo.Consultas`. En el frontend deben existir estas cargas, en este orden:

### 5.1 Cartera y producto

En legacy:

```text
Catálogo.Carteras
Catálogo.Productos
```

En Loki, la fuente equivalente es `GET /api/Catalogo/cargaCatalogos?servidor=...`, que consulta:

```sql
SELECT idCartera AS Id, Cartera AS Nombre
FROM vw_CarterasActivas;

SELECT idProducto AS Id, Producto AS Nombre, idCartera AS IdCartera
FROM dbCollection..vw_CarterasProductos;
```

También existe `GET /api/campañas/carteras` y `GET /api/campañas/carteras-productos`, pero el frontend debe elegir una fuente única para no mezclar nombres de propiedades.

Adaptación obligatoria para el componente:

```ts
type ApiCartera = { id: number; nombre: string };
type ApiProducto = { id: number; nombre: string; idCartera: number };

const carteras = api.Carteras.map((x: ApiCartera) => ({
  value: x.id,
  label: x.nombre,
}));

const productos = api.Productos
  .filter((x: ApiProducto) => x.idCartera === selectedCarteraId)
  .map((x) => ({ value: x.id, label: x.nombre }));
```

No asumir que la respuesta del endpoint web ya se llama `idCartera/Cartera`: el servicio actual de consulta devuelve `Id/Nombre`. Si se decide conservar los nombres legacy, el adaptador debe renombrarlos explícitamente.

### 5.2 Consultas guardadas

En legacy:

```text
Ejecutivo.Consultas
ValueMember = idConsulta
DisplayMember = NombreConsulta
```

La fuente SQL es la tabla `Consultas`, con estas columnas:

```sql
SELECT idConsulta, idProducto, idCartera, NombreConsulta, Desde
FROM Consultas;
```

El frontend debe filtrar:

```ts
const consultasVisibles = consultas.filter((q) =>
  q.idProducto === selectedProductoId || q.idCartera === selectedCarteraId
);
```

Al seleccionar una consulta, se deben cargar sus dos conjuntos relacionados:

```sql
SELECT Concepto, Campo, Valores, Parámetros AS Parametros, Dato
FROM ConsultaParámetros
WHERE idConsulta = @idConsulta;

SELECT Concepto, Campo, Concepto AS Origen
FROM ConsultaAgrupar
WHERE idConsulta = @idConsulta;
```

Estas consultas son las que llenan `dgvParámetros` y `dgvAgrupar`; no son opciones del catálogo general.

### 5.3 Conceptos

`cmbConceptos` no consulta ningún endpoint. Sus opciones están hardcodeadas en `frmCuentas.designer.cs`:

```text
Cuenta
Producto
Conteos
Fechas
```

El frontend debe declarar esas cuatro opciones localmente.

### 5.4 Campos

Los campos tampoco tienen una única fuente:

- `Cuenta`: opciones locales `Situación`, `Nivel`, `Sucursal`, `CausaNoPago`, `RFC`, `Bloqueo`.
- `Producto`: consulta las columnas de la tabla `Producto_{idProducto}`, excluye `idcuenta` y ordena por nombre.
- `Conteos`: opciones locales exactas de actividad.
- `Fechas`: opciones locales exactas de fechas de actividad.

Endpoint equivalente para columnas de producto:

`GET /api/Catalogo/ColumnasProducto?servidor=...&idProducto=...`

El servicio actual ejecuta:

```sql
SELECT LOWER(name)
FROM dbCollection.sys.columns
WHERE object_id = OBJECT_ID('Y.' + @TableName)
  AND name <> 'idcuenta'
ORDER BY name;
```

La respuesta actual es `string[]`, no objetos `{name}`. Por eso el adaptador debe convertir cada string a `{ value: name, label: name }`.

### 5.5 Signos

`cmbSignos` tampoco consulta backend. Se crea localmente en `PreparaVentana()` con seis opciones: `<`, `≤`, `=`, `≥`, `>`, `≠`. Para concepto `Cuenta`, el evento de concepto filtra el datasource a `=` y `≠`.

### 5.6 Valores

`cmbValores` se reconstruye cuando cambia `cmbCampos`:

| Concepto | Campo | Consulta/fuente |
|---|---|---|
| Cuenta | Situación | valores donde `idCatálogo = 2` |
| Cuenta | Nivel | valores donde `idCatálogo = 4` |
| Cuenta | Sucursal | valores donde `idCatálogo = 1` |
| Cuenta | CausaNoPago | valores donde `idCatálogo = 10` |
| Cuenta | Bloqueo | tabla local de booleanos `TablaBit()` |
| Cuenta | RFC | input libre |
| Producto | cualquier columna | input libre, numérico o fecha según comparación |
| Conteos | cualquier campo | input entero |
| Fechas | cualquier campo | input fecha |

El endpoint `/api/Catalogos/valores-catalogo` devuelve valores globales, pero el servicio actual de consulta no expone en `CatalogosDTO` el `idCatálogo`; únicamente devuelve `IdValor`, `Valor` y `Detalle`. Para poder filtrar por `idCatalogo` desde el frontend, el backend debe agregar `IdCatalogo` a `CatalogosDTO` y a la proyección SQL, o crear un endpoint `GET /api/Catalogos/valores-catalogo/{idCatalogo}`.

### 5.7 Resumen de por qué se llenan o no se llenan

| Dropdown | ¿Consulta endpoint? | Dependencia |
|---|---|---|
| Conceptos | No | lista local del Designer |
| Carteras | Sí | bootstrap de catálogos y JWT/servidor |
| Productos | Sí | carteras cargadas; filtro `idCartera` |
| Consultas | Sí | consultas del ejecutivo; filtro `idProducto/idCartera` |
| Campos | Mixto | concepto local o columnas de producto |
| Signos | No | lista local del formulario |
| Valores | Mixto | `idCatalogo`, `TablaBit`, columnas o input libre |

La causa más probable de un dropdown vacío es una de estas: bootstrap no ejecutado después del login; propiedades `Id/Nombre` consumidas como `idCartera/Cartera`; productos no filtrados con el `idCartera` correcto; columnas solicitadas sin `idProducto`; consultas no cargadas; o valores globales sin `idCatalogo` para poder filtrarlos.
```
