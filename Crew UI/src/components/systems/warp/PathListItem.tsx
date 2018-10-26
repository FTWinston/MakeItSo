import * as React from 'react';
import { Coordinate } from '~/components/general';
import { TextLocalisation } from '~/functionality';
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
        
        let from = points.length > 0 ? <Coordinate pos={points[0]} className="warpPathListItem__coordinates" /> : words.unknownPosition;
        let to = points.length > 1 ? <Coordinate pos={points[points.length - 1]} className="warpPathListItem__coordinates" /> : words.unknownPosition;

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
}