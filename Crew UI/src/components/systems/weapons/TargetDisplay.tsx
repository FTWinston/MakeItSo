import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    deselectTarget: () => void;
    deselectSolution?: () => void;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        return <div className="weapons__targetDisplay">
            TODO: implement
        </div>
    }
}