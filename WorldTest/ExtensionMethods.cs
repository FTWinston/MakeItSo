using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace WorldTest
{
    public static class ExtensionMethods
    {
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
