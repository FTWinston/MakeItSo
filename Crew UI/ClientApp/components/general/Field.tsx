import * as React from 'react';
import './Field.scss';

interface IFieldProps {
    label?: string;
    labelFor?: string;
    description?: string;
    centered?: boolean;
}

export class Field extends React.Component<IFieldProps, {}> {
    static defaultProps = {
        centered: false,
    };

    render() {
        let contentClasses = 'field__content';

        if (this.props.centered) {
            contentClasses += ' field__content--centered';
        }

        let label;
        if (this.props.label !== undefined) {
            label = <label className="field__label" htmlFor={this.props.labelFor}>{this.props.label}</label>;
        }

        return (
            <div className='field' role="group">
                {label}
                <div className={contentClasses}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}