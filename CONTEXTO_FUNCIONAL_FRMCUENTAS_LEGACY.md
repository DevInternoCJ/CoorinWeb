# Contexto funcional detallado: `frmCuentas`

## Propósito y alcance

`frmCuentas` es una pantalla para construir, guardar y ejecutar consultas de cuentas. El usuario define una consulta con filtros (grilla **Parámetros**) y dimensiones de agrupación (grilla **Agrupar**), selecciona el tipo de resultado (conteo o detalle), ejecuta la búsqueda y, según el resultado, visualiza datos o exporta un archivo Excel. También permite cargar las cuentas resultantes a una fila de trabajo.

Este documento se basa en `Forms/Menú/2 Consulta/frmCuentas.cs` y su diseñador. Los métodos internos de `Ejecutivo` y `Catálogo` son dependencias externas al formulario y no se encontraron implementaciones de ellos dentro del árbol `Forms`; donde la lógica sólo puede confirmarse por la llamada se indica expresamente.

## Modelo mental de la pantalla

La consulta se construye con esta secuencia:

1. Determinar cartera y, cuando aplique, producto o modo general.
2. Elegir un **Concepto**: Cuenta, Producto, Conteos o Fechas.
3. El formulario repuebla **Campo** según concepto y cartera/producto.
4. Elegir signo y valor para agregar un filtro; o pulsar **Agregar** en la sección de agrupación para añadir el campo a `Agrupar`.
5. Opcionalmente guardar la configuración con nombre.
6. Ejecutar con **Consultar** y elegir contar o detalle si el rol lo permite.

Los filtros y agrupaciones son colecciones distintas. Un filtro se identifica por el par `Concepto + Campo` y almacena signo/valor; una agrupación se identifica también por `Concepto + Campo`, pero no tiene signo ni valor.

## Controles y comportamiento

| Control | Función |
|---|---|
| `cmbCarteras` | Selecciona la cartera. Su `ValueMember` es `idCartera`, el texto mostrado es `Cartera`. El cambio activa la carga de columnas y ajusta productos, consultas y modo general. |
| `cmbProductos` | Selecciona producto. `ValueMember=idProducto`, `DisplayMember=Producto`. Al cambiar filtra las consultas guardadas por producto y recarga columnas de producto. Puede ocultarse, deshabilitarse o quedar sin selección según cartera/mode. |
| `chkGeneral` | Alterna, sólo para las carteras habilitadas en el código (ids 4 y 31), entre consultas de cartera general (`idProducto` nulo/cero) y consultas por producto. Ejecuta de nuevo `CambiaCartera`. La clase guarda además el estado en `frmCuentas.chksanta`. |
| `cmbConsultas` | Lista consultas guardadas del ejecutivo (`idConsulta`, `NombreConsulta`). Seleccionar una carga sus parámetros, agrupaciones y fecha desde. También permite escribir un nombre para guardar. |
| `cmbConceptos` | Selector fijo con `Cuenta`, `Producto`, `Conteos`, `Fechas`. Cambiarlo limpia y reconstruye campos, valores y signos permitidos. |
| `cmbCampos` | Campo perteneciente al concepto activo. Para `Producto`, se llena dinámicamente desde `Catálogo.ProductoColumnas(idProducto, idCartera)`; para los otros conceptos sus opciones están enumeradas en el formulario. |
| `cmbSignos` | Operadores `<`, `≤`, `=`, `≥`, `>`, `≠`. Internamente `≤` se convierte a `<=` y `≥` a `>=`. En concepto `Cuenta` se filtra la lista para dejar sólo `=` y `≠`. |
| `cmbValores` | Valor del filtro. Para ciertos campos de Cuenta es lista desplegable con id y descripción de catálogo; para otros es entrada libre. Su configuración depende de `cmbConceptos` y `cmbCampos`. |
| `btnAgregar` | Agrega o combina el filtro actual en `dgvParámetros`; valida duplicados y compatibilidad de comparaciones. |
| `btnAgrupar` | Agrega el par concepto/campo a `dgvAgrupar`, sin valor ni operador. Rechaza repetir el mismo par. |
| `dgvParámetros` / columna `Borrar` | Muestra filtros activos. Pulsar la celda de borrado elimina la fila que coincide por concepto/campo. |
| `dgvAgrupar` / columna `Borrar2` | Muestra campos de agrupación. Pulsar la celda de borrado elimina esa combinación concepto/campo. La columna `Concepto2` existe para identificar la fila, pero está oculta. |
| `dtpDesde` / `lblPeriodo` | Fecha inicial relevante a conteos. Se muestran si parámetros o agrupaciones contienen el concepto `Conteos`; en otro caso se ocultan. El mínimo se actualiza al cambiar cartera. |
| `rdoContar` | Solicita resultado agregado/contado. Es el modo inicial implícito cuando `rdoDetalle` no está seleccionado. |
| `rdoDetalle` | Solicita el detalle de cuentas y exportación a Excel. Sólo se muestra cuando `Ejecutivo.Datos["Jerarquía"] > 1`. |
| `btnConsultar` (texto `Consultar`) | Ejecuta búsqueda después de validar columnas. Mientras corre se oculta y aparece `picWait`; al terminar o fallar se restaura. |
| `btnGuardar` | Guarda o elimina una consulta. Cambia entre texto **Guardar** y **Eliminar** dependiendo de si hay filtros/agrupaciones. |
| `btnExportar` | Exporta la tabla de resultado actual con columnas de porcentaje. En el diseñador inicia oculto; el código mostrado no lo hace visible en el flujo de resultados. |
| `picAddCampaign` | Abre `frmCargaFilas` con el SQL de filas de trabajo preparado, sólo después de validar columnas. |
| `lblMensaje` | Muestra estado, éxito, cancelación o error. |
| `sfdExcel` | Diálogo para elegir destino del Excel. |

