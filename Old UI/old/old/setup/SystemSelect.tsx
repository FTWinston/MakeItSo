interface ISystemSelectProps {
    show?: boolean;
    playerID?: string;
    setupInProgress?: boolean;
    gameActive?: boolean;
    systems?: any[];
    selectionChanged?: any;
    inputMode?: InputMode;
    inputModeChanged?: (mode: InputMode) => void;
}

interface ISystemSelectState {
    inInputSelection?: boolean
}

class SystemSelect extends React.Component<ISystemSelectProps, ISystemSelectState> {
    static defaultProps = {
        systems: [], selectionChanged: null
    };
    constructor(props) {
        super(props);
        this.state = { inInputSelection: false };
    }
    render() {
        var self = this;
        var systems = this.props.systems.map(function(system) {
            return <SystemListItem key={system.index} system={system} selectionChanged={self.props.selectionChanged} />
        });
        
        var inputModes = [];
        for (let i=0; i<4; i++) {
            inputModes.push(<Button type={ButtonType.Toggle} key={i} forceActive={this.props.inputMode == i} description={language.inputModeDescriptions[i]} onActivated={function () {console.log('btn ' + i + ' activated'); self.props.inputModeChanged(i)}}>{language.inputModes[i]}</Button>);
        }

        return (
            <screen style={{display: this.props.show ? null : 'none'}}>
                <div className="playerIdentifier" style={{display: !this.state.inInputSelection ? null : 'none'}}>{this.props.playerID}</div>
                <ul id="systemList" style={{display: !this.state.inInputSelection ? null : 'none'}}>
                    <li className="prompt">{language.systemListPrompt}</li>
                    {systems}
                </ul>

                <ButtonGroup visible={!this.state.inInputSelection}>
                    <Button type={ButtonType.Push} action="+setup" color="4" visible={!this.props.gameActive} disabled={this.props.setupInProgress}>{language.systemListSetupGame}</Button>
                    <Button type={ButtonType.Push} action="resume" color="4" visible={this.props.gameActive}>{language.systemListResumeGame}</Button>
                
                    <Button type={ButtonType.Push} color="7" visible={this.props.systems[0].selected} onClicked={this.showInputOptions.bind(this)}>{language.systemListInputMode} {language.inputModes[this.props.inputMode]}</Button>

                    <Button type={ButtonType.Confirm} action="quit" color="3" visible={this.props.gameActive}>{language.systemListEndGame}</Button>
                </ButtonGroup>
                <Choice visible={this.state.inInputSelection} color="7" class="xsVertical" prompt={language.inputModePrompt}>
                    {inputModes}
                </Choice>
                <Button type={ButtonType.Push} color="4" visible={this.state.inInputSelection} onClicked={this.hideInputOptions.bind(this)}>{language.menuGoBack}</Button>
            </screen>
        );
    }
    showInputOptions() {
        this.setState({inInputSelection: true});
    }
    hideInputOptions() {
        this.setState({inInputSelection: false});
    }
}