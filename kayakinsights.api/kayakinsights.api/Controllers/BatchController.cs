using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using kayakinsights.api.Models;
using kayakinsights.api.repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace kayakinsights.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BatchController : ControllerBase
    {

        private readonly BatchService _service;

        public BatchController(BatchService gpsService)
        {
            this._service = gpsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<BatchModel>>> Get()
        {
            return await _service.Get();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BatchModel dto)
        {
            var result = await _service.Create(dto);
            return Ok(result);
        }

    }
}
