using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Universe;

namespace WorldTest
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        GalaxyGenerator generator;
        Galaxy galaxy;

        private void btnGenerate_Click(object sender, EventArgs e)
        {
            generator = new GalaxyGenerator();
            galaxy = generator.Generate();

            DetermineScaleAndOffset(
                new Vector3(-generator.GalacticRadius, -generator.GalacticRadius, -generator.GalacticRadius * generator.VerticalScale),
                new Vector3(generator.GalacticRadius, generator.GalacticRadius, generator.GalacticRadius * generator.VerticalScale)
            );
            pictureBox1.Image = RenderGalaxy(galaxy);
        }

        private double scale, xOffset, yOffset;
        private void DetermineScaleAndOffset(Vector3 minExtent, Vector3 maxExtent)
        {
            xOffset = -minExtent.X; yOffset = -minExtent.Y;

            scale = 1.0 / Math.Min(
                (maxExtent.X - minExtent.X) / pictureBox1.Width,
                (maxExtent.Y - minExtent.Y) / pictureBox1.Height
            );
        }

        private Bitmap RenderGalaxy(Galaxy galaxy)
        {
            Bitmap b = new Bitmap(pictureBox1.Width, pictureBox1.Height);

            using (Graphics graphics = Graphics.FromImage(b))
            {
                graphics.FillRectangle(new SolidBrush(Color.Black), 0, 0, b.Width, b.Height);
                
                if (rbTopDown.Checked)
                    RenderTopDown(galaxy, graphics, b.Width, b.Height);
                else if (rbSide.Checked)
                    RenderSideOn(galaxy, graphics, b.Width, b.Height);
                else if (rbHRDiagram.Checked)
                    RenderHRDiagram(galaxy, graphics, b.Width, b.Height);
            }

            return b;
        }

        private void RenderTopDown(Galaxy galaxy, Graphics graphics, int width, int height)
        {
            foreach (var star in galaxy.Stars)
            {
                double radius = star.Luminosity * 1.25;
                graphics.FillEllipse(new SolidBrush(star.Color), (float)((star.Position.X + xOffset) * scale - radius), (float)((star.Position.Y + yOffset) * scale - radius), (float)(radius + radius), (float)(radius + radius));
            }
        }

        private void RenderSideOn(Galaxy galaxy, Graphics graphics, int width, int height)
        {
            double halfHeight = height / 2.0;

            foreach (var star in galaxy.Stars)
            {
                double radius = star.Luminosity * 1.25;
                graphics.FillEllipse(new SolidBrush(star.Color), (float)((star.Position.X + xOffset) * scale - radius), (float)(star.Position.Z * scale - radius + halfHeight), (float)(radius + radius), (float)(radius + radius));
            }
        }

        private void RenderHRDiagram(Galaxy galaxy, Graphics graphics, int width, int height)
        {
            const double magMin = -10, magMax = 19.2;
            const double colorMin = -.35, colorMax = 2.25;

            const float borderFraction = 0.12f, borderMax = 70, bigTickSize = 5, smallTickSize = 3;

            float xmin = Math.Min(width * borderFraction, borderMax);
            float xmax = Math.Max(width - width * borderFraction, width - borderMax);
            float ymin = Math.Min(height * borderFraction, borderMax);
            float ymax = Math.Max(height - height * borderFraction, height - borderMax);

            // draw axes & labels
            Pen lines = new Pen(Color.White); Brush text = new SolidBrush(Color.FromArgb(255, 255, 220));
            Font labels = new Font(FontFamily.GenericMonospace, 10);
            graphics.DrawLine(lines, xmin, ymin, xmin, ymax);
            graphics.DrawLine(lines, xmin, ymax, xmax, ymax);

            float lx = xmin / 3, ly = height / 2;
            graphics.TranslateTransform(lx, ly);
            graphics.RotateTransform(270);
            graphics.DrawStringAligned("Absolute magnitude", TextAlignment.Center, labels, text, 0, 0);
            graphics.ResetTransform();

            lx = width / 2; ly = (float)(height - ymin / 3);
            graphics.DrawStringAligned("Color (B-V)", TextAlignment.Center, labels, text, lx, ly);

            // draw tick marks
            for (int mag = (int)Math.Ceiling(magMin); mag <= magMax; mag++)
            {
                float y = (float)ScaleToFit(magMin, magMax, ymin, ymax, mag);

                float tickSize;
                if (mag % 5 == 0)
                {
                    tickSize = bigTickSize;
                    graphics.DrawStringAligned(mag.ToString(), TextAlignment.Right, labels, text, xmin - tickSize * 1.5f, y);
                }
                else
                    tickSize = smallTickSize;

                graphics.DrawLine(lines, (float)(xmin - tickSize), y, xmin, y);
            }

            for (int color = (int)Math.Ceiling(colorMin * 10); color < colorMax * 10; color++)
            {
                float x = (float)ScaleToFit(colorMin, colorMax, xmin, xmax, color / 10.0);

                float tickSize;
                if (color % 5 == 0)
                {
                    tickSize = bigTickSize;
                    graphics.DrawStringAligned((color/10.0).ToString(), TextAlignment.Top, labels, text, x, ymax + tickSize * 1.5f);
                }
                else
                    tickSize = smallTickSize;

                graphics.DrawLine(lines, x, ymax + tickSize, x, ymax);
            }

            // plot the points
            foreach (var star in galaxy.Stars)
            {
                float x = xmin + (float)ScaleToFit(colorMin, colorMax, xmin, xmax, star.BVColor);
                float y = ymin + (float)ScaleToFit(magMin, magMax, ymin, ymax, star.AbsMagnitude);
                graphics.FillRectangle(new SolidBrush(star.Color), x, y, 1, 1);
            }
        }

        private double ScaleToFit(double inputMin, double inputMax, double outputMin, double outputMax, double input)
        {
            double fraction = (input - inputMin) / (inputMax - inputMin);
            return outputMin + fraction * (outputMax - outputMin);
        }

        private void ViewChanged(object sender, EventArgs e)
        {
            if (galaxy != null)
                pictureBox1.Image = RenderGalaxy(galaxy);
        }
    }
}
