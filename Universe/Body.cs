using System;
using System.Collections.Generic;
using System.Text;
using UnityEngine;

namespace Universe
{
    public abstract class Body
    {
        public Vector3 Position { get; set; }
        public Vector3 Velocity { get; set; }
        public double Mass { get; set; } // only MassiveBodies need this for gravity. But I guess we might have some other use for it at some point...

        public GameObject Renderer { get; set; }
    }

    public abstract class MassiveBody : Body
    {
        // exerts gravity, somehow
        public double Radius { get; protected set; }
    }

    public abstract class AtmosphericBody : MassiveBody
    {
        // has an atmosphere, somehow
        public double AtmosphereRadius { get; set; }
    }
}
