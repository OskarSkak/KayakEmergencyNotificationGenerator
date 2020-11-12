using kayakinsights.api.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.repositories
{
    public class BatchService
    {
        private readonly IMongoCollection<BatchModel> _gpsContext;

        public BatchService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDB"));
            var database = client.GetDatabase("MongoDB");
            _gpsContext = database.GetCollection<BatchModel>("BATCH");
        }

        public async Task<List<BatchModel>> Get()
        {
            return await _gpsContext.Find(s => true).ToListAsync();
        }

        public async Task<BatchModel> Create(BatchModel s)
        {
            await _gpsContext.InsertOneAsync(s);
            return s;
        }
    }
}
