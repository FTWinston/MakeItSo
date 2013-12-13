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
            GalacticRadius = 2000;
            VerticalScale = 0.1;
            StellarMassMean = 50000000;
            StellarMassStdDev = 20000000;

            BulgeWeighting = 0.15;
            ArmWeighting = 0.55;
            DiscWeighting = 0.3;
            
            ArmTightness = 0.15;
            BulgeScale = 0.15;
        }

        public int NumStars { get; set;}
        public double GalacticRadius { get; set; }
        public double VerticalScale { get; set; }

        public double StellarMassMean { get; set; }
        public double StellarMassStdDev { get; set; }

        public double BulgeWeighting { get; set; }
        public double ArmWeighting { get; set; }
        public double DiscWeighting { get; set; }

        public double ArmTightness { get; set; }
        public double BulgeScale { get; set; }

        private const double stdDevScale = 0.3;

        public Galaxy Generate()
        {
            Galaxy g = new Galaxy();
            Random r = new Random();

            // place stars within the galaxy
            PlaceStars(g, r);

            // simulate gravity for a few turns

            // how do nebulae and the like come into this?

            // place homeworlds of various empires

            // expand empires

            // name stars, often (but not always) according to the empires that own them / are closest

            return g;
        }

        private void PlaceStars(Galaxy g, Random r)
        {
            // determine how many stars should go in each component of the galaxy
            double weightingTot = BulgeWeighting + ArmWeighting + DiscWeighting;
            int starsInBulge = (int)Math.Floor(BulgeWeighting / weightingTot * NumStars);
            int starsInArms = (int)Math.Floor(ArmWeighting/ weightingTot * NumStars);
            int starsInDisc = (int)Math.Floor(DiscWeighting / weightingTot * NumStars);

            if (starsInBulge + starsInArms + starsInDisc < NumStars)
            {
                starsInBulge++;
                if (starsInBulge + starsInArms + starsInDisc < NumStars)
                {
                    starsInArms++;
                    if (starsInBulge + starsInArms + starsInDisc < NumStars)
                        starsInDisc++;
                }
            }

            // populate the central bulge
            double stdDev = GalacticRadius * stdDevScale * BulgeScale;
            for (int i = 0; i < starsInBulge; i++)
            {
                Star s = new Star();
                s.Mass = NormalDistribution(r, StellarMassMean, StellarMassStdDev);

                s.Position = new Vector3(
                    NormalDistribution(r, 0, stdDev),
                    NormalDistribution(r, 0, stdDev),
                    NormalDistribution(r, 0, stdDev)
                );
                
                g.Stars.Add(s);
            }

            // populate the disc
            stdDev = GalacticRadius * stdDevScale;
            for (int i = 0; i < starsInDisc; i++)
            {
                Star s = new Star();
                s.Mass = NormalDistribution(r, StellarMassMean, StellarMassStdDev);

                s.Position = new Vector3(
                    NormalDistribution(r, 0, stdDev),
                    NormalDistribution(r, 0, stdDev),
                    NormalDistribution(r, 0, stdDev * VerticalScale)
                );

                g.Stars.Add(s);
            }

            // populate the arms
            double t = 0, tMax = 10, a = 180, b = 0.20;
            double dt = tMax / starsInArms * 2;

            do
            {
                Star s = new Star();
                s.Mass = NormalDistribution(r, StellarMassMean, StellarMassStdDev);
                s.Position = new Vector3(
                    a * Math.Exp(b * t) * Math.Cos(t),
                    a * Math.Exp(b * t) * Math.Sin(t),
                    NormalDistribution(r, 0, stdDev * VerticalScale)
                );

                g.Stars.Add(s);


                s = new Star();
                s.Mass = NormalDistribution(r, StellarMassMean, StellarMassStdDev);
                s.Position = new Vector3(
                    a * Math.Exp(b * t) * Math.Cos(t + Math.PI),
                    a * Math.Exp(b * t) * Math.Sin(t + Math.PI),
                    NormalDistribution(r, 0, stdDev * VerticalScale)
                );

                g.Stars.Add(s);
                t += dt;
            } while ( t <= tMax );
        }

        private static double NormalDistribution(Random r, double mean, double stdDev)
        {
            double u1 = r.NextDouble(); //these are uniform(0,1) random doubles
            double u2 = r.NextDouble();
            double randStdNormal = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); //random normal(0,1)
            return mean + stdDev * randStdNormal; //random normal(mean,stdDev^2)
        }
    }
}
