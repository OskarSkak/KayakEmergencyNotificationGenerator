using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using kayakinsights.api.lib;
using kayakinsights.api.Models;
using kayakinsights.api.repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace kayakinsights.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BatchController : ControllerBase
    {

        private static readonly string RECEIVED_RESPONSE = "Batch Received"; 

        private readonly BatchService _service;
        private readonly SequentialDataTools _stools;
        private readonly AnalysisService _det;

        public BatchController(
            BatchService gpsService, 
            SequentialDataTools stools,
            AnalysisService det
            )
        {
            this._service = gpsService;
            this._stools = stools;
            this._det = det;
        }

        [HttpGet]
        public async Task<ActionResult<List<BatchModel>>> Get()
        {
            return await _service.Get();
        }

        [HttpPost]
        public async Task<IActionResult> AnalyzeBatch([FromBody] BatchModel dto)
        {
            
            var db_res = _service.Create(dto); //dont really want this one to take a long time -> dont really care to much about db integrity
            _det.testBatch(dto);
            return Ok(RECEIVED_RESPONSE);
        }

    }
}
