namespace Loki.DTOs.BusquedaDTOs
{
    public class ParameterDto
    {
        public string Concepto { get; set; } = string.Empty;
        public string Campo { get; set; } = string.Empty;
        public string Simbolo { get; set; } = string.Empty; // Símbolo como "<", "=", "≥", etc.
        public string Valor { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty; // Para parámetros de lista (id del valor)
        public string Dato { get; set; } = string.Empty; // Tipo de dato del campo (char, int, date, list)
    }
}