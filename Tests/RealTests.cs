using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Universe;

namespace UnitTests
{
    static class RealTests
    {
        public static bool EqualInt()
        {
            Real r1 = 561068;

            return r1 == 561068 && r1 != 561067;
        }

        public static bool Add()
        {
            Real r1 = 1;
            Real r2 = 2;

            return (r1 + r2) == 3;
        }

        public static bool Subtract()
        {
            Real r1 = 57;
            Real r2 = 64;

            return (r1 - r2) == -7;
        }

        public static bool Floor()
        {
            Real r1 = 57.8;
            return Real.Floor(r1) == 57;
        }

        public static bool Ceiling()
        {
            Real r1 = 57.8;
            return Real.Ceiling(r1) == 58;
        }
    }
}
