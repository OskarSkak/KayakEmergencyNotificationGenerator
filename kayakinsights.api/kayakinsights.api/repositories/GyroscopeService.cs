using kayakinsights.api.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.repositories
{
    public class GyroscopeService
    {
        private readonly IMongoCollection<Gyroscope> _gpsContext;

        public GyroscopeService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDB"));
            var database = client.GetDatabase("MongoDB");
            _gpsContext = database.GetCollection<Gyroscope>("Gyroscope");
        }

        public async Task<List<Gyroscope>> Get()
        {
            return await _gpsContext.Find(s => true).ToListAsync();
        }

        public async Task<Gyroscope> Create(Gyroscope s)
        {
            await _gpsContext.InsertOneAsync(s);
            return s;
        }
    }
}
