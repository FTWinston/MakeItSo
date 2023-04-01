import { Box, styled } from 'src/lib/mui'
import { CellType, CountType } from '../types/CellState';

interface Props {
    cellType: CellType;
    countType?: CountType;
    number?: number;
    onClick?: () => void;
}

export const cellWidth = 2.3094;
export const cellHeight = 2;

const OuterBorderHexagon = styled(Box, { shouldForwardProp: (prop) => prop !== 'state' })<{ state: CellType }>(({ state, theme }) => {
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
        width: `${cellWidth}em`,
        height: `${cellHeight}em`,
        clipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
        backgroundColor,
        cursor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const InnerFillHexagon = styled(Box, { shouldForwardProp: (prop) => prop !== 'state' && prop !== 'countType' })<{ state: CellType, countType?: CountType }>(({ state, countType, theme }) => {
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


const GlowHexagon = styled(Box)({
    fontSize: '0.85em',
    width: `${cellWidth}em`,
    height: `${cellHeight}em`,
    clipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.15)',
});

const Text = styled(Box)({
    fontWeight: 'bold',
    fontSize: '1.2em',
})

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

    return (
        <OuterBorderHexagon state={props.cellType} onClick={props.onClick}>
            <InnerFillHexagon state={props.cellType} countType={props.countType}>
                <GlowHexagon>
                    <Text>
                        {content}
                    </Text>
                </GlowHexagon>
            </InnerFillHexagon>
        </OuterBorderHexagon>
    );
}