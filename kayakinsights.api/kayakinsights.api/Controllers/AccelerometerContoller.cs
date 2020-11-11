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
        
        [HttpPost]
        public async Task<Accelerometer> AddAccelerometerData([FromBody] AccelerometerModel model)
        {
            return null;
        }
        
    }
}