import * as React from 'react';
import { ButtonColor, ConfirmButton, HeldButton, PushButton, ToggleButton } from './buttons';
import { ICommonButtonProps } from './buttons/Button';
import { IToggleButtonProps } from './buttons/ToggleButton';
import './ButtonSet.scss';

export interface IButtonSetBaseProps {
    vertical?: boolean;
    className?: string;
    color?: ButtonColor;
    disabled?: boolean;
    allowUnselected?: boolean;
}

interface IButtonSetProps extends IButtonSetBaseProps {
    childActivated?: (activated: ToggleButton) => void;
}

export class ButtonSet extends React.Component<IButtonSetProps, {}> {
    static defaultProps = {
        vertical: false,
        allowUnselected: true,
    };

    render() {
        let classes = 'buttonset';
        if (this.props.vertical)
            classes += ' buttonset--vertical';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;
        
        const childrenWithProps = React.Children.map(this.props.children, child => {
            if (typeof child === 'string' || typeof child === 'number' || child === null)
                return child;

            if (child.type !== PushButton && child.type !== ToggleButton && child.type !== HeldButton && child.type !== ConfirmButton)
                return child;

            let childHasColor = child.props.color !== undefined;
            let childProps: Partial<ICommonButtonProps> = {
                disabled: this.props.disabled || child.props.disabled,
                color: childHasColor ? child.props.color : this.props.color,
                fullBorder: childHasColor && this.props.color !== undefined,
            }
            
            if (child.type === ToggleButton) {
                let toggleProps = childProps as IToggleButtonProps;
                toggleProps.allowUserDeactivate = this.props.allowUnselected
                toggleProps.choiceOptionActivated = this.props.childActivated;
            }
            
            return React.cloneElement(child, childProps);
        });

        return (
        <div className={classes}>
            {childrenWithProps}
        </div>
        );
    }
}