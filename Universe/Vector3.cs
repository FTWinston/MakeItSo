using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Universe
{
    public class Vector3
    {
        public Vector3() { }

        public Vector3(double x, double y, double z)
        {
            X = x; Y = y; Z = z;
        }

        public double X { get; set; }
        public double Y { get; set; }
        public double Z { get; set; }

        public static Vector3 operator +(Vector3 v1, Vector3 v2)
        {
            return new Vector3(
                v1.X + v2.X,
                v1.Y + v2.Y,
                v1.Z + v2.Z
            );
        }

        public static Vector3 operator -(Vector3 v1, Vector3 v2)
        {
            return new Vector3(
                v1.X - v2.X,
                v1.Y - v2.Y,
                v1.Z - v2.Z
            );
        }

        public static Vector3 operator *(Vector3 v, double d)
        {
            return new Vector3(
                v.X * d,
                v.Y * d,
                v.Z * d
            );
        }

        public static Vector3 operator /(Vector3 v, double d)
        {
            return new Vector3(
                v.X / d,
                v.Y / d,
                v.Z / d
            );
        }

        public double DistanceSquared(Vector3 other)
        {
            double xd = X - other.X;
            double yd = Y - other.Y;
            double zd = Z - other.Z;
            return xd * xd + yd * yd + zd * zd;
        }

        public double Distance(Vector3 other)
        {
            return Math.Sqrt(DistanceSquared(other));
        }

        public Vector3 ToUnit()
        {
            double scale = Math.Max(Math.Max(X, Y), Z);
            return new Vector3(X / scale, Y / scale, Z / scale);
        }

        public static Vector3 RandomWithin(Random r, double xmin, double ymin, double zmin, double xmax, double ymax, double zmax)
        {
            return new Vector3(
                r.NextDouble() * (xmax - xmin) + xmin,
                r.NextDouble() * (ymax - ymin) + ymin,
                r.NextDouble() * (zmax - zmin) + zmin
            );
        }
    }
}
