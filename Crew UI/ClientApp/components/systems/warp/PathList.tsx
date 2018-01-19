import * as React from 'react';
import { PushButton, Icon, ButtonColor } from '../../general';
import { JumpPath } from '../../../store/Warp';
import { TextLocalisation } from '../../../functionality';

interface PathListProps {
    text: TextLocalisation;
    paths: JumpPath[];
    pathSelected: (path: JumpPath) => void;
    newSelected: () => void;
}

export class PathList extends React.PureComponent<PathListProps, {}> {
    render() {
        let words = this.props.text.systems.warp;

        return <div className="warp_pathList">
            {this.props.paths.map(path => <div className="station" key={path.id}>PATH</div>)}
        </div>;
    }
}