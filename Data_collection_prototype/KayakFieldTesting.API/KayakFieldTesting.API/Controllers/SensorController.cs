using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KayakFieldTesting.API.Controllers
{
    
    [ApiController]
    [Route("api/sensor")]
    public class SensorController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> PostSensorData([FromBody] SensorModel model )
        {
            Console.WriteLine(model);
            return Ok(model);
        }
        [HttpGet]
        public async Task<IActionResult> Get( )
        {
            
            return Ok("model");
        }
    }
}