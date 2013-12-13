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

        }

        private void ViewChanged(object sender, EventArgs e)
        {
            pictureBox1.Image = RenderGalaxy(galaxy);
        }
    }
}
