import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import './TargetInfo.scss';
import { SensorTargetType } from '~/functionality/sensors/SensorTarget';
import { TargetDisplay } from './TargetDisplay';
import { RelatableTarget, Relationship } from '~/functionality/sensors/RelatableTarget';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    className?: string;
    selected?: () => void;
}

export class TargetInfo extends React.PureComponent<IProps, {}> {
    public render() {
        const target = this.props.target;
        const classes = this.determineClasses();
        const type = TargetDisplay.getTypeName(target.type, this.props.text);
        const selected = this.props.selected === undefined
            ? undefined : () => this.props.selected!();

        return <div className={classes} onClickCapture={selected}>
            <div className="targetInfo__heading">
                <span className="targetInfo__type">{type}</span>: <span className="targetInfo__id">{target.id}</span>
            </div>
            <div className="targetInfo__position">
                Position: 
                <span className="targetInfo__positionElement">{target.position.x}</span>
                <span className="targetInfo__positionElement">{target.position.y}</span>
                <span className="targetInfo__positionElement">{target.position.z}</span>
            </div>
        </div>
    }

    private determineClasses() {
        let classes = 'targetInfo';
        switch (this.props.target.type) {
            case SensorTargetType.Star:
                classes += ' targetInfo--star';
                break;
            case SensorTargetType.Planet:
                classes += ' targetInfo--planet';
                break;
            case SensorTargetType.Station:
                classes += ' targetInfo--station';
                classes += this.getRelationshipClasses();
                break;
            case SensorTargetType.Ship:
                classes += ' targetInfo--ship';
                classes += this.getRelationshipClasses();
                break;
            case SensorTargetType.Misc:
                classes += ' targetInfo--misc';
                break;
        }

        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return classes;
    }

    private getRelationshipClasses() {
        const relatable = this.props.target as RelatableTarget;

        switch (relatable.relationship) {
            case Relationship.Enemy:
                return ' targetInfo--enemy';
            case Relationship.Friendly:
                return ' targetInfo--friendly';
            case Relationship.Neutral:
                return ' targetInfo--neutral';
            case Relationship.Unknown:
                return ' targetInfo--unknown';
        }
    }
}