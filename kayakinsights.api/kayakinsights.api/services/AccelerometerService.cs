using System;
using System.Threading.Tasks;
using kayakinsights.api.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace kayakinsights.api.services
{
    public class AccelerometerService : IAccelerometerService
    {
        private readonly IMongoCollection<AccelerometerModel> _AcceleromaterDB;
        public AccelerometerService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("BookingDB"));
            var database = client.GetDatabase("BookingDB");
            _AcceleromaterDB = database.GetCollection<AccelerometerModel>("Bookings");
        }
        public async Task<AccelerometerModel> GetById(Guid id)
        {
            return await _AcceleromaterDB.Find(model => model.Id == id).FirstOrDefaultAsync();
        }

        public async Task<AccelerometerModel> AddAccelerometerData(AccelerometerModel model)
        {
            await _AcceleromaterDB.InsertOneAsync(model);
            return model;
        }
    }
}