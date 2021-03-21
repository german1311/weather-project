using InterviewProject.Interfaces;
using InterviewProject.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace InterviewProject.Repository
{
    public class MetaweatherLocationRepository : ILocationRepository
    {
        const string HOST = "https://www.metaweather.com/api/location/search/?query=";

        public async Task<IEnumerable<Location>> SearchByName(string name)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{HOST}{name}");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                var deserialized = JsonConvert.DeserializeObject<IEnumerable<MetaweatherLocation>>(responseBody);

                return deserialized.Select(r => new Location(r.WoeId, r.Title));
            }
        }


        class MetaweatherLocation
        {
            [JsonProperty(PropertyName = "title")]
            public string Title { get; set; }

            [JsonProperty(PropertyName = "woeid")]
            public string WoeId { get; set; }
        }
    }
}
