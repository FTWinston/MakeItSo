import * as React from 'react';
import { Field, Panel, PushButton, ButtonColor } from '~/components/general';
import { TextLocalisation } from '~/functionality';
import { JumpPath } from '~/functionality/sensors';
import { PathListItem } from './PathListItem';

interface PathListProps {
    text: TextLocalisation;
    paths: JumpPath[];
    selectedPath?: JumpPath;
    pathSelected: (path: JumpPath) => void;
    newSelected: () => void;
    deletePath: (path: JumpPath) => void;
    startJump: (path: JumpPath) => void;
}

export class PathList extends React.PureComponent<PathListProps, {}> {
    render() {
        let words = this.props.text.systems.warp;
        const path = this.props.selectedPath;

        let footerButtons = (
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    disabled={path === undefined}
                    color={ButtonColor.Tertiary}
                    text={words.deletePath}
                    clicked={path === undefined ? undefined : () => this.props.deletePath(path)}
                />
                <PushButton
                    color={ButtonColor.Secondary}
                    text={path === undefined ? words.newPath : words.startJump}
                    clicked={path === undefined ? this.props.newSelected : () => this.props.startJump(path)}
                />
            </Field>
        );

        return <Panel className="warp__pathList" footer={footerButtons} contentIsList={true}>
            {this.props.paths.map(p => (
                <PathListItem
                    key={p.id}
                    path={p}
                    text={this.props.text}
                    selected={this.props.selectedPath === p}
                    onSelected={x => this.props.pathSelected(x)}
                />
                )
            )}
        </Panel>;
    }
}