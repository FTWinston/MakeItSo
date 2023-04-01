import { useEffect, useState } from 'react';
import { styled } from 'src/lib/mui'
import { CellState } from '../types/CellState';
import { Cell, cellHeight, cellWidth, Special } from './Cell';

interface Props {
    columns: number;
    cells: Array<CellState | null>;
    onClick: (index: number) => void;
}

const gapSize = 0.025;

const Root = styled('ul')(({ theme }) => ({
    display: 'grid',
    listStyleType: 'none',
    margin: 0,
    padding: '0.25em',
    gridGap: `${gapSize}em ${gapSize * 2}em`,
    filter: 'drop-shadow(-0.15em 0.125em 0.1em rgba(0, 0, 0, 0.25))',
}));

const CellWrapper = styled('li')({
    position: 'relative',
});

export const Cells: React.FC<Props> = props => {
    const { columns, cells } = props;
    const [errorIndex, setErrorIndex] = useState<number | null>();

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

        const wrapperStyle: React.CSSProperties = {
            gridColumn: `${col} / span 3`,
            gridRow: `${row} / span 2`,
        };

        const special = errorIndex === index
            ? Special.Error
            : undefined;
        
        return (
            <CellWrapper key={index} style={wrapperStyle}>
                <Cell
                    cellType={cell.type}
                    countType={(cell as any).countType}
                    number={(cell as any).number}
                    special={special}
                    onClick={() => {
                        setErrorIndex(index);
                        props.onClick(index);
                    }}
                />
            </CellWrapper>
        )
    });

    useEffect(() => {
        const interval = setTimeout(() => setErrorIndex(null), 500);
        return () => clearInterval(interval);
    }, [errorIndex]);

    const rows = Math.ceil(cells.length / columns);
    const rootStyle: React.CSSProperties = {
        gridTemplateColumns: `repeat(${columns}, ${cellWidth * 0.25 + gapSize * 0.5}em ${cellWidth * 0.5 + gapSize}em ) ${cellWidth * 0.25 + gapSize * 0.5}em`,
        gridTemplateRows: `repeat(${rows * 2}, ${cellHeight / 2 + gapSize}em)`,
    };

    return (
        <Root style={rootStyle}>
            {contents}
        </Root>
    );
}