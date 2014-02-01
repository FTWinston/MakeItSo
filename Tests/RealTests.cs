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
            Fixed r1 = 561068;

            return r1 == 561068 && r1 != 561067;
        }

        public static bool Add()
        {
            Fixed r1 = 1;
            Fixed r2 = 2;

            return (r1 + r2) == 3;
        }

        public static bool Subtract()
        {
            Fixed r1 = 57;
            Fixed r2 = 64;

            return (r1 - r2) == -7;
        }

        public static bool Floor()
        {
            Fixed r1 = 57.8;
            return Fixed.Floor(r1) == 57;
        }

        public static bool Ceiling()
        {
            Fixed r1 = 57.8;
            return Fixed.Ceiling(r1) == 58;
        }

        public static bool Min()
        {
            Fixed r1 = 52.6;
            Fixed r2 = 52.1;
            return Fixed.Min(r1, r2) == 52.1;
        }

        public static bool Max()
        {
            Fixed r1 = 52.6;
            Fixed r2 = 52.1;
            return Fixed.Max(r1, r2) == 52.6;
        }

        public static bool UnityVector()
        {
            var vec = FixedVector.Create(1000000000000, 500000000000, 2000000000000);
            var unity = (UnityEngine.Vector3)vec;
            return unity.x == vec.x && unity.y == vec.y && unity.z == vec.z;
        }
    }
}
