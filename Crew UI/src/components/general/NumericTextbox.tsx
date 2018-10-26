import * as React from 'react';
import { ButtonColor } from './buttons';
import { Textbox } from './Textbox';
import './Textbox.scss';

interface NumericTextboxProps {
    color?: ButtonColor;
    number?: number;
    placeholder?: string;
    numberChanged: (number: number | undefined) => void;
    disabled?: boolean;
}

export class NumericTextbox extends React.Component<NumericTextboxProps, {}> {
    render() {
        return (
            <Textbox
                numeric={true}
                text={this.props.number === undefined || isNaN(this.props.number) ? '' : this.props.number.toString()}
                textChanged={t => this.props.numberChanged(t === '' ? undefined : parseFloat(t))}
                color={this.props.color}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
            />
        );
    }
}