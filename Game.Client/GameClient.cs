using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FTW.Engine.Shared;
using System.IO;
using System.Runtime.InteropServices;

namespace Game.Client
{
    class GameClient : FTW.Engine.Client.GameClient
    {   
        public const string settingsFilename = "client.yml";

        public GameClient(Config config)
            : base(config)
        {
            instance = this;
        }

        public const string defaultClientName = "Some Client";
        public static Config CreateDefaultConfig()
        {
            Config config = new Config(null);
            config.Children = new List<Config>();

            Config value = new Config("name");
            value.Value = defaultClientName;
            config.Children.Add(value);

            config.SaveToFile(settingsFilename);
            return config;
        }

        protected override void SetupVariableDefaults()
        {
            Variable.Get("name").SetDefaultValue("Player");
        }

        private static GameClient instance;

        protected override bool MessageReceived(Message m)
        {
            if (base.MessageReceived(m))
                return true;

            // ...
            return false;
        }

        protected override bool ConsoleCommand(string firstWord, string theRest)
        {
            if (base.ConsoleCommand(firstWord, theRest))
                return true;

            switch (firstWord)
            {   
                case "exit":
                case "quit":
                    //window.CloseGameWindow();
                    return true;
            }
            return false;
        }
    }
}