## Selección de conceptos y campos

### Cuenta

Campos estáticos ofrecidos:

- `Situación` → `Catálogo.ValoresDelCatálogo(2)` (id catálogo 2).
- `Nivel` → `Catálogo.ValoresDelCatálogo(4)` (id catálogo 4).
- `Sucursal` → `Catálogo.ValoresDelCatálogo(1)` (id catálogo 1).
- `CausaNoPago` → `Catálogo.ValoresDelCatálogo(10)` (id catálogo 10).
- `RFC` → no se carga catálogo; se captura texto libre.
- `Bloqueo` → `Catálogo.TablaBit()`.

Para Cuenta, los signos se restringen a igualdad (`=`) o distinto (`≠`). Para Situación, Nivel, Sucursal, CausaNoPago y Bloqueo, `cmbValores` usa `DropDownList`, muestra `Valor` y envía internamente el identificador `idValor`. Para RFC se usa `ComboBoxStyle.Simple` y el texto es el valor comparado; el código etiqueta este dato como `char`.

En campos de catálogo la selección visual no es el dato persistido como condición: el formulario obtiene `cmbValores.SelectedValue` y lo manda como `sId` a `AgregaParámetros`; la columna `Valores` conserva el texto visible y la columna `Parámetros` conserva el id. En RFC se conserva el literal entre comillas para el valor y como texto en la expresión de consulta.

### Producto

Los campos no son una lista fija: `cmbCampos` se enlaza a `Catálogo.ProductoColumnas(cmbProductos.SelectedValue, cmbCarteras.SelectedValue)` y presenta el nombre de columna (`name`). El catálogo de columnas se carga/refresca también al cambiar cartera o producto (`CargaColumnasProducto`). Por lo tanto, la lista depende de la combinación cartera-producto elegida y no debe sustituirse por una lista estática en frontend.

