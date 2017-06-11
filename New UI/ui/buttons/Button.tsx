const enum ButtonColor {
    Primary,
    Secondary,
    Tertiary,
    Quaternary,
    Quandry,
}

interface IButtonProps {
    className?: string;
    title?: string;
    hotkey?: Hotkey;
    color?: ButtonColor;
    disabled?: boolean;
    text: string;
    subtext?: string;
    help?: string;
    fullBorder?: boolean;
}

interface IBaseButtonProps extends IButtonProps {
    buttonType?: string;
    mouseLeave?: React.EventHandler<React.MouseEvent>;
    mouseEnter?: React.EventHandler<React.MouseEvent>;
    mouseDown?: React.EventHandler<React.MouseEvent>;
    mouseUp?: React.EventHandler<React.MouseEvent>;
    mouseClick?: React.EventHandler<React.MouseEvent>;
}

interface IButtonState {
    showHelp: boolean;
}

class Button extends React.Component<IBaseButtonProps, IButtonState> {
    static defaultProps = {
        buttonType: 'button',
        text: '',
        fullBorder: false,
    };
    constructor(props: IBaseButtonProps) {
        super(props);
        this.state = {
            showHelp: false,
        };
    }
    componentDidMount() {
        if (this.props.hotkey != null)
            Hotkeys.register(this.props.hotkey, this);
    }
    componentWillUnmount() {
        if (this.props.hotkey != null)
            Hotkeys.unregister(this.props.hotkey, this);
    }
    render(): JSX.Element {
        if (this.props.help === undefined)
            return this.renderButton();
        return this.renderWithHelp();
    }
    private renderWithHelp() {
        let help = this.state.showHelp && this.props.help !== undefined ?
            <Help title={this.props.text} content={this.props.help} closed={this.showHelp.bind(this, false)} />
            : undefined;

        return <div className="buttons separate">
            {this.renderButton()}
            <IconButton clicked={this.showHelp.bind(this, true)} icon="help" />
            {help}
        </div>
    }
    private showHelp(show: boolean) {
        this.setState({
            showHelp: show
        });
    }
    private determineClasses() {
        let classes = this.props.className;
        
        if (this.props.fullBorder)
            classes += ' fullBorder';

        let color = this.props.color;
        if (color !== undefined) {
            switch(this.props.color) {
                case ButtonColor.Primary:
                    classes += ' primary'; break;
                case ButtonColor.Secondary:
                    classes += ' secondary'; break;
                case ButtonColor.Tertiary:
                    classes += ' tertiary'; break;
                case ButtonColor.Quaternary:
                    classes += ' quaternary'; break;
                case ButtonColor.Quandry:
                    classes += ' quandry'; break;
            }
        }
        return classes;
    }
    private renderButton() {
        let subtext = this.props.subtext === undefined ? undefined : <div className="subtext">{this.props.subtext}</div>;

        return <button className={this.determineClasses()} disabled={this.props.disabled}
                onMouseDown={this.props.disabled ? undefined : this.props.mouseDown}
                onMouseUp={this.props.disabled ? undefined : this.props.mouseUp}
                onMouseLeave={this.props.disabled ? undefined : this.props.mouseLeave}
                onClick={this.props.disabled ? undefined : this.props.mouseClick}
                data-hotkey={this.props.hotkey} type={this.props.buttonType}
                title={this.props.title}>
                    {this.props.text}
                    {subtext}
            </button>;
    }
    keyDown(e: any) {
        if (this.props.mouseDown !== undefined)
            this.props.mouseDown(e);
    }
    keyUp(e: any) {
        if (this.props.mouseUp !== undefined)
            this.props.mouseUp(e);
    }
    keyPress(e: any) {
        if (this.props.mouseClick !== undefined)
            this.props.mouseClick(e);
    }
    private fakeMouseEvent(keyboard: KeyboardEvent) {

        return new MouseEvent('click', {
            bubbles: false,
            button: 0,
            cancelable: true,
            view: window,
        });
    }
}