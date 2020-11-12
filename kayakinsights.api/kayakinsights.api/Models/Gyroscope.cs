using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.Models
{
    public class Gyroscope
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("x")]
        public double x { get; set; }
        [BsonElement("y")]
        public double y { get; set; }
        [BsonElement("z")]
        public double z { get; set; }
        [BsonElement("stamp")]
        public DateTime stamp { get; set; }
    }
}
