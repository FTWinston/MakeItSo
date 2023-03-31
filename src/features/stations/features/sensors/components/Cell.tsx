import { Box, styled } from 'src/lib/mui'
import { CellState, CountType } from '../types/CellState';

interface Props {
    state: CellState;
    countType?: CountType;
    number?: number;
    onClick?: () => void;
}

const Wrapper = styled(Box)(({ theme }) => ({
    filter: 'drop-shadow(-0.15em 0.1em 0.1em rgba(0, 0, 0, 0.4))',
}));

const OuterHexagon = styled(Box)<{ state: CellState }>(({ state, theme }) => {
    let backgroundColor, cursor;
    switch (state) {
        case CellState.IndicatorVertical:
        case CellState.IndicatorTLBR:
        case CellState.IndicatorTRBL:
            break;
        case CellState.Obscured:
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

const InnerHexagon = styled(Box)<{ state: CellState, countType?: CountType }>(({ state, countType, theme }) => {
    let backgroundColor, color, transform;
    switch (state) {
        case CellState.Obscured:
            backgroundColor = theme.palette.warning.main;
            color = backgroundColor;
            break;
        case CellState.Flagged:
            backgroundColor = theme.palette.primary.dark;
            color = backgroundColor;
            break;
        case CellState.Revealed:
            backgroundColor = countType === CountType.DoubleRadius
                ? theme.palette.primary.dark
                : theme.palette.background.paper;
            color = theme.palette.text.primary;
            break;
        case CellState.Unknown:
            backgroundColor = theme.palette.background.paper;
            color = theme.palette.text.secondary;
            break;
        case CellState.IndicatorVertical:
            color = theme.palette.background.paper;
            break;
        case CellState.IndicatorTLBR:
            color = theme.palette.background.paper;
            transform = 'rotate(-60deg)';
            break;
        case CellState.IndicatorTRBL:
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

    switch (props.state) {
        case CellState.Revealed:
        case CellState.IndicatorVertical:
        case CellState.IndicatorTLBR:
        case CellState.IndicatorTRBL:
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
        case CellState.Unknown:
            content = '?';
            break;
    }

    const hexagons = (
        <OuterHexagon state={props.state} onClick={props.onClick}>
            <InnerHexagon state={props.state} countType={props.countType}>
                {content}
            </InnerHexagon>
        </OuterHexagon>
    );

    // Don't do a drop shadow wrapper for indicators, only "real" cells.
    if (props.state === CellState.IndicatorVertical
        || props.state === CellState.IndicatorTLBR
        || props.state === CellState.IndicatorTRBL) {
        return hexagons;
    }

    return (
        <Wrapper>{hexagons}</Wrapper>
    );
}