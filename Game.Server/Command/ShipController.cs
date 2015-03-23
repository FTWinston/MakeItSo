using Game.Server.Command.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Game.Server.Command
{
    class ShipController
    {
        public Ship Ship { get; private set; }
        public AI.FleetAI Fleet { get; private set; }
        public IList<Objective> Objectives { get; set; }

        public CommandController Command { get; set; }
        public HelmController Helm { get; set; }
        public TacticalController Tactical { get; set; }
        public EngineeringController Engineering { get; set; }
        public ScienceController Science { get; set; }

        public Players.ViewscreenPlayer Viewscreen { get; set; }
    }
}
