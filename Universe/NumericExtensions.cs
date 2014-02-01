using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Universe
{
    public static class NumericExtensions
    {
        public static double Normal(this Random r, double mean, double stdDev)
        {
            double u1 = r.NextDouble(); //these are uniform(0,1) random doubles
            double u2 = r.NextDouble();
            double stdNormal = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); //random normal(0,1)
            return mean + stdDev * stdNormal; //random normal(mean,stdDev^2)
        }

        // use different standard deviations above & below the mean
        public static double Normal(this Random r, double mean, double stdDevLower, double stdDevUpper)
        {
            double u1 = r.NextDouble(); //these are uniform(0,1) random doubles
            double u2 = r.NextDouble();
            double stdNormal = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); //random normal(0,1)

            return mean + (stdNormal >= 0 ? stdDevUpper : stdDevLower) * stdNormal;
        }

        public static Fixed NormalFixed(this Random r, double mean, double stdDif)
        {
            double normal = Normal(r, mean, stdDif);
            return Fixed.Create(normal);
        }

        public static Fixed NormalFixed(this Random r, double mean, double stdDevLower, double stdDevUpper)
        {
            double normal = Normal(r, mean, stdDevLower, stdDevUpper);
            return Fixed.Create(normal);
        }

        /// <summary>
        /// Returns a random Reak from min (inclusive) to max (exclusive)
        /// </summary>
        /// <param name="random">The given random instance</param>
        /// <param name="min">The inclusive minimum bound</param>
        /// <param name="max">The exclusive maximum bound. Must be greater than min</param>
        public static Fixed NextReal(this Random r, Fixed min, Fixed max)
        {
            Fixed real;
            real.RawValue = NextLong(r, min.RawValue, max.RawValue);
            return real;
        }

        /// <summary>
        /// Returns a random Real from 0 (inclusive) to max (exclusive)
        /// </summary>
        /// <param name="random">The given random instance</param>
        /// <param name="max">The exclusive maximum bound. Must be greater than 0</param>
        public static Fixed NextReal(this Random r, Fixed max)
        {
            Fixed real;
            real.RawValue = NextLong(r, 0, max.RawValue);
            return real;
        }

        /// <summary>
        /// Returns a random Real over all possible values of Real (except Real.MaxValue, similar to
        /// random.Next())
        /// </summary>
        /// <param name="random">The given random instance</param>
        public static Fixed NextReal(this Random r)
        {
            Fixed real;
            real.RawValue = NextLong(r);
            return real;
        }

        /// <summary>
        /// Returns a random long from min (inclusive) to max (exclusive)
        /// (from http://stackoverflow.com/a/13095144)
        /// </summary>
        /// <param name="random">The given random instance</param>
        /// <param name="min">The inclusive minimum bound</param>
        /// <param name="max">The exclusive maximum bound. Must be greater than min</param>
        public static long NextLong(this Random random, long min, long max) {
            if (max <= min)
                throw new ArgumentOutOfRangeException("max", "max must be > min!");

            //Working with ulong so that modulo works correctly with values > long.MaxValue
            ulong uRange = (ulong)(max - min);

            // Prevent a modulo bias; see http://stackoverflow.com/a/10984975/238419 for more
            // information. In the worst case, the expected number of calls is 2 (though usually
            // it's much closer to 1) so this loop doesn't really hurt performance at all.
            ulong ulongRand;
            do {
                byte[] buf = new byte[8];
                random.NextBytes(buf);
                ulongRand = (ulong)BitConverter.ToInt64(buf, 0);
            } while (ulongRand > ulong.MaxValue - ((ulong.MaxValue % uRange) + 1) % uRange);

            return (long)(ulongRand % uRange) + min;
        }

        /// <summary>
        /// Returns a random long from 0 (inclusive) to max (exclusive)
        /// </summary>
        /// <param name="random">The given random instance</param>
        /// <param name="max">The exclusive maximum bound. Must be greater than 0</param>
        public static long NextLong(this Random random, long max) {
            return random.NextLong(0, max);
        }

        /// <summary>
        /// Returns a random long over all possible values of long (except long.MaxValue, similar to
        /// random.Next())
        /// </summary>
        /// <param name="random">The given random instance</param>
        public static long NextLong(this Random random) {
            return random.NextLong(long.MinValue, long.MaxValue);
        }
    }
}
