import { PropsWithChildren } from 'react';
import { Box, styled } from 'src/lib/mui';
import { itemWidth } from './ScanItem';

interface Props {
    fromRow: number;
    toRow: number;
    fromColumn: number;
    toColumn: number;
}

const lineWidth = '2px';

const Root = styled(Box)({
    pointerEvents: 'none',
    display: 'grid',
    gridTemplateRows: `1fr ${lineWidth} 1fr`,
    gridTemplateColumns: `calc(${itemWidth} / 2 - ${lineWidth} / 2) 1fr 1fr calc(${itemWidth} / 2 - ${lineWidth} / 2)`,
    justifyItems: 'stretch',
    alignItems: 'stretch',
});

const borderStyle = `solid white ${lineWidth}`;
const borderRadius = '0.4em';

const Straight = styled(Box)({
    borderLeft: borderStyle,
    gridRowStart: 1,
    gridRowEnd: 4,
    gridColumn: 3,
});

const BottomLeft = styled(Box)({
    borderBottomLeftRadius: borderRadius,
    borderBottom: borderStyle,
    borderLeft: borderStyle,
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
});

const TopRight = styled(Box)({
    borderTopRightRadius: borderRadius,
    borderTop: borderStyle,
    borderRight: borderStyle,
    gridRowStart: 2,
    gridRowEnd: 4,
    gridColumnStart: 3,
    gridColumnEnd: 4,
});

const TopLeft = styled(Box)({
    borderTopLeftRadius: borderRadius,
    borderTop: borderStyle,
    borderLeft: borderStyle,
    gridRowStart: 2,
    gridRowEnd: 4,
    gridColumnStart: 2,
    gridColumnEnd: 3,
});

const BottomRight = styled(Box)({
    borderBottomRightRadius: borderRadius,
    borderBottom: borderStyle,
    borderRight: borderStyle,
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 3,
    gridColumnEnd: 4,
});

export const ItemLink: React.FC<PropsWithChildren<Props>> = props => {
    const rootStyle = {
        gridColumnStart: Math.min(props.fromColumn, props.toColumn),
        gridColumnEnd: Math.max(props.fromColumn, props.toColumn) + 1,
        gridRowStart: props.fromRow * 2,
        gridRowEnd: props.toRow * 2 - 1,
    };

    if (props.fromColumn === props.toColumn) {
        return (
            <Root sx={rootStyle}>
                <Straight />
            </Root>
        )
    }
    else if (props.fromColumn < props.toColumn) {
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