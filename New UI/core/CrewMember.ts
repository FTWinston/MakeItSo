class CrewMember {
    systemFlags: ShipSystem;
    constructor(public name: string) {
        this.systemFlags = 0;
    }

    hasSystem(system: ShipSystem) {
        return (this.systemFlags & system) != 0;
    }
}