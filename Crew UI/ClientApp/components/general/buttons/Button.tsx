import * as React from 'react';
import { Hotkey, Hotkeys } from '../../../functionality';
import { Icon, renderIcon } from '../Icons';
import './buttons.scss';

export const enum ButtonColor {
    Primary,
    Secondary,
    Tertiary,
    Quaternary,
    Quandry,
}

export interface IBaseButtonProps {
    text?: string;
    icon?: Icon;
    className?: string;
    title?: string;
    hotkey?: Hotkey;
    color?: ButtonColor;
    disabled?: boolean;
    subtext?: string;
    noBorder?: boolean;
    fullBorder?: boolean;
}

interface IButtonProps extends IBaseButtonProps {
    buttonType?: string;
    mouseLeave?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    mouseEnter?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    mouseDown?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    mouseUp?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    mouseClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

export class Button extends React.Component<IButtonProps, {}> {
    static defaultProps = {
        buttonType: 'button',
        text: '',
        fullBorder: false,
    };

    componentDidMount() {
        if (this.props.hotkey != null)
            Hotkeys.register(this.props.hotkey, this);
    }

    componentWillUnmount() {
        if (this.props.hotkey != null)
            Hotkeys.unregister(this.props.hotkey, this);
    }

    private determineClasses() {
        let classes = 'button';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }
        
        if (this.props.fullBorder)
            classes += ' button--fullBorder';
        if (this.props.noBorder)
            classes += ' button--noBorder';

        switch(this.props.color) {
            case ButtonColor.Primary:
                classes += ' button--primary'; break;
            case ButtonColor.Secondary:
                classes += ' button--secondary'; break;
            case ButtonColor.Tertiary:
                classes += ' button--tertiary'; break;
            case ButtonColor.Quaternary:
                classes += ' button--quaternary'; break;
            case ButtonColor.Quandry:
                classes += ' button--quandry'; break;
        }
        
        return classes;
    }

    render(): JSX.Element {
        let icon = this.props.icon === undefined ? undefined : renderIcon(this.props.icon);
        let text = this.props.text === undefined ? undefined : this.props.text;
        let subtext = this.props.subtext === undefined ? undefined : <div className="button__subtext">{this.props.subtext}</div>;

        return <button className={this.determineClasses()} disabled={this.props.disabled}
            onMouseDown={this.props.disabled ? undefined : this.props.mouseDown}
            onMouseUp={this.props.disabled ? undefined : this.props.mouseUp}
            onMouseLeave={this.props.disabled ? undefined : this.props.mouseLeave}
            onClick={this.props.disabled ? undefined : this.props.mouseClick}
            data-hotkey={this.props.hotkey} type={this.props.buttonType}
            title={this.props.title}>
                {icon}
                {text}
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
}