interface ISystemContainerProps {
    show?: boolean;
    systems?: ISystemInfo[];
    registerSystem?: (state: FeatureState) => void;
    touchMode?: FeatureState;
}

interface ISystemContainerState {
    currentSystem?: number;
    width?: number;
    height?: number;
    menuExpanded?: boolean;
}

class SystemContainer extends React.Component<ISystemContainerProps, ISystemContainerState> {
    constructor(props) {
        super(props);
        this.state = { currentSystem: -1, width: window.innerWidth, height: window.innerHeight, menuExpanded: false };
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this, false));
        this.handleResize();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize(value?: any, e?: any) {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }
    render() {
        var self = this;
        var switchers = this.props.systems.map(function(system) {
            return <Button type={ButtonType.Toggle} key={system.index} forceActive={system.selected && system.index == self.state.currentSystem} visible={system.selected} onActivated={function() {self.setState({currentSystem: system.index, menuExpanded: false})}}>{system.name}</Button>
        });
        switchers.unshift(
            <Button type={ButtonType.Push} key="sw" class="expand" onPressed={function() { self.setState({menuExpanded: !self.state.menuExpanded})}}>...</Button>
        );

        var switcher = this.refs['switcher'] as HTMLElement;
        var systemWidth = this.state.width, systemHeight = this.state.height - (switcher === undefined ? 0 : switcher.offsetHeight);
        
        var elements = [
            <Helm registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 0} index={0} key={0} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
            <Viewscreen registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 1} index={1} key={1} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
            <Sensors registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 2} index={2} key={2} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
            <Weapons registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 3} index={3} key={3} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
            <Shields registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 4} index={4} key={4} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
            <DamageControl registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 5} index={5} key={5} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
            <PowerManagement registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 6} index={6} key={6} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
            <Deflector registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 7} index={7} key={7} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />
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
                    <Choice inline={true} color="5" vertical={this.state.menuExpanded}>
                        {switchers}
                    </Choice>
                    <Button type={ButtonType.Push} action="pause" color="8" pull={Float.Right}>pause</Button>
                </div>
                {systems}
            </screen>
        );
    }
}