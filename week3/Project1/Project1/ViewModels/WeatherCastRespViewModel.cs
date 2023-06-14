using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.ViewModels
{
    public class WeatherCastRespViewModel
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public int TemperatureC { get; set; }
        public int? TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        public string Summary { get; set; }
    }
}
