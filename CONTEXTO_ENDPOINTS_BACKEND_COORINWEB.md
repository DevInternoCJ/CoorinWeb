# Contexto integral de endpoints del backend CoorinWeb

## Alcance y reglas de lectura

Inventario obtenido de los controladores C# activos bajo `Mark/` del repositorio `CoorinWeb`. Se incluyen acciones que tienen atributos HTTP (`[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpPatch]`, `[HttpDelete]`); se excluyen rutas comentadas y controladores de proyectos de ejemplo que no pertenecen a CoorinWeb. Los segmentos `[controller]` se sustituyen por el nombre de clase sin el sufijo `Controller`, respetando el texto de la ruta declarada.

La ruta es relativa al host/base URL configurado para la API. Salvo que se indique lo contrario, el controlador define el método HTTP y la ruta, pero no un contrato global uniforme de autenticación. Revisar `[Authorize]`, `[AllowAnonymous]`, middleware y configuración antes de asumir que un endpoint es público. Los cuerpos, query params y códigos de respuesta deben confirmarse en la firma del método y sus DTO; este documento no inventa campos que no sean visibles en la ruta.

## Autenticación

| Método | Ruta | Uso |
|---|---|---|
| POST | `/api/Auth/login` | Iniciar sesión; recibe credenciales y genera/valida la sesión según el flujo de autenticación. |
| POST | `/api/Auth/reintentar-login` | Reintentar el inicio de sesión de acuerdo con la lógica del backend. |
| POST | `/api/Auth/validar-contrasenia` | Validar una contraseña. |
| GET | `/api/Auth/validar-sesion` | Comprobar la sesión actual. |
| GET | `/api/Auth/auth-tester` | Endpoint de prueba del esquema de autenticación. |
| POST | `/api/Auth/restablecer-contrasenia` | Restablecer contraseña. |
| PUT | `/api/Auth/cerrar-sesion` | Cerrar la sesión actual. |

## Consulta de cuentas, catálogos y productividad

| Método | Ruta | Uso |
|---|---|---|
| POST | `/api/Busquedas/realizar-busqueda` | Ejecutar una consulta de cuentas con los filtros, agrupaciones y opciones recibidas. El nombre real del controlador es `BusquedasController` (aunque el archivo se llama `BusquedaController.cs`). |
| POST | `/api/Busquedas/guardar-consulta` | Guardar una definición/consulta para reutilizarla. |
| GET | `/api/Catalogo/cargaCatalogos` | Cargar catálogos para la consulta de cuentas. |
| GET | `/api/Catalogo/ColumnasProducto` | Obtener columnas disponibles para el producto. |
| GET | `/api/Catalogo/UsuariosRH` | Obtener usuarios/datos de RH usados por la consulta. |
| GET | `/api/Catalogo/Versionamiento` | Consultar información de versión/versionamiento. |
| GET | `/api/Generales/carga-herramientas` | Cargar herramientas/opciones auxiliares de consulta general. |
| GET | `/api/Generales/carga-municipios` | Cargar municipios disponibles para filtros. |
| POST | `/api/Generales/busqueda-general` | Ejecutar una búsqueda general con filtros de cuenta. |
| GET | `/api/arrepentimientos/get-arrepentimientos` | Consultar registros de arrepentimientos. |
| POST | `/api/Productividad/get-productividad` | Consultar productividad con los criterios enviados. |
| POST | `/api/Historico/individual` | Consultar histórico individual. |
| POST | `/api/Historico/archivo` | Consultar/procesar histórico a partir de un archivo. Verificar si el body se envía como multipart/form-data. |
| GET | `/api/ListaNegra/lista-negra` | Consultar información de lista negra. |
| GET | `/api/Reportes/generar-excel` | Generar/descargar Excel mediante parámetros de URL. |
| POST | `/api/Reportes/generar-excel-post` | Generar Excel enviando criterios en el body. |

## Información de cuenta

| Método | Ruta | Uso |
|---|---|---|
| POST | `/api/informacion/BusquedasInfo/consultar` | Consultar información de búsqueda asociada a una cuenta. |
| POST | `/api/informacion/comentarios-info/consultar` | Consultar comentarios informativos de la cuenta. |
| GET | `/api/informacion/Correos/consultar` | Consultar correos asociados a una cuenta. |
| GET | `/api/informacion/Domicilios/consultar` | Consultar domicilios de la cuenta. |
| POST | `/api/informacion/DatosErroneos/consultar` | Consultar datos marcados como erróneos. |
| POST | `/api/informacion/Ofrecimientos/consultar` | Consultar ofrecimientos. |
| POST | `/api/informacion/Pagos/consultar` | Consultar pagos. |
| POST | `/api/informacion/PagosReportados/consultar` | Consultar pagos reportados. |

