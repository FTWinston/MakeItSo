interface ISystemContainerProps {
    show?: boolean;
    systems?: ISystemInfo[];
    registerSystem?: (id: number, system: ISystem) => void;
    inputMode?: InputMode;
}

interface ISystemContainerState {
    currentSystem?: number;
}

class SystemContainer extends React.Component<ISystemContainerProps, ISystemContainerState> {
    constructor(props) {
        super(props);
        this.state = { currentSystem: -1 };
    }
    render() {
        var self = this;
        var switchers = this.props.systems.map(function(system) {
            return <Button type={ButtonType.Toggle} key={system.index} forceActive={system.selected && system.index == self.state.currentSystem} visible={system.selected} onActivated={function() {self.setState({currentSystem: system.index})}}>{system.name}</Button>
        });

        var elements = [
            <Helm registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 0} index={0} key={0} inputMode={this.props.inputMode} />,
            <Viewscreen registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 1} index={1} key={1} inputMode={this.props.inputMode} />,
            <Communications registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 2} index={2} key={2} inputMode={this.props.inputMode} />,
            <Sensors registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 3} index={3} key={3} inputMode={this.props.inputMode} />,
            <Weapons registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 4} index={4} key={4} inputMode={this.props.inputMode} />,
            <Shields registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 5} index={5} key={5} inputMode={this.props.inputMode} />,
            <DamageControl registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 6} index={6} key={6} inputMode={this.props.inputMode} />,
            <Power registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 7} index={7} key={7} inputMode={this.props.inputMode} />,
            <Deflector registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 8} index={8} key={8} inputMode={this.props.inputMode} />
        ];
        
        var systems = [];
        for (var i=0; i<this.props.systems.length; i++) {
            var system = this.props.systems[i];
            if (system.selected)
                systems.push(elements[i]);
        }
        
        return (
            <screen id="gameActive" style={{display: this.props.show ? null : 'none'}}>
                <div id="systemSwitcher" ref="switcher" data-numsystems={systems.length}>
                    <Choice inline={true} color="5" dropdown={{label: '...', popUpwards: false}}>
                        {switchers}
                    </Choice>
                    <Button type={ButtonType.Push} action="pause" color="8" pull={Float.Right}>{language.systemContainerPause}</Button>
                </div>
                {systems}
            </screen>
        );
    }
}