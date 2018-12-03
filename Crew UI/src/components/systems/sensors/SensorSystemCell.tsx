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
            case SensorTargetCellType.Empty:
                classes += ' sensorSystemCell--empty';
            case SensorTargetCellType.Hit:
                classes += ' sensorSystemCell--hit';
            case SensorTargetCellType.Group1:
                classes += ' sensorSystemCell--color1';
            case SensorTargetCellType.Group2:
                classes += ' sensorSystemCell--color2';
            case SensorTargetCellType.Group3:
                classes += ' sensorSystemCell--color3';
            case SensorTargetCellType.Group4:
                classes += ' sensorSystemCell--color4';
            case SensorTargetCellType.Group5:
                classes += ' sensorSystemCell--color5';
            case SensorTargetCellType.Group6:
                classes += ' sensorSystemCell--color3';
            case SensorTargetCellType.Group7:
                classes += ' sensorSystemCell--color7';
            case SensorTargetCellType.Group8:
                classes += ' sensorSystemCell--color8';
            case SensorTargetCellType.Group9:
                classes += ' sensorSystemCell--color9';
        }
        
        return classes;
    }
}