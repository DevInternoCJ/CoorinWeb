# Contexto funcional detallado: `frmGenerales`

## Propósito

`frmGenerales` permite consultar información operativa relacionada con una cartera bajo cinco conceptos: **Teléfonos, Gestiones, Negociaciones, Seguimientos y Chats**. Se construye una consulta con filtros (grilla **Parámetros**) y campos de agrupación (grilla **Agrupar**), se define un período y un tipo de salida y se ejecuta. Según el tipo de salida, presenta totales/porcentajes, exporta el detalle a Excel o permite cargar los resultados a una fila de trabajo.

Es un formulario distinto de `frmCuentas`: no muestra Producto como concepto ni tiene botón para guardar una nueva consulta. Usa consultas predefinidas asociadas a cartera/productos, y el checkbox **Consulta** determina si el SQL queda limitado al `idConsulta` seleccionado o usa el valor `-1` para consultar el conjunto de consultas.

Fuente revisada: `Forms/Menú/2 Consulta/frmGenerales.cs` y `frmGenerales.designer.cs`. Algunas operaciones se delegan a métodos externos `Ejecutivo` y `Catálogo`; sus cuerpos no están definidos dentro de los archivos revisados, por lo que el documento diferencia comportamiento visible del formulario de lógica delegada.

## Flujo general de la pantalla

1. Se inicializan cartera, consultas guardadas, operadores y las dos tablas compartidas de condiciones.
2. La cartera limita las consultas disponibles a las asociadas a sus productos o a la misma cartera.
3. El usuario elige uno de los cinco conceptos. Esto reemplaza la lista de campos y **limpia filtros y agrupaciones existentes**.
4. Selecciona campo, operador y valor; pulsa **Agregar** para crear un filtro. Para agrupar por campo, pulsa **Agregar** en la sección Agrupar.
5. Define fecha inicial y tipo de salida. El checkbox **Consulta** controla si se usa la consulta seleccionada o el conjunto general.
6. Pulsa **Consultar**. Se valida la consulta seleccionada y `Ejecutivo.QueryGeneral` construye el SQL; el formulario lo ejecuta contra la cartera actual.
7. Para agregar el resultado a una fila de trabajo, usa el ícono de agregar; para exportar el resultado agregado, usa **Exportar**.

`_tblParámetros` y `_tblAgrupar` apuntan a `Ejecutivo.TablaParámetros` y `Ejecutivo.TablaAgrupar`; son estado compartido, no tablas locales nuevas del formulario.

## Controles, botones y eventos

