using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project1.ServiceModel;

namespace Project1.Interface
{
    public interface IWeatherService
    {

        public List<WeatherRespServiceModel> AddData(WeatherServiceModel res);
        public List<WeatherRespServiceModel> GetAllData();
        public List<WeatherRespServiceModel> Sort(string desc);
        public WeatherRespServiceModel DeleteData(int id);
        public List<WeatherRespServiceModel> FilterWeather(string tem);
        public WeatherRespServiceModel UpdateData(WeatherServiceModel weather);

    }
}
