using kayakinsights.api.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.repositories
{
    public class AccelerometerServicecs
    {
        private readonly IMongoCollection<Accelerometer> _gpsContext;

        public AccelerometerServicecs(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDB"));
            var database = client.GetDatabase("MongoDB");
            _gpsContext = database.GetCollection<Accelerometer>("Accelerometer");
        }

        public async Task<List<Accelerometer>> Get()
        {
            return await _gpsContext.Find(s => true).ToListAsync();
        }

        public async Task<Accelerometer> Create(Accelerometer s)
        {
            await _gpsContext.InsertOneAsync(s);
            return s;
        }
    }
}
