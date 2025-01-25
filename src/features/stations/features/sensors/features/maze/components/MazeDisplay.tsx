import { Box } from 'src/lib/mui';
import { CellType, Maze } from '../types/Maze';
import { CellDisplay } from './CellDisplay';
import { EntityDisplay } from './EntityDisplay';

type Props = {
    maze: Maze;
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
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${height}, 1fr)`,
            width: `${width}em`,
            height: `${height}em`,
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
                            content={cell.content}
                            group={cell.group}
                            borderBottom={!cell.links[2] && (!bottommost || cell.type !== CellType.Outside)}
                            borderRight={!cell.links[1] && (!rightmost || cell.type !== CellType.Outside)}
                            borderLeft={!cell.links[3] && (x !== 0 || cell.type !== CellType.Outside)}
                            borderTop={!cell.links[0] && (y !== 0 || cell.type !== CellType.Outside)}
                        />
                    )
                })
            )}
            {entityDisplay}
        </Box>
    );
}