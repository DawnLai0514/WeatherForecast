using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project1.Models;
using System.IO;
using System.Text.Json;
using Project1.Interface;

namespace Project1.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        private MyDBContext _context;
        private WeatherInterface _service;
        private ServiceModel _servicem;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, MyDBContext context, WeatherInterface service, ServiceModel servicem)
        {
            _context = context;
            _logger = logger;
            _service = service;
            _servicem = servicem;
        }

        
        private void Log(string text)
        {
            try
            {
                FileStream fs = new FileStream("Log/log.text",FileMode.Append,FileAccess.Write,FileShare.ReadWrite);
                StreamWriter sw = new StreamWriter(fs);
                var time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                sw.Write(time);
                sw.WriteLine(": " + text);
                sw.Close();
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }

        [HttpPost(Name = "AddData")]
        public ActionResult<List<WeatherTable>> AddData([FromBody] WeatherTable res)
        {
            var log = JsonSerializer.Serialize(res);
            Log("AddData " + log);
            return _service.AddData(res);
        }

        [HttpGet(Name = "GetAllData")]
        public ActionResult<List<WeatherTable>> GetAllData()
        {
            var data = _service.GetAllData();
            Log("GetAllData");
            return data;
           
        }

        [HttpPost(Name = "Sort")]
        public ActionResult<List<WeatherTable>> Sort([FromBody] string desc)
        {
            var qryWeathers = _service.Sort(desc);
            Log("Sort");
            return qryWeathers.ToList();
        }

        [HttpPost(Name = "DeleteData")]
        public ActionResult<List<WeatherTable>> DeleteData([FromBody] int ID)
        {
            var data = _service.DeleteData(ID);
            var log = JsonSerializer.Serialize(data);
            Log("DeleteData" + log);
            var list = _service.GetAllData();
            return list;
        }

        [HttpPost(Name = "FilterWeather")]
        public ActionResult<List<WeatherTable>> FilterWeather([FromBody] string tem)
        {
            var Lists = _service.FilterWeather(tem);
            Log("FilterWeather ");
            return Lists;

        }

        [HttpPost(Name = "UpdateData")]
        public ActionResult<List<WeatherTable>> UpdateData([FromBody] WeatherTable weather)
        {
            var data = _service.UpdateData(weather);
            var list = _service.GetAllData();
            var log = JsonSerializer.Serialize(data);
            Log("UpdateData " + log);
            return list;
        }

    }
}
