import * as React from 'react';
import { Icon } from '../../general';
import { JumpPath } from '../../../store/Warp';
import { TextLocalisation } from '../../../functionality';

interface JumpCountdownProps {
    text: TextLocalisation;
    path?: JumpPath;
    endTime?: Date;
}

export class JumpCountdown extends React.PureComponent<JumpCountdownProps, {}> {
    render() {
        let words = this.props.text.systems.warp;

        return <div className="warp_jumpCountdown">
            ETA: 13 seconds
        </div>;
    }
}