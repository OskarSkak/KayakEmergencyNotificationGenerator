using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using kayakinsights.api.Models;
using Microsoft.AspNetCore.SignalR;

namespace kayakinsights.api.Hub
{
    public class SignalRHub : Microsoft.AspNetCore.SignalR.Hub, HubImpl
    {
        /*public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }*/
        

        public async Task SendMessage(AnalysisResult res)
        {
            
            await Clients.All.SendAsync("Analysis" , res);
        }
    }

    public interface HubImpl
    {
        public Task SendMessage(AnalysisResult res);
    }
}
