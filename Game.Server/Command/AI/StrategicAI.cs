using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Game.Server.Command.AI
{
    class StrategicAI
    {
        public FleetAI Fleet { get; private set; }
        public Ship Ship { get; private set; }
        public List<Objective> Objectives { get; private set; }
    }
}
