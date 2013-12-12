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
                new Vector3(-generator.InitialRadius, -generator.InitialRadius, -generator.InitialRadius * generator.GalacticThicknessScale),
                new Vector3(generator.InitialRadius, generator.InitialRadius, generator.InitialRadius * generator.GalacticThicknessScale)
            );
            pictureBox1.Image = RenderGalaxy(galaxy);
            btnStep.Enabled = true;
        }

        private void btnStep_Click(object sender, EventArgs e)
        {
            generator.SimulateTimeStep(galaxy, 0.03);
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

            using (Graphics g = Graphics.FromImage(b))
            {
                g.FillRectangle(new SolidBrush(Color.Black), 0, 0, b.Width, b.Height);
                Brush starBrush = new SolidBrush(Color.White);

                foreach (var star in galaxy.Stars)
                {
                    double radius = 2;
                    g.FillEllipse(starBrush, (float)((star.Position.X + xOffset) * scale - radius), (float)((star.Position.Y + yOffset) * scale - radius), (float)(radius + radius), (float)(radius + radius));
                }
            }

            return b;
        }
    }
}
