import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';

interface FireSetupProps {
    text: TextLocalisation;
    target: SensorTarget;
}

export class FireSetup extends React.PureComponent<FireSetupProps, {}> {
    public render() {
        return <div />
        // TODO: implement
    }
}