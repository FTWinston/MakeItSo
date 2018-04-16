import * as React from 'react';
import { PowerCell, PowerCellType, fullPowerLevel } from '~/store/power';
import { FlexibleCanvas } from '~/components/general';
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
        }

        return (
            <FlexibleCanvas
                className={classes}
                style={style}
                onClick={this.props.clicked}
                draw={(ctx, w, h) => this.draw(ctx, w, h)}
            />
        );
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = width * 0.33;

        this.drawLines(ctx, width, height);

        if (this.props.cell.power === 0) {
            return;
        }

        this.setStyleForPowerLevel(ctx, width, this.props.cell.power);
        this.drawLines(ctx, width, height);
        ctx.globalAlpha = 1;
    }

    private drawLines(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.beginPath();

        switch(this.props.cell.type) {
            case PowerCellType.NorthSouth:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                break;
            case PowerCellType.EastWest:
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case PowerCellType.NorthEast:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case PowerCellType.SouthEast:
                ctx.moveTo(width / 2, height);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case PowerCellType.SouthWest:
                ctx.moveTo(width / 2, height);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(0, height / 2);
                break;
            case PowerCellType.NorthWest:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height / 2);
                ctx.lineTo(0, height / 2);
                break;
            case PowerCellType.NorthEastSouth:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(width, height / 2);
                break;
            case PowerCellType.EastSouthWest:
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(width / 2, height);
                break;
            case PowerCellType.SouthWestNorth:
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(0, height / 2);
                break;
            case PowerCellType.WestNorthEast:
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(width / 2 , 0);
                break;
        }

        ctx.stroke();
    }

    private setStyleForPowerLevel(ctx: CanvasRenderingContext2D, cellSize: number, power: number) {
        // adjust line width / color / opacity to account for power level
        let width = cellSize * 0.2;

        if (power >= fullPowerLevel) {
            // adjust color as line is already at full width
            switch (power - fullPowerLevel) {
                case 0:
                    ctx.strokeStyle = '#00ff00'; break;
                case 1:
                    ctx.strokeStyle = '#88ff00'; break;
                case 2:
                    ctx.strokeStyle = '#ccff00'; break;
                case 3:
                    ctx.strokeStyle = '#ffff00'; break;
                case 4:
                    ctx.strokeStyle = '#ffcc00'; break;
                case 5:
                    ctx.strokeStyle = '#ff8800'; break;
                case 6:
                    ctx.strokeStyle = '#ff4400'; break;
                case 7:
                    ctx.strokeStyle = '#ff0000'; break;
                case 8:
                    ctx.strokeStyle = '#ff4444'; break;
                case 9:
                    ctx.strokeStyle = '#ff8888'; break;
                case 10:
                    ctx.strokeStyle = '#ffcccc'; break;
                default:
                    ctx.strokeStyle = '#ffffff'; break;
            }
        }
        else {
            // reduce width to indicate lower power
            width *= Math.pow(0.7, fullPowerLevel - power);

            // if too narrow, just get fainter instead
            if (width < 1) {
                ctx.globalAlpha = width;
                width = 1;
            }
            
            ctx.strokeStyle = '#00ff00';
        }

        ctx.lineWidth = width;
    }
}