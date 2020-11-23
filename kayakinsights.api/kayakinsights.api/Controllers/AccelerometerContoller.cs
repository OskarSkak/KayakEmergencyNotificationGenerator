using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using kayakinsights.api.Models;
using kayakinsights.api.repositories;
using Microsoft.AspNetCore.Mvc;

namespace kayakinsights.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccelerometerController : ControllerBase
    {

        private readonly AccelerometerServicecs _service;

        public AccelerometerController(AccelerometerServicecs gpsService)
        {
            this._service = gpsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Accelerometer>>> Get()
        {
            return await _service.Get();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Accelerometer dto)
        {
            var result = await _service.Create(dto);
            return Ok(result);
        }

    }
}