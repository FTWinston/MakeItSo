import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { SensorSystemType } from './store';
import './TargetDisplay.scss';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    goBack: () => void;
    selectSystem: (system: SensorSystemType) => void;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        return <div className="sensors__targetDisplay targetDisplay">
            Info on target: {this.props.target.id}
        </div>
    }
}