using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewProject.Interfaces
{
    public interface IWeatherRepository
    {
        Task<IEnumerable<WeatherForecast>> GetById(string id);
    }
}
