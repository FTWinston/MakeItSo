import * as React from 'react';

interface IProps {
    value: number;
    selected: boolean;
    clicked: () => void;
}

export class NumberClicker extends React.PureComponent<IProps, {}> {
    public render() {
        let classes = 'warp__number';
        if (this.props.selected) {
            classes += ' warp__number--selected';
        }

        return <div className={classes} onClick={this.props.clicked}>
            {this.props.value}
        </div>
    }
}