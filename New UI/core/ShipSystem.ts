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

interface SystemInfo {
    name: string;
    help: string;
}

class CrewRole {
    constructor(public readonly name: string, public readonly systemFlags: ShipSystem) { }
}

namespace ShipSystem {
    export const allSystems = [
        ShipSystem.Helm,
        ShipSystem.Warp,
        ShipSystem.Weapons,
        ShipSystem.Sensors,
        ShipSystem.PowerManagement,
        ShipSystem.DamageControl,
        ShipSystem.Communications,
        ShipSystem.ViewScreen,
    ];

    export const count = allSystems.length;

    function getInfoArray(flags: ShipSystem) {
        let systems: SystemInfo[] = [];

        if (flags & ShipSystem.Helm)
            systems.push(language.systems.helm);
        if (flags & ShipSystem.Warp)
            systems.push(language.systems.warp);
        if (flags & ShipSystem.Weapons)
            systems.push(language.systems.weapons);
        if (flags & ShipSystem.Sensors)
            systems.push(language.systems.sensors);
        if (flags & ShipSystem.PowerManagement)
            systems.push(language.systems.power);
        if (flags & ShipSystem.DamageControl)
            systems.push(language.systems.damage);
        if (flags & ShipSystem.Communications)
            systems.push(language.systems.comms);
        if (flags & ShipSystem.ViewScreen)
            systems.push(language.systems.view);

        return systems;
    }

    export function getNames(flags: ShipSystem) {
        let systems = getInfoArray(flags);
        
        if (systems.length == 1)
            return systems[0].name;

        let output = '';
        for (let system of systems)
            output += ', ' + system.name;
        
        if (output == '')
            return '';
        else
            return output.substr(2);
    }
    
    export function getHelpText(systemFlags: ShipSystem) {
        let systems = getInfoArray(systemFlags);

        if (systems.length == 1)
            return `<p>${systems[0].help}</p>`;

        let output = '';
        for(let system of systems)
            output += `<h2>${system.name}</h2><p>${system.help}</p>`;
        return output;
    }

    export function getRoles(crewSize: number) {
        switch (crewSize) {
        case 1:
            return [
                new CrewRole(language.roles.solo,
                    ShipSystem.Helm | ShipSystem.Warp | ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen | ShipSystem.Communications
                ),
            ];
        case 2:
            return [
                new CrewRole(language.roles.pilot,
                    ShipSystem.Helm | ShipSystem.Warp | ShipSystem.ViewScreen
                ),
                new CrewRole(language.roles.operations,
                    ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen | ShipSystem.Communications
                ),
            ];
        case 3:
            return [
                new CrewRole(language.systems.helm.name,
                    ShipSystem.Helm | ShipSystem.ViewScreen
                ),
                new CrewRole(language.roles.tactical,
                    ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.ViewScreen | ShipSystem.Communications
                ),
                new CrewRole(language.roles.engineering,
                    ShipSystem.Warp | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen
                ),
            ];
        case 4:
            return [
                new CrewRole(language.systems.helm.name,
                    ShipSystem.Helm | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.weapons.name,
                    ShipSystem.Weapons | ShipSystem.ViewScreen
                ),
                new CrewRole(language.roles.engineering,
                    ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen
                ),
                new CrewRole(language.roles.operations,
                    ShipSystem.Warp | ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen
                ),
            ];
        case 5:
            return [
                new CrewRole(language.systems.helm.name,
                    ShipSystem.Helm | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.weapons.name,
                    ShipSystem.Weapons | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.power.name,
                    ShipSystem.PowerManagement | ShipSystem.ViewScreen
                ),
                new CrewRole(language.roles.engineering,
                    ShipSystem.Warp | ShipSystem.DamageControl | ShipSystem.ViewScreen
                ),
                new CrewRole(language.roles.operations,
                    ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen
                ),
            ];
        case 6:
            return [
                new CrewRole(language.systems.helm.name,
                    ShipSystem.Helm | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.weapons.name,
                    ShipSystem.Weapons | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.power.name,
                    ShipSystem.PowerManagement | ShipSystem.ViewScreen
                ),
                new CrewRole(language.roles.operations,
                    ShipSystem.Warp | ShipSystem.Communications | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.sensors.name,
                    ShipSystem.Sensors | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.damage.name,
                    ShipSystem.DamageControl | ShipSystem.ViewScreen
                ),
            ];
        case 7:
            return [
                new CrewRole(language.systems.helm.name,
                    ShipSystem.Helm | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.weapons.name,
                    ShipSystem.Weapons | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.power.name,
                    ShipSystem.PowerManagement | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.warp.name,
                    ShipSystem.Warp | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.comms.name,
                    ShipSystem.Communications | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.sensors.name,
                    ShipSystem.Sensors | ShipSystem.ViewScreen
                ),
                new CrewRole(language.systems.damage.name,
                    ShipSystem.DamageControl | ShipSystem.ViewScreen
                ),
            ];
        default:
            return [];
        }
    }
}