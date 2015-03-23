using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Game.Server.Command.Stations
{
    interface IBaseStation
    {
    }

    enum StationType
    {
        Command,
        Helm,
        Tactical,
        Engineering,
        Science,
        Viewscreen,
    }
}
