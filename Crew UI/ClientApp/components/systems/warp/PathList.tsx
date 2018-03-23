import * as React from 'react';
import { Field, Panel, PushButton, Icon, ButtonColor } from '~/components/general';
import { JumpPath, WarpScreenStatus } from '~/store/Warp';
import { TextLocalisation } from '~/functionality';
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

        let footerButtons = (
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
        );

        return <Panel className="warp__pathList" footer={footerButtons} contentIsList={true}>
            {this.props.paths.map(path => <PathListItem key={path.id} path={path} text={this.props.text} />)}
        </Panel>;
    }
}