## Administración de campañas, carteras y ejecutivos

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/campañas/carteras` | Obtener carteras disponibles para campañas. |
| GET | `/api/campañas/carteras-productos` | Obtener la relación cartera-producto. |
| GET | `/api/campañas/campañas-encargado/{idEncargado}/{idCartera}/{idProducto}` | Listar campañas filtradas por encargado, cartera y producto. Los tres segmentos son parámetros de ruta. |
| PATCH | `/api/campañas/habilitar-deshabilitar/{idCampaña}` | Cambiar el estado de una campaña. El método declara `[AllowAnonymous]`; aun así, confirmar autorización efectiva y uso de claims en el código. |
| POST | `/api/carteras/nueva-campania` | Crear campaña para una cartera. |
| DELETE | `/api/carteras/eliminar-campania` | Eliminar campaña según los identificadores recibidos. |
| PUT | `/api/carteras/limpiar-campania` | Limpiar/restablecer datos de una campaña. |
| POST | `/api/carteras/asigna-ejecutivos-campaña` | Asignar ejecutivos a campaña. |
| GET | `/api/carteras/FilasRestantesPorCampaña` | Consultar filas pendientes/restantes por campaña. |
| GET | `/api/carteras/Top100Filas` | Obtener una muestra limitada de filas de campaña. |
| POST | `/api/carteras/cargar-consulta` | Cargar a campaña el resultado de una consulta guardada/ejecutada. |
| POST | `/api/carteras/cargar-archivo` | Cargar archivo de filas a una campaña; confirmar formato multipart y nombres de campos en la acción. |
| GET | `/api/carteras/ejecutivos-campaña` | Listar ejecutivos de una campaña. |
| GET | `/api/info-ejecutivo/consultas/{idEjecutivo}` | Obtener consultas asociadas al ejecutivo indicado. |
| GET | `/api/Encargados/encargados` | Listar encargados. |
| GET | `/api/Encargados/ejecutivos-propios/{idEjecutivo}` | Listar ejecutivos asociados/propios del ejecutivo indicado. |
| PATCH | `/api/Encargados/asignar-encargado-cartera` | Asignar encargado a cartera. |
| POST | `/api/carteras/metas-productividad` | Consultar/configurar datos de metas de productividad de cartera conforme al DTO de entrada. |
| POST | `/api/carteras/establecer-metasproductividad` | Establecer metas de productividad. |
| GET | `/api/Sesiones/get-sesiones-ejecutivos/{idEjecutivo}` | Consultar sesiones activas/históricas del ejecutivo. |
| POST | `/api/Sesiones/reset-password-ejecutivo` | Restablecer contraseña de ejecutivo. |
| PATCH | `/api/Sesiones/logout-ejecutivo/{idEjecutivo}` | Cerrar sesión del ejecutivo indicado. |
| PATCH | `/api/Sesiones/unlock-ejecutivo/{idEjecutivo}` | Desbloquear la cuenta/sesión del ejecutivo. |
| GET | `/api/ejecutivos/validadores` | Listar validadores. |
| GET | `/api/ejecutivos/validadores-arrepentimientos` | Listar validadores para arrepentimientos. |
| POST | `/api/ejecutivos/inserta-elimina-validador` | Agregar o retirar un validador según los datos recibidos. |
| POST | `/api/ejecutivos/inserta-elimina-validadores-arrepentimientos` | Agregar o retirar validadores de arrepentimientos. |

## Configuración y catálogos de Gespa

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/CamposPantalla/existe-tabla-producto/{idProducto}` | Verificar si existe tabla de producto para el id indicado. |
| GET | `/api/CamposPantalla/obtener/{idProducto}` | Obtener configuración/campos de pantalla del producto. |
| GET | `/api/CamposPantalla/mostrar/{idProducto}` | Obtener campos visibles/mostrables para el producto. |
| GET | `/api/CamposPantalla/grid-producto-sample/{idProducto}/{porcentaje}/{maximo}` | Obtener una muestra de datos del producto con porcentaje y máximo indicados. |
| POST | `/api/CamposPantalla/guardar` | Guardar configuración de campos de pantalla. |
| GET | `/api/Catalogos/catalogos` | Obtener catálogo(s) disponibles. |
| GET | `/api/Catalogos/valores-catalogo` | Obtener valores de un catálogo; revisar el DTO/query para determinar si recibe `idCatalogo`, `idValor` u otro selector. |
| POST | `/api/Frases/guardar` | Guardar frase/configuración. |
| GET | `/api/Frases/frases` | Listar frases. |
| PUT | `/api/Frases/activar-frase` | Activar/desactivar una frase según el body. |
| PUT | `/api/Scripts/Actualizar%20-%20Irene` | Actualizar script. La ruta contiene un espacio en el atributo; usar URL-encoding en el cliente y considerar normalizarla en backend. |
| POST | `/api/Scripts/Guardar` | Guardar script. |
| DELETE | `/api/Scripts/Eliminar` | Eliminar script. |
| POST | `/api/Scripts/carga-datos-producto` | Cargar datos de producto relacionados con scripts. |
| PUT | `/api/PlantillasCorreo/actualizar-plantillas` | Actualizar plantillas de correo. |
| POST | `/api/PlantillasCorreo/crear-plantilla` | Crear plantilla de correo. |
| DELETE | `/api/PlantillasCorreo/eliminar-plantillas` | Eliminar plantillas. |
| POST | `/api/PlantillasCorreo/carga-datos` | Cargar datos auxiliares para plantillas. |
| POST | `/api/Auditoria/consulta-auditoria` | Consultar registros de auditoría conforme a filtros del body. |

