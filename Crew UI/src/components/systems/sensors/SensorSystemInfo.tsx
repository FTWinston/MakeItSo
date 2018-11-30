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
    goBack: () => void;
}

export class SensorSystemInfo extends React.PureComponent<IProps, {}> {
    public render() {
        const target = this.props.target;
        const classes = this.determineClasses();
        const type = TargetDisplay.getTypeName(target.type, this.props.text);

        return <div className={classes}>
            <div className="targetListItem__heading">
                <span className="targetListItem__type">{type}</span>: <span className="targetListItem__id">{target.id}</span>
            </div>
            <div className="targetListItem__system">{type}</div>

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