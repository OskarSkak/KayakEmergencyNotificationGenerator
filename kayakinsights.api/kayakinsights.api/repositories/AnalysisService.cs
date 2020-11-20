using Hangfire;
using kayakinsights.api.Hub;
using kayakinsights.api.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace kayakinsights.api.repositories
{
    public class AnalysisService
    {
        private readonly IHubContext<SignalRHub> hubContext;
        private readonly GPSService gpsService;
        private readonly AccelerometerServicecs acService;
        private readonly BatchService batchService;
        private readonly GyroscopeService gyroService;
        private Timer timer;

        public AnalysisService(
            IHubContext<SignalRHub> hubContext, 
            GPSService gpsService, 
            AccelerometerServicecs acService,
            BatchService batchService,
            GyroscopeService gyroService
            )
        {
            this.hubContext = hubContext;
            this.gpsService = gpsService;
            this.acService = acService;
            this.batchService = batchService;
            this.gyroService = gyroService;
        }

        public async Task StartAnalysis()
        {
            BackgroundJob.Schedule(() => Running(), TimeSpan.FromSeconds(0));
        }

        public async Task Running()
        {
            while (true)
            {
                var delayTask = Task.Delay(20000);
                await hubContext.Clients.All.SendAsync("TEST", new AnalysisResult());
            }
        }

        private async Task<AnalysisResult> AnalyzeLatestBatch()
        {
            var to = DateTime.Today;
            var from = to.AddSeconds(-45);
            var batch = await batchService.Get(from, to);
            return await AnalyzeBatch(batch);
        }

        private async Task<AnalysisResult> AnalyzeBatch(List<BatchModel> batch)
        {

        }

        
    }
}
