using Project1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Interface
{
    public interface IWeatherRepository
    {
        public IEnumerable<WeatherTable> GetList();
        public IEnumerable<WeatherTable> Filter(string summary);
    }
}
