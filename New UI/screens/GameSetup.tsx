enum GameType {
    Local,
    Join,
    Host,
}

interface IGameSetupProps {
    saved?: (settings: IGameSetupState) => void;
    cancelled?: () => void;
}

interface IGameSetupState {
    shipName: string;
    gameType?: GameType;
}

class GameSetup extends React.Component<IGameSetupProps, IGameSetupState> {
    constructor(props: IGameSetupProps) {
        super(props);

        this.state = {
            shipName: this.getRandomName(),
        };
    }
    private getRandomName() {
        let randomNames = language.screens.setup.shipNames;
        let index = Math.floor(Math.random() * randomNames.length);
        return randomNames[index];
    }
    private randomizeName() {
        let name: string;
        do {
            name = this.getRandomName();
        } while (name == this.state.shipName);

        this.setState({ shipName: name });
    }
    render() {
        let words = language.screens.setup;
        let canSave = this.state.gameType !== undefined && this.state.shipName.trim().length > 0;

        return <div className="screen" id="setup">
            <form>
                <h1>{words.intro}</h1>
                <div role="group">
                    <label>{words.gameType}</label>
                    <Choice prompt={words.gameTypePrompt} color={ButtonColor.Primary}>
                        <ToggleButton activated={this.setGameType.bind(this, GameType.Local)} description={words.gameTypeLocalDescription} text={words.gameTypeLocal} />
                        <ToggleButton activated={this.setGameType.bind(this, GameType.Join)} description={words.gameTypeJoinDescription} text={words.gameTypeJoin} />
                        <ToggleButton activated={this.setGameType.bind(this, GameType.Host)} description={words.gameTypeHostDescription} text={words.gameTypeHost} />
                    </Choice>
                </div>
                <div role="group">
                    <label htmlFor="txtShipName">{words.shipName}</label>
                    <div>
                        <ButtonSet separate={true}>
                            <input id="txtShipName" className="value tertiary" type="text" value={this.state.shipName} onChange={this.shipNameChanged.bind(this)} />
                            <button className="push icon" type="button" onClick={this.randomizeName.bind(this)}>&#9861;</button>
                        </ButtonSet>
                        <div className="description">{words.shipNameDescription}</div>
                    </div>
                </div>
                <ButtonSet className="actions" separate={true}>
                    <ConfirmButton color={ButtonColor.Tertiary} disabled={!canSave} clicked={this.save.bind(this)} text={language.common.save} />
                    <PushButton color={ButtonColor.Quaternary} clicked={this.cancel.bind(this)} text={language.common.cancel} />
                </ButtonSet>
            </form>
        </div>;
    }
    private setGameType(type: GameType) {
        this.setState({ gameType: type, shipName: this.state.shipName });
    }
    private shipNameChanged(event: any) {
        this.setState({ shipName: event.target.value });
    }
    private save() {
        if (this.props.saved !== undefined)
            this.props.saved(this.state);
    }
    private cancel() {
        if (this.props.cancelled !== undefined)
            this.props.cancelled();
    }
}