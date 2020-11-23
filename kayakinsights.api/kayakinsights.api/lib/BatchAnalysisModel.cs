using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.lib
{
    public class BatchAnalysisModel
    {
        List<string> X , Y , Z = new List<string>();
        private static readonly int NEEDED_CONFIDENCE_LEVEL = 15;
        int xConfidence, yConfidence, zConfidence;

        public void populateLists()
        {
            using (var reader = new StreamReader(@".\\data\\gyroscope_1.csv"))
            {
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(';');

                    X.Add(values[1]);
                    Y.Add(values[2]);
                    Z.Add(values[3]);
                }
            }

            Console.WriteLine("Succeeded? " + ((X.Count != 0) && (Y.Count != 0) && (Z.Count != 0)));
        }
    }
}
