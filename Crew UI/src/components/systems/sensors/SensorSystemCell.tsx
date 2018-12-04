import * as React from 'react';
import './SensorSystemCell.scss';
import { SensorTargetCellType } from './store';

interface IProps {
    type: SensorTargetCellType;
    clicked?: () => void;
}

export class SensorSystemCell extends React.PureComponent<IProps, {}> {
    public render() {
        const classes = this.determineClasses();
        const clicked = this.props.clicked === undefined
            ? undefined
            : () => this.props.clicked!();

        return <div className={classes} onClick={clicked} />
    }

    private determineClasses() {
        let classes = 'sensorSystemCell';

        switch (this.props.type) {
            case SensorTargetCellType.Unknown:
                classes += ' sensorSystemCell--unknown';
                break;
            case SensorTargetCellType.Empty:
                classes += ' sensorSystemCell--empty';
                break;
            case SensorTargetCellType.Hit:
                classes += ' sensorSystemCell--hit';
                break;
        }
        
        return classes;
    }
}