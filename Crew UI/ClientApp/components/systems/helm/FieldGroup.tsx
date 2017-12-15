import * as React from 'react';

export interface FieldGroupProps {
    label: string;
    className?: string;
}

export class FieldGroup extends React.Component<FieldGroupProps, {}> {
    root: HTMLDivElement | null;

    public render() {
        let classes = 'fieldGroup';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return (
        <div className={classes} ref={r => this.root = r}>
            <div className="fieldGroup__label">{this.props.label}</div>
            {this.props.children}
        </div>
        );
    }
}