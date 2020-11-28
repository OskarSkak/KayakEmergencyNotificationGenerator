using CsvHelper;
using kayakinsights.api.Models;
using kayakinsights.api.repositories;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.JSInterop;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace kayakinsights.api.lib
{
    public class DataTools
    {
        private static IDataFromFile _dat;
        public static List<Accelerometer> acc {get; set;}
        public static List<Gyroscope> gyro { get; set; }

        private static DateTime currentTimeGyro, currentTimeAcc;

        public DataTools(IDataFromFile data)
        {
            _dat = data;
            acc = _dat.GetDataFromFile().Accelerometer;

            for (int i = 0; i < 100; i++)
                Console.WriteLine(acc[i].stamp.ToString());
            gyro = _dat.GetDataFromFile().Gyroscope;

            var accCopy = new List<Accelerometer>(acc.ToList());
            var gyroCopy = new List<Gyroscope>(gyro.ToList());
           
            acc = accCopy;
            gyro = gyroCopy;

            var acF = acc.First().stamp;
            var acL = acF;

            foreach (var b in acc)
                if (b.stamp > acL)          acL = b.stamp;

            currentTimeAcc = currentTimeGyro = acF;
            var fs = "";

            //for (int i = 0; i < 900; i++)       Console.WriteLine(gyroCopy[i].x + ";" + gyroCopy[i].y + ";" + gyroCopy[i].z);
        }

        public static BatchModel extractNextInterval(long millis, int nGyroInBatch, int nAccInBatch)
        {

            var model = new BatchModel();
            model.Gyroscope = new List<Gyroscope>();
            model.Accelerometer = new List<Accelerometer>();
            var t = currentTimeAcc;
            var b = currentTimeGyro;
            var fsdkj = acc;
            var nowG = currentTimeGyro.AddMilliseconds(millis);
            var nowA = currentTimeAcc.AddMilliseconds(millis) ;

            for (int i = 0; i < 500; i++)
                Console.WriteLine(acc[i].stamp.ToString());

            foreach (var g in gyro)
               // if (g.stamp.CompareTo(currentTimeGyro) >= 0 && g.stamp.CompareTo(nowG) <= 0)
                  //  Console.WriteLine("Date: " + g.stamp.ToString());
                    model.Gyroscope.Add(g);

            foreach (var a in acc)
               // if (a.stamp.CompareTo(currentTimeAcc) >= 0 && a.stamp.CompareTo(nowA) <= 0)
                    model.Accelerometer.Add(a);

            var result = new BatchModel();
            result.Gyroscope = new List<Gyroscope>();
            result.Accelerometer = new List<Accelerometer>();
            
            var gyroIn = millis / nGyroInBatch;
            var accIn = millis / nAccInBatch;
            var intervalA = new List<DateTime>();
            var intervalG = new List<DateTime>();


            for(int i = 0; i < nAccInBatch; i++)        
                intervalA.Add(currentTimeAcc.AddMilliseconds(i * accIn));

            for (int i = 0; i < nGyroInBatch; i++)      
                intervalG.Add(currentTimeGyro.AddMilliseconds(i * gyroIn));

            foreach (var d in intervalA)
                result.Accelerometer.Add(getClosest(model.Accelerometer, d));

            foreach (var d in intervalG)
                result.Gyroscope.Add(getClosest(model.Gyroscope, d));

            foreach (var k in result.Accelerometer)
                Console.WriteLine("{0}D {1}H {4}m {2}s {3}ms", k.stamp.Day, k.stamp.Hour, k.stamp.Second, k.stamp.Millisecond, k.stamp.Minute);


            return result;
        }

        private static Accelerometer getClosest(List<Accelerometer> l,  DateTime date)
        {
            DateTime closest = new DateTime();

            long min = long.MaxValue;

            foreach(var e in l)
                if(Math.Abs(e.stamp.Ticks - date.Ticks) < min)
                {
                    min = Math.Abs(e.stamp.Ticks - date.Ticks);
                    closest = e.stamp;
                }

            return l.Find(x => x.stamp.Ticks == closest.Ticks);
        }

        private static Gyroscope getClosest(List<Gyroscope> l, DateTime date)
        {
            DateTime closest = new DateTime();

            long min = long.MaxValue;

            foreach (var e in l)
                if (Math.Abs(e.stamp.Ticks - date.Ticks) < min)
                {
                    min = Math.Abs(e.stamp.Ticks - date.Ticks);
                    closest = e.stamp;
                }

            return l.Find(x => x.stamp.Ticks == closest.Ticks);
        }

        public static void writeDataToCSV()
        {
            var accL =  _dat.GetDataFromFile().Accelerometer;
            var gyroL = _dat.GetDataFromFile().Gyroscope;
            
            var accDat = new List<string>();
            var gyroDat = new List<string>();

            accDat.Add("stamp;x;y;z");
            gyroDat.Add("stamp;x;y;z");

            foreach(var d in accL)
            {
                var row = d.stamp.ToString() + ";"+ d.x + ";" + d.y + ";" + d.z;
                accDat.Add(row);
            }

            foreach (var d in gyroL)
            {
                var row = d.stamp.ToString() + ";" + d.x + ";" + d.y + ";" + d.z;
                gyroDat.Add(row);
            }

            System.IO.File.WriteAllLines("accelerometer.csv", (System.Collections.Generic.IEnumerable<string> )accDat);
            File.WriteAllLines("gyroscope.csv", (System.Collections.Generic.IEnumerable<string>)gyroDat);
        }

        private void print( double x, double y, double z)
        {
            Console.WriteLine(x + ";" + y + ";" + z);
        }
    }
}