## Procesos de accionamiento, cartera y gestiones

| Método | Ruta | Uso |
|---|---|---|
| POST | `/api/procesos/accionamientos/carga` | Cargar archivo/datos de accionamientos. Confirmar content-type y DTO/form-data requeridos. |
| POST | `/api/procesos/accionamientos/Informe/consultar` | Consultar informe de accionamientos. |
| GET | `/api/procesos/carteo/buscar-cuenta` | Buscar cuenta para el proceso de carteo. |
| POST | `/api/procesos/carteo/guardar-manual` | Guardar registro de carteo manual. |
| POST | `/api/procesos/carteo/carga-masiva` | Cargar registros de carteo masivamente. |
| POST | `/api/ArrepentimientosGespa/Buscar` | Buscar cuenta/solicitud para arrepentimiento en Gespa. |
| POST | `/api/ArrepentimientosGespa/Arrepentimiento` | Registrar/procesar arrepentimiento en Gespa. |
| POST | `/api/BloqueoCuentasGespa/Buscar` | Buscar cuenta elegible para bloqueo. |
| POST | `/api/BloqueoCuentasGespa/Bloqueo` | Ejecutar bloqueo de cuenta. |
| POST | `/api/CargoEnLineaGespa/BusquedaAutorizar` | Buscar cargos en línea pendientes de autorización. |
| POST | `/api/CargoEnLineaGespa/EjecutaAutorizar` | Ejecutar autorización del cargo. |
| POST | `/api/CargoEnLineaGespa/BusquedaCorregir` | Buscar cargos en línea para corrección. |
| POST | `/api/CargoEnLineaGespa/EjecutaCorregir` | Ejecutar corrección del cargo. |
| POST | `/api/Comentarios/modificar` | Modificar comentarios del proceso/cuenta. |
| POST | `/api/DefinicionGespaBusca/Buscar` | Buscar definiciones/configuraciones Gespa. |
| POST | `/api/DefinicionGespaBusca/Define` | Crear o actualizar definición Gespa. |
| POST | `/api/EstadosDeCuentaGespa/EstadosDeCuenta` | Consultar/procesar estados de cuenta Gespa. |
| POST | `/api/EstadosDeCuentaGespa/EstadosDeCuenta/Modificar` | Modificar estados de cuenta Gespa. |
| GET | `/api/Gestiones/comentarios` | Consultar comentarios de gestiones. |
| PUT | `/api/Gestiones/actualiza-comentarios` | Actualizar comentarios. |
| POST | `/api/Gestiones/carga-llamadas` | Cargar información de llamadas. |
| GET | `/api/Gestiones/consulta-llamadas` | Consultar llamadas. |
| GET | `/api/Gestiones/gestiones-cuenta` | Obtener gestiones de una cuenta. |
| PUT | `/api/Gestiones/editar-gestiones` | Editar gestiones existentes. |
| POST | `/api/Gestiones/cargar-intentos-vicidial` | Cargar intentos de llamada desde Vicidial. |
| GET | `/api/ProcesosMetas/bloqueo%20-%20irene` | Consultar información del proceso de bloqueo. El nombre de ruta contiene espacio y el controlador es `ProcesosMetasController`. |
| POST | `/api/ProcesosMetas/cargar-metas` | Cargar metas para el proceso. |
| GET | `/api/Supervisores/supervisores` | Listar supervisores. |
| GET | `/api/Supervisores/cuentas` | Listar cuentas asociadas al proceso de supervisión. |
| POST | `/api/Supervisores/inserta-cuentas` | Insertar/asignar cuentas a supervisores. |

## Procesos de visitas

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/procesos/visitas/captura/buscar-cuenta` | Buscar cuenta para captura de visita. |
| POST | `/api/procesos/visitas/captura/guardar` | Guardar una visita capturada. |
| POST | `/api/procesos/visitas/carga` | Cargar visitas, posiblemente por archivo; confirmar contrato de carga. |
| POST | `/api/procesos/visitas/consulta` | Consultar visitas según filtros enviados. |
| GET | `/api/procesos/visitas/corregir/buscar` | Buscar una visita para corregir. |
| PUT | `/api/procesos/visitas/corregir/editar` | Guardar corrección de visita. |
| POST | `/api/procesos/visitas/eliminar` | Eliminar visita(s) según el body. |

## Reportes

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/reportes-cliente/definiciones` | Listar definiciones de reportes de cliente. |
| POST | `/api/reportes-cliente/generar` | Generar reporte de cliente usando la definición y parámetros recibidos. |
| POST | `/api/DiaDelEjecutivo/DiaDelEjecutivo` | Generar/consultar reporte Día del Ejecutivo. Es la ruta candidata para comparar con `frmDíaEjecutivo.cs`; validar DTO, procedimiento y lógica antes de declarar paridad funcional. |
| POST | `/api/reportes/ReporteEjecutivos/consultar` | Consultar/generar reporte de ejecutivos. |
| POST | `/api/reportes/ProductividadInfo/consultar` | Consultar reporte/detalle de productividad. |

