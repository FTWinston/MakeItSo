import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import './TargetListItem.scss';
import { SensorTargetType } from '~/functionality/sensors/SensorTarget';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    selected: () => void;
}

export class TargetListItem extends React.PureComponent<IProps, {}> {
    public render() {
        const target = this.props.target;
        const classes = this.determineClasses(target);

        return <div className={classes} onClick={() => this.props.selected()}>
            <div className="targetListItem__id">{target.id}</div>
        </div>
    }

    private determineClasses(target: SensorTarget) {
        let classes = 'targetListItem';
        switch (target.type) {
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