import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { SensorView } from '~/components/general/SensorView';
import { TargetList } from './TargetList';

interface TargetSelectionProps {
    text: TextLocalisation;
    allTargets: SensorTarget[];
}

export class TargetSelection extends React.PureComponent<TargetSelectionProps, {}> {
    public render() {
        return <div className="system weapons weapons--targetSelection">
            <SensorView className="weapons__targetSelect" targets={this.props.allTargets} />
            <TargetList text={this.props.text} targets={this.props.allTargets} />
        </div>;
    }
}