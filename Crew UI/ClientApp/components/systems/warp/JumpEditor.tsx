import * as React from 'react';
import { PushButton, Icon, ButtonColor } from '../../general';
import { JumpPath } from '../../../store/Warp';
import { TextLocalisation, Vector3 } from '../../../functionality';

interface JumpEditorProps {
    text: TextLocalisation;
    editPath?: JumpPath;
    startPlotting: (from: Vector3, yaw: number, pitch: number, power: number) => void;
    cancel: () => void;
}

export class JumpEditor extends React.PureComponent<JumpEditorProps, {}> {
    render() {
        let words = this.props.text.systems.warp;

        return <div className="warp_jumpEditor">
            Input path stuff
        </div>;
    }
}