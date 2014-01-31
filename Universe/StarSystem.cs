using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Universe
{
    public class StarSystem
    {
        public static StarSystem Generate(Star s)
        {
            Random r = new Random(s.SystemSeed);

            var system = new StarSystem();
            int numPlanets = r.Next(2, 10);

            return system;
        }

        private StarSystem() { }

        public double PlanarTilt, PlanarRotation;
        public List<MassiveBody> Bodies = new List<MassiveBody>();

        class Orbit
        {
            public double PlanarRotation;
            public MassiveBody PrimaryFocus;
            public FixedVector SecondaryFocus;
        }
    }
}