| Control | Función y comportamiento observado |
|---|---|
| `cmbCarteras` | Selecciona cartera (`idCartera` como valor y `Cartera` como etiqueta). Si el ejecutivo tiene cartera fija se selecciona y se oculta el combo. Cambiarla vuelve a filtrar consultas y reinicia el concepto, parámetros y agrupaciones. |
| `cmbConsultas` | Consulta predefinida (`idConsulta`, `NombreConsulta`). Está visible cuando `chkTodos` está marcado. La consulta elegida también se usa para la validación previa. |
| `chkTodos` (texto visual **Consulta**) | Marcado inicialmente. Sólo alterna la visibilidad de `cmbConsultas`; al generar SQL, marcado envía el `idConsulta` seleccionado y desmarcado envía `-1`. No significa literalmente “todos los registros”: es el selector de alcance de consulta predefinida en `QueryGeneral`. |
| `cmbConceptos` | Combo fijo: Teléfonos, Gestiones, Negociaciones, Seguimientos, Chats. Al cambiarlo se vacían filtros y agrupaciones y se reconstruyen los campos permitidos. |
| `cmbCampos` | Campo a filtrar o agrupar. Los campos son definidos por concepto; algunos dependen de la cartera o de datos auxiliares cargados asíncronamente. |
| `cmbSignos` | `<`, `≤`, `=`, `≥`, `>`, `≠`. Algunos campos restringen operadores; `≤` y `≥` se convierten para la condición interna a `<=` y `>=`. |
| `cmbValores` | Entrada libre o selector dependiente del concepto/campo. En selectores, el texto mostrado (`Valor`, `Herramienta` o `Municipio`) puede diferir del valor enviado a la condición (`idValor`, `idHerramienta` o `Municipio`). |
| `btnAgregar` | Valida y añade el filtro activo a `dgvParámetros`; limpia el valor si tuvo éxito y conserva/enfoca el valor si devuelve error. |
| `dgvParámetros`, `Borrar` | Lista filtros actuales. La celda Borrar elimina la condición del campo de la fila activa. En este formulario se localiza con el concepto actualmente seleccionado y el campo de la fila. |
| `btnAgrupar` | Añade concepto + campo a la grilla de agrupación. No agrega signo ni valor y no permite duplicar el mismo par. |
| `dgvAgrupar`, `Borrar2` | Lista agrupaciones. La columna oculta `Concepto2` conserva el concepto para identificar la fila; Borrar2 elimina por concepto + campo. |
| `dtpDesde` | Fecha usada por `QueryGeneral`. Se muestra al cambiar concepto y se actualiza su fecha mínima al cambiar cartera. No se observa aquí un control `Hasta`. |
| `rdoContar` | Salida `Ejecutivo.Resultado.Contar`; está seleccionada inicialmente. |
| `rdoCuentas` | Salida `Ejecutivo.Resultado.ContarCuentas`. |
| `rdoDetalle` | Salida `Ejecutivo.Resultado.Detalle`; oculto inicialmente y se muestra si `Ejecutivo.Datos["Jerarquía"] > 1`. En este modo genera Excel en la búsqueda. |
| `btnConsultar` | Ejecuta la búsqueda tras validar `idConsulta`; activa indicador de espera y se oculta durante el proceso. |
| `btnExportar1` (texto **Exportar**) | En el diseñador inicia oculto. Se hace visible después de una consulta agregada exitosa; exporta `_tblCuentas` a Excel con porcentajes. |
| `picAddCampaign` | Ícono de agregar. Prepara SQL en modo `FilaDeTrabajo` y abre `frmCargaFilas`. Cambia dos flags según concepto: `cmbConceptos.Text != "Teléfonos"` y `cmbConceptos.Text != "Negociaciones"`. |
| `lblMensaje` | Estado, resultado o validación. Usa color rojo para error y gris para mensajes normales. |
| `picWait` | Indicador de proceso, oculto al iniciar y visible mientras se consulta. |
| `sfdExcel` | Diálogo para seleccionar la ubicación/nombre del Excel. |

## Cartera, consultas y período

### Inicialización

`PreparaVentana()` configura las grillas, llena operadores, enlaza filtros/agrupaciones compartidos, llena carteras y consultas, aplica el estilo del grid y muestra **Detalle** sólo si la jerarquía es mayor que 1. Si hay `idCartera` asociado al ejecutivo, el combo se fija y oculta. Filtra productos por cartera y llama `CambiaCartera()`.

### Cambio de cartera

`CambiaCartera()` obtiene la lista de productos de la cartera por `Catálogo.idProductos(idCartera)` y aplica al catálogo de consultas el filtro:

```text
idProducto IN (<productos de esta cartera>) OR idCartera = <cartera actual>
```

Después selecciona el primer concepto, lo que dispara el cambio de concepto y vacía ambos conjuntos de condiciones. Al cambiar cartera, el mínimo de `dtpDesde` es `Catálogo.Calendarios()`, excepto para cartera id `1`, cuyo mínimo es `2016-01-01`.

### Consultas predefinidas

Al cambiar concepto, el formulario modifica la fila `idConsulta=0` dentro de `Ejecutivo.Consultas`: para Teléfonos pone el texto ` - Todas - `; para Gestiones, Negociaciones, Seguimientos y Chats usa ` - Ejecutivos - `. Esto es una etiqueta especial del combo/control de consultas, no un concepto adicional.

Con **Consulta** marcado, `btnConsultar_Click` pasa el id seleccionado a `Ejecutivo.QueryGeneral`; sin marcar, pasa `-1`. `cmbConsultas` se oculta/desoculta por `chkTodos_CheckedChanged`, pero el código no impide por sí mismo que se pulse Consultar con `SelectedValue` nulo: convierte ese valor a entero antes de construir el SQL. En frontend conviene preservar una selección válida o definir una opción explícita equivalente a `-1`.

## Conceptos: campos disponibles y condiciones especiales

La opción Campo se reconstruye completamente cada vez que cambia el concepto. Las grafías son significativas porque el código hace comparaciones exactas de texto.

### Teléfonos

Campos generales:

