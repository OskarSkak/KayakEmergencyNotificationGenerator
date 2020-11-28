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
            // Specify seconds to run and call the App. Currently every 5 sec
            RecurringJob.AddOrUpdate("1",() => Running(), "*/5 * * * * *");
        }

        public void Running()
        {
            Console.WriteLine("running");
            hubContext.Clients.All.SendAsync("TEST", false);
            
        }
        
        public async Task StopAnalysis()
        {
            // Specify seconds to run and call the App. Currently every 5 sec
            RecurringJob.RemoveIfExists("1");
        }
        
        public async Task TestFalling()
        {
            // Specify seconds to run and call the App. Currently every 5 sec
            RecurringJob.RemoveIfExists("1");
            await hubContext.Clients.All.SendAsync("TEST", true);
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
            // Tjek lige her! 
            return new AnalysisResult();
        }

        
    }
}
