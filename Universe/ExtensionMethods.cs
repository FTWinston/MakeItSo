using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Universe
{
    public static class ExtensionMethods
    {
        public static double Normal(this Random r, double mean, double stdDev)
        {
            double u1 = r.NextDouble(); //these are uniform(0,1) random doubles
            double u2 = r.NextDouble();
            double randStdNormal = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); //random normal(0,1)
            return mean + stdDev * randStdNormal; //random normal(mean,stdDev^2)
        }
    }
}
