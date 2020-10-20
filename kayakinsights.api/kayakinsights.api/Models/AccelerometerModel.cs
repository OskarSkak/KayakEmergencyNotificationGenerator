using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace kayakinsights.api.Models
{
    public class AccelerometerModel
    {
        [BsonId]
        public Guid Id { get; set; }
        [BsonElement("Name")]
        public string Name { get; set; }
        
    }
}