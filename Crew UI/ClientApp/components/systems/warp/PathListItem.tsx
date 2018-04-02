import * as React from 'react';
import { PushButton, Icon, ButtonColor } from '~/components/general';
import { TextLocalisation, Vector3 } from '~/functionality';
import { JumpPath, JumpPathStatus } from '~/functionality/sensors';
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

        let classes = 'warpPathListItem';
        if (this.props.selected) {
            classes += ' warpPathListItem--selected';
        }

        let outOfRange;
        switch (this.props.path.status) {
            case JumpPathStatus.InRange:
                classes += ' warpPathListItem--inRange'; break;
            case JumpPathStatus.Plotted:
                outOfRange = ': ' + words.outOfRange;
                classes += ' warpPathListItem--outOfRange'; break;
            case JumpPathStatus.Invalid:
                classes += ' warpPathListItem--invalid'; break;
        }

        return <div className={classes} onClickCapture={() => this.props.onSelected(this.props.path)}>
            <div>
                <span className="warpPathListItem__name">{words.jump} #{this.props.path.id}</span>
                {outOfRange}
            </div>
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