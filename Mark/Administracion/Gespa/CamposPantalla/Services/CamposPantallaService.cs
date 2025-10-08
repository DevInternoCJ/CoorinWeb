using CoorinWeb.Loki.Global;
using Loki.DTOs.CamposPantallaDTOs;
using Loki.Mark.Administracion.Ejecutivos.Encargados.DAOs;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Loki.Mark.Administracion.Gespa.CamposPantalla.DAOs;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Mark.Administracion.Gespa.CamposPantalla.Services
{
    public class CamposPantallaService : ICamposPantallaService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly CamposPantallaDao _camposPantallaDao;

        public CamposPantallaService(CustomDbContextFactory dbContFactory, CamposPantallaDao camposPantallaDao)
        {
            _dbContFactory = dbContFactory;
            _camposPantallaDao = camposPantallaDao;
        }


        /// <summary>
        /// Verifica si existe la tabla dinámica Producto_{idProducto} en el servidor especificado.
        /// </summary>
        /// <param name="servidor">Nombre del servidor.</param>
        /// <param name="idProducto">ID del producto asociado a la tabla dinámica.</param>
        /// <returns>Object ID de la tabla si existe, de lo contrario null.</returns>
        public async Task<int?> ObtenerObjectIdProductoAsync(string servidor, int idProducto)
        {
            string nombreTabla = $"Producto_{idProducto}";
            return await _camposPantallaDao.ObtenerObjectIdTablaAsync(servidor, nombreTabla);
        }

        /// <summary>
        /// Obtiene los campos de pantalla configurados para un producto específico.
        /// </summary>
        /// <param name="servidor">Nombre del servidor.</param>
        /// <param name="idProducto">ID del producto.</param>
        /// <returns>Lista de objetos con los campos de pantalla configurados.</returns>
        public async Task<List<object>> GetCamposPantalla(string servidor, int idProducto)
        {
            var context = _dbContFactory.GetDbContext(servidor, "Collection");

            var nombreModelo = "CamposPantalla";

            var campos = new List<string>
            {
                "Posición",
                "AliasCampo",
                "NombreCampo",
                "idFormatoCampo",
                "Resaltado"
            };

            var filtrosEncargados = new List<DynamicFilter>
            {
                new() { Campo = "idProducto", Operador = "=", Valor = idProducto },
            };

            var encargados = await FetchEntityTableWithFilters(context, nombreModelo, filtrosEncargados, campos);
            return encargados;
        }


		/// <summary>
		/// Procesa y prepara los datos de los campos configurados para la pantalla de un producto.
		/// Este método obtiene la configuración de campos, genera un valor de marcador de posición para cada uno,
		/// le aplica el formato y el estilo de resaltado correspondiente, y devuelve un diccionario
		/// con la información lista para ser mostrada en la interfaz de usuario.
		/// </summary>
		/// <param name="servidor">El nombre del servidor de donde se obtendrá la configuración.</param>
		/// <param name="idProducto">El identificador único del producto.</param>
		/// <returns>
		/// Un <see cref="Task"/> que resulta en un <see cref="Dictionary{TKey, TValue}"/> donde la clave es el alias del campo
		/// y el valor es un objeto <see cref="ProductDataResponse"/> con el valor formateado y sus estilos.
		/// </returns>
		public async Task<Dictionary<string, ProductDataResponse>> MostrarCamposPantalla(string servidor, int idProducto)
		{
			// 1. Obtenemos la configuración de los campos.
			var camposPantalla = await GetCamposPantalla(servidor, idProducto);

			var resultado = new Dictionary<string, ProductDataResponse>();
			// 2. Iteramos sobre cada campo configurado.
			foreach (dynamic campo in camposPantalla)
			{
				// Aseguramos que tenemos los datos necesarios del objeto dinámico.
				string aliasCampo = campo.AliasCampo;
				var formatoId = campo.IdFormatoCampo;
				var resaltado = campo.Resaltado;

				// 3. Generamos un valor "placeholder" en lugar de calcularlo con datos reales.
				object valorPlaceholder = GenerarValorPlaceholder(formatoId);

				// 4. Aplicamos el formato original al valor placeholder.
				object valorFormateado = Formato(valorPlaceholder, formatoId);

				// 5. Reutilizamos la misma lógica de resaltado (color y estilo).
				string campoColor = "F5F5F5"; // Default: WhiteSmoke
				string campoStyle = "font-weight-normal"; // Default: Regular

				switch (resaltado?.ToString())
				{
					case "1":
						campoColor = "7FFFD4"; // Aquamarine
						break;
					case "2":
						campoColor = "ADFF2F"; // GreenYellow
						campoStyle = "font-weight-bold";
						break;
				}

				// 6. Construimos el objeto de respuesta y lo añadimos al diccionario.
				resultado[aliasCampo] = new ProductDataResponse
				{
					Valor = valorFormateado,
					FontWeight = campoStyle,
					Color = campoColor
				};
			}

			return resultado;
		}

		/// <summary>
		/// Genera un valor de ejemplo basado en el tipo de formato esperado.
		/// </summary>
		/// <param name="formatoId">El ID del formato (1:Texto, 2:Número, etc.).</param>
		/// <returns>Un valor de ejemplo del tipo adecuado.</returns>
		private object GenerarValorPlaceholder(object formatoId)
		{
			return (formatoId?.ToString()) switch
			{
				// Número
				"2" => 12345.67,
				// Moneda
				"3" => 9876.54,
				// Fecha
				"4" => DateTime.Now,
				// Porcentaje
				"5" => 0.85,// Se convertirá a "85 %" en el método Formato
							// Texto
				_ => "Valor de ejemplo",
			};
		}

        /// <summary>
        /// Cambia el formato del texto
        /// </summary>
        /// <param name="Texto">Texto que va cambiar el formato.</param>
        /// <param name="Formato">1 Texto, 2 Número, 3 Moneda, 4 Fecha</param>
        static public string Formato(object Texto, object Formato)
        {
            if (Texto == null)
                return "";

            string sTexto = Texto.ToString();

            switch (Formato.ToString())
            {
                case "2":
                    double fTexto;
                    sTexto = double.TryParse(sTexto, out fTexto) ? fTexto.ToString("#,#.00") : sTexto; // Añadido decimales para el placeholder
                    break;

                case "3":
                    double dTexto;
                    sTexto = double.TryParse(sTexto, out dTexto) ? dTexto.ToString("$ #,#.00") : sTexto;
                    break;

                case "4":
                    sTexto = sTexto.Replace("12:00:00 a.m.", "");
                    DateTime dtTexto = new();
                    if (DateTime.TryParse(sTexto, out dtTexto))
                        sTexto = dtTexto.ToString("dd/MM/yyyy");
                    break;

                case "5":
                    double pTexto;
                    sTexto = double.TryParse(sTexto, out pTexto) ? Math.Round(pTexto * 100, 0) + " %" : sTexto;
                    break;
            }

            return sTexto;
        }



		/// <summary>
		/// Simula una consulta TABLESAMPLE sobre una tabla dinámica Producto_{idProducto}.
		/// </summary>
		/// <param name="servidor">Servidor donde se encuentra la base de datos.</param>
		/// <param name="idProducto">ID del producto (usado en el nombre de la tabla).</param>
		/// <param name="porcentaje">Porcentaje de registros a seleccionar (ej. 70).</param>
		/// <param name="maximo">Número máximo de registros a devolver.</param>
		/// <returns>Lista de registros aleatorios de la tabla dinámica.</returns>
		public async Task<List<object>> GridProductoTableSample(
            string servidor,
            int idProducto,
            double porcentaje = 70,
            int? maximo = 5)
        {
            string nombreModelo = $"Producto{idProducto}";
            var context = _dbContFactory.GetDbContext(servidor, "Collection");
            var tipoEntidad = GetModelTypeByContext(context, nombreModelo);

            var dbSet = context.GetType()
                .GetMethod("Set", Type.EmptyTypes)!
                .MakeGenericMethod(tipoEntidad)
                .Invoke(context, null) as IQueryable;

            var total = await CountAsyncDinamico(dbSet);

            var cantidad = (int)Math.Ceiling(total * (porcentaje / 100.0));
            if (maximo.HasValue && cantidad > maximo)
                cantidad = maximo.Value;

            var resultados = await dbSet
                //.OrderBy("Guid.NewGuid()")
                .Take(cantidad)
                .ToDynamicListAsync();

            return resultados;
        }

        /// <summary>
        /// Realiza un conteo dinámico sobre un IQueryable sin conocer el tipo en tiempo de compilación.
        /// </summary>
        /// <param name="queryable">Consulta dinámica.</param>
        /// <returns>Total de elementos encontrados.</returns>
        public static async Task<int> CountAsyncDinamico(IQueryable queryable)
        {
            var method = typeof(EntityFrameworkQueryableExtensions)
                .GetMethods()
                .First(m => m.Name == "CountAsync" && m.GetParameters().Length == 2);

            var entityType = queryable.ElementType;
            var genericMethod = method.MakeGenericMethod(entityType);

            var task = (Task)genericMethod.Invoke(null, new object[] { queryable, CancellationToken.None })!;
            await task.ConfigureAwait(false);

            var resultProperty = task.GetType().GetProperty("Result");
            return (int)resultProperty!.GetValue(task)!;
        }

        public async Task<bool> InsertaActualizaCamposPantalla(string servidor, CampoPantallaRequest request)
        {
            foreach (var campo in request.Campos)
            {
                var dto = new CampoPantallaDto
                {
                    IdEjecutivo = request.IdEjecutivo,
                    IdProducto = request.IdProducto,
                    Posicion = campo.Posicion,
                    Alias = campo.Alias,
                    NombreCampo = campo.NombreCampo,
                    FormatoCampo = campo.FormatoCampo,
                    Resaltado = campo.Resaltado,
                    Editar = campo.Editar
                };

                var exito = await _camposPantallaDao.GuardaCampoPantalla(servidor, dto);
                if (!exito) return false;
            }

            return true;
        }





    }
}