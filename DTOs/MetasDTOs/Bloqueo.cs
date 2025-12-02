namespace Loki.DTOs.MetasDTOs
{
    public class Bloqueo
    {
        /// <summary>Fecha mínima permitida para la meta.</summary>
        public DateTime MinDate { get; set; }

        /// <summary>Fecha máxima permitida para la meta.</summary>
        public DateTime MaxDate { get; set; }

        /// <summary>Mensaje informativo sobre el resultado.</summary>
        public string Message { get; set; }
    }
}
