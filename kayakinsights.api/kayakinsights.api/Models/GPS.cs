using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace kayakinsights.api.Models
{
    public class GPS
    {
        public DateTime stamp { get; set; }
        
        public double altitude { get; set; }
        public double latitude { get; set; }
        public double longitude {get; set;}
        public int altitudeAccuracy { get; set; }
        public int accuracy { get; set; }
        

    }
}
