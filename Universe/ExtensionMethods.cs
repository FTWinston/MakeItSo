using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

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
