using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.Models
{
    public class BatchModel
    {
        public List<Accelerometer> Accelerometer { get; set; }
        public List<GPS> GPS { get; set; }
        public List<Gyroscope> Gyroscope { get; set; }

        public double Power { get; set; }
    }
}
