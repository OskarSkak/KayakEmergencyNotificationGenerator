using System;
using System.Collections.Generic;
using System.IO;
using AutoMapper;
using kayakinsights.api.Models;
using kayakinsights.api.Models.ModelFromFile;
using Newtonsoft.Json;

namespace kayakinsights.api.repositories
{

    public interface IDataFromFile
    {
        BatchModel GetDataFromFile();
    }
    
    
    public class DataFromFile : IDataFromFile
    {
        private readonly IMapper _mapper;
        public Data Data { get; set; }

        public DataFromFile(IMapper mapper)
        {
            _mapper = mapper;
            var myJsonString = File.ReadAllText("data.json");
            var jsonObject = JsonConvert.DeserializeObject<Data>(myJsonString);
            Data = jsonObject;

        }
        
        public BatchModel GetDataFromFile()
        {
            
            BatchModel batchModel = new BatchModel();
            batchModel.Accelerometer = new List<Accelerometer>();
            batchModel.Gyroscope = new List<Gyroscope>();
            foreach (var innerdata in Data.data)
            {
                batchModel.Accelerometer.AddRange(_mapper.Map<List<Accelerometer>>(innerdata.accelerometerSensors));
                batchModel.Gyroscope.AddRange(_mapper.Map<List<Gyroscope>>(innerdata.gyroScopeSensors));
            }

            return batchModel;
        }
    }
}