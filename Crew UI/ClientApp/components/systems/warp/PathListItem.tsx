import * as React from 'react';
import { PushButton, Icon, ButtonColor } from '../../general';
import { JumpPath } from '../../../store/Warp';
import { TextLocalisation } from '../../../functionality';

interface PathListItemProps {
    text: TextLocalisation;
    path: JumpPath;
}

export class PathListItem extends React.PureComponent<PathListItemProps, {}> {
    render() {
        let words = this.props.text.systems.warp;

        return <div className="warpPathListItem">
            Path {this.props.path.id}
        </div>;
    }
}