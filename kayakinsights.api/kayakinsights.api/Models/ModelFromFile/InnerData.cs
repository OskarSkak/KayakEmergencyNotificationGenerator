using System.Collections.Generic;
using AutoMapper;

namespace kayakinsights.api.Models.ModelFromFile
{


    public class InnerData
    {
        public List<FileAccelerometer> 	accelerometerSensors { get; set; }
        public List<FileGyroscope> 	gyroScopeSensors { get; set; }
        
    }
    
    
}