import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';

interface TargetInfoProps {
    text: TextLocalisation;
    target: SensorTarget;
}

export class TargetInfo extends React.PureComponent<TargetInfoProps, {}> {
    public render() {
        return <div />
        // TODO: implement
    }
}