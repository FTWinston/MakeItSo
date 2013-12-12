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

            pictureBox1.Image = RenderGalaxy(galaxy, pictureBox1.Size);
            btnStep.Enabled = true;
        }

        private void btnStep_Click(object sender, EventArgs e)
        {
            generator.SimulateTimeStep(galaxy, 0.1);
            pictureBox1.Image = RenderGalaxy(galaxy, pictureBox1.Size);
        }

        private Bitmap RenderGalaxy(Galaxy galaxy, Size dimensions)
        {
            Bitmap b = new Bitmap(dimensions.Width, dimensions.Height);

            // determine the actual size of the galaxy
            Vector3 minExtent = new Vector3(), maxExtent = new Vector3();
            foreach ( var star in galaxy.Stars )
            {
                minExtent.X = Math.Min(minExtent.X, star.Position.X);
                maxExtent.X = Math.Max(maxExtent.X, star.Position.X);

                minExtent.Y = Math.Min(minExtent.Y, star.Position.Y);
                maxExtent.Y = Math.Max(maxExtent.Y, star.Position.Y);
            }

            double xOffset = -minExtent.X, yOffset = -minExtent.Y;

            double scale = Math.Min(
                (maxExtent.X - minExtent.X) / dimensions.Width,
                (maxExtent.Y - minExtent.Y) / dimensions.Height
            );

            using (Graphics g = Graphics.FromImage(b))
            {
                g.FillRectangle(new SolidBrush(Color.Black), 0, 0, b.Width, b.Height);
                Brush starBrush = new SolidBrush(Color.White);

                foreach (var star in galaxy.Stars)
                {
                    double radius = 2;
                    g.FillEllipse(starBrush, (float)((star.Position.X * scale + xOffset) - radius), (float)((star.Position.Y * scale + yOffset) - radius), (float)(radius + radius), (float)(radius + radius));
                }
            }

            return b;
        }
    }
}
