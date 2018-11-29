import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';

interface TargetListProps {
    text: TextLocalisation;
    targets: SensorTarget[];
    selected?: (target: SensorTarget) => void;
}

export class TargetList extends React.PureComponent<TargetListProps, {}> {
    public render() {
        return <div className="sensors__targetList" />
        // TODO: implement
    }
}