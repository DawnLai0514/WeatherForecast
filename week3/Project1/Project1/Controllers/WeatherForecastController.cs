using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text.Json;
using Project1.Interface;
using Microsoft.Extensions.Primitives;
using Project1.ViewModels;
using Project1.ServiceModel;
using AutoMapper;

namespace Project1.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private WeatherInterface _service;
        private IMapper _mapper;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, WeatherInterface service, IMapper mapper)
        {
            _logger = logger;
            _service = service;
            _mapper = mapper;

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
        public ActionResult<List<WeatherCastRespViewModel>> AddData([FromBody] WeatherCastViewModel res)
        {
            var log = JsonSerializer.Serialize(res);
            Log("AddData " + log);
            _logger.LogInformation("GetAllData"+log);
            var map = _mapper.Map<WeatherServiceModel>(res);
            var data = _service.AddData(map);
            var mapr = _mapper.Map<List<WeatherCastRespViewModel>>(data);
            return mapr;
        }

        [HttpGet(Name = "GetAllData")]
        public ActionResult<List<WeatherCastRespViewModel>> GetAllData()
        {
            var data = _service.GetAllData();
            Log("GetAllData");
            _logger.LogInformation("GetAllData");
            var map = _mapper.Map<List<WeatherCastRespViewModel>>(data);
            return map;
           
        }

        [HttpPost(Name = "Sort")]
        public ActionResult<List<WeatherCastRespViewModel>> Sort([FromBody] string desc, [FromHeader] string msg)
        {
            var qryWeathers = _service.Sort(desc);
            Log("Sort");
            var map = _mapper.Map<List<WeatherCastRespViewModel>>(qryWeathers);
            return map;
        }

        [HttpPost(Name = "DeleteData")]
        public ActionResult<List<WeatherCastRespViewModel>> DeleteData([FromBody] int ID)
        {
            StringValues VerifyCode = "";
            var token = HttpContext.Request.Headers.TryGetValue("Authentication", out VerifyCode);
            Log("Headers資料: "+ VerifyCode);
            var data = _service.DeleteData(ID);
            var log = JsonSerializer.Serialize(data);
            Log("DeleteData" + log);
            var list = _service.GetAllData();
            var map = _mapper.Map<List<WeatherCastRespViewModel>>(list);
            return map;
        }

        [HttpPost(Name = "FilterWeather")]
        public ActionResult<List<WeatherCastRespViewModel>> FilterWeather([FromBody] string tem)
        {
            var Lists = _service.FilterWeather(tem);
            Log("FilterWeather ");
            var map = _mapper.Map<List<WeatherCastRespViewModel>>(Lists);
            return map;

        }

        [HttpPost(Name = "UpdateData")]
        public ActionResult<List<WeatherCastRespViewModel>> UpdateData([FromBody] WeatherCastViewModel weather)
        {
            var map = _mapper.Map<WeatherServiceModel>(weather);
            var data = _service.UpdateData(map);
            var list = _service.GetAllData();
            var log = JsonSerializer.Serialize(data);
            Log("UpdateData " + log);
            var mapr = _mapper.Map<List<WeatherCastRespViewModel>>(list);
            return mapr;
        }

    }
}
