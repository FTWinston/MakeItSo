import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';

interface TargetListProps {
    text: TextLocalisation;
    targets: SensorTarget[];
}

export class TargetList extends React.PureComponent<TargetListProps, {}> {
    public render() {
        return <div className="weapons__targetList">
            
        </div>;
        // TODO: implement
    }
}