using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Loki.DTOs.Procesos.Visitas
{
    public enum CampoEdicionVisita
    {
        FechaVisita,
        Ejecutivo,
        Sucursal,
        Comentario
    }

    public class BuscarVisitasRequestDto
    {
        [Required]
        public int IdCartera { get; set; }
        public required string IdCuenta { get; set; }
    }

    public class VisitaEditableDto
    {
        public DateTime FechaCaptura { get; set; } // Fecha_Insert
        public TimeSpan HoraCaptura { get; set; } // Segundo_Insert (Parte de la PK original?)

        public DateTime FechaVisita { get; set; }
        public TimeSpan HoraVisita { get; set; } // Segundo_Visita (Usado como PK en el WHERE del update)

        public int IdEjecutivo { get; set; }
        public string Usuario { get; set; }
        public string NombreEjecutivo { get; set; }

        public int? IdSucursal { get; set; }
        public string Sucursal { get; set; }

        public string Contacto { get; set; }
        public string Situacion { get; set; }
        public string Comentario { get; set; }
    }

    public class EditarVisitaRequestDto
    {
        [Required]
        public int IdCartera { get; set; }

        public required string IdCuenta { get; set; }

        // Llaves para identificar el registro único a editar
        [Required]
        public DateTime FechaVisitaKey { get; set; }

        [Required]
        [JsonConverter(typeof(JsonTimeSpanConverter))] // Asegúrate de tener un converter para TimeSpan o usa string "HH:mm:ss"
        public TimeSpan HoraVisitaKey { get; set; } // Segundo_Visita

        [Required]
        public CampoEdicionVisita Campo { get; set; }

        [Required]
        public string NuevoValor { get; set; }
        // Nota sobre NuevoValor:
        // - FechaVisita: string "yyyy-MM-dd"
        // - Ejecutivo: string "CLAVE" (Usuario de 4 letras)
        // - Sucursal: string "ID"
        // - Comentario: string "Texto"
    }

    // Helper simple para JSON si no tienes uno global
    public class JsonTimeSpanConverter : JsonConverter<TimeSpan>
    {
        public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            => TimeSpan.Parse(reader.GetString()!);
        public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
            => writer.WriteStringValue(value.ToString());
    }
}