`Telefonía`, `Clase`, `Origen`, `Confirmado`, `EntidadFederativa`, `HusoHorario`, `Teléfono`, `# SinContacto`, `# Desconocidos`, `# Conocidos`, `# Titulares`, `Municipio`, `ÚltimaMarcación`, `Calificacion`, `EstatusNegociación`.

Campos condicionados por cartera:

- Para carteras `5, 24, 17, 6, 21, 10, 28, 33, 38, 39, 31, 44, 43`: agrega `# Descolgaron_ViciDial` y `# Intentos_ViciDial`.
- Para cartera `4`: agrega `Extensión` y `Ranking`.

También dispara `CargaMunicipios(idCartera)` asíncronamente.

Comportamiento de valores y operadores:

| Campo(s) | Entrada/opciones | Signos y valor persistido |
|---|---|---|
| `Clase` | Combo de catálogo 12 (`idValor`/`Valor`). | `=` y `≠`; almacena `idValor`. |
| `Telefonía` | Combo catálogo 23. | `=` y `≠`; almacena `idValor`. |
| `Origen` | Combo catálogo 24. | `=` y `≠`; almacena `idValor`. |
| `Confirmado` | `Catálogo.TablaBit()` (bandera sí/no). | `=` y `≠`; almacena id de bit. |
| `Municipio` | Tabla obtenida de teléfonos/cuentas de la cartera; muestra y usa municipio como valor. | `=` y `≠`; se compara el texto del municipio, no idValor. |
| `Teléfono` | Texto libre. | `=` y `≠`; exige exactamente 10 dígitos, numérico, sin guiones. |
| `EntidadFederativa` | Texto libre. | `=` y `≠`; normaliza a mayúsculas. |
| `ÚltimaMarcación` | Texto/fecha. | Se valida fecha y se normaliza a `yyyy-MM-dd`; se almacena tipo `date`. En el llenado de valores el filtro de signos queda restringido a `=` y `≠`. |
| `HusoHorario`, contadores `# ...`, `# Descolgaron_ViciDial`, `# Intentos_ViciDial`, `Ranking` | Entrada simple. | La inicialización de valores retorna temprano; contadores exigen entero y guardan tipo `int`. `Ranking` restaura todos los operadores y admite comparaciones. |
| `Calificacion` | Entrada libre. | `=` y `≠`; el campo se trata por la rama general de conteos y exige entero. |
| `EstatusNegociación` | No se define una fuente especial en `EstableceValores`; revisar dato recibido en UI/tabla. | En el agregado cae en la rama entera general de Teléfonos; requiere entero. |
| `Extensión` | Visible sólo en cartera 4; no tiene configuración explícita en `EstableceValores`. | Cae en la rama de conteo/entero; revisar UI porque el combo puede quedar como selector sin origen al no ser clasificado como entrada libre. |

Los valores de catálogo se representan en `Valores` como texto y en `Parámetros` como identificadores, salvo Municipio, que usa municipio textual (el código lo concatena con delimitadores especiales para la expresión interna). Para `Teléfono`, `Valores` agrega el teléfono entre comillas, pero `Parámetros` almacena el número sin comillas.

### Gestiones

Campos:

`Contacto`, `Situación`, `Sucursal`, `Modo`, `Acercamiento`, `Parentesco`, `CausaNoPago`, `Fecha`, `Hora`, `Duración`, `TiempoEnCuenta`, `NombreContacto`, `Usuario`, `Teléfono`, `Extensión`, `Comentario`.

Valores catálogo:

| Campo | Fuente |
|---|---|
| Contacto | `Catálogo.ValoresDelCatálogo(5, 1601)` |
| Situación | `Catálogo.ValoresDelCatálogo(2)` |
| Sucursal | `Catálogo.ValoresDelCatálogo(1)` |
| Modo | `Catálogo.ValoresDelCatálogo(21)` |
| Acercamiento | `Catálogo.ValoresDelCatálogo(8)` |
| Parentesco | `Catálogo.ValoresDelCatálogo(11)` |
| CausaNoPago | `Catálogo.ValoresDelCatálogo(10)` |

Los combos de catálogo usan `idValor` como valor y `Valor` como etiqueta. Para esos campos los signos son `=`/`≠` y la condición almacena el id seleccionado.

