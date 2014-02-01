using System;
using System.Collections.Generic;
using System.Text;
using UnityEngine;

namespace Universe
{
    public class Star : AtmosphericBody
    {
        public static Star CreateMainSequence(System.Random r, double stellarScale)
        {
            double solarMasses = Math.Max(0.1, r.Normal(1.3, 0.4, 1.5));
            double mass = solarMasses * SolarMass;

            //temperature = SolarTemperature * Math.Pow(Luminosity * Math.Sqrt(Radius), 0.25); // according to yahoo answers
            double temperature = 0.000000000000001 * Math.Pow(mass, 0.62); // http://www.astro.soton.ac.uk/~pac/PH112/notes/notes/node99.html ... though there should be a constant

            // Mass-luminosity relation from http://en.wikipedia.org/wiki/Mass%E2%80%93luminosity_relation
            double luminosity;
            if (solarMasses <= 0.43)
                luminosity = 0.23 * Math.Pow(solarMasses, 2.3);
            else if (solarMasses <= 2)
                luminosity = Math.Pow(solarMasses, 4);
            else if (solarMasses <= 20)
                luminosity = 1.505964 * Math.Pow(solarMasses, 3.5) - 0.0252982 * Math.Pow(solarMasses, 4.5);
            else
                luminosity = 3200 * solarMasses;

            // now let's randomize things slightly
            luminosity *= r.Normal(1, 0.15);
            temperature *= r.Normal(1, 0.05);

            return new Star(mass, luminosity, temperature, stellarScale);
        }

        private Star(double mass, double luminosity, double temperature, double stellarScale)
        {
            Temperature = temperature;
            Luminosity = luminosity;
            Mass = mass;

            Radius = 50000;//stellarScale * Math.Pow(Mass, 0.738); // according to yahoo answers
            //Radius = Math.Sqrt(Luminosity / (4 * Math.PI * StephanBoltzmann * Temperature * Temperature * Temperature * Temperature)); // from wikipedia

            DetermineColor();
        }

        private const double StephanBoltzmann = 0.0000000567037321; // W m^-2 K^-4
        private const double SolarMass = 1989000000000000000000000000000.0; // kg
        private const double SolarAbsMagnitude = 4.83;
        //private const double SolarTemperature = 5779.6; // K

        public string Name { get; set; }

        public double Temperature { get; private set; } // in Kelvin
        public double Luminosity { get; private set; } // measured in Suns. (Sol = 1)
        public double AbsMagnitude
        {
            get
            {
                // Msun - Mstar = 2.5 log (Lstar / Lsun)
                return SolarAbsMagnitude - 2.5 * Math.Log(Luminosity);
            }
        }

        private const double Cbv = 0.6;
        public double BVColor
        {
            get
            {
                // BV color index of the sun (~5780 K) should be 0.66... or 0.648 according to somewhere else.
                // defined as -2.5 log(Flux5500/Flux4400) + C
                //return -2.5 * Math.Log10(3.05 * Math.Exp(26000 / Temperature - 1) / Math.Exp(32700 / Temperature - 1)) + Cbv;

                // So this fudge gives 0.692 for the sun, and -.067 for vega.
                // These are what astronomers use, for simplicity, seemingly.
                // The mind boggles, slightly. THEY'RE NOT EXACT!
                if (Temperature < 9141)
                    return -3.684 * Math.Log10(Temperature) + 14.551;
                else
                {
                    var logT = Math.Log10(Temperature);
                    return 0.344 * logT * logT - 3.402 * logT + 8.037;
                }
            }
        }

        public string SpectralClass
        {
            get
            {
                if (Temperature >= 33000)
                    return "O" + SpectralSubtype(Temperature, 33000, 60000);
                else if (Temperature >= 10000)
                    return "B" + SpectralSubtype(Temperature, 10000, 33000);
                else if (Temperature >= 7500)
                    return "A" + SpectralSubtype(Temperature, 7500, 10000);
                else if (Temperature >= 6000)
                    return "F" + SpectralSubtype(Temperature, 6000, 7500);
                else if (Temperature >= 5200)
                    return "G" + SpectralSubtype(Temperature, 5200, 6000);
                else if (Temperature >= 3700)
                    return "K" + SpectralSubtype(Temperature, 3700, 5200);
                else if (Temperature >= 2400)
                    return "M" + SpectralSubtype(Temperature, 2400, 3700);
                else if (Temperature >= 1300)
                    return "L" + SpectralSubtype(Temperature, 1300, 2400);
                else if (Temperature >= 500)
                    return "L" + SpectralSubtype(Temperature, 500, 1300);
                else
                    return "Y" + SpectralSubtype(Temperature, 0, 500);
            }
        }

        private static int SpectralSubtype(double temp, double rangeMin, double rangeMax)
        {
            double fraction = 1 - (temp - rangeMin) / (rangeMax - rangeMin);
            for (int i = 1; i < 10; i++)
                if (fraction < i * .1)
                    return i - 1;

            return 9;
        }

        // found this algorithm here:
        // http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
        private void DetermineColor()
        {
            double temp = Math.Max(1000, Math.Min(Temperature, 40000)) / 100;
            double r, g, b;

            if (temp <= 66)
                r = 255;
            else
            {
                r = temp - 60;
                r = 329.698727446 * Math.Pow(r, -0.1332047592);
                r = Math.Max(0, Math.Min(255, r));
            }

            if ( temp <= 66 )
            {
                g = temp;
                g = 99.4708025861 * Math.Log(g) - 161.1195681661;
                g = Math.Max(0, Math.Min(255, g));
            }
            else
            {
                g = temp - 60;
                g = 288.1221695283 * Math.Pow(g, -0.0755148492);
                g = Math.Max(0, Math.Min(255, g));
            }

            if ( temp >= 66)
                b = 255;
            else
            {
                if ( temp <= 19 )
                    b = 0;
                else 
                {
                    b = temp - 10;
                    b = 138.5177312231 * Math.Log(b) - 305.0447927307;
                    b = Math.Max(0, Math.Min(255, b));
                }
            }

            Color = new Color((float)r / 255f, (float)g / 255f, (float)b / 255f);
        }

        /// <summary>
        /// Note that most stars will be so bright that they'll just look white
        /// But this is their *actual* color, whatever that means
        /// </summary>
        public Color Color { get; private set; }
    }
}
