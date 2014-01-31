﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Universe
{
    public static class Helper
    {
        public static double Normal(Random r, double mean, double stdDev)
        {
            double u1 = r.NextDouble(); //these are uniform(0,1) random doubles
            double u2 = r.NextDouble();
            double stdNormal = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); //random normal(0,1)
            return mean + stdDev * stdNormal; //random normal(mean,stdDev^2)
        }

        // use different standard deviations above & below the mean
        public static double Normal(Random r, double mean, double stdDevLower, double stdDevUpper)
        {
            double u1 = r.NextDouble(); //these are uniform(0,1) random doubles
            double u2 = r.NextDouble();
            double stdNormal = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); //random normal(0,1)

            return mean + (stdNormal >= 0 ? stdDevUpper : stdDevLower) * stdNormal;
        }

        public static long Long(Random r)
        {
            return (r.Next() << 32) + Math.Abs(r.Next());
        }
    }
}