- `Fecha`: entrada libre de fecha válida, normalizada `yyyy-MM-dd`, tipo `date`.
- `Hora`, `Duración`, `TiempoEnCuenta`: `TimeSpan` válido, requerido en 24 horas `hh:mm:ss`, normalizado y tipo `time`.
- `Usuario`: 4 o 5 letras; se normaliza a mayúsculas.
- `Teléfono`: 10 dígitos, sin guiones.
- `Extensión`: 3 a 5 dígitos, sin guiones.
- `Comentario` y `NombreContacto`: texto libre; la condición se forma como búsqueda parcial `%valor%`.

Los campos fecha/hora/duración/tiempo retornan de `EstableceValores` antes de restringir operadores; por ello conservan los seis operadores. Los campos Usuario/Teléfono/Extensión/Comentario/NombreContacto restringen a `=`/`≠` y usan entrada simple.

### Negociaciones

Campos:

`Estado`, `Herramienta`, `FechaCreación`, `Hora`, `Usuario`, `Validador`, `MontoNegociado`, `Plazos`, `Fecha_Plazo`, `FechaAcordada`, `FechaFinNegociación`, `CartaConvenio`, `Correo`, `Pagos`, `MontoPagado`, `SaldoNegociación`, `TipoNegociación`, `Modo`, `NúmeroTelefónico`, `Folio`.

| Campo | Fuente/formato |
|---|---|
| Estado | Catálogo 9 (`idValor`, `Valor`). |
| Herramienta | Se carga en background por cartera mediante tabla `Herramientas`: join entre `Herramientas` y `Productos`; etiqueta `Producto + ' ' + Nombre`; `idHerramienta` como value. |
| CartaConvenio | Tabla bit (sí/no). |
| TipoNegociación | Catálogo 8. |
| Modo | Catálogo 21. |
| Fechas (`Fecha*`) | Fecha válida `yyyy-MM-dd`, tipo `date`. |
| Hora | `hh:mm:ss`, tipo `time`. |
| Pagos, Plazos, MontoNegociado, MontoPagado, SaldoNegociación | Entero `long`, tipo `int`; admiten operadores de comparación. |
| Usuario, Validador | 4–5 letras; mayúsculas. |
| Correo | Texto; se convierte a mayúsculas en la condición. |

Fechas, Hora y campos numéricos retornan antes de la restricción de signos y permiten los seis operadores. Texto y catálogos suelen limitarse a `=`/`≠`. `NúmeroTelefónico` y `Folio` están en la lista de campos, pero no cuentan con configuración de fuente de valores en `EstableceValores`; al agregarlos caen en la rama de catálogo/id. Hay que validar esta inconsistencia antes de replicar como select funcional.

### Seguimientos

Campos: `FechaCreación`, `HoraCreación`, `Usuario`, `FechaSeguimiento`, `HoraSeguimiento`, `Teléfono`, `Recordatorio`, `Realizado`.

- Fechas: fecha válida, `yyyy-MM-dd`, tipo `date`; admite operadores de comparación.
- Horas: `hh:mm:ss`, tipo `time`; admite operadores de comparación.
- Usuario: 4–5 letras y mayúsculas; Teléfono: 10 dígitos sin guiones; ambos restringidos a `=`/`≠`.
- Recordatorio y Realizado: `TablaBit()`, valor `idValor`, sólo operador `=`.

### Chats

Campos: `Salida`, `Contacto`, `Etapa`, `Situación`, `Parentesco`, `CausaNoPago`, `Sucursal`, `Fecha`, `Hora`, `Duración`, `Usuario`, `Teléfono`, `Comentario`.

| Campo | Fuente/formato |
|---|---|
| Salida | `TablaBit()`. |
| Contacto | Catálogo 5. |
| Etapa | Catálogo 13 con filtro/valor padre `2207` (comentario: Red Social). |
| Situación | Catálogo 2. |
| Parentesco | Catálogo 11. |
| CausaNoPago | Catálogo 10. |
| Sucursal | Catálogo 1. |
| Fecha | Fecha válida `yyyy-MM-dd`. |
| Hora, Duración | `TimeSpan` `hh:mm:ss`. |
| Usuario | 4–5 letras, mayúsculas. |
| Teléfono | 10 dígitos, sin guiones. |
| Comentario | Texto parcial `%valor%`. |

