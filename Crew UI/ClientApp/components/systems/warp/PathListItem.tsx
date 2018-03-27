import * as React from 'react';
import { PushButton, Icon, ButtonColor } from '~/components/general';
import { TextLocalisation, Vector3 } from '~/functionality';
import { JumpPath } from '~/functionality/sensors';
import './PathListItem.scss';

interface PathListItemProps {
    text: TextLocalisation;
    path: JumpPath;
    selected: boolean;
    onSelected: (path: JumpPath) => void;
}

export class PathListItem extends React.PureComponent<PathListItemProps, {}> {
    render() {
        let words = this.props.text.systems.warp;
        let points = this.props.path.points;
        
        let from = points.length > 0 ? this.writeCoord(points[0]) : words.unknownPosition;
        let to = points.length > 1 ? this.writeCoord(points[points.length - 1]) : words.unknownPosition;

        let classes = this.props.selected ? 'warpPathListItem warpPathListItem--selected' : 'warpPathListItem';

        return <div className={classes} onClickCapture={() => this.props.onSelected(this.props.path)}>
            <div className="warpPathListItem__name">{words.jump} #{this.props.path.id}</div>
            <div className="warpPathListItem__points">{words.from} {from} {words.to} {to}</div>
            <div className="warpPathListItem__power">{words.power}: <span className="warpPathListItem__number">{this.props.path.power}</span></div>
        </div>;
    }

    private writeCoord(point: Vector3) {
        return <div className="coordinate warpPathListItem__coordinates">
            <span className="coordinate__number">{point.x}</span>,
            <span className="coordinate__number">{point.y}</span>,
            <span className="coordinate__number">{point.z}</span>
        </div>;
    }
}