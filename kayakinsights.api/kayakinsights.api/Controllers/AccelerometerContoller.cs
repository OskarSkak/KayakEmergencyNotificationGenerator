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
           var result =  await _service.GetById(id);
           return result;


        }
        
        [HttpPost]
        public async Task<AccelerometerModel> AddAccelerometerData(AccelerometerModel model)
        {
            var result = await _service.AddAccelerometerData(model);
            return result;


        }
        
    }
}