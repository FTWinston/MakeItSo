import { styled } from 'src/lib/mui'
import { CellState } from '../types/CellState';
import { Cell, cellHeight, cellWidth } from './Cell';

interface Props {
    columns: number;
    cells: Array<CellState | null>;
    onClick: (index: number) => void;
}

const gapSize = 0.025;

const Root = styled('ul', { shouldForwardProp: (prop) => prop !== 'columns' })<{ columns: number }>(({ columns, theme }) => {
    return {
        display: 'grid',
        listStyleType: 'none',
        margin: 0,
        padding: '0.25em',
        gridGap: `${gapSize}em ${gapSize * 2}em`,
        gridTemplateColumns: `repeat(${columns}, ${cellWidth * 0.25 + gapSize * 0.5}em ${cellWidth * 0.5 + gapSize}em ) ${cellWidth * 0.25 + gapSize * 0.5}em`,
        gridTemplateRows: `repeat(6, ${cellHeight / 2 + gapSize}em)`,
        filter: 'drop-shadow(-0.15em 0.1em 0.1em rgba(0, 0, 0, 0.4))',
    };
});

const CellWrapper = styled('li')({
    position: 'relative',
});

export const Cells: React.FC<Props> = props => {
    const { columns, cells } = props;

    let contents = cells.map((cell, index) => {
        if (cell === null) {
            return null;
        }

        let row = Math.floor(index / columns) * 2 + 1;
        let col = (index % columns);

        if (col % 2 === 0) {
            row += 1;
        }
        col = col * 2 + 1;
        
        return (
            <CellWrapper key={index} sx={{ gridColumn: `${col} / span 3`, gridRow: `${row} / span 2` }}>
                <Cell
                    cellType={cell.type}
                    countType={(cell as any).countType}
                    number={(cell as any).number}
                    onClick={() => props.onClick(index)}
                />
            </CellWrapper>
        )
    });

    return (
        <Root columns={props.columns}>
            {contents}
        </Root>
    );
}