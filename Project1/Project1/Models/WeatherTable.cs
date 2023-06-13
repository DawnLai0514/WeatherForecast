using System;
using System.Collections.Generic;

namespace Project1.Models
{
    public partial class WeatherTable
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public int TemperatureC { get; set; }
        public int? TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        public string Summary { get; set; }
    }
}
