import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { PushButton } from '~/components/general';
import { ButtonColor } from '~/components/general/buttons/Button';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    deselectTarget: () => void;
    deselectSolution?: () => void;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        const goBack = () => this.props.deselectTarget();
        
        return <div className="weapons__targetDisplay">
            TODO: implement

            Targeting: TODO.

            Firing solution: TODO

            <PushButton clicked={goBack} text={this.props.text.common.goBack} color={ButtonColor.Quaternary} />
        </div>
    }
}