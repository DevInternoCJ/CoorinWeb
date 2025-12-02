using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace CoorinWeb.Loki.Global
{
	public static class EntityTypeHelper
	{

		/// <summary>
		/// Obtiene todos los registros de una tabla (entidad) desde el contexto especificado,
		/// con opción de proyectar campos específicos y paginar los resultados.
		/// </summary>
		/// <param name="context">El DbContext que contiene la tabla.</param>
		/// <param name="nombreTabla">El nombre de la entidad (tabla) a consultar.</param>
		/// <param name="camposProyectados">
		/// Lista opcional de nombres de campos a incluir en el resultado.
		/// Si es null o vacía, se devuelven todos los campos.
		/// </param>
		/// <param name="skip">Número de registros a omitir (paginación). Opcional.</param>
		/// <param name="take">Número máximo de registros a devolver (paginación). Opcional.</param>
		/// <returns>Una lista de objetos que representan los registros obtenidos.</returns>
		public static async Task<List<object>> GetFullEntityTable(
			DbContext context,
			string nombreTabla,
			List<string>? camposProyectados = null,
			int? skip = null,
			int? take = null)
		{
			Type entityType = GetModelTypeByContext(context, nombreTabla);

			var dbSet = context.GetType()
				.GetMethod("Set", Type.EmptyTypes)!
				.MakeGenericMethod(entityType)
				.Invoke(context, null);

			var queryable = dbSet as IQueryable;

			if (camposProyectados != null && camposProyectados.Count > 0)
			{
				var campos = string.Join(", ", camposProyectados);
				queryable = queryable.Select($"new ({campos})");
			}

			if (skip.HasValue)
				queryable = queryable.Skip(skip.Value);
			if (take.HasValue)
				queryable = queryable.Take(take.Value);

			return await queryable.ToDynamicListAsync();
		}

        /// <summary>
        /// Obtiene el tipo CLR usando el nombre de la vista/configuración de EF
        /// </summary>
        public static Type GetModelTypeByViewName(DbContext context, string viewName)
        {
            var entityTypes = context.Model.GetEntityTypes();

            // Buscar por el nombre de la vista configurado en ToView()
            var matchingEntity = entityTypes.FirstOrDefault(entityType =>
            {
                var viewDefinition = entityType.GetViewName();
                var tableDefinition = entityType.GetTableName();

                return viewDefinition?.Equals(viewName, StringComparison.OrdinalIgnoreCase) == true ||
                       tableDefinition?.Equals(viewName, StringComparison.OrdinalIgnoreCase) == true;
            });

            if (matchingEntity != null)
            {
                return matchingEntity.ClrType;
            }

            throw new InvalidOperationException($"No se encontró una entidad mapeada a la vista/tabla '{viewName}' en el contexto '{context.GetType().Name}'.");
        }

        /// <summary>
        /// Obtiene una lista de entidades de una tabla en función de los filtros aplicados, los campos proyectados y la paginación solicitada.
        /// </summary>
        /// <param name="context">El contexto de base de datos (DbContext) que contiene la tabla de entidades.</param>
        /// <param name="nombreModelo">El nombre del modelo o entidad que se desea consultar.</param>
        /// <param name="filtros">
        /// Una lista de filtros dinámicos para aplicar a la consulta.
        /// Cada filtro puede tener operadores como '=', 'like', 'in', etc.
        /// </param>
        /// <param name="camposProyectados">
        /// Una lista opcional de campos que se proyectarán (seleccionarán) en la consulta. Si es null o vacía, se seleccionan todos los campos.
        /// </param>
        /// <param name="skip">Número de registros a omitir (paginación). Opcional.</param>
        /// <param name="take">Número máximo de registros a devolver (paginación). Opcional.</param>
        /// <returns>
        /// Una lista de objetos que representan las entidades consultadas, con los filtros, proyección y paginación aplicados.
        /// </returns>
        public static async Task<List<object>> FetchEntityTableWithFilters(
			DbContext context,
			string nombreModelo,
			List<DynamicFilter> filtros,
			List<string>? camposProyectados = null,
			int? skip = null,
			int? take = null)
		{
			Type entityType = GetModelTypeByContext(context, nombreModelo);

			var dbSet = context.GetType()
				.GetMethod("Set", Type.EmptyTypes)!
				.MakeGenericMethod(entityType)
				.Invoke(context, null);

			var queryable = dbSet as IQueryable;

			foreach (var filtro in filtros)
			{
				if (filtro.Operador.Equals("in", StringComparison.OrdinalIgnoreCase) && filtro.Valor is IEnumerable<object> lista)
				{
					queryable = queryable.Where($"@0.Contains({filtro.Campo})", lista);
				}
				else if (filtro.Operador.Equals("like", StringComparison.OrdinalIgnoreCase))
				{
					queryable = queryable.Where($"{filtro.Campo}.Contains(@0)", filtro.Valor);
				}
				else
				{
					queryable = queryable.Where($"{filtro.Campo} {filtro.Operador} @0", filtro.Valor);
				}
			}

			if (camposProyectados != null && camposProyectados.Count > 0)
			{
				var campos = string.Join(", ", camposProyectados);
				queryable = queryable.Select($"new ({campos})");
			}

			if (skip.HasValue)
				queryable = queryable.Skip(skip.Value);
			if (take.HasValue)
				queryable = queryable.Take(take.Value);

			return await queryable.ToDynamicListAsync();
		}



        /// <summary>
        /// Obtiene el tipo CLR (clase) correspondiente a una entidad en el contexto de Entity Framework, utilizando el nombre del modelo.
        /// </summary>
        /// <param name="context">El contexto de base de datos (DbContext) que contiene las entidades.</param>
        /// <param name="nombreModelo">El nombre del modelo o entidad que se desea obtener.</param>
        /// <returns>El tipo CLR (clase) que representa la entidad correspondiente al nombre del modelo.</returns>
        /// <exception cref="InvalidOperationException">Se lanza si no se encuentra un modelo que coincida con el nombre proporcionado.</exception>
        /// <summary>
        /// Obtiene el tipo CLR (clase) correspondiente a una entidad en el contexto de Entity Framework, 
        /// utilizando el nombre del modelo, vista o tabla.
        /// </summary>
        /// <summary>
        /// Obtiene el tipo CLR (clase) correspondiente a una entidad en el contexto de Entity Framework, 
        /// utilizando el nombre del modelo, vista o tabla.
        /// </summary>
        public static Type GetModelTypeByContext(DbContext context, string nombre)
        {
            var entityTypes = context.Model.GetEntityTypes();

            var matchingEntity = entityTypes.FirstOrDefault(entityType =>
            {
                // Buscar por nombre de clase
                if (entityType.ClrType.Name.Equals(nombre, StringComparison.OrdinalIgnoreCase))
                    return true;

                // Buscar por nombre de vista (ToView)
                var viewName = entityType.GetViewName();
                if (viewName != null && viewName.Equals(nombre, StringComparison.OrdinalIgnoreCase))
                    return true;

                // Buscar por nombre de tabla (ToTable)
                var tableName = entityType.GetTableName();
                if (tableName != null && tableName.Equals(nombre, StringComparison.OrdinalIgnoreCase))
                    return true;

                // Buscar por nombre sin namespace
                var shortName = entityType.ClrType.Name;
                if (shortName.Equals(nombre, StringComparison.OrdinalIgnoreCase))
                    return true;

                return false;
            });

            if (matchingEntity != null)
            {
                return matchingEntity.ClrType;
            }

            throw new InvalidOperationException($"No se encontró el modelo '{nombre}' en el contexto '{context.GetType().Name}'.");
        }
        /// <summary>
        /// Actualiza múltiples entidades de una tabla en función de los filtros aplicados y los campos a actualizar.
        /// </summary>
        /// <param name="context">El contexto de base de datos (DbContext).</param>
        /// <param name="modelo">El tipo de la entidad a actualizar.</param>
        /// <param name="filtros">Una lista de filtros dinámicos para seleccionar las entidades a actualizar.</param>
        /// <param name="camposActualizados">Un diccionario con los nombres de las propiedades y los valores que se actualizarán.</param>
        /// <returns>El número de entidades afectadas por la actualización.</returns>
        public static async Task<int> UpdateMultipleEntitiesAsync(
			DbContext context,
			Type modelo,
			List<DynamicFilter> filtros,
			Dictionary<string, object?> camposActualizados)
		{
			var dbSet = context.GetType()
				.GetMethod("Set", Type.EmptyTypes)!
				.MakeGenericMethod(modelo)
				.Invoke(context, null);

			var queryable = dbSet as IQueryable;

			// Aplicar filtros con Dynamic LINQ.
			foreach (var filtro in filtros)
			{
				if (filtro.Operador.Equals("in", StringComparison.OrdinalIgnoreCase) && filtro.Valor is IEnumerable<object> lista)
				{
					queryable = queryable.Where($"@0.Contains({filtro.Campo})", lista);
				}
				else if (filtro.Operador.Equals("like", StringComparison.OrdinalIgnoreCase))
				{
					queryable = queryable.Where($"{filtro.Campo}.Contains(@0)", filtro.Valor);
				}
				else
				{
					queryable = queryable.Where($"{filtro.Campo} {filtro.Operador} @0", filtro.Valor);
				}
			}

			// Obtener todos los resultados que cumplan el filtro.
			var entidades = await queryable.ToDynamicListAsync();

			// Actualizar las propiedades de las entidades con los nuevos valores.
			foreach (var entidad in entidades)
			{
				foreach (var kvp in camposActualizados)
				{
					var propInfo = modelo.GetProperty(kvp.Key);

					if (propInfo == null)
					{
						throw new InvalidOperationException($"La propiedad '{kvp.Key}' no existe en '{modelo.Name}'.");
					}

					propInfo.SetValue(entidad, kvp.Value);
				}
			}

			return await context.SaveChangesAsync();
		}


		public static T? GetProperty<T>(object obj, string propertyName)
		{
			var prop = obj.GetType().GetProperty(propertyName);
			return prop != null ? (T)Convert.ChangeType(prop.GetValue(obj), typeof(T)) : default;
		}

		public class DynamicFilter
		{
			public string Campo { get; set; } = string.Empty;
			public string Operador { get; set; } = "="; // =, in, like, >, <, etc.
			public object? Valor { get; set; }
		}



		public static async Task InsertEntityAsync(DbContext context, string entityName, Dictionary<string, object> values)
		{
			var entityType = Type.GetType($"TuNamespace.{entityName}"); // Reemplaza TuNamespace
			if (entityType == null)
			{
				throw new ArgumentException($"Tipo de entidad '{entityName}' no encontrado.");
			}

			var entity = Activator.CreateInstance(entityType);

			foreach (var kvp in values)
			{
				var property = entityType.GetProperty(kvp.Key, System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
				if (property != null && property.CanWrite && property.PropertyType.IsAssignableFrom(kvp.Value.GetType()))
				{
					property.SetValue(entity, kvp.Value);
				}
				// Podrías agregar manejo para propiedades no encontradas o tipos incorrectos
			}

			context.Add(entity);
			await context.SaveChangesAsync();
		}

	}
}
