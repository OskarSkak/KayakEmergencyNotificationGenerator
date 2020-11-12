using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace AnalyzeFallPrototype
{
    public class Program
    {
        public static void Main(string[] args)
        {
            /*var sa = File.ReadAllText("C:\\Users\\skakk\\software_proj\\KayakInsights\\AnalyzeFallPrototype\\sa.json");
            var jsonO = JObject.Parse(sa);
            int a = 3;
            Console.WriteLine(jsonO.SelectToken("accelerometerSensors"));*/

            var ana = new Analyzation();
            ana.populateLists();
            ana.testDetection();

        }

        
        public class Analyzation
        {
            List<string> timestamps = new List<string>();
            List<string> X = new List<string>();
            List<string> Y = new List<string>();
            List<string> Z = new List<string>();
            double TRESHOLD_VAL = 100;

            public void populateLists()
            {
                using (var reader = new StreamReader(@"C:\\Users\\skakk\\software_proj\\KayakInsights\\AnalyzeFallPrototype\\data\\gyroscope_1.csv"))
                {

                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        var values = line.Split(';');

                        timestamps.Add(values[0]);
                        X.Add(values[1]);
                        Y.Add(values[2]);
                        Z.Add(values[3]);
                    }
                }

                Console.WriteLine("Succeeded? " + ((timestamps.Count != 0) && (X.Count != 0) && (Y.Count != 0) && (Z.Count != 0) ));
            }

            public void testDetection()
            {
                List<double> testX = new List<double>();
                List<double> testY = new List<double>();
                List<double> testZ = new List<double>();

                for (int i = 0; i < 100; i++)
                {
                    if (i > 100 && i % 100 == 0)
                    {
                        break;
                    }
                        
                    testX.Add(Double.Parse(X.ElementAt(i), CultureInfo.InvariantCulture));
                    testY.Add(Double.Parse(Y.ElementAt(i), CultureInfo.InvariantCulture));
                    testZ.Add(Double.Parse(Z.ElementAt(i), CultureInfo.InvariantCulture));
                }

                Console.WriteLine(
                    "X Fall? " + detectFall(testX, 100) +
                    "\nY Fall? " + detectFall(testY, 100) +
                    "\nZ Fall? " + detectFall(testZ, 100)
                    );
            }

            public Boolean detectFall(List<double> values, double threshold)
            {
                foreach(var v in values)
                {

                }

                return false;
            }
        }

    }
}
