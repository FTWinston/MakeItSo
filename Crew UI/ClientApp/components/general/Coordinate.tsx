import * as React from 'react';
import { Vector3 } from '~/functionality';
import './Coordinate.scss';

interface ICoordinateProps {
    pos: Vector3;
    className?: string;
}

export class Coordinate extends React.PureComponent<ICoordinateProps, {}> {
    render() {
        let classes = 'coordinate';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return <div className={classes}>
            <span className="coordinate__number">{this.props.pos.x}</span>,
            <span className="coordinate__number">{this.props.pos.y}</span>,
            <span className="coordinate__number">{this.props.pos.z}</span>
        </div>;
    }
}