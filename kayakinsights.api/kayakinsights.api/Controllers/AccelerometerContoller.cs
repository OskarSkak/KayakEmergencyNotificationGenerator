using System;
using System.Threading.Tasks;
using kayakinsights.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace kayakinsights.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccelerometerController : ControllerBase
    {
        
        [HttpPost]
        public async Task<Accelerometer> AddAccelerometerData([FromBody] Accelerometer model)
        {
            return null;
        }
        
    }
}