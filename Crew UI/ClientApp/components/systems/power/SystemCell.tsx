import * as React from 'react';
import { PowerCell, PowerCellType, PowerSystem, fullPowerLevel } from '~/store/power';
import { FlexibleCanvas } from '~/components/general';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';

interface SystemCellProps {
    cell: PowerCell;
    text: TextLocalisation;
}

export class SystemCell extends React.PureComponent<SystemCellProps, {}> {
    render() {
        let cell = this.props.cell;
        let style: React.CSSProperties = {
            gridColumnStart: cell.col,
            gridRowStart: cell.row,
        };

        let classes = 'gridCell gridCell--system';

        if (cell.endRow !== undefined && cell.endCol !== undefined) {
            style.gridColumnEnd = cell.endCol;
            style.gridRowEnd = cell.endRow;
            
            if (cell.endRow - cell.row > cell.endCol - cell.col) {
                classes += ' gridCell--rotated';
            }
        }

        let sysName = this.props.cell.system === undefined ? undefined : this.getSystemName(this.props.cell.system);

        return (
            <div className={classes} style={style}>
                <span className="gridCell__sysname">{sysName}</span>
                <span className="gridCell__power">{this.props.cell.power}</span>
            </div>
        );
    }
    
    private getSystemName(system: PowerSystem) {
        switch (system) {
            case PowerSystem.Helm:
                return this.props.text.systemNames.helm;
            case PowerSystem.Warp:
                return this.props.text.systemNames.warp;
            case PowerSystem.BeamWeapons:
                return this.props.text.systemNames.weapons + ' 1';
            case PowerSystem.Torpedoes:
                return this.props.text.systemNames.weapons + ' 2';
            case PowerSystem.Sensors:
                return this.props.text.systemNames.sensors;
            case PowerSystem.Shields:
                return this.props.text.systemNames.shields;
            case PowerSystem.DamageControl:
                return this.props.text.systemNames.damage;
            case PowerSystem.Comms:
                return this.props.text.systemNames.comms;
            default:
                return '';
        }
    }
}