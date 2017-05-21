interface ISettingsScreenState {
    userName?: string;
    inputMode?: InputMode;
}

class SettingsScreen extends React.Component<ISettingsScreenState, ISettingsScreenState> {
    constructor(props: ISettingsScreenState) {
        super(props);
        this.state = {
            inputMode: props.inputMode,
            userName: props.userName
        };
    }
    render() {
        return (
            <div className="screen" id="settings">
                <p>{language.userSettingsIntro}</p>
                <div className="field"><label>Input mode</label>
                    <Choice prompt={language.inputModePrompt} color={ButtonColor.Primary}>
                        <ToggleButton activated={this.setInputMode.bind(this, InputMode.ButtonsAndKeyboard)} description={language.inputModeDescriptionKeyboard}>{language.inputModeKeyboard}</ToggleButton>
                        <ToggleButton activated={this.setInputMode.bind(this, InputMode.Touchscreen)} description={language.inputModeDescriptionTouchscreen}>{language.inputModeTouchscreen}</ToggleButton>
                        <ToggleButton disabled={true} activated={this.setInputMode.bind(this, InputMode.GamePad)} description={language.inputModeDescriptionGamepad}>{language.inputModeGamepad}</ToggleButton>
                    </Choice>
                </div>
                <div className="field"><label>User name</label><input className="value secondary" type="text" value={this.state.userName} onChange={this.nameChanged.bind(this)} /></div>
                <ConfirmButton color={ButtonColor.Tertiary}>Save</ConfirmButton>
            </div>
        );
    }
    private setInputMode(mode: InputMode) {
        this.setState({ inputMode: mode, userName: this.state.userName });
    }
    private nameChanged(event: any) {
        this.setState({ userName: event.target.value });
    }
    save() {
        
    }
}