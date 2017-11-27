interface IButtonSetBaseProps {
    vertical?: boolean;
    className?: string;
    color?: ButtonColor;
    disabled?: boolean;
    allowUnselected?: boolean;
    separate?: boolean;
}

interface IButtonSetProps extends IButtonSetBaseProps {
    childActivated?: (activated: ToggleButton) => void;
}

class ButtonSet extends React.Component<IButtonSetProps, {}> {
    static defaultProps = {
        vertical: false,
        allowUnselected: true,
        separate: false,
    };
    render() {
        let classes = 'buttons';
        if (this.props.vertical)
            classes += ' vertical';
        if (this.props.separate)
            classes += ' separate';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;
        
        const childrenWithProps = React.Children.map(this.props.children as React.ReactNode,
            (child: React.ReactElement<any>) => {
                if (child === null)
                    return null;
                if (child.type !== PushButton && child.type !== ToggleButton && child.type !== HeldButton && child.type !== ConfirmButton)
                    return child;

                let childHasColor = child.props.color !== undefined;
                let childProps: any = {
                    disabled: this.props.disabled || child.props.disabled,
                    color: childHasColor ? child.props.color : this.props.color,
                    fullBorder: childHasColor && this.props.color !== undefined,
                }

                if (child.type === ToggleButton) {
                    childProps.allowUserDeactivate = this.props.allowUnselected
                    childProps.choiceOptionActivated = this.props.childActivated;
                }

                return React.cloneElement(child, childProps);
            }
        );

        return (
        <div className={classes}>
            {childrenWithProps}
        </div>
        );
    }
}