## Consideraciones para el frontend

1. No inferir que todos los filtros son texto: consultar el DTO/acción para saber si cada dato se manda como identificador, etiqueta, valor primitivo, lista o fecha. Especial atención a catálogos: `idCatalogo` identifica el catálogo y `idValor` identifica una opción solo cuando el contrato del endpoint lo indique.
2. Los endpoints de consulta suelen usar POST aunque sean de lectura; respetar el verbo declarado y enviar el objeto de filtros en el body.
3. Para rutas de carga de archivos (`cargar-archivo`, `carga`, `archivo`, `carga-masiva`), confirmar `[FromForm]`, nombres de campos y `multipart/form-data`; no asumir JSON.
4. En rutas con `[controller]`, usar el nombre de clase real: por ejemplo `/api/Busquedas` (plural) y `/api/ProcesosMetas` (no `/api/Metas`).
5. Mantener exactamente acentos/capitalización/ruta declarada al construir URL. Las rutas con espacios están anotadas con `%20` y son candidatas a normalización del backend.
6. Para completar contratos de integración, documentar por endpoint: DTO de entrada, origen de cada propiedad (id/texto), obligatoriedad/nullabilidad, respuesta, códigos de estado, autenticación y tamaño/formato de cargas. El inventario aquí identifica rutas activas; no sustituye esa revisión de cada implementación.

## Contrato de petición: ubicación y formato

Esta sección complementa el inventario anterior con el lugar donde ASP.NET enlaza cada argumento. `JSON (body)` significa `Content-Type: application/json`; `query` significa parámetros en la URL (`?a=1&b=2`); `route` significa segmentos dentro de la ruta; `form-data` significa `multipart/form-data`. En los DTO el JSON se envía como un objeto completo, no como propiedades individuales en query. ASP.NET Core normalmente acepta nombres JSON sin distinguir mayúsculas/minúsculas, pero se recomienda conservar los nombres C# aquí listados.

### Endpoints de consulta y autenticación

