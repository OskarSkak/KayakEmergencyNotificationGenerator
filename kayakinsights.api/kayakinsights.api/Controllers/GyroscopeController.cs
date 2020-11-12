using kayakinsights.api.Models;
using kayakinsights.api.repositories;
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
        private readonly GyroscopeService _service;

        public GyroscopeController(GyroscopeService gpsService)
        {
            this._service = gpsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Gyroscope>>> Get()
        {
            return await _service.Get();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Gyroscope dto)
        {
            var result = await _service.Create(dto);
            return Ok(result);
        }
    }
}
