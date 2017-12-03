import * as React from 'react';
import { ButtonColor } from './buttons';
import './Textbox.scss';

interface ITextboxProps {
    color?: ButtonColor;
    text?: string;
    placeholder?: string;
    textChanged: (text: string) => void;
}

export class Textbox extends React.Component<ITextboxProps, {}> {
    static defaultProps = {
        centered: false,
        labelBehaviour: true,
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
                type="text"
                value={this.props.text}
                onChange={e => this.props.textChanged(e.target.value)}
                placeholder={this.props.placeholder}
            />
        );
    }
}