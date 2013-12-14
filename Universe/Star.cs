using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace Universe
{
    public class Star : AtmosphericBody
    {
        // these are not ideal value!
        public Star(Random r)
            : this(r.Normal(6500, 1750), Math.Max(0.01, r.Normal(1.5, 0.5)), Math.Max(SolarMass * 0.08, r.Normal(SolarMass, SolarMass * 0.25)))
        {
        }

        public Star(double temperature, double luminosity, double mass)
        {
            Temperature = temperature;
            Luminosity = luminosity;

            Radius = Math.Sqrt(Luminosity / ( 4 * Math.PI * StephanBoltzmann * Temperature * Temperature * Temperature * Temperature));

            // for main sequence stars, L / Lsun ~= (M / Msun)^3.9
            // ... but only for main sequence stars. And that's not exact.
            Mass = mass;

            DetermineColor();
        }

        private const double StephanBoltzmann =  0.0000000567037321; // W m^-2 K^-4
        private const double SolarMass = 1989000000000000000000000000000.0; // kg
        private const double SolarAbsMagnitude = 4.8;

        public string Name { get; set; }

        public double Temperature { get; private set; } // in Kelvin
        public double Luminosity { get; private set; } // measured in Suns. (Sol = 1)
        public double AbsMagnitude
        {
            get
            {
                // Msun - Mstar = 2.5 log ( Lstar / Lsun)
                return 2.5 * Math.Log(Luminosity) - SolarAbsMagnitude;
            }
        }

        public double BVColor
        {
            get
            {
                return -2.5 * Math.Log(3.05 * Math.Exp(26000 / Temperature - 1) / Math.Exp(32700 / Temperature - 1));
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

            Color = Color.FromArgb((int)r, (int)g, (int)b);
        }

        /// <summary>
        /// Note that most stars will be so bright that they'll just look white
        /// But this is their *actual* color, whatever that means
        /// </summary>
        public Color Color { get; private set; }
    }
}