| Endpoint | Envío requerido | Contrato de entrada |
|---|---|---|
| `POST /api/Busquedas/realizar-busqueda` | JSON body | `SearchCriteriaDto`; ejemplo completo más abajo. `Parametros` y `Agrupar` deben enviarse como arrays, incluso vacíos si no hay elementos. Cada parámetro debe incluir `Concepto`, `Campo` y `Valores` conforme al DTO `ParametroDto`; cada agrupación debe incluir `Campo` y `Concepto`. |
| `POST /api/Busquedas/guardar-consulta` | JSON body | `GuardarConsultaRequest`: `idConsulta`, `NombreConsulta`, `IdProducto`, `IdCartera`, `Desde`, `IdEjecutivo`, `Parametros[]`, `Agrupar[]`. |
| `GET /api/Catalogo/cargaCatalogos` | Query | `servidor` (string). Ej.: `?servidor=albaz`. |
| `GET /api/Catalogo/ColumnasProducto` | Query | `servidor` (string), `idProducto` (int). |
| `GET /api/Catalogo/UsuariosRH` | Query | `servidor` (string), `usuario` (string). |
| `GET /api/Catalogo/Versionamiento` | Query | `servidor` (string). |
| `GET /api/Generales/carga-herramientas`, `GET /api/Generales/carga-municipios` | Query | `idCartera` (int). |
| `POST /api/Generales/busqueda-general` | JSON body | DTO `SearchGeneral`: `Servidor`, `IdCartera`, `IdProducto`, `DesdeFecha`, `TipoResultado` (1=contar, 2=detalle, 3=cuentas), `IdConsulta`, `Jerarquia`, `ParametrosExtra[]`, `AgruparExtra[]`. |
| `GET /api/arrepentimientos/get-arrepentimientos` | Query | Parámetros simples de la acción; consultar firma `arrepentimientos(...)` para nombres/tipos, no enviar JSON body. |
| `POST /api/Productividad/get-productividad` | JSON body | `ProductividadRequest`: enviar la forma definida por ese DTO. |
| `POST /api/Historico/individual` | JSON body | `ConsultaIndividualRequest`. |
| `POST /api/Historico/archivo` | Form-data | `HistoricoArchivo`; enviar cada propiedad del DTO como campo multipart y el archivo como parte de archivo. |
| `GET /api/ListaNegra/lista-negra` | Query | Parámetros simples definidos en la firma `ListaNegra(...)`; no mandar body. |
| `GET /api/Reportes/generar-excel` | Query | Requeridos: `tipoReporte`, `idConsulta`, `idProducto`, `idCartera`, `desde`; opcionales: `hasta`, `conteoValor`, `baseParam`, `idAcercamiento`, `sheetName`. Fechas en formato ISO (`YYYY-MM-DD`). |
| `POST /api/Reportes/generar-excel-post` | JSON body | `ReporteRequestModel`; tomar nombres/tipos de la clase anidada en `ReportesController.cs`. |
| `POST /api/informacion/BusquedasInfo/consultar`, `/api/informacion/comentarios-info/consultar`, `/api/informacion/Pagos/consultar`, `/api/informacion/PagosReportados/consultar`, `/api/informacion/Ofrecimientos/consultar` | JSON body | Comparten `ConsultaPagosRequest`: `IdCartera`, `IdConsulta`, `IdProducto`, `Desde`, `Hasta`, `Jerarquia`. Usar fechas ISO y valores numéricos para los ids. |
| `GET /api/informacion/Correos/consultar`, `GET /api/informacion/Domicilios/consultar` | Query | `idCartera` (int), `idConsulta` (int). |
| `POST /api/informacion/DatosErroneos/consultar` | JSON body | `DatosErroneosRequestDto`; ver definición del DTO para propiedades exactas. |
| `GET /api/reportes-cliente/definiciones` | Sin body | Devuelve definiciones con `idReporte`, `reporte`, `descripcion`, `idCartera`, `requiereProducto`, `requiereDesde` y `requiereHasta`. Los tres flags booleanos controlan la visibilidad de filtros. |
| `POST /api/reportes-cliente/generar` | JSON body / respuesta JSON | `GenerarReporteRequestDto`: `idReporte` (int), `idProducto` (int/null), `fechaDesde` (string/null), `fechaHasta` (string/null), `segmento` (string/null). No enviar `idCartera`; se determina mediante la definición seleccionada. Fechas en formato `YYYY-MM-DD`. La respuesta tabular puede venir envuelta en `Tabla1` y el frontend la exporta a Excel. |
| `POST /api/reportes/ReporteEjecutivos/consultar` | JSON body | `ReporteEjecutivosRequestDto`: `IdCartera` (int), `IdProducto` (int/null), `Encargado` (string/null), `FechaInicial`, `FechaFinal`. |
| `POST /api/reportes/ProductividadInfo/consultar` | JSON body | `ProductividadRequestDto`: `idCartera` (int), `idProducto` (nullable), `fechaInicial`, `fechaFinal`. Las fechas se envían en formato ISO de fecha: `YYYY-MM-DD`. |
| `POST /api/DiaDelEjecutivo/DiaDelEjecutivo` | JSON body | `DiaDelEjecutivoDTOs`: `idEjecutivo` (string), `fecha` (string), `servidor` (string). El controlador valida `servidor`; respetar exactamente `fecha` como texto salvo cambio explícito del contrato. |
| `POST /api/Auth/login`, `POST /api/Auth/reintentar-login` | JSON body | `AuthRequest`: `Usuario`, `Contrasenia`, `Extension`, `Bloqueo`, `Dominio`, `Computadora`, `UsuarioWindows`, `IP`, `Aplicacion`, `Version`, `Servidor`. Enviar solo los campos requeridos por cada flujo; valores numéricos para `Extension` y `Bloqueo`. |
| `POST /api/Auth/validar-contrasenia` | JSON body | `ValidatePasswordEjecutivoRequest`. |
| `GET /api/Auth/validar-sesion` | Query | `servidor` (string), `idEjecutivo` (int). |
| `GET /api/Auth/auth-tester` | Sin parámetros / sin body | Llamada simple; no enviar un objeto vacío salvo que el cliente lo requiera. |
| `POST /api/Auth/restablecer-contrasenia` | JSON body | DTO `ReseteaContra`. |
| `PUT /api/Auth/cerrar-sesion` | JSON body | DTO `logout`. |

### Administración, campañas, catálogos y procesos

