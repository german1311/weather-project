using InterviewProject.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace InterviewProject.Repository
{
    public class MetaweatherRepository : IWeatherRepository
    {
        const string HOST = "https://www.metaweather.com/api/location/";
        public async Task<IEnumerable<WeatherForecast>> GetById(string id)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{HOST}{id}");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                var deserialized = JsonConvert.DeserializeObject<MetaweatherResponse>(responseBody);

                return deserialized.ConsolidatedResponse.Select(r => new WeatherForecast()
                {
                    Summary = r.State,
                    TemperatureC = r.Temperature,
                    Date = DateTime.Parse(r.ApplicableDate)
                });
            }
        }

        class WeatherReponse
        {
            [JsonProperty(PropertyName = "weather_state_name")]
            public string State { get; set; }

            [JsonProperty(PropertyName = "applicable_date")]
            public string ApplicableDate { get; set; }

            [JsonProperty(PropertyName = "the_temp")]
            public double Temperature { get; set; }
        }


        class MetaweatherResponse
        {
            [JsonProperty(PropertyName = "consolidated_weather")]
            public IEnumerable<WeatherReponse> ConsolidatedResponse { get; set; }
        }

    }
}
