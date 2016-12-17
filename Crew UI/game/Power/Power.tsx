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
    cardLib?: number[];
    choiceCardID?: number;
    libraryCardID?: number;
}

class Power extends React.Component<ISystemProps, IPowerState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { auxPower: 0, powerLevels: [100, 100, 100, 100, 100, 100], cardChoice: [], cardLib: [], choiceCardID: null, libraryCardID: null };
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
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Engines]}: <span className="amount">{this.state.powerLevels[0]}%</span></Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Sensors]}: <span className="amount">{this.state.powerLevels[1]}%</span></Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Weapons]}: <span className="amount">{this.state.powerLevels[2]}%</span></Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Shields]}: <span className="amount">{this.state.powerLevels[3]}%</span></Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.DamageControl]}: <span className="amount">{this.state.powerLevels[4]}%</span></Button>
                        <Button type={ButtonType.Toggle}>{language.powerSystems[PowerSystem.Deflector]}: <span className="amount">{this.state.powerLevels[5]}%</span></Button>
                    </Choice>
                </section>
                <section className="cardSelect">
                    <p>{this.state.cardChoice.length == 0 ? language.powerCardWait : language.powerCardSelect}</p>
                    <PowerCardGroup cards={this.state.cardChoice} cardSelected={function (id) {this.setState({choiceCardID: id})}.bind(this)} />
                    <p><Button type={ButtonType.Push} color="4" disabled={this.state.choiceCardID == null} onClicked={this.chooseCard.bind(this)}>{language.powerConfirmChoose}</Button></p>
                </section>
                <section className="cardLibrary">
                    <PowerCardGroup cards={this.state.cardLib} cardSelected={function (id) {this.setState({libraryCardID: id})}.bind(this)} />
                    <p><Button type={ButtonType.Push} color="5" disabled={this.state.libraryCardID == null} onClicked={this.useCard.bind(this)}>{language.powerConfirmUse}</Button></p>
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
                let levels = data.split(' ').map(function (val) { return parseInt(val) });
                this.setState({ powerLevels: levels });
                return true;
            case 'choice':
                if (data.length == 0)
                    this.setState({ cardChoice: [] });
                else {
                    let choice = data.split(' ').map(function (val) { return parseInt(val) });
                    this.setState({ cardChoice: choice });
                }
                return true;
            case 'lib':
                if (data.length == 0)
                    this.setState({ cardLib: [] });
                else {
                    let lib = data.split(' ').map(function (val) { return parseInt(val) });
                    this.setState({ cardLib: lib });
                }
                return true;
            default:
                return false;
        }
    }
    clearAllData() {
        this.setState({
            auxPower: 0, powerLevels: [100, 100, 100, 100, 100, 100], cardChoice: [], cardLib: [], choiceCardID: null, libraryCardID: null
        });
    }
    private chooseCard() {
        let id = this.state.choiceCardID;
        gameClient.server.send('pickCard ' + id);
    }
    private useCard() {
        let id = this.state.libraryCardID;
        gameClient.server.send('useCard ' + id);
    }
}