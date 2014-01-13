using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Universe
{
    public class GalaxyGenerator
    {
        public GalaxyGenerator()
        {
            NumStars = 2000;
            GalacticRadius = 2000;
            VerticalScale = 0.1f;

            System.Random r = new System.Random();
            BulgeWeighting = r.Normal(0.15, 0.05);
            ArmWeighting = r.Normal(0.55, 0.05);
            DiscWeighting = r.Normal(0.3, 0.05);
            ArmTightness = r.Normal(0.20, 0.05);
            ArmWidth = r.Normal(9, 0.75);
        }

        public int NumStars { get; set;}
        public float GalacticRadius { get; set; }
        public float VerticalScale { get; set; }

        public double BulgeWeighting { get; set; }
        public double ArmWeighting { get; set; }
        public double DiscWeighting { get; set; }
        public double ArmTightness { get; set; }
        public double ArmWidth { get; set; }

        
        const double bulgeScale = 0.25;
        const double stdDevScale = 0.3;

        public Galaxy Generate()
        {
            Galaxy g = new Galaxy();
            System.Random r = new System.Random();

            // place stars within the galaxy
            PlaceStars(g, r);

            // simulate gravity for a few turns

            // how do nebulae and the like come into this?

            // place homeworlds of various empires

            // expand empires

            // name stars, often (but not always) according to the empires that own them / are closest

            return g;
        }

        private void PlaceStars(Galaxy g, System.Random r)
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
                Star s = Star.CreateMainSequence(r);

                s.Position = new Vector3(
                    (float)r.Normal(0, stdDev),
                    (float)r.Normal(0, stdDev),
                    (float)r.Normal(0, stdDev)
                );
                
                g.Stars.Add(s);
            }

            // populate the disc
            stdDev = GalacticRadius * stdDevScale;
            for (int i = 0; i < starsInDisc; i++)
            {
                Star s = Star.CreateMainSequence(r);

                s.Position = new Vector3(
                    (float)r.Normal(0, stdDev),
                    (float)r.Normal(0, stdDev * VerticalScale),
                    (float)r.Normal(0, stdDev)
                );

                g.Stars.Add(s);
            }

            // populate the arms along two logarithmic spirals... adjust armScale so that the spiral just about reaches GalacticRadius at t=tMax
            double t = r.Normal(0.95, 0.15), tMax = r.Normal(9, 0.75);
            double armScale = r.Normal(0.75, 0.05) * GalacticRadius / Math.Exp(ArmTightness * tMax);
            double dt = (tMax - t) / starsInArms * 2;
            double armOffset = r.NextDouble() * Math.PI;

            do
            {
                stdDev = ArmWidth * 0.25 + 0.75 * ArmWidth * t;
                double radius = armScale * Math.Exp(ArmTightness * t);

                Star s = Star.CreateMainSequence(r);
                s.Position = new Vector3(
                    (float)((radius + r.Normal(0, stdDev)) * Math.Cos(t + armOffset)),
                    (float)r.Normal(0, stdDev),
                    (float)((radius + r.Normal(0, stdDev)) * Math.Sin(t + armOffset))
                );

                g.Stars.Add(s);

                s = Star.CreateMainSequence(r);
                s.Position = new Vector3(
                    (float)((radius + r.Normal(0, stdDev)) * Math.Cos(t + armOffset + Math.PI)),
                    (float)r.Normal(0, stdDev),
                    (float)((radius + r.Normal(0, stdDev)) * Math.Sin(t + armOffset + Math.PI))
                );

                g.Stars.Add(s);
                t += dt;
            } while ( t <= tMax );
        }
    }
}
