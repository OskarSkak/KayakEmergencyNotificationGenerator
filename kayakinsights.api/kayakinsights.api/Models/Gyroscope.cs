using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.Models
{
    public class Gyroscope
    {
        public double x { get; set; }
        public double y { get; set; }
        public double z { get; set; }
        public DateTime stamp { get; set; }
    }
}
