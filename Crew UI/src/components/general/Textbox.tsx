import * as React from 'react';
import { ButtonColor } from './buttons';
import './Textbox.scss';

interface ITextboxProps {
    color?: ButtonColor;
    text?: string;
    placeholder?: string;
    numeric?: boolean;
    textChanged: (text: string) => void;
    disabled?: boolean;
}

export class Textbox extends React.Component<ITextboxProps, {}> {
    static defaultProps = {
        numeric: false,
        disabled: false,
    };

    render() {
        let classes = 'textbox';

        switch(this.props.color) {
            case ButtonColor.Primary:
                classes += ' textbox--primary'; break;
            case ButtonColor.Secondary:
                classes += ' textbox--secondary'; break;
            case ButtonColor.Tertiary:
                classes += ' textbox--tertiary'; break;
            case ButtonColor.Quaternary:
                classes += ' textbox--quaternary'; break;
            case ButtonColor.Quandry:
                classes += ' textbox--quandry'; break;
        }

        return (
            <input
                className={classes}
                type={this.props.numeric ? 'numeric' : 'text'}
                value={this.props.text}
                onChange={e => this.props.textChanged(e.target.value)}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
            />
        );
    }
}