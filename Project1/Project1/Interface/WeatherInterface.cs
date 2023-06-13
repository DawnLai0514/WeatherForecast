using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project1.Models;

namespace Project1.Interface
{
    public interface WeatherInterface
    {

        public List<WeatherTable> AddData(WeatherTable res);
        public List<WeatherTable> GetAllData();
        public List<WeatherTable> Sort(string desc);
        public WeatherTable DeleteData(int id);
        public List<WeatherTable> FilterWeather(string tem);
        public WeatherTable UpdateData(WeatherTable weather);

    }
}
