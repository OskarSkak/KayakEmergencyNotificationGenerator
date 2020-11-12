using kayakinsights.api.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.repositories
{
    
    public class GPSService
    {
        private readonly IMongoCollection<GPS> _gpsContext;

        public GPSService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDB"));
            var database = client.GetDatabase("MongoDB");
            _gpsContext = database.GetCollection<GPS>("GPS");
        }

        public async Task<List<GPS>> Get()
        {
            return await _gpsContext.Find(s => true).ToListAsync();
        }

        public async Task<GPS> Create(GPS s)
        {
            await _gpsContext.InsertOneAsync(s);
            return s;
        }

        public async Task<GPS> Get(string id)
        {
            return await _gpsContext.Find(s => s.Id == id).FirstOrDefaultAsync();
        }



        public async Task<GPS> Update(string id, GPS s)
        {
            await _gpsContext.ReplaceOneAsync(su => su.Id == id, s);
            return s;
        }


        public async Task Remove(string id)
        {
            await _gpsContext.DeleteOneAsync(su => su.Id == id);
        }
    }
}