Fecha/hora/duración conservan todos los signos. Usuario/Teléfono/Comentario y selectores categóricos se restringen a `=`/`≠`. `Extensión` tiene lógica en el método de agregado pero no aparece entre los campos cargados para Chats, por lo que esa rama no es alcanzable desde este combo tal como está el archivo.

## Llenado de valores y municipios/herramientas

### `EstableceValores()` y `LimpiaValores()`

Al cambiar Campo se limpia el origen del combo de valores, se quitan items y se restablece el filtro de operadores. Después, según concepto/campo, el método:

1. Decide entrada simple o selector de lista.
2. Filtra signos.
3. Define `ValueMember`/`DisplayMember` y asigna catálogo/tabla.

Las listas son selecciones de valor único en WinForms (no multiselect). Se agregan múltiples alternativas pulsando Agregar varias veces; el mismo campo acumula valores en una fila. Aunque algunas listas restringen operadores a igualdad/desigualdad, la condición de filtros repetidos se acumula en la misma columna.

### Herramientas

`CargaHerramientas(idCartera)` evita recargar si ya tiene una tabla nombrada `Herramientas_<id>`. Consulta herramientas de productos de esa cartera y ordena por nombre. Es invocada al elegir concepto Negociaciones, no en cada cambio de campo.

### Municipios

`CargaMunicipios(idCartera)` ejecuta una consulta de municipios agrupados desde Teléfonos/Cuentas activos de la cartera. Se dispara al entrar al concepto Teléfonos, en hilo de trabajo. El método no espera explícitamente a que termine antes de que se seleccione Municipio; la UI web debe modelarlo como carga asíncrona y manejar estado loading/error.

Observaciones literales del código que pueden explicar listas vacías:

- La consulta concatena `"and c.cuentaactiva=1"` inmediatamente después de `idCartera`, sin espacio intermedio. La SQL resultante puede quedar como `...idcartera=4and...` y fallar.
- Después de llenar `tblMunicipios`, el método comprueba y ordena `tblHerramientas` (no `tblMunicipios`). Parece un error de referencia; no corrige la tabla de municipios.
- El catálogo de Negociaciones/Herramientas puede estar todavía cargando cuando el usuario abre el campo.
- `NúmeroTelefónico`, `Folio` de Negociaciones y `Extensión` de Teléfonos carecen de enlace explícito a entrada simple/origen, aunque el método de agregado espera tratarlos como valor.

## Agregar/quitar filtros y agrupaciones

### Agregar parámetro

`btnAgregar_Click` lee concepto, campo, operador, texto y `SelectedValue` (id). Llama `AgregaParámetros(...)`. El método crea/actualiza una fila identificada por concepto + campo y guarda columnas `Concepto`, `Campo`, `Valores`, `Parámetros`, `Dato`.

Validaciones comunes:

- Convierte `≤` a `<=` y `≥` a `>=` en la expresión interna.
- Si ya existe condición con desigualdad hacia `>` o `<`, bloquea otra condición de igualdad o del mismo sentido; permite el límite en sentido opuesto para formar un rango.
- No permite combinar `=` con otros signos en esa misma fila, ni combinar `≠` con otros signos.
- Evita duplicados; en listas compara el id ya agregado, en texto compara representaciones normalizadas.
- Elimina comillas simples del texto ingresado antes de validar.
- Limpia comas/espacios iniciales tras concatenar.

Validaciones específicas importantes están descritas por campo arriba: teléfono de 10 dígitos; usuario de 4–5 letras; extensión de 3–5 dígitos; fechas `yyyy-MM-dd`; tiempo `hh:mm:ss`; contadores/montos enteros. Ante error, muestra el mensaje y enfoca el valor. En éxito limpia el valor. Actualiza la grilla.

Una particularidad: las comparaciones guardadas en `Valores` y `Parámetros` no tienen una sola convención de serialización para todos los conceptos: hay ids de catálogo, textos entrecomillados, patrones `%texto%`, fechas y horas normalizadas. En frontend se debe conservar tipo de dato/campo para representar la condición; no tratar todas las opciones como strings intercambiables.

### Agrupar

`btnAgrupar_Click` agrega `Concepto + Campo` si el par no existe; si ya existe, informa `Ya dio de alta dicho parámetro`. No usa `cmbSignos` ni `cmbValores`. La grilla de agrupación tiene una columna visible Campo, una columna Concepto oculta para la clave y botón de borrado.

