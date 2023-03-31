import { Box, styled } from 'src/lib/mui'
import { CellType, CountType } from '../types/CellState';

interface Props {
    cellType: CellType;
    countType?: CountType;
    number?: number;
    onClick?: () => void;
}

const Shadow = styled(Box)({
    filter: 'drop-shadow(-0.15em 0.1em 0.1em rgba(0, 0, 0, 0.4))',
});

const OuterHexagon = styled(Box, { shouldForwardProp: (prop) => prop !== 'state' })<{ state: CellType }>(({ state, theme }) => {
    let backgroundColor, cursor;
    switch (state) {
        case CellType.IndicatorVertical:
        case CellType.IndicatorTLBR:
        case CellType.IndicatorTRBL:
            break;
        case CellType.Obscured:
            cursor = 'pointer';
        default:
            backgroundColor = theme.palette.text.primary;
            break;
    }
    
    return {
        width: '2em',
        height: 'calc(2 * 1.1547em)',
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
        backgroundColor,
        cursor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const InnerHexagon = styled(Box, { shouldForwardProp: (prop) => prop !== 'state' && prop !== 'countType' })<{ state: CellType, countType?: CountType }>(({ state, countType, theme }) => {
    let backgroundColor, color, transform;
    switch (state) {
        case CellType.Obscured:
            backgroundColor = theme.palette.warning.main;
            color = backgroundColor;
            break;
        case CellType.Flagged:
            backgroundColor = theme.palette.primary.dark;
            color = backgroundColor;
            break;
        case CellType.Revealed:
            backgroundColor = countType === CountType.DoubleRadius
                ? theme.palette.primary.dark
                : theme.palette.background.paper;
            color = theme.palette.text.primary;
            break;
        case CellType.Unknown:
            backgroundColor = theme.palette.background.paper;
            color = theme.palette.text.secondary;
            break;
        case CellType.IndicatorVertical:
            color = theme.palette.background.paper;
            break;
        case CellType.IndicatorTLBR:
            color = theme.palette.background.paper;
            transform = 'rotate(-60deg)';
            break;
        case CellType.IndicatorTRBL:
            color = theme.palette.background.paper;
            transform = 'rotate(60deg)';
            break;
    }
    
    return {
        fontSize: '0.95em',
        width: '2em',
        height: 'calc(2 * 1.1547em)',
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
        backgroundColor,
        color,
        transform,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        transition: 'color 0.25s, background-color 0.25s',
    }
});

export const Cell: React.FC<Props> = props => {
    let content;

    switch (props.cellType) {
        case CellType.Revealed:
        case CellType.IndicatorVertical:
        case CellType.IndicatorTLBR:
        case CellType.IndicatorTRBL:
            switch (props.countType) {
                case CountType.Split:
                    content = `-${props.number}-`;
                    break;
                case CountType.Contiguous:
                    content = `{${props.number}}`;
                    break;
                case CountType.Normal:
                default:
                    content = props.number;
                    break;
            }
            break;
        case CellType.Unknown:
            content = '?';
            break;
    }

    const hexagons = (
        <OuterHexagon state={props.cellType} onClick={props.onClick}>
            <InnerHexagon state={props.cellType} countType={props.countType}>
                {content}
            </InnerHexagon>
        </OuterHexagon>
    );

    // Don't do a drop shadow wrapper for indicators, only "real" cells.
    if (props.cellType === CellType.IndicatorVertical
        || props.cellType === CellType.IndicatorTLBR
        || props.cellType === CellType.IndicatorTRBL) {
        return hexagons;
    }

    return (
        <Shadow>{hexagons}</Shadow>
    );
}