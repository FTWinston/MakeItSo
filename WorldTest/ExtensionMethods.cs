using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace WorldTest
{
    public static class ExtensionMethods
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

        public static void DrawStringAligned(this Graphics g, string text, TextAlignment align, Font font, Brush brush, float x, float y)
        {
            DrawStringAligned(g, text, align, font, brush, x, y, new StringFormat());
        }

        public static void DrawStringAligned(this Graphics g, string text, TextAlignment align, Font font, Brush brush, float x, float y, StringFormat format)
        {
            var size = g.MeasureString(text, font);

            if ((align & TextAlignment.Right) != 0)
                x -= size.Width;
            else if ((align & TextAlignment.Left) == 0)
                x -= size.Width / 2;

            if ((align & TextAlignment.Bottom) != 0)
                y -= size.Height;
            else if ((align & TextAlignment.Top) == 0)
                y -= size.Height / 2;

            g.DrawString(text, font, brush, x, y, format);
        }

        public static Color ToSystemColor(this UnityEngine.Color c)
        {
            return Color.FromArgb((int)(c.r * 255), (int)(c.g * 255), (int)(c.b * 255));
        }
    }

    [Flags]
    public enum TextAlignment
    {
        Center = 0,
        Top = 1,
        Bottom = 2,
        Left = 4,
        Right = 8,

        TopLeft = Top | Left,
        TopRight = Top | Right,
        BottomLeft = Bottom | Left,
        BottomRight = Bottom | Right,
    }
}