En `frmGenerales`, cambiar concepto vacía también `_tblAgrupar`; esto significa que agrupaciones de conceptos previos no sobreviven al cambio de concepto. Es un comportamiento distinto de un editor que conserve varias categorías simultáneamente.

Los handlers de borrar quitan filas, pero las llamadas a `RevisaPeriodoConteos()` y a la actualización del botón Guardar están comentadas/no presentes; no se recalcula período al borrar filtro o agrupación.

## Ejecutar consulta y modos de salida

Al pulsar Consultar:

1. Convierte `cmbConsultas.SelectedValue` e `idCartera` a entero y guarda la cartera en `frmGenerales.idCartera1`.
2. Limpia resultados y restablece mensaje.
3. Valida con `Ejecutivo.ValidaColumnasProducto(idConsulta)`. Si hay mensaje, detiene la ejecución.
4. Oculta Consultar, muestra espera y calcula modo:
   - `rdoContar` → `Resultado.Contar`;
   - `rdoCuentas` → `Resultado.ContarCuentas`;
   - `rdoDetalle` → `Resultado.Detalle`;
   - si ninguno está marcado → `Resultado.Cuentas`.
5. Llama `Ejecutivo.QueryGeneral(idCartera, concepto, parámetros, agrupaciones, resultado, dtpDesde.Value, idConsultaO-1)`.
6. Ejecuta la consulta en segundo plano.

`RealizaBúsqueda` antepone `USE dbCollection SET DATEFORMAT YMD`, ejecuta SQL por cartera y llena tabla con nombre del concepto.

- **Detalle**: si no hay filas muestra `Consulta terminada sin registros.`; si hay filas, enlaza la grilla cuando son hasta 1,000 y abre diálogo de Excel. La exportación se hace inmediatamente mediante `ExcelXML.ExportToExcelSAX`.
- **Contar/Cuentas u otros agregados**: calcula porcentaje sobre la primera columna, agrega fila de totales, muestra resultado, formatea esa primera columna como entero, resalta columnas de valor y porcentaje, ordena la fila de totales, ajusta anchos, guarda tabla en `_tblCuentas` y muestra `btnExportar1`.
- `TerminaBúsqueda` devuelve ejecución a UI cuando es necesario, actualiza mensaje/color, vuelve a mostrar Consultar, oculta indicador y restaura la caja de control.

## Exportar (`btnExportar1`)

Se muestra únicamente después de una salida agregada no vacía. Al pulsar:

1. Elimina de `_tblCuentas` columnas de porcentaje existentes para Gestiones, Teléfonos, Negociaciones, Seguimientos, Chats, Cuentas y `SortColumn`.
2. Calcula nuevamente porcentaje sobre la primera columna.
3. Si no hay filas, informa que no hay registros y termina.
4. Abre diálogo, vuelve a mostrar en grid cuando la tabla tiene hasta 1,000 filas y exporta.

La función modifica `_tblCuentas` directamente y después la dispone (`Dispose`). Si se requiere permitir exportar varias veces sin repetir la consulta, el frontend debe exportar una copia del resultado en vez de mutar el estado mostrado.

## Agregar resultado a fila de trabajo

El ícono `picAddCampaign` repite validación por idConsulta, prepara `QueryGeneral` con `Resultado.FilaDeTrabajo` y abre `frmCargaFilas`. Le pasa los indicadores `concepto != Teléfonos` y `concepto != Negociaciones`; por ello esos dos conceptos tienen tratamiento especial en el formulario de carga. No ejecuta el flujo de grilla/Excel de Consultar.

## Métodos auxiliares y eventos sin lógica efectiva

- `LimpiaValores()`: quita origen/items de `cmbValores`, desactiva ordenamiento de `cmbCampos` y restablece el filtro de signos. No limpia las grillas de condiciones.
- `CargaHerramientas(...)`: consulta/ordena herramientas por cartera con cache de tabla en memoria.
- `CargaMunicipios(...)`: llena lista auxiliar por cartera; tiene las observaciones SQL/mal referencia indicadas arriba.
- `txtOnlyNumbersLettersDate_KeyPress(...)`: permite letras, números, backspace, espacio, tab, `/` y `-`; bloquea otros caracteres. Verificar en diseñador qué control lo tiene enlazado.
- `cmbConsultas_SelectedIndexChanged` y `dtpDesde_ValueChanged` están vacíos.
- `btnConsultar_Click` se encarga directamente de armar llamada/resultado; no hay evento de selección de consulta que rehidrate parámetros en este archivo.
- `frmGenerales_FormClosed`: cancela consulta en curso, cambia la base activa a `dbCollection`, cierra `dbExcel` si existe y lo libera.

