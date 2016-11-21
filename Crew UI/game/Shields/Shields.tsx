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
        this.state = { enabled: false, power: 0, focus: ShieldFocus.None };
    }    
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        let portrait = this.props.width >= this.props.height;
        let shieldWidth = portrait ? Math.round(this.props.width * 0.8) : this.props.width;
        let shieldHeight = portrait ? this.props.height : Math.round(this.props.height * 0.85);

        return (
            <system id="shields" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="xlarge">
                    <ShieldDisplay ref="shield" width={shieldWidth} height={shieldHeight} visible={this.props.visible} />
                </section>
                <section className="xsmall">
                    <div class="powerLevel">{this.state.power}</div>
                    <p>{this.state.enabled ? language.shieldsEnabled : language.shieldsDisabled}</p>
                    <Button type={ButtonType.Push} action="shields 1" color="4" visible={!this.state.enabled} disabled={this.state.power == 0}>{language.shieldsToggleOn}</Button>
                    <Button type={ButtonType.Confirm} action="shields 0" color="4" visible={this.state.enabled}>{language.shieldsToggleOff}</Button>

                    <Choice class="landscapeVertical" color="2" disabled={!this.state.enabled || this.state.power == 0} prompt={language.shieldsRegenFocus}>
                        <Button type={ButtonType.Toggle} forceActive={this.state.focus == ShieldFocus.None}>{language.none}</Button>
                        <Button type={ButtonType.Toggle} forceActive={this.state.focus == ShieldFocus.Front}>{language.directionForward}</Button>
                        <Button type={ButtonType.Toggle} forceActive={this.state.focus == ShieldFocus.Rear}>{language.directionBackward}</Button>
                        <Button type={ButtonType.Toggle} forceActive={this.state.focus == ShieldFocus.Left}>{language.directionLeft}</Button>
                        <Button type={ButtonType.Toggle} forceActive={this.state.focus == ShieldFocus.Right}>{language.directionRight}</Button>
                        <Button type={ButtonType.Toggle} forceActive={this.state.focus == ShieldFocus.Top}>{language.directionUp}</Button>
                        <Button type={ButtonType.Toggle} forceActive={this.state.focus == ShieldFocus.Bottom}>{language.directionDown}</Button>
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
                return true;            
            case 'off':
                return true;
            case 'power':
                return true;
            case 'focus':
                return true;
            default:
                return false;
        }
    }
    clearAllData() {
        (this.refs['shield'] as ShieldDisplay).clearBlocks();
    }
}