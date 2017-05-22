interface ISettingsScreenBase {
    userName?: string;
    inputMode?: InputMode;
}

interface ISettingsScreenProps extends ISettingsScreenBase {
    canCancel?: boolean;
}

interface ISettingsScreenState extends ISettingsScreenBase{
    canSave?: boolean;
}

class SettingsScreen extends React.Component<ISettingsScreenProps, ISettingsScreenState> {
    static defaultProps = {
        canCancel: true,
    }
    constructor(props: ISettingsScreenState) {
        super(props);
        this.state = {
            inputMode: props.inputMode,
            userName: props.userName,
        };
    }
    render() {
        let cancelButton = this.props.canCancel ? <PushButton clicked={this.cancel.bind(this)} color={ButtonColor.Quandry}>Cancel</PushButton> : null;
        let canSave = this.state.inputMode !== undefined && this.state.userName != null && this.state.userName.trim().length > 0;

        return (
            <div className="screen" id="settings">
                <form>
                    <h1>{language.userSettingsIntro}</h1>
                    <div className="field"><label>Input mode</label>
                        <Choice prompt={language.inputModePrompt} color={ButtonColor.Primary}>
                            <ToggleButton activated={this.setInputMode.bind(this, InputMode.ButtonsAndKeyboard)} description={language.inputModeDescriptionKeyboard}>{language.inputModeKeyboard}</ToggleButton>
                            <ToggleButton activated={this.setInputMode.bind(this, InputMode.Touchscreen)} description={language.inputModeDescriptionTouchscreen}>{language.inputModeTouchscreen}</ToggleButton>
                            <ToggleButton disabled={true} activated={this.setInputMode.bind(this, InputMode.GamePad)} description={language.inputModeDescriptionGamepad}>{language.inputModeGamepad}</ToggleButton>
                        </Choice>
                    </div>
                    <div className="field">
                        <label htmlFor="txtUserName">User name</label>
                        <div>
                            <input id="txtUserName" className="value secondary" type="text" value={this.state.userName} onChange={this.nameChanged.bind(this)} />
                            <div className="description">{language.userNameDescription}</div>
                        </div>
                    </div>
                    <div className="field actions">
                        <ConfirmButton color={ButtonColor.Tertiary} disabled={!canSave}>Save</ConfirmButton>
                        {cancelButton}
                    </div>
                </form>
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
    cancel() {

    }
}