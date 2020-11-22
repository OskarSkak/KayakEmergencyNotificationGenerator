using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace kayakinsights.api.Models
{
    public class GPS
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("stamp")]
        public DateTime stamp { get; set; }

        [BsonElement("altitude")]
        public double altitude { get; set; }

        [BsonElement("latitude")]
        public double latitude { get; set; }

        [BsonElement("longitude")]
        public double longitude {get; set;}

        [BsonElement("altitudeAccuracy")]
        public double altitudeAccuracy { get; set; }

        [BsonElement("accuracy")]
        public double accuracy { get; set; }
        

    }
}
