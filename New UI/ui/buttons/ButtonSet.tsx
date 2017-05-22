interface IButtonSetBaseProps {
    vertical?: boolean;
    className?: string;
    prompt?: string;
    color?: ButtonColor;
    disabled?: boolean;
    allowUnselected?: boolean;
}

interface IButtonSetProps extends IButtonSetBaseProps {
    childActivated?: (activated: ToggleButton) => void;
}

class ButtonSet extends React.Component<IButtonSetProps, {}> {
    static defaultProps = {
        vertical: false,
        allowUnselected: true,
    };
    render() {
        let classes = 'buttons';
        if (this.props.vertical)
            classes += ' vertical';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;
        
        const childrenWithProps = React.Children.map(this.props.children as React.ReactNode,
            (child: React.ReactElement<any>) => {
                if (child === null)
                    return null;

                if (child.type === ToggleButton)
                    return React.cloneElement(child, {
                        groupDisabled: this.props.disabled,
                        color: this.props.color,
                        allowUserDeactivate: this.props.allowUnselected,
                        choiceOptionActivated: this.props.childActivated,
                    });

                if (child.type === PushButton || child.type === ConfirmButton || child.type === HeldButton)
                    return React.cloneElement(child, {
                        groupDisabled: this.props.disabled,
                        color: this.props.color,
                    });

                return child;
            }
        );

        return (
        <div className={classes}>
            {this.props.prompt == null ? null : <div className="prompt">{this.props.prompt}</div>}
            {childrenWithProps}
        </div>
        );
    }
}