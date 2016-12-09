const enum AuxPowerSystem {
    Engines = 0,
    Sensors = 3,
    Weapons = 4,
    Shields = 5,
    DamageControl = 6,
    Deflector = 8,
}

interface IPowerState {
    auxBoost?: AuxPowerSystem
}

class Power extends React.Component<ISystemProps, IPowerState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { auxBoost: AuxPowerSystem.Engines };
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
        if (prevState.focus != this.state.auxBoost) {
            (this.refs['auxEngines'] as Button).setActive(this.state.auxBoost == AuxPowerSystem.Engines);
            (this.refs['auxSensors'] as Button).setActive(this.state.auxBoost == AuxPowerSystem.Sensors);
            (this.refs['auxWeapons'] as Button).setActive(this.state.auxBoost == AuxPowerSystem.Weapons);
            (this.refs['auxShields'] as Button).setActive(this.state.auxBoost == AuxPowerSystem.Shields);
            (this.refs['auxDamage'] as Button).setActive(this.state.auxBoost == AuxPowerSystem.DamageControl);
            (this.refs['auxDeflector'] as Button).setActive(this.state.auxBoost == AuxPowerSystem.Deflector);
        }
    }
    render() {
        return (
            <system id="power" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="aux noGrow">
                    <Choice class="landscapeVertical" color="1" inline={true} prompt={language.powerAuxTarget}>
                        <Button type={ButtonType.Toggle} ref="auxEngines" startAction={"aux " + AuxPowerSystem.Engines}>{language.systemNames[AuxPowerSystem.Engines]}</Button>
                        <Button type={ButtonType.Toggle} ref="auxSensors" startAction={"aux " + AuxPowerSystem.Sensors}>{language.systemNames[AuxPowerSystem.Sensors]}</Button>
                        <Button type={ButtonType.Toggle} ref="auxWeapons" startAction={"aux " + AuxPowerSystem.Weapons}>{language.systemNames[AuxPowerSystem.Weapons]}</Button>
                        <Button type={ButtonType.Toggle} ref="auxShields" startAction={"aux " + AuxPowerSystem.Shields}>{language.systemNames[AuxPowerSystem.Shields]}</Button>
                        <Button type={ButtonType.Toggle} ref="auxDamage" startAction={"aux " + AuxPowerSystem.DamageControl}>{language.systemNames[AuxPowerSystem.DamageControl]}</Button>
                        <Button type={ButtonType.Toggle} ref="auxDeflector" startAction={"aux " + AuxPowerSystem.Deflector}>{language.systemNames[AuxPowerSystem.Deflector]}</Button>
                    </Choice>
                </section>
                <section className="cardSelect">
                    <PowerCardChoice ref="cards" visible={this.props.visible} />
                </section>
                <section className="cardLibrary">
                    Card library
                </section>
            </system>
        );
    }
    receiveMessage(msg, data) {
        switch (msg) {
            case 'aux':
                this.setState({ auxBoost: (parseInt(data) as AuxPowerSystem) });
                return true;
            default:
                return false;
        }
    }
    clearAllData() {

    }
}