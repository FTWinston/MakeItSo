const enum ButtonColor {
    Primary,
    Secondary,
    Tertiary,
    Quaternary,
    Quandry,
}

interface IButtonProps {
    hotkey?: string;
    color?: ButtonColor;
    disabled?: boolean;
}

interface IBaseButtonProps extends IButtonProps {
    className: string;
    groupDisabled?: boolean;
    mouseLeave?: React.EventHandler<React.MouseEvent>;
    mouseEnter?: React.EventHandler<React.MouseEvent>;
    mouseDown?: React.EventHandler<React.MouseEvent>;
    mouseUp?: React.EventHandler<React.MouseEvent>;
    mouseClick?: React.EventHandler<React.MouseEvent>;
}

class Button extends React.Component<IBaseButtonProps, {}> {
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
        let classes = this.props.className;
            
        if (this.props.color !== undefined) {
            switch(this.props.color) {
                case ButtonColor.Primary:
                    classes += ' primary'; break;
                case ButtonColor.Secondary:
                    classes += ' secondary'; break;
                case ButtonColor.Tertiary:
                    classes += ' tertiary'; break;
                case ButtonColor.Quaternary:
                    classes += ' Quaternary'; break;
                case ButtonColor.Quandry:
                    classes += ' quandry'; break;
            }
        }

        return (
            <button className={classes} disabled={this.props.disabled || this.props.groupDisabled}
                onMouseDown={this.props.disabled ? undefined : this.props.mouseDown}
                onMouseUp={this.props.disabled ? undefined : this.props.mouseUp}
                onMouseLeave={this.props.disabled ? undefined : this.props.mouseLeave}
                onClick={this.props.disabled ? undefined : this.props.mouseClick}
                data-hotkey={this.props.hotkey}>
                    {this.props.children}
            </button>
        );
    }
}