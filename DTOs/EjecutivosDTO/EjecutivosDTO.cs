using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Data;

namespace Loki.DTOs.EjecutivosDTO
{
    public class EjecutivosDTO
    {
        public EjecutivosDTO(int IdEjecutivo, DateOnly FechaInsert, short IdÁrea, short IdSucursal, short IdCartera, short IdProducto, string server)
        {
            this.IdEjecutivo = IdEjecutivo;
            this.FechaInsert = FechaInsert;
            this.IdÁrea = IdÁrea;
            this.IdSucursal = IdSucursal;
            this.IdCartera = IdCartera;
            this.IdProducto = IdProducto;
            //this.server = server;
        }

        public int IdEjecutivo { get; set; }
        public DateOnly FechaInsert { get; set; }
        public short IdÁrea { get; set; }
        public short? IdSucursal { get; set; }
        public short? IdCartera { get; set; }
        public short? IdProducto { get; set; }
       

     
        public int Cuentas { get; set; }
        public int Titulares { get; set; }
        public int Negociaciones { get; set; }
        public int Cumplimientos { get; set; }
        public decimal MontoCumplido { get; set; }
        public decimal? SaldoSolucionado { get; set; }
        public string? Segmento { get; set; }
        public TimeSpan? HoraEntrada { get; set; }
        public TimeSpan? HoraSalida { get; set; }
        public int Nuevo { get; set; }
        //[JsonIgnore]
        //public string server { get; set; }
    }
}