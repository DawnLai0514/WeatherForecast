using Dapper;
using Microsoft.Data.SqlClient;
using Project1.Interface;
using Project1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.DAO
{
    public class WeatherRepository: IWeatherRepository
    {
        private readonly string _connectString = @"Server=(LocalDB)\MSSQLLocalDB;Database=MyDB;Trusted_Connection=True;";

        public IEnumerable<WeatherTable> GetList()
        {
            using (var conn = new SqlConnection(_connectString))
            {
                var result = conn.Query<WeatherTable>("SELECT * FROM WeatherTable");
                return result;
            }
        }

        public IEnumerable<WeatherTable> Filter(string summary)
        {
            using (var conn = new SqlConnection(_connectString))
            {
                var result = conn.Query<WeatherTable>(
                    "SELECT * FROM WeatherTable Where Summary = @summary",
                    new
                    {
                        Summary = summary,
                    });
                return result;
            }
        }

    }    
}
