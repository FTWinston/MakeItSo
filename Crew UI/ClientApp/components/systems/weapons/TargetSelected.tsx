import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { TargetInfo } from './TargetInfo';
import { FireSetup } from './FireSetup';

interface TargetSelectedProps {
    text: TextLocalisation;
    target: SensorTarget;
}

export class TargetSelected extends React.PureComponent<TargetSelectedProps, {}> {
    public render() {
        return <div className="system weapons weapons--targetSelected">
            <TargetInfo text={this.props.text} target={this.props.target} />
            <FireSetup text={this.props.text} target={this.props.target} />
        </div>;

        // TODO: implement ... dice and info
    }
}