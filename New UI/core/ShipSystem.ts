enum ShipSystem {
    Helm = 1,
    Warp = 2,
    Weapons = 4,
    Sensors = 8,
    PowerManagement = 16,
    DamageControl = 32,
    ViewScreen = 64,
    Communications = 128,
}

namespace ShipSystem {
    export function list(flags: ShipSystem) {
        let output = '';
        if (flags & ShipSystem.Helm)
            output += ', ' + language.systems.helm.name;
        if (flags & ShipSystem.Warp)
            output += ', ' + language.systems.warp.name;
        if (flags & ShipSystem.Weapons)
            output += ', ' + language.systems.weapons.name;
        if (flags & ShipSystem.Sensors)
            output += ', ' + language.systems.sensors.name;
        if (flags & ShipSystem.PowerManagement)
            output += ', ' + language.systems.power.name;
        if (flags & ShipSystem.DamageControl)
            output += ', ' + language.systems.damage.name;
        if (flags & ShipSystem.Communications)
            output += ', ' + language.systems.comms.name;
        if (flags & ShipSystem.ViewScreen)
            output += ', ' + language.systems.view.name;
        
        if (output == '')
            return '';
        else
            return output.substr(2);
    }
    export function getRoleName(flags: ShipSystem, crewSize: number) {
        if (flags == 0)
            return language.roles.none;

        switch (crewSize) {
            case 1:
                switch (flags) {
                case ShipSystem.Helm | ShipSystem.Warp | ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen | ShipSystem.Communications:
                    return language.roles.solo;
                }
            case 2:
                switch (flags) {
                case ShipSystem.Helm | ShipSystem.Warp | ShipSystem.ViewScreen:
                    return language.roles.pilot;
                case ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen | ShipSystem.Communications:
                    return language.roles.operations;
                }
            case 3:
                switch (flags) {
                case ShipSystem.Helm | ShipSystem.ViewScreen:
                    return language.systems.helm;
                case ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.ViewScreen | ShipSystem.Communications:
                    return language.roles.tactical;
                case ShipSystem.Warp | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen:
                    return language.roles.engineering;
                }
            case 4:
                switch (flags) {
                case ShipSystem.Helm | ShipSystem.ViewScreen:
                    return language.systems.helm;
                case ShipSystem.Weapons| ShipSystem.ViewScreen:
                    return language.roles.tactical;
                case ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen:
                    return language.roles.engineering;
                case ShipSystem.Warp | ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen:
                    return language.roles.operations
                }
            case 5:
                switch (flags) {
                case ShipSystem.Helm | ShipSystem.ViewScreen:
                    return language.systems.helm;
                case ShipSystem.Weapons | ShipSystem.ViewScreen:
                    return language.systems.weapons;
                case ShipSystem.PowerManagement | ShipSystem.ViewScreen:
                    return language.systems.power;
                case ShipSystem.Warp | ShipSystem.DamageControl | ShipSystem.ViewScreen:
                    return language.roles.engineering;
                case ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen:
                    return language.roles.operations;
                }
            case 6:
                switch (flags) {
                case ShipSystem.Helm | ShipSystem.ViewScreen:
                    return language.systems.helm;
                case ShipSystem.Weapons | ShipSystem.ViewScreen:
                    return language.systems.weapons;
                case ShipSystem.PowerManagement | ShipSystem.ViewScreen:
                    return language.systems.power;
                case ShipSystem.Warp | ShipSystem.Communications | ShipSystem.ViewScreen:
                    return language.roles.operations;
                case ShipSystem.DamageControl | ShipSystem.ViewScreen:
                    return language.systems.damage;
                case ShipSystem.Sensors | ShipSystem.ViewScreen:
                    return language.systems.sensors;
                }
            case 7:
                switch (flags) {
                case ShipSystem.Helm | ShipSystem.ViewScreen:
                    return language.systems.helm;
                case ShipSystem.Weapons | ShipSystem.ViewScreen:
                    return language.systems.weapons;
                case ShipSystem.PowerManagement | ShipSystem.ViewScreen:
                    return language.systems.power;
                case ShipSystem.Warp | ShipSystem.ViewScreen:
                    return language.systems.warp;
                case ShipSystem.Communications | ShipSystem.ViewScreen:
                    return language.systems.comms;
                case ShipSystem.DamageControl | ShipSystem.ViewScreen:
                    return language.systems.damage;
                case ShipSystem.Sensors | ShipSystem.ViewScreen:
                    return language.systems.sensors;
                }
            default:
                switch (flags) {
                case ShipSystem.Helm:
                    return language.systems.helm;
                case ShipSystem.Weapons:
                    return language.systems.weapons;
                case ShipSystem.PowerManagement:
                    return language.systems.power;
                case ShipSystem.Warp:
                    return language.systems.warp;
                case ShipSystem.Communications:
                    return language.systems.comms;
                case ShipSystem.DamageControl:
                    return language.systems.damage;
                case ShipSystem.Sensors:
                    return language.systems.sensors;
                case ShipSystem.ViewScreen:
                    return language.systems.view;
                }
        }
        return 'Custom';
    }
}