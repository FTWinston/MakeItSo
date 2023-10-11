import { PropsWithChildren } from 'react';
import { Box, styled } from 'src/lib/mui';

interface Props {
    fromColumn: number;
    toColumn: number;
    fromRow: number;
    toRow: number;
}

const lineWidth = '1px';

const Root = styled(Box)({
    pointerEvents: 'none',
    display: 'grid',
    gridTemplateColumns: `1fr ${lineWidth} 1fr`,
    gridTemplateRows: `1.5em ${lineWidth} 1fr ${lineWidth} 1fr ${lineWidth} 1.5em`,
    justifyItems: 'stretch',
    alignItems: 'stretch',
});

const borderStyle = `solid white ${lineWidth}`;
const borderRadius = '0.25em';

const Straight = styled(Box)({
    borderTop: borderStyle,
    gridRow: 4,
    gridColumnStart: 1,
    gridColumnEnd: 4,
});

const BottomLeft = styled(Box)({
    borderBottomLeftRadius: borderRadius,
    borderBottom: borderStyle,
    borderLeft: borderStyle,
    gridRowStart: 4,
    gridRowEnd: 6,
    gridColumnStart: 2,
    gridColumnEnd: 4,
});

const BottomRight = styled(Box)({
    borderBottomRightRadius: borderRadius,
    borderBottom: borderStyle,
    borderRight: borderStyle,
    gridRowStart: 4,
    gridRowEnd: 6,
    gridColumnStart: 1,
    gridColumnEnd: 3,
});

const TopLeft = styled(Box)({
    borderTopLeftRadius: borderRadius,
    borderTop: borderStyle,
    borderLeft: borderStyle,
    gridRowStart: 3,
    gridRowEnd: 4,
    gridColumnStart: 2,
    gridColumnEnd: 4,
});

const TopRight = styled(Box)({
    borderTopRightRadius: borderRadius,
    borderTop: borderStyle,
    borderRight: borderStyle,
    gridRowStart: 3,
    gridRowEnd: 4,
    gridColumnStart: 1,
    gridColumnEnd: 3,
});

export const ItemLink: React.FC<PropsWithChildren<Props>> = props => {
    const rootStyle = {
        gridRowStart: Math.min(props.fromRow, props.toRow),
        gridRowEnd: Math.max(props.fromRow, props.toRow) + 1,
        gridColumnStart: 2 + props.fromColumn * 2,
        gridColumnEnd: 1 + props.toColumn * 2,
    };

    if (props.fromRow === props.toRow) {
        return (
            <Root sx={rootStyle}>
                <Straight />
            </Root>
        )
    }
    else if (props.fromRow < props.toRow) {
        return (
            <Root sx={rootStyle}>
                <BottomLeft />
                <TopRight />
            </Root>
        )
    }
    else {
        return (
            <Root sx={rootStyle}>
            <BottomRight />
            <TopLeft />
            </Root>
        )
    }
}