El signo puede ser cualquiera de los seis operadores. El tipo de dato de la columna seleccionado en `Catálogo.ProductoColumnas` determina validaciones: si la fila existente en parámetros indica `Dato=int`, el valor debe parsear como entero; si indica `Dato=date`, debe ser fecha válida. Para comparaciones `>`, `<`, `>=`, `<=`, sólo se aceptan números o fechas; las fechas se normalizan a `yyyy-MM-dd`, el dato queda marcado `date`, y la expresión usa literales de fecha entre comillas simples. Si no es comparación numérica/fecha, el dato se trata como texto (`char`) y se envuelve entre comillas dobles para el campo `Valores`.

El control detecta duplicidad comparando operador y valor sin distinguir mayúsculas/minúsculas. Un par `Concepto + Campo` ocupa una fila y puede acumular más de un valor compatible en esa misma condición.

### Conteos

Campos ofrecidos: `Gestiones`, `Visitas`, `Chats`, `Comentarios`, `Negociaciones`, `Seguimientos`, `Teléfonos`, `Correos`, `Domicilios`, `Cartas`, `Blasters`, `Emails`, `SMSs`, `Telegramas`, `Pagos`, `SumaPagos`.

Acepta operadores del combo y exige que el valor sea un entero. `Dato` se guarda como `int`. Si un filtro o agrupación usa concepto Conteos se habilita el selector `A partir de` para elegir el período.

### Fechas

Campos ofrecidos: `Activación`, `Última gestión`, `Última visita`, `Última negociación`, `Último pago`, `Próximo seguimiento`.

El valor se interpreta como fecha válida, se normaliza a `yyyy-MM-dd` y el dato se marca como `date`; en la expresión se encierra entre comillas simples. Para este concepto el combo de valores queda como entrada libre/simple.

## Regla de acumulación y restricciones de parámetros

`AgregaParámetros(concepto, campo, signo, valor, id)` procesa el filtro así:

1. Elimina comillas simples del texto ingresado.
2. Traduce `≤`/`≥` a los operadores ASCII `<=`/`>=` para la expresión interna.
3. Busca una fila existente por clave compuesta `Concepto + Campo`. Si no existe, crea fila; si existe, agrega una nueva alternativa a sus columnas `Valores` y `Parámetros`.
4. Impide duplicar el mismo valor/signo.
5. Impide mezclar en la misma fila una desigualdad `>` con `=`/otra desigualdad del mismo sentido cuando ya existe un límite incompatible. El mensaje indica que sólo puede asignar desigualdad en el sentido opuesto (`<` o `>`), permitiendo construir rangos con límites opuestos.
6. Si ya hay una condición `≠`, sólo permite añadir más condiciones `≠`; si ya hay `=`, sólo permite añadir más condiciones `=`.
7. Quita comas/espacios iniciales que se producen al concatenar condiciones.

Si la validación falla, `btnAgregar` muestra el mensaje y devuelve foco a `cmbValores`; si la operación tiene éxito limpia el texto del valor. En ambos casos actualiza la visibilidad del período, la grilla y el estado del botón Guardar.

## Flujo de inicialización y dependencia cartera/producto

Al cargar el formulario, `PreparaVentana()`:

- Desactiva generación automática de columnas para grillas de filtros/agrupación y la activa para resultados.
- Crea tabla de signos y enlaza su clave/etiqueta.
- Enlaza parámetros y agrupaciones a tablas compartidas `Ejecutivo.TablaParámetros` y `Ejecutivo.TablaAgrupar`.
- Asigna carteras, productos y consultas usando sus ids como `ValueMember`.
- Si el ejecutivo trae cartera o producto fijado, asigna el valor y oculta el combo correspondiente, mostrando su etiqueta.
- Filtra productos por cartera y carga columnas de producto en segundo plano.
- Filtra visibilidad de `rdoDetalle` por jerarquía y llama `CambiaComboProducto()` para poblar la consulta activa.