| Endpoint(s) | Envío requerido | Contrato de entrada |
|---|---|---|
| `GET /api/campañas/carteras`, `GET /api/campañas/carteras-productos` | Sin parámetros / sin body | La información del servidor se obtiene en la lógica de autenticación/servicio; verificar implementación si se invoca sin sesión. |
| `GET /api/campañas/campañas-encargado/{idEncargado}/{idCartera}/{idProducto}` | Route | Tres enteros en ese orden dentro del path; sin JSON body. |
| `PATCH /api/campañas/habilitar-deshabilitar/{idCampaña}` | Route + JSON body | `idCampaña` (short) en ruta y objeto `EncenderApagarDTO` en body. |
| `POST /api/carteras/nueva-campania` | JSON body | `CampañaDTO`. |
| `DELETE /api/carteras/eliminar-campania`, `PUT /api/carteras/limpiar-campania` | Query | `idCampaña` (int); ejemplo `...?idCampaña=12`. Sin body. |
| `POST /api/carteras/asigna-ejecutivos-campaña` | Query | `inserta` (bool), `idCampaña` (int), `idEjecutivo` (int); los tres en query string, no en JSON. |
| `GET /api/carteras/FilasRestantesPorCampaña` | Query | Parámetros simples de la firma `GetFilasRestantesPorCampaña(...)`; no body. Confirmar nombres en acción fuente. |
| `GET /api/carteras/Top100Filas`, `GET /api/carteras/ejecutivos-campaña` | Query | `idCampaña` (int). |
| `POST /api/carteras/cargar-consulta` | JSON body | `CargaConsultaRequest`. |
| `POST /api/carteras/cargar-archivo` | Form-data | `CargaArchivoRequest`; enviar el archivo y campos del DTO como multipart/form-data. |
| `GET /api/info-ejecutivo/consultas/{idEjecutivo}` | Route | `idEjecutivo` (int) en path. |
| `GET /api/Encargados/encargados` | Sin parámetros / sin body | El servidor se toma del claim de sesión. |
| `GET /api/Encargados/ejecutivos-propios/{idEjecutivo}` | Route | `idEjecutivo` (int) en path. |
| `PATCH /api/Encargados/asignar-encargado-cartera` | JSON body | Arreglo JSON `CambiaEncargadoDto[]` directamente, no objeto envolvente, porque la acción recibe `List<CambiaEncargadoDto>`. |
| `POST /api/carteras/metas-productividad` | JSON body | Array JSON de enteros (`List<int>`) con ids de ejecutivos, p. ej. `[12, 15]`. |
| `POST /api/carteras/establecer-metasproductividad` | JSON body | `EjecutivosMetasDto`. |
| `GET /api/Sesiones/get-sesiones-ejecutivos/{idEjecutivo}`, `PATCH /api/Sesiones/logout-ejecutivo/{idEjecutivo}`, `PATCH /api/Sesiones/unlock-ejecutivo/{idEjecutivo}` | Route | `idEjecutivo` (int) dentro de ruta; sin body. |
| `POST /api/Sesiones/reset-password-ejecutivo` | JSON body | `UsuarioRequest`. |
| `GET /api/ejecutivos/validadores`, `GET /api/ejecutivos/validadores-arrepentimientos` | Query | `idProducto` (int). |
| `POST /api/ejecutivos/inserta-elimina-validador`, `POST /api/ejecutivos/inserta-elimina-validadores-arrepentimientos` | JSON body | `ValidadoresRequest`. |
| `GET /api/CamposPantalla/existe-tabla-producto/{idProducto}`, `GET /api/CamposPantalla/obtener/{idProducto}`, `GET /api/CamposPantalla/mostrar/{idProducto}` | Route | `idProducto` (int) en path; sin body. |
| `GET /api/CamposPantalla/grid-producto-sample/{idProducto}/{porcentaje}/{maximo}` | Route | `idProducto` (int), `porcentaje` (double), `maximo` (int nullable) en path. Aunque `maximo` tenga default, la ruta lo incluye; pasar el segmento. |
| `POST /api/CamposPantalla/guardar` | JSON body | `CampoPantallaRequest`. |
| `GET /api/Catalogos/catalogos`, `GET /api/Catalogos/valores-catalogo` | Sin parámetros / sin body | Las acciones no reciben argumentos en su firma actual. No agregar `idCatalogo`/`idValor` por suposición; el origen de selección está encapsulado en servicio o debe corregirse el contrato si se requiere filtrar desde frontend. |
| `POST /api/Frases/guardar` | JSON body | `FrasesDTO`. |
| `GET /api/Frases/frases` | Query | `ejecutivo` (int). |
| `PUT /api/Frases/activar-frase` | JSON body | `ActivarFraseDTO`. |
| `PUT /api/Scripts/Actualizar%20-%20Irene` | JSON body | `actualizarScriptDTO`. |
| `POST /api/Scripts/Guardar` | JSON body | `guardarScriptsDTO`. |
| `DELETE /api/Scripts/Eliminar` | JSON body | `eliminarScriptDTO`; aunque sea DELETE, esta acción espera el objeto en body. |
| `POST /api/Scripts/carga-datos-producto` | Ver firma/atributos | `CargarDatosProducto(...)`; consultar atributos de binding de la acción antes de integrar, ya que recibe más de un parámetro. |
| `PUT /api/PlantillasCorreo/actualizar-plantillas` | JSON body | `PlantillaCorreoDto`. |
| `POST /api/PlantillasCorreo/crear-plantilla` | JSON body | `PlantillaCorreoInsert`. |
| `DELETE /api/PlantillasCorreo/eliminar-plantillas` | JSON body | `EliminarPlantillaRequest`; enviar body JSON incluso con método DELETE. |
| `POST /api/PlantillasCorreo/carga-datos` | JSON body | `CargaDatosRequest` según firma actual. |
| `POST /api/Auditoria/consulta-auditoria` | JSON body | `AuditoriaFilterDto`. |
| `POST /api/procesos/accionamientos/carga` | Form-data | `CargaAccionamientosRequestDto`; el controlador declara `multipart/form-data` y enlaza con `[FromForm]`. |
| `POST /api/procesos/accionamientos/Informe/consultar` | JSON body | `{ idCartera, idConsulta, idAcercamiento, fechaDesde, fechaHasta, conteo, usarComplemento }`. Las fechas se envían como `YYYY-MM-DD`; `conteo` es `0` o `1` y `usarComplemento` es booleano. |
| `GET /api/procesos/carteo/buscar-cuenta` | Query | `idCartera` (int), `cuentaOrExpediente` (string), `esExpediente` (bool, opcional; default false). |
| `POST /api/procesos/carteo/guardar-manual` | JSON body | `GuardarCarteoManualRequestDto`. |
| `POST /api/procesos/carteo/carga-masiva` | Form-data | `CargaCarteoRequestDto`. |
| `POST /api/ArrepentimientosGespa/Buscar` | JSON body | `DefinicionBusqueda`. |
| `POST /api/ArrepentimientosGespa/Arrepentimiento` | JSON body | `Arrepentimiento`. |
| `POST /api/BloqueoCuentasGespa/Buscar`, `POST /api/BloqueoCuentasGespa/Bloqueo` | JSON body | `BloqueoCuentasBusqueda` en ambas acciones. |
| `POST /api/CargoEnLineaGespa/BusquedaAutorizar` | JSON body | `CargoEnLineaGespaAutorizarBuscar`. |
| `POST /api/CargoEnLineaGespa/EjecutaAutorizar` | JSON body | `CargoEnLineaAutorizar`. |
| `POST /api/CargoEnLineaGespa/BusquedaCorregir` | JSON body | `CargoEnLineaCorregirBuscar`. |
| `POST /api/CargoEnLineaGespa/EjecutaCorregir` | JSON body | `CargoEnLineaCorregir`; la acción recibe el DTO sin `[FromBody]` explícito, verificar si `[ApiController]` está aplicado al controlador/proyecto; si no, revisar binding efectivo. |
| `POST /api/Comentarios/modificar` | JSON body | `ComentariosGespacs`. |
| `POST /api/DefinicionGespaBusca/Buscar` | JSON body | `DefinicionBusqueda`. |
| `POST /api/DefinicionGespaBusca/Define` | JSON body | `Define`. |
| `POST /api/EstadosDeCuentaGespa/EstadosDeCuenta` | JSON body | `EstadosDeCuenta`. |
| `POST /api/EstadosDeCuentaGespa/EstadosDeCuenta/Modificar` | DTO sin atributo explícito | `EstadosDeCuentaGespaModificar`; revisar inferencia de `[ApiController]`/binding global para fijar que se serializa como body. |
| `GET /api/Gestiones/comentarios` | Query | `idCartera` (int), `cuenta` (string). |
| `PUT /api/Gestiones/actualiza-comentarios` | JSON body | `ActualizaComentarioRequest`. |
| `POST /api/Gestiones/carga-llamadas` | Form-data | `CargarLlamadas2Request`. |
| `GET /api/Gestiones/consulta-llamadas` | Query | `idCartera`, `fechaInicial`, `fechaFinal`, `jerarquia` requeridos; `idProducto` opcional. Fechas ISO. |
| `GET /api/Gestiones/gestiones-cuenta` | Query | `idCartera` (int), `idCuenta` (string). |
| `PUT /api/Gestiones/editar-gestiones` | Query | `idCartera`, `idCuenta`, `fecha`, `hora`, `comentario`; todos se envían en URL, no JSON body. URL-encode comentario y fecha/hora si contienen caracteres reservados. |
| `POST /api/Gestiones/cargar-intentos-vicidial` | Form-data | `CargarIntentosRequest`. |
| `GET /api/ProcesosMetas/bloqueo%20-%20irene` | Query | `usuario` (string). |
| `POST /api/ProcesosMetas/cargar-metas` | Form-data | `CargarMetasRequest`. |
| `GET /api/Supervisores/supervisores` | Query | `idCartera` (int). |
| `GET /api/Supervisores/cuentas` | Query | Parámetros simples según firma `getCuentas(...)`; no body. Ver método para nombres/tipos exactos. |
| `POST /api/Supervisores/inserta-cuentas` | JSON body | `InsertarCuentasRequest`. |
| `GET /api/procesos/visitas/captura/buscar-cuenta` | Query | Parámetros simples de la firma `BuscarCuenta(...)`; no body. Consultar firma fuente para nombres/tipos exactos. |
| `POST /api/procesos/visitas/captura/guardar` | JSON body | `CapturaVisitaRequestDto`. |
| `POST /api/procesos/visitas/carga` | Form-data | `CargaVisitasRequestDto`. |
| `POST /api/procesos/visitas/consulta` | JSON body | `ConsultaVisitasRequestDto`. |
| `GET /api/procesos/visitas/corregir/buscar` | Query | `idCartera` (int), `idCuenta` (string). |
| `PUT /api/procesos/visitas/corregir/editar` | JSON body | `EditarVisitaRequestDto`. |
| `POST /api/procesos/visitas/eliminar` | Form-data | `EliminarVisitasRequestDto`; el archivo y los demás campos viajan como partes multipart. |

