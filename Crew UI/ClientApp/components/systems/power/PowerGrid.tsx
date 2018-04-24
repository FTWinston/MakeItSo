import * as React from 'react';
import { PowerCell, PowerCellType } from '~/store/power';
import { GridCell } from './GridCell';
import { ReactorCell } from './ReactorCell';
import { SystemCell } from './SystemCell';
import './PowerGrid.scss';
import { TextLocalisation } from "~/functionality";

interface PowerGridProps {
    cells: PowerCell[];
    heatLevel: number;
    heatRate: number;
    cellClicked: (cellIndex: number) => void;
    reactorClicked: () => void;
    text: TextLocalisation;
}

export class PowerGrid extends React.PureComponent<PowerGridProps, {}> {
    render() {
        let cells = this.props.cells
        .filter(cell => (cell.type !== PowerCellType.System && cell.type !== PowerCellType.Reactor) || cell.system !== undefined)
        .map((cell, index) => this.renderCell(cell, index));

        return <div className='powerGrid'>{cells}</div>;
    }

    private renderCell(cell: PowerCell, index: number) {
        if (cell.system !== undefined) {
            if (cell.type === PowerCellType.Reactor) {
                return (
                    <ReactorCell
                        cell={cell}
                        key={cell.index}
                        clicked={this.props.reactorClicked}
                        heatLevel={this.props.heatLevel}
                        heatRate={this.props.heatRate}
                        text={this.props.text}
                    />
                );
            }
            if (cell.type === PowerCellType.System) {
                return (
                    <SystemCell
                        cell={cell}
                        key={cell.index}
                        text={this.props.text}
                    />
                );
            }
        }

        return (
            <GridCell
                cell={cell}
                key={cell.index}
                clicked={() => this.props.cellClicked(cell.index)}
                text={this.props.text}
            />
        );
    }
}