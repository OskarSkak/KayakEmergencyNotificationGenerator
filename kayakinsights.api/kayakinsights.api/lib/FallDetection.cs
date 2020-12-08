using kayakinsights.api.Models;
using Microsoft.AspNetCore.Components.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.lib
{
    public class FallDetection
    {
        private static double THRESHOLD_VAL_PER_ITEM = 0.4;
        private static SequentialDataTools _tools;

        public FallDetection(SequentialDataTools tools)
        {
            _tools = tools;
        }

        public AnalysisResult analyzeBatch(BatchModel model)
        {
            var res = new AnalysisResult
            {
                TimeStamp =  model.TimeStamp, //No need to check since it cant be null, be aware of 01.01.1970 though
                //GPS = (model.GPS.Count == 0 || model.GPS == null) ? null : model.GPS.First(),
                IsFallen = false
            };

            /* var nAcc = getNumberOfAcc(model);
             var nGyro = getNumberOfGyro(model);
             var timeSpan = getIntervalInSeconds(model);
             var batch = _tools.extractNext((int)timeSpan, nAcc, nGyro);*/
            var batch = model;

            var ax = new List<double>();
            var ay = new List<double>();
            var az = new List<double>();

            foreach(var a in batch.Accelerometer)
            {
                ax.Add(a.x);
                ay.Add(a.y);
                az.Add(a.z);
            }

            var xConfidence = DetectFall(ax);
            var yConfidence = DetectFall(ay);
            var zConfidence = DetectFall(az);

            var NEEDED_CONFIDENCE_LEVEL = model.Accelerometer.Count * THRESHOLD_VAL_PER_ITEM;

            if (NEEDED_CONFIDENCE_LEVEL <= xConfidence + yConfidence + zConfidence) res.IsFallen = true;

            return res;
        }

        private double getIntervalInSeconds(BatchModel model)
        {
            var first = model.Accelerometer.First().stamp;
            var last = model.Accelerometer.Last().stamp;
            var span = last - first;
            return span.TotalSeconds;
        }

        private int getNumberOfAcc(BatchModel model)
        {
            var sum = 0;
            foreach (var acc in model.Accelerometer)
                sum += 1;
            return sum;
        }

        private int getNumberOfGyro(BatchModel model)
        {
            var sum = 0;
            foreach (var gyro in model.Gyroscope)
                sum += 1;
            return sum;
        }

        private int DetectFall(List<double> batch)
        {
            var confidence = 0;
            var sum = 0.0;

            foreach (var d in batch) sum += d;

            var avg = sum / batch.Count;

            foreach (var d in batch)
                if (d > avg + 1 || d < avg - 1) confidence += 1;

            return confidence;
        }
    }
}