`CambiaCartera(idCartera)` carga columnas de la cartera y define el modo:

- Cartera id `4`: muestra selector de producto y checkbox General. Con General activado deshabilita producto y filtra consultas a `ISNULL(idProducto,0)=0`; con General desactivado filtra productos por cartera y usa producto seleccionado.
- Para otras carteras con columnas configuradas a nivel cartera: filtra consultas por `idCartera`, oculta producto y checkbox; existe una excepción explícita para cartera id `31`, que vuelve a mostrar modo General/producto.
- Si no hay columnas de cartera: muestra producto, filtra productos por cartera y selecciona el primero.

`CambiaComboProducto()` restablece concepto al primero, filtra consultas por `idProducto` si hay producto seleccionado, carga columnas del producto en background y llama `CambiaComboConsulta()`.

`CambiaComboConsulta()` limpia resultado. Si no hay consulta seleccionada, vacía ambas grillas. Si hay una, solicita a `Ejecutivo.LlenaConsulta(...)` que rehidrate parámetros/agrupaciones y fecha; muestra el período cuando hay Conteos y restablece botón a Guardar.

## Grillas: agregar y quitar

### `dgvParámetros`

`btnAgregar` escribe en la tabla compartida de parámetros. Las columnas lógicas que el método manipula son `Concepto`, `Campo`, `Valores`, `Parámetros`, `Dato`. Se permite un registro por combinación concepto/campo y el mismo registro puede representar varios valores del mismo campo según reglas de signo.

Al pulsar la celda `Borrar`, el evento encuentra la fila por concepto/campo y la elimina. Si la fila borrada era la última que dependía de Conteos, puede ocultarse `dtpDesde`.

### `dgvAgrupar`

`btnAgrupar` agrega `Concepto + Campo` a la tabla compartida de agrupaciones. Si ya existe esa pareja muestra “Ya dio de alta dicho parámetro”. No pasa operador ni valor. Al pulsar `Borrar2`, se elimina la agrupación por su clave compuesta.

Agregar o quitar en cualquiera de las grillas recalcula el período y llama la lógica de `cmbConsultas_TextUpdate`, lo que cambia el modo/texto del botón Guardar.

## Guardar, seleccionar y eliminar consultas

- Al seleccionar una consulta guardada (`SelectionChangeCommitted`), `CambiaComboConsulta()` carga sus filtros, agrupaciones y fecha inicial.
- La escritura en `cmbConsultas` habilita Guardar cuando el nombre tiene al menos 3 caracteres.
- Si no hay parámetros ni agrupaciones y existe una consulta seleccionada, el botón cambia a **Eliminar**. Esto evita tratar una configuración vacía como una consulta nueva.
- `btnGuardar_Click` invoca `Ejecutivo.GuardarConsulta` con id (0 si no es existente), nombre (vacío si se elimina), producto, cartera, parámetros, agrupaciones y fecha desde.
- Si se elimina correctamente, informa, deselecciona y oculta el botón. Si guarda, informa éxito y conserva el nombre. Si falla, informa el fallo.

La persistencia real/validaciones de base de datos pertenecen a `Ejecutivo.GuardarConsulta`; el formulario únicamente decide si la intención es guardar o borrar y proporciona el estado actual.

## Consulta: validación, ejecución y salida

Al pulsar **Consultar** (`btnBuscar_Click`):

1. Limpia resultados y restablece color del mensaje.
2. Llama `Ejecutivo.ValidaColumnasProducto(producto, cartera, parámetros, agrupaciones)`. Si devuelve texto, lo muestra y no ejecuta.
3. Oculta el botón y activa indicador de espera.
4. Ejecuta `RealizaBúsqueda` en hilo de trabajo.

