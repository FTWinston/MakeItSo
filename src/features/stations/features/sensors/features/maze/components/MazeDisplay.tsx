import { Box } from 'src/lib/mui';
import { Maze } from '../types/Maze';
import { CellDisplay } from './CellDisplay';

type Props = {
    maze: Maze;
}

export const MazeDisplay: React.FC<Props> = props => {
    const cells = props.maze.cells;
    const height = cells.length;
    const width = cells[0].length;

    return (
        <Box sx={{
            borderColor: 'primary.dark',
            borderStyle: 'solid',
            borderWidth: 2,

            display: 'grid',
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${height}, 1fr)`,
            width: `${width}em`,
            height: `${height}em`,
        }}>
            {cells.flatMap((row, y) =>
                row.map((cell, x) => (
                    <CellDisplay
                        key={`${x}_${y}`}
                        rightmost={x === width - 1}
                        bottommost={y === height - 1}
                        leftmost={x === 0}
                        topmost={y === 0}
                        content={cell.content}
                        group={cell.group}
                        borderBottom={!cell.links[2]}
                        borderRight={!cell.links[1]}
                        borderLeft={!cell.links[3]}
                        borderTop={!cell.links[0]}
                    />
                ))
            )}
        </Box>
    );
}