### Ejemplos de estructura JSON

#### Consulta de cuentas (`SearchCriteriaDto`)

El endpoint espera un objeto en el body. Este ejemplo conserva la forma del DTO y hace explícitos ambos arreglos requeridos para evitar errores de validación del servidor:

```json
{
  "Servidor": "albaz",
  "IdCartera": 1,
  "IdProducto": 1,
  "DesdeFecha": null,
  "EsDetalleResultado": false,
  "IdConsulta": null,
  "Parametros": [
    {
      "Concepto": "Producto",
      "Campo": "210",
      "Valores": ">1"
    }
  ],
  "Agrupar": [
    {
      "Campo": "180",
      "Concepto": "Producto"
    }
  ],
  "JerarquiaEjecutivo": 4
}
```

Importante: el DTO C# define `Parametros` y `Agrupar` como colecciones, y el error observado por el frontend muestra que el backend exige `Parametros[0].Valores`, `Campo` y `Concepto`, además de `Agrupar`. No enviar las propiedades legacy `Parámetros`, `Dato` o `valorTexto` en vez de los nombres del DTO. El contenido interno de `ParametroDto`/`AgruparDto` debe alinearse con sus clases fuente; no es suficiente enviar un `valorTexto` separado si el backend consume `Valores`.

#### Búsqueda general (`SearchGeneral`)

