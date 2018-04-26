import * as React from 'react';
import { PowerCell, PowerCellType, PowerSystem, fullPowerLevel } from '~/store/power';
import { FlexibleCanvas } from '~/components/general';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';

interface ReactorCellProps {
    col: number;
    row: number;
    endCol?: number;
    endRow?: number;
    power: number;
    heatLevel: number;
    heatRate: number;
    text: TextLocalisation;
    clicked: () => void;
}

export class ReactorCell extends React.PureComponent<ReactorCellProps, {}> {
    render() {
        let style: React.CSSProperties = {
            gridColumnStart: this.props.col,
            gridRowStart: this.props.row,
        };

        let classes = 'gridCell gridCell--reactor';

        if (this.props.endRow !== undefined && this.props.endCol !== undefined) {
            style.gridColumnEnd = this.props.endCol;
            style.gridRowEnd = this.props.endRow;
        }

        return (
            <div className={classes} style={style} onClick={this.props.clicked}>
                <span className="gridCell__sysname">{this.props.text.systems.power.reactor}</span>
                <span className="gridCell__power">{this.props.power}</span>
                <span className="gridCell__heat">{this.props.heatLevel}</span>
                <span className="gridCell__heatRate">{this.props.heatRate} / s</span>
            </div>
        );
    }
}