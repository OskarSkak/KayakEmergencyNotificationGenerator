using kayakinsights.api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GyroscopeController : ControllerBase
    {
        [HttpPost]
        public async Task<Gyroscope> AddAccelerometerData([FromBody] Gyroscope model)
        {
            return null;
        }
    }
}
