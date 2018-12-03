import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import './SensorSystemInfo.scss';
import { TargetDisplay } from './TargetDisplay';
import { SensorSystemType } from './store';
import { ButtonColor, PushButton } from '~/components/general';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    system: SensorSystemType;
    infoLevel: number;
    goBack: () => void;
}

export class SensorSystemInfo extends React.PureComponent<IProps, {}> {
    public render() {
        const target = this.props.target;
        const classes = this.determineClasses();
        const type = TargetDisplay.getTypeName(target.type, this.props.text);

        return <div className={classes}>
            <div className="sensorSystemInfo__heading">
                <span className="sensorSystemInfo__type">{type}</span>: <span className="sensorSystemInfo__id">{target.id}</span>
            </div>
            <div className="sensorSystemInfo__system">{type}</div>
            <div className="sensorSystemInfo__level">{this.props.infoLevel}</div>
            <PushButton color={ButtonColor.Secondary} clicked={this.props.goBack} text={this.props.text.common.goBack} />
        </div>

        // TODO: display info level, health and power
    }

    private determineClasses() {
        let classes = 'sensorSystemInfo';

        // TODO: account for health, damage, vulnerabilities
        
        return classes;
    }
}