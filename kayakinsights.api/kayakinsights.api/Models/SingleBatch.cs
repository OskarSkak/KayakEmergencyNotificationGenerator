using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.Models
{
    public class SingleBatch
    {
        public GPS GPS { get; set; }
        public Accelerometer ac { get; set; }
        public Gyroscope gyroscope { get; set; }
    }
}
