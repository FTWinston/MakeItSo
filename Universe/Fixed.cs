using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Universe {
    // if switching to Forge, this should be replaced with the class included in Forge.Utilities
    public struct Fixed {
        public long RawValue;
        public const int SHIFT_AMOUNT = 8; //12 is 4096 ... 8 is 256

        public const long One = 1 << SHIFT_AMOUNT;
        public const int OneI = 1 << SHIFT_AMOUNT;
        public static readonly Fixed OneF = Fixed.Create(1, true);

        public static readonly Fixed MinValue = Fixed.CreateFromRaw(long.MinValue);
        public static readonly Fixed MaxValue = Fixed.CreateFromRaw(long.MaxValue);
        
        #region Constructors
        public static implicit operator Fixed(float value) {
            return Fixed.Create(value);
        }
        
        public static implicit operator Fixed(double value) {
            return Fixed.Create(value);
        }
        
        public static Fixed CreateFromRaw(long StartingRawValue) {
            Fixed real;
            real.RawValue = StartingRawValue;
            return real;
        }

        public static Fixed Random(Random r)
        {
            Fixed real;
            real.RawValue = (r.Next() << 32) + r.Next();
            return real;
        }

        /// <summary>
        /// Assuming this real has a base 10 representation, this shifts the decimal value to the
        /// left by count digits.
        /// </summary>
        private void ShiftDecimal(int count) {
            int digitBase = 10;

            int pow = 1;
            for (int i = 0; i < count; ++i) {
                pow *= digitBase;
            }

            this /= (OneF * pow);
        }

        /// <summary>
        /// Returns the number of digits in the given value. The negative sign is not considered a
        /// digit.
        /// </summary>
        private static int GetDigitCount(int number) {
            // remark: we compare against 10, and not 0, in this function because 0 has one digit

            int digits = 1;
            while (number >= 10) {
                number /= 10;
                digits += 1;
            }
            return digits;
        }

        /// <summary>
        /// Creates a real value with that is 0.number. For example, CreateDecimal(123) will create
        /// a real value that is equal to "0.123".
        /// </summary>
        /// <remarks>
        /// CreateDecimal(1, 0005, 4) will create 1.0005 CreateDecimal(1, 5, 4) will create 1.0005
        /// </remarks>
        /// <returns></returns>
        public static Fixed CreateDecimal(long beforeDecimal, int afterDecimal, int afterDigits) {
            int sign = beforeDecimal >= 0 ? 1 : -1;

            Fixed real;
            real.RawValue = (One * afterDecimal) * sign;
            real.ShiftDecimal(afterDigits);
            //real.ShiftDecimal(GetDigitCount(afterDecimal));
            real.RawValue += One * beforeDecimal;
            return real;
        }

        public static Fixed CreateDecimal(long beforeDecimal) {
            Fixed real;
            real.RawValue = One * beforeDecimal;
            return real;
        }

        public static Fixed Create(long StartingRawValue, bool UseMultiple) {
            Fixed r;
            r.RawValue = StartingRawValue;
            if (UseMultiple)
                r.RawValue = r.RawValue << SHIFT_AMOUNT;
            return r;
        }
        public static Fixed Create(double doubleValue) {
            Fixed r;
            doubleValue *= (double)One;
            r.RawValue = (long)Math.Round(doubleValue);
            return r;
        }
        #endregion

        public Fixed Inverse {
            get { return Fixed.Create(-this.RawValue, false); }
        }

        #region FromParts
        /// <summary>
        /// Create a fixed-int number from parts. For example, to create 1.5 pass in 1 and 500.
        /// </summary>
        /// <param name="PreDecimal">The number above the decimal. For 1.5, this would be 1.</param>
        /// <param name="PostDecimal">The number below the decimal, to three digits. For 1.5, this
        /// would be 500. For 1.005, this would be 5.</param>
        /// <returns>A fixed-int representation of the number parts</returns>
        public static Fixed FromParts(int PreDecimal, int PostDecimal) {
            Fixed f = Fixed.Create(PreDecimal, true);
            if (PostDecimal != 0)
                f.RawValue += (Fixed.Create(PostDecimal) / 1000).RawValue;

            return f;
        }
        #endregion

        #region *
        public static Fixed operator *(Fixed one, Fixed other) {
            Fixed r;
            r.RawValue = (one.RawValue * other.RawValue) >> SHIFT_AMOUNT;
            return r;
        }

        public static Fixed operator *(Fixed one, int multi) {
            return one * (Fixed)multi;
        }

        public static Fixed operator *(int multi, Fixed one) {
            return one * (Fixed)multi;
        }
        #endregion

        #region /
        public static Fixed operator /(Fixed one, Fixed other) {
            Fixed r;
            r.RawValue = (one.RawValue << SHIFT_AMOUNT) / (other.RawValue);
            return r;
        }

        public static Fixed operator /(Fixed one, int divisor) {
            return one / (Fixed)divisor;
        }

        public static Fixed operator /(int divisor, Fixed one) {
            return (Fixed)divisor / one;
        }
        #endregion

        #region %
        public static Fixed operator %(Fixed one, Fixed other) {
            Fixed r;
            r.RawValue = (one.RawValue) % (other.RawValue);
            return r;
        }

        public static Fixed operator %(Fixed one, int divisor) {
            return one % (Fixed)divisor;
        }

        public static Fixed operator %(int divisor, Fixed one) {
            return (Fixed)divisor % one;
        }
        #endregion

        #region +
        public static Fixed operator +(Fixed one, Fixed other) {
            Fixed r;
            r.RawValue = one.RawValue + other.RawValue;
            return r;
        }

        public static Fixed operator +(Fixed one, int other) {
            return one + (Fixed)other;
        }

        public static Fixed operator +(int other, Fixed one) {
            return one + (Fixed)other;
        }
        #endregion

        #region -
        public static Fixed operator -(Fixed a) {
            return a.Inverse;
        }

        public static Fixed operator -(Fixed one, Fixed other) {
            Fixed r;
            r.RawValue = one.RawValue - other.RawValue;
            return r;
        }

        public static Fixed operator -(Fixed one, int other) {
            return one - (Fixed)other;
        }

        public static Fixed operator -(int one, Fixed other) {
            return (Fixed)one - other;
        }
        #endregion

        #region ==
        public static bool operator ==(Fixed one, Fixed other) {
            return one.RawValue == other.RawValue;
        }

        public static bool operator ==(Fixed one, int other) {
            return one == (Fixed)other;
        }

        public static bool operator ==(int other, Fixed one) {
            return (Fixed)other == one;
        }
        #endregion

        #region !=
        public static bool operator !=(Fixed one, Fixed other) {
            return one.RawValue != other.RawValue;
        }

        public static bool operator !=(Fixed one, int other) {
            return one != (Fixed)other;
        }

        public static bool operator !=(int other, Fixed one) {
            return (Fixed)other != one;
        }
        #endregion

        #region >=
        public static bool operator >=(Fixed one, Fixed other) {
            return one.RawValue >= other.RawValue;
        }

        public static bool operator >=(Fixed one, int other) {
            return one >= (Fixed)other;
        }

        public static bool operator >=(int other, Fixed one) {
            return (Fixed)other >= one;
        }
        #endregion

        #region <=
        public static bool operator <=(Fixed one, Fixed other) {
            return one.RawValue <= other.RawValue;
        }

        public static bool operator <=(Fixed one, int other) {
            return one <= (Fixed)other;
        }

        public static bool operator <=(int other, Fixed one) {
            return (Fixed)other <= one;
        }
        #endregion

        #region >
        public static bool operator >(Fixed one, Fixed other) {
            return one.RawValue > other.RawValue;
        }

        public static bool operator >(Fixed one, int other) {
            return one > (Fixed)other;
        }

        public static bool operator >(int other, Fixed one) {
            return (Fixed)other > one;
        }
        #endregion

        #region <
        public static bool operator <(Fixed one, Fixed other) {
            return one.RawValue < other.RawValue;
        }

        public static bool operator <(Fixed one, int other) {
            return one < (Fixed)other;
        }

        public static bool operator <(int other, Fixed one) {
            return (Fixed)other < one;
        }
        #endregion

        public static explicit operator int(Fixed src) {
            return (int)(src.RawValue >> SHIFT_AMOUNT);
        }

        public static explicit operator float(Fixed src)
        {
            return (float)src.RawValue / (float)One;
        }

        public static explicit operator double(Fixed src)
        {
            return (double)src.RawValue / (double)One;
        }

        public static explicit operator Fixed(int src) {
            return Fixed.Create(src, true);
        }

        public static explicit operator Fixed(long src) {
            return Fixed.Create(src, true);
        }

        public static explicit operator Fixed(ulong src) {
            return Fixed.Create((long)src, true);
        }

        public static Fixed operator <<(Fixed one, int Amount) {
            return Fixed.Create(one.RawValue << Amount, false);
        }

        public static Fixed operator >>(Fixed one, int Amount) {
            return Fixed.Create(one.RawValue >> Amount, false);
        }

        public override bool Equals(object obj) {
            if (obj is Fixed)
                return ((Fixed)obj).RawValue == this.RawValue;
            else
                return false;
        }

        public override int GetHashCode() {
            return RawValue.GetHashCode();
        }

        public override string ToString() {
            return string.Format("{0}", (double)this);
        }

        #region PI, DoublePI
        public static Fixed PI = Fixed.Create(12868, false); //PI x 2^12
        public static Fixed TwoPIF = PI * 2; //radian equivalent of 360 degrees
        public static Fixed PIOver180F = PI / (Fixed)180; //PI / 180
        #endregion

        #region Sqrt
        public static Fixed Sqrt(Fixed f, int NumberOfIterations) {
            if (f.RawValue < 0) //NaN in Math.Sqrt
                throw new ArithmeticException("Input Error");
            if (f.RawValue == 0)
                return (Fixed)0;
            Fixed k = f + Fixed.OneF >> 1;
            for (int i = 0; i < NumberOfIterations; i++)
                k = (k + (f / k)) >> 1;

            if (k.RawValue < 0)
                throw new ArithmeticException("Overflow");
            else
                return k;
        }

        public static Fixed Sqrt(Fixed f) {
            byte numberOfIterations = 8;
            if (f.RawValue > 0x64000)
                numberOfIterations = 12;
            if (f.RawValue > 0x3e8000)
                numberOfIterations = 16;
            return Sqrt(f, numberOfIterations);
        }
        #endregion

        #region Sin
        public static Fixed Sin(Fixed i) {
            Fixed j = (Fixed)0;
            for (; i < 0; i += Fixed.Create(25736, false))
                ;
            if (i > Fixed.Create(25736, false))
                i %= Fixed.Create(25736, false);
            Fixed k = (i * Fixed.Create(10, false)) / Fixed.Create(714, false);
            if (i != 0 && i != Fixed.Create(6434, false) && i != Fixed.Create(12868, false) &&
                i != Fixed.Create(19302, false) && i != Fixed.Create(25736, false))
                j = (i * Fixed.Create(100, false)) / Fixed.Create(714, false) - k * Fixed.Create(10, false);
            if (k <= Fixed.Create(90, false))
                return sin_lookup(k, j);
            if (k <= Fixed.Create(180, false))
                return sin_lookup(Fixed.Create(180, false) - k, j);
            if (k <= Fixed.Create(270, false))
                return sin_lookup(k - Fixed.Create(180, false), j).Inverse;
            else
                return sin_lookup(Fixed.Create(360, false) - k, j).Inverse;
        }

        private static Fixed sin_lookup(Fixed i, Fixed j) {
            if (j > 0 && j < Fixed.Create(10, false) && i < Fixed.Create(90, false))
                return Fixed.Create(SIN_TABLE[i.RawValue], false) +
                    ((Fixed.Create(SIN_TABLE[i.RawValue + 1], false) - Fixed.Create(SIN_TABLE[i.RawValue], false)) /
                    Fixed.Create(10, false)) * j;
            else
                return Fixed.Create(SIN_TABLE[i.RawValue], false);
        }

        private static int[] SIN_TABLE = {
        0, 71, 142, 214, 285, 357, 428, 499, 570, 641,
        711, 781, 851, 921, 990, 1060, 1128, 1197, 1265, 1333,
        1400, 1468, 1534, 1600, 1665, 1730, 1795, 1859, 1922, 1985,
        2048, 2109, 2170, 2230, 2290, 2349, 2407, 2464, 2521, 2577,
        2632, 2686, 2740, 2793, 2845, 2896, 2946, 2995, 3043, 3091,
        3137, 3183, 3227, 3271, 3313, 3355, 3395, 3434, 3473, 3510,
        3547, 3582, 3616, 3649, 3681, 3712, 3741, 3770, 3797, 3823,
        3849, 3872, 3895, 3917, 3937, 3956, 3974, 3991, 4006, 4020,
        4033, 4045, 4056, 4065, 4073, 4080, 4086, 4090, 4093, 4095,
        4096
    };
        #endregion

        private static Fixed mul(Fixed F1, Fixed F2) {
            return F1 * F2;
        }

        #region Cos, Tan, Asin
        public static Fixed Cos(Fixed i) {
            return Sin(i + Fixed.Create(6435, false));
        }

        public static Fixed Tan(Fixed i) {
            return Sin(i) / Cos(i);
        }

        public static Fixed Asin(Fixed F) {
            bool isNegative = F < 0;
            F = Abs(F);

            if (F > Fixed.OneF)
                throw new ArithmeticException("Bad Asin Input:" + F);

            Fixed f1 = mul(mul(mul(mul(Fixed.Create(145103 >> Fixed.SHIFT_AMOUNT, false), F) -
                Fixed.Create(599880 >> Fixed.SHIFT_AMOUNT, false), F) +
                Fixed.Create(1420468 >> Fixed.SHIFT_AMOUNT, false), F) -
                Fixed.Create(3592413 >> Fixed.SHIFT_AMOUNT, false), F) +
                Fixed.Create(26353447 >> Fixed.SHIFT_AMOUNT, false);
            Fixed f2 = PI / Fixed.Create(2, true) - (Sqrt(Fixed.OneF - F) * f1);

            return isNegative ? f2.Inverse : f2;
        }
        #endregion

        #region ATan, ATan2
        public static Fixed Atan(Fixed F) {
            return Asin(F / Sqrt(Fixed.OneF + (F * F)));
        }

        public static Fixed Atan2(Fixed F1, Fixed F2) {
            if (F2.RawValue == 0 && F1.RawValue == 0)
                return (Fixed)0;

            Fixed result = (Fixed)0;
            if (F2 > 0)
                result = Atan(F1 / F2);
            else if (F2 < 0) {
                if (F1 >= 0)
                    result = (PI - Atan(Abs(F1 / F2)));
                else
                    result = (PI - Atan(Abs(F1 / F2))).Inverse;
            }
            else
                result = (F1 >= 0 ? PI : PI.Inverse) / Fixed.Create(2, true);

            return result;
        }
        #endregion

        #region Abs, Floor, Ceiling
        public static Fixed Abs(Fixed r) {
            if (r < 0)
                return r.Inverse;
            else
                return r;
        }

        public static Fixed Floor(Fixed r)
        {
            Fixed r2;
            r2.RawValue = (r.RawValue >> SHIFT_AMOUNT) << SHIFT_AMOUNT;
            return r2;
        }

        public static Fixed Ceiling(Fixed r)
        {
            Fixed r2;
            r2.RawValue = ((r.RawValue >> SHIFT_AMOUNT) << SHIFT_AMOUNT) + One;
            return r2;
        }
        #endregion

        #region Min, Max
        public static Fixed Min(Fixed one, Fixed other)
        {
            return one.RawValue < other.RawValue ? one : other;
        }

        public static Fixed Max(Fixed one, Fixed other)
        {
            return one.RawValue > other.RawValue ? one : other;
        }
        #endregion
    }

    public struct FixedVector
    {
        public static FixedVector Create(Fixed x, Fixed y, Fixed z)
        {
            FixedVector vec;
            vec.x = x;
            vec.y = y;
            vec.z = z;
            return vec;
        }

        public Fixed x, y, z;

        public static readonly FixedVector zero = Create(0, 0, 0);

        public static FixedVector operator +(FixedVector one, FixedVector other)
        {
            FixedVector output;
            output.x = one.x + other.x;
            output.y = one.y + other.y;
            output.z = one.z + other.z;
            return output;
        }

        public static FixedVector operator -(FixedVector one, FixedVector other)
        {
            FixedVector output;
            output.x = one.x - other.x;
            output.y = one.y - other.y;
            output.z = one.z - other.z;
            return output;
        }

        public Fixed this[int i]
        {
            get
            {
                switch (i)
                {
                    case 0:
                        return x;
                    case 1:
                        return y;
                    case 2:
                        return z;
                    default:
                        throw new IndexOutOfRangeException();
                }
            }
            set
            {
                switch (i)
                {
                    case 0:
                        x = value; break;
                    case 1:
                        y = value; break;
                    case 2:
                        z = value; break;
                    default:
                        throw new IndexOutOfRangeException();
                }
            }
        }

        public static Fixed DistanceSq(FixedVector one, FixedVector other)
        {
            Fixed dx = one.x - other.x, dy = one.y - other.y, dz = one.z - other.z;
            return dx * dx + dy * dy + dz * dz;
        }

        public static Fixed Distance(FixedVector one, FixedVector other)
        {
            return Fixed.Sqrt(DistanceSq(one, other));
        }

        public static explicit operator UnityEngine.Vector3(FixedVector src)
        {
            UnityEngine.Vector3 vec;
            vec.x = (float)src.x;
            vec.y = (float)src.y;
            vec.z = (float)src.z;
            return vec;
        }
    }
}