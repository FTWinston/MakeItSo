import * as React from 'react';
import { PowerCell, PowerCellType } from '~/store/power';
import './GridCell.scss';

interface GridCellProps {
    cell: PowerCell;
    row?: number;
    col?: number;
    clicked: () => void;
    inList?: boolean;
    selected?: boolean;
}

export class GridCell extends React.PureComponent<GridCellProps, {}> {
    render() {
        let style = this.props.row === undefined ? undefined : {
            gridColumnStart: this.props.row,
            gridRowStart: this.props.col,
        };

        let classes = 'gridCell';

        if (this.props.inList) {
            classes += ' gridCell--inList';
        }

        if (this.props.selected) {
            classes += ' gridCell--selected';
        }

        switch(this.props.cell.type) {
            case PowerCellType.Empty:
                classes += ' gridCell--empty'; break;
            case PowerCellType.Reactor:
                classes += ' gridCell--reactor'; break;
            case PowerCellType.ExhaustPort:
                classes += ' gridCell--exhaust'; break;
            case PowerCellType.Broken:
                classes += ' gridCell--broken'; break;
            case PowerCellType.NorthSouth:
                classes += ' gridCell--ns'; break;
            case PowerCellType.EastWest:
                classes += ' gridCell--ew'; break;
            case PowerCellType.NorthEast:
                classes += ' gridCell--ne'; break;
            case PowerCellType.SouthEast:
                classes += ' gridCell--se'; break;
            case PowerCellType.SouthWest:
                classes += ' gridCell--sw'; break;
            case PowerCellType.NorthWest:
                classes += ' gridCell--nw'; break;
            case PowerCellType.NorthEastSouth:
                classes += ' gridCell--nes'; break;
            case PowerCellType.EastSouthWest:
                classes += ' gridCell--esw'; break;
            case PowerCellType.SouthWestNorth:
                classes += ' gridCell--swn'; break;
            case PowerCellType.WestNorthEast:
                classes += ' gridCell--wne'; break;
        }

        return (
            <div
                className={classes}
                style={style}
                onClick={this.props.clicked}
            >
                {this.props.cell.power}
            </div>
        );
    }
}