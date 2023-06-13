using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project1.Interface;
using Project1.Models;
using Microsoft.AspNetCore.Mvc;

namespace Project1.Service
{
    public class WeatherService: WeatherInterface
    {
        private MyDBContext _context;
        public WeatherService( MyDBContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetAllData")]
        public List<WeatherTable> GetAllData()
        {
            var data = _context.WeatherTable.ToList();
            return data;
        }

        [HttpPost(Name = "AddData")]
        public List<WeatherTable> AddData(WeatherTable res)
        {
            var last = _context.WeatherTable.OrderByDescending(d => d.Id).FirstOrDefault();
            res.Id = last.Id + 1;
            _context.WeatherTable.Add(res);
            _context.SaveChanges();
            return _context.WeatherTable.ToList();
        }

        [HttpPost(Name = "Sort")]
        public List<WeatherTable> Sort( string desc)
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
            return qryWeathers.ToList();
        }
        [HttpPost(Name = "DeleteData")]
        public WeatherTable DeleteData( int ID)
        {
            var data = _context.WeatherTable.FirstOrDefault(d => d.Id == ID);
            _context.WeatherTable.Remove(data);
            _context.SaveChanges();
            return data;
        }

        [HttpPost(Name = "FilterWeather")]
        public List<WeatherTable> FilterWeather( string tem)
        {
            var Lists = _context.WeatherTable.Where(x => x.Summary == tem).ToList();
            return Lists;
        }

        [HttpPost(Name = "UpdateData")]
        public WeatherTable UpdateData( WeatherTable weather)
        {
            var data = _context.WeatherTable.FirstOrDefault(d => d.Id == weather.Id);
            data.Date = weather.Date;
            data.TemperatureC = weather.TemperatureC;
            data.Summary = weather.Summary;
            _context.SaveChanges();
            return data;
        }
    }
}
