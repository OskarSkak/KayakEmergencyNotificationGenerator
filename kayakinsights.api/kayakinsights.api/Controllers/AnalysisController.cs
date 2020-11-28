using kayakinsights.api.lib;
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
        private DataTools _model;
        private SequentialDataTools _sTools;

        public AnalysisController(AnalysisService _service , IDataFromFile dataFromFile, DataTools model
            , SequentialDataTools sTools)
        {
            this._service = _service;
            _dataFromFile = dataFromFile;
            _model = model;
            _sTools = sTools;
        }

        [HttpPost]
        public async Task<ActionResult<AnalysisResult>> Start()
        {
            //var result = "SUCCESS";
            //await _service.StartAnalysis();

            //Example on how to get the data
            //DataTools.writeDataToCSV();
            //DataTools.extractNextInterval(180*1000, 40, 40);

            var l = _sTools.extractNext(50, 40, 40);


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
