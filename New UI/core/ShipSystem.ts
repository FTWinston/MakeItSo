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

class CrewRole {
    constructor(public readonly name: string, public readonly systemFlags: ShipSystem) { }

    getHelpText() {
        let systems: { name: string, help: string }[] = [];

        if (this.systemFlags & ShipSystem.Helm)
            systems.push(language.systems.helm);
        if (this.systemFlags & ShipSystem.Warp)
            systems.push(language.systems.warp);
        if (this.systemFlags & ShipSystem.Weapons)
            systems.push(language.systems.weapons);
        if (this.systemFlags & ShipSystem.Sensors)
            systems.push(language.systems.sensors);
        if (this.systemFlags & ShipSystem.PowerManagement)
            systems.push(language.systems.power);
        if (this.systemFlags & ShipSystem.DamageControl)
            systems.push(language.systems.damage);
        if (this.systemFlags & ShipSystem.Communications)
            systems.push(language.systems.comms);
        if (this.systemFlags & ShipSystem.ViewScreen)
            systems.push(language.systems.view);

        if (systems.length == 1)
            return `<p>${systems[0].help}</p>`;

        let output = '';
        for(let system of systems)
            output += `<h2>${system.name}</h2><p>${system.help}</p>`;
        return output;
    }
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