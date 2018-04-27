import * as React from 'react';
import { PowerCell, PowerCellType, PowerSystem, fullPowerLevel } from '~/store/power';
import { FlexibleCanvas } from '~/components/general';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';
import './GridCell.scss';

interface GridCellProps {
    row: number;
    col: number;
    type: PowerCellType;
    power: number;
    clicked: () => void;
    inList?: boolean;
    selected?: boolean;
    text: TextLocalisation;
}

export class GridCell extends React.PureComponent<GridCellProps, {}> {
    render() {
        let style: React.CSSProperties = {
            gridColumnStart: this.props.col,
            gridRowStart: this.props.row,
        };

        let classes = 'gridCell';

        switch(this.props.type) {
            case PowerCellType.Empty:
                classes += ' gridCell--empty';
                break;
            case PowerCellType.Broken:
                classes += ' gridCell--broken';
                break;
            default:
                return (
                    <FlexibleCanvas
                        className={classes}
                        style={style}
                        onClick={this.props.clicked}
                        draw={(ctx, w, h) => GridCell.draw(ctx, w, h, this.props.type, this.props.power)}
                    />
                );
        }

        return <div className={classes} style={style} onClick={this.props.clicked} />;
    }

    public static draw(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        cellType: PowerCellType,
        power: number = 0
    ) {
        ctx.clearRect(0, 0, width, height);
        if (cellType === PowerCellType.Radiator)
        {
            ctx.strokeStyle = power === 0 ? '#aaaaaa' : '#dd3333';
            ctx.lineWidth = width * 0.1;
            GridCell.drawRadiator(ctx, width, height);
            return;
        }

        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = width * 0.33;

        GridCell.drawLines(ctx, width, height, cellType);

        if (power === 0) {
            return;
        }

        GridCell.setStyleForPowerLevel(ctx, width, power);
        GridCell.drawLines(ctx, width, height, cellType);
        ctx.globalAlpha = 1;
    }

    private static drawRadiator(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.strokeRect(width / 4, height / 4, width / 2, height / 2);

        ctx.beginPath();

        ctx.moveTo(width * 5 / 12, height / 4);
        ctx.lineTo(width * 5 / 12, height * 3 / 4);

        ctx.moveTo(width * 7 / 12, height / 4);
        ctx.lineTo(width * 7 / 12, height * 3 / 4);

        ctx.stroke();
    }

    private static drawLines(ctx: CanvasRenderingContext2D, width: number, height: number, cellType: PowerCellType) {
        ctx.beginPath();

        switch(cellType) {
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

    private static setStyleForPowerLevel(ctx: CanvasRenderingContext2D, cellSize: number, power: number) {
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