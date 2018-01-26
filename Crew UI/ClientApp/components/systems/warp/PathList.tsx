import * as React from 'react';
import { Field, PushButton, Icon, ButtonColor } from '../../general';
import { JumpPath, WarpScreenStatus } from '../../../store/Warp';
import { TextLocalisation } from '../../../functionality';
import { PathListItem } from './PathListItem';

interface PathListProps {
    text: TextLocalisation;
    paths: JumpPath[];
    selectedPath?: JumpPath;
    pathSelected: (path: JumpPath) => void;
    newSelected: () => void;
}

export class PathList extends React.PureComponent<PathListProps, {}> {
    render() {
        let words = this.props.text.systems.warp;

        return <div className="warp__pathList">
            <ul className="warp__pathList__scroller">
                {this.props.paths.map(path => <PathListItem key={path.id} path={path} text={this.props.text} />)}
            </ul>

            <Field centered={true} displayAsRow={true}>
                <PushButton
                    disabled={this.props.selectedPath === undefined}
                    color={ButtonColor.Tertiary}
                    text={words.deletePath}
                    command="deleteWarpPath"
                />
                <PushButton
                    color={ButtonColor.Secondary}
                    text={this.props.selectedPath === undefined ? words.newPath : words.startJump}
                    command={this.props.selectedPath === undefined ? undefined : "warpJump"}
                    clicked={this.props.selectedPath === undefined ? this.props.newSelected : undefined}
                />
            </Field>
        </div>;
    }
}