```json
{
  "Servidor": "albaz",
  "IdCartera": 1,
  "IdProducto": 1,
  "DesdeFecha": null,
  "TipoResultado": 2,
  "IdConsulta": null,
  "Jerarquia": 4,
  "ParametrosExtra": [],
  "AgruparExtra": []
}
```

`TipoResultado`: `1` cuenta, `2` detalle, `3` cuentas. `ParametrosExtra` y `AgruparExtra` usan los DTO propios de búsqueda general, no se deben sustituir automáticamente por los DTO de cuenta.

#### Reporte Día del Ejecutivo

```json
{
  "idEjecutivo": "123",
  "fecha": "2026-09-12",
  "servidor": "albaz"
}
```

#### Información relacionada a pagos/comentarios/ofrecimientos

```json
{
  "IdCartera": 1,
  "IdConsulta": 25,
  "IdProducto": 1,
  "Desde": "2026-09-01T00:00:00",
  "Hasta": "2026-09-12T23:59:59",
  "Jerarquia": 4
}
```

### Cómo enviar query y form-data

Ejemplo query:

```text
GET /api/informacion/Correos/consultar?idCartera=1&idConsulta=25
```

Ejemplo conceptual `multipart/form-data` para carga: cada campo debe llamarse igual que la propiedad del DTO `[FromForm]`; la parte de archivo usa el nombre de propiedad `IFormFile` declarado en ese DTO. No serializar este objeto como JSON ni fijar manualmente el header `Content-Type` al usar `FormData` en navegador (el navegador agrega el boundary).

```ts
const data = new FormData();
data.append("IdCartera", String(idCartera));
data.append("Archivo", file); // confirmar nombre exacto de la propiedad IFormFile del DTO
await fetch(url, { method: "POST", body: data });
```

### Binding implícito y puntos por confirmar

Varias acciones aceptan parámetros simples sin `[FromQuery]` explícito; para los GET simples los valores se enlazan desde ruta/query según el nombre del parámetro. Algunos DTO complejos no indican `[FromBody]` (por ejemplo `EstadosDeCuentaGespaModificar` y `CargoEnLineaCorregir`), por lo que su binding depende de `[ApiController]`, convenciones globales y versión/configuración del proyecto. Antes de cerrar un cliente de producción, conviene explicitar `[FromBody]`/`[FromQuery]` en backend o verificar el OpenAPI generado.

Los nombres de propiedades de body citados como DTO son el contrato CLR; para conocer obligatoriedad real revisar tipos nullable, inicializadores y DataAnnotations de la clase concreta. Una propiedad no nullable en C# no garantiza por sí sola que exista validación automática si el proyecto no activa nullable/`[ApiController]`.

## Archivos de referencia

- Controladores del backend: `Mark/**/Controllers/*Controller.cs`.
- Contexto frontend previo: `CONTEXTO_ENDPOINTS_FRONTEND_COMPLETO.md` y `CONTEXTO_FRONTEND_ENDPOINTS.md`.
- Detalle de consulta de cuentas: `AUDITORIA_FRMCUENTAS_ENDPOINTS_COORINWEB.md`.
