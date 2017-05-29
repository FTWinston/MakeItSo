interface ISettingsScreenBase {
    userName?: string;
    inputMode?: InputMode;
}

interface ISettingsScreenProps extends ISettingsScreenBase {
    canCancel?: boolean;
    saved?: (settings: ClientSettings) => void;
    cancelled?: () => void;
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
        let words = language.screens.settings;
        let cancelButton = this.props.canCancel ? <PushButton color={ButtonColor.Quaternary} clicked={this.cancel.bind(this)}>{language.common.cancel}</PushButton> : null;
        let canSave = this.state.inputMode !== undefined && this.state.userName != null && this.state.userName.trim().length > 0;

        return (
            <div className="screen" id="settings">
                <form>
                    <h1>{words.intro}</h1>
                    <div role="group">
                        <label>{words.inputMode}</label>
                        <Choice prompt={words.inputModePrompt} color={ButtonColor.Primary}>
                            <ToggleButton startActive={this.props.inputMode == InputMode.ButtonsAndKeyboard} activated={this.setInputMode.bind(this, InputMode.ButtonsAndKeyboard)} description={words.inputModeDescriptionKeyboard}>{words.inputModeKeyboard}</ToggleButton>
                            <ToggleButton startActive={this.props.inputMode == InputMode.Touchscreen} activated={this.setInputMode.bind(this, InputMode.Touchscreen)} description={words.inputModeDescriptionTouchscreen}>{words.inputModeTouchscreen}</ToggleButton>
                            <ToggleButton startActive={this.props.inputMode == InputMode.GamePad} disabled={true} activated={this.setInputMode.bind(this, InputMode.GamePad)} description={words.inputModeDescriptionGamepad}>{words.inputModeGamepad}</ToggleButton>
                        </Choice>
                    </div>
                    <div role="group">
                        <label htmlFor="txtUserName">{words.userName}</label>
                        <div>
                            <input id="txtUserName" className="value secondary" type="text" value={this.state.userName} onChange={this.nameChanged.bind(this)} placeholder={words.userNamePlaceholder} />
                            <div className="description">{words.userNameDescription}</div>
                        </div>
                    </div>
                    <div role="group" className="actions">
                        <ConfirmButton color={ButtonColor.Tertiary} disabled={!canSave} clicked={this.save.bind(this)}>{language.common.save}</ConfirmButton>
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
        var settings = new ClientSettings();
        if (this.state.inputMode !== undefined)
            settings.inputMode = this.state.inputMode;
        if (this.state.userName !== undefined)
            settings.userName = this.state.userName.trim();

        ClientSettings.save(settings);

        if (this.props.saved !== undefined)
            this.props.saved(settings);
    }
    cancel() {
        if (this.props.cancelled !== undefined)
            this.props.cancelled();
    }
}