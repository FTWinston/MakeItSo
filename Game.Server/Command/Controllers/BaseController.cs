using Game.Server.Command.Stations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Game.Server.Command.Controllers
{
    abstract class BaseController<T> where T : IBaseStation
    {
        protected ShipController ShipController { get; private set; }
        protected T Station { get; set; }
    }
}
