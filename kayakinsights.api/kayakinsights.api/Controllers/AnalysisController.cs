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
    public class AnalysisController : ControllerBase
    {
        AnalysisService _service;

        public AnalysisController(AnalysisService _service)
        {
            this._service = _service;
        }

        [HttpPost]
        public async Task<ActionResult<AnalysisResult>> Create()
        {
            var result = "SUCCESS";
            await _service.StartAnalysis();
            return Ok(result);
        }
    }
}
