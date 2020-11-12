using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.Models
{
    public class BatchModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("Accelerometer")]
        public List<Accelerometer> Accelerometer { get; set; }
        [BsonElement("GPS")]
        public List<GPS> GPS { get; set; }
        [BsonElement("Gyroscope")]
        public List<Gyroscope> Gyroscope { get; set; }

        [BsonElement("Power")]
        public double Power { get; set; }
    }
}
