using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace AnalyzeFallPrototype
{
    public class Accelerometer
    {
        List<string> X = new List<string>();
        List<string> Y = new List<string>();
        List<string> Z = new List<string>();
        double TRESHOLD_VAL = 100;
        private static readonly int NEEDED_CONFIDENCE_LEVEL = 15;
        int xConfidence = 0;
        int yConfidence = 0;
        int zConfidence = 0;
        double avg_x = 0;
        double avg_y = 0;
        double avg_z = 0;

        public void populateLists()
        {
            var path = Directory.GetCurrentDirectory();
            //C:\Users\skakk\software_proj\KayakInsights\AnalyzeFallPrototype\bin\Debug\netcoreapp3.1

            using (var reader = new StreamReader(@".\\data\\accelerometer_1.csv"))
            {

                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(';');

                    X.Add(values[3]);
                    Y.Add(values[5]);
                    Z.Add(values[7]);
                }
            }

            Console.WriteLine("Import Succeeded? " + ((X.Count != 0) && (Y.Count != 0) && (Z.Count != 0)) +
                "\nSizeX: " + X.Count + "\tSizeY: " + Y.Count + "\tSizeZ: " + Z.Count);

        }

        public void testDetection()
        {
            List<double> testX = new List<double>();
            List<double> testY = new List<double>();
            List<double> testZ = new List<double>();

            for (int i = 0; i < X.Count || i < Y.Count || i < Z.Count; i++)
            {

                testX.Add(Double.Parse(X.ElementAt(i)));
                testY.Add(Double.Parse(Y.ElementAt(i)));
                testZ.Add(Double.Parse(Z.ElementAt(i)));
            }

            var sumX = 0.0;
            var sumY = 0.0;
            var sumZ = 0.0;


            for (int i = 0; i < testX.Count && i < testY.Count && i < testZ.Count; i++)
            {
                //Console.WriteLine(testX[i] + ";"+ testY[i] + ";" + testZ[i]);
                sumX += testX[i];
                sumY += testY[i];
                sumZ += testZ[i];

                if (i % 30 == 0)
                {
                    xConfidence = DetectFall(i, extractBatch(i, 30, testX));
                    yConfidence = DetectFall(i, extractBatch(i, 30, testY));
                    zConfidence = DetectFall(i, extractBatch(i, 30, testZ));

                    if (NEEDED_CONFIDENCE_LEVEL <= xConfidence + yConfidence + zConfidence) Console.WriteLine("FALL DETECTED AT i=" + i);
                    xConfidence = yConfidence = zConfidence = 0;
                }

            }

        }

        private static List<Double> extractBatch(int index, int wantedInterval, List<double> all)
        {
            var result = new List<Double>();

            if (!(index + wantedInterval > all.Count - 1))
                for (int i = index; i < index + wantedInterval; i++)
                    result.Add(all[i]);
            else
                for (int i = index; i < index - wantedInterval; i--)
                    result.Add(all[i]);


            return result;
        }

        private static int DetectFall(int i, List<double> batch)
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
