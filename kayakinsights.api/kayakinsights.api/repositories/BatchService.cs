using kayakinsights.api.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.repositories
{
    public class BatchService
    {
        private readonly IMongoCollection<BatchModel> _context;

        public BatchService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDB"));
            var database = client.GetDatabase("MongoDB");
            _context = database.GetCollection<BatchModel>("BATCH");
        }

        public async Task<List<BatchModel>> Get()
        {
            return await _context.Find(s => true).ToListAsync();
        }

        public async Task<List<BatchModel>> Get(DateTime from, DateTime to)
        {
            var filterBuilder = Builders<BatchModel>.Filter;
            var filter = filterBuilder.Gte(x => x.TimeStamp, new BsonDateTime(from)) &
                filterBuilder.Lte(x => x.TimeStamp, new BsonDateTime(to));

            return await _context.Find(filter).ToListAsync();
        }

        public async Task<BatchModel> Create(BatchModel s)
        {
            await _context.InsertOneAsync(s);

            return s;
        }
    }
}
