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
    [Route("api/[controller]")]
    public class AnalysisController : ControllerBase
    {
        AnalysisService _service;
        private readonly IDataFromFile _dataFromFile;

        public AnalysisController(AnalysisService _service , IDataFromFile dataFromFile)
        {
            this._service = _service;
            _dataFromFile = dataFromFile;
        }

        [HttpPost]
        public async Task<ActionResult<AnalysisResult>> Create()
        {
            //var result = "SUCCESS";
            //await _service.StartAnalysis();
            
            //Example on how to get the data
            var res = _dataFromFile.GetDataFromFile();
            return Ok();
        }
        
        [HttpDelete]
        public async Task<ActionResult<AnalysisResult>> Stop()
        {
            var result = "SUCCESS";
            await _service.StopAnalysis();
            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult<AnalysisResult>> Falled()
        {
            var result = "SUCCESS";
            await _service.TestFalling();
            return Ok(result);
        }
        
    }
}
