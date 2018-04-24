import * as React from 'react';
import { PowerCell, PowerCellType, PowerSystem, fullPowerLevel } from '~/store/power';
import { FlexibleCanvas } from '~/components/general';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';

interface ReactorCellProps {
    cell: PowerCell;
    clicked: () => void;
    heatLevel: number;
    heatRate: number;
    text: TextLocalisation;
}

export class ReactorCell extends React.PureComponent<ReactorCellProps, {}> {
    render() {
        let cell = this.props.cell;
        let style: React.CSSProperties = {
            gridColumnStart: cell.col,
            gridRowStart: cell.row,
        };

        let classes = 'gridCell gridCell--reactor';

        if (cell.endRow !== undefined && cell.endCol !== undefined) {
            style.gridColumnEnd = cell.endCol;
            style.gridRowEnd = cell.endRow;
        }

        return (
            <div className={classes} style={style} onClick={this.props.clicked}>
                <span className="gridCell__sysname">{this.props.text.systems.power.reactor}</span>
                <span className="gridCell__power">{this.props.cell.power}</span>
                <span className="gridCell__heat">{this.props.heatLevel}</span>
                <span className="gridCell__heatRate">{this.props.heatRate} / s</span>
            </div>
        );
    }
}