using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.context
{
    using MongoDB.Driver;
    using System;
    using kayakinsights.api.Models;
    using kayakinsights.api.config;

    public class TodoContext: ITodoContext
    {
        private readonly IMongoDatabase _db;
        public TodoContext(MongoDBConfig config)
        {
            var client = new MongoClient(config.ConnectionString);
            _db = client.GetDatabase(config.Database);
        }
        public IMongoCollection<Todo> Todos => _db.GetCollection<Todo>("Todos");

        IMongoCollection<Todo> ITodoContext.Todos => throw new NotImplementedException();
    }
}
