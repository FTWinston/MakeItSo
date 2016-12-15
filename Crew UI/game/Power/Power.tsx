const enum PowerSystem {
    Engines = 0,
    Sensors,
    Weapons,
    Shields,
    DamageControl,
    Deflector,
}

interface IPowerState {
    auxPower?: number;  
    powerLevels?: number[];
    cardChoice?: number[];
}

class Power extends React.Component<ISystemProps, IPowerState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { auxPower: 0, powerLevels: [100, 100, 100, 100, 100, 100], cardChoice: [] };
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
        return (
            <system id="power" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="levels noGrow">
                    <p className="bigValue">{language.powerAux}: <span className="auxPowerLevel">{this.state.auxPower}</span></p>
                    <Choice class="landscapeVertical" color="1" inline={true} prompt={language.powerLevels} disabled={true}>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Engines] + ': ' + this.state.powerLevels[0] + '%'}</Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Sensors] + ': ' + this.state.powerLevels[1] + '%'}</Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Weapons] + ': ' + this.state.powerLevels[2] + '%'}</Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Shields] + ': ' + this.state.powerLevels[3] + '%'}</Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.DamageControl] + ': ' + this.state.powerLevels[4] + '%'}</Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Deflector] + ': ' + this.state.powerLevels[5] + '%'}</Button>
                    </Choice>
                </section>
                <section className="cardSelect">
                    <p>{language.powerCardSelect}</p>
                    <PowerCardChoice ref="cards" cards={this.state.cardChoice} />
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
                this.setState({ auxPower: parseInt(data) });
                return true;
            case 'levels':
                let levels = data.split(' ').map(function(val) { return parseInt(val) });
                this.setState({ powerLevels: levels });
                return true;
            case 'choice':
                // TODO: send current selection if any selected. New choice available now. Coordinate timing of this message and change of choice cards, so it can be validated.
                let cards = data.split(' ').map(function(val) { return parseInt(val) });
                this.setState({ cardChoice: cards });
                return true;
            case 'pick':
                return true;
            default:
                return false;
        }
    }
    clearAllData() {

    }
}