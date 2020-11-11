using System;
using System.Threading.Tasks;
using kayakinsights.api.Models;
using kayakinsights.api.services;
using Microsoft.AspNetCore.Mvc;

namespace kayakinsights.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccelerometerContoller : ControllerBase
    {
        private IAccelerometerService _service { get; set; }
        
        public AccelerometerContoller(IAccelerometerService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<AccelerometerModel> GetAccelerometerData(Guid id)
        {
            return null;
        }
        
        [HttpPost]
        public async Task<AccelerometerModel> AddAccelerometerData(AccelerometerModel model)
        {
            return null;
        }
        
    }
}