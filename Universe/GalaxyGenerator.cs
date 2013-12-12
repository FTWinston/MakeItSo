using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Universe
{
    public class GalaxyGenerator
    {
        public GalaxyGenerator()
        {
            NumStars = 500;
            InitialRadius = 200;
        }
        public int NumStars { get; set;}
        public double InitialRadius { get; set; }



        public Galaxy Generate()
        {
            Galaxy g = new Galaxy();

            // place stars randomly within the "initial radius", giving them angular velocity
            PlaceStars(g, NumStars, InitialRadius);

            // simulate gravity for a few turns

            // how do nebulae and the like come into this?

            // place homeworlds of various empires

            // expand empires

            // name stars, often (but not always) according to the empires that own them / are closest

            return g;
        }

        private void PlaceStars(Galaxy g, int numStars, double radius)
        {
            var thickness = radius * 0.1;
            Random r = new Random();
            const double minMass = 1000000, maxMass = 1000000000, massRange = maxMass - minMass;
            for (int i = 0; i < numStars; i++)
            {
                Star s = new Star();
                s.Mass = r.NextDouble() * massRange + minMass;

                // probably ought to go for a normal distrubution ... at least on the z-axis
                s.Position = Vector3.RandomWithin(r, -radius, -radius, -thickness, radius, radius, thickness);

                s.Velocity = DetermineInitialAngularVelocity(s.Position);
                g.Stars.Add(s);
            }
        }

        private static Vector3 DetermineInitialAngularVelocity(Vector3 position)
        {
            const double scale = 1;
            Vector3 velocity = new Vector3();

            if (position.X < 0)
            {
                if (position.Y < 0)
                {
                    velocity.X = -scale * position.Y;
                    velocity.Y = -scale * position.Y;
                }
                else
                {
                    velocity.X = -scale * position.Y;
                    velocity.Y = scale * position.Y;
                }
            }
            else
            {
                if (position.Y < 0)
                {
                    velocity.X = -scale * position.Y;
                    velocity.Y = scale * position.Y;
                }
                else
                {
                    velocity.X = scale * position.Y;
                    velocity.Y = scale * position.Y;
                }
            }
            return velocity;
        }

        public void SimulateTimeStep(Galaxy g, double dt)
        {
            foreach (var star in g.Stars)
                star.Velocity += SumAcceleration(star, g.Stars) * dt;

            foreach (var star in g.Stars)
                star.Position += star.Velocity * dt;
        }

        private const double G = 6.67384e-11;
        private Vector3 SumAcceleration(Star star, IList<Star> list)
        {
            // a = G m / r^2
            Vector3 a = new Vector3();
            foreach (var other in list)
                if (other != star)
                {
                    a += (other.Position - star.Position).ToUnit() * (G * other.Mass / star.Position.DistanceSquared(other.Position));
                }

            return a;
        }
    }
}
