import * as React from 'react';
import './Field.scss';

interface IFieldProps {
    labelText?: string;
    labelBehaviour?: boolean;
    description?: string;
    centered?: boolean;
    displayAsRow?: boolean;
}

export class Field extends React.Component<IFieldProps, {}> {
    static defaultProps = {
        centered: false,
        labelBehaviour: false,
        displayAsRow: false,
    };

    render() {
        let contentClasses = 'field__content';

        if (this.props.centered) {
            contentClasses += ' field__content--centered';
        }

        if (this.props.displayAsRow) {
            contentClasses += ' field__content--row';
        }

        const label = this.props.labelText === undefined
            ? undefined
            : <div className="field__label">{this.props.labelText}</div>

        const description = this.props.description === undefined
            ? undefined
            : <div className="field__description">{this.props.description}</div>

        const content = <div className={contentClasses}>
            {this.props.children}
            {description}
        </div>

        if (this.props.labelBehaviour) {
            return (
                <label className='field'>
                    {label}
                    {content}
                </label>
            );
        } else {
            return (
                <div className='field' role="group">
                    {label}
                    {content}
                </div>
            );
        }
    }
}