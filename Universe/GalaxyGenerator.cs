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
            NumStars = 800;
            GalacticRadius = 2000;
            VerticalScale = 0.1;
            StellarMassMean = 50000000;
            StellarMassStdDev = 20000000;

            Random r = new Random();
            BulgeWeighting = NormalDistribution(r, 0.15, 0.05);
            ArmWeighting = NormalDistribution(r, 0.55, 0.05);
            DiscWeighting = NormalDistribution(r, 0.3, 0.05);
            ArmTightness = NormalDistribution(r, 0.20, 0.05);
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

        const double armWidth = 8;
        const double bulgeScale = 0.25;
        const double stdDevScale = 0.3;

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
            double stdDev = GalacticRadius * stdDevScale * bulgeScale;
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

            // populate the arms along two logarithmic spirals... adjust armScale so that the spiral just about reaches GalacticRadius at t=tMax
            double t = NormalDistribution(r, 0.95, 0.15), tMax = NormalDistribution(r, Math.PI * 3.2, Math.PI / 3);
            double armScale = NormalDistribution(r, 0.75, 0.05) * GalacticRadius / Math.Exp(ArmTightness * tMax);
            double dt = (tMax - t) / starsInArms * 2;
            double armOffset = r.NextDouble() * Math.PI;

            do
            {
                stdDev = armWidth * 0.25 + 0.75 * armWidth * t;
                double radius = armScale * Math.Exp(ArmTightness * t);

                Star s = new Star();
                s.Mass = NormalDistribution(r, StellarMassMean, StellarMassStdDev);
                s.Position = new Vector3(
                    (radius + NormalDistribution(r, 0, stdDev)) * Math.Cos(t + armOffset),
                    (radius + NormalDistribution(r, 0, stdDev)) * Math.Sin(t + armOffset),
                    NormalDistribution(r, 0, armWidth * t)
                );

                g.Stars.Add(s);

                s = new Star();
                s.Mass = NormalDistribution(r, StellarMassMean, StellarMassStdDev);
                s.Position = new Vector3(
                    (radius + NormalDistribution(r, 0, stdDev)) * Math.Cos(t + armOffset + Math.PI),
                    (radius + NormalDistribution(r, 0, stdDev)) * Math.Sin(t + armOffset + Math.PI),
                    NormalDistribution(r, 0, armWidth * t)
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
