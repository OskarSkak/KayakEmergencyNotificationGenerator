using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.context
{
    using kayakinsights.api.Models;
    using MongoDB.Driver;
    public interface ITodoContext
    {
        IMongoCollection<Todo> Todos { get; }
    }
}
