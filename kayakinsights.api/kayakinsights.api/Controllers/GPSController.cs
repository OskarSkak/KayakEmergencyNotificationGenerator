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
    public class GPSController : ControllerBase
    {
        [HttpPost]
        public async Task<GPS> AddAccelerometerData([FromBody] GPS model)
        {
            return null;
        }
    }
}
