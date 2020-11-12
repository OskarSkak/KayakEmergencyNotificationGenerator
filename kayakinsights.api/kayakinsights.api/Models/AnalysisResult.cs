using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace kayakinsights.api.Models
{
    public class AnalysisResult
    {
        public double Power { get; set; }
        public GPS GPS { get; set; }
        public bool IsFallen { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
