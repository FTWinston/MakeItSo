import * as React from 'react';

export interface FieldGroupProps {
    label?: string;
    className?: string;
}

export class FieldGroup extends React.PureComponent<FieldGroupProps, {}> {
    root: HTMLDivElement | null;

    public render() {
        let classes = 'fieldGroup';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        let label = this.props.label === undefined ? undefined : <div className="fieldGroup__label">{this.props.label}</div>;

        return (
        <div className={classes} ref={r => this.root = r}>
            {label}
            {this.props.children}
        </div>
        );
    }
}