## Reglas para la réplica frontend

1. Al cambiar cartera: recalcular consultas válidas, concepto y campos dependientes; limpiar parámetros/agrupaciones como hace el legacy.
2. Al cambiar concepto: borrar ambas grillas; cargar la lista exacta de campos y opciones específicas de ese concepto.
3. Al cambiar campo: limpiar el valor y aplicar `DropDownList` o texto libre, `ValueMember`, catálogo y signos permitidos.
4. Representar catálogo como `{ id, label }`; enviar/usar el id donde el legacy consume `SelectedValue`, excepto Municipio (texto), Herramienta (`idHerramienta`) y campos de texto libre.
5. Hacer explícita la diferencia entre seleccionar una opción y agregarla: la selección actual no se vuelve condición hasta pulsar **Agregar**; se pueden agregar varios valores a la misma condición según límites de signo.
6. Modelar tipos: integer, date, time, categorical/id y text/contains. Formatear antes de guardar/enviar: fecha ISO/`yyyy-MM-dd`, tiempo `HH:mm:ss`, usuario uppercase, patrones parciales para comentario.
7. `Consulta` checked usa `idConsulta`; unchecked usa `-1`. No ocultar combo y olvidar actualizar el valor enviado.
8. Las salidas Contar/Cuentas/Detalle son modos distintos. Detalle tiene descarga inmediata; agregados presentan grid con totales y habilitan exportación separada.
9. No asumir que `frmGenerales` es un creador de consultas guardadas: no hay botón/método de guardar configuración en este formulario.
10. Si el backend moderno entrega datos distintos o no tiene municipios/herramientas, resolver el catálogo como endpoint/dependencia y no dejar que el selector dependa de una carga incompleta.

## Riesgos/inconsistencias funcionales a verificar

- La SQL de municipios concatena `idCartera` con `and` sin espacio, posible causa de que Municipio no se cargue.
- El resultado de municipios se ordena comprobando/ordenando `tblHerramientas`, no `tblMunicipios`.
- Al cambiar concepto se borran filtros y agrupaciones; una UX moderna podría retenerlos por concepto, pero eso ya sería un cambio de comportamiento y no réplica literal.
- El checkbox `chkTodos` alterna visibilidad de consulta, pero la semántica del `-1` está delegada a `Ejecutivo.QueryGeneral`.
- Hay campos visibles sin origen de valor claramente asociado (`NúmeroTelefónico`, `Folio`, `Extensión`, algunos estados/calificaciones); probar datos reales antes de diseñar sus dropdowns.
- `btnExportar1` se muestra para resultados agregados; detalle se exporta directamente sin dejar visible la opción de exportación posterior.
- La clave de borrado de parámetros usa el concepto actualmente activo más el campo leído de la fila; si existiera estado mixto por errores o cambio de concepto sin limpieza, podría no encontrar la fila, aunque el evento de cambio normalmente vacía ambas tablas.

## Mapa de eventos

| Evento | Efecto |
|---|---|
| `Load` | Inicializa formulario y catálogos base |
| Cartera `SelectionChangeCommitted` | Refiltra consultas y reinicia concepto/condiciones |
| Cartera `SelectedIndexChanged` | Ajusta mínimo de la fecha inicial |
| Concepto `SelectedIndexChanged` | Vacía parámetros/agrupaciones y repuebla campos |
| Campo `SelectedIndexChanged` | Configura valores y signos |
| Agregar | Valida y añade filtro |
| Click celda Borrar de parámetros | Quita filtro |
| Agregar agrupación | Inserta concepto/campo único |
| Click celda Borrar2 de agrupación | Quita agrupación |
| `chkTodos.CheckedChanged` | Muestra/oculta combo Consultas |
| Consultar | Valida, arma SQL y ejecuta en segundo plano |
| `picAddCampaign.Click` | Prepara consulta de fila de trabajo y abre diálogo |
| Exportar | Calcula porcentaje y exporta tabla agregada |
| `FormClosed` | Cancela consulta y restablece conexión |

