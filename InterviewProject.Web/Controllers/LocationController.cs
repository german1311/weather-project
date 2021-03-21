﻿using InterviewProject.Interfaces;
using InterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ILocationRepository _locationRepository;
        public LocationController(ILogger<WeatherForecastController> logger, ILocationRepository locationRepository)
        {
            _logger = logger;
            _locationRepository = locationRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Location>> Get(string name)
        {
            return await _locationRepository.SearchByName(name);
        }
    }
}
