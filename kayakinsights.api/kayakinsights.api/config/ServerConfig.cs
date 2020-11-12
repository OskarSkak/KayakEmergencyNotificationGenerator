using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.config
{
    public class ServerConfig
    {
        public MongoDBConfig MongoDB { get; set; } = new MongoDBConfig();
    }
}
