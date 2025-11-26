namespace Loki.DTOs.MetasDTOs
{
    public class MetaDetalleDto
    {
        public string Tipo_Personal { get; set; }
        public string No_Empleado { get; set; }
        public string Login { get; set; }
        public string Status { get; set; }
        public string Nombre_Del_Personal { get; set; }
        public string Num_Telefonico_Celular { get; set; }
        public string Puesto { get; set; }
        public DateTime Fecha_De_Ingreso_A_La_Cartera { get; set; }
        public string Cartera { get; set; }
        public string Segmento_Producto { get; set; }
        public string Promesas_por_dia { get; set; }
        public string Gestiones_por_dia { get; set; }
        public string Direccion { get; set; }
        public string SubDirector { get; set; }
        public string Gerente { get; set; }
        public string Coordinador { get; set; }
        public string Supervisor { get; set; }
        public string Turno { get; set; }
        public string Horario { get; set; }
        public string Sucursal { get; set; }
        public string Comentarios { get; set; }
        public string Sucursal_ { get; set; }
        public object Calidad { get; set; } // Tipo 'object' para manejar posible null/string/decimal
        public object Promesas { get; set; }
        public object Cumplimiento { get; set; }
        public string Semana_1_del_1_al_7 { get; set; }
        public string Semana_2_del_8_al_14 { get; set; }
        public string Semana_3_del_15_al_21 { get; set; }
        public string Semana_4_del_22_al_31 { get; set; }
        public string Meta_Total { get; set; }
    }
}
