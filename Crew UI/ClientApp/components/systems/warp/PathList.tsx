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

        let newOrJump: JSX.Element | undefined;

        if (this.props.selectedPath === undefined) {
            newOrJump = <PushButton
                color={ButtonColor.Secondary}
                text={words.newPath}
                command="newWarpPath"
            />;
        } else {
            newOrJump = <PushButton
                color={ButtonColor.Secondary}
                text={words.startJump}
                command="warpJump"
            />;
        }

        return <div className="warp__pathList">
            <ul className="warp__pathList__scroller">
                {this.props.paths.map(path => <PathListItem key={path.id} path={path} text={this.props.text} />)}
            </ul>

            <Field centered={true} displayAsRow={true}>
                <PushButton
                    disabled={this.props.selectedPath !== undefined}
                    color={ButtonColor.Tertiary}
                    text={words.deletePath}
                    command="deleteWarpPath"
                />

            </Field>
        </div>;
    }
}