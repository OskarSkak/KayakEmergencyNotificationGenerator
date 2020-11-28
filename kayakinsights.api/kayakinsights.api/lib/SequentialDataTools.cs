using kayakinsights.api.Models;
using kayakinsights.api.repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace kayakinsights.api.lib
{
    public class SequentialDataTools
    {
        private IDataFromFile _dat;
        public List<Accelerometer> _acc { get; set; }
        public List<Gyroscope> _gyro { get; set;  }
        private int AccInternalCounter { get; set; }
        private int GyroInternalCounter { get; set; }
        private int TotalSeconds { get; set; }
        private double GyroIndexesPerSecond { get; set; }
        private double AccIndexesPerSecond { get; set; }


        public SequentialDataTools(IDataFromFile dat)
        {
            _dat = dat;
            var model = _dat.GetDataFromFile();
            _acc = model.Accelerometer.ToList();
            _gyro = model.Gyroscope.ToList();
            this.initSequence();
        }

        public BatchModel initSequence()
        {
            //Exact same for both - even though data is fed first + last stamp are good
            this.TotalSeconds = (int)(_acc.Last().stamp - _acc.First().stamp).TotalSeconds;
            var tempCountA = (double) _acc.Count;
            var tempCountG = (double) _gyro.Count;
            this.GyroIndexesPerSecond = tempCountG / TotalSeconds;
            this.AccIndexesPerSecond = tempCountA / TotalSeconds;

            return null;
        }

        /// <summary>
        /// Returns 'fair' amount of evenly spaced indexeses given the total amount of time in the interval of test data,
        /// the amount of data in the given batch and the interval in seconds of the batch.
        /// </summary>
        /// <param name="secondsInInterval"></param>
        /// <param name="accelerometerBatchSize"></param>
        /// <param name="gyroscopeBatchSize"></param>
        /// <returns></returns>
        public BatchModel extractNext(int secondsInInterval, int accelerometerBatchSize, int gyroscopeBatchSize)
        {
            var model = new BatchModel();

            //We want to truncate, hence the explicit cast instead of rounding
            var gyroIndexesToBeConsumed = (int) (secondsInInterval * this.GyroIndexesPerSecond);
            var accIndexesToBeConsumed = (int) (secondsInInterval * this.AccIndexesPerSecond);

            if (this.AccInternalCounter + accIndexesToBeConsumed > _acc.Count
            || this.GyroInternalCounter + gyroIndexesToBeConsumed > _gyro.Count)
                    this.AccInternalCounter = this.GyroInternalCounter = 0;
            
            var allAccInInterval = new List<Accelerometer>();
            var allGyroInInterval = new List<Gyroscope>();

            for(int i = this.AccInternalCounter; 
                i < (this.AccInternalCounter + accIndexesToBeConsumed); i++)
                allAccInInterval.Add(this._acc[i]);

            for (int i = this.GyroInternalCounter;
                i < (this.GyroInternalCounter + gyroIndexesToBeConsumed); i++)
                allGyroInInterval.Add(this._gyro[i]);

            Func<int, int, int, int> getNextIndex = (i, n, m) => i * n / m + n / (2 * m);

            for (int i = 0; i < accelerometerBatchSize; i++)
                    model.Accelerometer.Add(allAccInInterval[getNextIndex(i, allAccInInterval.Count, accelerometerBatchSize)]);


            for (int i = 0; i < gyroscopeBatchSize; i++)
                    model.Gyroscope.Add(allGyroInInterval[getNextIndex(i, allGyroInInterval.Count, gyroscopeBatchSize)]);

            this.AccInternalCounter += accIndexesToBeConsumed;
            this.GyroInternalCounter += gyroIndexesToBeConsumed;

            return model;
        }
    }
}
