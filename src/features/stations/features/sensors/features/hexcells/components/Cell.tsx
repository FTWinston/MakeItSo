import { useLongPress } from 'src/hooks/useLongPress';
import { Box, styled } from 'src/lib/mui'
import { CellType, CountType } from '../types/CellState';
import './Cell.css';

export enum Special {
    Revealing = 1,
    Error = 2,
}

interface Props {
    cellType: CellType;
    countType?: CountType;
    number?: number;
    special?: Special;
    onClick?: () => void;
    onLongPress?: () => void;
}

export const cellWidth = 2.3094;
export const cellHeight = 2;

const OuterBorderHexagon = styled(Box,
    { shouldForwardProp: (prop) => prop !== 'state' && prop !== 'error' })
    <{ state: CellType, error: boolean }>
(({ state, error, theme }) => {
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

    const animationName = error
        ? 'hexCellErrorShake'
        : 'none';
    
    return {
        width: `${cellWidth}em`,
        height: `${cellHeight}em`,
        clipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
        backgroundColor,
        cursor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animationDuration: '0.15s',
        animationIterationCount: 3,
        animationName,
    };
});

const InnerFillHexagon = styled(Box,
    { shouldForwardProp: (prop) => prop !== 'state' && prop !== 'countType' })
    <{ state: CellType }>
(({ state, theme }) => {
    let backgroundColor, color, transform;
    switch (state) {
        case CellType.Obscured:
            backgroundColor = theme.palette.warning.main;
            color = backgroundColor;
            break;
        case CellType.Bomb:
            backgroundColor = theme.palette.primary.dark;
            color = backgroundColor;
            break;
        case CellType.Empty:
            backgroundColor = theme.palette.background.paper;
            color = theme.palette.text.primary;
            break;
        case CellType.Unknown:
            backgroundColor = theme.palette.background.paper;
            color = theme.palette.text.secondary;
            break;
        case CellType.RadiusClue:
            backgroundColor = theme.palette.primary.dark;
            color = theme.palette.text.primary;
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
        case CellType.Exploded:
            backgroundColor = theme.palette.error.dark;
            color = backgroundColor;
            break;
        case CellType.Hint:
            backgroundColor = theme.palette.success.main;
            color = theme.palette.text.primary;
            break;
    }
    
    return {
        fontSize: '0.95em',
        width: `${cellWidth}em`,
        height: `${cellHeight}em`,
        clipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
        backgroundColor,
        color,
        transform,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.25s, background-color 0.25s',
    }
});

const GlowHexagon = styled(Box,
    { shouldForwardProp: (prop) => prop !== 'state' && prop !== 'revealing' })<{ state: CellType, revealing: boolean }>(({ state, revealing }) => {
    let backgroundColor;

    switch (state) {
        case CellType.IndicatorVertical:
        case CellType.IndicatorTLBR:
        case CellType.IndicatorTRBL:
            break;
        default:
            backgroundColor = revealing
                ? 'rgba(255,255,255, 0.75)'
                : 'rgba(255,255,255, 0.15)';
            break;
    }

    return {
        fontSize: '0.85em',
        width: `${cellWidth}em`,
        height: `${cellHeight}em`,
        clipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        transition: 'background-color 0.5s',
    };
});

const Text = styled(Box)({
    fontWeight: 'bold',
    fontSize: '1.2em',
})

export const Cell: React.FC<Props> = props => {
    let content;

    switch (props.cellType) {
        case CellType.Empty:
        case CellType.RadiusClue:
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

    const handlers = useLongPress(props.onLongPress, props.onClick);

    return (
        <OuterBorderHexagon
            state={props.cellType}
            error={props.special === Special.Error}
            {...handlers}
        >
            <InnerFillHexagon state={props.cellType}>
                <GlowHexagon state={props.cellType} revealing={props.special === Special.Revealing}>
                    <Text>
                        {content}
                    </Text>
                </GlowHexagon>
            </InnerFillHexagon>
        </OuterBorderHexagon>
    );
}