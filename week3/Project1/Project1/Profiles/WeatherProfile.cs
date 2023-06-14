using AutoMapper;
using Project1.Models;
using Project1.ServiceModel;
using Project1.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Profiles
{
    public class WeatherProfile: Profile
    {
        public WeatherProfile()
        {
            CreateMap<WeatherTable, WeatherServiceModel>();
            CreateMap<WeatherServiceModel, WeatherTable>();
            CreateMap<WeatherTable, WeatherRespServiceModel>();
            CreateMap<WeatherRespServiceModel, WeatherTable>();

            CreateMap<WeatherCastRespViewModel, WeatherServiceModel>();
            CreateMap<WeatherServiceModel, WeatherCastRespViewModel>();
            CreateMap<WeatherServiceModel, WeatherCastViewModel>();
            CreateMap<WeatherCastViewModel, WeatherServiceModel>();
            CreateMap<WeatherCastRespViewModel, WeatherRespServiceModel>();
            CreateMap<WeatherRespServiceModel, WeatherCastRespViewModel>();

        }
    }
}
