using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project1.Interface;
using Project1.Models;
using Microsoft.AspNetCore.Mvc;
using Project1.ServiceModel;
using AutoMapper;
using Project1.DAO;

namespace Project1.Service
{
    public class WeatherService: IWeatherService
    {
        private readonly IWeatherRepository _weatherRepository;
        private MyDBContext _context;
        private IMapper _mapper;
        public WeatherService( MyDBContext context, IMapper mapper, IWeatherRepository weatherRepository)
        {
            _context = context;
            _mapper = mapper;
            _weatherRepository = weatherRepository;
        }

        [HttpGet(Name = "GetAllData")]
        public List<WeatherRespServiceModel> GetAllData()
        {
            var data = _weatherRepository.GetList().ToList() ;
            //var data = _context.WeatherTable.ToList();
            var map = _mapper.Map<List<WeatherRespServiceModel>>(data);
            return map;
        }

        [HttpPost(Name = "AddData")]
        public List<WeatherRespServiceModel> AddData(WeatherServiceModel res)
        {
            var last = _context.WeatherTable.OrderByDescending(d => d.Id).FirstOrDefault();
            res.Id = last.Id + 1;
            var map = _mapper.Map<WeatherTable>(res);
            _context.WeatherTable.Add(map);
            _context.SaveChanges();
            var data = _context.WeatherTable.ToList();
            var mapr = _mapper.Map<List<WeatherRespServiceModel>>(data);
            return mapr;
        }

        [HttpPost(Name = "Sort")]
        public List<WeatherRespServiceModel> Sort( string desc)
        {
            var qryWeathers = from m in _context.WeatherTable
                              select m;
            switch (desc)
            {
                case "temperaturefalse":
                    qryWeathers = qryWeathers.OrderBy(s => s.TemperatureC);
                    break;
                case "temperaturetrue":
                    qryWeathers = qryWeathers.OrderByDescending(s => s.TemperatureC);
                    break;
                case "summaryfalse":
                    qryWeathers = qryWeathers.OrderBy(s => s.Summary);
                    break;
                case "summarytrue":
                    qryWeathers = qryWeathers.OrderByDescending(s => s.Summary);
                    break;
                case "datefalse":
                    qryWeathers = qryWeathers.OrderBy(s => s.Date);
                    break;
                case "datetrue":
                    qryWeathers = qryWeathers.OrderByDescending(s => s.Date);
                    break;
            }
            var map = _mapper.Map<List<WeatherRespServiceModel>>(qryWeathers);
            return map;
        }
        [HttpPost(Name = "DeleteData")]
        public WeatherRespServiceModel DeleteData( int ID)
        {
            var data = _context.WeatherTable.FirstOrDefault(d => d.Id == ID);
            _context.WeatherTable.Remove(data);
            _context.SaveChanges();
            var map = _mapper.Map<WeatherRespServiceModel > (data);
            return map;
        }

        [HttpPost(Name = "FilterWeather")]
        public List<WeatherRespServiceModel> FilterWeather( string tem)
        {
            var Lists = _weatherRepository.Filter(tem).ToList();
            //var Lists = _context.WeatherTable.Where(x => x.Summary == tem).ToList();
            var map = _mapper.Map<List<WeatherRespServiceModel>>(Lists);
            return map;
        }

        [HttpPost(Name = "UpdateData")]
        public WeatherRespServiceModel UpdateData(WeatherServiceModel weather)
        {
            var data = _context.WeatherTable.FirstOrDefault(d => d.Id == weather.Id);
            data.Date = weather.Date;
            data.TemperatureC = weather.TemperatureC;
            data.Summary = weather.Summary;
            _context.SaveChanges();
            var map = _mapper.Map<WeatherRespServiceModel>(data);
            return map;
        }
    }
}