`RealizaBúsqueda` elige `Ejecutivo.Resultado.Detalle` si `rdoDetalle.Checked`; de lo contrario `Contar`. Construye SQL mediante `Ejecutivo.PreparaQueryBúsqueda(...)`, usando producto, cartera, filtros, agrupaciones y `dtpDesde`; ejecuta contra la base de la cartera.

- Error de consulta: muestra mensaje de error y restaura controles.
- Detalle: si no hay filas informa resultado vacío; con filas, presenta la tabla si son 1,000 o menos, abre diálogo de Excel y exporta con `ExcelXML.ExportToExcelSAX`. Si el usuario cancela, no exporta.
- Conteo: ordena columnas, calcula porcentajes de Cuentas y Saldo, agrega fila de totales, enlaza la grilla, aplica formatos (`Cuentas` numérico, `Saldo` moneda), resalta columnas de totales y ajusta anchos.

`TerminaBúsqueda` vuelve al hilo UI cuando hace falta, informa estado/color, muestra botón Consultar, oculta espera y reactiva la caja de control de la ventana.

## Acciones secundarias

### Agregar a fila de trabajo (`picAddCampaign`)

Valida las mismas columnas que una consulta normal. Si pasa, llama `PreparaQueryBúsqueda` con resultado `FilaDeTrabajo`, crea `frmCargaFilas(query, false, false)` y lo muestra modal. No ejecuta la búsqueda normal ni exporta Excel.

### Exportar (`btnExportar`)

El código elimina `Cuentas %`, `Saldo %` y `SortColumn` de `tblCuentas1`, recalcula porcentajes mediante `ColumnaPorcentaje2`, solicita ruta y exporta a Excel. El botón se define oculto en el diseñador y en el flujo activo de `RealizaBúsqueda` no se vuelve visible (hay una asignación comentada); revisar esto si en la aplicación actual no se puede usar Exportar. También observar que elimina columnas sobre la misma tabla del resultado y no sobre una copia.

### Cambio de cartera y calendario

Al cambiar cartera, `dtpDesde.MinDate` se define con `Catálogo.Calendarios()` excepto cartera id `1`, cuyo mínimo es `2016-01-01`. El handler supone que `cmbCarteras.SelectedValue` no es null al ejecutar `ToString()`.

### Cierre

Al cerrar el formulario cancela consulta en curso, restablece base `dbCollection` y cierra/libera `dbExcel` si está inicializado.

## Métodos auxiliares y handlers sin lógica propia

- `Chksanta(bool)`: almacena en el campo estático `chksanta` el estado del modo general para consumo externo. `chkGeneral_CheckedChanged` lo actualiza antes de recalcular la cartera.
- `LimpiaParámetros()`: quita origen de datos y elementos de `cmbCampos`, restablece el filtro de signos y limpia la grilla de resultados; se usa al cambiar concepto.
- `EstableceValores()`: limpia el valor previo y decide si `cmbValores` es lista con `idValor`/`Valor` (catálogos de Cuenta) o entrada libre.
- `RevisaPeriodoConteos()`: busca `Conteos` en ambas colecciones; muestra fecha Desde si lo encuentra; si no, oculta fecha y limpia el resultado actual.
- `txtOnlyNumbersLettersDate_KeyPress(...)`: permite letras, dígitos, retroceso, espacio, tabulador y caracteres `/ - . _ +`; cualquier otro carácter queda bloqueado. En el código del formulario está definido como handler público, pero se debe verificar en el diseñador si efectivamente está enlazado a `cmbValores` u otro control antes de asumir que restringe la entrada en ejecución.
- `rdoDetalle_CheckedChanged`, `cmbConsultas_SelectedIndexChanged` y `cmbProductos_SelectedIndexChanged` están vacíos. El comportamiento útil del cambio de consulta/producto está conectado a `SelectionChangeCommitted`, no a estos handlers vacíos.
- `dbExcel` se declara y libera al cerrar, pero no se ve inicialización/uso activo en el archivo mostrado.

