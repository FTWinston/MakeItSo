import * as React from 'react';
import { PowerCell, PowerCellType, PowerSystem, fullPowerLevel } from '~/store/power';
import { FlexibleCanvas } from '~/components/general';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';

interface SystemCellProps {
    col: number;
    row: number;
    endCol?: number;
    endRow?: number;
    system: PowerSystem
    power: number;

    text: TextLocalisation;
}

export class SystemCell extends React.PureComponent<SystemCellProps, {}> {
    render() {
        let style: React.CSSProperties = {
            gridColumnStart: this.props.col,
            gridRowStart: this.props.row,
        };

        let classes = 'gridCell gridCell--system';

        if (this.props.endRow !== undefined && this.props.endCol !== undefined) {
            style.gridColumnEnd = this.props.endCol;
            style.gridRowEnd = this.props.endRow;
            
            if (this.props.endRow - this.props.row > this.props.endCol - this.props.col) {
                classes += ' gridCell--rotated';
            }
        }

        let sysName = this.props.system === undefined ? undefined : this.getSystemName(this.props.system);

        return (
            <div className={classes} style={style}>
                <span className="gridCell__sysname">{sysName}</span>
                <span className="gridCell__power">{this.props.power}</span>
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