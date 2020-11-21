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
    public class GPSController : ControllerBase
    {
        private readonly GPSService _service;

        public GPSController(GPSService gpsService)
        {
            this._service = gpsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GPS>>> Get()
        {
            return await _service.Get();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GPS dto)
        {
            // var result = await _service.Create(dto);
            object result = null;
            System.Threading.Thread.Sleep(1000);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(string id)
        {
            var result = await _service.Get(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] GPS request)
        {
            var existing = await _service.Get(id);
            if (existing == null) return NotFound();
            request.Id = existing.Id;

            var result = await _service.Update(id, request);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existing = await _service.Get(id);
            if (existing == null) return NotFound();
            await _service.Remove(id);
            return Ok();
        }
    }
}
