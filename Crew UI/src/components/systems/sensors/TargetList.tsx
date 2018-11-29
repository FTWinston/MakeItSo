import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { TargetListItem } from './TargetListItem';
import './TargetList.scss';

interface IProps {
    text: TextLocalisation;
    targets: SensorTarget[];
    selected: (target: SensorTarget) => void;
}

export class TargetList extends React.PureComponent<IProps, {}> {
    public render() {
        const text = this.props.text;
        const targets = this.props.targets.map((t, i) => <TargetListItem target={t} key={i} text={text} selected={() => this.props.selected(t)} /> )

        return <div className="sensors__targetList targetList">
            {targets}
        </div>
    }
}