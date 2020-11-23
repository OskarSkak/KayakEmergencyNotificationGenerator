using kayakinsights.api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SingleBatchController : ControllerBase
    {
        [HttpPost]
        public async Task<AnalysisResult> analyze([FromBody] SingleBatch model)
        {
            return new AnalysisResult();
        }

    }
}
