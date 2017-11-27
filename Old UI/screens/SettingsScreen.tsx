interface ISettingsScreenBase {
    userName?: string;
    inputMode?: InputMode;
}

interface ISettingsScreenProps extends ISettingsScreenBase, IScreenProps {
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
    constructor(props: ISettingsScreenProps) {
        super(props);
        this.state = {
            inputMode: props.inputMode,
            userName: props.userName,
        };
    }
    render() {
        let words = language.screens.settings;
        let cancelButton = this.props.canCancel ? <PushButton color={ButtonColor.Quaternary} clicked={this.cancel.bind(this)} text={language.common.cancel} /> : null;
        let canSave = this.state.inputMode !== undefined && this.state.userName != null && this.state.userName.trim().length > 0;

        let inputModeVertical = this.props.width < 330;

        return (
            <div className="screen" id="settings">
                <form>
                    <h1>{words.intro}</h1>
                    <div role="group">
                        <label>{words.inputMode}</label>
                        <Choice prompt={words.inputModePrompt} color={ButtonColor.Primary} vertical={inputModeVertical}>
                            <ToggleButton startActive={this.props.inputMode == InputMode.ButtonsAndKeyboard} activated={this.setInputMode.bind(this, InputMode.ButtonsAndKeyboard)} description={words.inputModeDescriptionKeyboard} text={words.inputModeKeyboard} />
                            <ToggleButton startActive={this.props.inputMode == InputMode.Touchscreen} activated={this.setInputMode.bind(this, InputMode.Touchscreen)} description={words.inputModeDescriptionTouchscreen} text={words.inputModeTouchscreen} />
                            <ToggleButton startActive={this.props.inputMode == InputMode.GamePad} disabled={true} activated={this.setInputMode.bind(this, InputMode.GamePad)} description={words.inputModeDescriptionGamepad} text={words.inputModeGamepad} />
                        </Choice>
                    </div>
                    <div role="group">
                        <label htmlFor="txtUserName">{words.userName}</label>
                        <div>
                            <input id="txtUserName" className="value secondary" type="text" value={this.state.userName} onChange={this.nameChanged.bind(this)} placeholder={words.userNamePlaceholder} />
                            <div className="description">{words.userNameDescription}</div>
                        </div>
                    </div>
                    <ButtonSet className="actions" separate={true}>
                        <ConfirmButton color={ButtonColor.Tertiary} disabled={!canSave} clicked={this.save.bind(this)} text={language.common.save} />
                        {cancelButton}
                    </ButtonSet>
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
    private save() {
        var settings = new ClientSettings();
        if (this.state.inputMode !== undefined)
            settings.inputMode = this.state.inputMode;
        if (this.state.userName !== undefined)
            settings.userName = this.state.userName.trim();

        ClientSettings.save(settings);

        if (this.props.saved !== undefined)
            this.props.saved(settings);
    }
    private cancel() {
        if (this.props.cancelled !== undefined)
            this.props.cancelled();
    }
}