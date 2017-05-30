const enum ButtonColor {
    Primary,
    Secondary,
    Tertiary,
    Quaternary,
    Quandry,
}

interface IButtonProps {
    title?: string;
    hotkey?: string;
    color?: ButtonColor;
    disabled?: boolean;
    help?: string;
}

interface IBaseButtonProps extends IButtonProps {
    className: string;
    buttonType?: string;
    groupColor?: ButtonColor;
    groupDisabled?: boolean;
    mouseLeave?: React.EventHandler<React.MouseEvent>;
    mouseEnter?: React.EventHandler<React.MouseEvent>;
    mouseDown?: React.EventHandler<React.MouseEvent>;
    mouseUp?: React.EventHandler<React.MouseEvent>;
    mouseClick?: React.EventHandler<React.MouseEvent>;
}

class Button extends React.Component<IBaseButtonProps, {}> {
    static defaultProps = {
        buttonType: "button"
    };
/*
    componentDidMount() {
        if (this.props.hotkey != null)
            Hotkeys.register(this.props.hotkey, this);
    }
    componentWillUnmount() {
        if (this.props.hotkey != null)
            Hotkeys.unregister(this.props.hotkey, this);
    }
*/
    render(): JSX.Element {
        if (this.props.help === undefined)
            return this.renderButton();
        return <div className="buttons separate">
            {this.renderButton()}
            <button className="help" type="button" title={language.common.help}>?</button>
        </div>
    }
    private determineClasses() {
        let classes = this.props.className;
        
        let color = this.props.color === undefined ? this.props.groupColor : this.props.color;
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
        return <button className={this.determineClasses()} disabled={this.props.disabled || this.props.groupDisabled}
                onMouseDown={this.props.disabled ? undefined : this.props.mouseDown}
                onMouseUp={this.props.disabled ? undefined : this.props.mouseUp}
                onMouseLeave={this.props.disabled ? undefined : this.props.mouseLeave}
                onClick={this.props.disabled ? undefined : this.props.mouseClick}
                data-hotkey={this.props.hotkey} type={this.props.buttonType}
                title={this.props.title}>
                    {this.props.children}
            </button>;
    }
}