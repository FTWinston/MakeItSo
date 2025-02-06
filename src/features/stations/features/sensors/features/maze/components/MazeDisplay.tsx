import { Box } from 'src/lib/mui';
import { CellType, east, MazeClientState, north, south, west } from '../types/Maze';
import { CellDisplay } from './CellDisplay';
import { EntityDisplay } from './EntityDisplay';

type Props = {
    maze: MazeClientState;
}

export const MazeDisplay: React.FC<Props> = props => {
    const { cells, entities } = props.maze;
    const height = cells.length;
    const width = cells[0].length;

    const entityDisplay: JSX.Element[] = [];
    for (const [id, entity] of Object.entries(entities)) {
        entityDisplay.push((
            <EntityDisplay
                key={id}
                x={entity!.x}
                y={entity!.y}
                type={entity!.type}
            />
        ));
    }

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: `calc(1em + 1px) repeat(${width - 2}, 1em) calc(1em + 1px)`,
            gridTemplateRows: ` calc(1em + 1px) repeat(${height - 2}, 1em) calc(1em + 1px)`,
            margin: '0.25em',
        }}>
            {cells.flatMap((row, y) =>
                row.map((cell, x) => {
                    const rightmost = x === width - 1;
                    const bottommost = y === height - 1;

                    return (
                        <CellDisplay
                            key={`${x}_${y}`}
                            rightmost={rightmost}
                            bottommost={bottommost}
                            x={x}
                            y={y}
                            type={cell.type}
                            visible={cell.visible === true}
                            content={cell.content}
                            borderBottom={!cell.links[south] && (!bottommost || cell.type !== CellType.Outside)}
                            borderRight={!cell.links[east] && (!rightmost || cell.type !== CellType.Outside)}
                            borderLeft={!cell.links[west] && (x !== 0 || cell.type !== CellType.Outside)}
                            borderTop={!cell.links[north] && (y !== 0 || cell.type !== CellType.Outside)}
                        />
                    )
                })
            )}
            {entityDisplay}
        </Box>
    );
}