const enum ShieldFocus {
    None = 0,
    Front,
    Rear,
    Left,
    Right,
    Top,
    Bottom,
}

interface IShieldState {
    enabled?: boolean;
    power?: number;
    focus?: ShieldFocus;
}

class Shields extends React.Component<ISystemProps, IShieldState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { enabled: false, power: 1, focus: ShieldFocus.None };
    }
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.focus != this.state.focus) {
            (this.refs['focF'] as Button).setActive(this.state.focus == ShieldFocus.Front);
            (this.refs['focB'] as Button).setActive(this.state.focus == ShieldFocus.Rear);
            (this.refs['focL'] as Button).setActive(this.state.focus == ShieldFocus.Left);
            (this.refs['focR'] as Button).setActive(this.state.focus == ShieldFocus.Right);
            (this.refs['focU'] as Button).setActive(this.state.focus == ShieldFocus.Top);
            (this.refs['focD'] as Button).setActive(this.state.focus == ShieldFocus.Bottom);
        }
    }
    render() {
        let portrait = false, focusClasses = 'focus landscapeVertical portraitDropdown', focusDropdown = { label: language.shieldsCharge, popUpwards: true };

        return (
            <system id="shields" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="toEdge fillMe">
                    <ShieldDisplay ref="shield" visible={this.props.visible} />
                </section>
                <section className="tools noGrow">
                    <div className="powerLevel" title="power allocated to this system">{this.state.power}</div>
                    <ButtonGroup class="toggler" color={this.state.enabled ? "3" : "4"} prompt={this.state.enabled ? language.shieldsEnabled : language.shieldsDisabled}>
                        <Button type={ButtonType.Push} action="+shields" visible={!this.state.enabled} disabled={this.state.power == 0}>{language.shieldsToggleOn}</Button>
                        <Button type={ButtonType.Confirm} action="-shields" visible={this.state.enabled}>{language.shieldsToggleOff}</Button>
                    </ButtonGroup>
                    <Choice class={focusClasses} color="2" dropdown={focusDropdown} inline={portrait} disabled={!this.state.enabled || this.state.power == 0} prompt={language.shieldsRegenFocus}>
                        <Button type={ButtonType.Toggle} ref="focN" startAction="shieldFoc 0">{language.all}</Button>
                        <Button type={ButtonType.Toggle} ref="focF" startAction="shieldFoc 1">{language.directionForward}</Button>
                        <Button type={ButtonType.Toggle} ref="focB" startAction="shieldFoc 2">{language.directionBackward}</Button>
                        <Button type={ButtonType.Toggle} ref="focL" startAction="shieldFoc 3">{language.directionLeft}</Button>
                        <Button type={ButtonType.Toggle} ref="focR" startAction="shieldFoc 4">{language.directionRight}</Button>
                        <Button type={ButtonType.Toggle} ref="focU" startAction="shieldFoc 5">{language.directionUp}</Button>
                        <Button type={ButtonType.Toggle} ref="focD" startAction="shieldFoc 6">{language.directionDown}</Button>
                    </Choice>
                </section>
            </system>
        );
    }
    receiveMessage(msg, data) {
        switch(msg) {
            case 'set':
                var values = data.split(' ');
                if (values.length != 3) {
                    console.error(language.errorParameterNumber.replace('@num@', '3'));
                    return false;
                }
                var index = parseInt(values[0]), type = parseInt(values[1]), color = parseInt(values[2]);
                if (isNaN(index) || isNaN(type) || isNaN(color)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                (this.refs['shield'] as ShieldDisplay).setBlock(index, type, color);
                return true;
            case 'on':
                this.setState({enabled: true});
                return true;            
            case 'off':
                this.setState({enabled: false});
                return true;
            case 'power':
                this.setState({power: parseInt(data)});
                return true;
            case 'focus':
                this.setState({focus: parseInt(data)});
                return true;
            default:
                return false;
        }
    }
    clearAllData() {
        (this.refs['shield'] as ShieldDisplay).clearBlocks();
    }
}