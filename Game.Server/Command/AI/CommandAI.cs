using Game.Server.Command.Stations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Game.Server.Command.AI
{
    class CommandAI : BaseAI, ICommandStation
    {
        public StrategicAI Strategic { get; private set; }

        public Strategy CurrentStrategy { get; set; }
    }
}
