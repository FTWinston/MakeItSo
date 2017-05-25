interface IRoleSelectionProps {
    crew: { [key:string]:CrewMember; };
    settingsClicked: () => void;
}

class RoleSelection extends React.Component<IRoleSelectionProps, {}> {
    render() {

        let crew: CrewMember[] = [];
        for (let id in this.props.crew) {
            crew.push(this.props.crew[id]);
        }

        let that = this;
        return (
            <div className="screen" id="roleSelection">
                <h1>{language.screens.roleSelection.heading}</h1>
                <p className="prompt">{language.screens.roleSelection.prompt}</p>
                
                <ol className="crewList">
                    {crew.map(function(member, id) {
                        return <li key={id}>{member.name}<span className="systems">: {that.listSystems(member.systemFlags)}</span></li>;
                    })}
                </ol>

                <Menu>
                    <PushButton color={ButtonColor.Secondary} clicked={this.settingsClicked.bind(this)} title={language.common.settings}>&#9881;</PushButton>
                </Menu>
            </div>
        );
    }
    private settingsClicked() {
        if (this.props.settingsClicked !== undefined)
            this.props.settingsClicked();
    }
    private listSystems(flags: ShipSystem) {
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
            return language.common.none;
        else
            return output.substr(2);
    }
}