## Reglas importantes para replicar en frontend

1. Mantener separados filtros (`Parametros`) y agrupaciones (`Agrupar`). Un campo agrupado no equivale a un filtro.
2. Mantener el par `concepto/campo` como identidad de condición, pero permitir múltiples valores únicamente de acuerdo con las restricciones de operador del legacy.
3. Las listas Cuenta deben conservar ambas cosas: etiqueta visible y `idValor` seleccionado. El dato que se compara en SQL para catálogos es el id; RFC es texto libre.
4. Producto depende de columnas de la cartera/producto actual y de sus tipos. Validar antes de agregar y nuevamente antes de buscar.
5. Conteos activa la fecha Desde si aparece tanto en filtros como en agrupaciones.
6. No mostrar `Detalle` a jerarquía 1 o menor. No mostrar/activar producto si cartera o modo general lo oculta/deshabilita.
7. Reproducir los cambios de cartera en cascada: cartera → modo general/producto → productos disponibles → columnas → consultas guardadas → campos del concepto.
8. En React/API, distinguir esta lógica de UI de la implementación legacy: el código aquí genera SQL y llama base directamente. El endpoint equivalente debe recibir el contrato JSON esperado por backend, no el SQL concatenado del cliente.

## Mapa breve de eventos

| Evento | Acción asociada |
|---|---|
| `frmCuentas_Load` | `PreparaVentana` |
| Cartera `SelectionChangeCommitted` | `CambiaCartera` en hilo de trabajo |
| Producto `SelectionChangeCommitted` | `CambiaComboProducto` |
| Concepto `SelectedIndexChanged` | Limpia dependencias y carga lista de campos/signos |
| Campo `SelectedIndexChanged` | `EstableceValores` |
| `btnAgregar.Click` | Construye/agrega filtro |
| `dgvParámetros.CellContentClick` | Borra filtro si fue columna Borrar |
| `btnAgrupar.Click` | Agrega agrupación |
| `dgvAgrupar.CellContentClick` | Borra agrupación si fue columna Borrar2 |
| Consulta `SelectionChangeCommitted` | Carga consulta guardada |
| Consulta `TextUpdate` | Decide visibilidad/Guardar vs Eliminar |
| `btnGuardar.Click` | Persiste o elimina consulta |
| `btnConsultar.Click` | Valida y ejecuta búsqueda |
| `picAddCampaign.Click` | Prepara SQL e inicia carga a fila de trabajo |
| `btnExportar.Click` | Recalcula porcentajes y genera Excel |
| Cartera `SelectedIndexChanged` | Actualiza fecha mínima |
| `FormClosed` | Cancela consulta, restablece BD y libera Excel |

## Observaciones del código que afectan el comportamiento

- `btnExportar` se declara inicialmente oculto y el único punto que parece mostrarlo está comentado; el botón podría no ser alcanzable desde la UI actual.
- `rdoDetalle` se hace visible únicamente por jerarquía, no se observa una restricción adicional de validación en `btnBuscar_Click`.
- La rama cartera 31 depende del estado previo de `chkGeneral`; se muestra producto y checkbox, pero con General activo el código de esa rama no aplica el mismo `RowFilter` de consultas generales que aplica la rama cartera 4. Conviene probar si es deliberado antes de copiarlo.
- `CambiaCartera` carga columnas asíncronamente y actualiza controles con `Invoke`; la UI web debe modelar esto como dependencias de carga y evitar permitir consultas con columnas aún no recibidas.
- El filtro de producto en `CambiaComboProducto` usa `idProducto = ...`; el modo General de la cartera 4 usa `ISNULL(idProducto,0)=0`. El modo general no debe representarse como seleccionar un producto normal.
- `cmbCampos` y `cmbValores` pueden quedar sin elementos tras cambiar concepto/cartera. El frontend debe limpiar selección y estado dependiente para no reutilizar ids o texto del campo anterior.
