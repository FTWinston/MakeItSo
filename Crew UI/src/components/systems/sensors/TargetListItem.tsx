import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import './TargetListItem.scss';
import { SensorTargetType } from '~/functionality/sensors/SensorTarget';
import { TargetDisplay } from './TargetDisplay';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    selected: () => void;
}

export class TargetListItem extends React.PureComponent<IProps, {}> {
    public render() {
        const target = this.props.target;
        const classes = this.determineClasses();
        const type = TargetDisplay.getTypeName(target.type, this.props.text);

        return <div className={classes} onClick={() => this.props.selected()}>
            <div className="targetListItem__heading">
                <span className="targetListItem__type">{type}</span>: <span className="targetListItem__id">{target.id}</span>
            </div>
            <div className="targetListItem__position">
                Position: 
                <span className="targetListItem__positionElement">{target.position.x}</span>
                <span className="targetListItem__positionElement">{target.position.y}</span>
                <span className="targetListItem__positionElement">{target.position.z}</span>
            </div>
        </div>
    }

    private determineClasses() {
        let classes = 'targetListItem';
        switch (this.props.target.type) {
            case SensorTargetType.Star:
                classes += ' targetListItem--star';
                break;
            case SensorTargetType.Planet:
                classes += ' targetListItem--planet';
                break;
            case SensorTargetType.Station:
                classes += ' targetListItem--station';
                break;
            case SensorTargetType.Ship:
                classes += ' targetListItem--ship';
                break;
            case SensorTargetType.Misc:
                classes += ' targetListItem--misc';
                break;
        }
        return classes;
    }
}